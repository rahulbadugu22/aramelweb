import React, { useState } from 'react';
// =========================================================================
// NEW DESIGN (MATCHING REFERENCE IMAGE WITH LOGO COLOR PALETTE)
// =========================================================================
import MockupPage from './components/mockup/MockupPage';

// =========================================================================
// ORIGINAL COMPONENTS (PRESERVED FOR COMPARISON)
// =========================================================================
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EcosystemSection from './components/EcosystemSection';
import AppShowcaseSection from './components/AppShowcaseSection';
import LiveServices from './components/LiveServices';
import ComingSoonServices from './components/ComingSoonServices';
import OrderTagSection from './components/OrderTagSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';

// Shared Interactive Modal
import ScanSimulatorModal from './components/ScanSimulatorModal';

export default function App() {
  const [scannerOpen, setScannerOpen] = useState(false);
  // 'mockup' (default - new design from image) or 'original' (previous design)
  const [viewMode, setViewMode] = useState('mockup');

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
    <>
      {/* Floating Design Comparison Switcher */}
      <div className="comparison-banner">
        <span style={{ color: '#94A3B8', fontWeight: 600 }}>Compare:</span>
        <button 
          className={`comparison-btn ${viewMode === 'mockup' ? 'active' : ''}`}
          onClick={() => setViewMode('mockup')}
        >
          ✨ New Design (From Image)
        </button>
        <button 
          className={`comparison-btn ${viewMode === 'original' ? 'active' : ''}`}
          onClick={() => setViewMode('original')}
        >
          🔄 Original Design
        </button>
      </div>

      {viewMode === 'mockup' ? (
        /* ===================================================================
           1. NEW DESIGN RECREATED FROM UPLOADED IMAGE
           Colors matched to CarFrnd Logo (#FF2B85 Magenta Pink)
           =================================================================== */
        <MockupPage onOpenScanner={handleOpenScanner} />
      ) : (
        /* ===================================================================
           2. ORIGINAL DESIGN (PRESERVED FOR LIVE COMPARISON)
           =================================================================== */
        <div className="carfrnd-app-root">
          <Navbar
            onOpenScanner={handleOpenScanner}
            onOpenOrderTag={handleScrollToOrder}
          />

          <main className="main-content-wrapper">
            <Hero
              onOpenScanner={handleOpenScanner}
              onOpenOrderTag={handleScrollToOrder}
            />
            <EcosystemSection />
            <AppShowcaseSection />
            <LiveServices
              onOpenOrderTag={handleScrollToOrder}
            />
            <ComingSoonServices />
            <OrderTagSection
              onOpenScanner={handleOpenScanner}
            />
            <FAQSection />
          </main>

          <Footer
            onOpenScanner={handleOpenScanner}
            onOpenOrderTag={handleScrollToOrder}
          />

          <MobileBottomNav
            onOpenScanner={handleOpenScanner}
            onOpenOrderTag={handleScrollToOrder}
          />
        </div>
      )}

      {/* =====================================================================
         ORIGINAL CODE COMMENTED OUT IN PLACE (AS REQUESTED)
         To permanently use only the new mockup code without toggle, you can
         keep <MockupPage onOpenScanner={handleOpenScanner} /> and leave this
         block commented out:
         
         <div className="carfrnd-app-root">
           <Navbar onOpenScanner={handleOpenScanner} onOpenOrderTag={handleScrollToOrder} />
           <main className="main-content-wrapper">
             <Hero onOpenScanner={handleOpenScanner} onOpenOrderTag={handleScrollToOrder} />
             <EcosystemSection />
             <AppShowcaseSection />
             <LiveServices onOpenOrderTag={handleScrollToOrder} />
             <ComingSoonServices />
             <OrderTagSection onOpenScanner={handleOpenScanner} />
             <FAQSection />
           </main>
           <Footer onOpenScanner={handleOpenScanner} onOpenOrderTag={handleScrollToOrder} />
           <MobileBottomNav onOpenScanner={handleOpenScanner} onOpenOrderTag={handleScrollToOrder} />
         </div>
         ===================================================================== */}

      {/* Global Interactive QR Scanner Modal Simulator */}
      <ScanSimulatorModal
        isOpen={scannerOpen}
        onClose={handleCloseScanner}
      />
    </>
  );
}
