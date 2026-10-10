import React from 'react';
import type { Icon } from '@phosphor-icons/react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, BookOpen, Phone } from '@phosphor-icons/react/ssr';

import Navbar from '../../components/Navbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import StructuredData from '../../components/StructuredData';
import { getAllGuides } from '../../lib/guides';
import type { GuideSummary } from '../../types';

const SITE_URL = 'https://tbr-groups.vercel.app';

export const metadata: Metadata = {
  title: 'Guides & Articles | TBR Groups',
  description:
    'Practical local guides and articles from TBR Groups in Marthandam covering computer services, software, e-Seva, banking and everyday tips for Kanniyakumari district.',
  keywords: [
    'TBR Groups guides', 'computer services Marthandam', 'e-Seva guide',
    'software tips Kanniyakumari', 'local business guides',
  ],
  alternates: {
    canonical: `${SITE_URL}/guides`,
  },
  openGraph: {
    title: 'Guides & Articles | TBR Groups',
    description:
      'Practical local guides and articles from TBR Groups in Marthandam covering computer services, software, e-Seva, banking and everyday tips.',
    url: `${SITE_URL}/guides`,
    siteName: 'TBR Groups',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'TBR Groups',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Guides & Articles | TBR Groups',
    description:
      'Practical local guides and articles from TBR Groups in Marthandam covering computer services, software, e-Seva, banking and everyday tips.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function GuidesPage() {
  const guides = getAllGuides();

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TBR Groups — Guides & Articles',
    description:
      'Practical local guides and articles from TBR Groups in Marthandam, Kanniyakumari district.',
    url: `${SITE_URL}/guides`,
    publisher: {
      '@type': 'Organization',
      name: 'TBR Groups',
      url: SITE_URL,
    },
    ...(guides.length > 0
      ? {
          blogPost: guides.map((guide: GuideSummary) => ({
            '@type': 'BlogPosting',
            headline: guide.title,
            description: guide.description,
            datePublished: guide.date,
            url: `${SITE_URL}/guides/${guide.slug}`,
          })),
        }
      : {}),
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100dvh' }}>
      <Navbar title="Guides" />
      <StructuredData data={blogSchema} />

      <main>
        {/* ── Header ── */}
        <section className="guide-page-hero" style={{ padding: '5.5rem 0 3.5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '15%',
            right: '8%',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--accent-gold-dim), transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <div className="mb-3">
              <Breadcrumbs trail={['Guides']} />
            </div>
            <div className="section-label d-inline-flex">Guides &amp; Insights</div>
            <h1 className="section-title">
              Local Guides from <span style={{ color: 'var(--accent-gold)' }}>TBR Groups</span>
            </h1>
            <p className="section-subtitle">
              Practical, easy-to-follow articles about computer services, software,
              e-Seva, banking and everyday essentials, written for our community in
              Marthandam and across Kanniyakumari district.
            </p>
          </div>
        </section>

        {/* ── Listing ── */}
        <section style={{ padding: '0 0 5rem' }}>
          <div className="container">
            {guides.length > 0 ? (
              <div className="row g-4">
                {guides.map((guide, index) => (
                  <div className="col-md-6 col-lg-4" key={guide.slug}>
                    <Link
                      href={`/guides/${guide.slug}`}
                      className="guide-card"
                      style={{ textDecoration: 'none', display: 'block' }}
                    >
                      {guide.image && (
                        <div className="guide-card-cover">
                          {/* eslint-disable-next-line @next/next/no-img-element -- cover images are optional and may not have dimensions */}
                          <img
                            src={guide.image}
                            alt={guide.imageAlt || guide.title}
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="guide-card-body">
                        <div className="guide-card-meta">
                          {guide.category && <span className="guide-badge">{guide.category}</span>}
                          <span className="guide-card-date">
                            <Calendar size={13} /> {formatDate(guide.date)}
                          </span>
                        </div>
                        <h2 className="guide-card-title">{guide.title}</h2>
                        <p className="guide-card-desc">{guide.description}</p>
                        <div className="guide-card-foot">
                          <span className="guide-card-read">
                            <Clock size={13} /> {guide.readingMinutes} min read
                          </span>
                          <span className="guide-card-arrow">
                            Read <ArrowRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="guide-empty">
                <BookOpen size={40} style={{ color: 'var(--accent-gold)' }} />
                <h2 className="h4" style={{ fontFamily: 'var(--font-geist), Geist, sans-serif' }}>Guides are being written</h2>
                <p className="text-secondary">
                  We're preparing practical local guides. In the meantime, reach out
                  and we'll help you directly.
                </p>
                <a href="tel:+919487635294" className="btn-primary" style={{ textDecoration: 'none' }}>
                  <Phone size={18} /> Contact Us
                </a>
              </div>
            )}
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
}