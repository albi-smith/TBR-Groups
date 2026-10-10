import React, { Suspense } from 'react';
import type { Icon } from '@phosphor-icons/react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone, Envelope, Clock, ArrowRight, ArrowUpRight, Trophy, ShieldCheck, Medal, CheckCircle, Crown, ChatCircle, Globe, ClipboardText, Stack, Buildings, SquaresFour, CalendarCheck } from '@phosphor-icons/react/ssr';

import { servicesA, servicesB, allServices } from '../data/servicesData';
import { ESTABLISHED_YEAR } from '../data/siteConfig';
import branches from '../data/branchesData';
import HeroThemeScope, { HeroThemeBadge } from '../components/HeroThemeScope';
import Picture from '../components/Picture';
import ServicesPreview from '../components/ServicesPreview';
import SearchParamScroller from '../components/SearchParamScroller';
import HashSectionScroller from '../components/HashSectionScroller';
import StructuredData from '../components/StructuredData';
import FaqSection from '../components/FaqSection';
import { Service } from '../types';

export const metadata: Metadata = {
  title: 'TBR Groups | Computer Services, Software & e-Seva in Marthandam',
  description:
    'Computer sales, repair and hardware services, custom software, website development, e-Seva and business services in Marthandam, Tamil Nadu.',
  alternates: {
    canonical: 'https://tbr-groups.vercel.app/',
  },
};

// LocalBusiness JSON-LD blocks — one per branch (separate schema blocks).
const branchSchemas = branches.map((branch) => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: branch.name,
  description: branch.desc,
  url: 'https://tbr-groups.vercel.app/',
  telephone: '+' + branch.phone[0].replace(/[^0-9]/g, ''),
  ...(branch.mapsUrl ? { hasMap: branch.mapsUrl } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: branch.streetAddress, // TODO: replace ADDRESS_TBD with the real street address
    addressLocality: branch.location.replace(/,/g, ''),
    addressRegion: 'Tamil Nadu',
    postalCode: branch.postalCode, // TODO: replace PINCODE_TBD with the real PIN code
    addressCountry: 'IN',
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '18:00',
    },
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: branch.latitude, // TODO: replace LATITUDE_TBD with real latitude
    longitude: branch.longitude, // TODO: replace LONGITUDE_TBD with real longitude
  },
}));

// Sample clients shown in the "Our Clients" marquee.
// PPK Hospital is a real client (logo at /ppklogo.png); the rest are
// placeholders to be replaced with real client logos + names later.
const clientLogos = [
  { logo: '/ppklogo.png', name: 'PPK Hospital' },
  { logo: '/logo.png', name: 'TBR Innovative Trades' },
  { logo: '/Pinelabs.png', name: 'Pine Labs' },
  { logo: '/go-point-new.png', name: 'Go Point' },
  { logo: '/logo.png', name: 'TBR Groups' },
  { logo: '/TBR-Education-logo.svg', name: 'TBR Education' },
];

