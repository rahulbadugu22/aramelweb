import React from 'react';
import { ArrowLeft, Lock, Clock, ShieldCheck } from 'lucide-react';

export default function BillPage({ activeOrder, onNavigate }) {
  // ⚠️ PRODUCTION: Invoice / bill page is disabled until backend authentication is connected.
  // No demo/hardcoded invoice data should be accessible by unauthenticated users.

  return (
    <div className="bill-page-container">
      {/* Top Navigation Bar */}
      <div className="bill-nav-bar no-print">
        <div className="container bill-nav-inner">
          <button className="btn-back" onClick={() => onNavigate('home')}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
          <div className="bill-nav-badge">
            <Lock size={14} color="#FF2B85" />
            <span>Invoice &amp; Billing Access</span>
          </div>
        </div>
      </div>

      {/* Coming Soon / Auth Required State */}
      <div className="container bill-auth-wrapper">
        <div className="bill-auth-card glass-card">
          <div className="bill-auth-icon">
            <Lock size={36} color="#FF2B85" />
          </div>
          <h2 className="bill-auth-title">Customer Authentication Required</h2>
          <p className="bill-auth-desc">
            Tax invoices and billing details are protected. Invoices can only be viewed by authenticated account owners once the backend integration is active.
          </p>

          <div className="bill-coming-soon-badge">
            <Clock size={14} />
            <span>Backend Integration &amp; Authentication Under Development</span>
          </div>

          <div className="bill-auth-steps">
            <div className="auth-step">
              <ShieldCheck size={18} color="#059669" />
              <span>Mobile OTP Verification</span>
            </div>
            <div className="auth-step">
              <ShieldCheck size={18} color="#059669" />
              <span>Encrypted Account Session</span>
            </div>
            <div className="auth-step">
              <ShieldCheck size={18} color="#059669" />
              <span>Authenticated Tax Invoice Access</span>
            </div>
          </div>

          <div className="bill-auth-actions">
            <button className="btn-primary" onClick={() => onNavigate('home')}>
              Return to Home Page
            </button>
          </div>

          <p className="bill-support-note">
            For urgent invoice requests or billing queries, contact our team at{' '}
            <a href="mailto:support@carfrnd.com">support@carfrnd.com</a>
          </p>
        </div>
      </div>

      <style>{`
        .bill-page-container {
          min-height: 100vh;
          background: #F8FAFC;
          padding-top: 86px;
          padding-bottom: 60px;
        }

        .bill-nav-bar {
          position: sticky;
          top: 68px;
          z-index: 40;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          padding: 12px 0;
          margin-bottom: 30px;
        }

        .bill-nav-inner {
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

        .bill-nav-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          color: var(--magenta);
          font-size: 0.8rem;
          font-weight: 800;
          padding: 6px 12px;
          border-radius: 20px;
        }

        .bill-auth-wrapper {
          max-width: 620px;
          margin: 40px auto 0 auto;
        }

        .bill-auth-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 40px 32px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.05);
        }

        .bill-auth-icon {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: var(--magenta-light);
          border: 2px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
        }

        .bill-auth-title {
          font-size: 1.5rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 10px;
        }

        .bill-auth-desc {
          font-size: 0.92rem;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 24px;
          max-width: 480px;
        }

        .bill-coming-soon-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFF7ED;
          border: 1px solid #FFEDD5;
          color: #C2410C;
          font-size: 0.8rem;
          font-weight: 800;
          padding: 8px 16px;
          border-radius: 30px;
          margin-bottom: 28px;
        }

        .bill-auth-steps {
          display: flex;
          flex-direction: column;
          gap: 12px;
          width: 100%;
          max-width: 420px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 18px 20px;
          margin-bottom: 28px;
          text-align: left;
        }

        .auth-step {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.86rem;
          font-weight: 700;
          color: #334155;
        }

        .bill-auth-actions {
          width: 100%;
          max-width: 280px;
          margin-bottom: 20px;
        }

        .bill-auth-actions button {
          width: 100%;
          padding: 12px;
          font-size: 0.9rem;
        }

        .bill-support-note {
          font-size: 0.8rem;
          color: #94A3B8;
          margin: 0;
        }

        .bill-support-note a {
          color: var(--magenta);
          font-weight: 700;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
