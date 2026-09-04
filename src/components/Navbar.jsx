import React, { useState, useEffect } from 'react';
import { QrCode, Smartphone, Sparkles, Menu, X, Shield, Wrench } from 'lucide-react';

export default function Navbar({ onOpenScanner, onOpenOrderTag }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        {/* Crisp Logo */}
        <a href="#" className="brand-logo">
          <img src="/carfrndlogo.png" alt="CarFrnd Logo" className="brand-logo-img" />
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <a href="#app-showcase" className="nav-link">
            <Smartphone className="nav-icon" size={16} />
            App Demo
          </a>
          <a href="#live-services" className="nav-link">
            <Wrench className="nav-icon" size={16} />
            Live Services
          </a>
          <a href="#coming-soon" className="nav-link">
            Coming Soon
          </a>
        </nav>

        {/* Action CTAs */}
        <div className="nav-actions">
          <button className="btn-scanner-shortcut" onClick={onOpenScanner}>
            <QrCode size={16} />
            <span>Scan QR Demo</span>
          </button>
          <button className="btn-primary btn-nav-cta" onClick={onOpenOrderTag}>
            <Sparkles size={15} />
            <span>Get Tag ₹99</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Menu">
            {mobileMenuOpen ? <X size={26} color="#0F172A" /> : <Menu size={26} color="#0F172A" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#app-showcase" onClick={() => setMobileMenuOpen(false)}>See CarFrnd in Action</a>
          <a href="#live-services" onClick={() => setMobileMenuOpen(false)}>Live Auto Services</a>
          <a href="#coming-soon" onClick={() => setMobileMenuOpen(false)}>Coming Soon Services</a>
          <div className="mobile-drawer-actions">
            <button className="btn-primary full-w" onClick={() => { setMobileMenuOpen(false); onOpenOrderTag(); }}>
              Order FindOwner Tag (₹99)
            </button>
            <button className="btn-secondary full-w" onClick={() => { setMobileMenuOpen(false); onOpenScanner(); }}>
              <QrCode size={16} /> Test Scanner Demo
            </button>
          </div>
        </div>
      )}

      <style>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 68px;
          display: flex;
          align-items: center;
          transition: all 0.3s ease;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
        }

        .navbar-header.scrolled {
          height: 62px;
          background: rgba(255, 255, 255, 0.99);
          border-bottom: 1px solid rgba(255, 43, 133, 0.2);
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.06);
        }

        .nav-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 94%;
          max-width: 1360px;
          margin: 0 auto;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          height: 52px;
          min-width: 175px;
          margin-right: 20px;
          overflow: visible;
        }

        .brand-logo-img {
          height: 60px;
          width: auto;
          object-fit: contain;
          transform: scale(2.2);
          transform-origin: left center;
          transition: transform 0.2s ease;
        }

        .brand-logo-img:hover {
          transform: scale(2.28);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .nav-link {
          color: #334155;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          color: var(--magenta);
        }

        .nav-icon {
          color: var(--magenta);
        }

        .nav-badge {
          font-size: 0.62rem;
          font-weight: 900;
          background: #ECFDF5;
          color: #059669;
          border: 1px solid #A7F3D0;
          padding: 1px 5px;
          border-radius: 4px;
          margin-left: 2px;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-scanner-shortcut {
          background: #FFF0F6;
          color: var(--magenta);
          border: 1px solid var(--magenta-border);
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.85rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
        }

        .btn-scanner-shortcut:hover {
          background: var(--magenta);
          color: #FFFFFF;
          border-color: var(--magenta);
        }

        .btn-nav-cta {
          padding: 9px 18px;
          font-size: 0.86rem;
          border-radius: 10px;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .mobile-drawer {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-light);
          padding: 20px 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.1);
        }

        .mobile-drawer a {
          color: #0F172A;
          text-decoration: none;
          font-weight: 700;
          font-size: 1rem;
          padding: 8px 0;
          border-bottom: 1px solid #F1F5F9;
        }

        .mobile-drawer-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .full-w {
          width: 100%;
        }

        @media (max-width: 900px) {
          .navbar-header {
            height: 68px;
          }
          .navbar-header.scrolled {
            height: 62px;
          }
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .btn-scanner-shortcut {
            display: none;
          }
          .btn-nav-cta {
            display: none; /* Hide on mobile so it doesn't overlap logo/hamburger */
          }
          .brand-logo {
            height: 48px;
            min-width: 150px;
            margin-right: 0;
          }
          .brand-logo-img {
            height: 52px;
            transform: scale(2.2);
            transform-origin: left center;
          }
        }
      `}</style>
    </header>
  );
}
