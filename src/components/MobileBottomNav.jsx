import React, { useState, useEffect } from 'react';
import { Home, ShoppingBag, Truck, User } from 'lucide-react';

export default function MobileBottomNav({ onOpenOrderTag, onOpenAccount, onNavigate, currentView }) {
  const [scrollTab, setScrollTab] = useState('home');

  useEffect(() => {
    if (currentView && currentView !== 'home') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      const orderEl = document.getElementById('order-tag');

      if (orderEl && scrollPos >= orderEl.offsetTop) {
        setScrollTab('order');
      } else {
        setScrollTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const activeTab = (currentView && currentView !== 'home') ? currentView : scrollTab;

  const scrollToSection = (id, tabName) => {
    setScrollTab(tabName);
    if (currentView && currentView !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="mobile-bottom-nav">
      <div className="bottom-nav-inner">
        {/* Home Tab */}
        <button
          className={`nav-tab-item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => scrollToSection('home', 'home')}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        {/* Track Order Tab */}
        <button
          className={`nav-tab-item ${currentView === 'track-order' ? 'active' : ''}`}
          onClick={() => {
            if (onNavigate) onNavigate('track-order');
          }}
        >
          <Truck size={20} />
          <span>Track Order</span>
        </button>

        {/* Center Prominent Get Tag Floating Button */}
        <div className="center-fab-wrapper">
          <button
            className="center-fab-btn"
            onClick={() => {
              scrollToSection('order-tag', 'order');
              if (onOpenOrderTag) onOpenOrderTag();
            }}
            aria-label="Get CarFrnd Tag"
          >
            <ShoppingBag size={22} color="#FFFFFF" />
            <span className="fab-pulse-ring"></span>
          </button>
          <span className="center-fab-label">₹450</span>
          <span className="fab-badge">BUY</span>
        </div>

        {/* Account Tab */}
        <button
          className="nav-tab-item"
          onClick={() => {
            if (onOpenAccount) onOpenAccount();
          }}
        >
          <User size={20} />
          <span>Account</span>
        </button>
      </div>

      <style>{`
        .mobile-bottom-nav {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 150;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid #E2E8F0;
          box-shadow: 0 -8px 25px rgba(15, 23, 42, 0.08);
          padding-bottom: env(safe-area-inset-bottom, 6px);
        }

        .bottom-nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 62px;
          padding: 0 6px;
          position: relative;
        }

        .nav-tab-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: #64748B;
          font-size: 0.68rem;
          font-weight: 700;
          gap: 3px;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 4px 0;
        }

        .nav-tab-item.active {
          color: var(--magenta);
        }

        .nav-tab-item.active svg {
          transform: scale(1.1);
          color: var(--magenta);
        }

        /* Center Floating Button */
        .center-fab-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          margin-top: -22px;
        }

        .center-fab-btn {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: linear-gradient(135deg, #FF2B85 0%, #E91E63 100%);
          border: 3px solid #FFFFFF;
          box-shadow: 0 4px 18px rgba(255, 43, 133, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          transition: transform 0.2s ease;
        }

        .center-fab-btn:active {
          transform: scale(0.92);
        }

        .center-fab-label {
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--magenta);
          margin-top: 3px;
        }

        .fab-badge {
          position: absolute;
          top: -4px;
          right: 6px;
          background: #10B981;
          color: #FFFFFF;
          font-size: 0.55rem;
          font-weight: 900;
          padding: 1px 4px;
          border-radius: 4px;
          border: 1px solid #FFFFFF;
        }

        .fab-pulse-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 2px solid rgba(255, 43, 133, 0.5);
          animation: fabPulse 2s infinite ease-out;
        }

        @keyframes fabPulse {
          0% {
            transform: scale(0.95);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.35);
            opacity: 0;
          }
        }

        @media (max-width: 900px) {
          .mobile-bottom-nav {
            display: block;
          }
        }
      `}</style>
    </nav>
  );
}
