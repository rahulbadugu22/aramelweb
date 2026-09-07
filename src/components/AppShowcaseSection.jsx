import React, { useState, useEffect } from 'react';
import { Shield, ShieldCheck, QrCode, PhoneCall, AlertTriangle, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';

export default function AppShowcaseSection({ onOpenScanner, onOpenOrderTag }) {
  const [scanStep, setScanStep] = useState(1);

  // Auto-cycle through the CarFrnd Tag scanning flow
  useEffect(() => {
    const timer = setInterval(() => {
      setScanStep(prev => (prev >= 3 ? 1 : prev + 1));
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="app-showcase" className="section-padding app-showcase-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="showcase-header-badges">
            <div className="eco-pill-header">
              <CheckCircle2 size={13} color="#059669" />
              <span>NO APP REQUIRED TO SCAN</span>
            </div>
            <div className="showcase-pill">
              <span className="pill-dot"></span>
              <span>CARFRND TAG</span>
            </div>
          </div>
          <h2 className="showcase-title">See CarFrnd Tag in Action</h2>
          <p className="showcase-subtitle">
            Your car's smart contact tag. See how CarFrnd Tag keeps you connected while keeping your phone number private.
          </p>
        </div>

        {/* Showcase Grid: Left Controls & Right Dynamic Phone Mockup */}
        <div className="showcase-main-grid">
          {/* Left Side: CarFrnd Tag Details & Action CTAs */}
          <div className="showcase-controls-col">
            {/* CarFrnd Tag Single Active Tab Pill */}
            <div className="screen-tabs-bar">
              <button className="screen-tab-btn active" type="button">
                <Shield size={16} />
                <span>CarFrnd Tag</span>
              </button>
            </div>

            {/* Active Info Text */}
            <div className="active-screen-info">
              <h3 className="info-title">Your Car's Smart Contact Tag</h3>
              <p className="info-desc">
                Stay connected about your car without sharing your personal phone number. Anyone can scan your CarFrnd Tag with their phone camera to notify you about your car without seeing your personal phone number.
              </p>
            </div>

            {/* Key Value Perks */}
            <div className="carfrnd-tag-perks-list">
              <div className="perk-row">
                <CheckCircle2 size={16} color="#059669" className="perk-icon" />
                <span>No app download required for the person scanning</span>
              </div>
              <div className="perk-row">
                <CheckCircle2 size={16} color="#059669" className="perk-icon" />
                <span>Secure masked voice communication</span>
              </div>
              <div className="perk-row">
                <CheckCircle2 size={16} color="#059669" className="perk-icon" />
                <span>Instant alerts for blocking, window open, or towing</span>
              </div>
            </div>

            {/* Live CTAs */}
            <div className="showcase-actions-row">
              <button className="btn-primary showcase-cta-main" onClick={onOpenOrderTag}>
                <Sparkles size={16} />
                <span>Get Your CarFrnd Tag — ₹450</span>
              </button>
              <button className="btn-secondary showcase-cta-sec" onClick={onOpenScanner}>
                <QrCode size={16} />
                <span>Scan a CarFrnd Tag</span>
              </button>
            </div>
          </div>

          {/* Right Side: Realistic Phone Mockup */}
          <div className="showcase-phone-col">
            <div className="phone-device-container">
              {/* Dynamic Floating Top Bubble Badge */}
              <div className="floating-bubble-top animate-float">
                {scanStep === 1 ? (
                  <>
                    <span className="bubble-bold">CarFrnd Tag Scanned</span>
                    <span className="bubble-sub">Camera Live • Tag Verified</span>
                  </>
                ) : scanStep === 2 ? (
                  <>
                    <span className="bubble-bold">CarFrnd Tag Alert Sent</span>
                  </>
                ) : (
                  <>
                    <span className="bubble-bold">Masked Call Active</span>
                    <span className="bubble-sub">Phone Number Protected</span>
                  </>
                )}
              </div>

              {/* Floating Bottom Badge */}
              <div className="floating-bubble-bottom">
                <ShieldCheck size={18} color="#10B981" />
                <span className="rating-lbl">No App Required to Scan</span>
              </div>

              {/* Phone Hardware Frame */}
              <div className="phone-hardware-frame">
                <div className="phone-screen-viewport">
                  {/* Status Bar */}
                  <div className="phone-status-bar">
                    <span className="time">9:41</span>
                    <div className="dynamic-island-notch"></div>
                    <div className="status-icons">
                      <span>5G</span>
                      <span className="battery">100%</span>
                    </div>
                  </div>

                  {/* CarFrnd Tag Interactive Flow Screen */}
                  <div className="phone-content-body carfrnd-tag-screen-view animate-fade-in">
                    <div className="screen-top-bar">
                      <div className="screen-header-badge" style={{ background: 'rgba(255, 43, 133, 0.15)', color: '#FF2B85' }}>
                        <Shield size={12} color="#FF2B85" />
                        <span>CARFRND TAG</span>
                      </div>
                    </div>

                    <h4 className="screen-hero-title">QR Safety Guard</h4>

                    {/* Animated Flow Step Pills */}
                    <div className="flow-step-tracker">
                      <button
                        type="button"
                        className={`step-dot ${scanStep === 1 ? 'active' : ''}`}
                        onClick={() => setScanStep(1)}
                      >
                        1. Scan
                      </button>
                      <button
                        type="button"
                        className={`step-dot ${scanStep === 2 ? 'active' : ''}`}
                        onClick={() => setScanStep(2)}
                      >
                        2. Select Reason
                      </button>
                      <button
                        type="button"
                        className={`step-dot ${scanStep === 3 ? 'active' : ''}`}
                        onClick={() => setScanStep(3)}
                      >
                        3. Masked Call
                      </button>
                    </div>

                    {/* Step 1: Camera Scanner Viewfinder */}
                    {scanStep === 1 && (
                      <div className="mock-scanner-viewfinder">
                        <div className="laser-scanner-line"></div>
                        <div className="qr-box-centered">
                          <QrCode size={56} color="#FFFFFF" className="mock-qr-icon" />
                        </div>
                        <span className="scan-radar-txt">Scanning CarFrnd Tag...</span>
                        <span className="scan-vnum-detect">Vehicle: MH 01 AB 1234</span>
                      </div>
                    )}

                    {/* Step 2: Issue Detected */}
                    {scanStep === 2 && (
                      <div className="mock-issue-detected-card">
                        <div className="mock-vtag-row">
                          <span className="vplate-bold">MH 01 AB 1234</span>
                          <span className="vtag-id">Tag ID: KA560100MM1234</span>
                        </div>
                        <div className="alert-select-box">
                          <AlertTriangle size={14} color="#FF2B85" />
                          <span>Car Blocking Driveway / Gate</span>
                          <CheckCircle2 size={13} color="#10B981" style={{ marginLeft: 'auto' }} />
                        </div>
                        <div className="alert-dispatched-note">
                          <span>● Secure alert routing initiated...</span>
                        </div>
                        <button className="phone-primary-action-btn" style={{ marginTop: '4px' }}>
                          Connecting Masked Call...
                        </button>
                      </div>
                    )}

                    {/* Step 3: Masked Call Connected */}
                    {scanStep === 3 && (
                      <div className="mock-masked-call-connected">
                        <div className="call-pulse-circle">
                          <PhoneCall size={22} color="#10B981" />
                        </div>
                        <span className="call-connected-txt">Masked Call Connected</span>
                        <span className="call-sub-txt">Your Phone Number Stays Private</span>
                        <div className="call-meta-box">
                          <span>Scanner: Hidden</span>
                          <span>Car Owner: Hidden</span>
                        </div>
                        <div className="call-timer-badge">
                          <span>Call Active • 00:14</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Phone Bottom Footer Bar */}
                  <div className="phone-bottom-nav">
                    <div className="p-brand-indicator">
                      <ShieldCheck size={14} color="#FF2B85" />
                      <span>CarFrnd Tag Secure Gateway</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .app-showcase-section {
          background: #FFFFFF;
          color: #0F172A;
          padding: 50px 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
        }

        .showcase-header-badges {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 14px;
        }

        .eco-pill-header {
          background: #F0FDF4;
          border: 1px solid #BBF7D0;
          border-radius: 20px;
          padding: 4px 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #15803D;
          letter-spacing: 0.06em;
        }

        .showcase-pill {
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 20px;
          padding: 4px 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #059669;
          letter-spacing: 0.08em;
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
          box-shadow: 0 0 6px #10B981;
        }

        .showcase-title {
          font-size: 2.8rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .showcase-subtitle {
          font-size: 1.05rem;
          color: #64748B;
          max-width: 600px;
          margin: 0 auto 28px auto;
          line-height: 1.6;
        }

        .showcase-main-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 48px;
          align-items: center;
        }

        .screen-tabs-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }

        .screen-tab-btn {
          background: var(--magenta-light);
          border: 1.5px solid var(--magenta);
          color: var(--magenta);
          padding: 8px 18px;
          border-radius: 12px;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          cursor: default;
        }

        .active-screen-info {
          margin-bottom: 22px;
        }

        .info-title {
          font-size: 1.85rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 10px;
          letter-spacing: -0.01em;
        }

        .info-desc {
          font-size: 1rem;
          color: #475569;
          line-height: 1.65;
          max-width: 540px;
        }

        .carfrnd-tag-perks-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 28px;
          padding: 16px 20px;
          background: #F8FAFC;
          border-radius: 14px;
          border: 1px solid #E2E8F0;
        }

        .perk-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          color: #1E293B;
        }

        .perk-icon {
          flex-shrink: 0;
        }

        .showcase-actions-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .showcase-cta-main,
        .showcase-cta-sec {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          font-size: 0.9rem;
        }

        /* Phone Mockup Column */
        .showcase-phone-col {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .phone-device-container {
          position: relative;
          width: 310px;
        }

        .floating-bubble-top {
          position: absolute;
          top: 30px;
          right: -25px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          padding: 10px 14px;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 12px 30px rgba(15, 23, 42, 0.14);
          z-index: 20;
          pointer-events: none;
          max-width: 210px;
        }

        .bubble-bold {
          font-size: 0.74rem;
          font-weight: 800;
          color: #0F172A;
        }

        .bubble-sub {
          font-size: 0.64rem;
          color: #64748B;
        }

        .floating-bubble-bottom {
          position: absolute;
          bottom: 40px;
          left: -20px;
          background: #0F172A;
          color: #FFFFFF;
          padding: 8px 14px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);
          z-index: 20;
          pointer-events: none;
        }

        .rating-lbl {
          font-size: 0.75rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        /* Phone Frame */
        .phone-hardware-frame {
          background: #0F172A;
          border-radius: 36px;
          padding: 10px;
          border: 3px solid #E2E8F0;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.12);
        }

        .phone-screen-viewport {
          background: #0F172A;
          border-radius: 26px;
          height: 480px;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .phone-status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 16px 4px 16px;
          font-size: 0.7rem;
          font-weight: 700;
          color: #E2E8F0;
        }

        .dynamic-island-notch {
          width: 64px;
          height: 12px;
          background: #000000;
          border-radius: 8px;
        }

        .status-icons {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.62rem;
        }

        .phone-content-body {
          padding: 12px 14px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .screen-top-bar {
          display: flex;
          margin-bottom: 6px;
        }

        .screen-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 12px;
        }

        .screen-hero-title {
          font-size: 1.15rem;
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 10px;
        }

        .flow-step-tracker {
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(255, 255, 255, 0.06);
          padding: 4px;
          border-radius: 8px;
          margin-bottom: 12px;
        }

        .step-dot {
          flex: 1;
          font-size: 0.62rem;
          font-weight: 700;
          color: #94A3B8;
          text-align: center;
          padding: 3px 0;
          border-radius: 6px;
          background: none;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
        }

        .step-dot.active {
          background: var(--magenta);
          color: #FFFFFF;
        }

        .mock-scanner-viewfinder {
          background: #020617;
          border: 1.5px dashed rgba(255, 43, 133, 0.4);
          border-radius: 14px;
          height: 220px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .laser-scanner-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FF2B85, transparent);
          box-shadow: 0 0 10px #FF2B85;
          animation: radarScan 2s infinite ease-in-out;
        }

        .qr-box-centered {
          background: rgba(255, 255, 255, 0.1);
          padding: 10px;
          border-radius: 10px;
          margin-bottom: 8px;
        }

        .scan-radar-txt {
          font-size: 0.68rem;
          color: #E2E8F0;
          font-weight: 700;
        }

        .scan-vnum-detect {
          font-size: 0.62rem;
          color: var(--magenta);
          font-weight: 800;
          font-family: monospace;
          margin-top: 2px;
        }

        .mock-issue-detected-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .mock-vtag-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .vplate-bold {
          font-size: 0.88rem;
          font-weight: 900;
          color: #FFFFFF;
          font-family: var(--font-heading);
        }

        .vtag-id {
          font-size: 0.65rem;
          color: var(--magenta);
          font-family: monospace;
          font-weight: 700;
        }

        .alert-select-box {
          background: rgba(255, 43, 133, 0.15);
          border: 1px solid var(--magenta-border);
          border-radius: 8px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 700;
        }

        .alert-dispatched-note {
          font-size: 0.65rem;
          color: #10B981;
          font-weight: 600;
        }

        .phone-primary-action-btn {
          width: 100%;
          background: var(--magenta);
          border: none;
          color: #FFFFFF;
          padding: 8px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 800;
          cursor: pointer;
        }

        .mock-masked-call-connected {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 18px 0;
          gap: 8px;
        }

        .call-pulse-circle {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.2);
          border: 2px solid #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 4px;
        }

        .call-connected-txt {
          font-size: 0.88rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        .call-sub-txt {
          font-size: 0.68rem;
          color: #10B981;
          font-weight: 700;
        }

        .call-meta-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 8px 12px;
          display: flex;
          flex-direction: column;
          gap: 3px;
          font-size: 0.68rem;
          color: #E2E8F0;
          margin-top: 4px;
        }

        .call-timer-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #34D399;
          font-size: 0.65rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 12px;
          margin-top: 4px;
        }

        .phone-bottom-nav {
          height: 38px;
          background: #020617;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: auto;
        }

        .p-brand-indicator {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          color: #94A3B8;
        }

        @media (max-width: 900px) {
          .app-showcase-section {
            padding: 36px 0;
          }
          .showcase-title {
            font-size: 2.1rem;
          }
          .showcase-subtitle {
            font-size: 0.95rem;
            margin-bottom: 24px;
          }
          .showcase-main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .showcase-controls-col {
            text-align: center;
          }
          .screen-tabs-bar {
            justify-content: center;
          }
          .info-title {
            font-size: 1.5rem;
          }
          .info-desc {
            margin: 0 auto;
          }
          .carfrnd-tag-perks-list {
            text-align: left;
          }
          .showcase-actions-row {
            justify-content: center;
          }
          .floating-bubble-top {
            right: -5px;
            top: 20px;
          }
          .floating-bubble-bottom {
            left: -5px;
            bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
