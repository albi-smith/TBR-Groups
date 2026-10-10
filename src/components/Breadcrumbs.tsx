import React from 'react';
import Link from 'next/link';
import { CaretRight } from '@phosphor-icons/react/ssr';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  trail: (string | Crumb)[];
  className?: string;
}

export default function Breadcrumbs({ trail, className = '' }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={`tbr-crumbs ${className}`}>
      <Link href="/" className="tbr-crumb-link">Home</Link>
      {trail.map((crumb, i) => {
        const label = typeof crumb === 'string' ? crumb : crumb.label;
        const path = typeof crumb === 'string' ? undefined : crumb.path;
        const isLast = i === trail.length - 1;
        return (
          <React.Fragment key={`${label}-${i}`}>
            <CaretRight size={13} className="tbr-crumb-sep" aria-hidden="true" />
            {isLast || !path ? (
              <span className="tbr-crumb-current" aria-current={isLast ? 'page' : undefined}>{label}</span>
            ) : (
              <Link href={path} className="tbr-crumb-link">{label}</Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}