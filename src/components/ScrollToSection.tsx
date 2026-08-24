'use client';

import React from 'react';

interface ScrollToSectionProps {
  targetId: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function ScrollToSection({ targetId, className, style, children }: ScrollToSectionProps) {
  const handleClick = () => {
    const element = document.getElementById(targetId);
    if (element) {
      const offset = window.innerWidth < 992 ? 72 : 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <button type="button" onClick={handleClick} className={className} style={style}>
      {children}
    </button>
  );
}
