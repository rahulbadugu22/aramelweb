import React, { useState } from 'react';
import { Printer, ArrowLeft, Search, CheckCircle2, Truck, Sparkles } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function BillPage({ activeOrder, onNavigate }) {
  const defaultOrder = {
    orderId: 'CF-842918',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    vehicleNo: 'MH 01 AB 1234',
    address: 'Flat 402, Lotus Heights, Indiranagar, Bengaluru, Karnataka - 560038',
    quantity: 1,
    totalPrice: 450,
    date: '08 Sep 2026',
    paymentId: 'pay_Pz92841920',
    hsn: '49119900'
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [currentOrder, setCurrentOrder] = useState(activeOrder || defaultOrder);
  const [copied, setCopied] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const q = searchQuery.trim().toUpperCase();
    setCurrentOrder(prev => ({
      ...prev,
      orderId: q.startsWith('CF-') ? q : `CF-${q}`,
      name: prev.name || 'Verified Customer'
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const qty = currentOrder.quantity || 1;
  const taxableTotal = (381.36 * qty).toFixed(2);
  const cgst = (34.32 * qty).toFixed(2);
  const sgst = (34.32 * qty).toFixed(2);
  const grandTotal = 450 * qty;

  return (
    <div className="bill-page-container">
      {/* Top Navigation & Controls Bar (Hidden during Print) */}
      <div className="bill-nav-bar no-print">
        <div className="container bill-nav-inner">
          <button className="btn-back" onClick={() => onNavigate('home')}>
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>

          <div className="bill-search-box">
            <form onSubmit={handleSearch} className="bill-search-form">
              <Search size={15} color="#94A3B8" />
              <input
                type="text"
                placeholder="Find invoice by Order ID (e.g. CF-842918)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn-lookup">Find</button>
            </form>
          </div>

          <div className="bill-actions-group">
            <button className="btn-secondary btn-action-sm" onClick={handleShare}>
              {copied ? 'Link Copied!' : 'Share'}
            </button>
            <button className="btn-primary btn-action-sm" onClick={handlePrint}>
              <Printer size={16} />
              <span>Print / Download PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Printable Tax Invoice Sheet */}
      <div className="container invoice-sheet-wrapper">
        <div className="invoice-paper glass-card">
          {/* Top Header */}
          <div className="invoice-top-header">
            <div className="invoice-seller-info">
              <div className="invoice-brand-row">
                <img src="/carfrndlogo.png" alt="CarFrnd Logo" className="invoice-logo" />
              </div>
              <h3 className="seller-name">Aramel Tech Private Limited</h3>
              <p className="seller-meta">
                CIN: U72900KA2026PTC184201<br />
                GSTIN: <strong>29AABCA1234F1Z5</strong> (Karnataka - 29)<br />
                Registered Office: Sector 4, HSR Layout, Bengaluru, Karnataka - 560102<br />
                Email: support@carfrnd.com • Web: www.carfrnd.com
              </p>
            </div>

            <div className="invoice-meta-badge">
              <div className="invoice-title-pill">TAX INVOICE</div>
              <div className="inv-meta-grid">
                <div className="inv-meta-row">
                  <span className="lbl">Invoice No:</span>
                  <span className="val">INV-2026-{(currentOrder.orderId || 'CF-842918').replace('CF-', '')}</span>
                </div>
                <div className="inv-meta-row">
                  <span className="lbl">Invoice Date:</span>
                  <span className="val">{currentOrder.date || '08 Sep 2026'}</span>
                </div>
                <div className="inv-meta-row">
                  <span className="lbl">Order ID:</span>
                  <span className="val highlight">{currentOrder.orderId || 'CF-842918'}</span>
                </div>
                <div className="inv-meta-row">
                  <span className="lbl">Payment Status:</span>
                  <span className="val status-paid">PAID (UPI Online)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="invoice-divider"></div>

          {/* Billing & Shipping Section */}
          <div className="bill-to-section">
            <div className="bill-col">
              <span className="sec-label">BILLED & SHIPPED TO:</span>
              <h4 className="customer-name">{currentOrder.name || 'Rahul Sharma'}</h4>
              <p className="customer-details">
                {currentOrder.address || 'Indiranagar, Bengaluru, Karnataka - 560038'}<br />
                Mobile: <strong>{currentOrder.phone || '+91 98765 43210'}</strong><br />
                Place of Supply: Karnataka (29)
              </p>
            </div>

            <div className="bill-col vehicle-col">
              <span className="sec-label">REGISTERED VEHICLE DETAILS:</span>
              <div className="vehicle-badge-large">
                <span className="v-lbl">VEHICLE NO:</span>
                <span className="v-val">{(currentOrder.vehicleNo || 'MH 01 AB 1234').toUpperCase()}</span>
              </div>
              <p className="vehicle-note">
                Encrypted NFC & Weatherproof QR Decal programmed for this vehicle number.
              </p>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="invoice-table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Description of Goods / Services</th>
                  <th className="text-center">HSN/SAC</th>
                  <th className="text-center">Qty</th>
                  <th className="text-right">Unit Rate (Excl. GST)</th>
                  <th className="text-right">CGST (9%)</th>
                  <th className="text-right">SGST (9%)</th>
                  <th className="text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>
                    <strong>CarFrnd Smart Contact Tag</strong>
                    <div className="item-sub">Weatherproof Automotive Decal • Sun & Wash Resistant • Masked Call Protection</div>
                  </td>
                  <td className="text-center">49119900</td>
                  <td className="text-center">{qty}</td>
                  <td className="text-right">₹381.36</td>
                  <td className="text-right">₹{cgst}</td>
                  <td className="text-right">₹{sgst}</td>
                  <td className="text-right font-bold">₹{grandTotal}.00</td>
                </tr>
                <tr className="shipping-row">
                  <td>2</td>
                  <td>
                    <strong>Doorstep Delivery & Insured Courier</strong>
                    <div className="item-sub">Doorstep Delivery within 3–5 business days</div>
                  </td>
                  <td className="text-center">996812</td>
                  <td className="text-center">1</td>
                  <td className="text-right">₹0.00</td>
                  <td className="text-right">₹0.00</td>
                  <td className="text-right">₹0.00</td>
                  <td className="text-right font-bold text-green">FREE</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals & Breakdown */}
          <div className="invoice-totals-grid">
            <div className="totals-left-col">
              <div className="amount-in-words">
                <span className="words-lbl">Amount in Words:</span>
                <span className="words-val">
                  {qty === 1 ? 'Indian Rupees Four Hundred Fifty Only' : `Indian Rupees ${grandTotal} Only`}
                </span>
              </div>

              <div className="invoice-tax-summary-card">
                <span className="tax-head">GST Tax Summary</span>
                <div className="tax-row">
                  <span>Taxable Base Value:</span>
                  <span>₹{taxableTotal}</span>
                </div>
                <div className="tax-row">
                  <span>Central GST (CGST @ 9%):</span>
                  <span>₹{cgst}</span>
                </div>
                <div className="tax-row">
                  <span>State GST (SGST @ 9%):</span>
                  <span>₹{sgst}</span>
                </div>
                <div className="tax-row total-tax-row">
                  <span>Total Tax Included:</span>
                  <span>₹{(parseFloat(cgst) + parseFloat(sgst)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="totals-right-col">
              <div className="calc-row">
                <span>Subtotal (Net):</span>
                <span>₹{taxableTotal}</span>
              </div>
              <div className="calc-row">
                <span>Total Tax (18% GST):</span>
                <span>₹{(parseFloat(cgst) + parseFloat(sgst)).toFixed(2)}</span>
              </div>
              <div className="calc-row">
                <span>Shipping & Doorstep Delivery:</span>
                <span className="text-green">₹0.00 (FREE)</span>
              </div>
              <div className="calc-row grand-total-row">
                <span>Grand Total (Incl. GST):</span>
                <span className="grand-val">₹{grandTotal}.00</span>
              </div>

              {/* Payment Proof stamp */}
              <div className="payment-stamp-box">
                <CheckCircle2 size={24} color="#059669" />
                <div className="stamp-details">
                  <span className="stamp-title">Payment Confirmed</span>
                  <span className="stamp-sub">Trans ID: {currentOrder.paymentId || 'pay_Pz92841920'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer & Signature */}
          <div className="invoice-footer-grid">
            <div className="terms-col">
              <span className="terms-title">Terms & Conditions:</span>
              <ol className="terms-list">
                <li>This is a computer-generated tax invoice issued by Aramel Tech Private Limited.</li>
                <li>Your CarFrnd Tag includes lifetime QR scanning and masked voice forwarding without monthly subscriptions.</li>
                <li>Delivery is scheduled within 3–5 business days via tracked express courier.</li>
                <li>For support or queries, reach us at support@carfrnd.com.</li>
              </ol>
            </div>

            <div className="signature-col">
              <div className="qr-verification-block">
                <QRCodeSVG
                  value={`https://carfrnd.com/bill?order=${currentOrder.orderId || 'CF-842918'}`}
                  size={64}
                  level="M"
                />
                <span className="qr-caption">Verify Invoice</span>
              </div>
              <div className="signature-box">
                <div className="signature-img-placeholder">Aramel Tech Pvt Ltd</div>
                <span className="signatory-label">Authorised Signatory</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Follow-up Buttons (Hidden in print) */}
        <div className="invoice-quick-cta-row no-print">
          <button className="btn-secondary" onClick={() => onNavigate('track-order', currentOrder.orderId)}>
            <Truck size={16} /> Track This Order
          </button>
          <button className="btn-primary" onClick={() => onNavigate('activate-tag')}>
            <Sparkles size={16} /> Activate CarFrnd Tag
          </button>
        </div>
      </div>

      <style>{`
        .bill-page-container {
          min-height: 100vh;
          background: #F8FAFC;
          padding-top: 86px;
          padding-bottom: 60px;
        }

        .bill-nav-bar {
          position: sticky;
          top: 68px;
          z-index: 40;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #E2E8F0;
          padding: 12px 0;
          margin-bottom: 24px;
        }

        .bill-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-back {
          background: none;
          border: 1px solid #CBD5E1;
          padding: 8px 14px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.88rem;
          color: #334155;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-back:hover {
          background: #F1F5F9;
          color: #0F172A;
        }

        .bill-search-form {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          border-radius: 10px;
          padding: 6px 12px;
          width: 320px;
        }

        .bill-search-form input {
          border: none;
          background: transparent;
          font-size: 0.84rem;
          width: 100%;
          outline: none;
          color: #0F172A;
        }

        .btn-lookup {
          background: var(--magenta);
          color: #FFFFFF;
          border: none;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          cursor: pointer;
        }

        .bill-actions-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .btn-action-sm {
          padding: 8px 16px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Printable Invoice Paper */
        .invoice-sheet-wrapper {
          max-width: 900px;
          margin: 0 auto;
        }

        .invoice-paper {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 18px;
          padding: 44px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.05);
        }

        .invoice-top-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 30px;
        }

        .invoice-logo {
          height: 48px;
          width: auto;
          object-fit: contain;
          margin-bottom: 12px;
          transform: scale(1.6);
          transform-origin: left center;
        }

        .seller-name {
          font-size: 1.15rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .seller-meta {
          font-size: 0.78rem;
          color: #64748B;
          line-height: 1.5;
        }

        .invoice-meta-badge {
          text-align: right;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 260px;
        }

        .invoice-title-pill {
          display: inline-block;
          background: var(--magenta);
          color: #FFFFFF;
          font-size: 0.75rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          padding: 4px 12px;
          border-radius: 6px;
          margin-bottom: 10px;
        }

        .inv-meta-grid {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .inv-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.8rem;
          gap: 12px;
        }

        .inv-meta-row .lbl {
          color: #64748B;
          font-weight: 600;
        }

        .inv-meta-row .val {
          font-weight: 700;
          color: #0F172A;
        }

        .inv-meta-row .val.highlight {
          color: var(--magenta);
          font-family: monospace;
          font-size: 0.85rem;
        }

        .inv-meta-row .val.status-paid {
          color: #059669;
          background: #ECFDF5;
          padding: 1px 6px;
          border-radius: 4px;
          font-size: 0.74rem;
        }

        .invoice-divider {
          height: 1px;
          background: #E2E8F0;
          margin: 24px 0;
        }

        .bill-to-section {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 30px;
          margin-bottom: 24px;
        }

        .sec-label {
          font-size: 0.72rem;
          font-weight: 800;
          color: var(--magenta);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 6px;
        }

        .customer-name {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .customer-details {
          font-size: 0.82rem;
          color: #475569;
          line-height: 1.5;
        }

        .vehicle-badge-large {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0F172A;
          color: #FFFFFF;
          padding: 8px 14px;
          border-radius: 8px;
          border-left: 4px solid var(--magenta);
          margin-bottom: 6px;
        }

        .v-lbl {
          font-size: 0.68rem;
          color: #94A3B8;
          font-weight: 700;
        }

        .v-val {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 900;
          letter-spacing: 0.06em;
        }

        .vehicle-note {
          font-size: 0.76rem;
          color: #64748B;
          line-height: 1.4;
        }

        /* Invoice Table */
        .invoice-table-wrapper {
          overflow-x: auto;
          margin-bottom: 24px;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
        }

        .invoice-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.84rem;
        }

        .invoice-table th {
          background: #F8FAFC;
          color: #334155;
          font-weight: 800;
          padding: 12px 14px;
          border-bottom: 1px solid #E2E8F0;
          text-align: left;
        }

        .invoice-table td {
          padding: 14px;
          border-bottom: 1px solid #F1F5F9;
          color: #1E293B;
        }

        .item-sub {
          font-size: 0.74rem;
          color: #64748B;
          margin-top: 3px;
        }

        .text-center {
          text-align: center;
        }

        .text-right {
          text-align: right;
        }

        .font-bold {
          font-weight: 800;
        }

        .text-green {
          color: #059669;
        }

        /* Totals Grid */
        .invoice-totals-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 30px;
          padding-bottom: 24px;
          border-bottom: 1px solid #E2E8F0;
        }

        .amount-in-words {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 10px;
          padding: 12px 16px;
          margin-bottom: 16px;
        }

        .words-lbl {
          font-size: 0.7rem;
          font-weight: 700;
          color: #64748B;
          display: block;
        }

        .words-val {
          font-size: 0.84rem;
          font-weight: 800;
          color: #0F172A;
        }

        .invoice-tax-summary-card {
          background: #FFF0F6;
          border: 1px solid var(--magenta-border);
          border-radius: 10px;
          padding: 12px 16px;
        }

        .tax-head {
          font-size: 0.74rem;
          font-weight: 800;
          color: var(--magenta);
          display: block;
          margin-bottom: 6px;
        }

        .tax-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.78rem;
          color: #475569;
          padding: 3px 0;
        }

        .total-tax-row {
          border-top: 1px dashed var(--magenta-border);
          margin-top: 4px;
          padding-top: 4px;
          font-weight: 800;
          color: #0F172A;
        }

        .totals-right-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .calc-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.84rem;
          color: #475569;
        }

        .grand-total-row {
          border-top: 2px solid #0F172A;
          margin-top: 6px;
          padding-top: 8px;
          font-size: 1.05rem;
          font-weight: 900;
          color: #0F172A;
        }

        .grand-val {
          color: var(--magenta);
          font-family: var(--font-heading);
          font-size: 1.3rem;
        }

        .payment-stamp-box {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 10px;
          padding: 10px 14px;
          margin-top: 12px;
        }

        .stamp-title {
          font-size: 0.8rem;
          font-weight: 800;
          color: #065F46;
          display: block;
        }

        .stamp-sub {
          font-size: 0.7rem;
          color: #047857;
          font-family: monospace;
        }

        /* Footer Grid */
        .invoice-footer-grid {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 30px;
          margin-top: 24px;
        }

        .terms-title {
          font-size: 0.72rem;
          font-weight: 800;
          color: #64748B;
          display: block;
          margin-bottom: 4px;
        }

        .terms-list {
          font-size: 0.7rem;
          color: #64748B;
          padding-left: 14px;
          line-height: 1.5;
          max-width: 480px;
        }

        .signature-col {
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: center;
        }

        .qr-verification-block {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .qr-caption {
          font-size: 0.62rem;
          color: #64748B;
          font-weight: 700;
        }

        .signature-box {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .signature-img-placeholder {
          font-family: 'Brush Script MT', cursive, sans-serif;
          font-size: 1.4rem;
          color: #0F172A;
          border-bottom: 1px solid #0F172A;
          padding: 0 16px 4px 16px;
          margin-bottom: 4px;
        }

        .signatory-label {
          font-size: 0.68rem;
          font-weight: 800;
          color: #64748B;
        }

        .invoice-quick-cta-row {
          display: flex;
          justify-content: center;
          gap: 14px;
          margin-top: 24px;
        }

        /* Print Media Styles */
        @media print {
          .no-print, .navbar-header, .footer-section, .mobile-bottom-nav {
            display: none !important;
          }
          .bill-page-container {
            padding: 0 !important;
            background: #FFFFFF !important;
          }
          .invoice-paper {
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          body {
            background: #FFFFFF !important;
          }
        }

        @media (max-width: 768px) {
          .invoice-paper {
            padding: 24px 18px;
          }
          .invoice-top-header {
            flex-direction: column;
          }
          .invoice-meta-badge {
            width: 100%;
            text-align: left;
          }
          .bill-to-section {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .invoice-totals-grid {
            grid-template-columns: 1fr;
          }
          .invoice-footer-grid {
            flex-direction: column;
            align-items: flex-start;
          }
          .bill-search-form {
            width: 100%;
          }
          .bill-actions-group {
            width: 100%;
            justify-content: space-between;
          }
        }
      `}</style>
    </div>
  );
}
