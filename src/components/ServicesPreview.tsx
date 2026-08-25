'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ServiceCardData } from './ServicesSection';
import Picture from './Picture';

interface ServicesPreviewProps {
  services: ServiceCardData[];
}

const PREVIEW_SERVICES = [
  'digital-solutions',
  'computer-accessories',
  'csc',
  'business-registration',
  'organic-foods',
  'project-binding',
];

export default function ServicesPreview({ services }: ServicesPreviewProps) {
  const preview = services.filter((s) => PREVIEW_SERVICES.includes(s.slug));

  return (
    <>
      <div className="text-center mb-5">
        <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Our Services</div>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Everything We Do, In One Place</h2>
        <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
          Tech, paperwork, everyday essentials — browse by category and get started in a click
        </p>
      </div>

      <div className="row g-4">
        {preview.map((service, index) => (
          <div key={service.id} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 50}>
            <Link
              href="/services"
              className="service-card h-100"
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div className="card-image-wrapper">
                <Picture
                  src={service.image}
                  webp={service.imageWebp}
                  alt={service.title}
                  className="card-image"
                  onError={(e) => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${service.color}33, var(--bg-card))`;
                    e.currentTarget.style.display = 'flex';
                  }}
                />
              </div>

              <div className="card-body">
                <h3 className="card-title">{service.title}</h3>
                <p className="card-desc">{service.desc}</p>

                <div className="d-flex align-items-center justify-content-between mt-4 pt-3" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                    {service.subServicesCount ?? 0} services available
                  </span>
                  <span className="d-flex align-items-center gap-1" style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 500 }}>
                    Explore <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-5" data-aos="fade-up">
        <Link
          href="/services"
          className="tbr-hero-btn-primary d-inline-flex align-items-center gap-2"
          style={{ textDecoration: 'none' }}
        >
          View All Services <ChevronRight size={16} />
        </Link>
      </div>
    </>
  );
}
