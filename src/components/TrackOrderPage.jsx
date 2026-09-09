import React, { useState } from 'react';
import { ArrowLeft, Search, Truck, CheckCircle2, Package, MapPin, ShieldCheck, Sparkles, HelpCircle, Receipt } from 'lucide-react';

export default function TrackOrderPage({ initialOrderId, onNavigate }) {
  const [orderInput, setOrderInput] = useState(initialOrderId || 'CF-842918');
  const [searchedId, setSearchedId] = useState(initialOrderId || 'CF-842918');

  const handleSearch = (e) => {
    e.preventDefault();
    if (!orderInput.trim()) return;
    const cleanId = orderInput.trim().toUpperCase();
    setSearchedId(cleanId.startsWith('CF-') ? cleanId : `CF-${cleanId}`);
  };

  const trackingSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      desc: 'Payment of ₹450 received. Order registered in the Aramel CarFrnd network.',
      timestamp: '08 Sep 2026, 09:15 AM',
      completed: true,
      current: false,
    },
    {
      id: 2,
      title: 'Decal Printed & Encoded',
      desc: 'Weatherproof automotive decal manufactured with encrypted QR & NFC for vehicle MH 01 AB 1234.',
      timestamp: '08 Sep 2026, 02:40 PM',
      completed: true,
      current: false,
    },
    {
      id: 3,
      title: 'Dispatched via Express Courier',
      desc: 'Handed over to BlueDart Air Logistics Hub, Bengaluru. In transit to destination city.',
      timestamp: '08 Sep 2026, 06:10 PM',
      completed: true,
      current: true,
    },
    {
      id: 4,
      title: 'Out for Delivery',
      desc: 'Courier executive will contact you for doorstep delivery.',
      timestamp: 'Expected in 2 business days',
      completed: false,
      current: false,
    },
    {
      id: 5,
      title: 'Delivered to Doorstep',
      desc: 'Package handed over. Follow quick instructions to stick decal on windshield.',
      timestamp: 'Within 3–5 Business Days',
      completed: false,
      current: false,
    }
  ];

  return (
    <div className="track-page-container">
      {/* Top Navigation */}
      <div className="track-nav-bar">
        <div className="container track-nav-inner">
          <button className="btn-back" onClick={() => onNavigate('home')}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>
          <div className="track-title-badge">
            <Truck size={16} color="#FF2B85" />
            <span>Live Order Tracking</span>
          </div>
        </div>
      </div>

      <div className="container track-main-content">
        {/* Search / Lookup Banner */}
        <div className="track-search-card glass-card">
          <div className="search-copy">
            <h2>Track Your CarFrnd Tag Order</h2>
            <p>Enter your 6-digit Order ID (e.g. <code>CF-842918</code>) or 10-digit registered mobile number.</p>
          </div>

          <form onSubmit={handleSearch} className="track-input-form">
            <div className="input-group-track">
              <Search size={18} color="#94A3B8" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. CF-842918)"
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
              />
            </div>
            <button type="submit" className="btn-primary btn-track-submit">
              Track Status
            </button>
          </form>
        </div>

        {/* Live Status Header Card */}
        <div className="status-hero-card glass-card">
          <div className="status-hero-left">
            <div className="status-badge-live">
              <span className="live-dot"></span>
              <span>IN TRANSIT — DISPATCHED</span>
            </div>
            <h3 className="status-heading">Order #{searchedId}</h3>
            <p className="status-sub">
              Your CarFrnd Tag is on the way! Doorstep delivery is guaranteed within <strong>3–5 business days</strong>.
            </p>
          </div>

          <div className="status-hero-right">
            <div className="delivery-est-box">
              <span className="est-label">Estimated Delivery</span>
              <span className="est-date">Within 3–5 Business Days</span>
              <span className="est-courier">Carrier: <strong>BlueDart Express Air</strong> (AWB: BD{searchedId.replace('CF-', '')}IN)</span>
            </div>
          </div>
        </div>

        {/* Tracking Stepper & Order Summary Grid */}
        <div className="track-details-grid">
          {/* Left Column: Vertical Stepper */}
          <div className="stepper-col glass-card">
            <h4 className="col-heading">Shipment Timeline</h4>

            <div className="vertical-timeline">
              {trackingSteps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`timeline-step ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}
                >
                  <div className="step-marker-col">
                    <div className="step-circle">
                      {step.completed ? (
                        <CheckCircle2 size={18} />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    {idx < trackingSteps.length - 1 && <div className="step-line"></div>}
                  </div>

                  <div className="step-content-col">
                    <div className="step-title-row">
                      <span className="step-title">{step.title}</span>
                      {step.current && <span className="current-badge">Active</span>}
                    </div>
                    <p className="step-desc">{step.desc}</p>
                    <span className="step-time">{step.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Details & Address */}
          <div className="info-sidebar-col">
            {/* Item Details */}
            <div className="sidebar-card glass-card">
              <div className="card-sec-head">
                <Package size={18} color="#FF2B85" />
                <span>Package Contents</span>
              </div>

              <div className="package-item-row">
                <div className="package-icon">
                  <ShieldCheck size={24} color="#FF2B85" />
                </div>
                <div className="package-meta">
                  <h5>CarFrnd Smart Contact Tag</h5>
                  <p>Weatherproof Automotive Decal</p>
                  <span className="vehicle-pill">Vehicle: MH 01 AB 1234</span>
                </div>
                <span className="pkg-qty">Qty: 1</span>
              </div>

              <div className="feature-tags-wrap">
                <span className="feat-chip">Sun & Scratch Proof</span>
                <span className="feat-chip">Masked Calls</span>
                <span className="feat-chip">Windshield Safe</span>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="sidebar-card glass-card">
              <div className="card-sec-head">
                <MapPin size={18} color="#FF2B85" />
                <span>Delivery Address</span>
              </div>
              <div className="address-content">
                <strong>Rahul Sharma</strong>
                <p>Flat 402, Lotus Heights, Indiranagar<br />Bengaluru, Karnataka - 560038</p>
                <span className="phone-num">Mobile: +91 98765 43210</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="sidebar-actions-card glass-card">
              <button className="btn-secondary full-w action-btn" onClick={() => onNavigate('bill', searchedId)}>
                <Receipt size={16} />
                <span>Download Bill / Tax Invoice</span>
              </button>
              <button className="btn-primary full-w action-btn" onClick={() => onNavigate('activate-tag')}>
                <Sparkles size={16} />
                <span>Activate Tag Once Delivered</span>
              </button>
            </div>

            {/* Support Callout */}
            <div className="support-help-mini glass-card">
              <HelpCircle size={18} color="#FF2B85" />
              <div>
                <h6>Need tracking assistance?</h6>
                <p>Our support team can assist you with your CarFrnd Tag.</p>
                <a href="mailto:support@carfrnd.com">Email support@carfrnd.com</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .track-page-container {
          min-height: 100vh;
          background: #F8FAFC;
          padding-top: 86px;
          padding-bottom: 60px;
        }

        .track-nav-bar {
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          padding: 12px 0;
          margin-bottom: 24px;
        }

        .track-nav-inner {
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

        .track-title-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 800;
          color: #0F172A;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          padding: 6px 14px;
          border-radius: 20px;
        }

        .track-main-content {
          max-width: 1020px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Search Card */
        .track-search-card {
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
        }

        .search-copy h2 {
          font-size: 1.3rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .search-copy p {
          font-size: 0.84rem;
          color: #64748B;
        }

        .search-copy code {
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--magenta);
          font-weight: 800;
        }

        .track-input-form {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .input-group-track {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 8px 14px;
          width: 260px;
        }

        .input-group-track input {
          border: none;
          background: transparent;
          font-size: 0.88rem;
          outline: none;
          width: 100%;
          color: #0F172A;
          font-weight: 600;
        }

        .btn-track-submit {
          padding: 10px 18px;
          font-size: 0.88rem;
          white-space: nowrap;
        }

        /* Hero Status Card */
        .status-hero-card {
          background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
          color: #FFFFFF;
          border-radius: var(--radius-xl);
          padding: 28px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          border: 1px solid #334155;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
        }

        .status-badge-live {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.2);
          border: 1px solid rgba(16, 185, 129, 0.4);
          color: #34D399;
          font-size: 0.72rem;
          font-weight: 900;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 10px;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 10px #10B981;
        }

        .status-heading {
          font-size: 1.6rem;
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 6px;
        }

        .status-sub {
          font-size: 0.88rem;
          color: #94A3B8;
          max-width: 480px;
          line-height: 1.5;
        }

        .status-sub strong {
          color: #FFFFFF;
        }

        .delivery-est-box {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          padding: 16px 20px;
          border-radius: 14px;
          text-align: right;
          min-width: 260px;
        }

        .est-label {
          font-size: 0.72rem;
          color: #94A3B8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 4px;
        }

        .est-date {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 900;
          color: #FF2B85;
          display: block;
          margin-bottom: 4px;
        }

        .est-courier {
          font-size: 0.75rem;
          color: #CBD5E1;
          display: block;
        }

        /* Timeline Grid */
        .track-details-grid {
          display: grid;
          grid-template-columns: 1.3fr 0.8fr;
          gap: 20px;
        }

        .stepper-col {
          padding: 28px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
        }

        .col-heading {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 24px;
        }

        /* Vertical Stepper */
        .vertical-timeline {
          display: flex;
          flex-direction: column;
        }

        .timeline-step {
          display: flex;
          gap: 18px;
          position: relative;
        }

        .step-marker-col {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .step-circle {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #F1F5F9;
          border: 2px solid #CBD5E1;
          color: #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.85rem;
          flex-shrink: 0;
          z-index: 2;
          transition: all 0.2s;
        }

        .timeline-step.completed .step-circle {
          background: #ECFDF5;
          border-color: #10B981;
          color: #059669;
        }

        .timeline-step.current .step-circle {
          background: #FFF0F6;
          border-color: var(--magenta);
          color: var(--magenta);
          box-shadow: 0 0 12px rgba(255, 43, 133, 0.4);
        }

        .step-line {
          width: 2px;
          flex-grow: 1;
          background: #E2E8F0;
          min-height: 44px;
          margin: 4px 0;
        }

        .timeline-step.completed .step-line {
          background: #A7F3D0;
        }

        .step-content-col {
          padding-bottom: 28px;
          flex: 1;
        }

        .step-title-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 4px;
        }

        .step-title {
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
        }

        .timeline-step.current .step-title {
          color: var(--magenta);
        }

        .current-badge {
          font-size: 0.65rem;
          font-weight: 900;
          background: var(--magenta);
          color: #FFFFFF;
          padding: 1px 7px;
          border-radius: 4px;
        }

        .step-desc {
          font-size: 0.82rem;
          color: #64748B;
          line-height: 1.45;
          margin-bottom: 4px;
        }

        .step-time {
          font-size: 0.74rem;
          color: #94A3B8;
          font-weight: 600;
        }

        /* Info Sidebar */
        .info-sidebar-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .sidebar-card {
          padding: 20px 22px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-lg);
        }

        .card-sec-head {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.88rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid #F1F5F9;
        }

        .package-item-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .package-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .package-meta h5 {
          font-size: 0.92rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 2px 0;
        }

        .package-meta p {
          font-size: 0.76rem;
          color: #64748B;
          margin: 0 0 4px 0;
        }

        .vehicle-pill {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          color: #0F172A;
          background: #F1F5F9;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
        }

        .pkg-qty {
          font-size: 0.8rem;
          font-weight: 800;
          color: #64748B;
        }

        .feature-tags-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .feat-chip {
          font-size: 0.68rem;
          font-weight: 700;
          color: #475569;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .address-content strong {
          font-size: 0.9rem;
          color: #0F172A;
          display: block;
          margin-bottom: 4px;
        }

        .address-content p {
          font-size: 0.82rem;
          color: #64748B;
          line-height: 1.45;
          margin-bottom: 6px;
        }

        .phone-num {
          font-size: 0.78rem;
          color: #334155;
          font-weight: 700;
        }

        .sidebar-actions-card {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px;
          font-size: 0.86rem;
        }

        .support-help-mini {
          padding: 16px 18px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          border-radius: var(--radius-lg);
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .support-help-mini h6 {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .support-help-mini p {
          font-size: 0.78rem;
          color: #64748B;
          margin-bottom: 4px;
        }

        .support-help-mini a {
          font-size: 0.78rem;
          color: var(--magenta);
          font-weight: 800;
          text-decoration: underline;
        }

        @media (max-width: 860px) {
          .track-details-grid {
            grid-template-columns: 1fr;
          }
          .status-hero-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .delivery-est-box {
            width: 100%;
            text-align: left;
          }
          .track-search-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .track-input-form {
            width: 100%;
          }
          .input-group-track {
            flex: 1;
            width: auto;
          }
        }
      `}</style>
    </div>
  );
}
