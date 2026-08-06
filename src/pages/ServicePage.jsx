import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, Clock, FileText, Timer, IndianRupee, ClipboardList } from 'lucide-react';
import { allServices } from '../data/servicesData';
import Navbar from '../components/Navbar';
import Picture from '../components/Picture';

const ServicePage = () => {
  const { serviceSlug } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null)

  const service = allServices.find(s => s.slug === serviceSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoaded(false);
    setExpandedCard(null);
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, [serviceSlug]);

  if (!service) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{
        minHeight: '100vh',
        background: 'var(--bg-deep)',
        gap: '1.5rem',
      }}>
        <div style={{ fontSize: '4rem' }}>🔍</div>
        <h1 className="h2" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
          Service Not Found
        </h1>
        <p className="text-secondary">The service you're looking for doesn't exist.</p>
        <button className="btn-primary navbar-back-btn" onClick={() => navigate('/')}>
          <ArrowLeft className="navbar-back-icon" /> Back to Home
        </button>
      </div>
    );
  }

  const categoryLabel = service.category === 'services' ? 'Services' : 'Sales & Retail';


const marqueeItems = [
    'Government Services', 'Banking Solutions', 'Insurance Products',
    'Ticket Booking', 'Document Registration', 'Business Registration',
    'Computer Accessories', 'Mobile Accessories', 'Organic Foods',
    'Project Binding', 'CSC & E-Seva', 'Postal Services', 'POS Device Supply',
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', minHeight: '100vh' }}>
      <Navbar title={service.title} breadcrumbs={[service.title]} />

      {/* ── Hero Section with Background Image ── */}
      <section className="service-hero" style={{
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease',
        padding: '6rem 0 3.5rem'
      }}>
        <Picture
          src={service.heroImage}
          webp={service.heroImageWebp}
          alt={service.title}
          className="service-hero-bg"
          fetchPriority="high"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div className="service-hero-overlay" />

        {/* Back Button inside Hero - Top Left End of Image */}
        <button
          onClick={() => navigate('/', { state: { scrollToServices: true } })}
          className="btn d-none d-md-flex align-items-center gap-2 px-3 py-2 border rounded-pill bg-glass navbar-back-btn"
          style={{ 
            position: 'absolute',
            top: '1.5rem',
            left: '1.5rem',
            fontSize: '0.85rem', 
            color: 'var(--text-secondary)',
            zIndex: 15,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <ArrowLeft size={16} style={{ color: 'var(--accent-gold)' }} /> 
          <span style={{ fontWeight: 600 }}>Home</span>
        </button>

        {/* Decorative Gradient Orb */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${service.color}22, transparent 70%)`,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        <div className="container position-relative" style={{ zIndex: 2 }}>

          <div className="row">
            <div className="col-12" data-aos="fade-up">
              <div className="d-inline-flex align-items-center gap-2 px-3 py-2 rounded-pill mb-4" style={{
                background: `${service.color}20`,
                border: `1px solid ${service.color}40`,
                color: service.color,
                fontSize: '0.75rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  background: service.color,
                }} />
                {categoryLabel}
              </div>

              <h1 className="display-4 fw-bold mb-3" style={{
                fontFamily: 'Outfit, sans-serif',
                color: 'var(--text-primary)',
              }}>
                {service.title}
              </h1>

              <p className="lead text-secondary mb-4" style={{ maxWidth: '600px' }}>
                {service.desc}
              </p>

              <div className="d-flex flex-wrap gap-3">
                <div className="d-flex align-items-center gap-2 px-3 py-2 border rounded-pill bg-glass" style={{
                  fontSize: '0.85rem', color: 'var(--text-secondary)',
                }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✦</span> {service.subServices.length} Services Available
                </div>
                <div className="d-flex align-items-center gap-2 px-3 py-2 border rounded-pill bg-glass" style={{
                  fontSize: '0.85rem', color: 'var(--text-secondary)',
                }}>
               
                  <span style={{ color: '#22c55e' }}>●</span> Open Now
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* ── Sub-Services Grid ── */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Available Services</div>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">What We Offer</h2>
            <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
              Explore our comprehensive range of {service.title.toLowerCase()} — professional, reliable, and affordable.
            </p>
          </div>

          <div className="row g-4">
            {service.subServices.map((sub, index) => {
              const isExpanded = expandedCard === index;
              const details = sub.details;

              return (
                <div
                  key={index}
                  className={isExpanded ? "col-12" : "col-lg-4 col-md-6"}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  style={{
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div className="sub-service-card h-100">
                    {/* Sub-service Image Header */}
                    <div className="sub-card-image-wrapper" style={{
                      height: '160px',
                      overflow: 'hidden',
                      margin: '-1.75rem -1.75rem 1.75rem -1.75rem',
                      position: 'relative',
                    }}>
                      <Picture
                        src={sub.image || `https://via.placeholder.com/500x300?text=${encodeURIComponent(sub.name)}`}
                        webp={sub.imageWebp}
                        alt={sub.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                        className="sub-card-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentElement.style.background = `linear-gradient(135deg, ${service.color}22, ${service.color}05)`;
                        }}
                      />
                    </div>

                    {/* Top section — always visible */}
                    <div className="d-flex align-items-start gap-3">
                      {/* <div className="sub-service-icon flex-shrink-0" style={{
                        width: '42px',
                        height: '42px',
                        fontSize: '1.2rem',
                        background: `${service.color}15`,
                        color: service.color,
                        marginBottom: 0
                      }}>
                        {sub.icon}
                      </div> */}
                      <div className="flex-grow-1">
                        <h3 style={{
                          fontFamily: 'Outfit, sans-serif',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '0.4rem',
                          lineHeight: 1.3
                        }}>
                          {sub.name}
                        </h3>
                        <p style={{
                          fontSize: '0.88rem',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.6,
                          marginBottom: 0,
                        }}>
                          {sub.desc}
                        </p>
                      </div>
                    </div>

                    {/* Expanded details */}
                    {isExpanded && details && (
                      <div style={{ marginTop: '2rem', animation: 'fadeIn 0.4s ease' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                          <h4 style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                            marginBottom: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                          }}>
                            <FileText size={16} style={{ color: 'var(--accent-gold)' }} />
                            About this service
                          </h4>
                          <p style={{
                            fontSize: '0.88rem',
                            color: 'var(--text-secondary)',
                            lineHeight: 1.7,
                          }}>
                            {details.description}
                          </p>
                        </div>

                        {/* Details grid */}
                        <div className="row g-3">
                          {/* Requirements */}
                          {details.requirements && details.requirements.length > 0 && (
                            <div className="col-md-8">
                              <div className="p-3 rounded border bg-glass h-100">
                                <div className="d-flex align-items-center gap-2 mb-3">
                                  <ClipboardList size={14} style={{ color: 'var(--accent-blue-light)' }} />
                                  <span style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    color: 'var(--accent-blue-light)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                  }}>
                                    Documents Required
                                  </span>
                                </div>
                                <ul className="list-unstyled p-0 m-0 d-flex flex-column gap-2">
                                  {details.requirements.map((req, i) => (
                                    <li key={i} className="d-flex align-items-start gap-2" style={{
                                      fontSize: '0.82rem',
                                      color: 'var(--text-secondary)',
                                      lineHeight: 1.5,
                                    }}>
                                      <span style={{
                                        color: 'var(--accent-blue-light)',
                                        fontSize: '0.6rem',
                                        marginTop: '0.35rem',
                                        flexShrink: 0,
                                      }}>●</span>
                                      {req}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          )}

                          {/* Processing Time & Price */}
                          <div className="col-md-4">
                            <div className="d-flex flex-column gap-3 h-100">
                              {details.processingTime && (
                                <div className="p-3 rounded border bg-glass">
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <Timer size={14} style={{ color: 'var(--accent-teal)' }} />
                                    <span style={{
                                      fontFamily: 'Outfit, sans-serif',
                                      fontSize: '0.78rem',
                                      fontWeight: 600,
                                      color: 'var(--accent-teal)',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px',
                                    }}>
                                      Processing Time
                                    </span>
                                  </div>
                                  <p className="mb-0 fw-medium" style={{
                                    fontSize: '0.88rem',
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.6,
                                  }}>
                                    {details.processingTime}
                                  </p>
                                </div>
                              )}

                              {details.price && (
                                <div className="p-3 rounded border" style={{
                                  background: 'linear-gradient(135deg, rgba(255, 193, 7, 0.08), rgba(255, 193, 7, 0.02))',
                                  borderColor: 'var(--border-gold)',
                                }}>
                                  <div className="d-flex align-items-center gap-2 mb-2">
                                    <IndianRupee size={14} style={{ color: 'var(--accent-gold)' }} />
                                    <span style={{
                                      fontFamily: 'Outfit, sans-serif',
                                      fontSize: '0.78rem',
                                      fontWeight: 600,
                                      color: 'var(--accent-gold)',
                                      textTransform: 'uppercase',
                                      letterSpacing: '0.5px',
                                    }}>
                                      Pricing
                                    </span>
                                  </div>
                                  <p className="mb-0 fw-medium" style={{
                                    fontSize: '0.88rem',
                                    color: 'var(--text-primary)',
                                    lineHeight: 1.6,
                                  }}>
                                    {details.price}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Learn More toggle button */}
                    {/* <button
                      onClick={() => toggleExpand(index)}
                      className="d-flex align-items-center gap-2 border-0 bg-transparent p-0 mt-3"
                      style={{
                        color: isExpanded ? 'var(--text-secondary)' : 'var(--accent-gold)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        transition: 'all var(--transition-base)',
                      }}
                    >
                      {isExpanded ? (
                        <>Show less <ChevronUp size={14} /></>
                      ) : (
                        <>Learn more <ChevronDown size={14} /></>
                      )}
                    </button> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section style={{
        padding: '4rem 0',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div className="container">
          <div className="text-center mb-5">
            <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Why Choose Us</div>
            <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Trusted by Thousands</h2>
          </div>

          <div className="row g-4 justify-content-center">
            {[
              { icon: '🏆', title: 'Certified & Authorized', desc: 'Official authorized center for all government and financial services' },
              { icon: '⚡', title: 'Fast Processing', desc: 'Quick turnaround time with efficient processing systems' },
              { icon: '🔒', title: 'Secure & Confidential', desc: 'Your documents and data are handled with utmost security' },
              { icon: '💬', title: '24/7 Support', desc: 'Dedicated customer support to assist you at every step' },
            ].map((item, i) => (
              <div key={i} className="col-lg-3 col-md-6">
                <div className="info-card h-100" data-aos="zoom-in" data-aos-delay={i * 100}>
                  <div className="info-icon">
                    <span style={{ fontSize: '1.3rem' }}>{item.icon}</span>
                  </div>
                  <h3 style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    marginBottom: '0.5rem',
                  }}>
                    {item.title}
                  </h3>
                  <p className="mb-0" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section style={{
        padding: '5rem 0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative background */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-gold-dim), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }} />

        <div className="container position-relative" style={{ zIndex: 2 }}>
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Get Started</div>
              <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">
                Need help with {service.title}?
              </h2>
              <p style={{
                fontSize: '1.05rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
              }}>
                Visit any of our branches or call us for quick assistance with any of our {service.title.toLowerCase()} offerings.
              </p>

              <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
                <a
                  href={`tel:${service.contactPhone || '+919487635294'}`}
                  className="btn-primary"
                  style={{ textDecoration: 'none' }}
                >
                  <Phone size={18} />
                  {service.contactPerson
                    ? `Call ${service.contactPerson}`
                    : 'Contact Us'}
                </a>
                <button className="btn-secondary" onClick={() => navigate('/', { state: { scrollToServices: true } })}>
                  <ArrowLeft size={18} /> Explore All Services
                </button>
              </div>

              {service.contactPerson && (
                <div className="info-card mb-4 mx-auto" style={{
                  maxWidth: '420px',
                  background: 'linear-gradient(135deg, rgba(0,152,69,0.08), rgba(0,152,69,0.02))',
                  border: '1px solid rgba(0,152,69,0.25)',
                }}>
                  <div className="d-flex align-items-center gap-3">
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '50%',
                      background: 'rgba(0,152,69,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.4rem', flexShrink: 0,
                    }}>🧑‍💼</div>
                    <div className="text-start">
                      <p style={{ fontSize: '0.72rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '1px', margin: 0 }}>Dedicated Contact</p>
                      <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)', margin: '0.15rem 0 0' }}>{service.contactPerson}</p>
                      <a href={`tel:${service.contactPhone}`} style={{ fontSize: '0.9rem', color: '#009845', fontWeight: 600, textDecoration: 'none' }}>
                        📞 {service.contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <div className="d-flex flex-wrap justify-content-center gap-4">
                <div className="d-flex align-items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <MapPin size={16} style={{ color: 'var(--accent-gold)' }} />
                  <a href="https://maps.app.goo.gl/7PXWkGWX1mC7zNzr9" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Marthandam, Kanyakumari District
                  </a>
                </div>
                <div className="d-flex align-items-center gap-2" style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <Clock size={16} style={{ color: 'var(--accent-gold)' }} /> Mon–Sat, 9AM–6PM
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer py-4">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              © 2024 TBR Technologies. All rights reserved.
            </div>
            <div className="d-flex align-items-center gap-2">
              <div style={{
                width: '28px', height: '28px', borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '0.8rem',
                color: '#ffffff',
              }}>T</div>
              <span className="fw-bold" style={{
                fontFamily: 'Outfit, sans-serif',
                fontSize: '1.1rem',
                color: 'var(--text-primary)',
              }}>
                TBR<span style={{ color: 'var(--accent)' }}> Technologies</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;
