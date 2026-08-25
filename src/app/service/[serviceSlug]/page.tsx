import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft, Phone, MapPin, Clock, FileText, Timer,
  IndianRupee, ClipboardList, Search, Trophy, Zap,
  Lock, MessageSquare,
} from 'lucide-react';

import { allServices } from '../../../data/servicesData';
import Navbar from '../../../components/Navbar';
import Picture from '../../../components/Picture';
import ServiceScrollToTop from '../../../components/ServiceScrollToTop';
import { Service } from '../../../types';

interface PageProps {
  params: Promise<{ serviceSlug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return (allServices as Service[]).map((service) => ({
    serviceSlug: service.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { serviceSlug } = await params;
  const service = (allServices as Service[]).find((s) => s.slug === serviceSlug);
  if (!service) return {};

  return {
    title: `${service.title} | TBR Groups`,
    description: service.desc,
    alternates: {
      canonical: `https://tbr-groups.vercel.app/service/${service.slug}`,
    },
  };
}

const ServicePage = async ({ params }: PageProps) => {
  const { serviceSlug } = await params;
  const typedAllServices = allServices as Service[];
  const service = typedAllServices.find((s) => s.slug === serviceSlug);

  if (!service) {
    return (
      <div className="d-flex flex-column align-items-center justify-content-center" style={{
        minHeight: '100vh',
        background: 'var(--bg-services)',
        gap: '1.5rem',
      }}>
        <div style={{ fontSize: '4rem', color: 'var(--accent-gold)' }}><Search size={56} /></div>
        <h1 className="h2" style={{ fontFamily: 'Outfit, sans-serif', color: 'var(--text-primary)' }}>
          Service Not Found
        </h1>
        <p className="text-secondary">The service you're looking for doesn't exist.</p>
        <Link href="/" className="btn-primary navbar-back-btn" style={{ textDecoration: 'none' }}>
          <ArrowLeft className="navbar-back-icon" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-services)', minHeight: '100vh' }}>
      <ServiceScrollToTop />
      <Navbar title={service.title} breadcrumbs={[service.title]} />

      <main>
        {/* ── Hero Section with Background Image ── */}
        <section className="service-hero" style={{
          padding: '7.5rem 0 3.5rem',
          position: 'relative',
        }}>
          <Picture
            src={service.heroImage}
            webp={service.heroImageWebp}
            alt={service.title}
            className="service-hero-bg"
            fetchPriority="high"
          />
          <div className="service-hero-overlay" />

          {/* Back Button inside Hero - below the navbar rows */}
          <Link
            href={{ pathname: '/', query: { scroll: 'services' } }}
            className="btn d-none d-md-flex align-items-center gap-2 px-3 py-2 border rounded-pill bg-glass navbar-back-btn service-hero-back"
            style={{
              position: 'absolute',
              left: '1.5rem',
              fontSize: '0.85rem',
              color: 'rgba(255, 255, 255, 0.95)',
              borderColor: 'rgba(255, 255, 255, 0.35)',
              zIndex: 15,
              transition: 'all 0.3s ease',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={16} style={{ color: '#FFD786' }} />
            <span style={{ fontWeight: 600 }}>Home</span>
          </Link>

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
                <h1 className="display-4 fw-bold mb-3" style={{
                  fontFamily: 'Outfit, sans-serif',
                  color: 'var(--text-primary)',
                }}>
                  {service.title}
                </h1>

                <p className="lead text-secondary mb-4" style={{ maxWidth: '600px' }}>
                  {service.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

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
              {service.subServices.map((sub, index) => (
                <div
                  key={index}
                  className="col-lg-4 col-md-6"
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
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
                      />
                    </div>

                    {/* Top section */}
                    <div className="d-flex align-items-start gap-3">
                      <div className="flex-grow-1">
                        <h3 style={{
                          fontFamily: 'Outfit, sans-serif',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          marginBottom: '0.4rem',
                          lineHeight: 1.3,
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

                    {/* Details */}
                    {sub.details && (
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
                            {sub.details.description}
                          </p>
                        </div>

                        <div className="row g-3">
                          {sub.details.requirements && sub.details.requirements.length > 0 && (
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
                                  {sub.details.requirements.map((req, i) => (
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

                          <div className="col-md-4">
                            <div className="d-flex flex-column gap-3 h-100">
                              {sub.details.duration && (
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
                                    {sub.details.duration}
                                  </p>
                                </div>
                              )}

                              {sub.details.price && (
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
                                    {sub.details.price}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
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
                { icon: <Trophy size={24} />, title: 'Certified & Authorized', desc: 'Official authorized center for all government and financial services' },
                { icon: <Zap size={24} />, title: 'Fast Processing', desc: 'Quick turnaround time with efficient processing systems' },
                { icon: <Lock size={24} />, title: 'Secure & Confidential', desc: 'Your documents and data are handled with utmost security' },
                { icon: <MessageSquare size={24} />, title: '24/7 Support', desc: 'Dedicated customer support to assist you at every step' },
              ].map((item, i) => (
                <div key={i} className="col-lg-3 col-md-6">
                  <div className="info-card h-100" data-aos="zoom-in" data-aos-delay={i * 100}>
                    <div className="info-icon">
                      <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
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
                    href="tel:+919487635294"
                    className="btn-primary"
                    style={{ textDecoration: 'none' }}
                  >
                    <Phone size={18} /> Contact Us
                  </a>
                  <Link href={{ pathname: '/', query: { scroll: 'services' } }} className="btn-secondary" style={{ textDecoration: 'none' }}>
                    <ArrowLeft size={18} /> Explore All Services
                  </Link>
                </div>

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
      </main>

      {/* ── Footer ── */}
      <footer className="footer py-4">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
              © 2024 TBR Groups. All rights reserved.
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
                fontFamily: 'var(--font-poppins), Poppins, sans-serif',
                fontSize: '1.15rem',
                lineHeight: 1.05,
                letterSpacing: '0.05em',
                color: 'var(--text-primary)',
              }}>
                TBR<span style={{
                  fontWeight: 400, fontSize: '0.95em', letterSpacing: '0.08em',
                  color: 'var(--accent)',
                }}> Technologies</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ServicePage;
