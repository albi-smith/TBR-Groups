import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CalendarDays, Clock, ArrowLeft, ArrowRight, Phone, Tag, User } from 'lucide-react';

import Navbar from '../../../components/Navbar';
import Picture from '../../../components/Picture';
import StructuredData from '../../../components/StructuredData';
import { getAllGuides, getGuideBySlug } from '../../../lib/guides';

const SITE_URL = 'https://tbr-groups.vercel.app';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  const articleUrl = `${SITE_URL}/guides/${guide.slug}`;
  const cover = guide.image ? `${SITE_URL}${guide.image}` : `${SITE_URL}/og-image.jpg`;

  return {
    title: `${guide.title} | TBR Groups`,
    description: guide.description,
    keywords: guide.tags.length ? guide.tags : undefined,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: articleUrl,
      siteName: 'TBR Groups',
      locale: 'en_IN',
      type: 'article',
      publishedTime: guide.date,
      modifiedTime: guide.updated ?? guide.date,
      authors: guide.author ? [guide.author] : ['TBR Groups'],
      images: [
        {
          url: cover,
          width: 1200,
          height: 630,
          alt: guide.imageAlt || guide.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
      images: [cover],
    },
  };
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function GuideArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const articleUrl = `${SITE_URL}/guides/${guide.slug}`;
  const related = getAllGuides().filter((g) => g.slug !== guide.slug).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.date,
    dateModified: guide.updated ?? guide.date,
    ...(guide.tags.length ? { keywords: guide.tags.join(', ') } : {}),
    ...(guide.image ? { image: [`${SITE_URL}${guide.image}`] } : {}),
    author: {
      '@type': 'Person',
      name: guide.author || 'TBR Groups',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TBR Groups',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Guides', item: `${SITE_URL}/guides` },
      { '@type': 'ListItem', position: 3, name: guide.title, item: articleUrl },
    ],
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      <Navbar title={guide.title} breadcrumbs={[{ label: 'Guides', path: '/guides' }, guide.title]} />
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />

      <main>
        {/* ── Article Header ── */}
        <section className="guide-article-header" style={{ padding: '5.5rem 0 2.5rem', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '10%',
            right: '5%',
            width: '360px',
            height: '360px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, var(--accent-gold-dim), transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }} />

          <div className="container position-relative" style={{ zIndex: 2 }}>
            <Link
              href="/guides"
              className="d-inline-flex align-items-center gap-2 mb-4"
              style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', textDecoration: 'none' }}
            >
              <ArrowLeft size={16} style={{ color: 'var(--accent-gold)' }} />
              <span style={{ fontWeight: 600 }}>Back to Guides</span>
            </Link>

            {guide.category && (
              <div className="section-label d-inline-flex" data-aos="fade-up">{guide.category}</div>
            )}
            <h1 className="section-title" style={{ maxWidth: '820px' }} data-aos="fade-up" data-aos-delay="100">
              {guide.title}
            </h1>

            <div className="d-flex flex-wrap align-items-center gap-4 mt-1 mb-4" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }} data-aos="fade-up" data-aos-delay="150">
              <span className="d-inline-flex align-items-center gap-2">
                <CalendarDays size={15} style={{ color: 'var(--accent-gold)' }} />
                {formatDate(guide.date)}
              </span>
              <span className="d-inline-flex align-items-center gap-2">
                <Clock size={15} style={{ color: 'var(--accent-gold)' }} />
                {guide.readingMinutes} min read
              </span>
              {guide.author && (
                <span className="d-inline-flex align-items-center gap-2">
                  <User size={15} style={{ color: 'var(--accent-gold)' }} />
                  By {guide.author}
                </span>
              )}
            </div>

            {guide.image && (
              <div className="guide-cover" data-aos="fade-up" data-aos-delay="200">
                <Picture
                  src={guide.image}
                  webp={guide.imageWebp}
                  alt={guide.imageAlt || guide.title}
                  className="guide-cover-img"
                  loading="eager"
                />
              </div>
            )}
          </div>
        </section>

        {/* ── Article Body ── */}
        <section style={{ padding: '0 0 4rem' }}>
          <div className="container">
            <article
              className="guide-content"
              dangerouslySetInnerHTML={{ __html: guide.html }}
            />

            {guide.tags.length > 0 && (
              <div className="d-flex flex-wrap align-items-center gap-2 mt-5 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <Tag size={15} style={{ color: 'var(--accent-gold)' }} />
                {guide.tags.map((tag) => (
                  <span key={tag} className="guide-tag">#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ padding: '0 0 5rem', position: 'relative' }}>
          <div className="container">
            <div className="guide-cta">
              <h2 className="h4" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                Need help with this?
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Talk to a real person at TBR Groups — visit any of our branches in
                Marthandam, Kanniyakumari district or call us directly.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <a href="tel:+919487635294" className="btn-primary" style={{ textDecoration: 'none' }}>
                  <Phone size={18} /> Call +91 94876 35294
                </a>
                <Link href="/" className="btn-secondary" style={{ textDecoration: 'none' }}>
                  Explore Our Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Guides ── */}
        {related.length > 0 && (
          <section style={{ padding: '0 0 5rem' }}>
            <div className="container">
              <h2 className="section-title" style={{ fontSize: '1.6rem' }}>More Guides</h2>
              <div className="row g-4 mt-1">
                {related.map((item, index) => (
                  <div className="col-md-6 col-lg-4" key={item.slug}>
                    <Link
                      href={`/guides/${item.slug}`}
                      className="guide-card"
                      style={{ textDecoration: 'none', display: 'block' }}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="guide-card-body">
                        <div className="guide-card-meta">
                          {item.category && <span className="guide-badge">{item.category}</span>}
                          <span className="guide-card-date">
                            <CalendarDays size={13} /> {formatDate(item.date)}
                          </span>
                        </div>
                        <h2 className="guide-card-title" style={{ fontSize: '1.15rem' }}>{item.title}</h2>
                        <div className="guide-card-foot">
                          <span className="guide-card-read">
                            <Clock size={13} /> {item.readingMinutes} min read
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
            </div>
          </section>
        )}
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
}