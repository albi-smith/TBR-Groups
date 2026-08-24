'use client';

import React, { useState, useRef, useCallback } from 'react';
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

type Category = 'all' | 'tech' | 'services' | 'retail';

const CATEGORY_TABS: { id: Category; label: string }[] = [
  { id: 'all', label: 'All Categories' },
  { id: 'tech', label: 'Tech & Software' },
  { id: 'services', label: 'Govt & Finance' },
  { id: 'retail', label: 'Retail & Essentials' },
];

const LAST_TAB_ID = CATEGORY_TABS[CATEGORY_TABS.length - 1].id;

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const chipBarRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Partial<Record<Category, HTMLButtonElement | null>>>({});
  const loopBackTimer = useRef<number | null>(null);

  const filteredServices =
    activeCategory === 'all'
      ? services
      : services.filter((s) => s.category === activeCategory);

  // Snap the selected chip flush to the left edge of the bar so every chip
  // before it is scrolled completely out of view (no-op on desktop where all
  // chips already fit). Clicking the last chip loops the bar back to the
  // first chip after a short beat so the selection is still visible.
  const handleCategoryChange = useCallback((id: Category) => {
    setActiveCategory(id);

    if (loopBackTimer.current !== null) {
      window.clearTimeout(loopBackTimer.current);
      loopBackTimer.current = null;
    }

    if (id === LAST_TAB_ID) {
      loopBackTimer.current = window.setTimeout(() => {
        loopBackTimer.current = null;
        chipBarRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
      }, 450);
      return;
    }

    requestAnimationFrame(() => {
      const bar = chipBarRef.current;
      const chip = chipRefs.current[id];
      if (!bar || !chip) return;
      const delta = chip.getBoundingClientRect().left - bar.getBoundingClientRect().left;
      bar.scrollTo({ left: Math.max(0, bar.scrollLeft + delta), behavior: 'smooth' });
    });
  }, []);

  return (
    <>
      <div className="text-center mb-5">
        <div className="section-label d-inline-flex justify-content-center" data-aos="fade-up">Our Services</div>
        <h2 className="section-title" data-aos="fade-up" data-aos-delay="100">Everything We Do, In One Place</h2>
        <p className="section-subtitle mx-auto" data-aos="fade-up" data-aos-delay="200">
          Tech, paperwork, everyday essentials — browse by category and get started in a click
        </p>
      </div>

      <div ref={chipBarRef} className="service-chip-bar mb-5" data-aos="fade-up" data-aos-delay="300" role="tablist" aria-label="Filter services by category">
        {CATEGORY_TABS.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => { chipRefs.current[tab.id as Category] = el; }}
            type="button"
            role="tab"
            aria-selected={activeCategory === tab.id}
            className={`service-chip ${activeCategory === tab.id ? 'active' : ''}`}
            onClick={() => handleCategoryChange(tab.id as Category)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="row g-4">
        {filteredServices.map((service, index) => (
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
    </>
  );
}
