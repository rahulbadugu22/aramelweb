import React, { useState, useEffect } from 'react';
import { 
  Car, 
  ShieldCheck, 
  ShieldAlert, 
  PhoneCall, 
  MessageSquare, 
  AlertTriangle, 
  Sparkles, 
  Bell, 
  Truck, 
  CheckCircle2, 
  ArrowLeft, 
  RefreshCw, 
  Send, 
  Lock, 
  AlertCircle,
  ChevronRight,
  KeyRound,
  ShieldQuestion
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PUBLIC_API } from '../config/api';

const ICON_MAP = {
  Car: Car,
  ShieldAlert: ShieldAlert,
  Sparkles: Sparkles,
  Bell: Bell,
  AlertTriangle: AlertTriangle,
  Truck: Truck,
  MessageSquare: MessageSquare
};

export default function PublicScanPage({ token, onNavigate }) {
  // Extract token from prop or URL
  const effectiveToken = token || (() => {
    const p = window.location.pathname;
    const match = p.match(/^\/(?:q|scan)\/(.+)$/i);
    if (match && match[1]) return decodeURIComponent(match[1]);
    const params = new URLSearchParams(window.location.search);
    return params.get('tag') || params.get('token') || params.get('v') || 'CFD-BLR-000001';
  })();

  const [loading, setLoading] = useState(true);
  const [tagData, setTagData] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Plate Verification Gate State
  const [isVerified, setIsVerified] = useState(false);
  const [last4Input, setLast4Input] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [verifiedVehicle, setVerifiedVehicle] = useState(null);

  // UI Tabs: 'message' | 'call'
  const [activeTab, setActiveTab] = useState('message');
  
  // Alert Form State
  const [dynamicReasons, setDynamicReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState(null);
  const [customNote, setCustomNote] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [submittingAlert, setSubmittingAlert] = useState(false);
  const [alertSubmitted, setAlertSubmitted] = useState(false);
  const [lastDispatchedAlert, setLastDispatchedAlert] = useState(null);

  // Call Bridge Modal State
  const [showCallBridgeModal, setShowCallBridgeModal] = useState(false);

  useEffect(() => {
    if (!effectiveToken) {
      setErrorMsg('No CarFrnd QR tag token provided in URL.');
      setLoading(false);
      return;
    }

    const fetchTagData = async () => {
      setLoading(true);
      setErrorMsg('');
      try {
        const res = await fetch(PUBLIC_API.scanTag(effectiveToken));
        const data = await res.json();
        
        if (data) {
          setTagData(data);
          
          // If tag is NOT activated (e.g. ASSIGNED or UNASSIGNED), auto-navigate to activation flow
          if (!data.valid && (data.status === 'ASSIGNED' || data.status === 'UNASSIGNED')) {
            setTimeout(() => {
              onNavigate('activate-tag', { tag: data.serialNumber || effectiveToken });
            }, 800);
            return;
          }

          if (data.valid && data.status === 'ACTIVATED') {
            if (data.reasons && data.reasons.length > 0) {
              setDynamicReasons(data.reasons);
              setSelectedReason(data.reasons[0]);
            }
          } else {
            setErrorMsg(data.message || 'This CarFrnd Tag is not currently active.');
          }
        }
      } catch (err) {
        console.error('Scan fetch error:', err);
        setErrorMsg('Unable to connect to CarFrnd server. Please verify your internet connection.');
      } finally {
        setLoading(false);
      }
    };

    fetchTagData();
  }, [effectiveToken]);

  // Handle Last 4 Digits Verification
  const handleVerifyPlate = async (e) => {
    e.preventDefault();
    const clean = last4Input.trim().toUpperCase();
    if (!clean || clean.length < 3) {
      setVerifyError('Please enter the last 4 digits from the vehicle number plate.');
      return;
    }

    setVerifying(true);
    setVerifyError('');

    try {
      const res = await fetch(PUBLIC_API.verifyPlate(effectiveToken), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ last4: clean })
      });

      const data = await res.json();
      if (res.ok && data.verified) {
        setIsVerified(true);
        setVerifiedVehicle(data.vehicle);
        if (data.reasons && data.reasons.length > 0) {
          setDynamicReasons(data.reasons);
          setSelectedReason(data.reasons[0]);
        }
      } else {
        setVerifyError(data.error || "Incorrect digits! The entered digits do not match the vehicle's registration plate.");
      }
    } catch (err) {
      console.error('Plate verification error:', err);
      setVerifyError('Failed to verify vehicle digits. Please try again.');
    } finally {
      setVerifying(false);
    }
  };

  // Handle Alert Dispatch
  const handleSendAlert = async (e) => {
    e.preventDefault();
    if (!selectedReason && !customNote.trim()) {
      alert('Please select a reason or enter a brief note.');
      return;
    }

    setSubmittingAlert(true);
    try {
      const payload = {
        token: effectiveToken,
        secureToken: tagData?.secureToken || effectiveToken,
        serialNumber: tagData?.serialNumber || effectiveToken,
        vehicleNo: verifiedVehicle?.regNumber || tagData?.vehicle?.maskedReg,
        reasonCode: selectedReason?.code || 'CUSTOM_ALERT',
        reasonTitle: selectedReason?.title || 'Bystander Parking Alert',
        customMessage: customNote.trim(),
        senderPhone: senderPhone.trim()
      };

      const res = await fetch(PUBLIC_API.createAlert, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      if (res.ok && result.success) {
        setAlertSubmitted(true);
        setLastDispatchedAlert(result.alert);
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } else {
        alert(result.error || 'Failed to dispatch alert. Please try again.');
      }
    } catch (err) {
      console.error('Alert submit error:', err);
      alert('Failed to dispatch alert to vehicle owner. Please try again.');
    } finally {
      setSubmittingAlert(false);
    }
  };

  const handleResetAlert = () => {
    setAlertSubmitted(false);
    setCustomNote('');
    setSenderPhone('');
  };

  return (
    <div className="public-scan-container">
      {/* Top Navbar */}
      <header className="scan-navbar">
        <div className="container scan-nav-inner">
          <button className="scan-back-btn" onClick={() => onNavigate('home')}>
            <ArrowLeft size={18} />
            <span>CarFrnd Home</span>
          </button>

          <div className="scan-brand-pill">
            <ShieldCheck size={16} color="#FF2B85" />
            <span>Smart Vehicle Decal</span>
          </div>
        </div>
      </header>

      <main className="container scan-main-content">
        {/* 1. Loading View */}
        {loading && (
          <div className="scan-status-card glass-card text-center">
            <div className="scan-pulse-icon">
              <RefreshCw size={36} className="spin-slow" color="#FF2B85" />
            </div>
            <h3>Reading CarFrnd Tag...</h3>
            <p className="scan-hint-text">Connecting to vehicle safety network.</p>
          </div>
        )}

        {/* 2. Unassigned Tag: Automatic Redirect / One-Tap Activation */}
        {!loading && tagData && !tagData.valid && (tagData.status === 'ASSIGNED' || tagData.status === 'UNASSIGNED') && (
          <div className="scan-status-card glass-card text-center">
            <div className="scan-badge-warn">
              <Sparkles size={48} color="#FF2B85" />
            </div>
            <h2>New CarFrnd Tag Detected!</h2>
            <p className="scan-tag-code-text">Serial: <strong>{tagData.serialNumber || effectiveToken}</strong></p>
            <p className="scan-sub-explain">
              This tag has not been registered yet. Redirecting you to the self-activation setup...
            </p>
            <div style={{ marginTop: '24px' }}>
              <button 
                className="btn-primary full-w"
                onClick={() => onNavigate('activate-tag', { tag: tagData.serialNumber || effectiveToken })}
              >
                Proceed to Tag Activation <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 3. Error / Inactive View */}
        {!loading && errorMsg && !tagData?.valid && tagData?.status !== 'ASSIGNED' && tagData?.status !== 'UNASSIGNED' && (
          <div className="scan-status-card glass-card text-center">
            <div className="scan-badge-err">
              <AlertTriangle size={44} color="#EF4444" />
            </div>
            <h2>Tag Inactive or Not Found</h2>
            <p className="scan-sub-explain">{errorMsg}</p>
            <button className="btn-secondary" onClick={() => onNavigate('home')} style={{ marginTop: '20px' }}>
              Back to Home
            </button>
          </div>
        )}

        {/* 4. Activated Tag: Gate 1 - Anti-Prank Plate Verification */}
        {!loading && tagData && tagData.valid && !isVerified && (
          <div className="verification-gate-card glass-card">
            <div className="gate-header text-center">
              <div className="gate-icon-badge">
                <ShieldQuestion size={44} color="#FF2B85" />
              </div>
              <h3>Vehicle Safety Verification</h3>
              <p className="gate-subtext">
                To ensure you are physically near the vehicle and prevent accidental alerts, please enter the <strong>last 4 digits</strong> of the vehicle's registration plate:
              </p>
            </div>

            {/* Teaser Plate */}
            <div className="teaser-plate-wrap">
              <div className="teaser-plate">
                <div className="teaser-ind">IND</div>
                <div className="teaser-chars">
                  {tagData.vehicle?.platePrefix || 'KA ** ** '}
                  <span className="teaser-unknown">[ ? ? ? ? ]</span>
                </div>
              </div>
              <div className="teaser-meta">
                <span>{tagData.vehicle?.makeModel || 'Registered Vehicle'}</span>
                {tagData.vehicle?.color && <span> • {tagData.vehicle?.color}</span>}
              </div>
            </div>

            {/* Verification Form */}
            <form onSubmit={handleVerifyPlate} className="verify-form">
              <div className="verify-input-group">
                <label className="verify-label">Enter Last 4 Digits of Plate</label>
                <div className="verify-input-wrap">
                  <KeyRound size={20} className="input-key-icon" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    placeholder="e.g. 9876"
                    className="verify-input"
                    value={last4Input}
                    onChange={(e) => {
                      setLast4Input(e.target.value.toUpperCase());
                      setVerifyError('');
                    }}
                    autoFocus
                    required
                  />
                </div>
                <span className="input-hint-small">Look at the car's physical license plate on the front or rear bumper.</span>
              </div>

              {verifyError && (
                <div className="verify-error-box">
                  <AlertCircle size={16} />
                  <span>{verifyError}</span>
                </div>
              )}

              <button 
                type="submit" 
                className="btn-primary full-w verify-submit-btn"
                disabled={verifying}
              >
                {verifying ? (
                  <>
                    <RefreshCw size={18} className="spin-slow" />
                    <span>Verifying Vehicle Plate...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    <span>Verify Plate & Open Options</span>
                  </>
                )}
              </button>

              <div className="no-signin-reassurance text-center">
                <Lock size={13} color="#64748B" />
                <span>No sign-in or account required for bystanders.</span>
              </div>
            </form>
          </div>
        )}

        {/* 5. Activated Tag: Gate 2 - Unlocked Assistance Dashboard */}
        {!loading && tagData && tagData.valid && isVerified && (
          <div className="scan-active-layout">
            {/* Vehicle Plate Unlocked Card */}
            <div className="vehicle-plate-card glass-card">
              <div className="plate-top-row">
                <span className="secure-badge">
                  <CheckCircle2 size={14} color="#10B981" />
                  <span>Plate Verified Near Vehicle</span>
                </span>
                <span className="live-pulse-badge">
                  <span className="green-dot"></span> Owner Online
                </span>
              </div>

              {/* Verified High-Contrast Indian License Plate */}
              <div className="license-plate-display">
                <div className="plate-ind-strip">
                  <span className="ind-text">IND</span>
                  <div className="ind-chakra-dot"></div>
                </div>
                <div className="plate-number-box">
                  {verifiedVehicle?.maskedReg || verifiedVehicle?.regNumber || tagData.vehicle?.maskedReg}
                </div>
              </div>

              <div className="vehicle-meta-info">
                <span className="veh-model">{verifiedVehicle?.makeModel || tagData.vehicle?.makeModel}</span>
                <span className="veh-color">• {verifiedVehicle?.color || tagData.vehicle?.color || 'Standard'}</span>
              </div>

              {/* Privacy Shield Reassurance Banner */}
              <div className="privacy-reassurance-banner">
                <Lock size={15} color="#059669" />
                <span>
                  <strong>100% Confidential:</strong> Your phone number and the car owner's number stay private. All notifications are routed anonymously.
                </span>
              </div>
            </div>

            {/* Action Mode Switcher (Message vs Call) */}
            <div className="action-mode-switcher">
              <button 
                type="button"
                className={`mode-btn ${activeTab === 'message' ? 'active' : ''}`}
                onClick={() => setActiveTab('message')}
              >
                <MessageSquare size={18} />
                <span>Send Alert Message</span>
              </button>

              <button 
                type="button"
                className={`mode-btn ${activeTab === 'call' ? 'active' : ''}`}
                onClick={() => setActiveTab('call')}
              >
                <PhoneCall size={18} />
                <span>Call Owner (Masked)</span>
              </button>
            </div>

            {/* TAB 1: Send Alert Message Flow */}
            {activeTab === 'message' && (
              <div className="bystander-action-card glass-card">
                {!alertSubmitted ? (
                  <form onSubmit={handleSendAlert}>
                    <div className="section-title-wrap">
                      <h4>What's the issue with this vehicle?</h4>
                      <p>Select a dynamic parking reason below to notify the owner immediately.</p>
                    </div>

                    {/* Dynamic Reasons Grid */}
                    <div className="reasons-grid">
                      {(dynamicReasons || []).map((reason) => {
                        const IconComponent = ICON_MAP[reason.icon] || AlertTriangle;
                        const isSelected = selectedReason?.code === reason.code;
                        return (
                          <div 
                            key={reason.code} 
                            className={`reason-chip-card ${isSelected ? 'selected' : ''}`}
                            onClick={() => setSelectedReason(reason)}
                          >
                            <div className="reason-icon-wrap">
                              <IconComponent size={20} color={isSelected ? '#FF2B85' : '#475569'} />
                            </div>
                            <div className="reason-content">
                              <span className="reason-title">{reason.title}</span>
                              <span className="reason-desc">{reason.description}</span>
                            </div>
                            {isSelected && (
                              <div className="selected-check-indicator">
                                <CheckCircle2 size={16} color="#FF2B85" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Optional Custom Note */}
                    <div className="form-group-field" style={{ marginTop: '20px' }}>
                      <label className="field-label">Additional Note or Exact Location (Optional)</label>
                      <textarea
                        className="field-textarea"
                        placeholder="e.g. Parked in slot #14, gate #2, hazard lights blinking, or minor bump on bumper"
                        rows={2}
                        value={customNote}
                        onChange={(e) => setCustomNote(e.target.value)}
                      />
                    </div>

                    {/* Optional Sender Mobile */}
                    <div className="form-group-field">
                      <label className="field-label">Your Mobile Number (Optional)</label>
                      <input 
                        type="tel"
                        className="field-input"
                        placeholder="e.g. 9876543210 (if you want owner to acknowledge or reply)"
                        value={senderPhone}
                        onChange={(e) => setSenderPhone(e.target.value)}
                      />
                      <span className="field-hint">CarFrnd keeps this confidential and only uses it to connect you if needed.</span>
                    </div>

                    {/* Submit CTA */}
                    <button 
                      type="submit" 
                      className="btn-primary full-w submit-alert-btn"
                      disabled={submittingAlert}
                    >
                      {submittingAlert ? (
                        <>
                          <RefreshCw size={18} className="spin-slow" />
                          <span>Dispatching Alert to Owner...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>🚨 Dispatch Instant Alert to Owner</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Success Confirmation Screen */
                  <div className="alert-success-view text-center">
                    <div className="success-icon-badge">
                      <CheckCircle2 size={54} color="#10B981" />
                    </div>
                    <h3>Alert Successfully Sent! 🎉</h3>
                    <p className="success-sub">
                      An instant high-priority notification has been dispatched to the vehicle owner for <strong>{verifiedVehicle?.maskedReg || verifiedVehicle?.regNumber}</strong>.
                    </p>

                    <div className="dispatched-summary-card">
                      <div className="summary-row">
                        <span className="s-label">Reported Reason:</span>
                        <span className="s-val">{selectedReason?.title || 'Parking Assistance'}</span>
                      </div>
                      {customNote && (
                        <div className="summary-row">
                          <span className="s-label">Note:</span>
                          <span className="s-val">"{customNote}"</span>
                        </div>
                      )}
                      <div className="summary-row">
                        <span className="s-label">Status:</span>
                        <span className="s-val text-green">● Owner Alerted via SMS / Dashboard</span>
                      </div>
                    </div>

                    <p className="thank-you-note">
                      Thank you for being a responsible and considerate citizen!
                    </p>

                    <div className="btn-group-dual" style={{ marginTop: '20px' }}>
                      <button className="btn-secondary" onClick={handleResetAlert}>
                        Report Another Issue
                      </button>
                      <button className="btn-primary flex-1" onClick={() => onNavigate('home')}>
                        Back to Home
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Masked Phone Call Flow */}
            {activeTab === 'call' && (
              <div className="bystander-action-card glass-card text-center">
                <div className="call-hero-icon">
                  <PhoneCall size={48} color="#FF2B85" />
                </div>
                <h3>Connect via Masked Voice Bridge</h3>
                <p className="call-explain-text">
                  Speak directly with the vehicle owner without sharing your phone number or learning theirs.
                </p>

                {/* 3 Steps Visual */}
                <div className="call-steps-grid">
                  <div className="c-step">
                    <span className="c-num">1</span>
                    <span>Tap Call Bridge Button</span>
                  </div>
                  <div className="c-step">
                    <span className="c-num">2</span>
                    <span>Private Proxy Dials Both</span>
                  </div>
                  <div className="c-step">
                    <span className="c-num">3</span>
                    <span>Speak Safely & Confidentially</span>
                  </div>
                </div>

                <button 
                  className="btn-primary full-w call-cta-btn"
                  onClick={() => setShowCallBridgeModal(true)}
                >
                  <PhoneCall size={20} />
                  <span>Initiate Private Masked Call</span>
                </button>

                <p className="call-privacy-note">
                  <Lock size={13} color="#64748B" />
                  <span>No mobile app or registration required for callers.</span>
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Call Bridge Info / Staging Modal */}
      {showCallBridgeModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-box-card glass-card">
            <div className="modal-header-row">
              <h4>Anonymous Voice Bridge</h4>
              <button className="modal-close-btn" onClick={() => setShowCallBridgeModal(false)}>✕</button>
            </div>
            <div className="modal-body-content text-center">
              <div className="bridge-icon-circle">
                <PhoneCall size={36} color="#059669" />
              </div>
              <h5>Voice Gateway Initialized</h5>
              <p className="modal-desc-text">
                CarFrnd's telecom bridge is staging for direct cellular operator trunking.
                To ensure immediate response right now, our instant SMS alert notifies the owner within 3 seconds!
              </p>
              <div className="modal-actions-col">
                <button 
                  className="btn-primary full-w"
                  onClick={() => {
                    setShowCallBridgeModal(false);
                    setActiveTab('message');
                  }}
                >
                  <Send size={16} /> Switch to Instant SMS Alert
                </button>
                <button 
                  className="btn-secondary full-w"
                  onClick={() => setShowCallBridgeModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style>{`
        .public-scan-container {
          min-height: 100vh;
          background: #F8FAFC;
          padding-top: 80px;
          padding-bottom: 60px;
        }

        .scan-navbar {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 12px 0;
        }

        .scan-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .scan-back-btn {
          background: none;
          border: 1px solid #CBD5E1;
          padding: 7px 14px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.88rem;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .scan-back-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .scan-brand-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.86rem;
          font-weight: 800;
          color: #FF2B85;
          background: #FFF0F6;
          border: 1px solid rgba(255, 43, 133, 0.2);
          padding: 6px 14px;
          border-radius: 20px;
        }

        .scan-main-content {
          max-width: 580px;
          margin: 0 auto;
          padding: 16px;
        }

        .scan-status-card {
          padding: 40px 24px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
        }

        .scan-badge-warn {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .scan-badge-err {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        .scan-tag-code-text {
          font-size: 1.1rem;
          color: #1E293B;
          margin: 8px 0;
        }

        .scan-sub-explain {
          color: #64748B;
          font-size: 0.92rem;
          line-height: 1.5;
        }

        /* Verification Gate Card */
        .verification-gate-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 22px;
          padding: 30px 24px;
          box-shadow: 0 12px 36px -8px rgba(15, 23, 42, 0.1);
        }

        .gate-icon-badge {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #FFF0F6;
          border: 2px solid rgba(255, 43, 133, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }

        .gate-header h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .gate-subtext {
          font-size: 0.92rem;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        /* Teaser Plate */
        .teaser-plate-wrap {
          background: #F8FAFC;
          border: 1.5px dashed #CBD5E1;
          border-radius: 16px;
          padding: 16px;
          text-align: center;
          margin-bottom: 24px;
        }

        .teaser-plate {
          display: inline-flex;
          align-items: center;
          background: #FFFFFF;
          border: 3px solid #334155;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
        }

        .teaser-ind {
          background: #0284C7;
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 8px 8px;
        }

        .teaser-chars {
          font-family: 'Courier New', monospace;
          font-size: 1.45rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: #0F172A;
          padding: 8px 16px;
        }

        .teaser-unknown {
          color: #FF2B85;
        }

        .teaser-meta {
          font-size: 0.88rem;
          font-weight: 700;
          color: #475569;
          margin-top: 8px;
        }

        /* Verify Form */
        .verify-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .verify-label {
          display: block;
          font-size: 0.88rem;
          font-weight: 700;
          color: #1E293B;
          margin-bottom: 8px;
        }

        .verify-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-key-icon {
          position: absolute;
          left: 16px;
          color: #94A3B8;
        }

        .verify-input {
          width: 100%;
          padding: 14px 16px 14px 48px;
          font-family: 'Courier New', monospace;
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: 0.35em;
          color: #0F172A;
          border: 2px solid #CBD5E1;
          border-radius: 14px;
          outline: none;
          transition: all 0.2s;
          background: #F8FAFC;
        }

        .verify-input:focus {
          border-color: #FF2B85;
          background: #FFFFFF;
          box-shadow: 0 0 0 4px rgba(255, 43, 133, 0.12);
        }

        .input-hint-small {
          display: block;
          font-size: 0.78rem;
          color: #94A3B8;
          margin-top: 6px;
        }

        .verify-error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #FEF2F2;
          border: 1px solid #FECACA;
          color: #DC2626;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 0.86rem;
          font-weight: 600;
          animation: shake 0.35s ease-in-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }

        .verify-submit-btn {
          padding: 15px;
          font-size: 1.05rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .no-signin-reassurance {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #64748B;
        }

        /* Active Layout */
        .scan-active-layout {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Vehicle License Plate Card */
        .vehicle-plate-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .plate-top-row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .secure-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #065F46;
          background: #ECFDF5;
          padding: 4px 10px;
          border-radius: 12px;
        }

        .live-pulse-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #0F172A;
        }

        .green-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        /* High-Contrast Indian License Plate */
        .license-plate-display {
          display: inline-flex;
          align-items: center;
          background: #FFFFFF;
          border: 3.5px solid #1E293B;
          border-radius: 10px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          margin: 6px 0 16px 0;
        }

        .plate-ind-strip {
          background: #0284C7;
          color: #FFFFFF;
          padding: 10px 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-right: 2px solid #1E293B;
        }

        .ind-text {
          font-size: 0.74rem;
          font-weight: 900;
          letter-spacing: 0.05em;
        }

        .ind-chakra-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FFFFFF;
          margin-top: 3px;
        }

        .plate-number-box {
          font-family: 'Courier New', monospace;
          font-size: 1.65rem;
          font-weight: 900;
          letter-spacing: 0.12em;
          color: #0F172A;
          padding: 8px 20px;
        }

        .vehicle-meta-info {
          font-size: 1.05rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 16px;
        }

        .veh-color {
          color: #64748B;
          font-weight: 500;
        }

        .privacy-reassurance-banner {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 0.84rem;
          color: #166534;
          display: flex;
          align-items: flex-start;
          gap: 10px;
          text-align: left;
          width: 100%;
        }

        /* Mode Switcher */
        .action-mode-switcher {
          display: flex;
          background: #E2E8F0;
          padding: 4px;
          border-radius: 14px;
          gap: 4px;
        }

        .mode-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 16px;
          border: none;
          background: none;
          border-radius: 11px;
          font-size: 0.92rem;
          font-weight: 700;
          color: #64748B;
          cursor: pointer;
          transition: all 0.2s;
        }

        .mode-btn.active {
          background: #FFFFFF;
          color: #0F172A;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
        }

        /* Action Card */
        .bystander-action-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 24px;
          box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.08);
        }

        .section-title-wrap h4 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .section-title-wrap p {
          font-size: 0.88rem;
          color: #64748B;
          margin-bottom: 18px;
        }

        /* Dynamic Reasons Grid */
        .reasons-grid {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .reason-chip-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 16px;
          background: #F8FAFC;
          border: 1.5px solid #E2E8F0;
          border-radius: 14px;
          cursor: pointer;
          transition: all 0.15s ease-in-out;
          position: relative;
        }

        .reason-chip-card:hover {
          background: #F1F5F9;
          border-color: #CBD5E1;
        }

        .reason-chip-card.selected {
          background: #FFF0F6;
          border-color: #FF2B85;
          box-shadow: 0 4px 14px rgba(255, 43, 133, 0.12);
        }

        .reason-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .reason-content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .reason-title {
          font-weight: 800;
          font-size: 0.94rem;
          color: #0F172A;
        }

        .reason-desc {
          font-size: 0.8rem;
          color: #64748B;
          margin-top: 2px;
          line-height: 1.3;
        }

        .selected-check-indicator {
          margin-left: 8px;
        }

        .form-group-field {
          margin-top: 14px;
        }

        .field-label {
          display: block;
          font-size: 0.84rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 6px;
        }

        .field-textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .field-textarea:focus {
          border-color: #FF2B85;
        }

        .field-input {
          width: 100%;
          padding: 10px 14px;
          border: 1.5px solid #CBD5E1;
          border-radius: 12px;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .field-input:focus {
          border-color: #FF2B85;
        }

        .field-hint {
          display: block;
          font-size: 0.78rem;
          color: #94A3B8;
          margin-top: 4px;
        }

        .submit-alert-btn {
          margin-top: 20px;
          padding: 14px;
          font-size: 1rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        /* Success View */
        .alert-success-view {
          padding: 20px 10px;
        }

        .success-icon-badge {
          display: flex;
          justify-content: center;
          margin-bottom: 14px;
        }

        .alert-success-view h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .success-sub {
          font-size: 0.92rem;
          color: #475569;
          margin-bottom: 20px;
        }

        .dispatched-summary-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px;
          text-align: left;
          margin-bottom: 20px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          font-size: 0.88rem;
          border-bottom: 1px dashed #E2E8F0;
        }

        .summary-row:last-child {
          border-bottom: none;
        }

        .s-label {
          color: #64748B;
          font-weight: 600;
        }

        .s-val {
          color: #0F172A;
          font-weight: 700;
        }

        .text-green {
          color: #10B981 !important;
        }

        .thank-you-note {
          font-size: 0.88rem;
          font-weight: 600;
          color: #64748B;
        }

        /* Call Tab Styles */
        .call-hero-icon {
          display: flex;
          justify-content: center;
          margin: 10px 0 16px 0;
        }

        .call-explain-text {
          font-size: 0.94rem;
          color: #64748B;
          max-width: 400px;
          margin: 0 auto 24px auto;
        }

        .call-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin-bottom: 28px;
        }

        .c-step {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 14px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          text-align: center;
        }

        .c-num {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #FF2B85;
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .call-cta-btn {
          padding: 15px;
          font-size: 1.05rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .call-privacy-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.8rem;
          color: #64748B;
          margin-top: 14px;
        }

        /* Modal Backdrop */
        .modal-backdrop-custom {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 16px;
        }

        .modal-box-card {
          background: #FFFFFF;
          border-radius: 20px;
          max-width: 440px;
          width: 100%;
          padding: 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .modal-header-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .modal-header-row h4 {
          font-weight: 800;
          font-size: 1.1rem;
          color: #0F172A;
        }

        .modal-close-btn {
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #64748B;
        }

        .bridge-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #ECFDF5;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px auto;
        }

        .modal-desc-text {
          font-size: 0.9rem;
          color: #64748B;
          line-height: 1.5;
          margin: 8px 0 20px 0;
        }

        .modal-actions-col {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
    </div>
  );
}
