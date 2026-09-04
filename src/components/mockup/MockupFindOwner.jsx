import React from 'react';
import { 
  ChevronRight, 
  Phone, 
  Lock, 
  QrCode, 
  PhoneCall, 
  User,
  Check
} from 'lucide-react';
import RealisticQRCode from './RealisticQRCode';

export default function MockupFindOwner({ onOpenScanner }) {
  return (
    <section className="mockup-find-owner" id="find-owner">
      <div className="mockup-container">
        <div className="find-owner-grid">
          {/* Left Column: Headline & CTA */}
          <div className="find-owner-content">
            <span className="find-owner-tag">FIND OWNER</span>
            
            <h2 className="find-owner-title">
              Connect Without<br />
              Compromising <span className="pink-accent">Privacy.</span>
            </h2>

            <p className="find-owner-desc">
              A smarter way to reach a vehicle owner when it matters. Scan. Select reason. Connect securely.
            </p>

            <button 
              onClick={onOpenScanner}
              className="find-owner-btn"
            >
              <QrCode size={18} />
              Discover Find Owner
            </button>
          </div>

          {/* Right Column: 4 Connected Visual Steps */}
          <div className="find-owner-steps-wrap">
            <div className="find-owner-steps-row">
              {/* Step 1: Scan QR Tag */}
              <div className="flow-step-item">
                <div className="flow-step-visual">
                  <div className="step-scan-ui">
                    <div className="step-scan-qr">
                      <RealisticQRCode size={48} />
                    </div>
                    <span style={{ fontSize: '0.52rem', color: '#FF2B85', fontWeight: 800 }}>Car Frnd QR</span>
                  </div>
                </div>
                <span className="flow-step-label">Scan QR Tag</span>
              </div>

              {/* Arrow */}
              <ChevronRight className="flow-step-arrow" size={20} />

              {/* Step 2: Select Reason */}
              <div className="flow-step-item">
                <div className="flow-step-visual">
                  <div className="step-reasons-list">
                    <div className="step-reason-chip active">
                      <Check size={8} style={{ display: 'inline', marginRight: '2px' }} />
                      Car Blocking Way
                    </div>
                    <div className="step-reason-chip">Lights are ON</div>
                    <div className="step-reason-chip">Window Open</div>
                    <div className="step-reason-chip">Towing Alert</div>
                    <div className="step-reason-chip">Emergency</div>
                    <div className="step-reason-chip">Other</div>
                  </div>
                </div>
                <span className="flow-step-label">Select Reason</span>
              </div>

              {/* Arrow */}
              <ChevronRight className="flow-step-arrow" size={20} />

              {/* Step 3: Secure Call Initiated */}
              <div className="flow-step-item">
                <div className="flow-step-visual">
                  <div className="step-calling-ui">
                    <div className="step-calling-avatar">
                      <User size={16} />
                    </div>
                    <div className="step-calling-text">Calling Owner</div>
                    <div className="step-calling-sub">Connecting securely...</div>
                    <div className="step-calling-actions">
                      <div className="step-call-btn green">
                        <Phone size={10} />
                      </div>
                      <div className="step-call-btn red">
                        ✕
                      </div>
                    </div>
                  </div>
                </div>
                <span className="flow-step-label">Secure Call Initiated</span>
              </div>

              {/* Arrow */}
              <ChevronRight className="flow-step-arrow" size={20} />

              {/* Step 4: Connect With Owner */}
              <div className="flow-step-item">
                <div className="flow-step-visual circle-avatar">
                  <img src="/mockup/flow_owner_talk.jpg" alt="Connected Owner" />
                  <div className="step-phone-call-badge">
                    <PhoneCall size={14} />
                  </div>
                </div>
                <span className="flow-step-label">Connect With Owner</span>
              </div>
            </div>

            {/* Bottom Shield Pill */}
            <div className="privacy-protected-pill">
              <Lock size={15} />
              Private Number Protected
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
