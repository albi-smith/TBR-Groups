import { useNavigate } from 'react-router-dom';
import { Phone, MapPin, MessageCircle, ChevronRight } from 'lucide-react';

const Navbar = ({ showBack = false, title = "", breadcrumbs = [] }) => {
  const navigate = useNavigate();

  return (
    <header className="navbar navbar-expand-lg sticky-top" style={{
      background: 'rgba(3, 30, 1, 0.75) ',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '0px solid var(--border-subtle)',
      padding: '0.3rem 0',
      zIndex: 1000,
      
      maxWidth: '100%',
    }}>
      <div className="container-fluid px-4 px-lg-5">
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex align-items-center gap-2">
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
            </div>

            {breadcrumbs.length > 0 && (
              <div className="d-none d-md-flex align-items-center gap-2 ms-3" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>
                <ChevronRight size={14} />
                <span style={{ color: '#ffc107' }}>{title}</span>
              </div>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 gap-md-3">
            <a href="tel:8300426612" className="d-flex align-items-center text-decoration-none" style={{
              gap: '0.4rem', color: '#ffc107', fontSize: '0.85rem',
            }}>
              <Phone size={15} style={{ color: '#ffc107' }} />
              <span className="d-none d-lg-inline"></span>
            </a>

            <a href="https://wa.me/919952773759" className="d-flex align-items-center text-decoration-none" style={{
              gap: '0.4rem', color: '#ffc107', fontSize: '0.85rem',
            }}>
              <MessageCircle size={16} style={{ color: '#ffc107' }} />
            </a>

            <a
              href="https://maps.app.goo.gl/7PXWkGWX1mC7zNzr9"
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
