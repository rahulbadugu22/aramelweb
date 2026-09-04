import React from 'react';

export default function RealisticQRCode({ size = 100, className = "" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={`realistic-qr-svg ${className}`}
      style={{ display: 'block', shapeRendering: 'crispEdges' }}
    >
      <rect width="100" height="100" fill="#FFFFFF" rx="4" />
      
      {/* Top-Left Position Finder (7x7 outer, 5x5 white, 3x3 black) */}
      <rect x="6" y="6" width="28" height="28" rx="3" fill="#0F172A" />
      <rect x="10" y="10" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="14" y="14" width="12" height="12" rx="1.5" fill="#0F172A" />

      {/* Top-Right Position Finder */}
      <rect x="66" y="6" width="28" height="28" rx="3" fill="#0F172A" />
      <rect x="70" y="10" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="74" y="14" width="12" height="12" rx="1.5" fill="#0F172A" />

      {/* Bottom-Left Position Finder */}
      <rect x="6" y="66" width="28" height="28" rx="3" fill="#0F172A" />
      <rect x="10" y="70" width="20" height="20" rx="2" fill="#FFFFFF" />
      <rect x="14" y="74" width="12" height="12" rx="1.5" fill="#0F172A" />

      {/* Bottom-Right Alignment Pattern */}
      <rect x="68" y="68" width="16" height="16" rx="2" fill="#0F172A" />
      <rect x="72" y="72" width="8" height="8" rx="1" fill="#FFFFFF" />
      <rect x="74" y="74" width="4" height="4" fill="#0F172A" />

      {/* Timing Patterns */}
      <g fill="#0F172A">
        <rect x="38" y="18" width="4" height="4" />
        <rect x="46" y="18" width="4" height="4" />
        <rect x="54" y="18" width="4" height="4" />
        
        <rect x="18" y="38" width="4" height="4" />
        <rect x="18" y="46" width="4" height="4" />
        <rect x="18" y="54" width="4" height="4" />
      </g>

      {/* Data Modules (Realistic density matrix) */}
      <g fill="#0F172A">
        {/* Top-Mid Data */}
        <rect x="38" y="6" width="4" height="8" />
        <rect x="46" y="10" width="8" height="4" />
        <rect x="58" y="6" width="4" height="4" />
        <rect x="54" y="14" width="8" height="4" />
        <rect x="38" y="26" width="8" height="4" />
        <rect x="50" y="26" width="12" height="4" />

        {/* Left-Mid Data */}
        <rect x="6" y="38" width="8" height="4" />
        <rect x="10" y="46" width="4" height="8" />
        <rect x="6" y="58" width="4" height="4" />
        <rect x="14" y="54" width="4" height="8" />
        <rect x="26" y="38" width="4" height="8" />
        <rect x="26" y="50" width="4" height="12" />

        {/* Center Grid Matrix */}
        <rect x="34" y="34" width="8" height="4" />
        <rect x="46" y="34" width="4" height="4" />
        <rect x="54" y="34" width="8" height="8" />
        
        <rect x="34" y="42" width="4" height="8" />
        <rect x="42" y="42" width="8" height="4" />
        <rect x="58" y="46" width="8" height="4" />

        <rect x="34" y="54" width="8" height="4" />
        <rect x="46" y="50" width="4" height="8" />
        <rect x="54" y="54" width="8" height="4" />

        {/* Right-Mid Data */}
        <rect x="66" y="38" width="4" height="8" />
        <rect x="74" y="34" width="8" height="4" />
        <rect x="86" y="38" width="8" height="4" />
        <rect x="70" y="46" width="4" height="4" />
        <rect x="78" y="46" width="12" height="4" />
        <rect x="66" y="54" width="8" height="4" />
        <rect x="78" y="54" width="4" height="8" />
        <rect x="86" y="50" width="8" height="8" />

        {/* Bottom-Mid Data */}
        <rect x="38" y="66" width="4" height="8" />
        <rect x="46" y="66" width="8" height="4" />
        <rect x="58" y="66" width="4" height="4" />
        <rect x="38" y="78" width="8" height="4" />
        <rect x="50" y="74" width="4" height="12" />
        <rect x="58" y="78" width="6" height="4" />
        <rect x="34" y="86" width="4" height="8" />
        <rect x="42" y="90" width="8" height="4" />
        <rect x="54" y="86" width="10" height="8" />

        {/* Bottom-Right Surroundings */}
        <rect x="88" y="68" width="6" height="4" />
        <rect x="88" y="76" width="6" height="8" />
        <rect x="68" y="88" width="8" height="6" />
        <rect x="80" y="88" width="14" height="6" />
      </g>

      {/* Center Brand Identity (Pink Mini Car Badge) */}
      <rect x="42" y="42" width="16" height="16" rx="4" fill="#FFFFFF" />
      <rect x="43" y="43" width="14" height="14" rx="3" fill="#FF2B85" />
      <path 
        d="M47 50.5C47 49.5 48 48 50 48H52C54 48 55 49.5 55 50.5L55.5 52C55.8 52.3 56 52.6 56 53V55C56 55.6 55.6 56 55 56H45C44.4 56 44 55.6 44 55V53C44 52.6 44.2 52.3 44.5 52L47 50.5Z" 
        fill="#FFFFFF" 
      />
      <circle cx="46.5" cy="54" r="0.8" fill="#FF2B85" />
      <circle cx="53.5" cy="54" r="0.8" fill="#FF2B85" />
    </svg>
  );
}
