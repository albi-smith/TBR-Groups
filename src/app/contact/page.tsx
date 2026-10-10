import React from 'react';
import type { Icon } from '@phosphor-icons/react';
import { Metadata } from 'next';
import { Phone, Envelope, Clock } from '@phosphor-icons/react/ssr';

import Navbar from '../../components/Navbar';
import Breadcrumbs from '../../components/Breadcrumbs';
import EnquiryFormWithParams from '../../components/EnquiryFormWithParams';
import StructuredData from '../../components/StructuredData';

const SITE_URL = 'https://tbr-groups.vercel.app';

export const metadata: Metadata = {
  title: 'Contact Us | TBR Groups',
  description:
    'Contact TBR Groups in Marthandam, Tamil Nadu. Call +91 94876 35294, email or send an enquiry for computer services, software, e-Seva, banking and everyday essentials.',
  keywords: [
    'contact TBR Groups', 'TBR Groups Marthandam', 'computer services contact',
    'e-Seva Marthandam', 'Kanniyakumari computer services',
  ],
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact TBR Groups',
    description:
      'Call, email or send an enquiry to TBR Groups in Marthandam, Tamil Nadu for computer services, software, e-Seva, banking and everyday essentials.',
    url: `${SITE_URL}/contact`,
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
    title: 'Contact TBR Groups',
    description:
      'Call, email or send an enquiry to TBR Groups in Marthandam, Tamil Nadu.',
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact TBR Groups',
  url: `${SITE_URL}/contact`,
  description:
    'Call, email or send an enquiry to TBR Groups in Marthandam, Tamil Nadu.',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'TBR Groups',
    url: SITE_URL,
    telephone: '+919487635294',
    email: 'tbriwt@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Marthandam',
      addressRegion: 'Tamil Nadu',
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
  },
};

export default function ContactPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg-deep)', color: 'var(--text-primary)', minHeight: '100dvh' }}>
      <Navbar />
      <StructuredData data={contactSchema} />

      <main>
        <section id="enquiry-section" className="enquiry-section contact-enquiry" style={{
          padding: '5rem 0 4.5rem',
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          borderTop: '1px solid var(--border-subtle)',
        }}>
          <div className="container">
            <div className="mb-4">
              <Breadcrumbs trail={['Contact']} />
            </div>

            <div className="row flex-column flex-md-row align-items-start">
              {/* Left Side: Info + Contact Rows */}
              <div className="col-lg-6 col-md-6 mb-4 mb-md-0">
                <div className="section-label">Contact Us</div>
                <h1 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.4rem)', marginBottom: '1.25rem', lineHeight: '1.15', maxWidth: '24ch' }}>
                  Talk to Us — We&apos;ll Take Care of It
                </h1>
                <p className="section-subtitle" style={{ marginBottom: '1.75rem', maxWidth: '46ch' }}>
                  Share your requirement through the form or reach us directly. We&apos;ll confirm details, pricing and timing, usually within the hour.
                </p>

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
                      <Envelope size={18} />
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
              <div className="col-lg-6 col-md-6">
                <EnquiryFormWithParams />
              </div>
            </div>
          </div>
        </section>
      </main>

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