import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Mail } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'How does the CarFrnd Tag protect my personal mobile number?',
      a: 'When someone scans your CarFrnd Tag, they can notify you about your car without seeing your personal phone number. Supported contact is handled through secure masked communication, keeping your phone number private.'
    },
    {
      q: 'Does a person scanning my CarFrnd Tag need to download the CarFrnd app?',
      a: 'No. Anyone with a smartphone camera can scan your CarFrnd Tag. It opens a secure web-based contact page in their browser without requiring an app download or sign-up.'
    },
    {
      q: 'Are there any monthly subscription fees for CarFrnd Tag?',
      a: 'No. CarFrnd Tag is a one-time purchase of ₹450 including GST. There are no recurring monthly or annual subscription fees.'
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
            <h4>Need help with your CarFrnd Tag?</h4>
            <p>Our support team can assist you with your car's smart contact tag.</p>
          </div>
          <a href="mailto:support@carfrnd.com" className="btn-primary">
            Email support@carfrnd.com
          </a>
        </div>
      </div>

      <style>{`
        section.faq-section {
          background: #FFFFFF;
          padding-top: 28px;
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
          margin: 28px auto 0 auto;
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
          section.faq-section {
            padding-top: 16px;
          }
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
