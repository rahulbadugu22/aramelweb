import React from 'react';
import { 
  ArrowRight, 
  Download, 
  Users, 
  ShieldCheck, 
  Clock, 
  Sparkles 
} from 'lucide-react';

export default function MockupHero({ onOpenScanner, onExploreServices }) {
  return (
    <section className="mockup-hero" id="home">
      <div className="mockup-container">
        <div className="mockup-hero-grid">
          {/* Left Column: Headline & Action */}
          <div className="mockup-hero-content">
            <div className="mockup-hero-tag">
              <Sparkles size={14} />
              THE COMPLETE AUTOMOTIVE SOLUTION
            </div>

            <h1 className="mockup-hero-title">
              Everything Your<br />
              Car Needs.<br />
              <span className="pink-accent">In One Place.</span>
            </h1>

            <p className="mockup-hero-sub">
              From car wash to tyres, vehicle services to smart communication — Car Frnd has everything your car needs.
            </p>

            <div className="mockup-hero-ctas">
              <a 
                href="#services" 
                onClick={onExploreServices}
                className="btn-hero-primary"
              >
                Explore Services
                <ArrowRight size={18} />
              </a>

              <a href="#download-app" className="btn-hero-secondary">
                <Download size={17} />
                Download App
              </a>
            </div>

            {/* Badges Row */}
            <div className="mockup-hero-stats">
              <div className="hero-stat-item">
                <div className="hero-stat-icon">
                  <Users size={16} />
                </div>
                <div className="hero-stat-text">
                  <span className="hero-stat-val">10K+</span>
                  <span className="hero-stat-label">Happy Customers</span>
                </div>
              </div>

              <div className="hero-stat-item">
                <div className="hero-stat-icon">
                  <ShieldCheck size={16} />
                </div>
                <div className="hero-stat-text">
                  <span className="hero-stat-val">Trusted</span>
                  <span className="hero-stat-label">Services</span>
                </div>
              </div>

              <div className="hero-stat-item">
                <div className="hero-stat-icon">
                  <Clock size={16} />
                </div>
                <div className="hero-stat-text">
                  <span className="hero-stat-val">Quick & Easy</span>
                  <span className="hero-stat-label">Booking</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Exact ChatGPT Image (Phone + QR Decal + Green Sports Car) */}
          <div 
            className="mockup-hero-visual" 
            onClick={onOpenScanner}
            title="Click to test QR Scanner Simulator"
          >
            <img 
              src="/mockup/hero_composite.png" 
              alt="Car Frnd App, Find Owner QR Tag & Sports Car" 
              className="hero-composite-img" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
