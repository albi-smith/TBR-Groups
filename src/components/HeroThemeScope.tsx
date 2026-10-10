import React from 'react';
import { ShieldCheck } from '@phosphor-icons/react/ssr';
import Navbar from './Navbar';
import { ESTABLISHED_YEAR } from '../data/siteConfig';

const HeroThemeScope = ({ children }: { children: React.ReactNode }) => (
  <div className="tbr-theme-scope">
    <Navbar />
    {children}
  </div>
);

/** Hero "Trusted Service Partner Since …" badge. */
export const HeroThemeBadge = () => (
  <span className="tbr-hero-badge">
    <ShieldCheck size={14} />
    Trusted Service Partner Since {ESTABLISHED_YEAR}
  </span>
);

export default HeroThemeScope;