import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcaseSection from './components/AppShowcaseSection';
import LiveServices from './components/LiveServices';
import OrderTagSection from './components/OrderTagSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import DoorstepWashModal from './components/DoorstepWashModal';
import AccountModal from './components/AccountModal';
import BillPage from './components/BillPage';
import TrackOrderPage from './components/TrackOrderPage';
import ActivateTagPage from './components/ActivateTagPage';

export default function App() {
  const [doorstepModalOpen, setDoorstepModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Initialize view from URL pathname or hash, default to 'home'
  const getViewFromLocation = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const combined = path + ' ' + hash;
    if (combined.includes('bill') || combined.includes('invoice')) return 'bill';
    if (combined.includes('track')) return 'track-order';
    if (combined.includes('activate')) return 'activate-tag';
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getViewFromLocation());
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState('');

  // Handle browser back/forward and clean up any leftover hash
  useEffect(() => {
    // If URL has #/ or #, clean it up immediately
    if (window.location.hash === '#/' || window.location.hash === '#') {
      window.history.replaceState(null, '', window.location.pathname);
    }

    const handleLocationChange = () => {
      setCurrentView(getViewFromLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleNavigate = (view, extraData) => {
    setCurrentView(view);
    let targetPath = '/';

    if (view === 'bill') {
      targetPath = '/bill';
      if (extraData) {
        if (typeof extraData === 'object') {
          setActiveOrder(extraData);
        } else if (typeof extraData === 'string') {
          setActiveOrderId(extraData);
          setActiveOrder(prev => ({ ...(prev || {}), orderId: extraData }));
        }
      }
    } else if (view === 'track-order') {
      targetPath = '/track-order';
      if (extraData) {
        const id = typeof extraData === 'string' ? extraData : extraData.orderId;
        setActiveOrderId(id);
      }
    } else if (view === 'activate-tag') {
      targetPath = '/activate-tag';
    } else {
      targetPath = '/';
    }

    // Use clean pushState without ugly hashes
    if (window.location.pathname !== targetPath || window.location.hash) {
      window.history.pushState(null, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToOrder = () => {
    if (currentView !== 'home') {
      handleNavigate('home');
      setTimeout(() => {
        const el = document.getElementById('order-tag');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
      return;
    }
    const el = document.getElementById('order-tag');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="carfrnd-app-root">
      {/* Navigation Bar */}
      <Navbar
        onOpenOrderTag={handleScrollToOrder}
        onOpenAccount={() => setAccountModalOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Main Content Sections or Dedicated Pages */}
      <main className="main-content-wrapper">
        {currentView === 'bill' ? (
          <BillPage
            activeOrder={activeOrder}
            onNavigate={handleNavigate}
          />
        ) : currentView === 'track-order' ? (
          <TrackOrderPage
            initialOrderId={activeOrderId}
            onNavigate={handleNavigate}
          />
        ) : currentView === 'activate-tag' ? (
          <ActivateTagPage
            onNavigate={handleNavigate}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenOrderTag={handleScrollToOrder}
              onOpenDoorstepWash={() => setDoorstepModalOpen(true)}
            />

            {/* 2. See CarFrnd Tag in Action */}
            <AppShowcaseSection
              onOpenOrderTag={handleScrollToOrder}
            />

            {/* 3. Live Auto Services Showcase */}
            <LiveServices
              onOpenOrderTag={handleScrollToOrder}
            />

            {/* 4. Order Tag Section */}
            <OrderTagSection
              onOpenBill={(order) => handleNavigate('bill', order)}
              onOpenTrackOrder={(orderId) => handleNavigate('track-order', orderId)}
            />

            {/* 5. FAQ Section */}
            <FAQSection />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenOrderTag={handleScrollToOrder}
        onNavigate={handleNavigate}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenOrderTag={handleScrollToOrder}
        onOpenAccount={() => setAccountModalOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Doorstep Car Wash Coming Soon Modal */}
      <DoorstepWashModal
        isOpen={doorstepModalOpen}
        onClose={() => setDoorstepModalOpen(false)}
      />

      {/* CarFrnd Account / Profile Modal */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        onOpenOrderTag={handleScrollToOrder}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
