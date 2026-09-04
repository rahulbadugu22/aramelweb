import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onOpenScanner, onOpenOrderTag }) {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="#" className="footer-logo">
              <img src="/carfrndlogo.png" alt="CarFrnd Logo" className="footer-logo-img" />
            </a>
            <p className="footer-brand-desc">
              India's #1 privacy-first smart vehicle safety tag system & doorstep auto care network. 
              Protecting car owners and delivering premium maintenance at your doorstep.
            </p>
            <div className="footer-contact-info">
              <div className="c-item">
                <Mail size={15} color="#FF2B85" /> 
                <span className="c-label">Support: </span>
                <a href="mailto:support@carfrnd.com" className="email-link">support@carfrnd.com</a>
              </div>
              <div className="c-item">
                <Phone size={15} color="#FF2B85" /> 
                <span className="c-label">24/7 Helpline: </span>
                <a href="tel:1800227376" className="email-link">+91 1800-CARFRND</a>
              </div>
              <div className="c-item">
                <MapPin size={15} color="#FF2B85" /> 
                <span className="c-label">HQ: Sector 44, Gurugram, NCR, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">FindOwner QR</h4>
            <ul className="footer-links">
              <li><a href="#findowner">How FindOwner Works</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenOrderTag(); }}>Order Tag (₹99)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenScanner(); }}>Test Scanner Simulator</a></li>
              <li><a href="#findowner">Privacy Guarantee</a></li>
            </ul>
          </div>

          {/* Live Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Live Services</h4>
            <ul className="footer-links">
              <li><a href="#live-services">Door-step Car Wash</a></li>
              <li><a href="#live-services">Car Wash Station</a></li>
              <li><a href="#live-services">Car Detailing & Coating</a></li>
              <li><a href="#live-services">Buy Branded Tyres</a></li>
              <li><a href="#live-services">Wheel Alignment & Balancing</a></li>
            </ul>
          </div>

          {/* Coming Soon & App */}
          <div className="footer-col">
            <h4 className="footer-heading">Mobile App & Future</h4>
            <ul className="footer-links">
              <li><a href="#app-download">Download iOS App</a></li>
              <li><a href="#app-download">Download Android App</a></li>
              <li><a href="#coming-soon">24/7 Roadside Assistance</a></li>
              <li><a href="#coming-soon">FASTag & Insurance Renewals</a></li>
              <li><a href="#coming-soon">Traffic Challan Auto-Pay</a></li>
              <li><a href="#coming-soon">EV Charging Station Finder</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} CarFrnd Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Security Audit</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer-section {
          background: #F1F5F9;
          border-top: 1px solid #E2E8F0;
          padding: 44px 0 36px 0;
          color: #475569;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 36px;
          margin-bottom: 32px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          margin-bottom: 22px;
          height: 56px;
          min-width: 180px;
          overflow: visible;
        }

        .footer-logo-img {
          height: 60px;
          width: auto;
          object-fit: contain;
          transform: scale(2.2);
          transform-origin: left center;
          transition: transform 0.2s ease;
        }

        .footer-logo-img:hover {
          transform: scale(2.28);
        }

        .footer-brand-desc {
          font-size: 0.88rem;
          line-height: 1.55;
          margin-bottom: 16px;
          max-width: 360px;
          color: #64748B;
        }

        .footer-contact-info {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.86rem;
        }

        .c-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #334155;
        }

        .c-label {
          font-weight: 500;
        }

        .email-link {
          color: #0F172A;
          text-decoration: none;
          font-weight: 700;
          transition: color 0.2s ease;
        }

        .email-link:hover {
          color: var(--magenta);
          text-decoration: underline;
        }

        .footer-heading {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 14px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .footer-links a {
          color: #64748B;
          text-decoration: none;
          font-size: 0.86rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .footer-links a:hover {
          color: var(--magenta);
        }

        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid #CBD5E1;
          font-size: 0.82rem;
          color: #64748B;
        }

        .footer-legal-links {
          display: flex;
          gap: 16px;
        }

        .footer-legal-links a {
          color: #64748B;
          text-decoration: none;
          font-weight: 500;
        }

        .footer-legal-links a:hover {
          color: var(--magenta);
        }

        @media (max-width: 900px) {
          .footer-section {
            padding-bottom: 110px !important;
          }
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .footer-logo {
            margin-bottom: 20px;
            height: 52px;
          }
          .footer-logo-img {
            height: 56px;
            transform: scale(2.2);
            transform-origin: left center;
          }
          .footer-bottom-bar {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
