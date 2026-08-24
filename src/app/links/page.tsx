import React from 'react';
import type { Metadata } from 'next';
import LinkHubComponent from '../../components/LinkHubComponent';

export const metadata: Metadata = {
  title: 'TBR Groups – Links | Technology, e-Seva & Business Services',
  description: 'Explore TBR Groups services, including computer hardware, custom software, website development, e-Seva, business support and trade supplies.',
  alternates: {
    canonical: 'https://tbr-groups.vercel.app/links',
  },
};

export default function LinksPage() {
  return <LinkHubComponent />;
}
