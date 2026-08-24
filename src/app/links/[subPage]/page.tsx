import React from 'react';
import type { Metadata } from 'next';
import LinkHubComponent from '../../../components/LinkHubComponent';

interface PageProps {
  params: Promise<{ subPage: string }>;
}

export function generateStaticParams() {
  return [
    { subPage: 'tbreducation' },
    { subPage: 'tbrtraders' },
    { subPage: 'education' },
    { subPage: 'trade' },
    { subPage: 'traders' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { subPage } = await params;
  const targetKey = subPage ? (
    subPage.toLowerCase().includes('trade') ? 'tbrtraders' :
    subPage.toLowerCase().includes('education') || subPage.toLowerCase().includes('edu') ? 'tbreducation' :
    subPage
  ) : '';

  const metaDataMap: Record<string, { title: string; description: string }> = {
    tbreducation: {
      title: 'TBR Education – Computer & Technology Courses | TBR Groups',
      description: 'Explore computer, software, programming, AI and technology courses with practical learning and career-focused training from TBR Education.',
    },
    tbrtraders: {
      title: 'TBR Traders – Computer, e-Seva & Trade Services | TBR Groups',
      description: 'Computer sales and service, e-Seva, business support and supply of dry fruits, honey, edible oils and bottled water from TBR Traders.',
    },
  };

  const meta = metaDataMap[targetKey] || {
    title: 'TBR Groups – Links | Technology, e-Seva & Business Services',
    description: 'Explore TBR Groups services, including computer hardware, custom software, website development, e-Seva, business support and trade supplies.',
  };

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `https://tbr-groups.vercel.app/links/${subPage}`,
    },
  };
}

export default async function LinksSubPage({ params }: PageProps) {
  const { subPage } = await params;
  return <LinkHubComponent subPage={subPage} />;
}
