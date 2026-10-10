import type { Icon } from '@phosphor-icons/react';
import { FileText, Money, ShieldCheck, Code, Monitor, DeviceMobile, Printer, Backpack, Leaf } from '@phosphor-icons/react/ssr';

export interface CategoryGroup {
  id: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
}

export const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'services',
    title: 'ESeva & Finance Services',
    shortTitle: 'ESeva & Finance',
    eyebrow: 'Authorized CSC · Documents · Money',
  },
  {
    id: 'tech',
    title: 'Tech & Software',
    shortTitle: 'Tech & Software',
    eyebrow: 'Build · Host · Equip',
  },
  {
    id: 'retail',
    title: 'Retail & Everyday Essentials',
    shortTitle: 'Retail & Essentials',
    eyebrow: 'Everyday essentials',
  },
];

// Background image per category header (decorative; scrim + overlay keep text readable).
export const HEADER_BG: Record<string, { image: string; imageWebp: string }> = {
  services: {
    image: '/assets/images/csc-e-seva-online-services.jpeg',
    imageWebp: '/assets/images/csc-e-seva-online-services.webp',
  },
  tech: {
    image: '/assets/images/software-development-digital-solutions.jpeg',
    imageWebp: '/assets/images/software-development-digital-solutions.webp',
  },
  retail: {
    image: '/assets/images/stationary.jpeg',
    imageWebp: '/assets/images/stationary.webp',
  },
};

export const GROUP_INTRO: Record<string, { label: string; title: string; copy: string }> = {
  services: {
    label: 'How we help',
    title: 'Paperwork and financial tasks, handled end-to-end.',
    copy: "Applying, updating, registering or accessing essential services? Bring your documents, tell us what you need, and we'll manage the process from counter to completion — explaining every step along the way.",
  },
  tech: {
    label: 'How we help',
    title: 'Software built and hardware supplied, under one roof.',
    copy: 'From custom websites and apps to the monitors, storage and phone essentials that power them. We develop, stock, configure and support it all from our Marthandam store.',
  },
  retail: {
    label: 'How we help',
    title: 'Printed, bound and stocked for everyday use.',
    copy: 'Project reports, office printing, study supplies, books and organic groceries. Everything for your day, collected in one visit.',
  },
};

export interface CapabilityTile {
  icon: Icon;
  label: string;
  chips: string[];
}

export const CAPABILITY_TILES_BY_GROUP: Record<string, CapabilityTile[]> = {
  services: [
    {
      icon: FileText,
      label: 'Documents & Certificates',
      chips: ['PAN card', 'Passport & voter ID', 'Ration card', 'E-district certificates', 'EC, Patta & Chitta'],
    },
    {
      icon: Money,
      label: 'Payments, Banking & Loans',
      chips: ['Bills, recharge & SIM', 'AEPS & Micro ATM', 'Money transfers', 'Personal & business loans', 'FD & RD'],
    },
    {
      icon: ShieldCheck,
      label: 'Schemes & Protection',
      chips: ['LIC, health & vehicle insurance', 'Ayushman health card', 'Scholarships', 'Ex-serviceman benefits', 'Postal savings & PLI'],
    },
  ],
  tech: [
    {
      icon: Code,
      label: 'Websites & Software',
      chips: ['Business websites', 'Web applications', 'Mobile apps', 'Custom software'],
    },
    {
      icon: Monitor,
      label: 'Computer Hardware & Peripherals',
      chips: ['Monitors & hard drives', 'Processors & motherboards', 'Keyboards & mouse', 'Toner & cartridges'],
    },
    {
      icon: DeviceMobile,
      label: 'Mobile & Connectivity Extras',
      chips: ['USB drives & cables', 'CCTV & antivirus', 'Chargers & power banks', 'Cases & screen guards', 'Earphones & OTG'],
    },
  ],
  retail: [
    {
      icon: Printer,
      label: 'Printing, Binding & Design',
      chips: ['Project reports', 'Colour & B/W printing', 'Document binding', 'ID cards & certificates'],
    },
    {
      icon: Backpack,
      label: 'Office & Study Supplies',
      chips: ['Office stationery', 'Files & folders', 'Exam books', 'Children\'s books', 'Journals & mags'],
    },
    {
      icon: Leaf,
      label: 'Organic Kitchen Staples',
      chips: ['Pure honey', 'Organic spices', 'Cold-pressed oils', 'Dry fruits & nuts'],
    },
  ],
};