import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, ChevronRight, Menu, X } from 'lucide-react';

const Navbar = ({ showBack = false, title = "", breadcrumbs = [] }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', action: () => {
      if (window.location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
      }
    }},
    { label: 'About', targetId: 'about-section' },
    { label: 'Services', targetId: 'services-section' },
    { label: 'Locations', targetId: 'branches-section' },
    { label: 'Enquiry', targetId: 'enquiry-section' },
  ];

  const handleNavClick = (link) => {
    setIsMenuOpen(false);
    if (link.targetId) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(link.targetId);
          if (element) {
            const offset = 80; // height of navbar
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
          }
        }, 150);
      } else {
        const element = document.getElementById(link.targetId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    } else if (link.action) {
      link.action();
    }
  };

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      // Only hide navbar on mobile screens (width < 992px)
      if (window.innerWidth >= 992) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;
      
      // If we scroll down, hide navbar. If we scroll up, show navbar.
      // Always show at the top of the page.
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [lastScrollY]);

  return (
    <header className="navbar navbar-expand-lg fixed-top" style={{
      background: 'var(--primary-dark) ',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      padding: '0.5rem 0',
      zIndex: 1000,
      width: '100%',
      transform: isVisible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.3s ease-in-out',
    }}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex align-items-center justify-content-between w-100">
          {/* Brand/Logo */}
          <div className="d-flex align-items-center">
            <div
              className="d-flex align-items-center"
              style={{ gap: '0.75rem', cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <img
                src="/logo.png"
                alt="TBR Technologies Logo"
                className="navbar-logo"
              />
              <div>
                <h1 className="navbar-title">
                  TBR <span className="navbar-title-groups">Groups</span>
                </h1>
                <p className="d-none d-sm-block" style={{ fontSize: '0.55rem', color: 'white', margin: 0, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  Complete Service Solution
                </p>
              </div>
            </div>

            {breadcrumbs.length > 0 && (
              <div className="d-none d-md-flex align-items-center gap-2 ms-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                <ChevronRight size={14} />
                <span style={{ color: '#ffc107' }}>{title}</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation - Fill Fully */}
          <div className="d-none d-lg-flex align-items-center justify-content-evenly" style={{ flex: 1, padding: '0 4rem' }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link)}
                className="nav-link-custom"
                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1rem', fontWeight: 500, transition: 'color 0.2s', padding: '0.5rem 1rem' }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Section - Minimal weight to allow links to fill */}
          <div className="d-flex align-items-center justify-content-end">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="d-lg-none p-2"
              style={{ background: 'none', border: 'none', color: 'white' }}
              aria-label="Toggle Navigation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div style={{
        position: 'absolute',
        top: 'calc(100% + 10px)',
        left: '1rem',
        right: '1rem',
        maxHeight: '80vh',
        background: 'rgba(3, 30, 1, 0.95)',
        backdropFilter: 'blur(30px)',
        zIndex: 999,
        display: isMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        padding: '1.5rem',
        gap: '1rem',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
        overflowY: 'auto',
        transition: 'all 0.3s ease-in-out'
      }}>
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={() => handleNavClick(link)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.1rem',
              fontWeight: 500,
              textAlign: 'left',
              padding: '0.75rem 0.5rem',
              borderRadius: 'var(--radius-md)',
              transition: 'background 0.2s',
              borderBottom: '1px solid rgba(255,255,255,0.03)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            {link.label}
          </button>
        ))}
        
        <div className="mt-auto pb-4">
          <a
            href="https://maps.app.goo.gl/7PXWkGWX1mC7zNzr9"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary d-flex align-items-center justify-content-center gap-2"
            style={{
              padding: '1rem',
              fontSize: '1rem',
              borderRadius: 'var(--radius-lg)',
              background: 'linear-gradient(135deg, var(--accent-gold) 0%, #b8943f 100%)',
              border: 'none',
              width: '100%'
            }}
            onClick={() => setIsMenuOpen(false)}
          >
            Visit Us <MapPin size={20} />
          </a>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
