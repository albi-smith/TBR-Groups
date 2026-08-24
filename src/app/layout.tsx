import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import Providers from './providers';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#06080d',
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap" />
      </head>
      <body className={poppins.variable}>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
