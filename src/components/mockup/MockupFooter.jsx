import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';

export default function MockupFooter({ onOpenScanner }) {
  return (
    <footer className="mockup-footer" id="contact">
      <div className="mockup-container">
        <div className="footer-top-grid">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <a href="#home" className="mockup-logo-wrap">
              <img 
                src="/carfrndlogo.png" 
                alt="CarFrnd Logo" 
                className="mockup-logo-img" 
              />
            </a>

            <p className="footer-brand-desc">
              Car Frnd is your all-in-one automotive solution for a smarter, easier and connected driving experience.
            </p>

            <div className="footer-social-links">
              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              {/* Twitter / X */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="YouTube">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="WhatsApp">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 1: Services */}
          <div className="footer-nav-col">
            <h5>Services</h5>
            <ul className="footer-links-list">
              <li><a href="#services">Car Wash & Detailing</a></li>
              <li><a href="#services">Tyres & Fitment</a></li>
              <li><a href="#services">Vehicle Services</a></li>
              <li><a href="#find-owner" onClick={(e) => { e.preventDefault(); onOpenScanner?.(); }}>Find Owner</a></li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="footer-nav-col">
            <h5>Company</h5>
            <ul className="footer-links-list">
              <li><a href="#about">About Us</a></li>
              <li><a href="#partners">For Partners</a></li>
              <li><a href="#about">Careers</a></li>
              <li><a href="#contact">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="footer-nav-col">
            <h5>Support</h5>
            <ul className="footer-links-list">
              <li><a href="#contact">Help Center</a></li>
              <li><a href="#contact">Privacy Policy</a></li>
              <li><a href="#contact">Terms & Conditions</a></li>
              <li><a href="#contact">Refund Policy</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="footer-nav-col">
            <h5>Contact</h5>
            <div className="footer-contact-items">
              <div className="footer-contact-row">
                <Phone size={15} />
                <span>+91 80 1234 5678</span>
              </div>
              <div className="footer-contact-row">
                <Mail size={15} />
                <span>support@carfrnd.com</span>
              </div>
              <div className="footer-contact-row">
                <MapPin size={15} />
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar">
          <p>© 2024 Car Frnd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
