import React from 'react';
import type { Icon } from '@phosphor-icons/react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft, Phone, MapPin, Clock, FileText, Timer, CurrencyInr, ClipboardText, MagnifyingGlass, Trophy, Lightning, Lock, ChatCircle, SealCheck, ArrowRight } from '@phosphor-icons/react/ssr';

import { allServices } from '../../../data/servicesData';
import Navbar from '../../../components/Navbar';
import Breadcrumbs from '../../../components/Breadcrumbs';
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
        minHeight: '100dvh',
        background: 'var(--bg-services)',
        gap: '1.5rem',
      }}>
        <div style={{ fontSize: '4rem', color: 'var(--accent-gold)' }}><MagnifyingGlass size={56} /></div>
        <h1 className="h2" style={{ fontFamily: 'var(--font-geist), Geist, sans-serif', color: 'var(--text-primary)' }}>
          Service Not Found
        </h1>
        <p className="text-secondary">The service you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary navbar-back-btn" style={{ textDecoration: 'none' }}>
          <ArrowLeft className="navbar-back-icon" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-services)', minHeight: '100dvh' }}>
      <ServiceScrollToTop />
      <Navbar title={service.title} />

      <main>
        {/* ── Hero Section with Background Image ── */}
        <section className="service-hero" style={{
          padding: '8rem 0 4.5rem',
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
              <div className="col-12 col-lg-10 col-xl-9">
                <h1 className="essv-title">{service.title}</h1>

                <p className="essv-desc">{service.desc}</p>

                <div className="essv-chips">
                  <span className="essv-chip"><Clock size={13} strokeWidth={2} /> Mon–Sat · 9AM–6PM</span>
                  <span className="essv-chip"><MapPin size={13} strokeWidth={2} /> Marthandam, TN</span>
                  <span className="essv-chip"><SealCheck size={13} strokeWidth={2} /> Guided counter service</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sub-Services Directory ── */}
        <section style={{ padding: '2.5rem 0 4.5rem' }}>
          <div className="container">
            <div className="essv-breadcrumbs essv-breadcrumbs--below">
              <Breadcrumbs trail={[{ label: 'All Services', path: '/services' }, { label: service.title }]} />
            </div>
            <div className="d-flex align-items-end flex-wrap gap-3 mb-4">
              <div>
                <div className="esh-group-eyebrow">What we handle</div>
                <h2 className="esh-group-title">Everything inside {service.title}</h2>
              </div>
            </div>

            <div className="row g-4">
              {service.subServices.map((sub, index) => (
                <div
                  key={index}
                  className="col-12 col-md-6 col-lg-4"
                >
                  <article className="ssvc-card h-100" style={{ '--svc': service.color, '--svc-soft': `${service.color}24` } as React.CSSProperties}>
                    {sub.image && (
                      <div className="ssvc-bg" aria-hidden="true">
                        <Picture
                          src={sub.image}
                          webp={sub.imageWebp}
                          alt=""
                          className="ssvc-bg-img"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="ssvc-tint" aria-hidden="true" />
                    <span className="ssvc-glow" aria-hidden="true" />

                    <div className="ssvc-inner">
                      <div className="ssvc-head">
                        <span className="ssvc-glass-icon">
                          {sub.icon ? <sub.icon size={20} strokeWidth={1.9} /> : <FileText size={20} strokeWidth={1.9} />}
                        </span>
                        <h3 className="ssvc-title">{sub.name}</h3>
                        <p className="ssvc-desc">{sub.desc}</p>
                      </div>

                      {sub.details && (
                        <div className="ssvc-details">
                          <div className="ssvc-details-desc">
                            <h4 className="ssvc-details-label"><FileText size={13} /> About this service</h4>
                            <p>{sub.details.description}</p>
                          </div>

                          {sub.details.requirements && sub.details.requirements.length > 0 && (
                            <div className="ssvc-req">
                              <h4 className="ssvc-details-label"><ClipboardText size={13} /> Documents required</h4>
                              <ul className="ssvc-req-list">
                                {sub.details.requirements.map((req, i) => (
                                  <li key={i} className="ssvc-req-item">{req}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="ssvc-facts">
                            {sub.details.duration && (
                              <div className="ssvc-fact">
                                <span className="ssvc-fact-label"><Timer size={13} /> Processing time</span>
                                <span className="ssvc-fact-value">{sub.details.duration}</span>
                              </div>
                            )}
                            {sub.details.price && (
                              <div className="ssvc-fact ssvc-fact--price">
                                <span className="ssvc-fact-label"><CurrencyInr size={13} /> Pricing</span>
                                <span className="ssvc-fact-value">{sub.details.price}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="ssvc-foot">
                        <div className="ssvc-actions">
                          <a
                            href="tel:+919487635294"
                            className="ssvc-act ssvc-act--call"
                            aria-label={`Call us about ${sub.name}`}
                          >
                            <Phone size={14} strokeWidth={2} /> Call
                          </a>
                          <Link
                            href={`/contact?cat=${service.category}&subject=${encodeURIComponent(`Inquiring about ${sub.name} services`)}`}
                            className="ssvc-act"
                            aria-label={`Enquire about ${sub.name}`}
                          >
                            <ChatCircle size={14} strokeWidth={2} /> Enquire
                          </Link>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section style={{
          padding: '4.5rem 0',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div className="container">
            <div className="esh-group-head mb-5">
              <div>
                <div className="esh-group-eyebrow">Why TBR</div>
                <h2 className="esh-group-title">Trusted counter for the region</h2>
              </div>
              <p className="esh-group-note">
                Official processes, walked through patiently — one document at a time.
              </p>
            </div>

            <div className="row g-4">
              {[
                { icon: <Trophy size={24} />, title: 'Certified & Authorized', desc: 'Official authorized center for all government and financial services' },
                { icon: <Lightning size={24} />, title: 'Fast Processing', desc: 'Quick turnaround time with efficient processing systems' },
                { icon: <Lock size={24} />, title: 'Secure & Confidential', desc: 'Your documents and data are handled with utmost security' },
                { icon: <ChatCircle size={24} />, title: '24/7 Support', desc: 'Dedicated customer support to assist you at every step' },
              ].map((item, i) => (
                <div key={i} className="col-lg-3 col-md-6">
                  <div className="info-card h-100">
                    <div className="info-icon">
                      <span style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.icon}</span>
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-geist), Geist, sans-serif',
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
          padding: '5.5rem 0',
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
                <div className="section-label d-inline-flex justify-content-center">Get Started</div>
                <h2 className="section-title">
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
                  <Link href="/services" className="btn-secondary" style={{ textDecoration: 'none' }}>
                    <ArrowRight size={18} /> Explore All Services
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
                fontFamily: 'var(--font-geist), Geist, sans-serif', fontWeight: 700, fontSize: '0.8rem',
                color: '#ffffff',
              }}>T</div>
              <span className="fw-bold" style={{
                fontFamily: 'var(--font-geist), Geist, sans-serif',
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