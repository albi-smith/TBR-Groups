import React from 'react';

interface ServiceIconProps {
  slug: string;
  className?: string;
}

const ICONS: Record<string, React.ReactNode> = {
  /* ── Tech & Software ── */
  'digital-solutions': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ds-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="ds-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaf3ea" />
          <stop offset="100%" stopColor="#cde8d4" />
        </linearGradient>
        <linearGradient id="ds-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
      </defs>
      <ellipse cx="118" cy="172" rx="58" ry="12" fill="rgba(27,92,30,0.18)" />
      <rect x="52" y="34" width="122" height="88" rx="12" fill="url(#ds-body)" />
      <rect x="52" y="34" width="122" height="88" rx="12" fill="url(#ds-body)" stroke="#0f3f12" strokeWidth="1.5" />
      <rect x="66" y="48" width="94" height="60" rx="6" fill="url(#ds-screen)" />
      <rect x="66" y="48" width="94" height="60" rx="6" stroke="#0f3f12" strokeOpacity="0.3" />
      <g stroke="#237227" strokeWidth="4" strokeLinecap="round">
        <path d="M78 68h28M78 80h40M78 92h22" />
      </g>
      <rect x="104" y="126" width="18" height="12" rx="3" fill="url(#ds-body)" />
      <rect x="92" y="140" width="42" height="8" rx="4" fill="#237227" />
      <circle cx="172" cy="58" r="24" fill="url(#ds-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M163 58l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  'computer-accessories': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ca-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3aa155" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="ca-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaf3ea" />
          <stop offset="100%" stopColor="#b7dfc3" />
        </linearGradient>
        <linearGradient id="ca-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
      </defs>
      <ellipse cx="120" cy="176" rx="52" ry="11" fill="rgba(27,92,30,0.18)" />
      <rect x="66" y="28" width="80" height="88" rx="14" fill="url(#ca-body)" stroke="#0f3f12" strokeWidth="1.5" />
      <rect x="66" y="28" width="80" height="88" rx="14" fill="url(#ca-body)" />
      <rect x="82" y="44" width="48" height="36" rx="5" fill="url(#ca-light)" stroke="#0f3f12" strokeOpacity="0.25" />
      <circle cx="118" cy="60" r="9" fill="url(#ca-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <rect x="90" y="76" width="32" height="4" rx="2" fill="#0f3f12" opacity="0.45" />
      <rect x="90" y="84" width="24" height="4" rx="2" fill="#0f3f12" opacity="0.35" />
      <rect x="96" y="120" width="20" height="12" rx="3" fill="url(#ca-body)" />
      <rect x="82" y="134" width="48" height="8" rx="4" fill="#237227" />
      <rect x="148" y="54" width="42" height="24" rx="8" fill="url(#ca-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M163 58l6 6 12-13" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  'mobile-accessories': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ma-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3aa155" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="ma-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4faf3" />
          <stop offset="100%" stopColor="#cde8d4" />
        </linearGradient>
        <linearGradient id="ma-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
      </defs>
      <ellipse cx="118" cy="178" rx="50" ry="11" fill="rgba(27,92,30,0.18)" />
      <rect x="72" y="30" width="70" height="128" rx="18" fill="url(#ma-body)" stroke="#0f3f12" strokeWidth="1.5" />
      <rect x="80" y="42" width="54" height="104" rx="12" fill="url(#ma-screen)" stroke="#0f3f12" strokeOpacity="0.2" />
      <g stroke="#237227" strokeWidth="4" strokeLinecap="round">
        <path d="M94 60h26M94 74h26M94 88h18" />
      </g>
      <rect x="100" y="112" width="14" height="4" rx="2" fill="#237227" opacity="0.5" />
      <rect x="104" y="142" width="6" height="6" rx="3" fill="#237227" />
      <circle cx="182" cy="64" r="26" fill="url(#ma-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M182 52v24M170 64h24" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),

  /* ── Govt & Finance ── */
  'csc': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="csc-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="csc-roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaf3ea" />
          <stop offset="100%" stopColor="#b7dfc3" />
        </linearGradient>
        <linearGradient id="csc-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
      </defs>
      <ellipse cx="118" cy="174" rx="58" ry="12" fill="rgba(27,92,30,0.18)" />
      <rect x="54" y="66" width="112" height="96" rx="8" fill="url(#csc-body)" stroke="#0f3f12" strokeWidth="1.5" />
      <rect x="58" y="62" width="104" height="10" rx="5" fill="#237227" />
      <path d="M40 70l70-34 70 34" fill="url(#csc-roof)" stroke="#0f3f12" strokeWidth="2" strokeLinejoin="round" />
      <rect x="74" y="86" width="26" height="46" rx="3" fill="url(#csc-roof)" stroke="#0f3f12" strokeOpacity="0.25" />
      <rect x="112" y="86" width="34" height="46" rx="3" fill="url(#csc-roof)" stroke="#0f3f12" strokeOpacity="0.25" />
      <path d="M129 100l8 8-8 8M117 116l-8-8 8-8" stroke="#1b5c1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="104" y="136" width="12" height="10" rx="3" fill="#0f3f12" opacity="0.4" />
      <circle cx="184" cy="48" r="24" fill="url(#csc-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M175 48l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  'document-registration': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="dr-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="dr-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcefe0" />
        </linearGradient>
        <linearGradient id="dr-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="dr-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#dr-shadow)">
        <path d="M86 30h44l26 26v114a6 6 0 01-6 6H86a6 6 0 01-6-6V36a6 6 0 016-6z" fill="url(#dr-paper)" stroke="#0f3f12" strokeWidth="1.5" />
        <path d="M130 30l26 26h-26z" fill="#b7dfc3" stroke="#0f3f12" strokeWidth="1" />
      </g>
      <g stroke="#237227" strokeWidth="4" strokeLinecap="round">
        <path d="M96 74h40M96 86h52M96 98h34" />
      </g>
      <rect x="96" y="112" width="56" height="34" rx="6" fill="url(#dr-body)" stroke="#0f3f12" strokeWidth="1.2" />
      <circle cx="124" cy="129" r="9" fill="url(#dr-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M119 129l3 3 6-7" stroke="#1b5c1e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="186" cy="52" r="24" fill="url(#dr-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M177 52l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  'ticket-booking': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="tb-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="tb-ticket" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcefe0" />
        </linearGradient>
        <linearGradient id="tb-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="tb-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#tb-shadow)">
        <path d="M56 66h104a10 10 0 010 20h-8a6 6 0 000 12h8a10 10 0 010 20H56a10 10 0 010-20h8a6 6 0 000-12h-8a10 10 0 010-20z" fill="url(#tb-ticket)" stroke="#0f3f12" strokeWidth="1.5" />
        <g stroke="#237227" strokeWidth="4" strokeLinecap="round">
          <path d="M74 84h34M74 100h34M74 116h34" />
        </g>
        <circle cx="128" cy="100" r="14" fill="url(#tb-gold)" stroke="#c99f37" strokeWidth="1.5" />
        <path d="M121 100l5 5 10-11" stroke="#1b5c1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <rect x="154" y="142" width="56" height="18" rx="9" fill="url(#tb-body)" />
    </svg>
  ),

  'insurance': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="in-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="in-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="in-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0f3f12" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#in-shadow)">
        <path d="M110 34c22 10 40 14 50 14v38c0 36-20 60-50 80-30-20-50-44-50-80V48c10 0 28-4 50-14z" fill="url(#in-body)" stroke="#0f3f12" strokeWidth="2" />
        <path d="M110 48c16 8 30 11 40 11v27c0 28-15 48-40 64-25-16-40-36-40-64V59c10 0 24-3 40-11z" fill="rgba(255,255,255,0.12)" />
      </g>
      <path d="M88 110l15 15 30-32" stroke="url(#in-gold)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="186" cy="48" r="24" fill="url(#in-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M177 48l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  'banking': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="bn-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="bn-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaf3ea" />
          <stop offset="100%" stopColor="#b7dfc3" />
        </linearGradient>
        <linearGradient id="bn-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="bn-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.3" />
        </filter>
      </defs>
      <ellipse cx="118" cy="176" rx="58" ry="12" fill="rgba(27,92,30,0.18)" />
      <g filter="url(#bn-shadow)">
        <path d="M50 66l68-36 68 36z" fill="url(#bn-light)" stroke="#0f3f12" strokeWidth="2" strokeLinejoin="round" />
        <rect x="58" y="76" width="120" height="86" rx="6" fill="url(#bn-body)" stroke="#0f3f12" strokeWidth="1.5" />
        <rect x="66" y="84" width="22" height="52" rx="3" fill="url(#bn-light)" stroke="#0f3f12" strokeOpacity="0.25" />
        <rect x="94" y="84" width="22" height="52" rx="3" fill="url(#bn-light)" stroke="#0f3f12" strokeOpacity="0.25" />
        <rect x="122" y="84" width="22" height="52" rx="3" fill="url(#bn-light)" stroke="#0f3f12" strokeOpacity="0.25" />
        <rect x="150" y="84" width="22" height="52" rx="3" fill="url(#bn-light)" stroke="#0f3f12" strokeOpacity="0.25" />
        <circle cx="118" cy="112" r="11" fill="url(#bn-gold)" stroke="#c99f37" strokeWidth="1.5" />
        <path d="M111 112l5 5 9-10" stroke="#1b5c1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="80" y="142" width="76" height="8" rx="4" fill="#0f3f12" opacity="0.35" />
      </g>
    </svg>
  ),

  'postal': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="po-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="po-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcefe0" />
        </linearGradient>
        <linearGradient id="po-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="po-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#po-shadow)">
        <path d="M52 56h120a8 8 0 018 8v72a8 8 0 01-8 8H52a8 8 0 01-8-8V64a8 8 0 018-8z" fill="url(#po-paper)" stroke="#0f3f12" strokeWidth="1.5" />
        <path d="M46 66l76 54 76-54" stroke="#237227" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M46 64l76 54 76-54" fill="url(#po-body)" opacity="0.1" />
      </g>
      <circle cx="140" cy="112" r="22" fill="url(#po-gold)" stroke="#c99f37" strokeWidth="2" />
      <path d="M132 110l6 6 12-12" stroke="#1b5c1e" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="172" y="150" width="44" height="16" rx="8" fill="url(#po-body)" />
    </svg>
  ),

  'business-registration': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="br-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="br-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eaf3ea" />
          <stop offset="100%" stopColor="#b7dfc3" />
        </linearGradient>
        <linearGradient id="br-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="br-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.32" />
        </filter>
      </defs>
      <g filter="url(#br-shadow)">
        <rect x="52" y="58" width="120" height="90" rx="12" fill="url(#br-body)" stroke="#0f3f12" strokeWidth="2" />
        <path d="M80 58v-10a8 8 0 018-8h24a8 8 0 018 8v10" fill="url(#br-light)" stroke="#0f3f12" strokeWidth="2" />
        <rect x="80" y="48" width="44" height="10" rx="5" fill="url(#br-light)" />
        <rect x="66" y="72" width="92" height="62" rx="8" fill="url(#br-light)" stroke="#0f3f12" strokeOpacity="0.25" />
        <circle cx="112" cy="103" r="16" fill="url(#br-gold)" stroke="#c99f37" strokeWidth="2" />
        <path d="M103 103l6 6 11-12" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <rect x="84" y="132" width="56" height="8" rx="4" fill="#0f3f12" opacity="0.25" />
      </g>
      <circle cx="186" cy="46" r="24" fill="url(#br-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M177 46l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  /* ── Retail & Essentials ── */
  'project-binding': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="pb-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="pb-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dcefe0" />
        </linearGradient>
        <linearGradient id="pb-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="pb-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.32" />
        </filter>
      </defs>
      <g filter="url(#pb-shadow)">
        <rect x="60" y="46" width="44" height="100" rx="6" fill="#237227" stroke="#0f3f12" strokeWidth="1.5" />
        <rect x="112" y="56" width="44" height="100" rx="6" fill="url(#pb-body)" stroke="#0f3f12" strokeWidth="1.5" />
        <rect x="68" y="56" width="28" height="14" rx="3" fill="url(#pb-gold)" />
        <rect x="68" y="78" width="28" height="14" rx="3" fill="url(#pb-gold)" />
        <rect x="68" y="100" width="28" height="14" rx="3" fill="url(#pb-gold)" />
        <rect x="120" y="66" width="28" height="14" rx="3" fill="url(#pb-paper)" />
        <rect x="120" y="88" width="28" height="14" rx="3" fill="url(#pb-paper)" />
        <rect x="120" y="110" width="28" height="14" rx="3" fill="url(#pb-paper)" />
      </g>
      <path d="M78 148h64" stroke="#1b5c1e" strokeWidth="10" strokeLinecap="round" />
      <circle cx="184" cy="48" r="24" fill="url(#pb-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M175 48l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  'stationary': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="st-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3aa155" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="st-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="st-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#st-shadow)">
        <path d="M148 36l28 28-6 6-28-28 6-6z" fill="url(#st-gold)" stroke="#c99f37" strokeWidth="1.5" />
        <path d="M138 46l28 28L88 152l-28-8 8-28 70-70z" fill="url(#st-body)" stroke="#0f3f12" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M136 48l24 24-6 6-24-24 6-6z" fill="url(#st-gold)" />
        <rect x="62" y="140" width="40" height="8" rx="4" fill="#0f3f12" opacity="0.35" transform="rotate(-8 82 144)" />
        <path d="M52 152l10 12 12 6" stroke="#1b5c1e" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
      <circle cx="180" cy="100" r="24" fill="url(#st-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M171 100l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),

  'journals-books': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="jb-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2f8f46" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="jb-light" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#cde8d4" />
        </linearGradient>
        <linearGradient id="jb-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="jb-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.32" />
        </filter>
      </defs>
      <g filter="url(#jb-shadow)">
        <rect x="52" y="52" width="120" height="30" rx="6" fill="url(#jb-body)" stroke="#0f3f12" strokeWidth="1.5" transform="rotate(-4 112 67)" />
        <rect x="60" y="56" width="26" height="22" rx="3" fill="url(#jb-light)" opacity="0.6" />
        <rect x="96" y="52" width="120" height="30" rx="6" fill="#237227" stroke="#0f3f12" strokeWidth="1.5" transform="rotate(3 156 67)" />
        <rect x="103" y="56" width="26" height="22" rx="3" fill="url(#jb-light)" opacity="0.6" />
        <rect x="76" y="86" width="120" height="34" rx="6" fill="url(#jb-light)" stroke="#0f3f12" strokeWidth="1.5" transform="rotate(-2 136 103)" />
        <rect x="90" y="94" width="60" height="6" rx="3" fill="#237227" opacity="0.4" />
        <rect x="90" y="106" width="44" height="6" rx="3" fill="#237227" opacity="0.4" />
        <circle cx="156" cy="120" r="13" fill="url(#jb-gold)" stroke="#c99f37" strokeWidth="1.5" />
        <path d="M150 120l4 4 8-9" stroke="#1b5c1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  ),

  'organic-foods': (
    <svg viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="of-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3aa155" />
          <stop offset="100%" stopColor="#1b5c1e" />
        </linearGradient>
        <linearGradient id="of-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7dcc8f" />
          <stop offset="100%" stopColor="#2f8f46" />
        </linearGradient>
        <linearGradient id="of-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffe3a8" />
          <stop offset="100%" stopColor="#e6b94e" />
        </linearGradient>
        <filter id="of-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0f3f12" floodOpacity="0.32" />
        </filter>
      </defs>
      <g filter="url(#of-shadow)">
        <circle cx="112" cy="104" r="52" fill="url(#of-leaf)" stroke="#0f3f12" strokeWidth="2" />
        <path d="M112 54c22 14 34 30 34 50s-14 36-34 50c-20-14-34-30-34-50s12-36 34-50z" fill="url(#of-body)" opacity="0.18" />
        <path d="M112 56v98M112 64c-14 6-24 14-28 24M112 64c14 6 24 14 28 24" stroke="#1b5c1e" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M112 104c-10 0-18-3-24-9M112 92c8 0 15 3 20 9" stroke="#1b5c1e" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
        <path d="M96 100c0-6 8-12 16-14M124 108c-6 4-16 4-24 0" stroke="#0f3f12" strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.45" />
        <circle cx="112" cy="150" r="10" fill="url(#of-gold)" stroke="#c99f37" strokeWidth="1.5" />
      </g>
      <circle cx="184" cy="52" r="24" fill="url(#of-gold)" stroke="#c99f37" strokeWidth="1.5" />
      <path d="M175 52l7 7 13-14" stroke="#1b5c1e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
};

export default function ServiceIcon({ slug, className }: ServiceIconProps) {
  return <span className={`service-icon ${className ?? ''}`}>{ICONS[slug] ?? ICONS['digital-solutions']}</span>;
}