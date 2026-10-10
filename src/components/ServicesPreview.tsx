'use client';

import React from 'react';
import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react/ssr';
import CategoryIntro from './CategoryIntro';
import { CATEGORY_GROUPS } from '../data/categoryContent';

export default function ServicesPreview() {
  return (
    <>
      <div className="text-center mb-5">
        <div className="section-label d-inline-flex justify-content-center">Our Services</div>
        <h2 className="section-title">Everything We Do, In One Place</h2>
        <p className="section-subtitle mx-auto">
          Tech, paperwork, everyday essentials — browse by category and get started in a click
        </p>
      </div>

      {/* Category photo headers + "How we help" consoles (same as /services) */}
      {CATEGORY_GROUPS.map((group, i) => (
        <div key={group.id} style={{ marginTop: i > 0 ? '5.5rem' : '2.5rem' }}>
          <CategoryIntro groupId={group.id} />
        </div>
      ))}

      <div className="text-center mt-5">
        <Link
          href="/services"
          className="tbr-hero-btn-primary d-inline-flex align-items-center gap-2"
          style={{ textDecoration: 'none' }}
        >
          View All Services <CaretRight size={16} />
        </Link>
      </div>
    </>
  );
}
