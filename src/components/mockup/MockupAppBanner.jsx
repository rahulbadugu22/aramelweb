import React from 'react';
import { Apple, Play } from 'lucide-react';
import RealisticQRCode from './RealisticQRCode';

export default function MockupAppBanner() {
  return (
    <section className="mockup-app-banner" id="download-app">
      <div className="mockup-container">
        <div className="banner-grid">
          {/* Left: Angled Phone Mockup */}
          <div className="banner-phone-visual">
            <img 
              src="/mockup/app_banner_car.jpg" 
              alt="Car Frnd App" 
              className="banner-phone-img" 
            />
          </div>

          {/* Center: Headline & Subtitle */}
          <div className="banner-text-col">
            <h2>
              Your Car Deserves<br />
              a Better Way.
            </h2>
            <p>
              Download Car Frnd and experience the new age of vehicle care.
            </p>
          </div>

          {/* Right: App Store Badges & Real QR Code */}
          <div className="banner-actions-col">
            <div className="banner-store-buttons">
              {/* Google Play */}
              <a 
                href="#download" 
                className="store-badge-btn"
                onClick={(e) => { e.preventDefault(); alert('Car Frnd Android app is currently in rollout!'); }}
              >
                <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2B85' }}>
                  <Play size={18} fill="#FF2B85" />
                </div>
                <div className="store-badge-text">
                  <span>GET IT ON</span>
                  <strong>Google Play</strong>
                </div>
              </a>

              {/* App Store */}
              <a 
                href="#download" 
                className="store-badge-btn"
                onClick={(e) => { e.preventDefault(); alert('Car Frnd iOS app is currently in rollout!'); }}
              >
                <div style={{ width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Apple size={20} />
                </div>
                <div className="store-badge-text">
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </a>
            </div>

            {/* Realistic QR Code Box */}
            <div className="banner-qr-box">
              <RealisticQRCode size={84} />
              <span>Scan to Download</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
