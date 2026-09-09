import React from 'react';
import { Mail } from 'lucide-react';

export default function Footer({ onOpenOrderTag, onNavigate }) {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <a href="/" className="footer-logo" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('home'); else window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <img src="/carfrndlogo.png" alt="CarFrnd Logo" className="footer-logo-img" />
            </a>
            <p className="footer-brand-desc">
              Your car's smart contact tag. Helping car owners stay connected while keeping their personal phone number private.
            </p>
            <div className="footer-contact-info">
              <div className="c-item">
                <Mail size={15} color="#FF2B85" /> 
                <span className="c-label">Support: </span>
                <a href="mailto:support@carfrnd.com" className="email-link">support@carfrnd.com</a>
              </div>
            </div>
          </div>

          {/* CarFrnd Tag Links */}
          <div className="footer-col">
            <h4 className="footer-heading">CarFrnd Tag</h4>
            <ul className="footer-links">
              <li><a href="#app-showcase" onClick={() => { if (onNavigate) onNavigate('home'); }}>How CarFrnd Tag Works</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenOrderTag(); }}>Order CarFrnd Tag (₹450)</a></li>
              <li><a href="/activate-tag" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('activate-tag'); }}>Activate CarFrnd Tag</a></li>
              <li><a href="/track-order" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('track-order'); }}>Track Your Order</a></li>
              <li><a href="/bill" onClick={(e) => { e.preventDefault(); if (onNavigate) onNavigate('bill'); }}>Download Bill / Invoice</a></li>
              <li><a href="#app-showcase" onClick={() => { if (onNavigate) onNavigate('home'); }}>Privacy & Phone Protection</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© 2026 Aramel Tech Private Limited. All rights reserved.</p>
          <div className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
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
          grid-template-columns: 1.8fr 1fr;
          gap: 48px;
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
            margin-left: -12px;
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
