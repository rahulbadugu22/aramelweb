import React, { useState } from 'react';
import { User, ShieldCheck, PhoneCall, CheckCircle2, LogOut, Car, AlertTriangle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AccountModal({ isOpen, onClose, onOpenOrderTag, onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [callForwarding, setCallForwarding] = useState(true);
  const [towingAlerts, setTowingAlerts] = useState(true);

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!otpSent) {
      if (phoneNumber.length >= 10) {
        setOtpSent(true);
      }
    } else {
      setIsLoggedIn(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };



  return (
    <div className="account-modal-backdrop" onClick={onClose}>
      <div className="account-modal-box glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="account-close-btn" onClick={onClose} aria-label="Close modal">×</button>

        {isLoggedIn ? (
          <div className="account-dashboard-view">
            {/* User Profile Header */}
            <div className="account-profile-header">
              <div className="profile-avatar">
                <User size={28} color="#FF2B85" />
              </div>
              <div className="profile-info">
                <div className="profile-name-row">
                  <h4>CarFrnd Member</h4>
                  <span className="account-verified-badge">
                    <ShieldCheck size={12} /> Verified Owner
                  </span>
                </div>
                <span className="profile-phone">Authenticated via OTP • Primary Member</span>
              </div>
            </div>

            {/* Quick Stats / Registered Tags Box */}
            <div className="account-section">
              <div className="section-title-row">
                <span className="section-label">ACTIVE CARFRND TAGS</span>
                <span className="badge-active">1 Tag Active</span>
              </div>

              <div className="vehicle-tag-card">
                <div className="v-card-top">
                  <div className="v-plate-wrap">
                    <Car size={16} color="#FF2B85" />
                    <span className="v-number">—</span>
                  </div>
                  <span className="v-status-pill">
                    <span className="dot-green"></span> ACTIVE
                  </span>
                </div>

                <div className="v-details-grid">
                  <div className="detail-item">
                    <span className="detail-lbl">Tag ID</span>
                    <span className="detail-val">—</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-lbl">Privacy Mode</span>
                    <span className="detail-val highlight">Masked Voice Calls</span>
                  </div>
                </div>

                {/* Privacy controls */}
                <div className="tag-controls-list">
                  <div className="control-row">
                    <div className="control-meta">
                      <PhoneCall size={14} color="#059669" />
                      <span>Anonymous Masked Call Forwarding</span>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={callForwarding}
                        onChange={(e) => setCallForwarding(e.target.checked)}
                      />
                      <span className="slider"></span>
                    </label>
                  </div>

                  <div className="control-row">
                    <div className="control-meta">
                      <AlertTriangle size={14} color="#D97706" />
                      <span>Emergency Parking & Towing Alerts</span>
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
              </div>
            </div>

            {/* Recent Orders & Bookings */}
            <div className="account-section">
              <div className="section-title-row">
                <span className="section-label">ORDERS & BOOKINGS</span>
              </div>

              <div className="order-empty-state">
                <p className="order-empty-text">Your orders will appear here once the backend is connected and your account is verified.</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="account-modal-footer">
              <button
                className="btn-secondary btn-order-more"
                onClick={() => {
                  onClose();
                  if (onNavigate) onNavigate('activate-tag');
                }}
              >
                + Activate Tag
              </button>
              <button
                className="btn-secondary btn-order-more"
                onClick={() => {
                  onClose();
                  if (onOpenOrderTag) onOpenOrderTag();
                }}
              >
                + Order Tag (₹450)
              </button>
              <button
                className="btn-logout"
                onClick={() => setIsLoggedIn(false)}
                title="Sign Out"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          /* Login View */
          <div className="account-login-view">
            <div className="login-avatar-circle">
              <User size={32} color="#FF2B85" />
            </div>

            <h3 className="login-title">CarFrnd Owner Login</h3>
            <p className="login-desc">
              Manage your registered CarFrnd Tags, emergency contact alerts, and doorstep auto services.
            </p>

            <form onSubmit={handleLoginSubmit} className="login-form">
              <div className="form-group" style={{ width: '100%' }}>
                <label className="input-label">Mobile Number</label>
                <div className="phone-input-wrap">
                  <span className="phone-prefix">+91</span>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="account-input"
                  />
                </div>
              </div>

              {otpSent && (
                <div className="form-group" style={{ width: '100%' }}>
                  <label className="input-label">Enter OTP sent to your mobile</label>
                  <input
                    type="text"
                    placeholder="e.g. 1234"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="account-input text-center"
                    maxLength={4}
                  />
                </div>
              )}

              <button type="submit" className="btn-primary full-w">
                {otpSent ? 'Verify OTP & Enter' : 'Get Verification OTP'}
              </button>
            </form>

            <p className="login-footer-note">Account access is available only via mobile OTP verification. Backend integration coming soon.</p>
          </div>
        )}
      </div>

      <style>{`
        .account-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          z-index: 250;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .account-modal-box {
          width: 100%;
          max-width: 520px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 30px 26px;
          position: relative;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
          animation: modalAppear 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          max-height: 90vh;
          overflow-y: auto;
        }

        .account-close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          background: none;
          border: none;
          color: #64748B;
          font-size: 1.8rem;
          line-height: 1;
          cursor: pointer;
          transition: color 0.2s;
        }

        .account-close-btn:hover {
          color: var(--magenta);
        }

        /* Profile Header */
        .account-profile-header {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-bottom: 18px;
          border-bottom: 1px solid #F1F5F9;
          margin-bottom: 20px;
        }

        .profile-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--magenta-light);
          border: 1.5px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .profile-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .profile-name-row h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
        }

        .account-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #ECFDF5;
          color: #059669;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid #A7F3D0;
        }

        .profile-phone {
          font-size: 0.82rem;
          color: #64748B;
        }

        .account-section {
          margin-bottom: 22px;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .section-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--magenta);
          letter-spacing: 0.05em;
        }

        .badge-active {
          font-size: 0.7rem;
          font-weight: 700;
          color: #059669;
          background: #ECFDF5;
          padding: 2px 7px;
          border-radius: 4px;
        }

        .vehicle-tag-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px;
        }

        .v-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .v-plate-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .v-number {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 900;
          color: #0F172A;
          letter-spacing: 0.05em;
        }

        .v-status-pill {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #059669;
        }

        .dot-green {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
        }

        .v-details-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 12px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
        }

        .detail-lbl {
          font-size: 0.68rem;
          color: #64748B;
          font-weight: 600;
        }

        .detail-val {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0F172A;
          font-family: monospace;
        }

        .detail-val.highlight {
          font-family: inherit;
          color: var(--magenta);
        }

        .tag-controls-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          color: #334155;
          font-weight: 600;
        }

        .control-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Toggle switch */
        .toggle-switch {
          position: relative;
          display: inline-block;
          width: 36px;
          height: 20px;
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

        /* Order card */
        .order-summary-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 12px 14px;
        }

        .order-s-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .order-s-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .order-s-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0F172A;
        }

        .order-s-sub {
          font-size: 0.74rem;
          color: #64748B;
        }

        .order-status-chip {
          font-size: 0.72rem;
          font-weight: 800;
          color: #2563EB;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          padding: 3px 8px;
          border-radius: 6px;
        }

        /* Footer */
        .account-modal-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid #F1F5F9;
          gap: 10px;
        }

        .btn-order-more {
          font-size: 0.84rem;
          padding: 8px 14px;
          border-radius: 8px;
          flex: 1;
        }

        .btn-logout {
          background: none;
          border: 1px solid #E2E8F0;
          color: #64748B;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 5px;
          transition: all 0.2s;
        }

        .btn-logout:hover {
          color: #EF4444;
          border-color: #FCA5A5;
          background: #FEF2F2;
        }

        /* Login view */
        .account-login-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .login-avatar-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--magenta-light);
          border: 2px solid var(--magenta);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .login-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .login-desc {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 20px;
          max-width: 380px;
        }

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .input-label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
          display: block;
          text-align: left;
          margin-bottom: 4px;
        }

        .phone-input-wrap {
          display: flex;
          align-items: center;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          background: #F8FAFC;
          overflow: hidden;
        }

        .phone-prefix {
          padding: 0 12px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748B;
          border-right: 1px solid #CBD5E1;
          background: #F1F5F9;
        }

        .account-input {
          width: 100%;
          padding: 11px 14px;
          border: none;
          background: transparent;
          color: #0F172A;
          font-size: 0.92rem;
          outline: none;
        }

        .phone-input-wrap:focus-within {
          border-color: var(--magenta);
          background: #FFFFFF;
        }

        .login-footer-note {
          font-size: 0.78rem;
          color: #94A3B8;
          text-align: center;
          margin-top: 14px;
          line-height: 1.5;
          max-width: 340px;
        }

        .order-empty-state {
          background: #F8FAFC;
          border: 1px dashed #CBD5E1;
          border-radius: 10px;
          padding: 18px 16px;
          text-align: center;
        }

        .order-empty-text {
          font-size: 0.8rem;
          color: #94A3B8;
          line-height: 1.5;
          margin: 0;
        }

        .full-w {
          width: 100%;
        }

        .text-center {
          text-align: center;
        }
      `}</style>
    </div>
  );
}
