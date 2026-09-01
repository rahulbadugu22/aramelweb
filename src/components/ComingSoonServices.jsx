import React, { useState } from 'react';
import { Clock, ShieldAlert, CreditCard, AlertOctagon, Zap, Search, Bell, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ComingSoonServices() {
  const [subscribedIds, setSubscribedIds] = useState({});
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [targetServiceName, setTargetServiceName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const upcomingServices = [
    {
      id: 'rsa-emergency',
      title: '24/7 Roadside Assistance (RSA)',
      tagline: 'Breakdown & Towing Safety Net',
      desc: 'On-demand 24/7 towing, emergency battery jumpstart, fuel delivery, and highway breakdown support within 30 minutes.',
      icon: ShieldAlert,
      launchEta: 'Q4 2026',
      highlights: ['30-min Pan-India Dispatch', 'Towing up to 50 km Free', 'Highway Emergency Hotline']
    },
    {
      id: 'fastag-insurance',
      title: 'FASTag & Insurance Renewals',
      tagline: 'Zero Commission Digital Renewals',
      desc: 'Instant 1-click motor insurance policy renewal at lowest premium rates plus auto-recharge for your FASTag toll wallet.',
      icon: CreditCard,
      launchEta: 'Q4 2026',
      highlights: ['Instant Policy Download', 'Lowest Premium Rate Guarantee', 'Auto Toll Balance Sync']
    },
    {
      id: 'challan-autopay',
      title: 'Traffic Challan Monitor & Pay',
      tagline: 'Instant Violation Alerts',
      desc: 'Get instant WhatsApp & SMS notifications whenever a traffic challan is issued. Pay digitally with zero convenience fee.',
      icon: AlertOctagon,
      launchEta: 'Q1 2027',
      highlights: ['Real-time Violation Alerts', 'Court Lok Adalat Support', 'Zero Platform Convenience Fee']
    },
    {
      id: 'ev-charging',
      title: 'EV Charging Finder & Booking',
      tagline: 'Live Station Availability & Booking',
      desc: 'Find nearest compatible EV fast chargers, view live connector availability, and reserve your charging slot ahead of arrival.',
      icon: Zap,
      launchEta: 'Q1 2027',
      highlights: ['Live Connector Status', 'Reserve Slot Before Arrival', 'Universal Payment Pass']
    },
    {
      id: 'used-car-inspection',
      title: 'Pre-Owned Car 200-Point Audit',
      tagline: 'Unbiased Physical Inspection',
      desc: 'Comprehensive 200+ point physical and OBD-II scanner inspection report by certified engineers before buying any used vehicle.',
      icon: Search,
      launchEta: 'Q2 2027',
      highlights: ['200+ Quality Audit Checks', 'Computerized OBD Scanner Analysis', 'Accident & Flood Damage Check']
    }
  ];

  const handleNotifyClick = (service) => {
    if (subscribedIds[service.id]) {
      setSubscribedIds({ ...subscribedIds, [service.id]: false });
    } else {
      setTargetServiceName(service.title);
      setEmailModalOpen(true);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    const targetService = upcomingServices.find(s => s.title === targetServiceName);
    if (targetService) {
      setSubscribedIds({ ...subscribedIds, [targetService.id]: true });
    }

    setEmailModalOpen(false);
    setUserEmail('');
    
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="coming-soon" className="section-padding coming-soon-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="glass-pill">
            <Clock size={14} />
            <span>EXPANDING AUTOMOTIVE ECOSYSTEM</span>
          </div>
          <h2 className="section-title">
            Coming Soon To <br />
            <span className="magenta-gradient-text">CarFrnd Ecosystem</span>
          </h2>
          <p className="section-subtitle">
            We are actively expanding our digital car services. Subscribe to get early access and exclusive launch discounts.
          </p>
        </div>

        {/* Uniform Sized Cards Grid */}
        <div className="coming-grid">
          {upcomingServices.map((item) => {
            const IconComp = item.icon;
            const isSubscribed = subscribedIds[item.id];

            return (
              <div key={item.id} className="coming-card glass-card">
                <div className="coming-card-top">
                  <div className="coming-icon-wrap">
                    <IconComp size={24} color="#FF2B85" />
                  </div>
                  <span className="badge-tag badge-soon">
                    {item.launchEta}
                  </span>
                </div>

                <h3 className="coming-title">{item.title}</h3>
                <span className="coming-tagline">{item.tagline}</span>
                <p className="coming-desc">{item.desc}</p>

                <div className="coming-highlights-list">
                  {item.highlights.map((h, i) => (
                    <span key={i} className="h-pill">
                      • {h}
                    </span>
                  ))}
                </div>

                <div className="coming-card-footer">
                  <button
                    className={`btn-notify ${isSubscribed ? 'subscribed' : ''}`}
                    onClick={() => handleNotifyClick(item)}
                  >
                    {isSubscribed ? (
                      <>
                        <CheckCircle2 size={16} color="#059669" />
                        <span>Subscribed!</span>
                      </>
                    ) : (
                      <>
                        <Bell size={16} />
                        <span>Notify Me on Launch</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Email Subscription Modal */}
      {emailModalOpen && (
        <div className="modal-backdrop" onClick={() => setEmailModalOpen(false)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setEmailModalOpen(false)}>×</button>

            <form onSubmit={handleEmailSubmit} className="subscribe-form">
              <div className="sub-icon-circle">
                <Bell size={32} color="#FF2B85" />
              </div>

              <h3>Get Priority Early Access to <br /><span className="magenta-text">{targetServiceName}</span></h3>
              <p>Enter your email address to receive priority notification & exclusive launch discounts when this service goes live.</p>

              <div className="form-group" style={{ width: '100%' }}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid #CBD5E1',
                    background: '#F8FAFC',
                    fontSize: '0.95rem',
                    outline: 'none'
                  }}
                  required
                />
              </div>

              <button type="submit" className="btn-primary full-w">
                <Sparkles size={16} /> Notify Me on Launch
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .coming-soon-section {
          background: #FFFFFF;
        }

        .coming-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          align-items: stretch;
        }

        .coming-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          height: 100%;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
          transition: all 0.3s ease;
        }

        .coming-card:hover {
          border-color: rgba(255, 43, 133, 0.4);
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.09), 0 0 20px rgba(255, 43, 133, 0.1);
        }

        .coming-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .coming-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 14px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .coming-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
          min-height: 30px;
        }

        .coming-tagline {
          font-size: 0.8rem;
          color: var(--magenta);
          font-weight: 700;
          margin-bottom: 12px;
          display: block;
        }

        .coming-desc {
          font-size: 0.9rem;
          color: #64748B;
          line-height: 1.55;
          margin-bottom: 20px;
          min-height: 60px;
        }

        .coming-highlights-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 24px;
        }

        .h-pill {
          font-size: 0.8rem;
          color: #334155;
          font-weight: 600;
        }

        .coming-card-footer {
          margin-top: auto;
        }

        .btn-notify {
          width: 100%;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          color: #0F172A;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.9rem;
          padding: 12px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.25s ease;
        }

        .btn-notify:hover {
          background: var(--magenta);
          color: #FFFFFF;
          border-color: var(--magenta);
          box-shadow: 0 4px 15px rgba(255, 43, 133, 0.35);
        }

        .btn-notify.subscribed {
          background: #ECFDF5;
          border-color: #A7F3D0;
          color: #059669;
        }

        .subscribe-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 16px;
          padding: 10px 0;
        }

        .sub-icon-circle {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--magenta-light);
          border: 2px solid var(--magenta);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .subscribe-form h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
        }

        .subscribe-form p {
          font-size: 0.9rem;
          color: #64748B;
        }

        @media (max-width: 992px) {
          .coming-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .coming-card {
            padding: 20px 16px;
          }
          .section-title {
            font-size: 1.85rem;
          }
        }
      `}</style>
    </section>
  );
}
