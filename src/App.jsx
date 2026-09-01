import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EcosystemSection from './components/EcosystemSection';
import AppShowcaseSection from './components/AppShowcaseSection';
import LiveServices from './components/LiveServices';
import ComingSoonServices from './components/ComingSoonServices';
import OrderTagSection from './components/OrderTagSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import ScanSimulatorModal from './components/ScanSimulatorModal';
import MobileBottomNav from './components/MobileBottomNav';

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);

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
      />

      {/* Main Content Sections */}
      <main className="main-content-wrapper">
        {/* 1. Hero Section */}
        <Hero
          onOpenScanner={handleOpenScanner}
          onOpenOrderTag={handleScrollToOrder}
        />

        {/* 2. The Automotive Ecosystem Section (One below another below Home) */}
        <EcosystemSection />

        {/* 3. See CarFrnd in Action (5 Screens with Animated Customer Scanning Flow) */}
        <AppShowcaseSection />

        {/* 4. Live Auto Services Showcase */}
        <LiveServices
          onOpenOrderTag={handleScrollToOrder}
        />

        {/* 5. Coming Soon Services */}
        <ComingSoonServices />

        {/* 6. Order Tag Section */}
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
      />

      {/* Global Interactive QR Scanner Modal Simulator */}
      <ScanSimulatorModal
        isOpen={scannerOpen}
        onClose={handleCloseScanner}
      />
    </div>
  );
}
