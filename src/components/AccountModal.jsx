import React, { useState } from 'react';
import { User, ShieldCheck, PhoneCall, CheckCircle2, LogOut, Car, AlertTriangle, Sparkles, MapPin, Mail, Phone } from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext';

export default function AccountModal({ isOpen, onClose, onOpenOrderTag, onNavigate }) {
  const { customer, isLoggedIn, openSignInModal, openSignOutModal } = useCustomerAuth();
  const [callForwarding, setCallForwarding] = useState(true);
  const [towingAlerts, setTowingAlerts] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="account-modal-backdrop" onClick={onClose}>
      <div className="account-modal-box glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="account-close-btn" onClick={onClose} aria-label="Close modal">×</button>

        {isLoggedIn ? (
          <div className="account-dashboard-view">
            {/* User Profile Header */}
            <div className="account-profile-header">
              <div className="profile-avatar">
                <div className="avatar-letter">
                  {(customer?.name || 'C').charAt(0).toUpperCase()}
                </div>
              </div>
              <div className="profile-info">
                <div className="profile-name-row">
                  <h4>{customer?.name || 'CarFrnd Member'}</h4>
                  <span className="account-verified-badge">
                    <ShieldCheck size={12} /> Verified Owner
                  </span>
                </div>
                <div className="profile-meta-row">
                  <span className="profile-phone">{customer?.phone}</span>
                  {customer?.city && (
                    <span className="profile-city-badge">
                      <MapPin size={11} color="#FF2B85" />
                      {customer.city}
                    </span>
                  )}
                </div>
                {customer?.email && (
                  <span className="profile-email-text">{customer.email}</span>
                )}
              </div>
            </div>

            {/* Quick Stats / Registered Tags Box */}
            <div className="account-section">
              <div className="section-title-row">
                <span className="section-label">ACTIVE CARFRND SECURITY TAGS</span>
                <span className="badge-active">
                  {Array.isArray(customer?.vehicles) ? customer.vehicles.length : 0} Linked
                </span>
              </div>

              {Array.isArray(customer?.vehicles) && customer.vehicles.length > 0 ? (
                <div className="vehicles-list-wrap">
                  {customer.vehicles.map((v, i) => (
                    <div key={i} className="vehicle-tag-card">
                      <div className="v-card-top">
                        <div className="v-plate-wrap">
                          <Car size={16} color="#FF2B85" />
                          <span className="v-number">{v.reg_number}</span>
                        </div>
                        <span className="v-status-pill">
                          <span className="dot-green"></span> {v.tag_status || 'ACTIVE'}
                        </span>
                      </div>
                      <div className="v-details-grid">
                        <div className="detail-item">
                          <span className="detail-lbl">Tag ID</span>
                          <span className="detail-val highlight">{v.tag_id || 'CF-TAG'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-lbl">Model</span>
                          <span className="detail-val">{v.make_model || 'Vehicle'}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="vehicle-tag-card">
                  <div className="v-card-top">
                    <div className="v-plate-wrap">
                      <Car size={16} color="#FF2B85" />
                      <span className="v-number">Ready to Activate</span>
                    </div>
                    <span className="v-status-pill">
                      <span className="dot-green"></span> PRIMARY
                    </span>
                  </div>

                  <div className="v-details-grid">
                    <div className="detail-item">
                      <span className="detail-lbl">Linked Mobile</span>
                      <span className="detail-val highlight">{customer?.phone}</span>
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
              )}
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
                onClick={() => {
                  onClose();
                  openSignOutModal();
                }}
                title="Sign Out"
              >
                <LogOut size={15} /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="account-login-view">
            <div className="login-avatar-circle">
              <User size={32} color="#FF2B85" />
            </div>

            <h3 className="login-title">CarFrnd Owner Portal</h3>
            <p className="login-desc">
              Sign in with your mobile number to view registered tags, emergency alert settings, and order tracking.
            </p>

            <button 
              className="btn-primary full-w"
              style={{ padding: '14px', borderRadius: '12px', fontSize: '1rem', fontWeight: 800 }}
              onClick={() => {
                onClose();
                openSignInModal();
              }}
            >
              Sign In via Mobile OTP
            </button>

            
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
        }

        .account-dashboard-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .account-profile-header {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-bottom: 18px;
          border-bottom: 1px solid #F1F5F9;
        }

        .profile-avatar {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF2B85 0%, #7928CA 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(255, 43, 133, 0.25);
        }

        .avatar-letter {
          font-size: 1.4rem;
          font-weight: 800;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .profile-name-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .profile-name-row h4 {
          margin: 0;
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
        }

        .account-verified-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: #ECFDF5;
          color: #059669;
          font-size: 0.7rem;
          font-weight: 800;
          padding: 2px 7px;
          border-radius: 6px;
          border: 1px solid #A7F3D0;
        }

        .profile-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .profile-phone {
          font-size: 0.86rem;
          font-weight: 700;
          color: #0F172A;
        }

        .profile-city-badge {
          display: inline-flex;
          align-items: center;
          gap: 3px;
          background: #F1F5F9;
          color: #475569;
          padding: 1px 7px;
          border-radius: 10px;
          font-size: 0.72rem;
          font-weight: 700;
        }

        .profile-email-text {
          font-size: 0.78rem;
          color: #64748B;
        }

        .account-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .section-title-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .section-label {
          font-size: 0.74rem;
          font-weight: 800;
          color: #64748B;
          letter-spacing: 0.5px;
        }

        .badge-active {
          background: #ECFDF5;
          color: #059669;
          font-size: 0.72rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 12px;
          border: 1px solid #A7F3D0;
        }

        .vehicle-tag-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .v-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .v-plate-wrap {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          font-size: 1rem;
          color: #0F172A;
        }

        .v-status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #059669;
          background: #ECFDF5;
          padding: 3px 8px;
          border-radius: 12px;
        }

        .dot-green {
          width: 6px;
          height: 6px;
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
          padding: 10px 14px;
        }

        .detail-item {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .detail-lbl {
          font-size: 0.7rem;
          color: #64748B;
          font-weight: 600;
        }

        .detail-val {
          font-size: 0.85rem;
          font-weight: 700;
          color: #0F172A;
        }

        .detail-val.highlight {
          color: #FF2B85;
        }

        .tag-controls-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 6px;
        }

        .control-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
        }

        .control-meta {
          display: flex;
          align-items: center;
          gap: 8px;
        }

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
          transition: 0.2s;
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
          transition: 0.2s;
          border-radius: 50%;
        }

        input:checked + .slider {
          background-color: #FF2B85;
        }

        input:checked + .slider:before {
          transform: translateX(16px);
        }

        .account-modal-footer {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          padding-top: 10px;
        }

        .btn-order-more {
          flex: 1;
          padding: 9px 12px;
          font-size: 0.84rem;
          border-radius: 10px;
        }

        .btn-logout {
          background: #FFF1F2;
          color: #E11D48;
          border: 1px solid #FECDD3;
          padding: 9px 16px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.84rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-logout:hover {
          background: #E11D48;
          color: #FFFFFF;
        }

        .account-login-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px 10px;
        }

        .login-avatar-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #FFF0F6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .login-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 8px 0;
        }

        .login-desc {
          font-size: 0.9rem;
          color: #64748B;
          line-height: 1.5;
          margin: 0 0 24px 0;
          max-width: 360px;
        }

        .login-footer-note {
          font-size: 0.78rem;
          color: #94A3B8;
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
