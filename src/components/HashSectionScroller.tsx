'use client';

import { useEffect } from 'react';

export default function HashSectionScroller() {
  useEffect(() => {
    const targetId = window.location.hash.replace('#', '');
    if (!targetId) return;

    const run = () => {
      const el = document.getElementById(targetId);
      if (!el) return false;
      // Match the services page "Browse Services" scroll (which sits the first
      // service card just below the fixed navbar). Other anchors use a tighter offset.
      const offset = targetId.startsWith('esh-list-')
        ? 130
        : window.innerWidth < 992
          ? 72
          : 64;
      const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
      return true;
    };

    // Retry until the target exists and we scroll, in case client-side
    // content (e.g. async-mounted sections) isn't in the DOM yet.
    let attempts = 0;
    const attemptsMax = 25;
    const interval = setInterval(() => {
      attempts += 1;
      if (run() || attempts >= attemptsMax) {
        clearInterval(interval);
      }
    }, 120);

    const t1 = setTimeout(run, 80);
    return () => {
      clearTimeout(t1);
      clearInterval(interval);
    };
  }, []);

  return null;
}
