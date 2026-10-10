'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CaretDown } from '@phosphor-icons/react/ssr';
import Picture from './Picture';
import { useNavbar } from './NavbarContext';
import { SERVICE_MENU } from '../data/serviceMenu';

interface NavbarProps {
  showBack?: boolean;
  title?: string;
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
  { label: 'Locations', to: '/locations' },
];

const SCROLL_THRESHOLD = 80;

const Navbar = ({ showBack = false, title = "" }: NavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMenuCat, setActiveMenuCat] = useState<string | null>(SERVICE_MENU[0]?.id ?? null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileOpenCat, setMobileOpenCat] = useState<string | null>(null);
  const ddTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { filterTabs, activeFilter, onFilterChange } = useNavbar();
  const navFilterScrollRef = useRef<HTMLDivElement>(null);

  const isPhotoHero = typeof pathname === 'string' && pathname.startsWith('/service/');

  const openDropdown = useCallback(() => {
    if (ddTimerRef.current) clearTimeout(ddTimerRef.current);
    setDropdownOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (ddTimerRef.current) clearTimeout(ddTimerRef.current);
    ddTimerRef.current = setTimeout(() => setDropdownOpen(false), 120);
  }, []);

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
        router.push(`/#${link.targetId}`);
      } else {
        scrollToSection(link.targetId);
      }
    }
  }, [pathname, router, scrollToSection]);

  const handleEnquiryClick = useCallback(() => {
    setIsMenuOpen(false);
    router.push('/contact');
  }, [router]);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const desktop = window.innerWidth >= 992;
      setIsDesktop(desktop);
      setIsScrolled(y > SCROLL_THRESHOLD);
      if (desktop) {
        setIsFloating(false);
        return;
      }
      setIsFloating(y > SCROLL_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Auto-scroll the navbar tab row so the active tab is visible (loop/wrap-around)
  useEffect(() => {
    if (window.innerWidth >= 992) return;
    const container = navFilterScrollRef.current;
    if (!container) return;
    const labels = container.querySelectorAll<HTMLElement>('.service-chip');
    const activeIdx = filterTabs.findIndex((f) => f.id === activeFilter);
    if (activeIdx < 0) return;
    const isLastTab = activeIdx === filterTabs.length - 1;
    if (isLastTab) {
      // Loop: scroll to the far right end so "All" (first tab) emerges from the left
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
    } else if (labels[activeIdx]) {
      container.scrollTo({ left: labels[activeIdx].offsetLeft, behavior: 'smooth' });
    }
  }, [activeFilter, filterTabs, isFloating]);

  useEffect(() => {
    const { body } = document;
    if (isMenuOpen) {
      const prevOverflow = body.style.overflow;
      body.style.overflow = 'hidden';
      return () => { body.style.overflow = prevOverflow; };
    }
  }, [isMenuOpen]);

  const showTabsInNav = filterTabs.length > 0 && !isDesktop && isFloating;

  return (
    <>
      <header
        className={`tbr-navbar ${isScrolled ? 'tbr-navbar--scrolled' : ''} ${isFloating ? 'tbr-navbar--floating' : ''} ${isPhotoHero ? 'tbr-navbar--photo-hero' : ''}`}
      >
        <nav className="tbr-navbar-inner">
          <Link href="/" onClick={handleBrandClick} className="tbr-brand">
            <Picture src="/logo.png" alt="TBR Groups Logo" className="tbr-brand-logo" fetchPriority="high" />
            <div className="d-flex flex-column">
              <span className="tbr-brand-title">
                <span className="tbr-brand-tbr">TBR</span>
                <span className="tbr-brand-groups">Groups</span>
              </span>
            </div>
          </Link>

          <div className="tbr-nav-links">
            {NAV_LINKS.map((link) => {
              if (link.label === 'Services') {
                return (
                  <div
                    key={link.label}
                    className={`tbr-services-dd ${dropdownOpen ? 'is-open' : ''}`}
                    onMouseLeave={scheduleClose}
                  >
                    <Link href="/services" className="tbr-nav-link tbr-services-trigger" onMouseEnter={openDropdown}>
                      Services
                    </Link>
                    <button
                      type="button"
                      className="tbr-services-toggle"
                      aria-haspopup="true"
                      aria-expanded={dropdownOpen}
                      aria-label={dropdownOpen ? 'Close services menu' : 'Open services menu'}
                      onClick={() => setDropdownOpen((o) => !o)}
                    >
                      <CaretDown size={13} className="tbr-services-caret" />
                    </button>
                    <div className="tbr-dd-panel" onMouseEnter={openDropdown} aria-hidden={!dropdownOpen}>
                      <div className="tbr-dd-head">
                        <span className="tbr-dd-head-label">Browse by category</span>
                        <Link href="/services" className="tbr-dd-all" onClick={() => setDropdownOpen(false)}>
                          All services <ArrowRight size={12} />
                        </Link>
                      </div>
                      <div className="tbr-dd-body">
                        <div className="tbr-dd-cats" role="menu">
                          {SERVICE_MENU.map((cat) => (
                            <div
                              key={cat.id}
                              role="menuitem"
                              className={`tbr-dd-cat ${activeMenuCat === cat.id ? 'is-active' : ''}`}
                              onMouseEnter={() => setActiveMenuCat(cat.id)}
                            >
                              <Link href={`/services?cat=${cat.id}`} className="tbr-dd-cat-label" onClick={() => setDropdownOpen(false)}>
                                {cat.label}
                              </Link>
                              <button
                                type="button"
                                className="tbr-dd-cat-toggle"
                                aria-expanded={activeMenuCat === cat.id}
                                aria-label={`Open the ${cat.label} services`}
                                onClick={() => setActiveMenuCat(cat.id)}
                              >
                                <CaretDown size={12} className="tbr-dd-cat-caret" />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="tbr-dd-svc">
                          {(() => {
                            const cat = SERVICE_MENU.find((c) => c.id === activeMenuCat) ?? SERVICE_MENU[0];
                            if (!cat) return null;
                            return (
                              <ul className="tbr-dd-svc-list">
                                {cat.services.map((s) => (
                                  <li key={s.href}>
                                    <Link href={s.href} className="tbr-dd-link" onClick={() => setDropdownOpen(false)}>{s.title}</Link>
                                  </li>
                                ))}
                              </ul>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return link.to ? (
                <Link key={link.label} href={link.to} onClick={link.to === '/' ? handleBrandClick : undefined} className="tbr-nav-link">{link.label}</Link>
              ) : (
                <button key={link.label} type="button" onClick={() => handleNavClick(link)} className="tbr-nav-link">{link.label}</button>
              );
            })}
          </div>

          <button type="button" onClick={handleEnquiryClick} className="tbr-nav-cta">
            Contact Us
            <span className="tbr-nav-cta-icon"><ArrowRight size={12} /></span>
          </button>

          <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`tbr-nav-hamburger d-lg-none ${isMenuOpen ? 'is-open' : ''}`} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            <span className="tbr-hamburger-bar tbr-hamburger-bar--top"></span>
            <span className="tbr-hamburger-bar tbr-hamburger-bar--mid"></span>
            <span className="tbr-hamburger-bar tbr-hamburger-bar--bot"></span>
          </button>
        </nav>

        {showTabsInNav && (
          <div className="tbr-nav-filter-row">
            <div className="tbr-nav-filter-scroll" role="group" aria-label="Filter services by category" ref={navFilterScrollRef}>
              {filterTabs.map((tab) => (
                <React.Fragment key={tab.id}>
                  <input
                    type="radio"
                    name="service-filter-nav"
                    id={`nav-filter-${tab.id}`}
                    className="service-filter-input"
                    checked={activeFilter === tab.id}
                    onChange={() => onFilterChange(tab.id)}
                  />
                  <label className="service-chip" htmlFor={`nav-filter-${tab.id}`}>
                    {tab.label}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <div className={`tbr-mobile-menu d-lg-none ${isMenuOpen ? 'tbr-mobile-menu--open' : ''}`} aria-hidden={!isMenuOpen}>
          {NAV_LINKS.map((link) => {
            if (link.label === 'Services') {
              return (
                <div key={link.label} className="tbr-mobile-services" style={{ width: '100%', maxWidth: '22rem' }}>
                  <div className={`tbr-mobile-link tbr-mobile-link--dd ${mobileServicesOpen ? 'is-open' : ''}`}>
                    <button
                      type="button"
                      className="tbr-mobile-services-toggle"
                      aria-expanded={mobileServicesOpen}
                      aria-controls="tbr-mobile-services-body"
                      aria-label={mobileServicesOpen ? 'Close services menu' : 'Open services menu'}
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    >
                      <CaretDown size={14} className="tbr-mobile-caret" />
                    </button>
                    <Link href="/services" className="tbr-mobile-services-label" onClick={() => setIsMenuOpen(false)}>
                      Services
                    </Link>
                  </div>
                  {mobileServicesOpen && (
                    <div className="tbr-mobile-services-body" id="tbr-mobile-services-body">
                      <Link href="/services" className="tbr-mobile-sub-all" onClick={() => setIsMenuOpen(false)}>
                        All services <ArrowRight size={12} />
                      </Link>
                      {SERVICE_MENU.map((cat) => (
                        <div key={cat.id} className="tbr-mobile-cat">
                          <div className={`tbr-mobile-cat-trigger ${mobileOpenCat === cat.id ? 'is-open' : ''}`}>
                            <button
                              type="button"
                              className="tbr-mobile-cat-toggle"
                              aria-expanded={mobileOpenCat === cat.id}
                              aria-controls={`tbr-mobile-cat-${cat.id}`}
                              aria-label={mobileOpenCat === cat.id ? `Close the ${cat.label} services` : `Open the ${cat.label} services`}
                              onClick={() => setMobileOpenCat(mobileOpenCat === cat.id ? null : cat.id)}
                            >
                              <CaretDown size={14} className="tbr-mobile-caret" />
                            </button>
                            <Link href={`/services?cat=${cat.id}`} className="tbr-mobile-cat-label" onClick={() => setIsMenuOpen(false)}>
                              {cat.label}
                            </Link>
                          </div>
                          {mobileOpenCat === cat.id && (
                            <ul className="tbr-mobile-svc" id={`tbr-mobile-cat-${cat.id}`}>
                              {cat.services.map((s) => (
                                <li key={s.href}>
                                  <Link href={s.href} className="tbr-mobile-svc-link" onClick={() => setIsMenuOpen(false)}>
                                    {s.title}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return link.to ? (
              <Link key={link.label} href={link.to} onClick={e => { setIsMenuOpen(false); if (link.to === '/') handleBrandClick(e); }} className="tbr-mobile-link">{link.label}</Link>
            ) : (
              <button key={link.label} type="button" onClick={() => handleNavClick(link)} className="tbr-mobile-link">{link.label}</button>
            );
          })}
          <button type="button" onClick={handleEnquiryClick} className="tbr-mobile-cta">
           Contact Us
            <span className="tbr-nav-cta-icon"><ArrowRight size={12} /></span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Navbar;
