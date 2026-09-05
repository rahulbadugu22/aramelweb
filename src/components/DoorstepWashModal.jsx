import React, { useState } from 'react';
import { Sparkles, Bell, CheckCircle2, Droplets } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function DoorstepWashModal({ isOpen, onClose }) {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleReset = () => {
    setSubmitted(false);
    setEmailOrPhone('');
    onClose();
  };

  return (
    <div className="doorstep-modal-backdrop" onClick={onClose}>
      <div className="doorstep-modal-box glass-card" onClick={(e) => e.stopPropagation()}>
        <button className="doorstep-close-btn" onClick={onClose} aria-label="Close modal">×</button>

        {submitted ? (
          <div className="doorstep-success-view">
            <div className="success-icon-wrap">
              <CheckCircle2 size={36} color="#059669" />
            </div>
            <h3>You're on the Priority List! 🎉</h3>
            <p>
              We'll notify <strong>{emailOrPhone}</strong> the moment Doorstep Car Wash launches in your city.
            </p>
            <span className="early-perk-badge">
              <Sparkles size={13} /> Includes 20% First Wash Launch Discount
            </span>
            <button className="btn-primary full-w mt-16" onClick={handleReset}>
              Got It
            </button>
          </div>
        ) : (
          <div className="doorstep-content-view">
            <div className="doorstep-top-badge">
              <span className="badge-pulsing-dot"></span>
              <span>COMING SOON</span>
            </div>

            <div className="doorstep-icon-circle">
              <Droplets size={32} color="#FF2B85" />
            </div>

            <h3 className="doorstep-title">Doorstep Car Wash Coming Soon</h3>
            <p className="doorstep-sub">We're getting this service ready for you.</p>

            <p className="doorstep-detail">
              Eco-friendly high pressure foam wash, interior deep vacuuming, and tire shine delivered directly at your apartment parking or office bay.
            </p>

            <form onSubmit={handleSubmit} className="doorstep-form">
              <div className="form-group" style={{ width: '100%' }}>
                <input
                  type="text"
                  placeholder="Enter email or mobile number"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="doorstep-input"
                  required
                />
              </div>

              <button type="submit" className="btn-primary full-w notify-btn">
                <Bell size={16} />
                <span>Notify Me on Launch</span>
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        .doorstep-modal-backdrop {
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

        .doorstep-modal-box {
          width: 100%;
          max-width: 480px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 32px 28px;
          position: relative;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
          animation: modalAppear 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .doorstep-close-btn {
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

        .doorstep-close-btn:hover {
          color: var(--magenta);
        }

        .doorstep-content-view,
        .doorstep-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .doorstep-top-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          color: var(--magenta);
          font-size: 0.72rem;
          font-weight: 800;
          padding: 3px 10px;
          border-radius: 20px;
          margin-bottom: 16px;
          letter-spacing: 0.05em;
        }

        .badge-pulsing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--magenta);
        }

        .doorstep-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--magenta-light);
          border: 1.5px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .doorstep-title {
          font-size: 1.45rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .doorstep-sub {
          font-size: 1rem;
          font-weight: 700;
          color: var(--magenta);
          margin-bottom: 12px;
        }

        .doorstep-detail {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.55;
          margin-bottom: 22px;
          max-width: 400px;
        }

        .doorstep-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .doorstep-input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #CBD5E1;
          background: #F8FAFC;
          color: #0F172A;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.2s;
        }

        .doorstep-input:focus {
          border-color: var(--magenta);
          background: #FFFFFF;
        }

        .notify-btn {
          padding: 13px;
          font-size: 0.95rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .success-icon-wrap {
          width: 68px;
          height: 68px;
          border-radius: 50%;
          background: #ECFDF5;
          border: 2px solid #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
        }

        .doorstep-success-view h3 {
          font-size: 1.35rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .doorstep-success-view p {
          font-size: 0.9rem;
          color: #64748B;
          line-height: 1.5;
          margin-bottom: 16px;
        }

        .early-perk-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFF0F6;
          color: var(--magenta);
          border: 1px solid var(--magenta-border);
          padding: 6px 14px;
          border-radius: 20px;
          font-size: 0.78rem;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .full-w {
          width: 100%;
        }

        .mt-16 {
          margin-top: 16px;
        }
      `}</style>
    </div>
  );
}
