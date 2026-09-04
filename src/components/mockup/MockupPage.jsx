import React from 'react';
import './mockup.css';
import MockupNavbar from './MockupNavbar';
import MockupHero from './MockupHero';
import MockupServices from './MockupServices';
import MockupFindOwner from './MockupFindOwner';
import MockupExperience from './MockupExperience';
import MockupBrands from './MockupBrands';
import MockupAppBanner from './MockupAppBanner';
import MockupFooter from './MockupFooter';

export default function MockupPage({ onOpenScanner }) {
  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mockup-page">
      {/* 1. Header Navigation Bar */}
      <MockupNavbar 
        onOpenScanner={onOpenScanner}
        onDownloadApp={() => handleScrollToSection('download-app')}
      />

      {/* 2. Hero Section */}
      <MockupHero 
        onOpenScanner={onOpenScanner}
        onExploreServices={() => handleScrollToSection('services')}
      />

      {/* 3. Our Services (4 Cards Grid) */}
      <MockupServices 
        onOpenScanner={onOpenScanner}
      />

      {/* 4. Find Owner (4 Steps Flow) */}
      <MockupFindOwner 
        onOpenScanner={onOpenScanner}
      />

      {/* 5. Experience Car Frnd (High Contrast Light Showcase) */}
      <MockupExperience />

      {/* 6. Top Brands Banner */}
      <MockupBrands />

      {/* 7. App Download Banner */}
      <MockupAppBanner />

      {/* 8. Footer */}
      <MockupFooter 
        onOpenScanner={onOpenScanner}
      />
    </div>
  );
}