const marqueeItems = [
  'Software Development', 'CSC & E-Seva', 'Document Registration',
  'Ticket Booking', 'Insurance Services', 'Banking Services',
  'Postal Services', 'Business Registration', 'Project & Designing Work',
  'Computer Accessories', 'Mobile Accessories',
  'Journals & Books', 'Organic Foods',
];

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100dvh' }}>
      <Suspense fallback={null}>
        <SearchParamScroller paramName="scroll" paramValue="services" targetId="services-section" />
        <HashSectionScroller />
      </Suspense>

      {/* LocalBusiness JSON-LD — one block per branch */}
      {branchSchemas.map((schema, i) => (
        <StructuredData key={i} data={schema} />
      ))}

      <HeroThemeScope>
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="tbr-hero">
          {/* Decorative SVG background (reference-style, theme-driven strokes) */}
          <svg className="tbr-hero-svg-bg" width="1440" height="720" viewBox="0 0 1440 720" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path className="tbr-hero-svg-bg-line" d="M-15.227 702.342H1439.7" />
            <circle className="tbr-hero-svg-bg-line" cx="711.819" cy="372.562" r="308.334" />
            <circle className="tbr-hero-svg-bg-line" cx="16.942" cy="20.834" r="308.334" />
            <path className="tbr-hero-svg-bg-line" d="M-15.227 573.66H1439.7M-15.227 164.029H1439.7" />
            <circle className="tbr-hero-svg-bg-line" cx="782.595" cy="411.166" r="308.334" />
          </svg>

          {/* Soft gold glow behind stat card */}
          <div className="tbr-hero-glow" aria-hidden="true" />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="row align-items-center gy-5">
              <div className="col-lg-6 tbr-hero-copy">
                {/* Badge pill (no avatar cluster — text only) */}
                <HeroThemeBadge />

                <h1 className="tbr-hero-title">
                  Your Local Partner for Software, Systems &amp; Services
                </h1>

                <p className="tbr-hero-sub d-none d-md-block">
                  From the software you need built to the device that needs fixing, the product you're looking for, and the paperwork you'd rather skip — one call, done right
                </p>
                <p className="tbr-hero-sub d-md-none">
                  From software and repairs to paperwork and everyday essentials — one place, done right
                </p>

                <div className="tbr-hero-actions">
                  <Link href="/services" className="tbr-hero-btn-primary" style={{ textDecoration: 'none' }}>
                    Explore Services <ArrowRight size={18} />
                  </Link>
                  <Link href="/contact" className="tbr-hero-btn-outline" style={{ textDecoration: 'none' }}>
                    <Envelope size={18} /> Contact Us
                  </Link>
                </div>
              </div>

              {/* Hero Right — why-choose-us image + floating stat card */}
              <div className="col-lg-6">
                <div className="tbr-hero-visual">
                  <Picture
                    src="/hero.png"
                    alt="TBR Groups — trusted service handshake"
                    className="tbr-hero-image"
                    fetchPriority="high"
                  />

                  {/* Floating stat card */}
                  <div className="tbr-hero-stat">
                    <span className="tbr-hero-stat-icon">
                      <ArrowUpRight size={20} />
                    </span>
                    <div>
                      <div className="tbr-hero-stat-value">2K+</div>
                      <div className="tbr-hero-stat-label">Happy Customers</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ SERVICES MARQUEE ═══════════════ */}
        <div className="marquee-container" role="region" aria-label="Scrolling list of service categories">
          <div className="marquee-content">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span
                key={i}
                className="marquee-item"
                tabIndex={i < marqueeItems.length ? 0 : -1}
                aria-hidden={i >= marqueeItems.length}
              >
                <span className="marquee-dot" />
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ═══════════════ OUR VALUABLE CLIENTS ═══════════════
        <div className="clients-cloud">
          <div className="container">
            <div className="text-center">
              <div className="section-label d-inline-flex">Trusted by</div>
            </div>

            <div className="row g-4 justify-content-center align-items-stretch">
              {clientLogos.map((c, i) => (
                <div key={i} className="col-4 col-lg-2">
                  <div className="clients-cloud-item">
                    <Picture
                      src={c.logo}
                      alt={c.name}
                      className="clients-cloud-logo"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div> */}

        </HeroThemeScope>

      <main>

        {/* ═══════════════ SERVICES SECTION ═══════════════ */}
        <section id="services-section" style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
          <div className="container">
            <ServicesPreview />
          </div>
        </section>

        {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
        <section id="why-choose-us-section" className="why-section">
          <div className="container">
            <div className="why-header">
              <div className="why-header-text">
                <div className="why-eyebrow">Why Choose Us</div>
                <h2 className="why-title">The Easier Way to Get Things Done</h2>
                <p className="why-sub">
                  Whether it's an application, registration, repair, booking, business setup, or everyday service, most people don't need another website or office to visit. They need someone who knows the process and can help them get it done properly.
                </p>
              </div>
              <Link href="/contact" className="why-btn-top" style={{ textDecoration: 'none' }}>
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="why-grid">
              <article className="why-card why-card--featured">
                <div className="why-icon"><ClipboardText size={34} /></div>
                <h3>We Handle the Process Every Day</h3>
                <p>Forms, documents, requirements, and procedures can be confusing when you’re doing them for the first time. We handle these processes every day, helping you avoid common mistakes, unnecessary delays, and confusion.</p>
              </article>

              <article className="why-card why-card--featured">
                <div className="why-icon"><Stack size={34} /></div>
                <h3>One Visit Instead of Five</h3>
                <p>Technology services, registrations, banking support, insurance, travel bookings, printing, and more, all available in one place, so you spend less time running between different offices and service providers.</p>
              </article>

              <article className="why-card why-card--featured">
                <div className="why-icon"><ChatCircle size={34} /></div>
                <h3>We Speak Human, Not Government Language</h3>
                <p>Confused about requirements, eligibility, documents, or next steps? We'll explain things clearly, answer your questions, and help you understand exactly what needs to be done.</p>
              </article>

              <article className="why-card why-card--featured">
                <div className="why-icon"><Phone size={34} /></div>
                <h3>Real Help When You Need It</h3>
                <p>When something isn't clear, you can speak with a real person. No automated responses, no endless searching, and no guessing what to do next.</p>
              </article>
            </div>

            <div className="why-trust-bar">
              <span className="why-trust-check"><CheckCircle size={16} /></span>
              <span>Helping students, families, professionals, business owners, and senior citizens complete important tasks with confidence.</span>
            </div>
          </div>
        </section>

        {/* ═══════════════ ABOUT SECTION ═══════════════ */}
        <section id="about-section" style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-lg-7">
                <div className="section-label">About TBR Groups</div>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', maxWidth: '22ch' }}>
                  Rooted in Marthandam. One Roof for Every Service.
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '58ch' }}>
                  TBR Groups is a network of businesses headquartered in Marthandam,
                  serving homes and small businesses across Kanyakumari district, Tamil Nadu.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '58ch', marginTop: '0.75rem' }}>
                  From custom software and computer sales to government e-Seva, insurance,
                  ticketing and everyday essentials, we bring services that usually mean
                  multiple trips into one trusted stop, backed by authorised partners like
                  Net Protector, Pine Labs and Go Point.
                </p>

                <div className="tbr-hero-actions d-none d-lg-flex" style={{ marginTop: '1.75rem' }}>
                  <Link href="/contact" className="tbr-hero-btn-primary" style={{ textDecoration: 'none' }}>
                    Contact Us <ArrowRight size={16} />
                  </Link>
                  <a href="tel:+919487635294" className="tbr-hero-btn-outline">
                    <Phone size={16} /> Call Now
                  </a>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="about-media">
                  <div className="about-stat-list">
                    {[
                      { icon: Medal, value: '3', label: 'Trusted Partners' },
                      { icon: Buildings, value: `${branches.length}`, label: 'Branches' },
                      { icon: SquaresFour, value: `${(allServices as Service[]).length}`, label: 'Service Categories' },
                      { icon: CalendarCheck, value: `${ESTABLISHED_YEAR}`, label: 'Year Established' },
                    ].map(({ icon: Icon, value, label }, i) => (
                      <div key={i} className="about-stat text-center">
                        <div className="stat-card-icon">
                          <Icon size={18} />
                        </div>
                        <div className="stat-card-value">{value}</div>
                        <div className="stat-card-label">{label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="about-image-wrap">
                    <Picture
                      src="/aboutsection.png"
                      alt="About TBR Groups in Marthandam, serving Kanyakumari district"
                      className="about-image"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="tbr-hero-actions d-lg-none" style={{ marginTop: '1.75rem' }}>
              <Link href="/contact" className="tbr-hero-btn-primary" style={{ textDecoration: 'none' }}>
                Contact Us <ArrowRight size={16} />
              </Link>
              <a href="tel:+919487635294" className="tbr-hero-btn-outline">
                <Phone size={16} /> Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════ BRANCHES SECTION ═══════════════ */}
        <section id="branches-section" style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
          <div className="container">
            <div className="mb-5">
              <div className="section-label">Our Locations</div>
              <h2 className="section-title">Find a TBR Branch Near You</h2>
              <p className="section-subtitle">
                With three branches across Kanyakumari, there&#39;s always a TBR team nearby.
              </p>
            </div>

            <div className="row g-4">
              {branches.filter(b => b.highlight || b.location === 'Panamugam').map((branch, i) => (
                <div key={i} className="col-md-6">
                  <div className="locations-preview-card">
                    <div className="locations-preview-header">
                      <div>
                        <h3 className="locations-preview-name">
                          {branch.name}
                        </h3>
                        <p className="locations-preview-loc">
                          {branch.location}
                        </p>
                      </div>
                      {branch.highlight && (
                        <span className="locations-head-office-badge">
                          <Crown size={11} /> Head Office
                        </span>
                      )}
                    </div>
                    <p className="locations-preview-desc">
                      {branch.desc}
                    </p>
                    <div className="locations-preview-details">
                      <span className="locations-detail-row">
                        <Clock size={13} /> {branch.hours}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-4">
              <Link href="/locations" className="tbr-hero-btn-primary d-inline-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
                View All Locations <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════ OUR PARTNERS ═══════════════ */}
        <section id="partners-section" style={{ padding: '5rem 0', background: 'var(--bg-services)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div className="text-center mb-5">
              <div className="section-label d-inline-flex justify-content-center">Verified Partnerships</div>
              <h2 className="section-title">Our Partners</h2>
              <p className="section-subtitle mx-auto">
                Authorised collaborations that power the hardware, software, and digital payment solutions we deliver.
              </p>
            </div>

            {/* Featured partner — horizontal card */}
            <div className="mb-4">
              <div className="info-card partner-card partner-card--featured d-flex flex-column flex-md-row align-items-stretch">
                <div className="partner-card-body d-flex flex-column">
                  <div className="partner-card-eyebrow">
                    <ShieldCheck size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span className="partner-card-eyebrow-text">
                      Authorised Channel Partner
                    </span>
                  </div>
                  <h3 className="partner-card-title">
                    Net Protector
                  </h3>
                  <p className="partner-card-desc">
                    State-of-the-art cyber security and enterprise software solutions for businesses across India.
                  </p>
                  <div className="partner-card-list mb-3">
                    {['Cyber Security & Antivirus', 'Endpoint Security (EPS)', 'Mobile Device Management'].map((item, i) => (
                      <div key={i} className="partner-card-list-item">
                        <CheckCircle size={14} className="partner-card-checkmark" /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="partner-card-footer partner-card-footer--meta">
                    <Trophy size={14} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
                    <span className="partner-card-meta">
                      Bronze Rated Partner · Dealer Code T-903
                    </span>
                  </div>
                </div>
                <div className="partner-card-media partner-card-media--side">
                  <Picture
                    src="/authorised-certificate.jpeg"
                    alt="Net Protector Authorised Partner Certificate"
                    className="partner-card-image"
                  />
                </div>
              </div>
            </div>

            {/* Two-column partners */}
            <div className="row g-4">
              {/* Pine Labs */}
              <div className="col-lg-6">
                <div className="info-card partner-card partner-card--standard d-flex flex-column">
                  <div className="partner-card-eyebrow">
                    <CheckCircle size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span className="partner-card-eyebrow-text">
                      Official POS Distributor
                    </span>
                  </div>
                  <h3 className="partner-card-title">
                    Pine Labs
                  </h3>
                  <p className="partner-card-desc">
                    Authorised POS terminal supplier powering digital transactions for retail businesses.
                  </p>
                  <div className="partner-card-list mb-4">
                    {['Plutus Smart POS terminal', 'Cards, UPI, EMIs & Wallets', 'Integrated retail ERP billing'].map((item, i) => (
                      <div key={i} className="partner-card-list-item">
                        <CheckCircle size={14} className="partner-card-checkmark" /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="partner-card-footer partner-card-footer--img pt-3">
                    <Picture
                      src="/Pinelabs.png"
                      alt="Pine Labs POS Smart Terminal"
                      className="partner-card-image"
                    />
                  </div>
                </div>
              </div>

              {/* Go Point */}
              <div className="col-lg-6">
                <div className="info-card partner-card partner-card--standard d-flex flex-column">
                  <div className="partner-card-eyebrow">
                    <Globe size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span className="partner-card-eyebrow-text">
                      Regional Partner
                    </span>
                  </div>
                  <h3 className="partner-card-title">
                    Go Point
                  </h3>
                  <p className="partner-card-desc">
                    Authorised channel dealer for Go Point billing and ticketing devices across retail and micro-billing environments.
                  </p>
                  <div className="partner-card-list mb-4">
                    {['Handheld POS billing', 'Long battery life hardware', 'Local service & warranty support'].map((item, i) => (
                      <div key={i} className="partner-card-list-item">
                        <CheckCircle size={14} className="partner-card-checkmark" /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="partner-card-footer partner-card-footer--img pt-3">
                    <Picture
                      src="/go-point-new.png"
                      alt="Go Point Handheld Billing Device"
                      className="partner-card-image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════ OUR OTHER VENTURES ═══════════════ */}
        <section style={{ padding: '3rem 0', background: 'var(--bg-surface)' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.5rem 2rem',
            }}>
              <div className="d-flex align-items-center gap-3">
                <Picture
                  src="/TBR-Education-logo.svg"
                  alt="TBR Education Logo"
                  style={{
                    width: '44px', height: '44px',
                    borderRadius: 'var(--radius-sm)',
                    objectFit: 'contain', flexShrink: 0,
                  }}
                />
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-geist), Geist, sans-serif', fontSize: '1rem', fontWeight: 600,
                    color: 'var(--text-primary)', marginBottom: '0.15rem',
                  }}>
                    TBR Innovative Education
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                    Computer courses &amp; training under the TBR family
                  </p>
                </div>
              </div>
              <a
                href="https://tbr-education.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="ventures-visit-btn d-inline-flex align-items-center gap-2"
              >
                Visit Site <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════ FAQ SECTION ═══════════════ */}
        <FaqSection />

        {/* ═══════════════ CONTACT CTA BANNER ═══════════════ */}
        <section className="contact-banner">
          <div className="container">
            <div className="contact-banner-inner" style={{ textAlign: 'left' }}>
              <div className="row align-items-center gy-3">
                <div className="col-lg-7">
                  <div className="section-label">Contact Us</div>
                  <h2 className="contact-banner-title">
                    Need Something Done? Let&apos;s Talk.
                  </h2>
                  <p className="contact-banner-sub" style={{ marginBottom: 0 }}>
                    Tell us what you need, and we&apos;ll confirm details, pricing and timing,
                    usually within the hour.
                  </p>
                </div>
                <div className="col-lg-5">
                  <div className="contact-banner-actions d-flex flex-wrap align-items-center gap-3">
                    <Link href="/contact" className="tbr-hero-btn-primary" style={{ textDecoration: 'none' }}>
                      Contact Us <ArrowRight size={18} />
                    </Link>
                    <a href="tel:+919487635294" className="tbr-hero-btn-outline" style={{ textDecoration: 'none' }}>
                      <Phone size={18} /> Call Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="footer" style={{ padding: '4rem 0 2rem' }}>
        <div className="container">
          <div className="row g-5 mb-5">
            {/* Brand */}
            <div className="col-lg-4 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-4">
                <Picture
                  src="/logo.png"
                  alt="TBR Groups Logo"
                  style={{
                    width: '36px', height: '36px', borderRadius: 'var(--radius-sm)',
                    objectFit: 'contain', flexShrink: 0,
                  }}
                />
                <span style={{
                  fontFamily: 'var(--font-geist), Geist, sans-serif',
                  fontWeight: 700, fontSize: '1.15rem', lineHeight: 1.05,
                  letterSpacing: '0.05em',
                }}>
                  TBR{' '}
                  <span style={{
                    fontWeight: 400, fontSize: '0.95em', letterSpacing: '0.08em',
                    color: 'var(--accent)',
                  }}>Groups.</span>
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '300px' }}>
                Your complete service partner. Professional services across government, finance, retail, and more.
              </p>
            </div>

            {/* Tech & Software */}
            <div className="col-lg-2 col-6">
              <h4 style={{
                fontFamily: 'var(--font-geist), Geist, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Tech &amp; Software
              </h4>
              <div className="d-flex flex-column gap-2">
                {(allServices as Service[]).filter(s => ['digital-solutions', 'computer-accessories', 'mobile-accessories'].includes(s.slug)).map(s => (
                  <Link key={s.id} href={`/service/${s.slug}`} className="footer-link"
                    style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* ESeva & Finance */}
            <div className="col-lg-2 col-6">
              <h4 style={{
                fontFamily: 'var(--font-geist), Geist, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                ESeva &amp; Finance
              </h4>
              <div className="d-flex flex-column gap-2">
                {(allServices as Service[]).filter(s => s.category === 'services').map(s => (
                  <Link key={s.id} href={`/service/${s.slug}`} className="footer-link"
                    style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Retail & Everyday */}
            <div className="col-lg-2 col-6">
              <h4 style={{
                fontFamily: 'var(--font-geist), Geist, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Retail &amp; Essentials
              </h4>
              <div className="d-flex flex-column gap-2">
                {(allServices as Service[]).filter(s => s.category === 'retail').map(s => (
                  <Link key={s.id} href={`/service/${s.slug}`} className="footer-link"
                    style={{ cursor: 'pointer', textDecoration: 'none' }}>
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="col-lg-4 col-md-6">
              <h4 style={{
                fontFamily: 'var(--font-geist), Geist, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Contact
              </h4>
              <div className="d-flex flex-column gap-3">
                <a href="tel:+919487635294" className="footer-link d-flex align-items-center gap-2">
                  <Phone size={13} /> +91 94876 35294
                </a>
                <a href="mailto:tbrinnovativetrades@gmail.com" className="footer-link d-flex align-items-center gap-2">
                  <Envelope size={13} /> Email Us
                </a>
                <Link href="/contact" className="footer-link d-flex align-items-center gap-2" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
                  <ChatCircle size={13} /> Submit Enquiry Form
                </Link>
                <a href="https://wa.me/919487635294" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center gap-2">
                  <ChatCircle size={13} /> Direct WhatsApp
                </a>
                <a href="https://tbr-education.vercel.app/" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center gap-2" style={{ color: 'var(--accent-blue-light)', fontWeight: 500 }}>
                  <Picture
                    src="/TBR-Education-logo.svg"
                    alt="TBR Education"
                    style={{ width: '16px', height: '16px', borderRadius: '3px', objectFit: 'contain', flexShrink: 0 }}
                  /> TBR Education Website
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
              © 2024 TBR Groups. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>
              Serving Tamil Nadu with professional services since establishment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
