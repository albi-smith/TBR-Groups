'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Icon } from '@phosphor-icons/react';
import { ArrowRight, FileText, Money, ShieldCheck, BookOpen, Code, Monitor, DeviceMobile, Printer, Leaf, Bank, Ticket, Envelope, Buildings, PenNib, UserCheck, ClipboardText, SealCheck } from '@phosphor-icons/react/ssr';
import Navbar from './Navbar';
import Breadcrumbs from './Breadcrumbs';
import { NavbarProvider } from './NavbarContext';
import Picture from './Picture';
import CategoryIntro from './CategoryIntro';
import { CATEGORY_GROUPS } from '../data/categoryContent';

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
  navbarProps?: {
    title?: string;
  };
  initialCategory?: string;
}

// Minimal lucide icon per service (mirrors the "How we help" tile icons).
const SERVICE_CARD_ICONS: Record<string, Icon> = {
  csc: Bank,
  'document-registration': FileText,
  'ticket-booking': Ticket,
  insurance: ShieldCheck,
  banking: Money,
  postal: Envelope,
  'business-registration': Buildings,
  'digital-solutions': Code,
  'computer-accessories': Monitor,
  'mobile-accessories': DeviceMobile,
  'project-binding': Printer,
  stationary: PenNib,
  'journals-books': BookOpen,
  'organic-foods': Leaf,
};

const PROCESS_STEPS = [
  { icon: UserCheck, title: 'Walk in or message', desc: 'Drop by the counter or WhatsApp us with the service you need.' },
  { icon: ClipboardText, title: 'We check & guide', desc: 'We review the requirements and tell you exactly what to bring.' },
  { icon: FileText, title: 'We handle the paperwork', desc: 'Application, forms and follow-ups handled end-to-end by our team.' },
  { icon: SealCheck, title: 'Collect & confirm', desc: 'Get the signed-off document or confirmation, verified before handover.' },
];

export default function ServicesSection({ services, navbarProps, initialCategory }: ServicesSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORY_GROUPS[0]?.id ?? '');
  const headingRef = useRef<HTMLDivElement>(null);
  const groupTitleRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filterTabs = CATEGORY_GROUPS.map((g) => ({
    id: g.id,
    label: g.shortTitle,
  }));

  const visibleGroups = CATEGORY_GROUPS;

  // Tabs navigate to their category section (mobile only).
  const handleFilterChange = useCallback((id: string) => {
    setActiveCategory(id);
    const el = groupTitleRefs.current.find((node) => node?.dataset.category === id);
    const target = el ?? headingRef.current;
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 130;
      window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
    }
  }, []);

  // Console CTA: scroll to the category's sub-service grid.
  const handleBrowseGroup = useCallback((id: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(`esh-list-${id}`);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
      }
    });
  }, []);

  // Deep-link: ?cat=<id> jumps to that category section and activates its tab.
  useEffect(() => {
    if (!initialCategory) return;
    if (!CATEGORY_GROUPS.some((g) => g.id === initialCategory)) return;
    setActiveCategory(initialCategory);
    requestAnimationFrame(() => {
      const target =
        groupTitleRefs.current.find((node) => node?.dataset.category === initialCategory) ?? headingRef.current;
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 130;
        window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
      }
    });
  }, [initialCategory]);

  // Scroll-spy: highlight the category tab of the section currently in view.
  useEffect(() => {
    const groupEls = groupTitleRefs.current.filter(Boolean) as HTMLDivElement[];
    if (groupEls.length === 0) return;
    const THRESHOLD = 150;
    const compute = () => {
      let current = groupEls[0].dataset.category ?? CATEGORY_GROUPS[0]?.id;
      for (const el of groupEls) {
        if (el.getBoundingClientRect().top <= THRESHOLD) {
          current = el.dataset.category ?? current;
        } else {
          break;
        }
      }
      setActiveCategory((prev) => (prev === current ? prev : (current ?? '')));
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

  return (
    <NavbarProvider value={{ filterTabs, activeFilter: activeCategory, onFilterChange: handleFilterChange }}>
      <Navbar title={navbarProps?.title} />

      <div className="mb-4" ref={headingRef}>
        <div>
          <Breadcrumbs trail={['All Services']} />
        </div>
      </div>

      {visibleGroups.map((group, groupIndex) => {
        const groupServices = services.filter((s) => s.category === group.id);
        if (groupServices.length === 0) return null;

        return (
          <div
            key={group.id}
            ref={(el) => { groupTitleRefs.current[groupIndex] = el; }}
            data-category={group.id}
            style={{ marginTop: groupIndex > 0 ? '5.5rem' : 0 }}
          >
            <div>
              {/* Category photo header + "How we help" console */}
              <CategoryIntro groupId={group.id} onExplore={handleBrowseGroup} />

              {/* Service cards — uniform grid, equal size */}

              <div className="row g-4" id={`esh-list-${group.id}`}>
                {groupServices.map((service, index) => (
                  <div key={service.id} className="col-12 col-md-6 col-lg-4">
                    <div
                      className="esh-card h-100"
                      style={{ '--svc': service.color, '--svc-soft': `${service.color}24` } as React.CSSProperties}
                    >
                      <Link
                        href={`/service/${service.slug}`}
                        className="esh-card-stretch"
                        aria-label={`View ${service.title} services`}
                        tabIndex={-1}
                      />
                      <span className="esh-card-media">
                        <span className="esh-card-imgwrap">
                          <Picture
                            src={service.image}
                            webp={service.imageWebp}
                            alt={service.title}
                            className="esh-card-img"
                            loading="lazy"
                            onError={(e) => {
                              const el = e.currentTarget as HTMLElement;
                              el.style.opacity = '0';
                              el.parentElement!.parentElement!.style.background = `linear-gradient(140deg, ${service.color}26, var(--bg-services))`;
                            }}
                          />
                        </span>
                      </span>
                      <span className="esh-card-body">
                        <div className="esh-card-head">
                          <span className="esh-card-chip">
                            {(() => {
                              const Icon = SERVICE_CARD_ICONS[service.slug] ?? FileText;
                              return <Icon size={18} strokeWidth={1.9} />;
                            })()}
                          </span>
                          <h4 className="esh-card-title">{service.title}</h4>
                        </div>
                        <p className="esh-card-desc">{service.desc}</p>
                        <div className="esh-card-meta">
                          <span>{service.subServicesCount ?? 0} services available</span>
                        </div>
                        <Link href={`/service/${service.slug}`} className="esh-card-cta">
                          Browse Services <ArrowRight size={15} strokeWidth={2} />
                        </Link>
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* ESeva & Finance — how it works */}
              {group.id === 'services' && (
                <div className="esh-process">
                  {PROCESS_STEPS.map((step, i) => (
                    <div className="esh-step" key={step.title}>
                      <span className="esh-step-num">STEP {String(i + 1).padStart(2, '0')}</span>
                      <div className="esh-step-icon">
                        <step.icon size={19} strokeWidth={1.9} />
                      </div>
                      <h4 className="esh-step-title">{step.title}</h4>
                      <p className="esh-step-desc">{step.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </NavbarProvider>
  );
}