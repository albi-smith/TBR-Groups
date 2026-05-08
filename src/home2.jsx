import { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowRight, ChevronRight, Star, Users, Award, Briefcase, Globe, CreditCard, Smartphone, ShieldCheck, Zap } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { servicesA, servicesB, allServices } from './data/servicesData';
import Navbar from './components/Navbar';


const TBRTechnologies = () => {
  // State
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
  const servicesRef = useRef(null);

  useEffect(() => {
    if (location.state?.scrollToServices) {

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

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Branch data
  const branches = [
    {
      name: 'TBR Groups — Marthandam',
      location: 'Marthandam,',
      phone: ['8300426612', '7418105297'],
      desc: 'Head Office — All Services',
      highlight: true,
    },
    {
      name: 'TBR Innovative Education',
      location: 'Vettuvenni',
      phone: ['7092773915'],
      desc: 'Computer Education & Training',
      website: 'https://tbr-education.vercel.app/'
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
    'Project Binding', 'CSC & E-Seva', 'Postal Services', 'POS Device Supply',
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
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
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
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
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

{/* ═══════════════ CERTIFICATIONS SECTION (ABOUT) ═══════════════ */}
      <section id="about-section" style={{ padding: '5rem 0', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            {/* Left Content - Header & Certificate Image */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-label">Verified Partnerships</div>
              <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>
                Net Protector <br />
                <span style={{ color: 'var(--accent-gold)' }}>Authorised Channel Partner</span>
              </h2>

              <div style={{
                position: 'relative',
                background: 'var(--bg-card)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                border: '1px solid var(--border-subtle)',
                marginBottom: '1rem'
              }}>
                <img
                  src="/Authorised certificate.jpeg"
                  alt="Net Protector Authorised Partner Certificate"
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '4px',
                    display: 'block'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  border: '1px solid rgba(255,215,0,0.2)',
                  borderRadius: 'var(--radius-lg)',
                  pointerEvents: 'none'
                }} />
              </div>
              <div className="text-center">
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  Official Authorization
                </span>
              </div>
            </div>

            {/* Right Content - Details */}
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.05rem' }}>
                TBR Innovative Trades is proud to be an authorized partner for <strong>Net Protector (NPAV)</strong>, delivering state-of-the-art cyber security solutions and enterprise software services across India.
              </p>

              <div className="row g-3">
                {[
                  'Cyber Security & Antivirus',
                  'Endpoint Security (EPS)',
                  'Mobile Device Management',
                  'Cloud Backup Solutions',
                  'Data Leak Prevention (DLP)',
                  'Employee Monitoring Tools'
                ].map((item, i) => (
                  <div key={i} className="col-sm-6">
                    <div className="d-flex align-items-center gap-2" style={{
                      padding: '0.75rem 1rem',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.9rem',
                      color: 'var(--text-primary)'
                    }}>
                      <ShieldCheck size={16} style={{ color: 'var(--accent-teal)' }} />
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-2">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  background: 'rgba(27,94,32,0.05)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px dashed var(--primary)'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>🏆</div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Bronze Rated Partner</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Dealer Code: T-903 | Kanniyakumari, Tamil Nadu</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PINE LABS POS SECTION ═══════════════ */}
      <section style={{ padding: '5rem 0 2rem', background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
        {/* Glow Effects */}
        <div style={{
          position: 'absolute', top: '-10%', left: '-5%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, var(--accent-gold-dim), transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
        }} />
        <div style={{
          position: 'absolute', bottom: '-10%', right: '-5%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, var(--accent-blue-dim), transparent 70%)',
          filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center g-5">
            {/* Left Content - Header & Image */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3" style={{
                background: 'rgba(255, 215, 0, 0.1)',
                border: '1px solid var(--border-gold)',
                borderRadius: 'var(--radius-full)',
                color: 'var(--accent-gold)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>
                <Zap size={14} /> Pine Labs Authorized
              </div>
              <h2 style={{
                fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1,
                marginBottom: '2rem',
              }}>
                All-in-One POS <br />
                <span style={{
                  background: 'linear-gradient(90deg, var(--accent-gold), #FFF8D6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                }}>For Modern Businesses</span>
              </h2>

              {/* POS Visual (Now below H2) */}
              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '2rem 0',
                marginBottom: '1rem'
              }}>
                {/* Decorative background circle */}
                <div style={{
                  position: 'absolute',
                  width: '80%',
                  aspectRatio: '1/1',
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.1), rgba(0,0,0,0))',
                  borderRadius: '50%',
                  zIndex: 0,
                  filter: 'blur(40px)',
                }} />

                {/* POS Image */}
                <img
                  src="/Pinelabs.png"
                  alt="Pine Labs POS Device"
                  style={{
                    maxWidth: '100%',
                    borderRadius: '20px',
                    height: 'auto',
                    objectFit: 'contain',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.3))',
                    transform: 'rotate(-5deg)',
                    transition: 'transform 0.5s ease',
                  }}
                  // onMouseEnter={e => e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)'}
                  // onMouseLeave={e => e.currentTarget.style.transform = 'rotate(-5deg) scale(1)'}
                />
                {/* 
                Floating Badge (Above) */}
                {/* <div style={{
                  position: 'absolute', top: '0', right: '5%',
                  background: 'rgba(255,215,0,0.15)', color: 'var(--accent-gold)',
                  padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  zIndex: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,215,0,0.3)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  animation: 'float 3s ease-in-out infinite'
                }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-gold)', boxShadow: '0 0 10px var(--accent-gold)' }} />
                  Fast & Easy Checkout
                </div> */}

                {/* Floating Badge 2 (Below) */}
                {/* <div style={{
                  position: 'absolute', bottom: '0', left: '5%',
                  background: 'rgba(255,255,255,0.1)', color: 'var(--text-primary)',
                  padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem', fontWeight: 600,
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  zIndex: 2,
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  animation: 'float 4s ease-in-out infinite reverse'
                }}>
                  <ShieldCheck size={16} style={{ color: 'var(--accent-teal)' }} />
                  Smart Business Tools
                </div> */}
              </div>
            </div>

            {/* Right Content - Info & Features */}
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <p style={{
                fontSize: '1.1rem', color: 'var(--text-secondary)',
                lineHeight: 1.6, marginBottom: '2rem',
              }}>
                Smart Payments. Faster Growth. Trusted by millions of businesses across India. Experience freedom and flexibility with zero AMB conditions and no hidden charges.
              </p>

              <div className="row g-4 mb-5">
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <div style={{ color: 'var(--accent-gold)', padding: '0.5rem', background: 'rgba(255,215,0,0.1)', borderRadius: 'var(--radius-sm)' }}>
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>All Payments</h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', margin: 0 }}>UPI, Cards, EMI, Wallets & DCC.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <div style={{ color: 'var(--accent-gold)', padding: '0.5rem', background: 'rgba(255,215,0,0.1)', borderRadius: 'var(--radius-sm)' }}>
                      <ShieldCheck size={20} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>100% Secure</h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', margin: 0 }}>Safe, reliable & auto reconciliation.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <div style={{ color: 'var(--accent-gold)', padding: '0.5rem', background: 'rgba(255,215,0,0.1)', borderRadius: 'var(--radius-sm)' }}>
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Multi-Bank Advantage</h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', margin: 0 }}>Lower MDR, Multiple TIDs, Smart Routing.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-start gap-3">
                    <div style={{ color: 'var(--accent-gold)', padding: '0.5rem', background: 'rgba(255,215,0,0.1)', borderRadius: 'var(--radius-sm)' }}>
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Boost Sales</h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', margin: 0 }}>23+ EMI options & Pay Later plans.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 align-items-center">
                <a href="tel:9952773759" className="btn-primary text-decoration-none">
                  Get Your POS Today
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* ═══════════════ GO POINT DIGITAL SERVICES SECTION ═══════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-deep)', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative Background Elements */}
        <div style={{
          position: 'absolute', top: '10%', right: '-5%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(66, 133, 244, 0.1), transparent 70%)',
          filter: 'blur(60px)', pointerEvents: 'none'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="row align-items-center g-5">
            {/* Left Content - Header & Image */}
            <div className="col-lg-6" data-aos="fade-right">
              <div className="section-label">Digital India Initiative</div>
              <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                GO POINT <br />
                <span style={{
                  background: 'linear-gradient(90deg, #4285F4, #34A853)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                }}>One App, All Services</span>
              </h2>

              <div style={{
                position: 'relative',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  position: 'absolute',
                  width: '90%',
                  aspectRatio: '1/1',
                  background: 'linear-gradient(135deg, rgba(66, 133, 244, 0.1), rgba(52, 168, 83, 0.1))',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  zIndex: 0,
                  filter: 'blur(30px)',
                  animation: 'float 10s ease-in-out infinite'
                }} />

                <img
                  src="/go point new .png"
                  alt="GO POINT App Interface"
                  style={{
                    maxWidth: '100%',
                    borderRadius: 'var(--radius-lg)',
                    height: 'auto',
                    position: 'relative',
                    zIndex: 1,
                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.15))',
                  }}
                />
              </div>
            </div>

            {/* Right Content - Info & Features */}
            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem', lineHeight: 1.7 }}>
                Simplify your life with <strong>GO POINT</strong> — the multi-service digital platform designed for every Indian. From instant recharges to secure banking and bill payments, manage everything from a single app.
              </p>

              <div className="row g-4 mb-4">
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ color: '#4285F4', background: 'rgba(66,133,244,0.1)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
                      <Smartphone size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>All Recharges</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Mobile, DTH & Postpaid</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ color: '#34A853', background: 'rgba(52,168,83,0.1)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
                      <Zap size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Utility Bills</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>TNEB, Water, Gas & LIC</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ color: '#FBBC05', background: 'rgba(251,188,5,0.1)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
                      <CreditCard size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Banking & AEPS</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Aadhar Cash & MATM</div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="d-flex align-items-center gap-3">
                    <div style={{ color: '#EA4335', background: 'rgba(234,67,53,0.1)', padding: '0.6rem', borderRadius: 'var(--radius-md)' }}>
                      <Globe size={20} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.95rem' }}>Travel & Tickets</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>IRCTC Train OTP Booking</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap gap-3 align-items-center pt-2">
                <a
                  href="https://play.google.com/store/apps/details?id=com.solution.gopointttt&pli=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ background: '#000', color: '#fff', border: 'none' }}
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" style={{ height: '24px' }} />
                </a>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>Get FREE ID:</span> Provide Name, Email, Address & Shop Name
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ SERVICES SECTION ═══════════════ */}
      <section id="services-section" ref={servicesRef} style={{ padding: '5rem 0' }}>
        <div className="container">
          {/* Section Header */}
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Our Services</div>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Browse by Category</h2>
            <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
              Click any service to explore available sub-services and get started.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5" data-aos="fade-up" data-aos-delay="300">
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
                data-aos="fade-up"
                data-aos-delay={index * 50}
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
            <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Service Categories</div>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Two Pillars of Service</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {/* Category A */}
            <div className="col-lg-6" data-aos="fade-right">
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
            <div className="col-lg-6" data-aos="fade-left">
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
      <section id="branches-section" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Our Locations</div>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Visit Our Branches</h2>
            <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
              Four conveniently located branches across Tamil Nadu to serve you better.
            </p>
          </div>

          <div className="row g-4 justify-content-center">
            {branches.map((branch, i) => (
              <div key={i} className="col-lg-3 col-md-6" data-aos="zoom-in" data-aos-delay={i * 100}>
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
                    {branch.website && (
                      <a href={branch.website} target="_blank" rel="noopener noreferrer" className="d-flex align-items-center gap-2 text-decoration-none mt-1" style={{
                        fontSize: '0.85rem', color: 'var(--accent-blue-light)',
                        transition: 'opacity 0.2s',
                        fontWeight: 500
                      }}>
                        <Globe size={13} /> Visit Website <ArrowRight size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CONTACT SECTION ═══════════════ */}
      <section id="contact-section" style={{
        padding: '5rem 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Get In Touch</div>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Contact Us</h2>
            <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
              Reach out to us via phone, WhatsApp, or email. We're here to help!
            </p>
          </div>

          <div className="row g-4">
            {/* Phone */}
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
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
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
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
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="100">
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
            <div className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay="300">
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
                <a href="https://tbr-edu.netlify.app/" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center gap-2" style={{ color: 'var(--accent-blue-light)', fontWeight: 500 }}>
                  <Globe size={13} /> TBR Education Website
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