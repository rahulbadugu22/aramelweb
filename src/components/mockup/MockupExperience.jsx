import React, { useState } from 'react';
import { 
  Smartphone, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  Star,
  Clock
} from 'lucide-react';

export default function MockupExperience() {
  const [scrollIndex, setScrollIndex] = useState(0);

  const handlePrev = () => {
    setScrollIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setScrollIndex((prev) => (prev < 1 ? prev + 1 : 1));
  };

  return (
    <section className="mockup-experience" id="about">
      <div className="mockup-container">
        {/* Section Header */}
        <div className="exp-sec-header">
          <span className="exp-tag">EXPERIENCE CAR FRND</span>
          <h2 className="exp-title">
            Powerful. Simple. Made for <span className="pink-accent">Car Owners.</span>
          </h2>
        </div>

        <div className="exp-content-grid">
          {/* Left Column: 4 Key Features */}
          <div className="exp-features-col">
            <div className="exp-feature-item">
              <div className="exp-feature-icon">
                <Smartphone size={22} />
              </div>
              <div className="exp-feature-text">
                <h4>All Services In One App</h4>
                <p>Car wash, tyres, services & more.</p>
              </div>
            </div>

            <div className="exp-feature-item">
              <div className="exp-feature-icon">
                <MapPin size={22} />
              </div>
              <div className="exp-feature-text">
                <h4>Live Tracking</h4>
                <p>Track your service in real-time.</p>
              </div>
            </div>

            <div className="exp-feature-item">
              <div className="exp-feature-icon">
                <CreditCard size={22} />
              </div>
              <div className="exp-feature-text">
                <h4>Easy Payments</h4>
                <p>Multiple secure payment options.</p>
              </div>
            </div>

            <div className="exp-feature-item">
              <div className="exp-feature-icon">
                <ShieldCheck size={22} />
              </div>
              <div className="exp-feature-text">
                <h4>Trusted Partners</h4>
                <p>Verified service providers.</p>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Mobile Mockups with Carousel Controls */}
          <div className="exp-showcase-wrap">
            <button 
              className="exp-carousel-arrow left" 
              onClick={handlePrev}
              aria-label="Previous screens"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="exp-phones-row">
              {/* Phone 1: Dashboard */}
              <div className="exp-phone-frame">
                <div className="exp-phone-top-bar"></div>
                <div className="phone-mock-dashboard">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>Hi Rohan</strong>
                    <span style={{ fontSize: '0.6rem', color: '#94A3B8' }}>Bangalore</span>
                  </div>
                  <div style={{ background: '#1E293B', padding: '6px 8px', borderRadius: '6px', color: '#94A3B8', fontSize: '0.58rem' }}>
                    🔍 Search services...
                  </div>
                  <div style={{ fontWeight: 700, marginTop: '4px' }}>Top Services</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                    <div style={{ background: '#1E293B', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                      <img src="/mockup/service_car_wash.jpg" alt="Wash" style={{ width: '100%', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                      <span style={{ fontSize: '0.55rem', display: 'block', marginTop: '2px' }}>Car Wash</span>
                    </div>
                    <div style={{ background: '#1E293B', borderRadius: '6px', padding: '6px', textAlign: 'center' }}>
                      <img src="/mockup/service_tyres.jpg" alt="Tyres" style={{ width: '100%', height: '36px', objectFit: 'cover', borderRadius: '4px' }} />
                      <span style={{ fontSize: '0.55rem', display: 'block', marginTop: '2px' }}>Tyres</span>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, marginTop: '6px' }}>Recent Order</div>
                  <div style={{ background: 'rgba(255, 43, 133, 0.1)', border: '1px solid rgba(255, 43, 133, 0.3)', borderRadius: '8px', padding: '8px' }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 700 }}>Express Foam Wash</div>
                    <div style={{ fontSize: '0.55rem', color: '#CBD5E1' }}>Today • 11:30 AM</div>
                  </div>
                </div>
              </div>

              {/* Phone 2: Service Price List */}
              <div className="exp-phone-frame">
                <div className="exp-phone-top-bar"></div>
                <div className="phone-mock-services">
                  <div style={{ fontWeight: 700, fontSize: '0.72rem', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                    Car Wash & Detailing
                  </div>
                  <div className="mock-service-row">
                    <div>
                      <h6>Basic Foam Wash</h6>
                      <small style={{ fontSize: '0.55rem', color: '#94A3B8' }}>Exterior Foam + Glass</small>
                    </div>
                    <span>₹499</span>
                  </div>
                  <div className="mock-service-row">
                    <div>
                      <h6>Deep Interior Cleaning</h6>
                      <small style={{ fontSize: '0.55rem', color: '#94A3B8' }}>Steam sanitize + Vacuum</small>
                    </div>
                    <span>₹1,499</span>
                  </div>
                  <div className="mock-service-row">
                    <div>
                      <h6>Ceramic Shield Detailing</h6>
                      <small style={{ fontSize: '0.55rem', color: '#94A3B8' }}>9H Nano Coating</small>
                    </div>
                    <span>₹2,499</span>
                  </div>
                  <div style={{ fontSize: '0.6rem', fontWeight: 700, marginTop: '4px' }}>Select Vehicle Type</div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <span style={{ background: '#FF2B85', padding: '3px 8px', borderRadius: '4px', fontSize: '0.52rem' }}>Hatch</span>
                    <span style={{ background: '#1E293B', padding: '3px 8px', borderRadius: '4px', fontSize: '0.52rem' }}>Sedan</span>
                    <span style={{ background: '#1E293B', padding: '3px 8px', borderRadius: '4px', fontSize: '0.52rem' }}>SUV</span>
                  </div>
                </div>
              </div>

              {/* Phone 3: Live Tracking Screen */}
              <div className="exp-phone-frame">
                <div className="exp-phone-top-bar"></div>
                <div className="phone-mock-dashboard">
                  <div style={{ fontWeight: 700, fontSize: '0.72rem' }}>My Bookings</div>
                  <div className="phone-mock-booking-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{ fontSize: '0.6rem', fontWeight: 700 }}>Car Detailing</span>
                      <span style={{ fontSize: '0.52rem', background: '#FF2B85', padding: '2px 6px', borderRadius: '4px' }}>On the Way</span>
                    </div>
                    <div style={{ fontSize: '0.55rem', color: '#94A3B8' }}>Partner: Deluxe Studio</div>
                    <div style={{ marginTop: '8px', height: '45px', background: '#1E293B', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FF2B85', fontSize: '0.6rem' }}>
                      📍 12 mins away
                    </div>
                  </div>
                  <div className="phone-mock-booking-card" style={{ marginTop: '8px' }}>
                    <div style={{ fontSize: '0.6rem', fontWeight: 700 }}>Periodic Service</div>
                    <div style={{ fontSize: '0.52rem', color: '#10B981' }}>✓ Completed</div>
                  </div>
                </div>
              </div>

              {/* Phone 4: Find Owner Selection */}
              <div className="exp-phone-frame">
                <div className="exp-phone-top-bar"></div>
                <div className="phone-mock-find-owner">
                  <div style={{ fontWeight: 700, fontSize: '0.68rem', textAlign: 'center' }}>Find Owner</div>
                  <img src="/mockup/hero_sports_car.jpg" alt="Car" className="phone-mock-car-img" />
                  <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#CBD5E1' }}>Select reason to notify:</div>
                  <div style={{ background: '#1E293B', padding: '4px 6px', borderRadius: '4px', fontSize: '0.52rem' }}>• Car Blocking Way</div>
                  <div style={{ background: '#1E293B', padding: '4px 6px', borderRadius: '4px', fontSize: '0.52rem' }}>• Lights are ON</div>
                  <div style={{ background: '#1E293B', padding: '4px 6px', borderRadius: '4px', fontSize: '0.52rem' }}>• Emergency</div>
                  <button className="phone-mock-btn-continue">
                    Continue Securely
                  </button>
                </div>
              </div>
            </div>

            <button 
              className="exp-carousel-arrow right" 
              onClick={handleNext}
              aria-label="Next screens"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
