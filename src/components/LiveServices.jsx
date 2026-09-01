import React, { useState } from 'react';
import { Wrench, Check, ArrowRight, Sparkle, ChevronDown, ChevronUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function LiveServices({ onOpenOrderTag }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAllMobile, setShowAllMobile] = useState(false);
  const [activeBookingService, setActiveBookingService] = useState(null);
  
  // Booking Form State inside Modal
  const [carType, setCarType] = useState('Sedan');
  const [bookingDate, setBookingDate] = useState('2026-09-02');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [bookingComplete, setBookingComplete] = useState(false);

  const services = [
    {
      id: 'qr-tag',
      category: 'Safety & QR',
      title: 'FindOwner QR Safety Tag',
      subtitle: 'CarFrnd Connect',
      price: '₹99',
      duration: 'Lifetime Decal',
      rating: '4.9 ★ (12,400+ reviews)',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=600&q=80',
      desc: 'Weatherproof windshield decal. Allows anyone to contact you anonymously without seeing your phone number.',
      features: [
        '100% Mobile Phone Privacy Masking',
        'Emergency Towing & Parking Alerts',
        'No App Download Required for Scanners',
        'One-time Payment (No Subscriptions)'
      ],
      tag: 'FEATURED'
    },
    {
      id: 'doorstep-wash',
      category: 'Washing',
      title: 'Door-step Car Wash',
      subtitle: 'At Your Home or Office',
      price: '₹399',
      duration: '45-60 min',
      rating: '4.8 ★ (8,900+ reviews)',
      image: 'https://images.unsplash.com/photo-1552930294-6b595f4c2974?auto=format&fit=crop&w=600&q=80',
      desc: 'Eco-friendly high-pressure foam wash, wheel rim scrubbing, tire shine, and interior vacuuming at your doorstep.',
      features: [
        'High-pressure eco foam wash',
        'Microfiber hand wipe & tire dressing',
        'Complete interior floor vacuuming',
        'Dashboard & console polish'
      ],
      tag: 'POPULAR'
    },
    {
      id: 'carwash-shop',
      category: 'Washing',
      title: 'Car Wash Shop Station',
      subtitle: 'Nearby Partner Outlets',
      price: '₹299',
      duration: '30-45 min',
      rating: '4.7 ★ (6,500+ reviews)',
      image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80',
      desc: 'Book priority slots at top-rated neighborhood car wash stations equipped with automatic underbody wash jets.',
      features: [
        'Automatic underbody water jet wash',
        'High-gloss foam spray treatment',
        'Zero queue priority slot booking',
        'Interior floor mats deep cleaning'
      ],
      tag: 'FAST SLOT'
    },
    {
      id: 'car-detailing',
      category: 'Detailing',
      title: 'Showroom Car Detailing',
      subtitle: 'Deep Interior & Exterior Care',
      price: '₹2,499',
      duration: '180-240 min',
      rating: '4.9 ★ (4,200+ reviews)',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80',
      desc: 'Complete showroom finish package combining deep interior steam dry-cleaning and 3-step exterior machine polish.',
      features: [
        'Complete interior seat dry cleaning',
        '3-Step exterior machine polish & wax',
        'Engine bay detailing & alloy restore',
        'AC vent sanitization & odor removal'
      ],
      tag: 'PREMIUM'
    },
    {
      id: 'buy-tyres',
      category: 'Tyres',
      title: 'Buy Branded Tyres',
      subtitle: 'Best Price Guarantee',
      price: 'From ₹2,899',
      duration: 'Same Day Fitment',
      rating: '4.9 ★ (3,100+ reviews)',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
      desc: 'Buy 100% genuine tyres from Michelin, Bridgestone, Goodyear, CEAT, and Apollo with free doorstep fitment.',
      features: [
        'Top Brands: Michelin, Bridgestone, CEAT',
        'Free doorstep installation & valve change',
        'Manufacturing date guarantee (Fresh)',
        'Unconditional damage warranty'
      ],
      tag: 'BEST DEALS'
    },
    {
      id: 'tyre-services',
      category: 'Tyres',
      title: 'Tyre Alignment & Services',
      subtitle: 'Precision Wheel Care',
      price: '₹499',
      duration: '45-60 min',
      rating: '4.8 ★ (5,400+ reviews)',
      image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?auto=format&fit=crop&w=600&q=80',
      desc: 'Computerized 3D wheel alignment, dynamic counterweight balancing, puncture repair, and nitrogen inflation.',
      features: [
        'Laser 3D wheel alignment audit',
        'Dynamic counterweight wheel balancing',
        'Pure nitrogen inflation for 4 tyres',
        'Tread depth & wear pattern audit'
      ],
      tag: 'EXPERT CARE'
    }
  ];

  const filteredServices = selectedCategory === 'All'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingComplete(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="live-services" className="section-padding live-services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="glass-pill">
            <Wrench size={14} />
            <span>CARFRND LIVE AUTO SERVICES</span>
          </div>
          <h2 className="section-title">
            Book Premium Car Care <br />
            <span className="magenta-gradient-text">At Your Fingertips</span>
          </h2>
          <p className="section-subtitle">
            First phase live services on CarFrnd. Verified technicians, upfront transparent pricing.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="category-tabs">
          {['All', 'Safety & QR', 'Washing', 'Detailing', 'Tyres'].map((cat) => (
            <button
              key={cat}
              className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Uniform Sized Services Grid */}
        <div className={`services-grid ${showAllMobile ? 'show-all' : ''}`}>
          {filteredServices.map((service, index) => (
            <div
              key={service.id}
              className={`service-card glass-card ${index >= 3 ? 'mobile-hidden' : ''}`}
            >
              <div className="service-img-wrapper">
                <img src={service.image} alt={service.title} className="service-img" />
                <span className="service-badge-tag">{service.tag}</span>
              </div>

              <div className="service-content">
                <div className="service-meta-top">
                  <span className="service-cat">{service.subtitle}</span>
                  <span className="service-rating">{service.rating}</span>
                </div>

                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.desc}</p>

                <div className="service-features-list">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="feat-line">
                      <Check size={13} color="#FF2B85" className="feat-check" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Card Bottom Alignment */}
                <div className="service-card-footer">
                  <div className="price-box">
                    <span className="price-label">Starting at</span>
                    <span className="price-amount">{service.price}</span>
                  </div>

                  {service.id === 'qr-tag' ? (
                    <button className="btn-primary btn-sm" onClick={onOpenOrderTag}>
                      Order Tag ₹99
                    </button>
                  ) : (
                    <button className="btn-primary btn-sm" onClick={() => setActiveBookingService(service)}>
                      Book Slot <ArrowRight size={13} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View All / Show Less Toggle Button */}
        <div className="mobile-view-all-wrapper">
          <button
            className="btn-secondary mobile-toggle-btn"
            onClick={() => setShowAllMobile(!showAllMobile)}
          >
            {showAllMobile ? (
              <>Show Fewer Services <ChevronUp size={16} /></>
            ) : (
              <>View All Services ({filteredServices.length}) <ChevronDown size={16} /></>
            )}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {activeBookingService && (
        <div className="modal-backdrop" onClick={() => setActiveBookingService(null)}>
          <div className="modal-box glass-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setActiveBookingService(null)}>×</button>

            {bookingComplete ? (
              <div className="booking-success-view">
                <div className="success-icon-wrap">
                  <Sparkle size={42} color="#FF2B85" />
                </div>
                <h3>Slot Booked Successfully! 🎉</h3>
                <p>
                  Your booking for <strong>{activeBookingService.title}</strong> on{' '}
                  <strong>{bookingDate}</strong> at <strong>{bookingTime}</strong> is confirmed.
                </p>
                <p className="sub-note">Technician details will be sent to your mobile via WhatsApp/SMS.</p>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setBookingComplete(false);
                    setActiveBookingService(null);
                  }}
                >
                  Done & Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="booking-form">
                <div className="modal-header">
                  <span className="modal-tag">BOOKING SLOT</span>
                  <h3>{activeBookingService.title}</h3>
                  <p className="modal-price-line">Total Amount: <strong>{activeBookingService.price}</strong></p>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label>Select Car Type</label>
                    <select value={carType} onChange={(e) => setCarType(e.target.value)}>
                      <option value="Hatchback">Hatchback (Swift, i20, Tiago)</option>
                      <option value="Sedan">Sedan (City, Verna, Virtus)</option>
                      <option value="SUV">Compact / Mid SUV (Creta, Nexon, Thar)</option>
                      <option value="Luxury">Luxury (BMW, Audi, Mercedes)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Preferred Date</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Time Slot</label>
                    <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
                      <option value="09:00 AM">09:00 AM - 11:00 AM</option>
                      <option value="11:30 AM">11:30 AM - 01:30 PM</option>
                      <option value="02:30 PM">02:30 PM - 04:30 PM</option>
                      <option value="05:00 PM">05:00 PM - 07:00 PM</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Mobile Number</label>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile number"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Service Location Address</label>
                  <textarea
                    rows={2}
                    placeholder="Enter complete door address or location..."
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary full-w">
                  Confirm Booking ({activeBookingService.price})
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      <style>{`
        .live-services-section {
          background: #FFFFFF;
        }

        .category-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 36px;
        }

        .tab-btn {
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #64748B;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.85rem;
          padding: 8px 18px;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .tab-btn:hover, .tab-btn.active {
          background: var(--magenta);
          color: #FFFFFF;
          border-color: var(--magenta);
          box-shadow: 0 4px 15px rgba(255, 43, 133, 0.3);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: stretch;
        }

        .service-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .service-card:hover {
          border-color: rgba(255, 43, 133, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08), 0 0 15px rgba(255, 43, 133, 0.08);
        }

        .service-img-wrapper {
          position: relative;
          width: 100%;
          height: 190px;
          overflow: hidden;
          background: #F1F5F9;
        }

        .service-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .service-card:hover .service-img {
          transform: scale(1.05);
        }

        .service-badge-tag {
          position: absolute;
          top: 12px;
          right: 12px;
          background: #FFFFFF;
          color: var(--magenta);
          border: 1px solid var(--magenta-border);
          font-size: 0.7rem;
          font-weight: 800;
          padding: 3px 8px;
          border-radius: 5px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .service-content {
          padding: 20px;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .service-meta-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .service-cat {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--magenta);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .service-rating {
          font-size: 0.78rem;
          color: #D97706;
          font-weight: 700;
        }

        .service-card-title {
          font-size: 1.2rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 6px;
        }

        .service-card-desc {
          font-size: 0.86rem;
          color: #64748B;
          line-height: 1.45;
          margin-bottom: 16px;
        }

        .service-features-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 20px;
          padding: 12px;
          background: #F8FAFC;
          border-radius: 10px;
          border: 1px solid #F1F5F9;
        }

        .feat-line {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.8rem;
          color: #334155;
          font-weight: 500;
        }

        .feat-check {
          flex-shrink: 0;
        }

        .service-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #F1F5F9;
        }

        .price-box {
          display: flex;
          flex-direction: column;
        }

        .price-label {
          font-size: 0.7rem;
          color: #64748B;
          font-weight: 600;
        }

        .price-amount {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 900;
          color: #0F172A;
        }

        .btn-sm {
          padding: 8px 16px;
          font-size: 0.84rem;
          border-radius: 8px;
        }

        .mobile-view-all-wrapper {
          display: none;
          justify-content: center;
          margin-top: 24px;
        }

        /* Modal styling */
        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.7);
          backdrop-filter: blur(8px);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .modal-box {
          width: 100%;
          max-width: 500px;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 28px;
          position: relative;
          box-shadow: 0 25px 60px rgba(15, 23, 42, 0.25);
        }

        .modal-close-btn {
          position: absolute;
          top: 16px;
          right: 20px;
          background: none;
          border: none;
          color: #64748B;
          font-size: 1.6rem;
          cursor: pointer;
        }

        .modal-header {
          margin-bottom: 18px;
        }

        .modal-tag {
          font-size: 0.7rem;
          font-weight: 900;
          color: var(--magenta);
          letter-spacing: 0.06em;
        }

        .modal-header h3 {
          font-size: 1.35rem;
          font-weight: 800;
          color: #0F172A;
          margin-top: 2px;
        }

        .modal-price-line {
          font-size: 0.88rem;
          color: #64748B;
          margin-top: 2px;
        }

        .booking-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .booking-form label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 3px;
          display: block;
        }

        .booking-form select, .booking-form input, .booking-form textarea {
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 9px 12px;
          color: #0F172A;
          font-size: 0.88rem;
          width: 100%;
          outline: none;
        }

        .booking-form select:focus, .booking-form input:focus, .booking-form textarea:focus {
          border-color: var(--magenta);
        }

        .booking-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 12px 0;
        }

        .success-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--magenta-light);
          border: 2px solid var(--magenta);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sub-note {
          font-size: 0.82rem;
          color: #64748B;
        }

        @media (max-width: 900px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          /* Show only 3 cards on mobile unless toggled */
          .service-card.mobile-hidden {
            display: none;
          }

          .services-grid.show-all .service-card.mobile-hidden {
            display: flex;
          }

          .mobile-view-all-wrapper {
            display: flex;
          }

          .mobile-toggle-btn {
            width: 100%;
            padding: 11px;
            font-size: 0.88rem;
            border-radius: 12px;
          }

          .category-tabs {
            justify-content: flex-start;
            flex-wrap: nowrap;
            overflow-x: auto;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
