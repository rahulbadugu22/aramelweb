import React, { useState } from 'react';
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

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [doorstepModalOpen, setDoorstepModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  const handleOpenScanner = () => {
    setScannerOpen(true);
  };

  const handleCloseScanner = () => {
    setScannerOpen(false);
  };

  const handleScrollToOrder = () => {
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
      />

      {/* Main Content Sections */}
      <main className="main-content-wrapper">
        {/* 1. Hero Section */}
        <Hero
          onOpenScanner={handleOpenScanner}
          onOpenOrderTag={handleScrollToOrder}
          onOpenDoorstepWash={() => setDoorstepModalOpen(true)}
        />

        {/* 2. See CarFrnd Tag in Action (Live Customer Scanning Flow) */}
        <AppShowcaseSection
          onOpenScanner={handleOpenScanner}
          onOpenOrderTag={handleScrollToOrder}
        />

        {/* 4. Live Auto Services Showcase */}
        <LiveServices
          onOpenOrderTag={handleScrollToOrder}
        />

        {/* 5. Order Tag Section */}
        <OrderTagSection
          onOpenScanner={handleOpenScanner}
        />

        {/* 7. FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenScanner={handleOpenScanner}
        onOpenOrderTag={handleScrollToOrder}
      />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav
        onOpenScanner={handleOpenScanner}
        onOpenOrderTag={handleScrollToOrder}
        onOpenAccount={() => setAccountModalOpen(true)}
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
      />
    </div>
  );
}
