import React from 'react';
import type { Icon } from '@phosphor-icons/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, ArrowRight } from '@phosphor-icons/react/ssr';
import { allServices } from '../../data/servicesData';
import { Service } from '../../types';
import ServicesSection from '../../components/ServicesSection';
import HashSectionScroller from '../../components/HashSectionScroller';

export const metadata: Metadata = {
  title: 'All Services | TBR Groups',
  description:
    'Browse all services offered by TBR Groups: software development, government e-Seva, banking, insurance, retail, and more in Marthandam, Tamil Nadu.',
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

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;
  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100dvh' }}>
      <main className="service-page-main">
        <HashSectionScroller />
        <section className="service-page-section">
          <div className="container">
            <ServicesSection services={serviceCards} navbarProps={{ title: 'Services' }} initialCategory={cat} />
          </div>
        </section>
      </main>

      {/* ═══════════════ CTA SECTION ═══════════════ */}
      <section style={{ padding: '5rem 0', background: 'var(--bg-services)' }}>
        <div className="container text-center">
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Found What You Need? Here&#39;s What Happens Next.
          </h2>
          <p className="section-subtitle mx-auto" style={{ marginBottom: '2.5rem' }}>
            Message us your service, and we&#39;ll confirm details, pricing, and timing, usually within the hour.
          </p>
          <div className="d-flex align-items-center justify-content-center gap-3 flex-wrap">
            <Link href="/contact" className="tbr-hero-btn-primary d-inline-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
              Enquire Now <ArrowRight size={16} />
            </Link>
            <Link href="/#about-section" className="tbr-hero-btn-outline d-inline-flex align-items-center gap-2" style={{ textDecoration: 'none' }}>
              About Us
            </Link>
            <a href="tel:+919487635294" style={{
              fontSize: '0.8rem', color: 'var(--accent-gold)', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            }}>
              <Phone size={13} /> Call Now
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
