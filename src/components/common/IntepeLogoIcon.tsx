import React from 'react';

interface IntepeLogoIconProps {
  className?: string;
  size?: number | string;
}

export const IntepeLogoIcon: React.FC<IntepeLogoIconProps> = ({ className = 'w-8 h-8', size = '100%' }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 512 512" 
      width={size} 
      height={size} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E1626" />
          <stop offset="100%" stopColor="#070B12" />
        </linearGradient>
        <linearGradient id="logoChipGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#141E30" />
          <stop offset="100%" stopColor="#0B101D" />
        </linearGradient>
        <linearGradient id="logoCoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8A3D" />
          <stop offset="100%" stopColor="#FF7120" />
        </linearGradient>
      </defs>

      {/* Main Squircle Card Container */}
      <rect x="40" y="40" width="432" height="432" rx="90" ry="90" fill="url(#logoBgGrad)" stroke="#FF7120" strokeWidth="10" />

      {/* Microchip 16 Pins (4 per side) */}
      <g stroke="#FF7120" strokeWidth="12" strokeLinecap="round">
        {/* TOP PINS */}
        <line x1="172" y1="140" x2="172" y2="88" />
        <line x1="228" y1="140" x2="228" y2="88" />
        <line x1="284" y1="140" x2="284" y2="88" />
        <line x1="340" y1="140" x2="340" y2="88" />

        {/* BOTTOM PINS */}
        <line x1="172" y1="372" x2="172" y2="424" />
        <line x1="228" y1="372" x2="228" y2="424" />
        <line x1="284" y1="372" x2="284" y2="424" />
        <line x1="340" y1="372" x2="340" y2="424" />

        {/* LEFT PINS */}
        <line x1="140" y1="172" x2="88" y2="172" />
        <line x1="140" y1="228" x2="88" y2="228" />
        <line x1="140" y1="284" x2="88" y2="284" />
        <line x1="140" y1="340" x2="88" y2="340" />

        {/* RIGHT PINS */}
        <line x1="372" y1="172" x2="424" y2="172" />
        <line x1="372" y1="228" x2="424" y2="228" />
        <line x1="372" y1="284" x2="424" y2="284" />
        <line x1="372" y1="340" x2="424" y2="340" />
      </g>

      {/* CYAN CONNECTION NODES */}
      <g fill="#00E5FF">
        <circle cx="172" cy="86" r="10" />
        <circle cx="228" cy="86" r="10" />
        <circle cx="284" cy="86" r="10" />
        <circle cx="340" cy="86" r="10" />

        <circle cx="172" cy="426" r="10" />
        <circle cx="228" cy="426" r="10" />
        <circle cx="284" cy="426" r="10" />
        <circle cx="340" cy="426" r="10" />

        <circle cx="86" cy="172" r="10" />
        <circle cx="86" cy="228" r="10" />
        <circle cx="86" cy="284" r="10" />
        <circle cx="86" cy="340" r="10" />

        <circle cx="426" cy="172" r="10" />
        <circle cx="426" cy="228" r="10" />
        <circle cx="426" cy="284" r="10" />
        <circle cx="426" cy="340" r="10" />
      </g>

      {/* Chip Outer Frame */}
      <rect x="136" y="136" width="240" height="240" rx="34" ry="34" fill="url(#logoChipGrad)" stroke="#FF7120" strokeWidth="12" />

      {/* Inner Solid Orange Silicon Core */}
      <rect x="188" y="188" width="136" height="136" rx="20" ry="20" fill="url(#logoCoreGrad)" stroke="#FF8A3D" strokeWidth="3" />
    </svg>
  );
};
