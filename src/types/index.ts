import React from 'react';

// SubService Details (Optional expand information)
export interface SubServiceDetails {
  description: string;
  requirements?: string[];
  duration?: string;
  price?: string;
  process?: string[];
}

// SubService interface
export interface SubService {
  name: string;
  desc: string;
  icon?: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>;
  image?: string;
  imageWebp?: string;
  details?: SubServiceDetails;
}

// Service interface
export interface Service {
  id: number;
  slug: string;
  path: string;
  title: string;
  desc: string;
  image: string;
  heroImage: string;
  category: 'tech' | 'services' | 'retail' | string;
  color: string;
  subServices: SubService[];
  imageWebp?: string;
  heroImageWebp?: string;
}

// Business Button interface
export interface LinkButton {
  label: string;
  url: string;
  icon: string;
  color: string;
}

// Business Info interface
export interface Business {
  id: string;
  title: string;
  description: string;
  logo: any; // Can be static image import object or string
  logoWebp?: any;
  logoAvif?: any;
  buttons: LinkButton[];
}

// Hero section for links
export interface LinksHero {
  logo: string;
  logoWebp?: string;
  logoAvif?: string;
  title: string;
  subtitle: string;
}

// Global Links configuration
export interface LinksConfig {
  hero: LinksHero;
  businesses: Record<string, Business>;
}

// Guide article summary — the fields surfaced on the /guides listing.
export interface GuideSummary {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date (YYYY-MM-DD)
  updated?: string; // ISO date (YYYY-MM-DD)
  category?: string;
  tags: string[];
  author?: string;
  image?: string;
  imageWebp?: string;
  imageAlt?: string;
  readingMinutes: number;
}

// Full guide article — summary + raw markdown + rendered HTML.
export interface Guide extends GuideSummary {
  content: string;
  html: string;
}
