import React, { useState } from 'react';
import { ChevronDown, Download, Menu, X } from 'lucide-react';

export default function MockupNavbar({ onOpenScanner, onDownloadApp }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  return (
    <nav className="mockup-nav">
      <div className="mockup-container mockup-nav-inner">
        {/* Original Brand Logo */}
        <a href="#home" className="mockup-logo-wrap">
          <img 
            src="/carfrndlogo.png" 
            alt="CarFrnd Logo" 
            className="mockup-logo-img"
          />
        </a>

        {/* Desktop Navigation Links */}
        <ul className="mockup-nav-links">
          <li>
            <a href="#home" className="mockup-nav-link active">Home</a>
          </li>
          <li 
            style={{ position: 'relative' }}
            onMouseEnter={() => setServicesDropdown(true)}
            onMouseLeave={() => setServicesDropdown(false)}
          >
            <a href="#services" className="mockup-nav-link">
              Services <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: servicesDropdown ? 'rotate(180deg)' : 'none' }} />
            </a>
            {servicesDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '10px 0',
                minWidth: '210px',
                boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
                zIndex: 100
              }}>
                <a href="#services" style={{ display: 'block', padding: '8px 16px', color: '#0F172A', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 600 }}>Car Wash & Detailing</a>
                <a href="#services" style={{ display: 'block', padding: '8px 16px', color: '#0F172A', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 600 }}>Tyres & Fitment</a>
                <a href="#services" style={{ display: 'block', padding: '8px 16px', color: '#0F172A', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 600 }}>Vehicle Services</a>
                <a href="#find-owner" style={{ display: 'block', padding: '8px 16px', color: '#FF2B85', textDecoration: 'none', fontSize: '0.84rem', fontWeight: 700 }}>Find Owner Smart Tag</a>
              </div>
            )}
          </li>
          <li>
            <a href="#find-owner" className="mockup-nav-link">Find Owner</a>
          </li>
          <li>
            <a href="#about" className="mockup-nav-link">About Us</a>
          </li>
          <li>
            <a href="#partners" className="mockup-nav-link">For Partners</a>
          </li>
          <li>
            <a href="#contact" className="mockup-nav-link">Contact</a>
          </li>
        </ul>

        {/* Right CTA Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <button 
            onClick={onDownloadApp || (() => {
              const el = document.getElementById('download-app');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="mockup-nav-btn"
          >
            <Download size={15} />
            Download App
          </button>

          {/* Mobile Menu Button */}
          <button 
            className="mockup-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: '#FFFFFF',
          borderBottom: '1px solid #E2E8F0',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.06)'
        }}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)} style={{ color: '#FF2B85', textDecoration: 'none', fontWeight: 700 }}>Home</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>Services</a>
          <a href="#find-owner" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>Find Owner</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>About Us</a>
          <a href="#partners" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>For Partners</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0F172A', textDecoration: 'none', fontWeight: 600 }}>Contact</a>
        </div>
      )}
    </nav>
  );
}
