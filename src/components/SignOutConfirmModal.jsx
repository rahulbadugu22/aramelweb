import React, { useEffect } from 'react';
import { LogOut, X } from 'lucide-react';
import { useCustomerAuth } from '../context/CustomerAuthContext';

export default function SignOutConfirmModal() {
  const { isSignOutModalOpen, closeSignOutModal, logout, customer } = useCustomerAuth();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isSignOutModalOpen) {
        closeSignOutModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSignOutModalOpen, closeSignOutModal]);

  if (!isSignOutModalOpen) return null;

  const displayName = customer?.name || customer?.phone || 'Customer';

  return (
    <div className="signout-modal-backdrop" onClick={closeSignOutModal}>
      <div 
        className="signout-modal-card" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button 
          className="signout-close-btn" 
          onClick={closeSignOutModal}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="signout-icon-pulse-wrapper">
          <div className="signout-icon-circle">
            <LogOut size={26} color="#FF2B85" />
          </div>
          <div className="signout-pulse-ring"></div>
        </div>

        <h3 className="signout-title">Sign Out of CarFrnd?</h3>
        
        <p className="signout-desc">
          You are currently signed in as <strong className="signout-user-highlight">{displayName}</strong>. 
          Are you sure you want to sign out?
        </p>

        <div className="signout-actions-row">
          <button 
            className="btn-signout-cancel"
            onClick={closeSignOutModal}
          >
            Stay Signed In
          </button>
          
          <button 
            className="btn-signout-confirm"
            onClick={logout}
          >
            <LogOut size={16} />
            <span>Yes, Sign Out</span>
          </button>
        </div>
      </div>

      <style>{`
        .signout-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.72);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: backdropFadeIn 0.2s ease-out;
        }

        .signout-modal-card {
          background: #FFFFFF;
          width: 100%;
          max-width: 420px;
          border-radius: 24px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 25px 60px -15px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(255, 43, 133, 0.1);
          padding: 32px 28px;
          position: relative;
          text-align: center;
          animation: cardPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .signout-close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #64748B;
          transition: all 0.2s ease;
        }

        .signout-close-btn:hover {
          background: #F1F5F9;
          color: #0F172A;
          transform: rotate(90deg);
        }

        .signout-icon-pulse-wrapper {
          position: relative;
          width: 68px;
          height: 68px;
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .signout-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #FFF0F6;
          border: 2px solid rgba(255, 43, 133, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .signout-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(255, 43, 133, 0.4);
          animation: signoutPulse 2s infinite ease-out;
        }

        @keyframes signoutPulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.35); opacity: 0; }
        }

        .signout-title {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 10px 0;
          letter-spacing: -0.3px;
        }

        .signout-desc {
          font-size: 0.92rem;
          line-height: 1.55;
          color: #64748B;
          margin: 0 0 26px 0;
        }

        .signout-user-highlight {
          color: #FF2B85;
          font-weight: 700;
        }

        .signout-actions-row {
          display: flex;
          gap: 12px;
        }

        .btn-signout-cancel {
          flex: 1;
          background: #F8FAFC;
          color: #475569;
          border: 1px solid #CBD5E1;
          padding: 12px 16px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-signout-cancel:hover {
          background: #F1F5F9;
          color: #0F172A;
          border-color: #94A3B8;
        }

        .btn-signout-confirm {
          flex: 1.2;
          background: linear-gradient(135deg, #FF2B85 0%, #E11D48 100%);
          color: #FFFFFF;
          border: none;
          padding: 12px 18px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.92rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 16px rgba(255, 43, 133, 0.35);
          transition: all 0.2s ease;
        }

        .btn-signout-confirm:hover {
          background: linear-gradient(135deg, #E91E63 0%, #BE123C 100%);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(255, 43, 133, 0.45);
        }

        .btn-signout-confirm:active {
          transform: translateY(0);
        }

        @keyframes backdropFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes cardPop {
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
