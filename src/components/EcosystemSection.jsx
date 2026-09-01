import React, { useState } from 'react';
import { Smartphone, Users, Wrench, Settings, Store } from 'lucide-react';

export default function EcosystemSection() {
  const [activeNode, setActiveNode] = useState('center');

  const nodes = [
    {
      id: 'owners',
      title: 'Car Owners',
      stat: '50K+',
      icon: Users,
      color: '#3B82F6',
      bg: '#EFF6FF',
      border: '#BFDBFE',
      desc: 'Instant QR privacy alerts, 1-tap doorstep car wash, digital service history, and emergency parking notifications.'
    },
    {
      id: 'providers',
      title: 'Service Providers',
      stat: '200+',
      icon: Wrench,
      color: '#8B5CF6',
      bg: '#F5F3FF',
      border: '#DDD6FE',
      desc: 'Verified mobile detailing vans and neighborhood wash stations with automated slot scheduling and job assignments.'
    },
    {
      id: 'tyres',
      title: 'Tyre Partners',
      stat: '30+',
      icon: Settings,
      color: '#D97706',
      bg: '#FFFBEB',
      border: '#FDE68A',
      desc: 'Authorized brand distributors for Michelin, Bridgestone, Apollo, and Goodyear with direct customer dispatch.'
    },
    {
      id: 'dealers',
      title: 'Dealers',
      stat: '50+',
      icon: Store,
      color: '#EC4899',
      bg: '#FDF2F8',
      border: '#FBCFE8',
      desc: 'Pre-owned car dealerships bundling FindOwner safety tags and post-sale maintenance packages with vehicles.'
    }
  ];

  return (
    <section id="ecosystem" className="section-padding ecosystem-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="ecosystem-pill">
            <span className="pill-dot"></span>
            <span>THE PLATFORM</span>
          </div>
          <h2 className="ecosystem-title">The Automotive Ecosystem</h2>
          <p className="ecosystem-subtitle">
            CarFrnd connects every stakeholder in your vehicle’s life — creating 
            a seamless network of care, service, and trust.
          </p>
        </div>

        {/* Animated Connected Ecosystem Diagram */}
        <div className="diagram-container">
          <svg className="diagram-svg-layer" viewBox="0 0 500 500">
            <defs>
              <filter id="greenGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* 1. Outer Orbit Dotted Circle */}
            <circle
              cx="250"
              cy="250"
              r="170"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />

            {/* Orbiting Dot Rotating Strictly on the Circle Circumference */}
            <circle cx="250" cy="80" r="5" fill="#10B981" filter="url(#greenGlow)">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 250 250"
                to="360 250 250"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>
            <circle cx="250" cy="420" r="4" fill="#FF2B85">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 250 250"
                to="360 250 250"
                dur="10s"
                repeatCount="indefinite"
              />
            </circle>

            {/* 2. Four Straight Dotted Connector Lines from Center (250, 250) */}
            <line x1="250" y1="250" x2="250" y2="80" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="250" y1="250" x2="420" y2="250" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="250" y1="250" x2="250" y2="420" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
            <line x1="250" y1="250" x2="80" y2="250" stroke="#10B981" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />

            {/* 3. Glowing Energy Dots Traveling Directly on the Dotted Lines from Center Outward */}
            {/* North Dot (Center -> Car Owners) */}
            <circle cx="250" cy="250" r="4.5" fill="#10B981" filter="url(#greenGlow)">
              <animate attributeName="cy" values="250; 80" dur="2s" repeatCount="indefinite" keyTimes="0; 1" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" keyTimes="0; 0.15; 0.85; 1" />
            </circle>

            {/* East Dot (Center -> Service Providers) */}
            <circle cx="250" cy="250" r="4.5" fill="#10B981" filter="url(#greenGlow)">
              <animate attributeName="cx" values="250; 420" dur="2s" repeatCount="indefinite" keyTimes="0; 1" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" keyTimes="0; 0.15; 0.85; 1" />
            </circle>

            {/* South Dot (Center -> Tyre Partners) */}
            <circle cx="250" cy="250" r="4.5" fill="#10B981" filter="url(#greenGlow)">
              <animate attributeName="cy" values="250; 420" dur="2s" repeatCount="indefinite" keyTimes="0; 1" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" keyTimes="0; 0.15; 0.85; 1" />
            </circle>

            {/* West Dot (Center -> Dealers) */}
            <circle cx="250" cy="250" r="4.5" fill="#10B981" filter="url(#greenGlow)">
              <animate attributeName="cx" values="250; 80" dur="2s" repeatCount="indefinite" keyTimes="0; 1" />
              <animate attributeName="opacity" values="0; 1; 1; 0" dur="2s" repeatCount="indefinite" keyTimes="0; 0.15; 0.85; 1" />
            </circle>

            {/* Center Ambient Glow Ring */}
            <circle
              cx="250"
              cy="250"
              r="60"
              fill="rgba(16, 185, 129, 0.08)"
              stroke="rgba(16, 185, 129, 0.25)"
              strokeWidth="1.5"
            />
          </svg>

          {/* Center Hub Node */}
          <div
            className={`center-hub-node ${activeNode === 'center' ? 'active' : ''}`}
            onClick={() => setActiveNode('center')}
          >
            <div className="hub-inner">
              <Smartphone size={26} color="#FFFFFF" />
              <span className="hub-brand-name">CarFrnd</span>
            </div>
            <div className="hub-pulse-ring"></div>
          </div>

          {/* Node 1: Top (Car Owners) */}
          <div
            className={`orbit-node node-pos-top ${activeNode === 'owners' ? 'active' : ''}`}
            onClick={() => setActiveNode('owners')}
          >
            <div className="orbit-node-box" style={{ borderColor: '#BFDBFE', background: '#FFFFFF' }}>
              <div className="orbit-icon-wrap" style={{ background: '#EFF6FF' }}>
                <Users size={18} color="#3B82F6" />
              </div>
              <span className="orbit-stat" style={{ color: '#3B82F6' }}>50K+</span>
            </div>
            <span className="orbit-label">Car Owners</span>
          </div>

          {/* Node 2: Right (Service Providers) */}
          <div
            className={`orbit-node node-pos-right ${activeNode === 'providers' ? 'active' : ''}`}
            onClick={() => setActiveNode('providers')}
          >
            <div className="orbit-node-box" style={{ borderColor: '#DDD6FE', background: '#FFFFFF' }}>
              <div className="orbit-icon-wrap" style={{ background: '#F5F3FF' }}>
                <Wrench size={18} color="#8B5CF6" />
              </div>
              <span className="orbit-stat" style={{ color: '#8B5CF6' }}>200+</span>
            </div>
            <span className="orbit-label">Service Providers</span>
          </div>

          {/* Node 3: Bottom (Tyre Partners) */}
          <div
            className={`orbit-node node-pos-bottom ${activeNode === 'tyres' ? 'active' : ''}`}
            onClick={() => setActiveNode('tyres')}
          >
            <div className="orbit-node-box" style={{ borderColor: '#FDE68A', background: '#FFFFFF' }}>
              <div className="orbit-icon-wrap" style={{ background: '#FFFBEB' }}>
                <Settings size={18} color="#D97706" />
              </div>
              <span className="orbit-stat" style={{ color: '#D97706' }}>30+</span>
            </div>
            <span className="orbit-label">Tyre Partners</span>
          </div>

          {/* Node 4: Left (Dealers) */}
          <div
            className={`orbit-node node-pos-left ${activeNode === 'dealers' ? 'active' : ''}`}
            onClick={() => setActiveNode('dealers')}
          >
            <div className="orbit-node-box" style={{ borderColor: '#FBCFE8', background: '#FFFFFF' }}>
              <div className="orbit-icon-wrap" style={{ background: '#FDF2F8' }}>
                <Store size={18} color="#EC4899" />
              </div>
              <span className="orbit-stat" style={{ color: '#EC4899' }}>50+</span>
            </div>
            <span className="orbit-label">Dealers</span>
          </div>
        </div>

        {/* Dynamic Detail Card on Click */}
        {activeNode !== 'center' && (
          <div className="node-detail-banner glass-card">
            {(() => {
              const current = nodes.find(n => n.id === activeNode);
              if (!current) return null;
              const IconC = current.icon;
              return (
                <div className="detail-inner">
                  <div className="detail-icon" style={{ background: current.bg, borderColor: current.border }}>
                    <IconC size={20} color={current.color} />
                  </div>
                  <div className="detail-text">
                    <h4>{current.title} <span style={{ color: current.color }}>({current.stat})</span></h4>
                    <p>{current.desc}</p>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Bottom Platform Feature Badges */}
        <div className="ecosystem-feature-pills">
          <div className="eco-pill">
            <span className="eco-dot"></span>
            <span>SERVICE BOOKING</span>
          </div>
          <div className="eco-pill">
            <span className="eco-dot"></span>
            <span>JOB ASSIGNMENTS</span>
          </div>
          <div className="eco-pill">
            <span className="eco-dot"></span>
            <span>TYRE ORDERS</span>
          </div>
          <div className="eco-pill">
            <span className="eco-dot"></span>
            <span>LEAD GENERATION</span>
          </div>
        </div>
      </div>

      <style>{`
        .ecosystem-section {
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
          padding: 80px 0;
        }

        .ecosystem-pill {
          background: #ECFDF5;
          border: 1px solid #A7F3D0;
          border-radius: 20px;
          padding: 4px 14px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #059669;
          letter-spacing: 0.08em;
          margin-bottom: 12px;
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
          box-shadow: 0 0 6px #10B981;
        }

        .ecosystem-title {
          font-size: 2.8rem;
          font-weight: 900;
          color: #0F172A;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .ecosystem-subtitle {
          font-size: 1.02rem;
          color: #64748B;
          max-width: 600px;
          margin: 0 auto 40px auto;
          line-height: 1.6;
        }

        /* Diagram Container */
        .diagram-container {
          position: relative;
          width: 100%;
          max-width: 480px;
          height: 480px;
          margin: 0 auto 36px auto;
        }

        .diagram-svg-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        /* Center Hub */
        .center-hub-node {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 96px;
          height: 96px;
          border-radius: 26px;
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          box-shadow: 0 8px 30px rgba(16, 185, 129, 0.45);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: transform 0.25s ease;
        }

        .center-hub-node:hover {
          transform: translate(-50%, -50%) scale(1.05);
        }

        .hub-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .hub-brand-name {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        .hub-pulse-ring {
          position: absolute;
          inset: -6px;
          border-radius: 32px;
          border: 2px solid rgba(16, 185, 129, 0.4);
          animation: hubPulse 2.5s infinite ease-out;
        }

        @keyframes hubPulse {
          0% { transform: scale(0.95); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0; }
        }

        /* Orbiting Nodes */
        .orbit-node {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
          z-index: 10;
          transition: transform 0.25s ease;
        }

        .orbit-node:hover, .orbit-node.active {
          transform: scale(1.08);
        }

        .orbit-node-box {
          width: 62px;
          height: 62px;
          border-radius: 18px;
          border: 1.5px solid;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          box-shadow: 0 4px 15px rgba(15, 23, 42, 0.06);
          background: #FFFFFF;
        }

        .orbit-icon-wrap {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .orbit-stat {
          font-size: 0.68rem;
          font-weight: 900;
        }

        .orbit-label {
          font-size: 0.78rem;
          font-weight: 800;
          color: #334155;
          margin-top: 6px;
          white-space: nowrap;
        }

        /* Node Cardinal Coordinates */
        .node-pos-top {
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
        }
        .node-pos-top:hover, .node-pos-top.active {
          transform: translateX(-50%) scale(1.08);
        }

        .node-pos-right {
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
        }
        .node-pos-right:hover, .node-pos-right.active {
          transform: translateY(-50%) scale(1.08);
        }

        .node-pos-bottom {
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
        }
        .node-pos-bottom:hover, .node-pos-bottom.active {
          transform: translateX(-50%) scale(1.08);
        }

        .node-pos-left {
          top: 50%;
          left: 8px;
          transform: translateY(-50%);
        }
        .node-pos-left:hover, .node-pos-left.active {
          transform: translateY(-50%) scale(1.08);
        }

        /* Detail Banner */
        .node-detail-banner {
          max-width: 540px;
          margin: 0 auto 32px auto;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 16px 20px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
        }

        .detail-inner {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .detail-icon {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          border: 1px solid;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .detail-text h4 {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 2px;
        }

        .detail-text p {
          font-size: 0.84rem;
          color: #64748B;
          line-height: 1.45;
        }

        /* Feature Pills */
        .ecosystem-feature-pills {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .eco-pill {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          padding: 8px 16px;
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.74rem;
          font-weight: 800;
          color: #334155;
          letter-spacing: 0.05em;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.03);
          transition: all 0.2s ease;
        }

        .eco-pill:hover {
          border-color: #10B981;
          color: #059669;
        }

        .eco-dot {
          width: 6px;
          height: 6px;
          background: #10B981;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .ecosystem-section {
            padding: 30px 0 18px 0;
          }
          .ecosystem-title {
            font-size: 1.95rem;
          }
          .ecosystem-subtitle {
            margin-bottom: 20px;
            font-size: 0.9rem;
          }
          .diagram-container {
            max-width: 310px;
            height: 310px;
            margin-bottom: 20px;
          }
          .center-hub-node {
            width: 72px;
            height: 72px;
            border-radius: 20px;
          }
          .hub-brand-name {
            font-size: 0.78rem;
          }
          .orbit-node-box {
            width: 48px;
            height: 48px;
            border-radius: 14px;
          }
          .orbit-icon-wrap {
            width: 22px;
            height: 22px;
          }
          .orbit-stat {
            font-size: 0.58rem;
          }
          .orbit-label {
            font-size: 0.65rem;
          }
          .eco-pill {
            padding: 6px 12px;
            font-size: 0.68rem;
          }
        }
      `}</style>
    </section>
  );
}
