import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Mail } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the FindOwner QR System protect my personal mobile number?',
      a: 'When someone scans the QR code on your windshield, our secure cloud routing system establishes an anonymous masked phone call or push alert. Neither party can see each other’s real mobile phone number, keeping your privacy 100% safe.'
    },
    {
      q: 'Does a person scanning my QR tag need to download the CarFrnd app?',
      a: 'No! Anyone with a smartphone camera can simply point their camera at your FindOwner QR decal. It instantly opens a web-based reporting screen in their browser without requiring any app download or sign-up.'
    },
    {
      q: 'Are there any monthly subscription fees for FindOwner QR tags?',
      a: 'No. FindOwner is a one-time purchase of ₹99 for your weather-resistant windshield decal. There are zero recurring monthly or annual subscription fees.'
    },
    {
      q: 'How do doorstep car wash & detailing services work?',
      a: 'Our certified mobile detailing units bring eco-friendly water, high-pressure foam machines, and power points directly to your home or office parking space. You just choose your preferred time slot!'
    },
    {
      q: 'What happens if my FindOwner decal gets damaged or faded?',
      a: 'All CarFrnd FindOwner decals are manufactured with UV-resistant laminated material. In case of windshield replacement or damage, you can order a replacement tag for ₹49 directly from the app or website.'
    }
  ];

  return (
    <section className="section-padding faq-section">
      <div className="container">
        <div className="section-header text-center">
          <div className="glass-pill">
            <HelpCircle size={14} />
            <span>FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="section-title">
            Everything You Need To <br />
            <span className="magenta-gradient-text">Know About CarFrnd</span>
          </h2>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
                onClick={() => setOpenIndex(isOpen ? -1 : idx)}
              >
                <div className="faq-question-row">
                  <h3 className="faq-question-title">{faq.q}</h3>
                  <div className="faq-arrow">
                    <ChevronDown size={20} className={isOpen ? 'rotate-180' : ''} />
                  </div>
                </div>
                {isOpen && (
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout Box */}
        <div className="faq-support-box glass-card">
          <div className="support-icon-wrap">
            <Mail size={24} color="#FF2B85" />
          </div>
          <div className="support-text-wrap">
            <h4>Still Have Questions or Need Assistance?</h4>
            <p>Our dedicated support team is available 24/7 to help you with vehicle tag activation and services.</p>
          </div>
          <a href="mailto:support@carfrnd.com" className="btn-primary">
            Email support@carfrnd.com
          </a>
        </div>
      </div>

      <style>{`
        .faq-section {
          background: #FFFFFF;
        }

        .faq-accordion {
          max-width: 860px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .faq-item {
          padding: 22px 26px;
          cursor: pointer;
          transition: all 0.25s ease;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
        }

        .faq-item.open {
          border-color: var(--magenta);
          box-shadow: 0 8px 25px rgba(255, 43, 133, 0.1);
        }

        .faq-question-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .faq-question-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0F172A;
        }

        .faq-arrow {
          color: var(--magenta);
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }

        .rotate-180 {
          transform: rotate(180deg);
        }

        .faq-answer-content {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #F1F5F9;
          font-size: 0.95rem;
          color: #475569;
          line-height: 1.6;
        }

        .faq-support-box {
          max-width: 860px;
          margin: 40px auto 0 auto;
          padding: 24px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          background: var(--magenta-light);
          border: 1px solid var(--magenta-border);
          border-radius: 20px;
        }

        .support-icon-wrap {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid var(--magenta-border);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .support-text-wrap {
          flex: 1;
        }

        .support-text-wrap h4 {
          font-size: 1.1rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .support-text-wrap p {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.4;
        }

        @media (max-width: 768px) {
          .faq-support-box {
            flex-direction: column;
            text-align: center;
            padding: 24px 18px;
          }
          .faq-support-box .btn-primary {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
