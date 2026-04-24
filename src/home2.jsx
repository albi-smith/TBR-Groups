import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronRight, Star, Users, Award, Briefcase } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { servicesA, servicesB, allServices } from './data/servicesData';
import Navbar from './components/Navbar';


const TBRTechnologies = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [loaded, setLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const servicesRef = useRef(null);

  useEffect(() => {
    setLoaded(true);
    if (location.state?.scrollToServices) {
      // Delay slightly to ensure content is rendered before scrolling
      setTimeout(() => {
        servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  const filteredServices =
    activeCategory === 'all'
      ? allServices
      : activeCategory === 'services'
        ? servicesA
        : servicesB;

  const scrollToServices  = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Branch data
  const branches = [
    {
      name: 'TBR Groups — Marthandam',
      location: 'Marthandam, Tamil Nadu',
      phone: ['8300426612', '7418105297'],
      desc: 'Head Office — All Services',
      highlight: true,
    },
    {
      name: 'TBR Innovative Education',
      location: 'Thengapattanam',
      phone: ['7092773915'],
      desc: 'Insurance, Loan & Online Services',
    },
    {
      name: 'TBR Innovative Trades',
      location: 'Panamugam',
      phone: ['04651 295124', '8072368438'],
      desc: 'Trading & Retail Services',
    },
    {
      name: 'TBR Mankad',
      location: 'Mankad',
      phone: ['04651 225519'],
      desc: 'Branch Office',
    },
  ];

  const stats = [
    { number: '15+', label: 'Service Categories', icon: <Briefcase size={20} /> },
    { number: '100+', label: 'Sub-Services', icon: <Star size={20} /> },
    { number: '4', label: 'Branch Locations', icon: <MapPin size={20} /> },
    { number: '2K+', label: 'Happy Customers', icon: <Users size={20} /> },
  ];

  const marqueeItems = [
    'Government Services', 'Banking Solutions', 'Insurance Products',
    'Ticket Booking', 'Document Registration', 'Business Registration',
    'Computer Accessories', 'Mobile Accessories', 'Organic Foods',
    'Project Binding', 'CSC & E-Seva', 'Postal Services',
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="animated-gradient-bg hero-section" style={{
        position: 'relative',
        padding: '6rem 0 5rem',
        overflow: 'hidden',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Decorative Orbs */}
        <div className="hero-glow-orb" style={{
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(27,94,32,0.12), transparent 70%)',
          top: '-10%', right: '-5%',
        }} />
        <div className="hero-glow-orb" style={{
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(255,193,7,0.1), transparent 70%)',
          bottom: '0%', left: '-5%',
        }} />

        {/* Grid pattern overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.03,
          backgroundImage: 'linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center gy-5">
            <div className="col-lg-6" style={{ animation: loaded ? 'fadeInUp 0.8s ease' : 'none' }}>
              <div className="section-label">Trusted Service Partner Since Establishment</div>
              <h2 style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                marginBottom: '1.5rem',
                letterSpacing: '-1px',
              }}>
                Your One-Stop
                <br />
                <span style={{
                  background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>Service Center</span>
              </h2>
              <p style={{
                fontSize: '1.1rem', color: 'var(--text-secondary)',
                lineHeight: 1.8, marginBottom: '2.5rem', maxWidth: '500px',
              }}>
                From government services to banking, insurance, ticket booking, and retail — we provide <strong style={{ color: 'var(--text-primary)' }}>comprehensive solutions</strong> for all your needs across 4 branches in Tamil Nadu.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn-primary" onClick={scrollToServices}>
                  Explore Services <ArrowRight size={18} />
                </button>
                <a href="tel:8300426612" className="btn-secondary text-decoration-none">
                  <Phone size={18} /> Call Now
                </a>
                <button className="btn-secondary d-flex align-items-center gap-2" onClick={() => window.open("https://maps.app.goo.gl/7PXWkGWX1mC7zNzr9")}>
                  Visit Us<MapPin size={18} />
                </button>
              </div>
            </div>

            {/* Hero Right — Stats Grid */}
            <div className="col-lg-6" style={{
              animation: loaded ? 'fadeInUp 0.8s ease 0.2s both' : 'none',
            }}>
              <div className="row g-3">
                {stats.map((stat, i) => (
                  <div key={i} className="col-6">
                    <div style={{
                      background: 'var(--bg-glass)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: '1.75rem',
                      textAlign: 'center',
                      transition: 'all var(--transition-base)',
                      cursor: 'default',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = 'var(--border-gold)';
                        e.currentTarget.style.boxShadow = 'var(--shadow-glow)';
                        e.currentTarget.style.transform = 'translateY(-4px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div style={{ color: 'var(--accent-gold)', marginBottom: '0.75rem' }}>{stat.icon}</div>
                      <div className="stat-number" style={{ fontSize: '2rem' }}>{stat.number}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════ MARQUEE BANNER ═══════════════ */}
      <div className="marquee-container">
        <div className="marquee-content">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="marquee-item">
              <span className="marquee-dot" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ SERVICES SECTION ═══════════════ */}
      <section ref={servicesRef} style={{ padding: '5rem 0' }}>
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center">Our Services</div>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle mx-auto">
              Click any service to explore available sub-services and get started.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {[
              { value: 'all', label: 'All Services' },
              { value: 'services', label: 'Services & Government' },
              { value: 'retail', label: 'Sales & Retail' },
            ].map(cat => (
              <button
                key={cat.value}
                className={`filter-pill ${activeCategory === cat.value ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.value)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Service Cards Grid */}
          <div className="row g-4">
            {filteredServices.map((service, index) => (
              <div
                key={service.id}
                className="col-12 col-md-6 col-lg-4"
                style={{
                  animation: loaded ? `fadeInUp 0.5s ease ${index * 0.05}s both` : 'none',
                }}
              >
                <div
                  className="service-card h-100"
                  onClick={() => navigate(`/service/${service.slug}`)}
                >
                  {/* Category Badge */}
                  <span className={`category-badge ${service.category === 'services' ? 'badge-services' : 'badge-retail'}`}>
                    {service.category === 'services' ? 'Service' : 'Retail'}
                  </span>

                  {/* Image */}
                  <div className="card-image-wrapper">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="card-image"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.background = `linear-gradient(135deg, ${service.color}33, var(--bg-card))`;
                        e.target.style.display = 'flex';
                      }}
                    />
                  </div>

                  {/* Body */}
                  <div className="card-body">
                    <h3 className="card-title">{service.title}</h3>
                    <p className="card-desc">{service.desc}</p>

                    <div className="d-flex align-items-center justify-content-between mt-4 pt-3" style={{
                      borderTop: '1px solid var(--border-subtle)',
                    }}>
                      <span style={{
                        fontSize: '0.75rem', color: 'var(--text-tertiary)',
                      }}>
                        {service.subServices.length} services available
                      </span>
                      <span className="d-flex align-items-center gap-1" style={{
                        fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 500,
                      }}>
                        Explore <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORY OVERVIEW ═══════════════ */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center">Service Categories</div>
            <h2 className="section-title">Two Pillars of Service</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Category A */}
            <div className="col-lg-6">
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all var(--transition-base)',
                height: '100%'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                <div style={{
                  position: 'absolute', top: '-30px', right: '-30px',
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(27,94,32,0.15), transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)',
                  background: 'rgba(27,94,32,0.15)', color: 'var(--primary)',
                  fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '1px', marginBottom: '1.25rem',
                }}>
                  <Briefcase size={12} /> Category A
                </div>
                <h3 style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700,
                  marginBottom: '0.75rem', color: 'var(--text-primary)',
                }}>
                  Government & Financial Services
                </h3>
                <p style={{
                  fontSize: '0.9rem', color: 'var(--text-secondary)',
                  lineHeight: 1.7, marginBottom: '1.5rem',
                }}>
                  Complete suite of government services, banking solutions, insurance products, document registration, and travel booking services with authorized processing.
                </p>
                <div className="d-flex flex-column gap-2">
                  {['10 specialized service areas', 'Certified & authorized partners', '24/7 customer support', 'Fast & transparent processing'].map((item, i) => (
                    <div key={i} className="d-flex align-items-center gap-2" style={{
                      fontSize: '0.85rem', color: 'var(--text-primary)',
                    }}>
                      <span style={{ color: 'var(--accent-blue-light)' }}>✦</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category B */}
            <div className="col-lg-6">
              <div style={{
                background: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--border-subtle)',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all var(--transition-base)',
                height: '100%'
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0, 184, 89, 0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; }}
              >
                <div style={{
                  position: 'absolute', top: '-30px', right: '-30px',
                  width: '120px', height: '120px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0, 184, 89, 0.12), transparent 70%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.3rem 0.8rem', borderRadius: 'var(--radius-full)',
                  background: 'rgba(0, 184, 89, 0.15)', color: 'var(--accent-teal)',
                  fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                  letterSpacing: '1px', marginBottom: '1.25rem',
                }}>
                  <Award size={12} /> Category B
                </div>
                <h3 style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', fontWeight: 700,
                  marginBottom: '0.75rem', color: 'var(--text-primary)',
                }}>
                  Sales & Retail Products
                </h3>
                <p style={{
                  fontSize: '0.9rem', color: 'var(--text-secondary)',
                  lineHeight: 1.7, marginBottom: '1.5rem',
                }}>
                  Quality products from computer and mobile accessories to stationary, books, and organic foods — everything for office, school, and daily life.
                </p>
                <div className="d-flex flex-column gap-2">
                  {['5 product categories', 'Premium quality products', 'Competitive pricing', 'Quick delivery & support'].map((item, i) => (
                    <div key={i} className="d-flex align-items-center gap-2" style={{
                      fontSize: '0.85rem', color: 'var(--text-primary)',
                    }}>
                      <span style={{ color: 'var(--accent-teal)' }}>✦</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ BRANCHES SECTION ═══════════════ */}
      <section style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center">Our Locations</div>
            <h2 className="section-title">Visit Our Branches</h2>
            <p className="section-subtitle mx-auto">
              Four conveniently located branches across Tamil Nadu to serve you better.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {branches.map((branch, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="info-card h-100" style={{
                  border: branch.highlight ? '1px solid var(--border-gold)' : '1px solid var(--border-subtle)',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {branch.highlight && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                      background: 'linear-gradient(90deg, var(--accent-gold), var(--accent-gold-light))',
                    }} />
                  )}
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <div className="info-icon mb-0" style={{ width: '40px', height: '40px' }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 style={{
                        fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 600,
                        color: 'var(--text-primary)', margin: 0,
                      }}>
                        {branch.name}
                      </h4>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', margin: 0 }}>
                        {branch.location}
                      </p>
                    </div>
                  </div>
                  <p style={{
                    fontSize: '0.85rem', color: 'var(--text-secondary)',
                    marginBottom: '1.25rem', lineHeight: 1.5,
                  }}>
                    {branch.desc}
                  </p>
                  <div className="d-flex flex-column gap-2">
                    {branch.phone.map((ph, j) => (
                      <a key={j} href={`tel:${ph.replace(/\s/g, '')}`} className="d-flex align-items-center gap-2 text-decoration-none" style={{
                        fontSize: '0.85rem', color: 'var(--accent-gold)',
                        transition: 'opacity 0.2s',
                      }}>
                        <Phone size={13} /> {ph}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT SECTION ═══════════════ */}
      <section style={{
        padding: '5rem 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center">Get In Touch</div>
            <h2 className="section-title">Contact Us</h2>
            <p className="section-subtitle mx-auto">
              Reach out to us via phone, WhatsApp, or email. We're here to help!
            </p>
          </div>

          <div className="row g-4">
            {/* Phone */}
            <div className="col-lg-3 col-md-6">
              <div className="info-card h-100">
                <div className="info-icon">
                  <Phone size={22} />
                </div>
                <h4 style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', fontWeight: 600,
                  color: 'var(--text-primary)', marginBottom: '0.75rem',
                }}>
                  Call Us
                </h4>
                <div className="d-flex flex-column gap-2">
                  <a href="tel:8300426612" className="text-decoration-none" style={{ color: 'var(--accent-gold)', fontSize: '0.9rem' }}>
                    📞 8300426612
                  </a>
                  <a href="tel:7418105297" className="text-decoration-none" style={{ color: 'var(--accent-gold)', fontSize: '0.9rem' }}>
                    📞 7418105297
                  </a>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.75rem' }}>
                  Available 9 AM to 6 PM
                </p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="col-lg-3 col-md-6">
              <div className="info-card h-100">
                <div className="info-icon" style={{ background: 'rgba(37,211,102,0.15)', color: '#25d366' }}>
                  <span style={{ fontSize: '1.2rem' }}>💬</span>
                </div>
                <h4 style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', fontWeight: 600,
                  color: 'var(--text-primary)', marginBottom: '0.75rem',
                }}>
                  WhatsApp
                </h4>
                <div className="d-flex flex-column gap-2">
                  <a href="https://wa.me/919952773759" target="_blank" rel="noopener noreferrer"
                    className="text-decoration-none" style={{ color: '#25d366', fontSize: '0.9rem' }}>
                    💬 9952773759 (Queries)
                  </a>
                  <a href="https://wa.me/918300426612" target="_blank" rel="noopener noreferrer"
                    className="text-decoration-none" style={{ color: '#25d366', fontSize: '0.9rem' }}>
                    💬 8300426612 (Details)
                  </a>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '0.75rem' }}>
                  WhatsApp Groups: TBR Careers govt.Scheme.net
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="col-lg-3 col-md-6">
              <div className="info-card h-100">
                <div className="info-icon" style={{ background: 'rgba(27,94,32,0.15)', color: 'var(--primary)' }}>
                  <Mail size={22} />
                </div>
                <h4 style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', fontWeight: 600,
                  color: 'var(--text-primary)', marginBottom: '0.75rem',
                }}>
                  Email Us
                </h4>
                <div className="d-flex flex-column gap-2">
                  <a href="mailto:tbrinnovativetrades@gmail.com"
                    className="text-decoration-none" style={{ color: 'var(--accent-blue-light)', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                    📧 tbrinnovativetrades@gmail.com
                  </a>
                  <a href="mailto:Tortec16@gmail.com"
                    className="text-decoration-none" style={{ color: 'var(--accent-blue-light)', fontSize: '0.85rem' }}>
                    📧 Tortec16@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="col-lg-3 col-md-6">
              <div className="info-card h-100">
                <div className="info-icon" style={{ background: 'rgba(167,139,250,0.15)', color: 'var(--accent-purple)' }}>
                  <Clock size={22} />
                </div>
                <h4 style={{
                  fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', fontWeight: 600,
                  color: 'var(--text-primary)', marginBottom: '0.75rem',
                }}>
                  Working Hours
                </h4>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  9:00 AM - 6:00 PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section style={{
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-gold-dim), transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="section-label d-inline-flex justify-content-center">Ready to Get Started?</div>
              <h2 className="section-title">Access Our Services Today</h2>
              <p style={{
                fontSize: '1.05rem', color: 'var(--text-secondary)',
                lineHeight: 1.7, marginBottom: '2.5rem',
              }}>
                Visit any of our 4 branches or contact us directly. Our dedicated team is ready to assist you with professional service.
              </p>
              <div className="d-flex flex-wrap justify-content-center gap-3">
                <a href="tel:8300426612" className="btn-primary text-decoration-none">
                  <Phone size={18} /> Call 8300426612
                </a>
                <a href="https://wa.me/919952773759" target="_blank" rel="noopener noreferrer"
                  className="btn-secondary text-decoration-none">
                  💬 WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="footer" style={{ padding: '4rem 0 2rem' }}>
        <div className="container">
          <div className="row g-5 mb-5">
            {/* Brand */}
            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-4">
                <div style={{
                  width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1rem',
                  color: '#ffffff',
                }}>T</div>
                <span style={{
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.1rem',
                }}>
                  TBR Groups<span style={{ color: 'var(--accent)' }}>.</span>
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '300px' }}>
                Your complete service partner. Professional services across government, finance, retail, and more.
              </p>
            </div>

            {/* Services Links */}
            <div className="col-lg-2 col-6">
              <h4 style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Services
              </h4>
              <div className="d-flex flex-column gap-2">
                {servicesA.slice(0, 5).map(s => (
                  <span key={s.id} className="footer-link" onClick={() => navigate(`/service/${s.slug}`)}
                    style={{ cursor: 'pointer' }}>
                    {s.title}
                  </span>
                ))}
              </div>
            </div>

            {/* More Services */}
            <div className="col-lg-2 col-6">
              <h4 style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Products
              </h4>
              <div className="d-flex flex-column gap-2">
                {servicesB.map(s => (
                  <span key={s.id} className="footer-link" onClick={() => navigate(`/service/${s.slug}`)}
                    style={{ cursor: 'pointer' }}>
                    {s.title}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="col-lg-4 col-md-6">
              <h4 style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Contact
              </h4>
              <div className="d-flex flex-column gap-3">
                <a href="tel:8300426612" className="footer-link d-flex align-items-center gap-2">
                  <Phone size={13} /> 8300426612
                </a>
                <a href="tel:7418105297" className="footer-link d-flex align-items-center gap-2">
                  <Phone size={13} /> 7418105297
                </a>
                <a href="mailto:tbrinnovativetrades@gmail.com" className="footer-link d-flex align-items-center gap-2">
                  <Mail size={13} /> Email Us
                </a>
                <a href="https://wa.me/919952773759" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center gap-2">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>
              © 2024 TBR Technologies. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>
              Serving Tamil Nadu with professional services since establishment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TBRTechnologies;