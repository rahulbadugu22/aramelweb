import React, { useState } from 'react';
import { ArrowLeft, Sparkles, QrCode, ShieldCheck, Car, PhoneCall, AlertTriangle, CheckCircle2, Lock, ArrowRight, Eye } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

export default function ActivateTagPage({ onNavigate }) {
  const [step, setStep] = useState(1);
  const [tagId, setTagId] = useState('KA560100MM1234');
  const [vehicleNo, setVehicleNo] = useState('MH 01 AB 1234');
  const [vehicleType, setVehicleType] = useState('SUV');
  const [vehicleModel, setVehicleModel] = useState('Tata Nexon');
  const [ownerPhone, setOwnerPhone] = useState('9876543210');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [emergencyPhone, setEmergencyPhone] = useState('');
  const [callMasking, setCallMasking] = useState(true);
  const [towingAlerts, setTowingAlerts] = useState(true);

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!tagId.trim()) return;
    setStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (!vehicleNo.trim()) return;
    setStep(3);
  };

  const handleSendOtp = () => {
    if (ownerPhone.length >= 10) {
      setOtpSent(true);
      setOtp('1234'); // Pre-fill demo OTP
    }
  };

  const handleFinalActivation = (e) => {
    e.preventDefault();
    if (otpSent && otp.length === 4) {
      setActivatedSuccess(true);
      setStep(4);
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.5 }
      });
    } else {
      handleSendOtp();
    }
  };

  return (
    <div className="activate-page-container">
      {/* Top Nav */}
      <div className="activate-nav-bar">
        <div className="container activate-nav-inner">
          <button className="btn-back" onClick={() => onNavigate('home')}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
          <div className="activate-pill">
            <Sparkles size={15} color="#FF2B85" />
            <span>Tag Self-Activation</span>
          </div>
        </div>
      </div>

      <div className="container activate-main-wrapper">
        {/* Progress Stepper Indicator */}
        <div className="step-indicator-bar">
          <div className={`step-node ${step >= 1 ? 'active' : ''} ${step > 1 ? 'done' : ''}`}>
            <span className="step-num">1</span>
            <span className="step-name">Scan / Tag ID</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-node ${step >= 2 ? 'active' : ''} ${step > 2 ? 'done' : ''}`}>
            <span className="step-num">2</span>
            <span className="step-name">Vehicle Info</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-node ${step >= 3 ? 'active' : ''} ${step > 3 ? 'done' : ''}`}>
            <span className="step-num">3</span>
            <span className="step-name">Owner & Privacy</span>
          </div>
          <div className="step-connector"></div>
          <div className={`step-node ${step >= 4 ? 'active' : ''}`}>
            <span className="step-num">4</span>
            <span className="step-name">Live Active</span>
          </div>
        </div>

        {/* Dynamic Step View Cards */}
        <div className="activate-card glass-card">
          {/* STEP 1: Enter Tag ID or Scan */}
          {step === 1 && (
            <div className="step-view">
              <div className="step-header">
                <div className="step-icon-wrap">
                  <QrCode size={28} color="#FF2B85" />
                </div>
                <h2>Enter Your CarFrnd Tag ID</h2>
                <p>
                  Find the 14-character alphanumeric Tag ID printed on your physical decal (e.g. <code>KA560100MM1234</code>) or scan the QR code.
                </p>
              </div>

              <form onSubmit={handleStep1Submit} className="activate-form">
                <div className="form-group">
                  <label className="activate-label">Tag ID (Printed on Decal)</label>
                  <input
                    type="text"
                    className="activate-input font-mono"
                    placeholder="e.g. KA560100MM1234"
                    value={tagId}
                    onChange={(e) => setTagId(e.target.value.toUpperCase())}
                    required
                  />
                  <span className="input-hint">Default demo code entered. You can customize or leave as is.</span>
                </div>

                <button type="submit" className="btn-primary full-w next-btn">
                  Continue to Vehicle Details <ArrowRight size={16} />
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Vehicle Information */}
          {step === 2 && (
            <div className="step-view">
              <div className="step-header">
                <div className="step-icon-wrap">
                  <Car size={28} color="#FF2B85" />
                </div>
                <h2>Link Your Vehicle Details</h2>
                <p>
                  Connect your CarFrnd Tag with your vehicle. Callers will see your vehicle number when scanning to ensure they notify the right car.
                </p>
              </div>

              <form onSubmit={handleStep2Submit} className="activate-form">
                <div className="form-group">
                  <label className="activate-label">Vehicle Registration Number</label>
                  <input
                    type="text"
                    className="activate-input font-mono uppercase"
                    placeholder="e.g. MH 01 AB 1234"
                    value={vehicleNo}
                    onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                    required
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="activate-label">Vehicle Type</label>
                    <select
                      className="activate-select"
                      value={vehicleType}
                      onChange={(e) => setVehicleType(e.target.value)}
                    >
                      <option value="Sedan">Sedan</option>
                      <option value="SUV">SUV / Compact SUV</option>
                      <option value="Hatchback">Hatchback</option>
                      <option value="EV">Electric Vehicle (EV)</option>
                      <option value="Commercial">Commercial / Taxi</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="activate-label">Vehicle Model (Optional)</label>
                    <input
                      type="text"
                      className="activate-input"
                      placeholder="e.g. Tata Nexon / Creta"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                    />
                  </div>
                </div>

                <div className="btn-group-dual">
                  <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                    Back
                  </button>
                  <button type="submit" className="btn-primary flex-1 next-btn">
                    Continue to Owner & Privacy <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 3: Owner Verification & Privacy Settings */}
          {step === 3 && (
            <div className="step-view">
              <div className="step-header">
                <div className="step-icon-wrap">
                  <ShieldCheck size={28} color="#FF2B85" />
                </div>
                <h2>Owner Phone & Masked Privacy</h2>
                <p>
                  Your Phone Number Stays Private. We route calls through anonymous masked forwarding so callers never see your actual mobile number.
                </p>
              </div>

              <form onSubmit={handleFinalActivation} className="activate-form">
                <div className="form-group">
                  <label className="activate-label">Owner Mobile Number (For Forwarded Calls)</label>
                  <div className="phone-input-field">
                    <span className="p-prefix">+91</span>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={ownerPhone}
                      onChange={(e) => setOwnerPhone(e.target.value)}
                      required
                    />
                    {!otpSent ? (
                      <button type="button" className="btn-otp-trigger" onClick={handleSendOtp}>
                        Verify OTP
                      </button>
                    ) : (
                      <span className="otp-sent-pill">OTP Sent (1234)</span>
                    )}
                  </div>
                </div>

                {otpSent && (
                  <div className="form-group">
                    <label className="activate-label">Enter 4-Digit OTP (Use: 1234)</label>
                    <input
                      type="text"
                      className="activate-input text-center font-mono"
                      placeholder="1234"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={4}
                      required
                    />
                  </div>
                )}

                <div className="form-group">
                  <label className="activate-label">Secondary Emergency Contact (Optional)</label>
                  <input
                    type="tel"
                    className="activate-input"
                    placeholder="Family member or backup contact"
                    value={emergencyPhone}
                    onChange={(e) => setEmergencyPhone(e.target.value)}
                  />
                  <span className="input-hint">Will be rung if you are unreachable during towing/emergency.</span>
                </div>

                {/* Privacy Configuration Toggles */}
                <div className="privacy-toggles-card">
                  <div className="toggle-item-row">
                    <div className="t-meta">
                      <PhoneCall size={16} color="#059669" />
                      <div>
                        <strong>Masked Voice Call Forwarding</strong>
                        <p>Callers speak with you anonymously without seeing your phone number.</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={callMasking}
                        onChange={(e) => setCallMasking(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="toggle-item-row">
                    <div className="t-meta">
                      <AlertTriangle size={16} color="#D97706" />
                      <div>
                        <strong>Instant Towing & Parking Alerts</strong>
                        <p>Receive immediate SMS alerts if your vehicle is blocking or facing towing.</p>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={towingAlerts}
                        onChange={(e) => setTowingAlerts(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>
                </div>

                <div className="btn-group-dual">
                  <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                    Back
                  </button>
                  <button type="submit" className="btn-primary flex-1 next-btn">
                    <Lock size={16} /> Complete Activation
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 4: Activation Success Celebration */}
          {step === 4 && (
            <div className="step-view success-view">
              <div className="success-badge-circle">
                <CheckCircle2 size={44} color="#059669" />
              </div>

              <h2 className="success-headline">CarFrnd Tag Is Live & Protected! 🎉</h2>
              <p className="success-subtext">
                Your Tag <strong>{tagId}</strong> is successfully paired with vehicle <strong>{vehicleNo}</strong>. Your phone number is 100% shielded via anonymous masked communication.
              </p>

              {/* Tag Preview Hologram */}
              <div className="active-tag-preview glass-card">
                <div className="tag-preview-header">
                  <span className="live-status-pill">
                    <span className="pulse-dot"></span> LIVE & ACTIVE
                  </span>
                  <span className="tag-code">{tagId}</span>
                </div>

                <div className="tag-preview-body">
                  <div className="tag-qr-wrap">
                    <QRCodeSVG
                      value={`https://carfrnd.com/scan?tag=${tagId}&v=${vehicleNo.replace(/\s+/g, '')}`}
                      size={90}
                      level="H"
                    />
                  </div>
                  <div className="tag-meta-details">
                    <span className="vehicle-big">{vehicleNo}</span>
                    <span className="vehicle-sub">{vehicleModel} • {vehicleType}</span>
                    <div className="protected-row">
                      <ShieldCheck size={14} color="#FF2B85" />
                      <span>Phone Masking Enabled (+91 {ownerPhone.slice(0, 2)}******{ownerPhone.slice(-2)})</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Windshield Application Guide */}
              <div className="application-guide-card">
                <h5>How to Affix Your Decal:</h5>
                <div className="guide-steps-row">
                  <div className="g-step">
                    <span className="g-num">1</span>
                    <span>Clean interior windshield glass thoroughly</span>
                  </div>
                  <div className="g-step">
                    <span className="g-num">2</span>
                    <span>Peel protective backing layer</span>
                  </div>
                  <div className="g-step">
                    <span className="g-num">3</span>
                    <span>Press decal firmly to bottom-left corner</span>
                  </div>
                </div>
              </div>

              {/* Action CTAs */}
              <div className="success-actions-row">
                <button className="btn-primary full-w" onClick={() => onNavigate('home')}>
                  Return to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .activate-page-container {
          min-height: 100vh;
          background: #F8FAFC;
          padding-top: 86px;
          padding-bottom: 60px;
        }

        .activate-nav-bar {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          padding: 12px 0;
          margin-bottom: 24px;
        }

        .activate-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .btn-back {
          background: none;
          border: 1px solid #CBD5E1;
          padding: 8px 14px;
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

        .btn-back:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .activate-pill {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.86rem;
          font-weight: 800;
          color: var(--magenta);
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          padding: 6px 14px;
          border-radius: 20px;
        }

        .activate-main-wrapper {
          max-width: 680px;
          margin: 0 auto;
        }

        /* Stepper Bar */
        .step-indicator-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          padding: 0 10px;
        }

        .step-node {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .step-num {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F1F5F9;
          border: 2px solid #CBD5E1;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          transition: all 0.25s;
        }

        .step-name {
          font-size: 0.72rem;
          font-weight: 700;
          color: #64748B;
          white-space: nowrap;
        }

        .step-node.active .step-num {
          background: var(--magenta-light);
          border-color: var(--magenta);
          color: var(--magenta);
          box-shadow: 0 0 10px rgba(255, 43, 133, 0.3);
        }

        .step-node.active .step-name {
          color: var(--magenta);
        }

        .step-node.done .step-num {
          background: #ECFDF5;
          border-color: #10B981;
          color: #059669;
        }

        .step-connector {
          flex: 1;
          height: 2px;
          background: #E2E8F0;
          margin: 0 8px 20px 8px;
        }

        /* Form Card */
        .activate-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 36px 32px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .step-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .step-icon-wrap {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 14px auto;
        }

        .step-header h2 {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .step-header p {
          font-size: 0.88rem;
          color: #64748B;
          max-width: 480px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .step-header code {
          background: #F1F5F9;
          color: var(--magenta);
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 800;
        }

        .activate-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .activate-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          display: block;
          margin-bottom: 6px;
        }

        .activate-input, .activate-select {
          width: 100%;
          padding: 11px 14px;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          background: #F8FAFC;
          font-size: 0.92rem;
          color: #0F172A;
          outline: none;
          transition: all 0.2s;
        }

        .activate-input:focus, .activate-select:focus {
          border-color: var(--magenta);
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(255, 43, 133, 0.12);
        }

        .font-mono {
          font-family: monospace;
          letter-spacing: 0.05em;
        }

        .uppercase {
          text-transform: uppercase;
        }

        .input-hint {
          font-size: 0.72rem;
          color: #94A3B8;
          margin-top: 4px;
          display: block;
        }

        .scan-shortcut-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.82rem;
          color: #64748B;
        }

        .scan-btn-mini {
          padding: 6px 12px;
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }

        .phone-input-field {
          display: flex;
          align-items: center;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          background: #F8FAFC;
          overflow: hidden;
        }

        .phone-input-field:focus-within {
          border-color: var(--magenta);
          background: #FFFFFF;
        }

        .p-prefix {
          padding: 0 12px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748B;
          border-right: 1px solid #CBD5E1;
          background: #F1F5F9;
        }

        .phone-input-field input {
          border: none;
          background: transparent;
          padding: 11px 14px;
          font-size: 0.92rem;
          width: 100%;
          outline: none;
        }

        .btn-otp-trigger {
          background: var(--magenta);
          color: #FFFFFF;
          border: none;
          padding: 7px 12px;
          margin-right: 6px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          white-space: nowrap;
        }

        .otp-sent-pill {
          font-size: 0.72rem;
          font-weight: 800;
          color: #059669;
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          padding: 4px 8px;
          margin-right: 6px;
          border-radius: 6px;
          white-space: nowrap;
        }

        .text-center {
          text-align: center;
        }

        /* Privacy toggles */
        .privacy-toggles-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .toggle-item-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .t-meta {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .t-meta strong {
          font-size: 0.85rem;
          color: #0F172A;
          display: block;
        }

        .t-meta p {
          font-size: 0.76rem;
          color: #64748B;
          margin: 0;
          line-height: 1.35;
        }

        /* Toggle switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 20px;
          flex-shrink: 0;
        }

        .toggle-switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background-color: #CBD5E1;
          transition: 0.3s;
          border-radius: 20px;
        }

        .slider:before {
          position: absolute;
          content: "";
          height: 14px;
          width: 14px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #10B981;
        }

        input:checked + .slider:before {
          transform: translateX(16px);
        }

        .btn-group-dual {
          display: flex;
          gap: 12px;
          margin-top: 8px;
        }

        .flex-1 {
          flex: 1;
        }

        .next-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 13px;
          font-size: 0.94rem;
        }

        /* Success View */
        .success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .success-badge-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #ECFDF5;
          border: 2px solid #A7F3D0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .success-headline {
          font-size: 1.6rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .success-subtext {
          font-size: 0.9rem;
          color: #64748B;
          max-width: 480px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .active-tag-preview {
          width: 100%;
          background: #FFFFFF;
          border: 1.5px solid var(--magenta-border);
          border-radius: 16px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 8px 24px rgba(255, 43, 133, 0.08);
        }

        .tag-preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 12px;
          border-bottom: 1px solid #F1F5F9;
          margin-bottom: 16px;
        }

        .live-status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #ECFDF5;
          color: #059669;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 12px;
        }

        .pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
        }

        .tag-code {
          font-family: monospace;
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748B;
        }

        .tag-preview-body {
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: left;
        }

        .tag-qr-wrap {
          background: #FFFFFF;
          padding: 6px;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .vehicle-big {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          color: #0F172A;
          letter-spacing: 0.04em;
          display: block;
        }

        .vehicle-sub {
          font-size: 0.8rem;
          color: #64748B;
          display: block;
          margin-bottom: 6px;
        }

        .protected-row {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          color: #059669;
          font-weight: 700;
        }

        /* Application Guide */
        .application-guide-card {
          width: 100%;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px;
          margin-bottom: 24px;
          text-align: left;
        }

        .application-guide-card h5 {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 10px;
        }

        .guide-steps-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 10px;
        }

        .g-step {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.75rem;
          color: #475569;
          line-height: 1.35;
        }

        .g-num {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--magenta);
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .success-actions-row {
          display: flex;
          gap: 12px;
          width: 100%;
        }

        .success-actions-row button {
          flex: 1;
          padding: 12px;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        @media (max-width: 600px) {
          .activate-card {
            padding: 24px 18px;
          }
          .form-row-2 {
            grid-template-columns: 1fr;
          }
          .guide-steps-row {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .tag-preview-body {
            flex-direction: column;
            text-align: center;
          }
          .success-actions-row {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
