import React from 'react';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Providers from './providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const geist = localFont({
  src: './fonts/geist-Variable.woff2',
  weight: '100 900',
  variable: '--font-geist',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#1b5c1e',
};

export const metadata: Metadata = {
  title: 'TBR Groups | Computer Services, Software & e-Seva in Marthandam',
  description:
    'Computer sales, repair and hardware services, custom software, website development, e-Seva and business services in Marthandam, Tamil Nadu.',
  keywords:
    'TBR Groups, Marthandam, computer sales, computer repair, laptop service, custom software, website development, e-Seva, Tamil Nadu',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png',
  },
  openGraph: {
    title: 'TBR Groups | Computer Services, Software & e-Seva in Marthandam',
    description:
      'Computer sales, repair and hardware services, custom software, website development, e-Seva and business services in Marthandam, Tamil Nadu.',
    images: [
      {
        url: 'https://tbr-groups.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TBR Groups',
      },
    ],
    type: 'website',
    url: 'https://tbr-groups.vercel.app/',
    siteName: 'TBR Groups',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TBR Groups | Computer Services, Software & e-Seva in Marthandam',
    description:
      'Computer sales, repair and hardware services, custom software, website development, e-Seva and business services in Marthandam, Tamil Nadu.',
    images: ['https://tbr-groups.vercel.app/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={geist.variable}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
