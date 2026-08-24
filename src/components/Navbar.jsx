import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, Menu, X } from 'lucide-react';
import Picture from './Picture';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', targetId: 'about-section' },
  { label: 'Services', targetId: 'services-section' },
  { label: 'Locations', targetId: 'branches-section' },
];

const SCROLL_THRESHOLD = 80;

const Navbar = ({ showBack = false, title = "", breadcrumbs = [] }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  const scrollToSection = useCallback((targetId, delay = 0) => {
    const offset = 80;
    const run = () => {
      const el = document.getElementById(targetId);
      if (el) {
        const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
      }
    };
    if (delay > 0) setTimeout(run, delay);
    else run();
  }, []);

  const handleNavClick = useCallback((link) => {
    setIsMenuOpen(false);
    if (link.targetId) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(link.targetId, 150), 50);
      } else {
        scrollToSection(link.targetId);
      }
    }
  }, [navigate, scrollToSection]);

  const handleEnquiryClick = useCallback(() => {
    setIsMenuOpen(false);
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => scrollToSection('enquiry-section', 150), 50);
    } else {
      scrollToSection('enquiry-section');
    }
  }, [navigate, scrollToSection]);

  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > SCROLL_THRESHOLD);

      if (window.innerWidth >= 992) {
        setIsFloating(false);
        setIsHidden(false);
        lastY = y;
        return;
      }
      if (y <= 4) {
        setIsFloating(false);
        setIsHidden(false);
      } else {
        setIsFloating(true);
        setIsHidden(y > lastY);
      }
      lastY = y;
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
        className={`tbr-navbar ${isScrolled ? 'tbr-navbar--scrolled' : ''} ${isFloating ? 'tbr-navbar--floating' : ''} ${isHidden ? 'tbr-navbar--hidden' : ''}`}
      >
        <nav className="tbr-navbar-inner">

        {/* Brand */}
        <Link to="/" className="tbr-brand">
          <Picture
            src="/logo.png"
            alt="TBR Groups Logo"
            className="tbr-brand-logo"
          />
          <div className="d-flex flex-column">
            <span className="tbr-brand-title">
              <span className="tbr-brand-tbr">TBR</span>
              <span className="tbr-brand-groups">Groups</span>
            </span>
          </div>
        </Link>

        {breadcrumbs.length > 0 && (
          <div className="tbr-nav-crumbs d-none d-lg-flex align-items-center gap-2">
            <ChevronRight size={14} />
            <span>{title}</span>
          </div>
        )}

        {/* Desktop Nav Links */}
        <div className="tbr-nav-links">
          {NAV_LINKS.map((link) =>
            link.to ? (
              <Link key={link.label} to={link.to} className="tbr-nav-link">
                {link.label}
              </Link>
            ) : (
              <button key={link.label} onClick={() => handleNavClick(link)} className="tbr-nav-link">
                {link.label}
              </button>
            )
          )}
        </div>

        {/* Desktop CTA: Contact Us pill */}
        <button onClick={handleEnquiryClick} className="tbr-nav-cta">
          Contact Us
          <span className="tbr-nav-cta-icon">
            <ArrowRight size={12} />
          </span>
        </button>

        {/* Hamburger (mobile) */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="tbr-nav-hamburger d-lg-none"
          aria-label="Open menu"
        >
          <Menu size={26} />
        </button>
      </nav>
      </header>

      {/* Mobile Menu (slide-in overlay) — sibling of header so fixed positioning is viewport-relative */}
      <div
        className={`tbr-mobile-menu d-lg-none ${isMenuOpen ? 'tbr-mobile-menu--open' : ''}`}
        aria-hidden={!isMenuOpen}
      >
        <button onClick={() => setIsMenuOpen(false)} className="tbr-mobile-close" aria-label="Close menu">
          <X size={24} />
        </button>

        {NAV_LINKS.map((link) =>
          link.to ? (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="tbr-mobile-link"
            >
              {link.label}
            </Link>
          ) : (
            <button key={link.label} onClick={() => handleNavClick(link)} className="tbr-mobile-link">
              {link.label}
            </button>
          )
        )}

        <button onClick={handleEnquiryClick} className="tbr-mobile-cta">
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
