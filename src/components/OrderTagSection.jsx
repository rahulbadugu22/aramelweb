import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, Lock, Car } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';

export default function OrderTagSection({ onOpenScanner }) {
  const [styleTheme, setStyleTheme] = useState('Magenta Stealth');
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
    if (!name.trim() || !phone.trim() || !address.trim()) {
      alert('Please fill out all address and contact details!');
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
            {/* Left Side Decal Preview & Customizer */}
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

              {/* Decal Style Selection */}
              <div className="style-selector-box">
                <span className="picker-lbl">SELECT TAG DESIGN:</span>
                <div className="style-options">
                  {['Magenta Stealth', 'Cyber Carbon', 'Minimalist White'].map((st) => (
                    <button
                      key={st}
                      className={`style-chip ${styleTheme === st ? 'active' : ''}`}
                      onClick={() => setStyleTheme(st)}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual Preview Graphic based on style */}
              <div className={`decal-visual-preview ${styleTheme.toLowerCase().replace(' ', '-')}`}>
                <div className="preview-header">
                  <span className="p-brand">FindOwner QR Tag</span>
                </div>
                <div className="preview-qr-row">
                  <div className="preview-qr-box">
                    <QRCodeSVG
                      value={`https://carfrnd.com/scan?tag=KA560100MM1234&v=${encodeURIComponent(vehicleNo.trim() || 'MH01AB1234')}`}
                      size={76}
                      level="M"
                      fgColor="#0F172A"
                      bgColor="#FFFFFF"
                    />
                  </div>
                  <div className="preview-meta">
                    <span className="p-vnum">{vehicleNo ? vehicleNo.toUpperCase() : 'YOUR CAR NO.'}</span>
                    <span className="p-tagid">SCAN TO CONTACT OWNER</span>
                    <span className="p-sec">Phone Number Stays Private</span>
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
                    Thank you <strong>{name}</strong>! Your <strong>{quantity}x FindOwner QR Tag ({styleTheme})</strong> order has been placed successfully.
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
                    <label>Vehicle Number (Optional — For Pre-Printing)</label>
                    <input
                      type="text"
                      placeholder="e.g. MH 01 AB 1234"
                      value={vehicleNo}
                      onChange={(e) => setVehicleNo(e.target.value)}
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

                  {/* Quantity & Total Price Bar */}
                  <div className="qty-price-row">
                    <div className="qty-picker">
                      <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                      <span>{quantity}</span>
                      <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
                    </div>

                    <div className="price-summary-right">
                      <span className="strike-price">₹{799 * quantity}</span>
                      <span className="total-price">₹{totalPrice}</span>
                      <span className="ship-free">FREE SHIPPING • INCL. GST</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary full-w">
                    <Lock size={15} /> Pay ₹{totalPrice} & Place Order
                  </button>

                  <div className="trust-footer-row">
                    <div className="t-item"><Truck size={13} /> 3–5 Business Days Delivery</div>
                    <div className="t-item"><ShieldCheck size={13} /> Phone Number Stays Private</div>
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

        .style-selector-box {
          margin-bottom: 20px;
        }

        .picker-lbl {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--magenta);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 8px;
        }

        .style-options {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .style-chip {
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          color: #475569;
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.82rem;
          padding: 7px 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .style-chip:hover, .style-chip.active {
          background: var(--magenta);
          border-color: var(--magenta);
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(255, 43, 133, 0.25);
        }

        .decal-visual-preview {
          border-radius: 16px;
          padding: 20px;
          position: relative;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.12);
          transition: all 0.3s ease;
        }

        .decal-visual-preview.magenta-stealth {
          background: linear-gradient(135deg, #1E293B 0%, #0F172A 100%);
          border: 2px solid var(--magenta);
        }

        .decal-visual-preview.cyber-carbon {
          background: radial-gradient(circle, #334155 0%, #0F172A 100%);
          border: 2px solid #94A3B8;
        }

        .decal-visual-preview.minimalist-white {
          background: linear-gradient(135deg, #FFFFFF 0%, #F1F5F9 100%);
          border: 2px solid #CBD5E1;
        }

        .decal-visual-preview.minimalist-white * {
          color: #0F172A !important;
        }

        .preview-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 14px;
        }

        .p-brand {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 0.86rem;
          color: #FFFFFF;
        }

        .p-badge {
          font-size: 0.62rem;
          font-weight: 800;
          color: #FFFFFF;
          background: var(--magenta);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .preview-qr-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .preview-qr-box {
          background: #FFFFFF;
          padding: 8px;
          border-radius: 10px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-qr-img {
          color: #000000;
        }

        .preview-center-icon {
          position: absolute;
          width: 22px;
          height: 22px;
          background: #FFFFFF;
          border-radius: 50%;
          border: 1.5px solid var(--magenta);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .preview-meta {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .p-vnum {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        .p-tagid {
          font-size: 0.72rem;
          font-weight: 800;
          color: #FF73B3;
        }

        .p-sec {
          font-size: 0.68rem;
          color: #34D399;
          font-weight: 600;
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

        .qty-price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0;
          border-top: 1px dashed #CBD5E1;
          border-bottom: 1px dashed #CBD5E1;
          margin: 4px 0;
        }

        .qty-picker {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 6px;
          padding: 3px 8px;
        }

        .qty-picker button {
          background: none;
          border: none;
          color: var(--magenta);
          font-size: 1.1rem;
          font-weight: 800;
          cursor: pointer;
        }

        .qty-picker span {
          font-weight: 800;
          color: #0F172A;
          font-size: 0.95rem;
        }

        .price-summary-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .strike-price {
          font-size: 0.85rem;
          color: #94A3B8;
          text-decoration: line-through;
        }

        .total-price {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 900;
          color: #0F172A;
        }

        .ship-free {
          font-size: 0.62rem;
          font-weight: 800;
          color: #059669;
          background: #ECFDF5;
          padding: 2px 5px;
          border-radius: 4px;
        }

        .trust-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.75rem;
          color: #64748B;
          margin-top: 2px;
        }

        .t-item {
          display: flex;
          align-items: center;
          gap: 4px;
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
            padding-bottom: 12px;
          }
          .order-grid {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .order-box {
            padding: 20px 14px;
          }
          .order-title {
            font-size: 1.8rem;
          }
          .order-checkout-form {
            padding: 16px 12px;
          }
        }
      `}</style>
    </section>
  );
}
