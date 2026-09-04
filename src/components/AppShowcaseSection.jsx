import React, { useState, useEffect } from 'react';
import { Shield, Navigation, Home, Sparkles, Disc, QrCode, Clock, PhoneCall, AlertTriangle, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AppShowcaseSection() {
  // Set FindOwner as the initial default active tab with auto-animation running
  const [activeTab, setActiveTab] = useState('findowner');
  const [scanStep, setScanStep] = useState(1);

  // Auto-cycle through the FindOwner scanning animation flow
  useEffect(() => {
    let timer;
    if (activeTab === 'findowner') {
      timer = setInterval(() => {
        setScanStep(prev => (prev >= 3 ? 1 : prev + 1));
      }, 2600);
    }
    return () => clearInterval(timer);
  }, [activeTab]);

  const tabs = [
    {
      id: 'findowner',
      label: 'Find Owner',
      icon: Shield,
      title: 'Smart FindOwner QR Protection',
      desc: 'Experience complete privacy protection. Anyone can scan your windshield QR tag with their phone camera to send an alert or connect through anonymous masked voice calls without seeing your number.'
    },
    {
      id: 'track',
      label: 'Track',
      icon: Navigation,
      title: 'Live Service Tracking',
      desc: 'Real-time status, technician location, service progress checklist, and digital invoice — all in one screen.'
    },
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      title: 'Smart Automotive Hub',
      desc: 'All your vehicle garage details, upcoming insurance expiries, active FindOwner QR tags, and 1-tap service shortcuts in one unified dashboard.'
    },
    {
      id: 'carcare',
      label: 'Car Care',
      icon: Sparkles,
      title: 'Doorstep Wash & Detailing',
      desc: 'Book verified doorstep wash technicians, interior dry-cleaning, and showroom machine polish packages with transparent upfront pricing.'
    },
    {
      id: 'tyres',
      label: 'Tyres',
      icon: Disc,
      title: 'Tyre Store & Alignment',
      desc: 'Shop genuine tyres from Michelin, Bridgestone, CEAT, and Apollo with free doorstep installation, 3D laser alignment, and nitrogen inflation.'
    }
  ];

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];
  const activeIndex = tabs.findIndex(t => t.id === activeTab);

  const handleDownload = (store) => {
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });
    alert(`Redirecting to CarFrnd App on ${store}...`);
  };

  return (
    <section id="app-showcase" className="section-padding app-showcase-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="showcase-pill">
            <span className="pill-dot"></span>
            <span>THE APP</span>
          </div>
          <h2 className="showcase-title">See CarFrnd in Action</h2>
          <p className="showcase-subtitle">
            Five powerful screens. One seamless experience for every car need.
          </p>
        </div>

        {/* Showcase Grid: Left Controls & Right Dynamic Phone Mockup */}
        <div className="showcase-main-grid">
          {/* Left Side: 5 Screen Tabs & Active Tab Details */}
          <div className="showcase-controls-col">
            {/* 5 Screen Tabs */}
            <div className="screen-tabs-bar">
              {tabs.map((t) => {
                const IconC = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    className={`screen-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTab(t.id);
                      if (t.id === 'findowner') setScanStep(1);
                    }}
                  >
                    <IconC size={15} />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Screen Info Text */}
            <div className="active-screen-info">
              <h3 className="info-title">{currentTab.title}</h3>
              <p className="info-desc">{currentTab.desc}</p>
            </div>

            {/* Pagination Line Indicators */}
            <div className="screen-pagination-indicators">
              {tabs.map((t, idx) => (
                <span
                  key={t.id}
                  className={`page-dash ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab(t.id);
                    if (t.id === 'findowner') setScanStep(1);
                  }}
                ></span>
              ))}
            </div>

            {/* Store Download CTAs */}
            <div className="showcase-store-ctas">
              <button className="store-pill-btn" onClick={() => handleDownload('Google Play')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.55.33-1.03.84-1.24.51-.21 1.11-.07 1.48.34l10 9-10 9c-.37.41-.97.55-1.48.34C3.33 21.53 3 21.05 3 20.5zM16.5 12L7 3.5l11.5 6.5-2 2zM7 20.5l9.5-8.5 2 2L7 20.5z"/>
                </svg>
                <div className="s-txt">
                  <span className="s-sub">Get it on</span>
                  <span className="s-main">Google Play</span>
                </div>
              </button>

              <button className="store-pill-btn" onClick={() => handleDownload('App Store')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.07c.64-.78 1.08-1.85.96-2.92-.93.04-2.06.62-2.73 1.4-.59.68-1.1 1.77-.96 2.83 1.04.08 2.1-.53 2.73-1.31z"/>
                </svg>
                <div className="s-txt">
                  <span className="s-sub">Download on</span>
                  <span className="s-main">App Store</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Side: Realistic Phone Mockup */}
          <div className="showcase-phone-col">
            <div className="phone-device-container">
              {/* Dynamic Floating Top Bubble Badge */}
              <div className="floating-bubble-top animate-float">
                {activeTab === 'findowner' ? (
                  scanStep === 1 ? (
                    <>
                      <span className="bubble-bold">Windshield QR Tag Scanned</span>
                      <span className="bubble-sub">Camera Live • Instant Resolver</span>
                    </>
                  ) : scanStep === 2 ? (
                    <>
                      <span className="bubble-bold">Emergency Alert Sent</span>
                      <span className="bubble-sub">Parking Dispute Avoided</span>
                    </>
                  ) : (
                    <>
                      <span className="bubble-bold">Anonymous Call Active</span>
                      <span className="bubble-sub">100% Privacy Masked</span>
                    </>
                  )
                ) : activeTab === 'track' ? (
                  <>
                    <span className="bubble-bold">Booking Confirmed</span>
                    <span className="bubble-sub">Foam Wash • Today 2:30 PM</span>
                  </>
                ) : activeTab === 'carcare' ? (
                  <>
                    <span className="bubble-bold">Doorstep Wash Slot</span>
                    <span className="bubble-sub">Verified Mobile Van Assigned</span>
                  </>
                ) : activeTab === 'tyres' ? (
                  <>
                    <span className="bubble-bold">Tyre Dispatch</span>
                    <span className="bubble-sub">Free Doorstep Fitment</span>
                  </>
                ) : (
                  <>
                    <span className="bubble-bold">Digital Car Garage</span>
                    <span className="bubble-sub">All Documents Active</span>
                  </>
                )}
              </div>

              {/* Floating Bottom App Rating Badge */}
              <div className="floating-bubble-bottom">
                <span className="rating-num">4.9 ★</span>
                <span className="rating-lbl">App Rating</span>
              </div>

              {/* Phone Frame */}
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

                  {/* ========================================================
                      SCREEN 1: FIND OWNER (Default with Animated Flow)
                      ======================================================== */}
                  {activeTab === 'findowner' && (
                    <div className="phone-content-body findowner-screen-view animate-fade-in">
                      <div className="screen-top-bar">
                        <div className="screen-header-badge" style={{ background: 'rgba(255, 43, 133, 0.15)', color: '#FF2B85' }}>
                          <Shield size={12} color="#FF2B85" />
                          <span>FINDOWNER QR</span>
                        </div>
                      </div>

                      <h4 className="screen-hero-title">QR Safety Guard</h4>

                      {/* Animated Flow Step Pills */}
                      <div className="flow-step-tracker">
                        <span className={`step-dot ${scanStep === 1 ? 'active' : ''}`}>1. Scan</span>
                        <span className={`step-dot ${scanStep === 2 ? 'active' : ''}`}>2. Select Issue</span>
                        <span className={`step-dot ${scanStep === 3 ? 'active' : ''}`}>3. Masked Call</span>
                      </div>

                      {/* Step 1: Camera Scanner Viewfinder */}
                      {scanStep === 1 && (
                        <div className="mock-scanner-viewfinder">
                          <div className="laser-scanner-line"></div>
                          <div className="qr-box-centered">
                            <QrCode size={56} color="#FFFFFF" className="mock-qr-icon" />
                          </div>
                          <span className="scan-radar-txt">Scanning Windshield QR Tag...</span>
                          <span className="scan-vnum-detect">Target: MH 01 AB 1234</span>
                        </div>
                      )}

                      {/* Step 2: Issue Detected */}
                      {scanStep === 2 && (
                        <div className="mock-issue-detected-card">
                          <div className="mock-vtag-row">
                            <span className="vplate-bold">MH 01 AB 1234</span>
                            <span className="vtag-id">ID: KA560100MM1234</span>
                          </div>
                          <div className="alert-select-box">
                            <AlertTriangle size={14} color="#FF2B85" />
                            <span>Car Blocking Driveway Gate</span>
                            <CheckCircle2 size={13} color="#10B981" style={{ marginLeft: 'auto' }} />
                          </div>
                          <div className="alert-dispatched-note">
                            <span>● Masked routing gateway triggered...</span>
                          </div>
                          <button className="phone-primary-action-btn" style={{ marginTop: '4px' }}>
                            Connecting Masked Call...
                          </button>
                        </div>
                      )}

                      {/* Step 3: 100% Masked Call Connected */}
                      {scanStep === 3 && (
                        <div className="mock-masked-call-connected">
                          <div className="call-pulse-circle">
                            <PhoneCall size={22} color="#10B981" />
                          </div>
                          <span className="call-connected-txt">Anonymous Call Connected</span>
                          <span className="call-sub-txt">100% Phone Number Privacy Guard</span>
                          <div className="call-meta-box">
                            <span>Scanner: +91 98XXX XXXXX (Masked)</span>
                            <span>Car Owner: +91 97XXX XXXXX (Masked)</span>
                          </div>
                          <div className="call-timer-badge">
                            <span>Call Active • 00:14</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ========================================================
                      SCREEN 2: TRACK
                      ======================================================== */}
                  {activeTab === 'track' && (
                    <div className="phone-content-body track-screen-view animate-fade-in">
                      <div className="screen-top-bar">
                        <div className="screen-header-badge">
                          <Navigation size={12} color="#8B5CF6" />
                          <span>TRACK</span>
                        </div>
                      </div>

                      <h4 className="screen-hero-title">Service Tracking</h4>

                      <div className="track-status-stepper">
                        <span className="step-tag done">✓ Picked Up</span>
                        <span className="step-tag done">✓ In Service</span>
                        <span className="step-tag active">⏳ Quality Check</span>
                      </div>

                      <div className="tech-assigned-box">
                        <div className="tech-avatar">RK</div>
                        <div className="tech-details">
                          <span className="tech-name">Technician: Ravi Kumar</span>
                          <span className="tech-status">● On the way to location</span>
                        </div>
                      </div>

                      <div className="eta-timestamp">
                        <Clock size={12} />
                        <span>ETA: 2:30 PM today</span>
                      </div>

                      <button className="phone-primary-action-btn">
                        View Digital Invoice
                      </button>
                    </div>
                  )}

                  {/* ========================================================
                      SCREEN 3: HOME
                      ======================================================== */}
                  {activeTab === 'home' && (
                    <div className="phone-content-body home-screen-view animate-fade-in">
                      <div className="screen-top-bar">
                        <div className="screen-header-badge">
                          <Home size={12} color="#10B981" />
                          <span>MY GARAGE</span>
                        </div>
                      </div>

                      <div className="garage-car-card">
                        <div className="g-car-info">
                          <span className="g-model">Toyota Camry Hybrid</span>
                          <span className="g-plate">MH 01 AB 1234</span>
                        </div>
                        <span className="g-tag-status">● Tag Active</span>
                      </div>

                      <div className="quick-service-shortcuts-row">
                        <div className="s-card">
                          <span>🚿</span>
                          <label>Wash</label>
                        </div>
                        <div className="s-card">
                          <span>✨</span>
                          <label>Detail</label>
                        </div>
                        <div className="s-card">
                          <span>🛞</span>
                          <label>Tyres</label>
                        </div>
                        <div className="s-card">
                          <span>🛡️</span>
                          <label>Tag</label>
                        </div>
                      </div>

                      <button className="phone-primary-action-btn">
                        Book Doorstep Service
                      </button>
                    </div>
                  )}

                  {/* ========================================================
                      SCREEN 4: CAR CARE
                      ======================================================== */}
                  {activeTab === 'carcare' && (
                    <div className="phone-content-body carcare-screen-view animate-fade-in">
                      <div className="screen-top-bar">
                        <div className="screen-header-badge" style={{ background: 'rgba(255, 43, 133, 0.15)', color: '#FF2B85' }}>
                          <Sparkles size={12} color="#FF2B85" />
                          <span>CAR CARE</span>
                        </div>
                      </div>

                      <div className="service-offer-card">
                        <div className="offer-header">
                          <span className="offer-title">Doorstep Foam Wash</span>
                          <span className="offer-price">₹399</span>
                        </div>
                        <p className="offer-desc">High-pressure foam, interior floor vacuuming, and dashboard wipe.</p>
                        <span className="slot-badge">Available Today • 45 min</span>
                      </div>

                      <button className="phone-primary-action-btn">
                        Select Preferred Slot
                      </button>
                    </div>
                  )}

                  {/* ========================================================
                      SCREEN 5: TYRES
                      ======================================================== */}
                  {activeTab === 'tyres' && (
                    <div className="phone-content-body tyres-screen-view animate-fade-in">
                      <div className="screen-top-bar">
                        <div className="screen-header-badge" style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#EAB308' }}>
                          <Disc size={12} color="#EAB308" />
                          <span>TYRE STORE</span>
                        </div>
                      </div>

                      <div className="tyre-item-card">
                        <span className="tyre-brand">Michelin Primacy 4 ST</span>
                        <span className="tyre-size">205/55 R16 91V</span>
                        <div className="tyre-price-line">
                          <strong>₹8,499</strong> / tyre
                          <span className="free-fit-tag">Free Fitment</span>
                        </div>
                      </div>

                      <button className="phone-primary-action-btn">
                        Order with Doorstep Fitment
                      </button>
                    </div>
                  )}

                  {/* Phone Bottom Tab Bar */}
                  <div className="phone-bottom-nav">
                    <div className={`p-tab ${activeTab === 'findowner' ? 'active' : ''}`} onClick={() => { setActiveTab('findowner'); setScanStep(1); }}>
                      <div className="p-fab-icon">
                        <QrCode size={13} color="#FFFFFF" />
                      </div>
                    </div>
                    <div className={`p-tab ${activeTab === 'track' ? 'active' : ''}`} onClick={() => setActiveTab('track')}>
                      <Navigation size={15} />
                    </div>
                    <div className={`p-tab ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
                      <Home size={15} />
                    </div>
                    <div className={`p-tab ${activeTab === 'carcare' ? 'active' : ''}`} onClick={() => setActiveTab('carcare')}>
                      <Sparkles size={15} />
                    </div>
                    <div className={`p-tab ${activeTab === 'tyres' ? 'active' : ''}`} onClick={() => setActiveTab('tyres')}>
                      <Disc size={15} />
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
          padding: 40px 0;
          position: relative;
          overflow: hidden;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
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
          margin-bottom: 12px;
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
          font-size: 1.02rem;
          color: #64748B;
          max-width: 600px;
          margin: 0 auto 24px auto;
          line-height: 1.6;
        }

        .showcase-main-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 48px;
          align-items: center;
        }

        /* 5 Tabs on Left */
        .screen-tabs-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .screen-tab-btn {
          background: #F1F5F9;
          border: 1.5px solid #E2E8F0;
          color: #475569;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.84rem;
          padding: 7px 15px;
          border-radius: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.25s ease;
        }

        .screen-tab-btn:hover {
          border-color: #10B981;
          color: #059669;
        }

        .screen-tab-btn.active {
          background: #10B981;
          border-color: #10B981;
          color: #FFFFFF;
          font-weight: 800;
          box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);
        }

        .active-screen-info {
          margin-bottom: 24px;
          min-height: 95px;
        }

        .info-title {
          font-size: 1.7rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 10px;
        }

        .info-desc {
          font-size: 0.98rem;
          color: #64748B;
          line-height: 1.6;
        }

        /* Pagination Dashes */
        .screen-pagination-indicators {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
        }

        .page-dash {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #CBD5E1;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .page-dash.active {
          width: 24px;
          border-radius: 4px;
          background: #10B981;
        }

        /* Download CTAs */
        .showcase-store-ctas {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .store-pill-btn {
          background: #0F172A;
          border: 1px solid #0F172A;
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          gap: 10px;
          color: #FFFFFF;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.12);
        }

        .store-pill-btn:hover {
          background: var(--magenta);
          border-color: var(--magenta);
          transform: translateY(-2px);
          box-shadow: var(--shadow-magenta);
        }

        .s-txt {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .s-sub {
          font-size: 0.62rem;
          color: #94A3B8;
          text-transform: uppercase;
        }

        .s-main {
          font-size: 0.88rem;
          font-weight: 800;
        }

        /* Right Phone Frame Mockup */
        .showcase-phone-col {
          display: flex;
          justify-content: center;
          width: 100%;
        }

        .phone-device-container {
          position: relative;
          width: 300px;
        }

        /* Floating Overlays */
        .floating-bubble-top {
          position: absolute;
          top: 40px;
          right: -24px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          color: #0F172A;
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
          bottom: 65px;
          left: -20px;
          background: #0F172A;
          color: #FFFFFF;
          padding: 8px 14px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.2);
          z-index: 20;
          pointer-events: none;
        }

        .rating-num {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 900;
          color: #F59E0B;
        }

        .rating-lbl {
          font-size: 0.62rem;
          color: #94A3B8;
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
          background: rgba(139, 92, 246, 0.15);
          color: #A78BFA;
          border-radius: 10px;
          padding: 2px 7px;
          font-size: 0.62rem;
          font-weight: 800;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .screen-hero-title {
          font-size: 1.05rem;
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 10px;
        }

        /* FindOwner Animated Scan Flow */
        .flow-step-tracker {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .step-dot {
          font-size: 0.62rem;
          font-weight: 700;
          color: #64748B;
          padding: 3px 6px;
          border-radius: 5px;
          background: rgba(255, 255, 255, 0.05);
          transition: all 0.3s ease;
        }

        .step-dot.active {
          color: #FFFFFF;
          background: var(--magenta);
          font-weight: 800;
          box-shadow: 0 0 10px rgba(255, 43, 133, 0.5);
        }

        .mock-scanner-viewfinder {
          height: 175px;
          background: #14161F;
          border-radius: 14px;
          border: 1.5px dashed var(--magenta);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .laser-scanner-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: #FF2B85;
          box-shadow: 0 0 12px #FF2B85;
          animation: radarScan 2.4s infinite ease-in-out;
        }

        .qr-box-centered {
          background: rgba(255, 255, 255, 0.1);
          padding: 8px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .scan-radar-txt {
          font-size: 0.68rem;
          color: #FF73B3;
          font-weight: 800;
        }

        .scan-vnum-detect {
          font-size: 0.62rem;
          color: #34D399;
          font-family: monospace;
        }

        .mock-issue-detected-card {
          background: #1E293B;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .mock-vtag-row {
          display: flex;
          flex-direction: column;
        }

        .vplate-bold {
          font-size: 0.95rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        .vtag-id {
          font-size: 0.62rem;
          color: #10B981;
          font-family: monospace;
        }

        .alert-select-box {
          background: rgba(255, 43, 133, 0.15);
          border: 1px solid var(--magenta);
          padding: 8px 10px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: #FFFFFF;
          font-weight: 700;
        }

        .alert-dispatched-note {
          font-size: 0.6rem;
          color: #10B981;
          font-weight: 600;
        }

        .mock-masked-call-connected {
          background: #1E293B;
          border-radius: 14px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 5px;
        }

        .call-pulse-circle {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.2);
          border: 2px solid #10B981;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2px;
          animation: pulseRing 1.5s infinite ease-out;
        }

        @keyframes pulseRing {
          0% { transform: scale(0.95); }
          50% { transform: scale(1.08); }
          100% { transform: scale(0.95); }
        }

        .call-connected-txt {
          font-size: 0.82rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .call-sub-txt {
          font-size: 0.62rem;
          color: #10B981;
        }

        .call-meta-box {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 6px;
          padding: 5px 8px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 2px;
          font-size: 0.6rem;
          color: #94A3B8;
          font-family: monospace;
          margin-top: 2px;
        }

        .call-timer-badge {
          background: rgba(16, 185, 129, 0.15);
          color: #10B981;
          font-size: 0.62rem;
          font-weight: 800;
          padding: 2px 8px;
          border-radius: 10px;
          margin-top: 3px;
        }

        /* Track Screen Components */
        .track-status-stepper {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 12px;
        }

        .step-tag {
          font-size: 0.68rem;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 6px;
          background: rgba(255, 255, 255, 0.05);
          color: #94A3B8;
        }

        .step-tag.done {
          color: #10B981;
          background: rgba(16, 185, 129, 0.12);
        }

        .step-tag.active {
          color: #F59E0B;
          background: rgba(245, 158, 11, 0.15);
          font-weight: 800;
        }

        .tech-assigned-box {
          background: #1E293B;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 8px 10px;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .tech-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--magenta);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tech-details {
          display: flex;
          flex-direction: column;
        }

        .tech-name {
          font-size: 0.72rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        .tech-status {
          font-size: 0.62rem;
          color: #10B981;
        }

        .eta-timestamp {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 0.66rem;
          color: #94A3B8;
          margin-bottom: 12px;
        }

        .phone-primary-action-btn {
          width: 100%;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          border: none;
          color: #FFFFFF;
          font-family: var(--font-heading);
          font-size: 0.75rem;
          font-weight: 800;
          padding: 9px;
          border-radius: 8px;
          cursor: pointer;
          margin-top: auto;
        }

        /* Garage & Offers Cards */
        .garage-car-card, .service-offer-card, .tyre-item-card {
          background: #1E293B;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .g-model { font-size: 0.76rem; font-weight: 800; color: #FFFFFF; display: block; }
        .g-plate { font-size: 0.66rem; color: #94A3B8; }
        .g-tag-status { font-size: 0.6rem; color: #10B981; font-weight: 700; }

        .quick-service-shortcuts-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 5px;
          margin-bottom: 12px;
        }

        .s-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 6px;
          padding: 6px 2px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .s-card span { font-size: 0.9rem; }
        .s-card label { font-size: 0.58rem; color: #CBD5E1; font-weight: 600; }

        .offer-header { display: flex; justify-content: space-between; margin-bottom: 3px; }
        .offer-title { font-size: 0.78rem; font-weight: 800; color: #FFFFFF; }
        .offer-price { font-size: 0.84rem; font-weight: 900; color: var(--magenta); }
        .offer-desc { font-size: 0.65rem; color: #94A3B8; line-height: 1.3; margin-bottom: 4px; }
        .slot-badge { font-size: 0.58rem; color: #10B981; font-weight: 700; }

        .tyre-brand { font-size: 0.78rem; font-weight: 800; color: #FFFFFF; display: block; }
        .tyre-size { font-size: 0.65rem; color: #94A3B8; margin-bottom: 4px; display: block; }
        .tyre-price-line { display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: #FFFFFF; }
        .free-fit-tag { font-size: 0.58rem; background: #ECFDF5; color: #059669; padding: 1px 5px; border-radius: 4px; font-weight: 800; }

        /* Phone Bottom Tab Bar */
        .phone-bottom-nav {
          height: 44px;
          background: #14161F;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-top: auto;
        }

        .p-tab {
          color: #64748B;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .p-tab.active {
          color: #10B981;
        }

        .p-fab-icon {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--magenta);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .app-showcase-section {
            padding: 28px 0;
          }
          .showcase-pill {
            margin-bottom: 8px;
          }
          .showcase-title {
            font-size: 2rem;
            margin-bottom: 8px;
          }
          .showcase-subtitle {
            margin-bottom: 18px;
            font-size: 0.92rem;
          }
          .showcase-main-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .showcase-controls-col {
            text-align: center;
          }
          .screen-tabs-bar {
            justify-content: center;
            margin-bottom: 16px;
          }
          .active-screen-info {
            margin-bottom: 16px;
            min-height: auto;
          }
          .info-title {
            font-size: 1.4rem;
            margin-bottom: 6px;
          }
          .info-desc {
            font-size: 0.88rem;
          }
          .screen-pagination-indicators {
            justify-content: center;
            margin-bottom: 20px;
          }
          .showcase-store-ctas {
            justify-content: center;
          }
          .floating-bubble-top {
            right: 0;
            top: 20px;
          }
          .floating-bubble-bottom {
            left: 0;
            bottom: 20px;
          }
        }
      `}</style>
    </section>
  );
}
