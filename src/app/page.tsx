import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  MapPin, Phone, Mail, Clock, ArrowRight, ArrowUpRight,
  Trophy, ShieldCheck, CircleCheck,
  MessageSquare, Globe,
  Users, Building2, LayoutGrid, CalendarCheck,
} from 'lucide-react';

import { servicesA, servicesB, allServices } from '../data/servicesData';
import { ESTABLISHED_YEAR } from '../data/siteConfig';
import HeroThemeScope from '../components/HeroThemeScope';
import Picture from '../components/Picture';
import ServicesPreview from '../components/ServicesPreview';
import EnquiryForm from '../components/EnquiryForm';
import ScrollToSection from '../components/ScrollToSection';
import SearchParamScroller from '../components/SearchParamScroller';
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

// ─────────────────────────────────────────────────────────────
// Branch data.
//
// Placeholder values (ADDRESS_TBD, PINCODE_TBD, LATITUDE_TBD,
// LONGITUDE_TBD) are intentionally left for manual completion.
// Search the codebase for "TODO" to find and fill them in.
// ─────────────────────────────────────────────────────────────
const branches = [
  {
    name: 'TBR Groups — Marthandam',
    location: 'Marthandam,',
    phone: ['+91 83004 26612', '+91 74181 05297'],
    desc: 'Head Office — All Services',
    highlight: true,
    // TODO: Full street address for the Marthandam head office
    streetAddress: 'ADDRESS_TBD',
    // TODO: PIN code for Marthandam
    postalCode: 'PINCODE_TBD',
    // TODO: Geo latitude for Marthandam (decimal degrees, e.g. "8.3131")
    latitude: 'LATITUDE_TBD',
    // TODO: Geo longitude for Marthandam (decimal degrees, e.g. "77.2320")
    longitude: 'LONGITUDE_TBD',
    mapsUrl: 'https://maps.app.goo.gl/7PXWkGWX1mC7zNzr9',
  },
  {
    name: 'TBR Innovative Trades',
    location: 'Panamugam',
    phone: ['+91 4651 295124', '+91 80723 68438'],
    desc: 'Trading & Retail Services',
    // TODO: Full street address for the Panamugam branch
    streetAddress: 'ADDRESS_TBD',
    // TODO: PIN code for Panamugam
    postalCode: 'PINCODE_TBD',
    // TODO: Geo latitude for Panamugam (decimal degrees, e.g. "8.2931")
    latitude: 'LATITUDE_TBD',
    // TODO: Geo longitude for Panamugam (decimal degrees, e.g. "77.2020")
    longitude: 'LONGITUDE_TBD',
  },
  {
    name: 'TBR Mankad',
    location: 'Mankad',
    phone: ['+91 4651 225519'],
    desc: 'Branch Office',
    // TODO: Full street address for the Mankad branch
    streetAddress: 'ADDRESS_TBD',
    // TODO: PIN code for Mankad
    postalCode: 'PINCODE_TBD',
    // TODO: Geo latitude for Mankad (decimal degrees, e.g. "8.2580")
    latitude: 'LATITUDE_TBD',
    // TODO: Geo longitude for Mankad (decimal degrees, e.g. "77.1700")
    longitude: 'LONGITUDE_TBD',
  },
];

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

const marqueeItems = [
 'Software Development', 'CSC & E-Seva', 'Document Registration',
    'Ticket Booking', 'Insurance Services', 'Banking Services',
    'Postal Services', 'Business Registration', 'Project & Designing Work',
    'Computer Accessories', 'Mobile Accessories',
    'Journals & Books', 'Organic Foods'
];

const serviceCards = (allServices as Service[]).map(({ id, slug, title, desc, color, category, image, imageWebp, subServices }) => ({
  id,
  slug,
  title,
  desc,
  color,
  category,
  image,
  imageWebp,
  subServicesCount: subServices?.length ?? 0,
}));

