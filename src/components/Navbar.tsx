'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ArrowRight, Menu, X, Sun, Moon } from 'lucide-react';
import Picture from './Picture';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface NavbarProps {
  showBack?: boolean;
  title?: string;
  breadcrumbs?: (string | BreadcrumbItem)[];
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

interface NavLinkItem {
  label: string;
  to?: string;
  targetId?: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', targetId: 'about-section' },
  { label: 'Locations', targetId: 'branches-section' },
];

const SCROLL_THRESHOLD = 80;

const Navbar = ({ showBack = false, title = "", breadcrumbs = [], theme, onToggleTheme }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  // Service/sub-service template renders over a photo hero with a dark top
  // scrim — force the light-on-dark navbar palette regardless of theme scope.
  const isPhotoHero = typeof pathname === 'string' && pathname.startsWith('/service/');

  useEffect(() => {
    if (!isMenuOpen && document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [isMenuOpen]);

  const scrollToSection = useCallback((targetId: string, delay = 0) => {
    const run = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const offset = window.innerWidth < 992 ? 72 : 64;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    };
    if (delay > 0) setTimeout(run, delay);
    else run();
  }, []);

  const handleBrandClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname]);

  const handleNavClick = useCallback((link: NavLinkItem) => {
    setIsMenuOpen(false);
    if (link.targetId) {
      if (pathname !== '/') {
        router.push('/');
        setTimeout(() => scrollToSection(link.targetId!, 300), 50);
      } else {
        scrollToSection(link.targetId);
      }
    }
  }, [pathname, router, scrollToSection]);

  const handleEnquiryClick = useCallback(() => {
    setIsMenuOpen(false);
    if (pathname !== '/') {
      router.push('/');
      setTimeout(() => scrollToSection('enquiry-section', 300), 50);
    } else {
      scrollToSection('enquiry-section');
    }
  }, [pathname, router, scrollToSection]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > SCROLL_THRESHOLD);

      if (window.innerWidth >= 992) {
        setIsFloating(false);
        return;
      }
      setIsFloating(y > window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const { body } = document;
    if (isMenuOpen) {
      const prevOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
      return () => { body.style.overflow = prevOverflow; };
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`tbr-navbar ${isScrolled ? 'tbr-navbar--scrolled' : ''} ${isFloating ? 'tbr-navbar--floating' : ''} ${isPhotoHero ? 'tbr-navbar--photo-hero' : ''}`}
      >
        <nav className="tbr-navbar-inner">

        {/* ── Brand ── */}
        <Link href="/" onClick={handleBrandClick} className="tbr-brand">
          <Picture
            src="/logo.png"
            alt="TBR Groups Logo"
            className="tbr-brand-logo"
            fetchPriority="high"
          />
          <div className="d-flex flex-column">
            <span className="tbr-brand-title">
              <span className="tbr-brand-tbr">TBR</span>
              <span className="tbr-brand-groups">Groups</span>
            </span>
          </div>
        </Link>

        {/* ── Desktop Nav Links ── */}
        <div className="tbr-nav-links">
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link
                key={link.label}
                href={link.to}
                onClick={link.to === '/' ? handleBrandClick : undefined}
                className="tbr-nav-link"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link)}
                className="tbr-nav-link"
              >
                {link.label}
              </button>
            )
          )}
        </div>

        {/* ── Theme toggle — hidden (kept for future use) ── */}
        {false && theme && onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className="tbr-nav-theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            aria-pressed={theme === 'light'}
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        )}

        {/* ── Desktop CTA: Contact Us pill ── */}
        <button type="button" onClick={handleEnquiryClick} className="tbr-nav-cta">
          Contact Us
          <span className="tbr-nav-cta-icon">
            <ArrowRight size={12} />
          </span>
        </button>

        {/* ── Hamburger (mobile) ── */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(true)}
          className="tbr-nav-hamburger d-lg-none"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </nav>

      {/* ── Breadcrumb row (sub-pages) — own row below the main nav links ── */}
      {breadcrumbs.length > 0 && (
        <div className="tbr-nav-crumbs-row d-none d-lg-flex align-items-center">
          <Link href="/" className="tbr-crumb-link">Home</Link>
          {breadcrumbs.map((crumb, i) => {
            const label = typeof crumb === 'string' ? crumb : crumb.label;
            const path = typeof crumb === 'string' ? undefined : crumb.path;
            return (
              <React.Fragment key={`${label}-${i}`}>
                <ChevronRight size={13} className="tbr-crumb-sep" />
                {path ? (
                  <Link href={path} className="tbr-crumb-link">{label}</Link>
                ) : (
                  <span className="tbr-crumb-current">{label}</span>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
      </header>

      {/* ── Mobile Menu (slide-in overlay) — sibling of header so fixed positioning is viewport-relative ── */}
      <div
        className={`tbr-mobile-menu d-lg-none ${isMenuOpen ? 'tbr-mobile-menu--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <button
          type="button"
          onClick={() => setIsMenuOpen(false)}
          className="tbr-mobile-close"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {NAV_LINKS.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              href={link.to}
              onClick={e => {
                setIsMenuOpen(false);
                if (link.to === '/') handleBrandClick(e);
              }}
              className="tbr-mobile-link"
            >
              {link.label}
            </Link>
          ) : (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNavClick(link)}
              className="tbr-mobile-link"
            >
              {link.label}
            </button>
          )
        )}

        <button type="button" onClick={handleEnquiryClick} className="tbr-mobile-cta">
          Contact Us
          <span className="tbr-nav-cta-icon">
            <ArrowRight size={12} />
          </span>
        </button>
      </div>
    </>
  );
};

export default Navbar;