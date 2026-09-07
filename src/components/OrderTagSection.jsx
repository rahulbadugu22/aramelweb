import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, Lock } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OrderTagSection({ onOpenScanner }) {
  const [quantity, setQuantity] = useState(1);
  const [vehicleNo, setVehicleNo] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const unitPrice = 450;
  const totalPrice = unitPrice * quantity;

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !vehicleNo.trim() || !address.trim()) {
      alert('Please fill out all mandatory details including Vehicle Number!');
      return;
    }
    setOrderConfirmed(true);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });
  };

  return (
    <section id="order-tag" className="section-padding order-section">
      <div className="container">
        <div className="order-box glass-card">
          <div className="order-grid">
            {/* Left Side Product Details & Key Benefits */}
            <div className="order-preview-col">
              <div className="glass-pill">
                <Sparkles size={13} />
                <span>SPECIAL LAUNCH OFFER — ₹450 (INCL. GST)</span>
              </div>

              <h2 className="order-title">
                Get Your Weatherproof <br />
                <span className="magenta-gradient-text">FindOwner QR Tag</span>
              </h2>

              <p className="order-subtitle">
                Protect your personal phone number and receive alerts about your car. Delivered to your doorstep in 3–5 business days.
              </p>

              {/* Tag Value Highlights */}
              <div className="order-features-list">
                <div className="order-feature-item">
                  <div className="feat-icon-box">
                    <ShieldCheck size={20} color="#FF2B85" />
                  </div>
                  <div className="feat-content">
                    <h4>100% Privacy Protection</h4>
                    <p>Callers reach you via masked phone forwarding. Your personal mobile number is never exposed.</p>
                  </div>
                </div>

                <div className="order-feature-item">
                  <div className="feat-icon-box">
                    <Sparkles size={20} color="#FF2B85" />
                  </div>
                  <div className="feat-content">
                    <h4>Weatherproof Industrial Decal</h4>
                    <p>Sun, scratch, and pressure-wash resistant premium vinyl engineered for automotive windshields.</p>
                  </div>
                </div>

                <div className="order-feature-item">
                  <div className="feat-icon-box">
                    <Truck size={20} color="#FF2B85" />
                  </div>
                  <div className="feat-content">
                    <h4>Pan-India Doorstep Dispatch</h4>
                    <p>Free express delivery with tracking right to your doorstep within 3–5 business days.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Order Checkout Form */}
            <div className="order-form-col">
              {orderConfirmed ? (
                <div className="order-success-card">
                  <div className="success-icon">
                    <ShieldCheck size={48} color="#FF2B85" />
                  </div>
                  <h3>Order Confirmed! 🎉</h3>
                  <p className="success-txt">
                    Thank you <strong>{name}</strong>! Your order for <strong>{quantity}x FindOwner QR Tag</strong> for vehicle <strong>{vehicleNo.toUpperCase()}</strong> has been placed successfully.
                  </p>
                  <div className="tracking-box">
                    <span>Order ID: <code>CF-{Math.floor(100000 + Math.random() * 900000)}</code></span>
                    <span>Estimated Delivery: <strong>3-4 Business Days</strong></span>
                  </div>
                  <button className="btn-secondary" onClick={() => setOrderConfirmed(false)}>
                    Place Another Order
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="order-checkout-form">
                  <h3 className="form-head-title">Shipping & Contact Details</h3>

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Rahul Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Mobile Number (For Delivery Updates)</label>
                    <input
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      Vehicle Number <span className="req-star">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. MH 01 AB 1234"
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Shipping Address</label>
                    <textarea
                      rows={2}
                      placeholder="Flat/House No., Street, City, State, Pincode"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  {/* Quantity & Total Price Section */}
                  <div className="checkout-pricing-card">
                    <div className="pricing-main-row">
                      <div className="qty-control-wrapper">
                        <span className="qty-label">Qty:</span>
                        <div className="qty-picker">
                          <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
                          <span className="qty-val">{quantity}</span>
                          <button type="button" onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </div>

                      <div className="price-stack">
                        <span className="strike-price">₹{799 * quantity}</span>
                        <span className="total-price">₹{totalPrice}</span>
                      </div>
                    </div>

                    <div className="shipping-benefit-tag">
                      <span className="green-dot"></span>
                      <span>FREE PAN-INDIA DELIVERY • INCL. GST</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary full-w order-submit-btn">
                    <Lock size={16} /> Pay ₹{totalPrice} & Place Order
                  </button>

                  <div className="trust-footer-row">
                    <div className="t-item">
                      <Truck size={14} color="#FF2B85" />
                      <span>3–5 Days Free Delivery</span>
                    </div>
                    <span className="t-sep">•</span>
                    <div className="t-item">
                      <ShieldCheck size={14} color="#FF2B85" />
                      <span>100% Number Privacy</span>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        section.order-section {
          background: #F8FAFC;
          padding-top: 14px;
          padding-bottom: 24px;
        }

        .order-box {
          padding: 38px;
          border-radius: var(--radius-xl);
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow: 0 8px 25px rgba(15, 23, 42, 0.04);
        }

        .order-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 40px;
          align-items: center;
        }

        .order-title {
          font-size: 2.3rem;
          font-weight: 900;
          margin: 14px 0 14px 0;
          line-height: 1.2;
          color: #0F172A;
        }

        .order-subtitle {
          font-size: 0.98rem;
          color: #64748B;
          margin-bottom: 20px;
          line-height: 1.55;
        }

        .order-features-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 24px;
        }

        .order-feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          transition: all 0.2s ease;
        }

        .order-feature-item:hover {
          background: #FFF1F7;
          border-color: rgba(255, 43, 133, 0.3);
        }

        .feat-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #FFFFFF;
          border: 1px solid #FBCFE8;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(255, 43, 133, 0.08);
        }

        .feat-content h4 {
          font-size: 0.94rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0 0 3px 0;
        }

        .feat-content p {
          font-size: 0.82rem;
          color: #64748B;
          margin: 0;
          line-height: 1.45;
        }

        .req-star {
          color: var(--magenta);
          font-weight: 800;
        }

        /* Order Form */
        .order-checkout-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-lg);
          padding: 22px;
        }

        .form-head-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .order-checkout-form label {
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
          margin-bottom: 3px;
          display: block;
        }

        .order-checkout-form input, .order-checkout-form textarea {
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 9px 12px;
          color: #0F172A;
          font-size: 0.88rem;
          outline: none;
          width: 100%;
        }

        .order-checkout-form input:focus, .order-checkout-form textarea:focus {
          border-color: var(--magenta);
        }

        .checkout-pricing-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 12px 14px;
          margin: 6px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pricing-main-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .qty-control-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .qty-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #64748B;
        }

        .qty-picker {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F8FAFC;
          border: 1px solid #CBD5E1;
          border-radius: 8px;
          padding: 3px 8px;
        }

        .qty-picker button {
          background: none;
          border: none;
          color: var(--magenta);
          font-size: 1.15rem;
          font-weight: 800;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background 0.15s;
        }

        .qty-picker button:hover {
          background: #FCE7F3;
        }

        .qty-val {
          font-weight: 800;
          color: #0F172A;
          font-size: 0.95rem;
          min-width: 16px;
          text-align: center;
        }

        .price-stack {
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .strike-price {
          font-size: 0.86rem;
          color: #94A3B8;
          text-decoration: line-through;
        }

        .total-price {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          color: #0F172A;
        }

        .shipping-benefit-tag {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: #ECFDF5;
          border: 1px solid #D1FAE5;
          color: #059669;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.03em;
          padding: 5px 10px;
          border-radius: 6px;
          text-align: center;
        }

        .green-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
          flex-shrink: 0;
        }

        .order-submit-btn {
          margin-top: 4px;
          font-size: 1rem;
          padding: 14px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 800;
          box-shadow: 0 4px 16px rgba(255, 43, 133, 0.35);
        }

        .trust-footer-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.76rem;
          color: #64748B;
          margin-top: 8px;
          flex-wrap: wrap;
          text-align: center;
        }

        .t-item {
          display: flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
          font-weight: 600;
        }

        .t-sep {
          color: #CBD5E1;
        }

        .order-success-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          padding: 20px 14px;
        }

        .tracking-box {
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          border-radius: 10px;
          padding: 12px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 4px;
          font-size: 0.84rem;
          color: #0F172A;
        }

        @media (max-width: 900px) {
          section.order-section {
            background: #FFFFFF;
            padding-top: 24px;
            padding-bottom: 48px;
          }
          .order-box {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
          }
          .order-box:hover {
            transform: none !important;
            box-shadow: none !important;
            border-color: transparent !important;
          }
          .order-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .order-title {
            font-size: 1.85rem;
            margin-top: 10px;
          }
          .order-checkout-form {
            background: transparent !important;
            border: none !important;
            padding: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            gap: 16px;
          }
          .order-checkout-form input,
          .order-checkout-form textarea {
            background: #F8FAFC;
            border: 1px solid #CBD5E1;
            border-radius: 10px;
            padding: 11px 14px;
            font-size: 0.92rem;
          }
          .order-checkout-form input:focus,
          .order-checkout-form textarea:focus {
            background: #FFFFFF;
            border-color: var(--magenta);
            box-shadow: 0 0 0 3px rgba(255, 43, 133, 0.12);
          }
          .checkout-pricing-card {
            background: #F8FAFC;
            border: 1px solid #E2E8F0;
            border-radius: 14px;
            padding: 14px;
            margin: 6px 0;
          }
          .qty-picker {
            background: #FFFFFF;
          }
          .trust-footer-row {
            gap: 8px;
            font-size: 0.74rem;
            margin-top: 10px;
          }
        }

        @media (max-width: 420px) {
          .trust-footer-row {
            flex-direction: column;
            gap: 4px;
          }
          .t-sep {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
