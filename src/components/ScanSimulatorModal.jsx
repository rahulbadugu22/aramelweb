import React, { useState } from 'react';
import { QrCode, PhoneOff, AlertTriangle, Lightbulb, ShieldAlert, CheckCircle2, PhoneCall, Send, Camera, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ScanSimulatorModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [vehicleNo] = useState('MH 01 AB 1234');
  const [selectedIssue, setSelectedIssue] = useState('Car Blocking Driveway / Gate');
  const [customNote, setCustomNote] = useState('');
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const issues = [
    { label: 'Car Blocking Driveway / Gate', icon: AlertTriangle },
    { label: 'Headlights / Hazard Lights Left On', icon: Lightbulb },
    { label: 'Car Window Left Open', icon: Camera },
    { label: 'Emergency / Towing Alert', icon: ShieldAlert },
  ];

  const handleDispatch = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setStep(3);
      confetti({
        particleCount: 90,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedIssue('Car Blocking Driveway / Gate');
    setCustomNote('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="sim-modal-box glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="sim-close-btn" onClick={onClose}>×</button>

        {/* Viewfinder Header */}
        <div className="sim-header">
          <div className="sim-badge">
            <span className="dot-red"></span> LIVE CARFRND TAG SCANNER
          </div>
          <h3>CarFrnd Tag App-Free Scanner</h3>
        </div>

        {/* Step 1 & 2: Camera View & Issue Selector */}
        {step < 3 && (
          <div className="sim-body">
            {/* Viewfinder Box */}
            <div className="cam-viewfinder">
              <div className="scan-corner top-left"></div>
              <div className="scan-corner top-right"></div>
              <div className="scan-corner bottom-left"></div>
              <div className="scan-corner bottom-right"></div>

              <div className="laser-beam"></div>

              <div className="scanned-tag-banner">
                <QrCode size={36} color="#FF2B85" />
                <div className="scanned-info">
                  <span className="v-plate">{vehicleNo}</span>
                  <span className="v-tagid">CarFrnd Tag Verified</span>
                  <span className="v-tagid-sub">Tag ID: KA560100MM1234</span>
                </div>
              </div>
            </div>

            {/* Issue Selection Section */}
            <div className="issue-selection-section">
              <span className="section-label">SELECT A REASON TO NOTIFY THE OWNER</span>
              <div className="issue-grid">
                {issues.map((iss) => {
                  const IconC = iss.icon;
                  const isSel = selectedIssue === iss.label;
                  return (
                    <button
                      key={iss.label}
                      className={`issue-chip ${isSel ? 'active' : ''}`}
                      onClick={() => setSelectedIssue(iss.label)}
                    >
                      <IconC size={16} />
                      <span>{iss.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="form-group mt-12">
                <input
                  type="text"
                  placeholder="Add an optional note (e.g., Parked near gate #2...)"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    background: '#F8FAFC',
                    fontSize: '0.9rem',
                    outline: 'none',
                    color: '#0F172A'
                  }}
                />
              </div>

              <button
                className="btn-primary full-w mt-16"
                disabled={isSending}
                onClick={handleDispatch}
              >
                {isSending ? (
                  <>
                    <RefreshCw size={18} className="spin-icon" /> Sending Secure Alert...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Anonymous Masked Alert
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success Masked Call State */}
        {step === 3 && (
          <div className="sim-success-view">
            <div className="masked-call-card">
              <div className="call-avatar-wrap pulse-ring">
                <PhoneCall size={38} color="#059669" />
              </div>
              <h4>Masked Call Connected</h4>
              <span className="issue-recap">Reason: "{selectedIssue}"</span>

              <div className="masked-phone-display">
                <span className="phone-line">Caller ID: <code>Hidden</code></span>
                <span className="phone-line">Owner ID: <code>Hidden</code></span>
                <span className="privacy-shield-txt">
                  <PhoneOff size={14} /> Phone numbers remain hidden from both sides.
                </span>
              </div>

              <div className="alert-delivered-badge">
                <CheckCircle2 size={18} color="#059669" /> Owner Notified & Masked Call Connected
              </div>

              <div className="success-modal-actions">
                <button className="btn-secondary" onClick={handleReset}>
                  Scan Another CarFrnd Tag
                </button>
                <button className="btn-primary" onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .sim-modal-box {
          width: 100%;
          max-width: 580px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 32px;
          position: relative;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
        }

        .sim-close-btn {
          position: absolute;
          top: 18px;
          right: 22px;
          background: none;
          border: none;
          color: #64748B;
          font-size: 1.8rem;
          cursor: pointer;
        }

        .sim-close-btn:hover {
          color: var(--magenta);
        }

        .sim-header {
          margin-bottom: 20px;
          text-align: center;
        }

        .sim-badge {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--magenta);
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--magenta-light);
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 6px;
        }

        .dot-red {
          width: 8px;
          height: 8px;
          background: #EF4444;
          border-radius: 50%;
          box-shadow: 0 0 8px #EF4444;
        }

        .sim-header h3 {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0F172A;
        }

        .cam-viewfinder {
          height: 180px;
          background: #0F172A;
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
        }

        .scan-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          border-color: var(--magenta);
          border-style: solid;
        }

        .top-left { top: 16px; left: 16px; border-width: 3px 0 0 3px; }
        .top-right { top: 16px; right: 16px; border-width: 3px 3px 0 0; }
        .bottom-left { bottom: 16px; left: 16px; border-width: 0 0 3px 3px; }
        .bottom-right { bottom: 16px; right: 16px; border-width: 0 3px 3px 0; }

        .laser-beam {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FF2B85, transparent);
          box-shadow: 0 0 15px #FF2B85;
          animation: radarScan 2.5s infinite ease-in-out;
        }

        .scanned-tag-banner {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid var(--magenta-border);
          border-radius: 12px;
          padding: 12px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          z-index: 2;
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }

        .scanned-info {
          display: flex;
          flex-direction: column;
        }

        .v-plate {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 900;
          color: #0F172A;
        }

        .v-tagid {
          font-size: 0.72rem;
          color: #059669;
          font-weight: 700;
        }

        .v-tagid-sub {
          font-size: 0.7rem;
          color: #64748B;
          font-weight: 700;
          font-family: monospace;
        }

        .section-label {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--magenta);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 10px;
        }

        .issue-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .issue-chip {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #334155;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          text-align: left;
          transition: all 0.2s ease;
        }

        .issue-chip:hover, .issue-chip.active {
          background: var(--magenta);
          border-color: var(--magenta);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(255, 43, 133, 0.25);
        }

        .mt-12 { margin-top: 12px; }
        .mt-16 { margin-top: 16px; }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .sim-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 16px 0;
        }

        .masked-call-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          width: 100%;
        }

        .call-avatar-wrap {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          background: #ECFDF5;
          border: 2px solid #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .masked-call-card h4 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
        }

        .issue-recap {
          font-size: 0.88rem;
          color: var(--magenta);
          font-weight: 700;
        }

        .masked-phone-display {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 14px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.85rem;
          color: #334155;
        }

        .phone-line code {
          color: #059669;
          font-family: monospace;
          font-weight: 800;
        }

        .privacy-shield-txt {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.78rem;
          color: #64748B;
          margin-top: 2px;
        }

        .alert-delivered-badge {
          background: #ECFDF5;
          color: #059669;
          border: 1px solid #A7F3D0;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .success-modal-actions {
          display: flex;
          gap: 12px;
          width: 100%;
          margin-top: 12px;
        }

        .success-modal-actions button {
          flex: 1;
        }
      `}</style>
    </div>
  );
}
