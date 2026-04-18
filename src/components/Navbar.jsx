import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, ArrowLeft, ChevronRight } from 'lucide-react';

const Navbar = ({ showBack = false, title = "", breadcrumbs = [] }) => {
  const navigate = useNavigate();

  return (
    <header className="navbar navbar-expand-lg sticky-top" style={{
      background: 'rgba(6, 8, 13, 0.75)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle)',
      padding: '0.85rem 0',
      zIndex: 1000
    }}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center gap-3">
            {showBack && (
              <button
                onClick={() => navigate('/')}
                className="btn d-flex align-items-center gap-2"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.5rem 1rem',
                  color: 'var(--text-secondary)',
                  fontSize: '0.85rem',
                  transition: 'all var(--transition-base)',
                }}
              >
                <ArrowLeft size={16} /> <span className="d-none d-sm-inline">Home</span>
              </button>
            )}
            
            <div className="d-flex align-items-center gap-2">
              <div className="d-flex align-items-center" style={{ gap: '0.75rem' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--accent-gold) 0%, #004cd9 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem',
                  color: '#ffffff',
                  boxShadow: '0 2px 12px rgba(0, 102, 255, 0.3)',
                }}>
                  T
                </div>
                <div>
                  <h1 style={{
                    fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 800,
                    margin: 0, letterSpacing: '-0.3px', lineHeight: 1.2, color: 'white',
                  }}>
                    TBR <span style={{
                      background: 'linear-gradient(135deg, var(--accent-gold), var(--accent-gold-light))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>Groups</span>
                  </h1>
                  <p className="d-none d-sm-block" style={{ fontSize: '0.55rem', color: 'white', margin: 0, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                    Complete Service Solution
                  </p>
                </div>
              </div>
            </div>

            {breadcrumbs.length > 0 && (
              <div className="d-none d-md-flex align-items-center gap-2 ms-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                <ChevronRight size={14} />
                <span style={{ color: 'var(--text-secondary)' }}>{title}</span>
              </div>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 gap-md-3">
            <a href="tel:8300426612" className="d-flex align-items-center text-decoration-none" style={{
              gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem',
            }}>
              <Phone size={15} style={{ color: 'var(--accent-gold)' }} />
              <span className="d-none d-lg-inline"></span>
            </a>
            
            <a href="https://wa.me/919952773759" className="d-flex align-items-center text-decoration-none" style={{
              gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem',
            }}>
              <MessageCircle size={16} style={{ color: 'var(--accent-gold)' }} />
            </a>
             
            <a
              href="https://www.google.com/maps?q=8.306525,77.222292"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary d-none d-sm-flex align-items-center gap-2"
              style={{ 
                padding: '0.55rem 1.25rem', 
                fontSize: '0.8rem',
                borderRadius: 'var(--radius-full)',
                background: 'linear-gradient(135deg, var(--accent-gold) 0%, #b8943f 100%)',
                border: 'none'
              }}
            >
              Visit Us <MapPin size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
