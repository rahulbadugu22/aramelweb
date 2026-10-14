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
  ShieldCheck, 
  QrCode, 
  ArrowRight, 
  Zap, 
  Car, 
  Keyboard, 
  ShieldAlert,
  Image as ImageIcon
} from 'lucide-react';
import { PUBLIC_API } from '../config/api';

/**
 * Extracts pure Tag ID or secure token from raw QR text or CarFrnd URLs
 * Handles:
 * - CFD-BLR-000001
 * - https://carfrnd.com/q/f28d2776467e1af741833e6f1b29fd5523dc66ce9b968b05
 * - https://findowner.carfrnd.com/q/f28d2776467e1af741833e6f1b29fd5523dc66ce9b968b05
 * - https://carfrnd.com/activate-tag?tag=CFD-BLR-000001
 * - JSON { tagId: "..." }
 */
export function extractTagIdFromText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';
  let str = rawText.trim().replace(/^["']|["']$/g, '');

  // Try JSON
  if (str.startsWith('{') && str.endsWith('}')) {
    try {
      const parsed = JSON.parse(str);
      const val = parsed.tagId || parsed.serialNumber || parsed.secureToken || parsed.tag || parsed.id || parsed.serial;
      if (val) return String(val).trim();
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
      if (qTag) return qTag.trim();

      // Path matching: /q/:token, /scan/:token, /tag/:token
      const pathMatch = url.pathname.match(/\/(?:q|scan|tag|tags)\/([^/?#]+)/i);
      if (pathMatch && pathMatch[1]) {
        return decodeURIComponent(pathMatch[1]).trim();
      }

      // Last path segment fallback
      const segments = url.pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        const last = segments[segments.length - 1];
        if (last && last.length <= 64 && !['q', 'scan', 'activate', 'activate-tag', 'index.html'].includes(last.toLowerCase())) {
          return decodeURIComponent(last).trim();
        }
      }
    }
  } catch (err) {
    // ignore URL parsing error
  }

  // Plain string cleanup
  const clean = str.replace(/["']/g, '').trim();
  // If it's a 32+ character hex string, keep lowercase for PostgreSQL matching
  if (/^[a-fA-F0-9]{32,64}$/.test(clean)) {
    return clean.toLowerCase();
  }
  // If it's a serial number like CFD-BLR-000001, keep uppercase
  if (/^[a-zA-Z]{2,4}-[a-zA-Z0-9]+-[0-9]+$/i.test(clean)) {
    return clean.toUpperCase();
  }
  return clean;
}

/**
 * Play synthesizer chime on successful scan
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
    osc.frequency.setValueAtTime(880, now);
    osc.frequency.setValueAtTime(1760, now + 0.08);
    
    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
    
    osc.start(now);
    osc.stop(now + 0.28);
  } catch (e) {
    // Audio blocked or unsupported
  }
}

export default function QRScannerModal({ 
  isOpen, 
  onClose, 
  onScanSuccess, 
  onNavigate,
  defaultGoal = 'auto' 
}) {
  const [selectedGoal, setSelectedGoal] = useState(defaultGoal);
  const [inputTab, setInputTab] = useState('camera'); // 'camera' | 'upload' | 'manual'
  const [manualCodeInput, setManualCodeInput] = useState('');
  const [manualInputError, setManualInputError] = useState('');

  // Camera stream state
  const [cameras, setCameras] = useState([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState(0);
  const [scannerStatus, setScannerStatus] = useState('initializing'); // 'initializing' | 'scanning' | 'detected' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [torchSupported, setTorchSupported] = useState(false);
  const [isTorchOn, setIsTorchOn] = useState(false);

  // File upload state
  const [isFileScanning, setIsFileScanning] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [fileScanError, setFileScanError] = useState('');

  // Resolution state
  const [resolving, setResolving] = useState(false);
  const [detectedTag, setDetectedTag] = useState('');
  const [resolutionResult, setResolutionResult] = useState(null);

  const scannerInstanceRef = useRef(null);
  const isStoppingRef = useRef(false);
  const fileInputRef = useRef(null);
  const cameraContainerId = 'carfrnd-qr-camera-viewport';
  const fileContainerId = 'carfrnd-qr-file-helper-viewport';

  // Safely stop live camera
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

  // Start live camera
  const startCamera = async (cameraIndex = 0) => {
    try {
      await stopScanner();
      setScannerStatus('initializing');
      setErrorMessage('');

      let availableDevices = cameras;
      if (!availableDevices || availableDevices.length === 0) {
        try {
          availableDevices = await Html5Qrcode.getCameras();
          setCameras(availableDevices || []);
        } catch (camErr) {
          console.warn('Could not enumerate cameras:', camErr);
        }
      }

      const html5QrCode = new Html5Qrcode(cameraContainerId, { verbose: false });
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
        () => {}
      );

      setScannerStatus('scanning');

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
      console.error('Camera Start Error:', err);
      setScannerStatus('error');
      
      const errStr = String(err?.message || err || '');
      if (errStr.includes('NotAllowedError') || errStr.includes('Permission')) {
        setErrorMessage('Camera access was denied. Please allow camera permissions in your browser or enter Tag ID manually.');
      } else if (errStr.includes('NotFoundError') || errStr.includes('No cameras')) {
        setErrorMessage('No camera was detected. You can upload an image or type the Tag ID manually.');
      } else {
        setErrorMessage('Could not open camera stream. You can upload a photo or type the Tag ID manually.');
      }
    }
  };

  // Flip camera
  const handleSwitchCamera = async () => {
    if (cameras.length <= 1) return;
    const nextIdx = (currentCameraIndex + 1) % cameras.length;
    setCurrentCameraIndex(nextIdx);
    await startCamera(nextIdx);
  };

  // Toggle torch
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

  // File upload scan with preview and dedicated container
  const handleFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsFileScanning(true);
    setFileScanError('');
    setErrorMessage('');

    // Create thumbnail preview
    const reader = new FileReader();
    reader.onload = (uploadEvt) => {
      setUploadedPreview(uploadEvt.target?.result || null);
    };
    reader.readAsDataURL(file);

    try {
      await stopScanner();

      // Use dedicated permanent DOM container for file decoding
      const fileScanner = new Html5Qrcode(fileContainerId, { verbose: false });
      const decodedResult = await fileScanner.scanFile(file, true);
      
      try { await fileScanner.clear(); } catch (cErr) {}

      if (decodedResult) {
        handleDecodedCode(decodedResult);
      } else {
        throw new Error('No QR code detected in this photo');
      }
    } catch (err) {
      console.warn('File scan error:', err);
      setFileScanError('Could not find a valid CarFrnd QR code in that photo. Please try a clearer, brighter photo or enter the Tag ID in the "Enter Tag ID" tab.');
    } finally {
      setIsFileScanning(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Resolve Tag based on selected Goal
  const resolveTag = async (tagCode, goalToUse = selectedGoal) => {
    const clean = extractTagIdFromText(tagCode);
    if (!clean) {
      setManualInputError('Please enter a valid Tag ID or scan a CarFrnd QR code.');
      return;
    }

    setDetectedTag(clean);
    setResolving(true);
    setResolutionResult(null);

    // Audio chime & haptics
    playSuccessBeep();
    if (navigator.vibrate) {
      try { navigator.vibrate([50, 40, 100]); } catch (e) {}
    }

    // Stop camera video stream
    await stopScanner();

    // 1. Direct callback override (e.g. from ActivateTagPage step 1)
    if (onScanSuccess) {
      setTimeout(() => {
        onScanSuccess(clean);
        onClose();
      }, 500);
      return;
    }

    // 2. Explicit User Selection: 'complaint' / 'Reach Owner'
    // Immediately navigates to public-scan (/q/:token) where last 4 digits verification gate, call, and SMS alerts live!
    if (goalToUse === 'complaint') {
      setResolutionResult({
        status: 'activated',
        tagId: clean,
        message: 'Opening Vehicle Owner Reach-Out & Assistance Portal...'
      });
      setTimeout(() => {
        if (onNavigate) onNavigate('public-scan', clean);
        onClose();
      }, 500);
      return;
    }

    // 3. Explicit User Selection: 'activate'
    if (goalToUse === 'activate') {
      setResolutionResult({
        status: 'unassigned',
        tagId: clean,
        message: 'Opening Tag Activation Form...'
      });
      setTimeout(() => {
        if (onNavigate) onNavigate('activate-tag', { tag: clean });
        onClose();
      }, 500);
      return;
    }

    // 4. Auto-Detect: Check live tag status with backend
    try {
      const res = await fetch(PUBLIC_API.scanTag(clean));
      const data = await res.json().catch(() => null);

      if (data && data.valid && data.status === 'ACTIVATED') {
        // Tag is ACTIVATED -> Bystander reach-out / complaint flow
        setResolutionResult({
          status: 'activated',
          tagId: clean,
          vehicle: data.vehicle,
          message: 'Active Vehicle Tag Found! Opening Assistance & Contact Portal...'
        });
        setTimeout(() => {
          if (onNavigate) onNavigate('public-scan', clean);
          onClose();
        }, 600);
      } else if (data && (data.status === 'ASSIGNED' || data.status === 'UNASSIGNED')) {
        // Tag is UNREGISTERED -> Activation flow
        const tagToUse = data.serialNumber || clean;
        setResolutionResult({
          status: 'unassigned',
          tagId: tagToUse,
          message: 'New Unregistered Tag! Opening Tag Activation Form...'
        });
        setTimeout(() => {
          if (onNavigate) onNavigate('activate-tag', { tag: tagToUse });
          onClose();
        }, 600);
      } else {
        // Ambiguous / Not found -> User decision
        setResolutionResult({
          status: 'ambiguous',
          tagId: clean,
          message: 'Tag code detected. Please choose your goal below:'
        });
      }
    } catch (netErr) {
      console.warn('Error checking tag status:', netErr);
      // Offline fallback -> User decision
      setResolutionResult({
        status: 'ambiguous',
        tagId: clean,
        message: 'Tag code detected. Please choose your goal below:'
      });
    } finally {
      setResolving(false);
    }
  };

  // Handle Decoded QR Text
  const handleDecodedCode = (decodedText) => {
    if (!decodedText || resolving) return;
    resolveTag(decodedText);
  };

  // Handle Manual Code Submit
  const handleManualSubmit = (e) => {
    if (e) e.preventDefault();
    if (!manualCodeInput.trim()) {
      setManualInputError('Please enter a Tag ID (e.g. CFD-BLR-000001)');
      return;
    }
    setManualInputError('');
    resolveTag(manualCodeInput.trim());
  };

  // Handle Tab Switch
  const handleTabChange = (newTab) => {
    setInputTab(newTab);
    setErrorMessage('');
    setManualInputError('');
    setFileScanError('');
    if (newTab === 'camera') {
      setTimeout(() => startCamera(currentCameraIndex), 100);
    } else {
      stopScanner();
    }
  };

  // Modal Lifecycle
  useEffect(() => {
    if (isOpen) {
      setSelectedGoal(defaultGoal);
      setInputTab('camera');
      setDetectedTag('');
      setResolutionResult(null);
      setResolving(false);
      setManualCodeInput('');
      setManualInputError('');
      setUploadedPreview(null);
      setFileScanError('');
      setIsTorchOn(false);

      const timer = setTimeout(() => {
        startCamera(0);
      }, 150);
      return () => clearTimeout(timer);
    } else {
      stopScanner();
    }
  }, [isOpen, defaultGoal]);

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
        {/* Permanent hidden container for file decoding */}
        <div id={fileContainerId} style={{ display: 'none' }}></div>

        {/* Modal Top Header */}
        <div className="qr-modal-header">
          <div className="qr-modal-title-wrap">
            <div className="qr-modal-badge">
              <QrCode size={13} color="#FF2B85" />
              <span>Universal CarFrnd Scanner</span>
            </div>
            <h3>Scan CarFrnd Tag</h3>
            <p>One scan connects you to vehicle owners or activates your newly purchased tag.</p>
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

        {/* Dual Goal Selector Bar (Works for Activate & Complaint) */}
        {!onScanSuccess && !resolutionResult && (
          <div className="qr-goal-selector-bar">
            <span className="qr-goal-label">Goal:</span>
            <div className="qr-goal-pills">
              <button
                type="button"
                className={`qr-goal-pill ${selectedGoal === 'auto' ? 'active' : ''}`}
                onClick={() => setSelectedGoal('auto')}
                title="Automatically detect whether tag is already registered or needs activation"
              >
                <Zap size={13} />
                <span>Auto-Detect</span>
              </button>
              <button
                type="button"
                className={`qr-goal-pill ${selectedGoal === 'complaint' ? 'active' : ''}`}
                onClick={() => setSelectedGoal('complaint')}
                title="Report parking issue, blocked vehicle, alert or call vehicle owner"
              >
                <ShieldAlert size={13} />
                <span>Reach Owner</span>
              </button>
              <button
                type="button"
                className={`qr-goal-pill ${selectedGoal === 'activate' ? 'active' : ''}`}
                onClick={() => setSelectedGoal('activate')}
                title="Activate and register a newly purchased CarFrnd sticker"
              >
                <Sparkles size={13} />
                <span>Activate Tag</span>
              </button>
            </div>
          </div>
        )}

        {/* Input Method Navigation Tabs */}
        {!resolutionResult && (
          <div className="qr-method-tabs">
            <button 
              type="button" 
              className={`qr-method-tab ${inputTab === 'camera' ? 'active' : ''}`}
              onClick={() => handleTabChange('camera')}
            >
              <Camera size={15} />
              <span>Camera</span>
            </button>
            <button 
              type="button" 
              className={`qr-method-tab ${inputTab === 'upload' ? 'active' : ''}`}
              onClick={() => handleTabChange('upload')}
            >
              <Upload size={15} />
              <span>Upload Photo</span>
            </button>
            <button 
              type="button" 
              className={`qr-method-tab ${inputTab === 'manual' ? 'active' : ''}`}
              onClick={() => handleTabChange('manual')}
            >
              <Keyboard size={15} />
              <span>Enter Tag ID</span>
            </button>
          </div>
        )}

        {/* Main Viewport Content Area */}
        <div className="qr-scanner-viewport-box">
          {/* Permanent Camera Container (always mounted, hidden when not in camera tab) */}
          <div 
            id={cameraContainerId} 
            className="qr-html5-container"
            style={{ display: (inputTab === 'camera' && !resolutionResult) ? 'block' : 'none' }}
          ></div>

          {/* TAB 1: Camera HUD Overlay & Loaders */}
          {inputTab === 'camera' && !resolutionResult && (
            <>
              {scannerStatus === 'scanning' && !resolving && (
                <div className="qr-hud-overlay">
                  <div className="qr-hud-frame">
                    <div className="corner corner-tl"></div>
                    <div className="corner corner-tr"></div>
                    <div className="corner corner-bl"></div>
                    <div className="corner corner-br"></div>
                    <div className="qr-laser-line"></div>
                    <div className="qr-target-reticle"></div>
                  </div>

                  <div className="qr-hud-hint">
                    <span>Align windshield QR code within frame</span>
                  </div>
                </div>
              )}

              {scannerStatus === 'initializing' && !resolving && (
                <div className="qr-viewport-loading">
                  <div className="qr-spin-ring"></div>
                  <p>Initializing Camera...</p>
                </div>
              )}

              {scannerStatus === 'error' && !resolving && (
                <div className="qr-viewport-error">
                  <div className="qr-error-icon-box">
                    <AlertTriangle size={30} color="#F59E0B" />
                  </div>
                  <h4>Camera Access Needed</h4>
                  <p>{errorMessage || 'Unable to open camera stream.'}</p>

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
                      className="qr-btn-switch-tab" 
                      onClick={() => handleTabChange('manual')}
                    >
                      <Keyboard size={14} /> Enter Tag Manually
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: Upload Photo */}
          {inputTab === 'upload' && !resolutionResult && (
            <div className="qr-upload-tab-pane">
              <div 
                className={`qr-upload-dropzone ${isFileScanning ? 'scanning' : ''}`} 
                onClick={() => !isFileScanning && fileInputRef.current?.click()}
              >
                {uploadedPreview && isFileScanning ? (
                  <div className="qr-upload-preview-wrap">
                    <img src={uploadedPreview} alt="Uploaded QR" className="qr-preview-img" />
                    <div className="qr-preview-scanning-overlay">
                      <div className="qr-spin-ring"></div>
                      <span>Scanning QR Code...</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="qr-upload-icon-circle">
                      <Upload size={28} color="#FF2B85" />
                    </div>
                    <h4>Upload QR Photo</h4>
                    <p>Select a clear photo or screenshot containing the CarFrnd QR sticker.</p>
                    <button type="button" className="btn-browse-file" disabled={isFileScanning}>
                      {isFileScanning ? 'Scanning Image...' : 'Choose Photo'}
                    </button>
                  </>
                )}
              </div>

              {fileScanError && (
                <div className="qr-file-err-banner">
                  <AlertTriangle size={16} color="#F59E0B" />
                  <div className="qr-file-err-text">
                    <span>{fileScanError}</span>
                    <button 
                      type="button" 
                      className="qr-btn-err-link"
                      onClick={() => handleTabChange('manual')}
                    >
                      Enter Tag ID Manually →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Enter Tag ID Manually */}
          {inputTab === 'manual' && !resolutionResult && (
            <div className="qr-manual-tab-pane">
              <form onSubmit={handleManualSubmit} className="qr-manual-form">
                <div className="qr-manual-icon-bubble">
                  <Keyboard size={24} color="#FF2B85" />
                </div>
                <h4>Enter Vehicle Tag ID</h4>
                <p>Type the Serial Number or Tag ID printed on the windshield sticker.</p>

                <div className="qr-manual-input-wrap">
                  <input
                    type="text"
                    className="qr-manual-input"
                    placeholder="e.g. CFD-BLR-000001 or f28d2..."
                    value={manualCodeInput}
                    onChange={(e) => {
                      setManualCodeInput(e.target.value);
                      setManualInputError('');
                    }}
                    autoFocus
                  />
                  <button type="submit" className="qr-manual-submit-btn" disabled={resolving}>
                    <ArrowRight size={18} />
                  </button>
                </div>

                {manualInputError && (
                  <div className="qr-manual-err-text">
                    <AlertTriangle size={13} />
                    <span>{manualInputError}</span>
                  </div>
                )}

                <div className="qr-manual-hints">
                  <span>💡 Examples: CFD-BLR-000001, CFD-MUM-000042, or your printed tag code</span>
                </div>
              </form>
            </div>
          )}

          {/* Resolving / Progress Loader */}
          {resolving && (
            <div className="qr-viewport-resolving">
              <div className="qr-spin-ring"></div>
              <h4>Analyzing Tag: <span className="font-mono">{detectedTag}</span></h4>
              <p>Verifying vehicle status and routing...</p>
            </div>
          )}

          {/* Resolution Result Banner: Activated (Complaint) */}
          {resolutionResult && resolutionResult.status === 'activated' && (
            <div className="qr-viewport-detected activated">
              <div className="qr-detected-bubble">
                <div className="qr-detected-icon-circle green">
                  <CheckCircle2 size={36} color="#10B981" />
                </div>
                <h4>Active Vehicle Tag!</h4>
                <div className="qr-detected-tag-code font-mono">{resolutionResult.tagId}</div>
                {resolutionResult.vehicle && (
                  <div className="qr-detected-vehicle-info">
                    <Car size={16} />
                    <span>{resolutionResult.vehicle.makeModel || 'Registered Vehicle'} • {resolutionResult.vehicle.maskedReg || ''}</span>
                  </div>
                )}
                <p className="qr-routing-hint">{resolutionResult.message || 'Directing to Owner Reach-Out & Assistance Portal...'}</p>
                <div className="qr-auto-forward-bar">
                  <div className="qr-auto-forward-progress"></div>
                </div>
              </div>
            </div>
          )}

          {/* Resolution Result Banner: Unassigned (Activate) */}
          {resolutionResult && resolutionResult.status === 'unassigned' && (
            <div className="qr-viewport-detected unassigned">
              <div className="qr-detected-bubble">
                <div className="qr-detected-icon-circle purple">
                  <Sparkles size={36} color="#A855F7" />
                </div>
                <h4>New Unregistered Tag!</h4>
                <div className="qr-detected-tag-code font-mono">{resolutionResult.tagId}</div>
                <p className="qr-routing-hint">{resolutionResult.message || 'Directing to Tag Activation Form...'}</p>
                <div className="qr-auto-forward-bar">
                  <div className="qr-auto-forward-progress"></div>
                </div>
              </div>
            </div>
          )}

          {/* Resolution Result Banner: Ambiguous / User Choice */}
          {resolutionResult && resolutionResult.status === 'ambiguous' && (
            <div className="qr-viewport-choice">
              <div className="qr-choice-bubble">
                <div className="qr-detected-tag-code font-mono">{resolutionResult.tagId}</div>
                <h4>Tag Code Captured</h4>
                <p>What would you like to do with this CarFrnd Tag?</p>

                <div className="qr-choice-buttons">
                  <button
                    type="button"
                    className="qr-btn-choice-reach"
                    onClick={() => {
                      if (onNavigate) onNavigate('public-scan', resolutionResult.tagId);
                      onClose();
                    }}
                  >
                    <ShieldAlert size={18} />
                    <div className="qr-choice-btn-text">
                      <span className="choice-btn-main">Reach Owner / Complaint</span>
                      <span className="choice-btn-sub">Verify last 4 digits, call owner, or send SMS alert</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    className="qr-btn-choice-activate"
                    onClick={() => {
                      if (onNavigate) onNavigate('activate-tag', { tag: resolutionResult.tagId });
                      onClose();
                    }}
                  >
                    <Sparkles size={18} />
                    <div className="qr-choice-btn-text">
                      <span className="choice-btn-main">Activate This New Tag</span>
                      <span className="choice-btn-sub">Register vehicle details & link phone</span>
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  className="qr-btn-rescan"
                  onClick={() => {
                    setResolutionResult(null);
                    setDetectedTag('');
                    setInputTab('camera');
                    startCamera(0);
                  }}
                >
                  <RefreshCw size={13} />
                  <span>Scan Different Tag</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls Bar for Camera Mode */}
        {inputTab === 'camera' && !resolutionResult && (
          <div className="qr-controls-bar">
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

            <button 
              type="button" 
              className="qr-control-btn"
              onClick={() => fileInputRef.current?.click()}
              disabled={isFileScanning}
              title="Upload photo of QR code"
            >
              <Upload size={16} />
              <span>{isFileScanning ? 'Scanning...' : 'Upload Image'}</span>
            </button>
          </div>
        )}

        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileSelected} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />

        {/* Modal Footer Info */}
        <div className="qr-modal-footer">
          <div className="qr-security-note">
            <ShieldCheck size={13} color="#10B981" />
            <span>Encrypted QR processing • No imagery or camera feed is stored.</span>
          </div>
        </div>
      </div>

      <style>{`
        .qr-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.82);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
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
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 22px;
          width: 100%;
          max-width: 480px;
          color: #F8FAFC;
          box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(255, 43, 133, 0.16);
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
          padding: 18px 20px 12px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .qr-modal-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 43, 133, 0.15);
          border: 1px solid rgba(255, 43, 133, 0.35);
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
          margin: 0 0 3px 0;
        }

        .qr-modal-title-wrap p {
          font-size: 0.8rem;
          color: #94A3B8;
          margin: 0;
          line-height: 1.35;
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
          flex-shrink: 0;
        }

        .qr-modal-close-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          color: #FFFFFF;
        }

        /* Goal Selector Bar */
        .qr-goal-selector-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.02);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .qr-goal-label {
          font-size: 0.74rem;
          font-weight: 700;
          color: #64748B;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .qr-goal-pills {
          display: flex;
          gap: 6px;
          flex: 1;
        }

        .qr-goal-pill {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94A3B8;
          padding: 5px 8px;
          border-radius: 8px;
          font-size: 0.74rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          transition: all 0.2s ease;
        }

        .qr-goal-pill:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #FFFFFF;
        }

        .qr-goal-pill.active {
          background: rgba(255, 43, 133, 0.18);
          border-color: #FF2B85;
          color: #FFFFFF;
          box-shadow: 0 0 10px rgba(255, 43, 133, 0.25);
        }

        /* Method Tabs */
        .qr-method-tabs {
          display: flex;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: #090D16;
        }

        .qr-method-tab {
          flex: 1;
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          color: #94A3B8;
          padding: 10px 0;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          transition: all 0.2s;
        }

        .qr-method-tab:hover {
          color: #FFFFFF;
        }

        .qr-method-tab.active {
          color: #FF2B85;
          border-bottom-color: #FF2B85;
          background: rgba(255, 43, 133, 0.05);
        }

        /* Viewport Box */
        .qr-scanner-viewport-box {
          position: relative;
          background: #020617;
          min-height: 310px;
          max-height: 360px;
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

        #carfrnd-qr-camera-viewport__scan_region {
          background: transparent !important;
        }
        #carfrnd-qr-camera-viewport img {
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
          width: 210px;
          height: 210px;
          border: 1px dashed rgba(255, 43, 133, 0.4);
          border-radius: 16px;
          box-shadow: 0 0 0 9999px rgba(2, 6, 23, 0.48);
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
          margin-top: 16px;
          background: rgba(15, 23, 42, 0.88);
          border: 1px solid rgba(255, 255, 255, 0.15);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.74rem;
          color: #E2E8F0;
          font-weight: 600;
          backdrop-filter: blur(4px);
        }

        /* Upload Tab */
        .qr-upload-tab-pane {
          width: 100%;
          height: 100%;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .qr-upload-dropzone {
          border: 2px dashed rgba(255, 43, 133, 0.35);
          border-radius: 16px;
          background: rgba(255, 255, 255, 0.02);
          width: 100%;
          max-width: 360px;
          padding: 26px 18px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .qr-upload-dropzone:hover {
          border-color: #FF2B85;
          background: rgba(255, 43, 133, 0.04);
        }

        .qr-upload-icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 43, 133, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 10px auto;
        }

        .qr-upload-dropzone h4 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 6px 0;
        }

        .qr-upload-dropzone p {
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0 0 14px 0;
        }

        .btn-browse-file {
          background: #FF2B85;
          color: #FFFFFF;
          border: none;
          padding: 8px 18px;
          border-radius: 10px;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-browse-file:hover {
          background: #E01E72;
        }

        .qr-upload-preview-wrap {
          position: relative;
          width: 140px;
          height: 140px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #FF2B85;
        }

        .qr-preview-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .qr-preview-scanning-overlay {
          position: absolute;
          inset: 0;
          background: rgba(15, 23, 42, 0.85);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .qr-file-err-banner {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 10px 14px;
          border-radius: 10px;
          max-width: 380px;
          text-align: left;
        }

        .qr-file-err-text {
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.76rem;
          color: #F8FAFC;
          line-height: 1.35;
        }

        .qr-btn-err-link {
          background: none;
          border: none;
          color: #FF2B85;
          font-size: 0.76rem;
          font-weight: 800;
          cursor: pointer;
          padding: 0;
          text-align: left;
          text-decoration: underline;
        }

        /* Manual Tab */
        .qr-manual-tab-pane {
          width: 100%;
          height: 100%;
          padding: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-manual-form {
          width: 100%;
          max-width: 360px;
          text-align: center;
        }

        .qr-manual-icon-bubble {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 43, 133, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 12px auto;
        }

        .qr-manual-form h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 6px 0;
        }

        .qr-manual-form p {
          font-size: 0.78rem;
          color: #94A3B8;
          margin: 0 0 18px 0;
        }

        .qr-manual-input-wrap {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1.5px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          padding: 4px;
          transition: border-color 0.2s;
        }

        .qr-manual-input-wrap:focus-within {
          border-color: #FF2B85;
          box-shadow: 0 0 12px rgba(255, 43, 133, 0.25);
        }

        .qr-manual-input {
          flex: 1;
          background: none;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-family: monospace;
          font-size: 0.95rem;
          font-weight: 700;
          padding: 8px 12px;
          letter-spacing: 0.05em;
        }

        .qr-manual-submit-btn {
          background: #FF2B85;
          color: #FFFFFF;
          border: none;
          width: 38px;
          height: 38px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .qr-manual-submit-btn:hover {
          transform: scale(1.05);
        }

        .qr-manual-err-text {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #F87171;
          font-size: 0.75rem;
          font-weight: 700;
          margin-top: 8px;
        }

        .qr-manual-hints {
          margin-top: 14px;
          font-size: 0.72rem;
          color: #64748B;
        }

        /* Resolving & Loading */
        .qr-viewport-loading, .qr-viewport-resolving {
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
          padding: 24px;
          text-align: center;
          background: rgba(2, 6, 23, 0.95);
          z-index: 25;
        }

        .qr-viewport-resolving h4 {
          font-size: 1.1rem;
          color: #FFFFFF;
          margin: 0;
        }

        .qr-viewport-resolving p {
          font-size: 0.8rem;
          color: #94A3B8;
          margin: 0;
        }

        .qr-spin-ring {
          width: 38px;
          height: 38px;
          border: 3px solid rgba(255, 43, 133, 0.2);
          border-top-color: #FF2B85;
          border-radius: 50%;
          animation: qrSpin 0.9s linear infinite;
        }

        @keyframes qrSpin {
          to { transform: rotate(360deg); }
        }

        /* Detected Banners */
        .qr-viewport-detected {
          position: absolute;
          inset: 0;
          background: rgba(2, 6, 23, 0.95);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          animation: qrDetectedPop 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes qrDetectedPop {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .qr-detected-bubble {
          text-align: center;
          padding: 24px;
          max-width: 380px;
        }

        .qr-detected-icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin: 0 auto 12px auto;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .qr-detected-icon-circle.green {
          background: rgba(16, 185, 129, 0.15);
          border: 2px solid #10B981;
        }

        .qr-detected-icon-circle.purple {
          background: rgba(168, 85, 247, 0.15);
          border: 2px solid #A855F7;
        }

        .qr-detected-bubble h4 {
          font-size: 1.3rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0 0 6px 0;
        }

        .qr-detected-tag-code {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #38BDF8;
          font-size: 1.05rem;
          font-weight: 900;
          padding: 6px 16px;
          border-radius: 8px;
          display: inline-block;
          margin: 6px 0 10px 0;
          letter-spacing: 0.05em;
          word-break: break-all;
        }

        .qr-detected-vehicle-info {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.06);
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.78rem;
          color: #E2E8F0;
          margin-bottom: 8px;
        }

        .qr-routing-hint {
          font-size: 0.82rem;
          color: #94A3B8;
          margin: 0 0 16px 0;
        }

        .qr-auto-forward-bar {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
        }

        .qr-auto-forward-progress {
          height: 100%;
          background: linear-gradient(90deg, #FF2B85, #10B981);
          animation: autoForward 0.6s ease-in-out forwards;
        }

        @keyframes autoForward {
          from { width: 0%; }
          to { width: 100%; }
        }

        /* Choice Viewport */
        .qr-viewport-choice {
          position: absolute;
          inset: 0;
          background: #020617;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 30;
          padding: 20px;
        }

        .qr-choice-bubble {
          text-align: center;
          width: 100%;
          max-width: 380px;
        }

        .qr-choice-bubble h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 8px 0 4px 0;
        }

        .qr-choice-bubble p {
          font-size: 0.8rem;
          color: #94A3B8;
          margin: 0 0 18px 0;
        }

        .qr-choice-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 14px;
        }

        .qr-btn-choice-reach {
          background: rgba(255, 43, 133, 0.12);
          border: 1.5px solid #FF2B85;
          color: #FFFFFF;
          padding: 12px 14px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          transition: all 0.2s;
        }

        .qr-btn-choice-reach:hover {
          background: rgba(255, 43, 133, 0.25);
          transform: translateY(-1px);
        }

        .qr-btn-choice-activate {
          background: rgba(168, 85, 247, 0.12);
          border: 1.5px solid #A855F7;
          color: #FFFFFF;
          padding: 12px 14px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
          transition: all 0.2s;
        }

        .qr-btn-choice-activate:hover {
          background: rgba(168, 85, 247, 0.25);
          transform: translateY(-1px);
        }

        .qr-choice-btn-text {
          display: flex;
          flex-direction: column;
        }

        .choice-btn-main {
          font-size: 0.88rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .choice-btn-sub {
          font-size: 0.72rem;
          color: #94A3B8;
        }

        .qr-btn-rescan {
          background: none;
          border: none;
          color: #64748B;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px;
          transition: color 0.2s;
        }

        .qr-btn-rescan:hover {
          color: #FFFFFF;
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
          width: 50px;
          height: 50px;
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
          max-width: 320px;
          margin: 0 0 16px 0;
          line-height: 1.4;
        }

        .qr-error-actions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .qr-btn-retry, .qr-btn-switch-tab {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #F8FAFC;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .qr-btn-switch-tab {
          background: #FF2B85;
          border-color: #FF2B85;
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
          padding: 10px 18px;
          background: rgba(255, 255, 255, 0.02);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .qr-control-btn {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: #E2E8F0;
          padding: 7px 12px;
          border-radius: 8px;
          font-size: 0.76rem;
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
          padding: 12px 20px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          align-items: center;
        }

        .qr-security-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          color: #64748B;
        }
      `}</style>
    </div>
  );
}
