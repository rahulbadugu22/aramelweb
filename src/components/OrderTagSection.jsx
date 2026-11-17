import { API_BASE_URL, PAYMENT_API, RAZORPAY_KEY_ID } from '../config/api';
import React, { useState } from 'react';
import { Sparkles, ShieldCheck, Truck, Lock, Receipt, CreditCard, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { usePricing } from '../context/PricingContext';
import confetti from 'canvas-confetti';

export default function OrderTagSection({ onOpenBill, onOpenTrackOrder }) {
  const [quantity, setQuantity] = useState(1);
  const [vehicleNo, setVehicleNo] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [latestOrder, setLatestOrder] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { customerPrice, mrp, gstRate, gstEnabled } = usePricing();
  const unitPrice = customerPrice || 450;
  const totalPrice = unitPrice * quantity;

  // Helper to ensure Razorpay SDK script is loaded
  const loadRazorpaySDK = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !phone.trim() || !vehicleNo.trim() || !address.trim()) {
      setErrorMessage('Please fill out all mandatory details including Vehicle Number!');
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for dispatch updates.');
      return;
    }

    setIsProcessing(true);

    try {
      const sdkLoaded = await loadRazorpaySDK();
      if (!sdkLoaded || !window.Razorpay) {
        throw new Error('Razorpay SDK failed to load. Please check your internet connection.');
      }

      // 1. Create Razorpay Order on Backend
      const createOrderRes = await fetch(PAYMENT_API.createOrder, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPrice,
          phone: cleanPhone.slice(-10),
          vehicleNo: vehicleNo.toUpperCase().trim(),
          quantity,
          name: name.trim(),
          address: address.trim()
        })
      });

      const orderData = await createOrderRes.json();
      if (!createOrderRes.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway.');
      }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: orderData.keyId || RAZORPAY_KEY_ID,
        amount: orderData.amount, // in paise
        currency: orderData.currency || 'INR',
        name: 'CarFrnd',
        description: `${quantity}x CarFrnd Smart QR Decal for ${vehicleNo.toUpperCase().trim()}`,
        order_id: orderData.orderId,
        prefill: {
          name: name.trim(),
          contact: cleanPhone.slice(-10)
        },
        notes: {
          vehicleNo: vehicleNo.toUpperCase().trim(),
          quantity: quantity.toString(),
          address: address.trim()
        },
        theme: {
          color: '#FF2B85'
        },
        handler: async function (response) {
          try {
            // 3. Cryptographically verify signature and save order in DB
            const verifyRes = await fetch(PAYMENT_API.verify, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                name: name.trim(),
                phone: cleanPhone.slice(-10),
                vehicleNo: vehicleNo.toUpperCase().trim(),
                quantity,
                totalPrice,
                address: address.trim()
              })
            });

            const verifyResult = await verifyRes.json();
            if (verifyRes.ok && verifyResult.success && verifyResult.order) {
              setLatestOrder(verifyResult.order);
              try {
                localStorage.setItem('carfrnd_last_order', JSON.stringify(verifyResult.order));
              } catch {}
              setOrderConfirmed(true);
              confetti({
                particleCount: 130,
                spread: 85,
                origin: { y: 0.5 }
              });
            } else {
              setErrorMessage(verifyResult.error || 'Payment signature verification failed.');
            }
          } catch (vErr) {
            console.error('Signature verification call failed:', vErr);
            setErrorMessage('Payment was charged, but confirmation timed out. Our team will verify and dispatch your order.');
          } finally {
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzpInstance = new window.Razorpay(options);
      rzpInstance.on('payment.failed', function (failResp) {
        setIsProcessing(false);
        setErrorMessage(`Payment Failed: ${failResp.error?.description || 'Transaction was declined.'}`);
      });
      rzpInstance.open();
    } catch (err) {
      console.error('Order creation error:', err);
      setErrorMessage(err.message || 'Unable to open payment modal. Please try again.');
      setIsProcessing(false);
    }
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
                <span>SPECIAL LAUNCH OFFER — ₹{unitPrice} ({gstEnabled ? `INCL. ${gstRate}% GST` : 'INCL. TAXES'})</span>
              </div>

              <h2 className="order-title">
                Get Your Weatherproof <br />
                <span className="magenta-gradient-text">CarFrnd Tag</span>
              </h2>

              <p className="order-subtitle">
                <strong>Your car's smart contact tag.</strong> Protect your personal phone number and receive alerts about your car. Delivered to your doorstep in 3–5 business days.
              </p>

              {/* Tag Value Highlights */}
              <div className="order-features-list">
                <div className="order-feature-item">
                  <div className="feat-icon-box">
                    <ShieldCheck size={20} color="#FF2B85" />
                  </div>
                  <div className="feat-content">
                    <h4>Your Phone Number Stays Private</h4>
                    <p>Callers reach you via masked phone forwarding. Your personal mobile number is never exposed.</p>
                  </div>
                </div>

                <div className="order-feature-item">
                  <div className="feat-icon-box">
                    <Sparkles size={20} color="#FF2B85" />
                  </div>
                  <div className="feat-content">
                    <h4>Weatherproof Automotive Decal</h4>
                    <p>Durable Automotive Decal. Premium vinyl designed for use on automotive windshield.</p>
                  </div>
                </div>

                <div className="order-feature-item">
                  <div className="feat-icon-box">
                    <Truck size={20} color="#FF2B85" />
                  </div>
                  <div className="feat-content">
                    <h4>Doorstep Delivery</h4>
                    <p>Delivered to your doorstep within 3–5 business days.</p>
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
                    Thank you <strong>{latestOrder?.name || name}</strong>! Your order for <strong>{latestOrder?.quantity || quantity}x CarFrnd Tag</strong> for vehicle <strong>{(latestOrder?.vehicleNo || vehicleNo).toUpperCase()}</strong> has been placed successfully.
                  </p>
                  
                  {/* Razorpay Verified Badge */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    margin: '12px 0',
                    background: '#ECFDF5',
                    border: '1px solid #A7F3D0',
                    color: '#065F46',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 600
                  }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Payment Verified via Razorpay: <code>{latestOrder?.paymentId || 'PAID'}</code></span>
                  </div>

                  <div className="tracking-box">
                    <span>Order ID: <code>{latestOrder?.orderId || 'CF-NEW'}</code></span>
                    <span>Tracking No: <code>{latestOrder?.trackingNumber || 'TRK-PENDING'}</code></span>
                    <span>Estimated Delivery: <strong>3–5 Business Days</strong></span>
                  </div>

                  <button
                    className="btn-primary"
                    style={{ width: '100%', marginTop: '8px', padding: '10px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                    onClick={() => onOpenTrackOrder && onOpenTrackOrder(latestOrder?.orderId)}
                  >
                    <Truck size={15} /> Track Order Status
                  </button>

                  <button className="btn-secondary" style={{ width: '100%', marginTop: '4px', fontSize: '0.82rem' }} onClick={() => setOrderConfirmed(false)}>
                    Place Another Order
                  </button>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="order-checkout-form">
                  <h3 className="form-head-title">Shipping & Contact Details</h3>

                  {errorMessage && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 12px',
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      color: '#991B1B',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      marginBottom: '12px'
                    }}>
                      <AlertCircle size={16} color="#DC2626" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={isProcessing}
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
                      disabled={isProcessing}
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
                      disabled={isProcessing}
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
                      disabled={isProcessing}
                      required
                    />
                  </div>

                  {/* Quantity & Total Price Section */}
                  <div className="checkout-pricing-card">
                    <div className="pricing-main-row">
                      <div className="qty-control-wrapper">
                        <span className="qty-label">Qty:</span>
                        <div className="qty-picker">
                          <button type="button" disabled={isProcessing} onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
                          <span className="qty-val">{quantity}</span>
                          <button type="button" disabled={isProcessing} onClick={() => setQuantity(quantity + 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </div>

                      <div className="price-stack">
                        <span className="strike-price">₹{(mrp || 799) * quantity}</span>
                        <span className="total-price">₹{totalPrice}</span>
                      </div>
                    </div>

                    <div className="shipping-benefit-tag">
                      <span className="green-dot"></span>
                      <span>INCL. GST</span>
                    </div>
                  </div>

                  <button type="submit" disabled={isProcessing} className="btn-primary full-w order-submit-btn" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    {isProcessing ? (
                      <>
                        <Loader2 size={16} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
                        <span>Opening Razorpay Secure Gateway...</span>
                      </>
                    ) : (
                      <>
                        <Lock size={16} /> Pay ₹{totalPrice} & Place Order
                      </>
                    )}
                  </button>

                  <div style={{
                    textAlign: 'center',
                    marginTop: '8px',
                    fontSize: '0.76rem',
                    color: '#64748B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}>
                    <ShieldCheck size={14} color="#059669" />
                    <span>Secured with 256-bit SSL via <strong>Razorpay</strong> (UPI, Cards, NetBanking)</span>
                  </div>

                  <div className="trust-footer-row">
                    <div className="t-item">
                      <Truck size={14} color="#FF2B85" />
                      <span>3–5 Business Days Delivery</span>
                    </div>
                    <span className="t-sep">•</span>
                    <div className="t-item">
                      <ShieldCheck size={14} color="#FF2B85" />
                      <span>Your Phone Number Stays Private</span>
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
