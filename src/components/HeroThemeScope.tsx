'use client';

import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

const THEME_KEY = 'tbr-hero-theme';

type Theme = 'dark' | 'light';

const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const t = window.localStorage.getItem(THEME_KEY);
    return t === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
};

const HeroThemeScope = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    // Force dark theme — light theme styles preserved for future re-enable
    setTheme('dark');
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(THEME_KEY, next);
      } catch {
        // storage unavailable — theme still switches for the session
      }
      return next;
    });
  };

  return (
    <div className="tbr-theme-scope" data-theme={theme} suppressHydrationWarning>
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      {children}
    </div>
  );
};

export default HeroThemeScope;
