import React from 'react';
import type { Icon } from '@phosphor-icons/react';
import { Metadata } from 'next';
import {
  Phone, Clock, NavigationArrow, Crown } from '@phosphor-icons/react/ssr';

import Navbar from '../../components/Navbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import branches from '../../data/branchesData';
import BranchMapWrapper from './BranchMapWrapper';
import { ESTABLISHED_YEAR } from '../../data/siteConfig';

const SITE_URL = 'https://tbr-groups.vercel.app';

export const metadata: Metadata = {
  title: 'Our Locations | TBR Groups',
  description:
    'Find a TBR Groups branch near you in Kanyakumari district. Visit us in Marthandam, Panamugam, or Mankad for computer services, software, e-Seva, and everyday essentials.',
  keywords: [
    'TBR Groups locations', 'TBR branches Kanyakumari', 'computer services Marthandam',
    'e-Seva Panamugam', 'TBR Mankad',
  ],
  alternates: {
    canonical: `${SITE_URL}/locations`,
  },
  openGraph: {
    title: 'Our Locations | TBR Groups',
    description:
      'Find a TBR Groups branch near you in Kanyakumari district. Three branches across Tamil Nadu.',
    url: `${SITE_URL}/locations`,
    siteName: 'TBR Groups',
    locale: 'en_IN',
    type: 'website',
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: 'TBR Groups Locations' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Locations | TBR Groups',
    description: 'Find a TBR Groups branch near you in Kanyakumari district.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function LocationsPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-services)', color: 'var(--text-primary)', minHeight: '100dvh' }}>
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{ padding: '6rem 0 3rem', background: 'var(--bg-services)' }}>
        <div className="container">
          <div className="mb-4">
            <Breadcrumbs trail={['Locations']} />
          </div>
          <h1 className="section-title" style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)',
            marginBottom: '1rem',
            lineHeight: 1.15,
            maxWidth: '28ch',
          }}>
            Our Branches Across Kanyakumari District
          </h1>
          <p className="section-subtitle" style={{ maxWidth: '52ch', marginBottom: 0 }}>
            Visit TBR Groups in Marthandam, Panamugam, or Mankad for computer services, software, e-Seva, and everyday essentials.
          </p>
        </div>
      </section>

      {/* ═══════════════ BRANCH LISTINGS ═══════════════ */}
      <section style={{ padding: '0 0 5rem', background: 'var(--bg-services)' }}>
        <div className="container">
          <div className="locations-branches">
            {branches.map((branch, i) => (
              <div key={i} className={`locations-branch-card${branch.highlight ? ' locations-branch-card--featured' : ''}`}>
                <div className="locations-branch-info">
                  <div className="locations-branch-header">
                    <h2>
                      {branch.name}
                    </h2>
                    {branch.highlight && (
                      <span className="locations-head-office-badge">
                        <Crown size={11} /> Head Office
                      </span>
                    )}
                  </div>

                  <p className="locations-branch-loc">
                    {branch.location}
                  </p>

                  {branch.desc && (
                    <p className="locations-branch-desc">{branch.desc}</p>
                  )}

                  <div className="locations-branch-details">
                    <div className="locations-detail-row">
                      <Clock size={15} />
                      <span>{branch.hours}</span>
                    </div>
                    {branch.phone.map((ph, j) => (
                      <div key={j} className="locations-detail-row">
                        <Phone size={15} />
                        <a href={`tel:${ph.replace(/\s/g, '')}`}>{ph}</a>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="locations-branch-actions">
                  <a
                    href={branch.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.name + ', ' + branch.location + ', Kanyakumari, Tamil Nadu')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="locations-btn locations-btn-primary"
                  >
                    <NavigationArrow size={15} /> Directions
                  </a>
                  <a href={`tel:${branch.phone[0].replace(/\s/g, '')}`} className="locations-btn locations-btn-outline">
                    <Phone size={15} /> Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ MAP ═══════════════ */}
      <section style={{ padding: '4rem 0 5rem', background: 'var(--bg-services)' }}>
        <div className="container">
          <div className="section-label">Find Us on the Map</div>
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>
            Marthandam Head Office
          </h2>
          <div className="locations-map-wrapper">
            <BranchMapWrapper branches={branches} />
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
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
              &copy; {new Date().getFullYear()} TBR Groups. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>
              Serving Tamil Nadu since {ESTABLISHED_YEAR}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
