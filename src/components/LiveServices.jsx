import React, { useState } from 'react';
import { Sparkles, Bell, CheckCircle2, Droplets, Disc } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LiveServices({ onOpenOrderTag }) {
  const [subscribed, setSubscribed] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) return;
    setSubscribed(true);
    confetti({
      particleCount: 75,
      spread: 65,
      origin: { y: 0.6 }
    });
  };

  const services = [
    {
      title: 'Doorstep Car Wash',
      desc: 'Eco-friendly high-pressure foam wash, wheel rim scrubbing, tire dressing, and interior floor vacuuming delivered at your home or office.',
      icon: Droplets,
      image: '/images/service_car_wash.jpg',
    },
    {
      title: 'Car Detailing',
      desc: 'Showroom finish packages combining deep interior steam sanitization, leather conditioning, and 3-step exterior machine polish.',
      icon: Sparkles,
      image: '/images/service_car_detailing.jpg',
    },
    {
      title: 'Tyre & Wheel Services',
      desc: 'Genuine branded tyre fitment from top brands, precision computerized 3D wheel alignment, dynamic balancing, and nitrogen inflation.',
      icon: Disc,
      image: '/images/service_tyres_wheels.jpg',
    },
  ];

  return (
    <section id="live-services" className="section-padding live-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="glass-pill">
            <span className="badge-pulsing-dot"></span>
            <span>COMING SOON</span>
          </div>

          <h2 className="section-title">
            CarFrnd <span className="magenta-gradient-text">Auto Services</span>
          </h2>

          <p className="section-subtitle">
            More ways to care for your car are coming soon.
          </p>

          <div className="services-summary-pill">
            <span className="s-name">Doorstep Car Wash</span>
            <span className="dot-sep">•</span>
            <span className="s-name">Car Detailing</span>
            <span className="dot-sep">•</span>
            <span className="s-name">Tyre & Wheel Services</span>
          </div>
        </div>

        {/* 3 Clean Coming Soon Cards */}
        <div className="clean-services-grid">
          {services.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <div key={idx} className="clean-service-card glass-card">
                <div className="service-card-media">
                  <img src={service.image} alt={service.title} className="service-card-photo" loading="lazy" />
                  <div className="service-media-overlay"></div>
                  <span className="coming-soon-badge-floating">Coming Soon</span>
                  <div className="service-icon-floating">
                    <IconComp size={18} color="#FF2B85" />
                  </div>
                </div>

                <div className="service-card-body">
                  <h3 className="clean-service-title">{service.title}</h3>
                  <p className="clean-service-desc">{service.desc}</p>

                  <div className="service-card-footer">
                    <span className="service-launch-note">
                      <span className="dot-ping"></span> Launching Next
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Priority Notification Banner */}
        <div className="services-notify-box glass-card">
          <div className="notify-content-left">
            <h4>Be the First to Know When We Launch in Your City</h4>
            <p>Get early priority booking access and exclusive launch discounts across all CarFrnd Auto Services.</p>
          </div>

          {subscribed ? (
            <div className="notify-success-badge">
              <CheckCircle2 size={18} color="#059669" />
              <span>You're on the priority launch list ({emailOrPhone})!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="notify-form-inline">
              <input
                type="text"
                placeholder="Enter email or mobile number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                required
                className="notify-input"
              />
              <button type="submit" className="btn-primary notify-submit-btn">
                <Bell size={15} />
                <span>Notify Me on Launch</span>
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        .live-services-section {
          background: #FFFFFF;
          padding: 44px 0 28px 0;
          border-top: 1px solid #E2E8F0;
        }

        .badge-pulsing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--magenta);
        }

        .services-summary-pill {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 8px 20px;
          border-radius: 30px;
          font-family: var(--font-heading);
          font-size: 0.9rem;
          font-weight: 700;
          color: #334155;
          margin-top: 14px;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
        }

        .dot-sep {
          color: var(--magenta);
          font-size: 1.1rem;
        }

        .s-name {
          color: #0F172A;
        }

        .clean-services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin: 32px 0 32px 0;
        }

        .clean-service-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          overflow: hidden;
          padding: 0;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
          transition: all 0.35s ease;
        }

        .clean-service-card:hover {
          border-color: rgba(255, 43, 133, 0.35);
          transform: translateY(-5px);
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.09), 0 0 20px rgba(255, 43, 133, 0.08);
        }

        .service-card-media {
          position: relative;
          width: 100%;
          height: 195px;
          overflow: hidden;
          background: #0F172A;
        }

        .service-card-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }

        .clean-service-card:hover .service-card-photo {
          transform: scale(1.06);
        }

        .service-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.45) 100%);
        }

        .coming-soon-badge-floating {
          position: absolute;
          top: 14px;
          right: 14px;
          font-size: 0.7rem;
          font-weight: 800;
          color: var(--magenta);
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          padding: 4px 10px;
          border-radius: 20px;
          border: 1px solid rgba(255, 43, 133, 0.2);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .service-icon-floating {
          position: absolute;
          bottom: 12px;
          left: 14px;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 43, 133, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .service-card-body {
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .clean-service-title {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 8px;
        }

        .clean-service-desc {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.6;
          margin-bottom: 18px;
          flex: 1;
        }

        .service-card-footer {
          padding-top: 14px;
          border-top: 1px solid #F1F5F9;
          margin-top: auto;
        }

        .service-launch-note {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #059669;
        }

        .dot-ping {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
        }

        /* Priority Notification Banner */
        .services-notify-box {
          background: linear-gradient(135deg, #F8FAFC 0%, #FFF5F9 100%);
          border: 1.5px solid var(--magenta-border);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
          box-shadow: 0 10px 30px rgba(255, 43, 133, 0.05);
        }

        .notify-content-left h4 {
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .notify-content-left p {
          font-size: 0.9rem;
          color: #64748B;
          margin: 0;
        }

        .notify-form-inline {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 380px;
        }

        .notify-input {
          flex: 1;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          font-size: 0.9rem;
          outline: none;
          color: #0F172A;
        }

        .notify-input:focus {
          border-color: var(--magenta);
        }

        .notify-submit-btn {
          padding: 12px 20px;
          font-size: 0.88rem;
          white-space: nowrap;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .notify-success-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #ECFDF5;
          color: #059669;
          border: 1px solid #A7F3D0;
          padding: 10px 18px;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 700;
        }

        @media (max-width: 992px) {
          .clean-services-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .services-summary-pill {
            flex-wrap: wrap;
            justify-content: center;
            gap: 6px 10px;
            font-size: 0.82rem;
            padding: 10px 16px;
          }

          .services-notify-box {
            flex-direction: column;
            text-align: center;
            padding: 24px;
            gap: 18px;
          }

          .notify-form-inline {
            width: 100%;
            min-width: unset;
            flex-direction: column;
          }

          .notify-input, .notify-submit-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
