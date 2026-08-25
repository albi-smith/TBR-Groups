import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';
import { allServices } from '../../data/servicesData';
import { Service } from '../../types';
import ServicesSection from '../../components/ServicesSection';

export const metadata: Metadata = {
  title: 'All Services | TBR Groups',
  description:
    'Browse all services offered by TBR Groups — software development, government e-Seva, banking, insurance, retail, and more in Marthandam, Tamil Nadu.',
  alternates: {
    canonical: 'https://tbr-groups.vercel.app/services',
  },
};

const serviceCards = (allServices as Service[]).map(
  ({ id, slug, title, desc, color, category, image, imageWebp, subServices }) => ({
    id,
    slug,
    title,
    desc,
    color,
    category,
    image,
    imageWebp,
    subServicesCount: subServices?.length ?? 0,
  }),
);

export default function ServicesPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Navbar title="Services" breadcrumbs={['Services']} />

      <main style={{ paddingTop: '1.5rem', background: 'var(--bg-services)' }}>
        <section style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
          <div className="container">
            <ServicesSection services={serviceCards} />
          </div>
        </section>
      </main>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
        <div className="container text-center">
          <h2 className="section-title" data-aos="fade-up" style={{ marginBottom: '1rem' }}>
            Didn&#39;t find what you need?
          </h2>
          <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="100" style={{ marginBottom: '2.5rem' }}>
            We&#39;re here to help. Reach out and we&#39;ll find the right service for you.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap" data-aos="fade-up" data-aos-delay="200">
            <Link href="/#enquiry-section" className="tbr-hero-btn-primary d-inline-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
              Enquire Now <ArrowRight size={16} />
            </Link>
            <a href="tel:+919487635294" className="tbr-hero-btn-outline d-inline-flex align-items-center gap-2">
              <Phone size={16} /> Call Now
            </a>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ padding: '4rem 0 2rem' }}>
        <div className="container">
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
