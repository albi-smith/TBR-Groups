'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Picture from './Picture';

export interface ServiceCardData {
  id: number;
  slug: string;
  title: string;
  desc: string;
  color: string;
  category: string;
  image?: string;
  imageWebp?: string;
  subServicesCount?: number;
}

interface ServicesSectionProps {
  services: ServiceCardData[];
}

const CATEGORY_GROUPS: { id: string; title: string }[] = [
  { id: 'services', title: 'Government & Financial Services' },
  { id: 'tech', title: 'Tech & Software' },
  { id: 'retail', title: 'Retail & Everyday Essentials' },
];

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <>
      <div className="text-center mb-5">
        <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Our Services</div>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Everything We Do, In One Place</h2>
        <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
          Tech, paperwork, everyday essentials — browse by category and get started in a click
        </p>
      </div>

      {CATEGORY_GROUPS.map((group, groupIndex) => {
        const groupServices = services.filter((s) => s.category === group.id);
        if (groupServices.length === 0) return null;

        return (
          <div key={group.id} style={{ marginTop: groupIndex > 0 ? '4rem' : 0 }}>
            <div className="text-center mb-4" data-aos="fade-up">
              <h3 className="section-title" style={{ fontSize: 'clamp(1.35rem, 2.6vw, 1.9rem)' }}>
                {group.title}
              </h3>
            </div>

            <div className="row g-4 justify-content-center">
              {groupServices.map((service, index) => (
                <div key={service.id} className="col-12 col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay={index * 50}>
                  <Link
                    href={`/service/${service.slug}`}
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
                      <h4 className="card-title">{service.title}</h4>
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
          </div>
        );
      })}
    </>
  );
}
