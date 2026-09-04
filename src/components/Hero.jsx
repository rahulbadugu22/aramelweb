import React from 'react';
import { ShieldCheck, QrCode, Sparkles, ArrowRight, PhoneOff, CheckCircle2, Car } from 'lucide-react';

export default function Hero({ onOpenScanner, onOpenOrderTag }) {
  return (
    <section className="hero-section">
      <div className="hero-bg-image"></div>
      <div className="hero-bg-overlay"></div>
      <div className="hero-bg-glow"></div>

      <div className="container hero-container">
        {/* Left Column Text Content */}
        <div className="hero-content">
          <div className="glass-pill hero-badge animate-float">
            <span className="badge-dot"></span>
            <Sparkles size={13} />
            <span>FINDOWNER QR TAG IS NOW LIVE</span>
          </div>

          <h1 className="hero-title">
            Your Car's Smart <br />
            <span className="magenta-gradient-text">Privacy Guard</span> & <br />
            Total Auto Care
          </h1>

          <p className="hero-description">
            Never display your personal phone number on your dashboard again. With 
            <strong> FindOwner QR Tag</strong>, anyone can notify you of blocking, 
            lights left on, or towing alerts through anonymous masked voice calls.
          </p>

          {/* Key Value Bullets */}
          <div className="hero-bullets">
            <div className="bullet-item">
              <CheckCircle2 size={16} className="bullet-icon" />
              <span>Your Phone Number Stays Private</span>
            </div>
            <div className="bullet-item">
              <CheckCircle2 size={16} className="bullet-icon" />
              <span>No App Required to Scan</span>
            </div>
            <div className="bullet-item">
              <CheckCircle2 size={16} className="bullet-icon" />
              <span>Instant Doorstep Car Wash</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="hero-ctas">
            <button className="btn-primary hero-btn-main" onClick={onOpenOrderTag}>
              <Sparkles size={16} />
              Order Tag (₹99)
            </button>
            <button className="btn-secondary hero-btn-sec" onClick={onOpenScanner}>
              <QrCode size={16} />
              Try Scan Simulator
            </button>
          </div>

          {/* Trust stats ticker */}
          <div className="hero-stats">
            <div className="stat-box">
              <span className="stat-val">50,000+</span>
              <span className="stat-lbl">Privacy Alerts Sent</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-val">4.9 ★</span>
              <span className="stat-lbl">Customer Rating</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-box">
              <span className="stat-val">100%</span>
              <span className="stat-lbl">Zero Phone Leaks</span>
            </div>
          </div>
        </div>

        {/* Right Column Interactive QR Visual Card */}
        <div className="hero-visual">
          <div className="qr-card-mockup glass-card">
            {/* Holographic header */}
            <div className="card-top-bar">
              <div className="brand-pill">
                <ShieldCheck size={15} color="#FF2B85" />
                <span>CarFrnd FindOwner</span>
              </div>
              <span className="status-indicator">
                <span className="dot-green"></span> ACTIVE
              </span>
            </div>

            {/* Main Decal View */}
            <div className="decal-surface">
              <div className="radar-line"></div>
              
              <div className="decal-inner">
                <div className="qr-wrapper">
                  <QrCode size={96} className="qr-svg-graphic" />
                  <div className="qr-logo-center">
                    <Car size={14} color="#FF2B85" />
                  </div>
                </div>

                <div className="decal-info">
                  <span className="vehicle-num">MH 01 AB 1234</span>
                  <span className="tag-id-code">ID: KA560100MM1234</span>
                  <div className="privacy-badge">
                    <PhoneOff size={12} />
                    <span>Masked Call Protected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Scanner Trigger Box */}
            <div className="quick-scan-prompt" onClick={onOpenScanner}>
              <div className="scan-prompt-text">
                <span className="prompt-title">Scan this QR Tag with Camera</span>
                <span className="prompt-sub">Click to test instant alert dispatch</span>
              </div>
              <div className="prompt-arrow">
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          padding-top: 105px;
          padding-bottom: 36px;
          overflow: hidden;
          background: #FFFFFF;
        }

        .hero-bg-image {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=80');
          background-size: cover;
          background-position: center right;
          opacity: 0.95;
          pointer-events: none;
          z-index: 0;
          filter: contrast(1.1) saturate(1.2);
        }

        .hero-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, #FFFFFF 24%, rgba(255, 255, 255, 0.65) 50%, rgba(255, 255, 255, 0) 100%),
                      linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(248, 250, 252, 0.75) 100%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-bg-glow {
          position: absolute;
          top: -120px;
          right: -80px;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 43, 133, 0.16) 0%, rgba(255, 255, 255, 0) 70%);
          pointer-events: none;
          z-index: 0;
        }

        .hero-container {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 40px;
          align-items: center;
        }

        .hero-badge {
          margin-bottom: 16px;
        }

        .badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--magenta);
        }

        .hero-title {
          font-size: 3.2rem;
          font-weight: 900;
          line-height: 1.12;
          margin-bottom: 18px;
          color: #0F172A;
        }

        .hero-description {
          font-size: 1.05rem;
          color: #475569;
          margin-bottom: 22px;
          line-height: 1.6;
          max-width: 560px;
        }

        .hero-bullets {
          display: flex;
          flex-wrap: wrap;
          gap: 10px 20px;
          margin-bottom: 28px;
        }

        .bullet-item {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.9rem;
          font-weight: 700;
          color: #1E293B;
        }

        .bullet-icon {
          color: var(--magenta);
          flex-shrink: 0;
        }

        .hero-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 32px;
        }

        .hero-stats {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 20px;
          border-top: 1px solid #E2E8F0;
        }

        .stat-box {
          display: flex;
          flex-direction: column;
        }

        .stat-val {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 900;
          color: #0F172A;
        }

        .stat-lbl {
          font-size: 0.75rem;
          color: #64748B;
          font-weight: 600;
        }

        .stat-divider {
          width: 1px;
          height: 28px;
          background: #CBD5E1;
        }

        /* Right Visual QR Card Mockup */
        .hero-visual {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .qr-card-mockup {
          width: 100%;
          max-width: 390px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 22px;
          position: relative;
          box-shadow: 0 15px 35px rgba(15, 23, 42, 0.06);
        }

        .card-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .brand-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--magenta);
        }

        .status-indicator {
          font-size: 0.72rem;
          font-weight: 800;
          color: #059669;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .dot-green {
          width: 7px;
          height: 7px;
          background: #10B981;
          border-radius: 50%;
        }

        .decal-surface {
          background: linear-gradient(145deg, #1E293B 0%, #0F172A 100%);
          border-radius: 16px;
          padding: 20px;
          position: relative;
          overflow: hidden;
          margin-bottom: 16px;
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);
        }

        .radar-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FF2B85, transparent);
          box-shadow: 0 0 12px #FF2B85;
          animation: radarScan 3s ease-in-out infinite;
          z-index: 5;
        }

        .decal-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
        }

        .qr-wrapper {
          position: relative;
          background: #FFFFFF;
          padding: 12px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }

        .qr-svg-graphic {
          color: #000000;
        }

        .qr-logo-center {
          position: absolute;
          width: 28px;
          height: 28px;
          background: #FFFFFF;
          border-radius: 50%;
          border: 2px solid #FF2B85;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .decal-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .vehicle-num {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 900;
          letter-spacing: 0.05em;
          color: #FFFFFF;
        }

        .tag-id-code {
          font-family: monospace;
          font-size: 0.78rem;
          color: #FF73B3;
          font-weight: 700;
        }

        .privacy-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: rgba(16, 185, 129, 0.2);
          color: #34D399;
          border: 1px solid rgba(16, 185, 129, 0.4);
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 0.72rem;
          font-weight: 700;
          margin-top: 3px;
        }

        .quick-scan-prompt {
          background: #FFF0F6;
          border: 1.5px dashed var(--magenta-border);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .quick-scan-prompt:hover {
          background: #FFE4F0;
          border-color: var(--magenta);
        }

        .scan-prompt-text {
          display: flex;
          flex-direction: column;
        }

        .prompt-title {
          font-size: 0.84rem;
          font-weight: 800;
          color: #0F172A;
        }

        .prompt-sub {
          font-size: 0.72rem;
          color: var(--magenta);
          font-weight: 600;
        }

        .prompt-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--magenta);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .hero-section {
            padding-top: 86px;
            padding-bottom: 40px;
          }
          .hero-container {
            grid-template-columns: 1fr;
            gap: 28px;
            text-align: center;
          }
          .hero-title {
            font-size: 2.3rem;
          }
          .hero-description {
            margin-left: auto;
            margin-right: auto;
            font-size: 0.96rem;
          }
          .hero-bullets {
            justify-content: center;
            gap: 8px 14px;
          }
          .bullet-item {
            font-size: 0.85rem;
          }
          .hero-ctas {
            justify-content: center;
            gap: 10px;
          }
          .hero-stats {
            justify-content: center;
            gap: 16px;
          }
          .stat-val {
            font-size: 1.15rem;
          }
          .stat-lbl {
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 1.95rem;
          }
          .hero-ctas {
            flex-direction: column;
            width: 100%;
          }
          .hero-ctas button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