export default function Home() {
  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Suspense fallback={null}>
        <SearchParamScroller paramName="scroll" paramValue="services" targetId="services-section" />
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
              <div className="col-lg-6">
                {/* Badge pill (no avatar cluster — text only) */}
                <div className="tbr-hero-badge">
                  <ShieldCheck size={14} />
                  Trusted Service Partner Since {ESTABLISHED_YEAR}
                </div>

                <h1 className="tbr-hero-title">
                  Your Local Partner for Software, Systems &amp; Services
                </h1>

                <p className="tbr-hero-sub">
                  From the software you need built to the device that needs fixing, the product you're looking for, and the paperwork you'd rather skip — one call, done right
                </p>

                <div className="tbr-hero-actions">
                  <Link href="/services" className="tbr-hero-btn-primary" style={{ textDecoration: 'none' }}>
                    Explore Services <ArrowRight size={18} />
                  </Link>
                  <a href="tel:+919487635294" className="tbr-hero-btn-outline">
                    <Phone size={18} /> Call Now
                  </a>
                </div>
              </div>

              {/* Hero Right — custom SVG graphic + floating stat card */}
              <div className="col-lg-6">
                <div className="tbr-hero-visual">
                  <svg className="tbr-hero-figure" viewBox="0 0 520 460" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Laptop with service documents illustration">
                    <defs>
                      <linearGradient id="lapScreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#ffffff" />
                        <stop offset="1" stopColor="#eef4ef" />
                      </linearGradient>
                      <linearGradient id="lapBody" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#237227" />
                        <stop offset="1" stopColor="#144a16" />
                      </linearGradient>
                    </defs>

                    {/* Subtle circuit pattern */}
                    <g className="tbr-hero-circuit" strokeWidth="2" strokeLinecap="round">
                      <path d="M40 120 H110 L150 160 H250" />
                      <path d="M40 60 H80" />
                      <path d="M470 360 H440 L410 330 H320" />
                      <path d="M470 80 H420 L390 110 H330" />
                      <path d="M70 420 H110" />
                    </g>
                    <g className="tbr-hero-circuit-dots">
                      <circle cx="40" cy="120" r="5" />
                      <circle cx="250" cy="160" r="4" />
                      <circle cx="320" cy="330" r="4" />
                      <circle cx="330" cy="110" r="4" />
                      <circle cx="70" cy="420" r="5" />
                    </g>

                    {/* Laptop */}
                    <g>
                      <rect x="100" y="80" width="320" height="230" rx="18" fill="url(#lapScreen)" stroke="#dce9df" strokeWidth="1.5" />
                      {/* screen content: window bars + chart */}
                      <rect x="120" y="106" width="70" height="10" rx="5" fill="#1b5c1e" />
                      <rect x="120" y="128" width="46" height="10" rx="5" fill="#cfe2d3" />
                      <path d="M140 250 L200 210 L245 228 L320 175" stroke="#237227" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="320" cy="175" r="8" fill="#FFD786" />
                      <rect x="120" y="160" width="120" height="10" rx="5" fill="#dce9df" />
                      <rect x="120" y="180" width="100" height="10" rx="5" fill="#e4eee6" />
                      {/* base */}
                      <rect x="80" y="310" width="360" height="16" rx="8" fill="url(#lapBody)" />
                      <rect x="170" y="298" width="180" height="14" rx="7" fill="#1b5c1e" />
                    </g>

                    {/* Document with stamp/seal */}
                    <g transform="translate(330 50) rotate(4)">
                      <rect x="0" y="0" width="130" height="165" rx="12" fill="#ffffff" stroke="#dce9df" strokeWidth="1.5" />
                      {/* fold */}
                      <path d="M92 0 H130 V38 L92 0 Z" fill="#eef4ef" />
                      {/* lines */}
                      <rect x="18" y="26" width="62" height="9" rx="4.5" fill="#cfe2d3" />
                      <rect x="18" y="44" width="44" height="9" rx="4.5" fill="#e4eee6" />
                      {/* stamp seal */}
                      <circle cx="65" cy="100" r="30" stroke="#237227" strokeWidth="3" />
                      <circle cx="65" cy="100" r="24" stroke="#237227" strokeWidth="1.5" strokeOpacity="0.4" />
                      <path d="M54 100 L62 108 L77 91" stroke="#237227" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="18" y="144" width="94" height="9" rx="4.5" fill="#cfe2d3" />
                    </g>
                  </svg>

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

        {/* ═══════════════ MARQUEE BANNER ═══════════════ */}
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

        {/* ═══════════════ OUR SERVICE PILLARS ═══════════════ */}
        <section className="pillars-section">
          <div className="container">
            <div className="text-center mb-5">
              <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Service Categories</div>
              <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Our Service Pillars</h2>
            </div>

            <div className="row g-4 justify-content-center">
              {/* Category A — Tech & Software Services */}
              <div className="col-lg-4 col-md-6" data-aos="fade-right">
                <div className="pillars-card">
                  <div className="pillars-card-glow" />
                  <h3 className="pillars-title">Tech & Software</h3>
                  <p className="pillars-body">
                    Custom software development, computer &amp; mobile sales, and expert repair — built and backed by our own team.
                  </p>
                  <div className="d-flex flex-column gap-2">
                    {['3 specialized service areas', 'In-house development team', 'Sales + repair under one roof', 'Certified technicians'].map((item, i) => (
                      <div key={i} className="pillars-check">
                        <span className="pillars-check-icon"><CircleCheck size={16} /></span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category B — Government & Financial Services */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up">
                <div className="pillars-card">
                  <div className="pillars-card-glow" />
                  <h3 className="pillars-title">Government & Financial</h3>
                  <p className="pillars-body">
                    Complete government, banking, insurance, document registration, and travel booking services with authorized processing.

                  </p>
                  <div className="d-flex flex-column gap-2">
                    {['7 specialized service areas', 'Certified & authorized partners', '24/7 customer support', 'Fast & transparent processing'].map((item, i) => (
                      <div key={i} className="pillars-check">
                        <span className="pillars-check-icon"><CircleCheck size={16} /></span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category C — Retail & Everyday Essentials */}
              <div className="col-lg-4 col-md-6" data-aos="fade-left">
                <div className="pillars-card">
                  <div className="pillars-card-glow" />
                  <h3 className="pillars-title">Retail & Everyday Essentials</h3>
                  <p className="pillars-body">
                    Everyday essentials for office, school, and home — from organic foods to project support and more
                  </p>
                  <div className="d-flex flex-column gap-2">
                    {['4 product categories', 'Premium quality products', 'Competitive pricing', 'Quick delivery & support'].map((item, i) => (
                      <div key={i} className="pillars-check">
                        <span className="pillars-check-icon"><CircleCheck size={16} /></span> {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </HeroThemeScope>

      <main>

        {/* ═══════════════ SERVICES SECTION ═══════════════ */}
        <section id="services-section" style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
          <div className="container">
            <ServicesPreview services={serviceCards} />
          </div>
        </section>

        {/* ═══════════════ ABOUT SECTION ═══════════════ */}
        <section id="about-section" style={{ padding: '5rem 0', background: 'var(--bg-deep)' }}>
          <div className="container">
            <div className="row align-items-center gy-4">
              <div className="col-lg-7" data-aos="fade-right">
                <div className="section-label">About TBR Groups</div>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', maxWidth: '22ch' }}>
                  Rooted in Marthandam. One Roof for Every Service.
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '58ch' }}>
                  TBR Groups is a family-run network of businesses headquartered in Marthandam,
                  serving homes and small businesses across Kanyakumari district, Tamil Nadu.
                </p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.75, maxWidth: '58ch', marginTop: '0.75rem' }}>
                  From custom software and computer sales to government e-Seva, insurance,
                  ticketing and everyday essentials — we bring services that usually mean
                  multiple trips into one trusted stop, backed by authorised partners like
                  Net Protector, Pine Labs and Go Point.
                </p>

                <div className="tbr-hero-actions d-none d-lg-flex" style={{ marginTop: '1.75rem' }}>
                  <ScrollToSection targetId="enquiry-section" className="tbr-hero-btn-primary">
                    Get in Touch <ArrowRight size={16} />
                  </ScrollToSection>
                  <a href="tel:+919487635294" className="tbr-hero-btn-outline">
                    <Phone size={16} /> Call Now
                  </a>
                </div>
              </div>

              <div className="col-lg-5" data-aos="fade-left" data-aos-delay="100">
                <div className="row g-3">
                  {[
                    { icon: Users, value: '2K+', label: 'Happy Customers' },
                    { icon: Building2, value: `${branches.length}`, label: `Branches in Kanyakumari` },
                    { icon: LayoutGrid, value: `${(allServices as Service[]).length}`, label: 'Service Categories' },
                    { icon: CalendarCheck, value: `${ESTABLISHED_YEAR}`, label: 'Year Established' },
                  ].map(({ icon: Icon, value, label }, i) => (
                    <div key={i} className="col-6">
                      <div className="info-card h-100 text-center" style={{ padding: '1.25rem 1rem' }}>
                        <div style={{
                          width: '40px', height: '40px', borderRadius: 'var(--radius-md)',
                          background: 'var(--accent-gold-dim)', display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          color: 'var(--primary)', margin: '0 auto 0.75rem',
                        }}>
                          <Icon size={18} />
                        </div>
                        <div style={{
                          fontFamily: 'Outfit, sans-serif', fontSize: '1.5rem', fontWeight: 700,
                          color: 'var(--text-primary)', lineHeight: 1.2,
                        }}>
                          {value}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                          {label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="tbr-hero-actions d-lg-none" style={{ marginTop: '1.75rem' }}>
              <ScrollToSection targetId="enquiry-section" className="tbr-hero-btn-primary">
                Get in Touch <ArrowRight size={16} />
              </ScrollToSection>
              <a href="tel:+919487635294" className="tbr-hero-btn-outline">
                <Phone size={16} /> Call Now
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════ BRANCHES SECTION ═══════════════ */}
        <section id="branches-section" style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
          <div className="container">
            <div className="text-center mb-5">
              <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Regional Presence</div>
              <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Our Branch Network</h2>
              <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
                TBR Groups operates 4 branches across strategic locations in Kanyakumari district, Tamil Nadu.
              </p>
            </div>

            <div className="row g-4">
              {branches.map((branch, i) => (
                <div key={i} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={i * 50}>
                  <div className="branch-card" style={{
                    background: branch.highlight ? 'linear-gradient(135deg, #072a0a 0%, #031505 100%)' : 'var(--bg-card)',
                    border: branch.highlight ? '1px solid rgba(255,193,7,0.3)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '2rem',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div style={{ color: 'var(--accent-gold)', marginBottom: '1.25rem' }}><MapPin size={24} /></div>
                    <h3 style={{
                      fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', fontWeight: 700,
                      color: branch.highlight ? 'white' : 'var(--text-primary)', marginBottom: '0.5rem',
                      lineHeight: 1.3,
                    }}>
                      {branch.name}
                    </h3>
                    <p style={{
                      fontSize: '0.8rem', color: branch.highlight ? 'rgba(255,255,255,0.6)' : 'var(--text-tertiary)',
                      marginBottom: '1rem', fontWeight: 500,
                    }}>
                      {branch.location}
                    </p>
                    <p style={{
                      fontSize: '0.85rem', color: branch.highlight ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)',
                      lineHeight: 1.5, marginBottom: '1.5rem', flexGrow: 1,
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

        {/* ═══════════════ OUR PARTNERS ═══════════════ */}
        <section id="partners-section" style={{ padding: '5rem 0', background: 'var(--bg-services)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
          <div className="container">
            <div className="text-center mb-5">
              <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Verified Partnerships</div>
              <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Our Partners</h2>
              <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
                Authorised collaborations that power the hardware, software, and digital payment solutions we deliver.
              </p>
            </div>

            <div className="row g-4 justify-content-center">
              {/* Net Protector */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="0">
                <div className="info-card h-100 d-flex flex-column" style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  height: '100%',
                }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <ShieldCheck size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '1px', color: 'var(--primary)',
                    }}>
                      Authorised Channel Partner
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Net Protector
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    State-of-the-art cyber security and enterprise software solutions for businesses across India.
                  </p>
                  <div className="d-flex flex-column gap-2 mb-4" style={{ flexGrow: 1 }}>
                    {['Cyber Security & Antivirus', 'Endpoint Security (EPS)', 'Mobile Device Management'].map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                        <CircleCheck size={14} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 d-flex align-items-center gap-2 mb-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <Trophy size={14} style={{ color: 'var(--accent-gold)' }} />
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      Bronze Rated Partner · Dealer Code T-903
                    </span>
                  </div>
                  <Picture
                    src="/authorised-certificate.jpeg"
                    alt="Net Protector Authorised Partner Certificate"
                    style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
                  />
                </div>
              </div>

              {/* Pine Labs */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="100">
                <div className="info-card h-100 d-flex flex-column" style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  height: '100%',
                }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <CircleCheck size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '1px', color: 'var(--primary)',
                    }}>
                      Official POS Distributor
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Pine Labs
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Authorised POS terminal supplier powering seamless digital transactions for retail businesses.
                  </p>
                  <div className="d-flex flex-column gap-2 mb-4" style={{ flexGrow: 1 }}>
                    {['Plutus Smart POS terminal', 'Cards, UPI, EMIs & Wallets', 'Integrated retail ERP billing'].map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                        <CircleCheck size={14} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <Picture
                      src="/Pinelabs.png"
                      alt="Pine Labs POS Smart Terminal"
                      style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
                    />
                  </div>
                </div>
              </div>

              {/* Go Point */}
              <div className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                <div className="info-card h-100 d-flex flex-column" style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  height: '100%',
                }}>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <Globe size={20} style={{ color: 'var(--primary)', flexShrink: 0 }} />
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase',
                      letterSpacing: '1px', color: 'var(--primary)',
                    }}>
                      Regional Partner
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    Go Point
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                    Authorised channel dealer for Go Point billing and ticketing devices across retail and micro-billing environments.
                  </p>
                  <div className="d-flex flex-column gap-2 mb-4" style={{ flexGrow: 1 }}>
                    {['Handheld POS billing', 'Long battery life hardware', 'Local service & warranty support'].map((item, i) => (
                      <div key={i} className="d-flex align-items-center gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                        <CircleCheck size={14} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} /> {item}
                      </div>
                    ))}
                  </div>
                  <div className="pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                    <Picture
                      src="/go-point-new.png"
                      alt="Go Point Handheld Billing Device"
                      style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', display: 'block' }}
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
            <div data-aos="fade-up" style={{
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
                    fontFamily: 'Outfit, sans-serif', fontSize: '1rem', fontWeight: 600,
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

        {/* ═══════════════ ENQUIRY & CONTACT SECTION ═══════════════ */}
        <section id="enquiry-section" className="enquiry-section" style={{
          padding: '3.5rem 0',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}>
          <div className="container">
            <div className="row flex-column flex-md-row align-items-start">
              {/* Left Side: Info + Contact Rows */}
              <div className="col-lg-6 col-md-6 mb-4 mb-md-0" data-aos="fade-right">
                <div className="section-label">Get in Touch</div>
                <h2 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', marginBottom: '1.25rem', lineHeight: '1.15', maxWidth: '24ch' }}>
                  Talk to Us — We'll Take Care of It
                </h2>

                <div className="enquiry-contact-rows">
                  <div className="enquiry-contact-row">
                     <div className="enquiry-contact-icon">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="enquiry-contact-label">Direct Line</span>
                      <a href="tel:+919487635294" className="enquiry-contact-value">+91 94876 35294</a>
                    </div>
                  </div>

                  <div className="enquiry-contact-row">
                    <div className="enquiry-contact-icon">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="enquiry-contact-label">Support Email</span>
                      <a href="mailto:tbriwt@gmail.com" className="enquiry-contact-value">tbriwt@gmail.com</a>
                    </div>
                  </div>

                  <div className="enquiry-contact-row">
                    <div className="enquiry-contact-icon">
                      <Clock size={18} />
                    </div>
                    <div>
                      <span className="enquiry-contact-label">Operating Hours</span>
                      <span className="enquiry-contact-value">Mon – Sat: 9:00 AM – 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form Card */}
              <div className="col-lg-6 col-md-6" data-aos="fade-left">
                <EnquiryForm />
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
                  fontFamily: 'var(--font-poppins), Poppins, sans-serif',
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
                fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600,
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

            {/* Government & Financial */}
            <div className="col-lg-2 col-6">
              <h4 style={{
                fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--text-primary)', marginBottom: '1.5rem',
                textTransform: 'uppercase', letterSpacing: '1px',
              }}>
                Govt &amp; Finance
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
                fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600,
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
                fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600,
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
                  <Mail size={13} /> Email Us
                </a>
                <ScrollToSection targetId="enquiry-section" className="footer-link d-flex align-items-center gap-2" style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'inherit', textAlign: 'left' }}>
                  <MessageSquare size={13} /> Submit Enquiry Form
                </ScrollToSection>
                <a href="https://wa.me/919487635294" target="_blank" rel="noopener noreferrer" className="footer-link d-flex align-items-center gap-2">
                  <MessageSquare size={13} /> Direct WhatsApp
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
