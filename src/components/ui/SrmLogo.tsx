import React from 'react';

interface SrmLogoProps {
  className?: string;
  height?: number;
}

export function SrmLogo({ className = "h-12 w-auto", height }: SrmLogoProps) {
  return (
    <svg 
      viewBox="0 0 240 140" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={height ? { height } : undefined}
    >
      {/* Sparkles above M */}
      <path 
        d="M192 12 L194 17 L199 19 L194 21 L192 26 L190 21 L185 19 L190 17 Z" 
        fill="#155d27" 
      />
      <path 
        d="M206 20 L207.3 23.3 L210.6 24 L207.3 24.7 L206 28 L204.7 24.7 L201.4 24 L204.7 23.3 Z" 
        fill="#22c55e" 
        opacity="0.8" 
      />
      <path 
        d="M180 22 L181 24.5 L183.5 25 L181 25.5 L180 28 L179 25.5 L176.5 25 L179 24.5 Z" 
        fill="#22c55e" 
        opacity="0.8" 
      />

      {/* S - Clean, thick, rounded */}
      <path 
        d="M32 50 C32 38 42 32 54 32 C66 32 74 38 74 46 H62 C62 42 59 41 54 41 C48 41 45 44 45 50 C45 56 50 58 58 61 C68 64 76 69 76 78 C76 89 66 94 54 94 C42 94 32 88 32 79 H44 C44 83 48 85 54 85 C60 85 64 82 64 78 C64 73 59 71 50 68 C40 65 32 61 32 50 Z" 
        fill="#155d27" 
      />

      {/* R - Bold Red with built-in or overlaid clothes hanger */}
      <path 
        d="M86 34 H118 C131 34 139 40 139 51 C139 59 133 64 124 66 L139 92 H125 L112 68 H100 V92 H86 V34 Z M100 45 V57 H116 C121 57 125 55 125 51 C125 47 121 45 116 45 H100 Z" 
        fill="#c51b23" 
      />

      {/* White hanger overlay inside the loop of "R" */}
      <g transform="translate(101.5, 43.5) scale(0.95)">
        {/* Hanger Hook */}
        <path 
          d="M6 3 C6 1.3 4.7 0 3 0 C1.3 0 0 1.3 0 3 H1.2 C1.2 2 2 1.2 3 1.2 C4 1.2 4.8 2 4.8 3 C4.8 3.8 4.2 4.3 3.6 4.7 C3.2 5 2.8 5.3 2.5 5.8 C2.3 6.1 2.2 6.5 2.2 7 H3.4 C3.4 6.7 3.5 6.5 3.6 6.3 C3.8 6 4.1 5.8 4.5 5.5 C5.3 5 6 4.2 6 3 Z" 
          fill="#ffffff" 
        />
        {/* Hanger Base Triangle */}
        <path 
          d="M-5 11 L3 7.5 L11 11 C11.5 11.2 11.7 11.8 11.4 12.3 C11.2 12.7 10.7 12.9 10.3 12.9 H-4.3 C-4.8 12.9 -5.3 12.7 -5.5 12.3 C-5.7 11.8 -5.5 11.2 -5 11 Z M3 8.8 L-3.5 11.7 H9.5 L3 8.8 Z" 
          fill="#ffffff" 
        />
      </g>

      {/* M - Clean Forest Green */}
      <path 
        d="M149 34 H162 L175 57 L188 34 H201 V92 H189 V60 L179 80 H171 L161 60 V92 H149 V34 Z" 
        fill="#155d27" 
      />

      {/* DRY CLEANERS - Bold Charcoal */}
      <text 
        x="120" 
        y="112" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="800" 
        fontSize="17.5" 
        letterSpacing="4" 
        fill="#111827" 
        textAnchor="middle"
      >
        DRY CLEANERS
      </text>

      {/* Divider lines + Tagline: FRESH. CLEAN. PERFECT. */}
      {/* Left line */}
      <line x1="28" y1="124" x2="68" y2="124" stroke="#d1d5db" strokeWidth="1.5" />
      
      {/* Center Tagline */}
      <text 
        x="120" 
        y="126" 
        fontFamily="system-ui, -apple-system, sans-serif" 
        fontWeight="bold" 
        fontSize="6.5" 
        letterSpacing="1" 
        textAnchor="middle"
      >
        <tspan fill="#155d27">FRESH</tspan>
        <tspan fill="#d1d5db"> • </tspan>
        <tspan fill="#111827">CLEAN</tspan>
        <tspan fill="#d1d5db"> • </tspan>
        <tspan fill="#c51b23">PERFECT</tspan>
      </text>

      {/* Right line */}
      <line x1="172" y1="124" x2="212" y2="124" stroke="#d1d5db" strokeWidth="1.5" />
    </svg>
  );
}
