import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AppShowcaseSection from './components/AppShowcaseSection';
import LiveServices from './components/LiveServices';
import OrderTagSection from './components/OrderTagSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ScanSimulatorModal from './components/ScanSimulatorModal';
import MobileBottomNav from './components/MobileBottomNav';
import DoorstepWashModal from './components/DoorstepWashModal';
import AccountModal from './components/AccountModal';
import BillPage from './components/BillPage';
import TrackOrderPage from './components/TrackOrderPage';
import ActivateTagPage from './components/ActivateTagPage';

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [doorstepModalOpen, setDoorstepModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Initialize view from URL hash or default to 'home'
  const getInitialView = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('bill') || hash.includes('invoice')) return 'bill';
    if (hash.includes('track')) return 'track-order';
    if (hash.includes('activate')) return 'activate-tag';
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView());
  const [activeOrder, setActiveOrder] = useState(null);
  const [activeOrderId, setActiveOrderId] = useState('CF-842918');

  // Handle hash change for browser back/forward and direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('bill') || hash.includes('invoice')) {
        setCurrentView('bill');
      } else if (hash.includes('track')) {
        setCurrentView('track-order');
      } else if (hash.includes('activate')) {
        setCurrentView('activate-tag');
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view, extraData) => {
    setCurrentView(view);
    if (view === 'bill') {
      window.location.hash = '/bill';
      if (extraData) {
        if (typeof extraData === 'object') {
          setActiveOrder(extraData);
        } else if (typeof extraData === 'string') {
          setActiveOrderId(extraData);
          setActiveOrder(prev => ({ ...(prev || {}), orderId: extraData }));
        }
      }
    } else if (view === 'track-order') {
      window.location.hash = '/track-order';
      if (extraData) {
        const id = typeof extraData === 'string' ? extraData : extraData.orderId;
        setActiveOrderId(id);
      }
    } else if (view === 'activate-tag') {
      window.location.hash = '/activate-tag';
    } else {
      window.location.hash = '/';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenScanner = () => {
    setScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setScannerOpen(false);
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
        onOpenScanner={handleOpenScanner}
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
            onOpenScanner={handleOpenScanner}
          />
        ) : currentView === 'track-order' ? (
          <TrackOrderPage
            initialOrderId={activeOrderId}
            onNavigate={handleNavigate}
            onOpenScanner={handleOpenScanner}
          />
        ) : currentView === 'activate-tag' ? (
          <ActivateTagPage
            onNavigate={handleNavigate}
            onOpenScanner={handleOpenScanner}
          />
        ) : (
          <>
            {/* 1. Hero Section */}
            <Hero
              onOpenScanner={handleOpenScanner}
              onOpenOrderTag={handleScrollToOrder}
              onOpenDoorstepWash={() => setDoorstepModalOpen(true)}
            />

            {/* 2. See CarFrnd Tag in Action */}
            <AppShowcaseSection
              onOpenScanner={handleOpenScanner}
              onOpenOrderTag={handleScrollToOrder}
            />

            {/* 3. Live Auto Services Showcase */}
            <LiveServices
              onOpenOrderTag={handleScrollToOrder}
            />

            {/* 4. Order Tag Section */}
            <OrderTagSection
              onOpenScanner={handleOpenScanner}
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
        onOpenScanner={handleOpenScanner}
        onOpenOrderTag={handleScrollToOrder}
        onNavigate={handleNavigate}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenScanner={handleOpenScanner}
        onOpenOrderTag={handleScrollToOrder}
        onOpenAccount={() => setAccountModalOpen(true)}
        onNavigate={handleNavigate}
        currentView={currentView}
      />

      {/* Global Interactive QR Scanner Modal */}
      <ScanSimulatorModal
        isOpen={scannerOpen}
        onClose={handleCloseScanner}
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
