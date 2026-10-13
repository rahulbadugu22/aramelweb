import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { 
  X, 
  Camera, 
  Upload, 
  Flashlight, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

/**
 * Extracts pure Tag ID from raw QR text or CarFrnd URLs
 * Handles:
 * - KA560100MM1234
 * - https://carfrnd.com/q/KA560100MM1234
 * - https://carfrnd.com/scan/KA560100MM1234
 * - https://carfrnd.com/activate-tag?tag=KA560100MM1234
 * - JSON { tagId: "..." }
 */
export function extractTagIdFromText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';
  let str = rawText.trim();

  // Try JSON
  if (str.startsWith('{') && str.endsWith('}')) {
    try {
      const parsed = JSON.parse(str);
      const val = parsed.tagId || parsed.serialNumber || parsed.secureToken || parsed.tag || parsed.id || parsed.serial;
      if (val) return String(val).trim().toUpperCase();
    } catch (e) {
      // not JSON
    }
  }

  // Try URL parsing
  try {
    let urlString = str;
    if (str.startsWith('/')) {
      urlString = 'https://carfrnd.com' + str;
    }
    if (urlString.startsWith('http://') || urlString.startsWith('https://')) {
      const url = new URL(urlString);

      // Query parameters
      const qTag = 
        url.searchParams.get('tag') || 
        url.searchParams.get('tagId') || 
        url.searchParams.get('token') || 
        url.searchParams.get('serial') || 
        url.searchParams.get('serialNumber') ||
        url.searchParams.get('id');
      if (qTag) return qTag.trim().toUpperCase();

      // Path matching: /q/:token, /scan/:token, /tag/:token
      const pathMatch = url.pathname.match(/\/(?:q|scan|tag|tags)\/([^/?#]+)/i);
      if (pathMatch && pathMatch[1]) {
        return decodeURIComponent(pathMatch[1]).trim().toUpperCase();
      }

      // Last path segment fallback
      const segments = url.pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        const last = segments[segments.length - 1];
        if (last && last.length <= 40 && !['q', 'scan', 'activate', 'activate-tag', 'index.html'].includes(last.toLowerCase())) {
          return decodeURIComponent(last).trim().toUpperCase();
        }
      }
    }
  } catch (err) {
    // ignore URL parsing error
  }

  // Plain string cleanup
  return str.replace(/["']/g, '').trim().toUpperCase();
}

/**
 * Play pleasant synthesizer chime on successful scan
 */
function playSuccessBeep() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.type = 'sine';
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(880, now); // A5
    osc.frequency.setValueAtTime(1760, now + 0.08); // A6
    
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    
    osc.start(now);
    osc.stop(now + 0.28);
  } catch (e) {
    // Audio autoplay blocked or unsupported
  }
}

export default function QRScannerModal({ isOpen, onClose, onScanSuccess }) {
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [scannerStatus, setScannerStatus] = useState('initializing'); // 'initializing' | 'scanning' | 'detected' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [detectedTag, setDetectedTag] = useState('');
  const [torchSupported, setTorchSupported] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);
  const [isFileScanning, setIsFileScanning] = useState(false);

  const scannerInstanceRef = useRef(null);
  const isStoppingRef = useRef(false);
  const fileInputRef = useRef(null);
  const containerId = 'carfrnd-qr-scanner-viewport';

  // Handle detection
  const handleDecodedCode = (decodedText) => {
    if (!decodedText || scannerStatus === 'detected') return;
    
    const extracted = extractTagIdFromText(decodedText);
    if (!extracted) return;

    setScannerStatus('detected');
    setDetectedTag(extracted);

    // Audio chime & haptic feedback
    playSuccessBeep();
    if (navigator.vibrate) {
      try { navigator.vibrate([50, 40, 100]); } catch (e) {}
    }

    // Stop scanner video
    stopScanner();

    // Notify parent after brief confirmation pause
    setTimeout(() => {
      onScanSuccess(extracted);
      onClose();
    }, 700);
  };

  // Safely stop scanner
  const stopScanner = async () => {
    const scanner = scannerInstanceRef.current;
    if (!scanner || isStoppingRef.current) return;
    
    isStoppingRef.current = true;
    try {
      if (scanner.isScanning) {
        await scanner.stop();
      }
      try {
        await scanner.clear();
      } catch (e) {}
    } catch (e) {
      console.warn('Error stopping scanner:', e);
    } finally {
      scannerInstanceRef.current = null;
      isStoppingRef.current = false;
    }
  };

  // Initialize and start camera
  const startCamera = async (cameraIndex = 0) => {
    try {
      await stopScanner();
      setScannerStatus('initializing');
      setErrorMessage('');

      // Enumerate available video input devices
      let availableDevices = cameras;
      if (!availableDevices || availableDevices.length === 0) {
        try {
          availableDevices = await Html5Qrcode.getCameras();
          setCameras(availableDevices || []);
        } catch (camErr) {
          console.warn('Could not list cameras directly:', camErr);
        }
      }

      const html5QrCode = new Html5Qrcode(containerId, { verbose: false });
      scannerInstanceRef.current = html5QrCode;

      const qrboxFunction = (viewfinderWidth, viewfinderHeight) => {
        const edge = Math.min(viewfinderWidth, viewfinderHeight);
        const boxSize = Math.max(180, Math.floor(edge * 0.72));
        return { width: boxSize, height: boxSize };
      };

      const scanConfig = {
        fps: 12,
        qrbox: qrboxFunction,
        aspectRatio: 1.0
      };

      // Camera selection strategy:
      // If cameras array is available, use camera id. Otherwise, use facingMode: environment.
      let cameraSpec = { facingMode: 'environment' };
      if (availableDevices && availableDevices.length > 0) {
        const idx = cameraIndex % availableDevices.length;
        cameraSpec = availableDevices[idx].id;
      }

      await html5QrCode.start(
        cameraSpec,
        scanConfig,
        (decodedText) => {
          handleDecodedCode(decodedText);
        },
        () => {
          // Frame scanned without QR - normal loop
        }
      );

      setScannerStatus('scanning');

      // Check torch capability
      try {
        const capabilities = html5QrCode.getRunningTrackCapabilities?.();
        if (capabilities && 'torch' in capabilities) {
          setTorchSupported(true);
        } else {
          setTorchSupported(false);
        }
      } catch (torchCheckErr) {
        setTorchSupported(false);
      }

    } catch (err) {
      console.error('QR Scanner Start Error:', err);
      setScannerStatus('error');
      
      const errStr = String(err?.message || err || '');
      if (errStr.includes('NotAllowedError') || errStr.includes('Permission')) {
        setErrorMessage('Camera access was denied. Please allow camera permissions in your browser or upload an image below.');
      } else if (errStr.includes('NotFoundError') || errStr.includes('No cameras')) {
        setErrorMessage('No camera was detected on this device. You can upload an image of your QR decal instead.');
      } else {
        setErrorMessage('Could not open camera. You can upload a photo of your QR code or enter the Tag ID manually.');
      }
    }
  };

  // Flip / Switch camera
  const handleSwitchCamera = async () => {
    if (cameras.length <= 1) return;
    const nextIdx = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextIdx);
    await startCamera(nextIdx);
  };

  // Toggle flashlight / torch
  const handleToggleTorch = async () => {
    const scanner = scannerInstanceRef.current;
    if (!scanner || !scanner.isScanning) return;
    try {
      const nextTorch = !isTorchOn;
      await scanner.applyVideoConstraints({
        advanced: [{ torch: nextTorch }]
      });
      setIsTorchOn(nextTorch);
    } catch (e) {
      console.warn('Torch toggle failed:', e);
    }
  };

  // File upload fallback
  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsFileScanning(true);
    setErrorMessage('');
    
    try {
      await stopScanner();
      
      const fileScanner = new Html5Qrcode(containerId, { verbose: false });
      const decodedResult = await fileScanner.scanFile(file, true);
      
      if (decodedResult) {
        handleDecodedCode(decodedResult);
      } else {
        throw new Error('No QR code detected');
      }
    } catch (err) {
      console.warn('File scan error:', err);
      setErrorMessage('Could not find a valid CarFrnd QR code in that image. Please try a clearer photo or enter your Tag ID manually.');
      setScannerStatus('error');
    } finally {
      setIsFileScanning(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Lifecycle
  useEffect(() => {
    if (isOpen) {
      setDetectedTag('');
      setIsTorchOn(false);
      // Short delay to ensure container DOM element is rendered
      const timer = setTimeout(() => {
        startCamera(0);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      stopScanner();
    }
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="qr-modal-backdrop" onClick={onClose}>
      <div 
        className="qr-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="qr-modal-header">
          <div className="qr-modal-title-wrap">
            <div className="qr-modal-badge">
              <Camera size={14} color="#FF2B85" />
              <span>Decal QR Scanner</span>
            </div>
            <h3>Scan CarFrnd Tag QR</h3>
            <p>Align the QR code on your windshield sticker within the frame.</p>
          </div>

          <button 
            type="button" 
            className="qr-modal-close-btn" 
            onClick={onClose}
            aria-label="Close scanner"
          >
            <X size={18} />
          </button>
        </div>

        {/* Viewport Box */}
        <div className="qr-scanner-viewport-box">
          <div id={containerId} className="qr-html5-container"></div>

          {/* Holographic HUD Overlay */}
          {scannerStatus === 'scanning' && (
            <div className="qr-hud-overlay">
              <div className="qr-hud-frame">
                {/* 4 Corner brackets */}
                <div className="corner corner-tl"></div>
                <div className="corner corner-tr"></div>
                <div className="corner corner-bl"></div>
                <div className="corner corner-br"></div>

                {/* Laser scan line */}
                <div className="qr-laser-line"></div>
                
                {/* Center target reticle */}
                <div className="qr-target-reticle"></div>
              </div>

              <div className="qr-hud-hint">
                <span>Hold steady • QR code will auto-detect</span>
              </div>
            </div>
          )}

          {/* Initializing loader */}
          {scannerStatus === 'initializing' && (
            <div className="qr-viewport-loading">
              <div className="qr-spin-ring"></div>
              <p>Starting Camera...</p>
            </div>
          )}

          {/* Success overlay banner */}
          {scannerStatus === 'detected' && (
            <div className="qr-viewport-detected">
              <div className="qr-detected-bubble">
                <CheckCircle2 size={42} color="#10B981" />
                <h4>Tag ID Detected!</h4>
                <div className="qr-detected-tag-code font-mono">{detectedTag}</div>
                <p>Auto-filling and returning to form...</p>
              </div>
            </div>
          )}

          {/* Error / Permission Blocked View */}
          {scannerStatus === 'error' && (
            <div className="qr-viewport-error">
              <div className="qr-error-icon-box">
                <AlertTriangle size={32} color="#F59E0B" />
              </div>
              <h4>Camera Not Accessible</h4>
              <p>{errorMessage || 'Unable to start camera stream on this browser.'}</p>

              <div className="qr-error-actions">
                <button 
                  type="button" 
                  className="qr-btn-retry" 
                  onClick={() => startCamera(currentCameraIndex)}
                >
                  <RefreshCw size={14} /> Try Again
                </button>
                <button 
                  type="button" 
                  className="qr-btn-upload-direct" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload size={14} /> Upload QR Photo
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Bar */}
        <div className="qr-controls-bar">
          {/* Torch toggle if supported */}
          {torchSupported && scannerStatus === 'scanning' && (
            <button 
              type="button" 
              className={`qr-control-btn ${isTorchOn ? 'active' : ''}`}
              onClick={handleToggleTorch}
              title="Toggle Flashlight"
            >
              <Flashlight size={16} />
              <span>{isTorchOn ? 'Flash Off' : 'Flash On'}</span>
            </button>
          )}

          {/* Flip camera if multiple cameras */}
          {cameras.length > 1 && scannerStatus === 'scanning' && (
            <button 
              type="button" 
              className="qr-control-btn"
              onClick={handleSwitchCamera}
              title="Flip Camera"
            >
              <RefreshCw size={16} />
              <span>Flip Camera</span>
            </button>
          )}

          {/* Upload photo fallback */}
          <button 
            type="button" 
            className="qr-control-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={isFileScanning}
            title="Upload photo of QR code"
          >
            <Upload size={16} />
            <span>{isFileScanning ? 'Scanning File...' : 'Upload Photo'}</span>
          </button>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileSelected} 
            accept="image/*" 
            style={{ display: 'none' }} 
          />
        </div>

        {/* Footer info & Manual Fallback */}
        <div className="qr-modal-footer">
          <div className="qr-security-note">
            <ShieldCheck size={13} color="#059669" />
            <span>Camera stream processed privately in browser — no imagery stored.</span>
          </div>
          <button 
            type="button" 
            className="qr-btn-enter-manually" 
            onClick={onClose}
          >
            Enter Tag ID Manually
          </button>
        </div>
      </div>

      <style>{`
        .qr-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
          animation: qrFadeIn 0.22s ease-out;
        }

        @keyframes qrFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .qr-modal-card {
          background: #0F172A;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          width: 100%;
          max-width: 480px;
          color: #F8FAFC;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 43, 133, 0.15);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: qrCardScale 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes qrCardScale {
          from { transform: scale(0.94); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .qr-modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 20px 22px 14px 22px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .qr-modal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 43, 133, 0.15);
          border: 1px solid rgba(255, 43, 133, 0.3);
          color: #FF2B85;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          margin-bottom: 6px;
        }

        .qr-modal-title-wrap h3 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 4px 0;
        }

        .qr-modal-title-wrap p {
          font-size: 0.82rem;
          color: #94A3B8;
          margin: 0;
          line-height: 1.4;
        }

        .qr-modal-close-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94A3B8;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .qr-modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
        }

        /* Viewport Box */
        .qr-scanner-viewport-box {
          position: relative;
          background: #020617;
          min-height: 320px;
          max-height: 380px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-html5-container {
          width: 100% !important;
          height: 100% !important;
        }

        .qr-html5-container video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
          border-radius: 0;
        }

        /* Hide unwanted default html5-qrcode controls and banners */
        #carfrnd-qr-scanner-viewport__scan_region {
          background: transparent !important;
        }
        #carfrnd-qr-scanner-viewport img {
          display: none !important;
        }

        /* HUD Overlay */
        .qr-hud-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }

        .qr-hud-frame {
          position: relative;
          width: 220px;
          height: 220px;
          border: 1px dashed rgba(255, 43, 133, 0.4);
          border-radius: 16px;
          box-shadow: 0 0 0 9999px rgba(2, 6, 23, 0.45);
        }

        .corner {
          position: absolute;
          width: 22px;
          height: 22px;
          border-color: #FF2B85;
          border-style: solid;
        }

        .corner-tl {
          top: -2px;
          left: -2px;
          border-width: 3.5px 0 0 3.5px;
          border-top-left-radius: 12px;
        }

        .corner-tr {
          top: -2px;
          right: -2px;
          border-width: 3.5px 3.5px 0 0;
          border-top-right-radius: 12px;
        }

        .corner-bl {
          bottom: -2px;
          left: -2px;
          border-width: 0 0 3.5px 3.5px;
          border-bottom-left-radius: 12px;
        }

        .corner-br {
          bottom: -2px;
          right: -2px;
          border-width: 0 3.5px 3.5px 0;
          border-bottom-right-radius: 12px;
        }

        .qr-laser-line {
          position: absolute;
          left: 4px;
          right: 4px;
          height: 2.5px;
          background: linear-gradient(90deg, transparent 0%, #FF2B85 50%, transparent 100%);
          box-shadow: 0 0 12px 2px #FF2B85;
          animation: laserScan 2.2s ease-in-out infinite alternate;
        }

        @keyframes laserScan {
          0% { top: 6px; }
          100% { top: calc(100% - 8px); }
        }

        .qr-target-reticle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 14px;
          height: 14px;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          transform: translate(-50%, -50%);
        }

        .qr-hud-hint {
          margin-top: 18px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.12);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.75rem;
          color: #E2E8F0;
          font-weight: 600;
          backdrop-filter: blur(4px);
        }

        /* Loading */
        .qr-viewport-loading {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          color: #94A3B8;
          font-size: 0.88rem;
          font-weight: 600;
        }

        .qr-spin-ring {
          width: 36px;
          height: 36px;
          border: 3px solid rgba(255, 43, 133, 0.2);
          border-top-color: #FF2B85;
          border-radius: 50%;
          animation: qrSpin 0.9s linear infinite;
        }

        @keyframes qrSpin {
          to { transform: rotate(360deg); }
        }

        /* Detected banner */
        .qr-viewport-detected {
          position: absolute;
          inset: 0;
          background: rgba(2, 6, 23, 0.92);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 20;
          animation: qrDetectedPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes qrDetectedPop {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .qr-detected-bubble {
          text-align: center;
          padding: 24px;
        }

        .qr-detected-bubble h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #10B981;
          margin: 12px 0 6px 0;
        }

        .qr-detected-tag-code {
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid #10B981;
          color: #34D399;
          font-size: 1.15rem;
          font-weight: 900;
          padding: 8px 18px;
          border-radius: 8px;
          display: inline-block;
          margin: 6px 0 10px 0;
          letter-spacing: 0.08em;
        }

        .qr-detected-bubble p {
          font-size: 0.8rem;
          color: #94A3B8;
          margin: 0;
        }

        /* Error state */
        .qr-viewport-error {
          position: absolute;
          inset: 0;
          background: #020617;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px;
          text-align: center;
          z-index: 15;
        }

        .qr-error-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;
        }

        .qr-viewport-error h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #F8FAFC;
          margin: 0 0 6px 0;
        }

        .qr-viewport-error p {
          font-size: 0.8rem;
          color: #94A3B8;
          max-width: 340px;
          margin: 0 0 18px 0;
          line-height: 1.45;
        }

        .qr-error-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .qr-btn-retry, .qr-btn-upload-direct {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #F8FAFC;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.82rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .qr-btn-upload-direct {
          background: var(--magenta, #FF2B85);
          border-color: var(--magenta, #FF2B85);
          color: #FFFFFF;
        }

        .qr-btn-retry:hover {
          background: rgba(255, 255, 255, 0.16);
        }

        /* Controls Bar */
        .qr-controls-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px 18px;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .qr-control-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #E2E8F0;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .qr-control-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          color: #FFFFFF;
        }

        .qr-control-btn.active {
          background: rgba(255, 43, 133, 0.2);
          border-color: #FF2B85;
          color: #FF2B85;
        }

        /* Footer */
        .qr-modal-footer {
          padding: 14px 22px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: center;
        }

        .qr-security-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: #64748B;
        }

        .qr-btn-enter-manually {
          background: none;
          border: none;
          color: #94A3B8;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          text-decoration: underline;
          padding: 4px;
          transition: color 0.2s;
        }

        .qr-btn-enter-manually:hover {
          color: #FFFFFF;
        }
      `}</style>
    </div>
  );
}
