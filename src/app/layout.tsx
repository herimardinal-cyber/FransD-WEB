import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { siteSettings } from '@/data';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fransdelian.com'),
  title: {
    default: `${siteSettings.title} — ${siteSettings.tagline}`,
    template: `%s | ${siteSettings.title}`,
  },
  description: siteSettings.metaDescription,
  keywords: [
    'Frans Delian',
    'Photography Portfolio',
    'Stories Beyond The Frame',
    'Editorial Photography',
    'Documentary Photography',
    'Fine Art Photography',
    'Landscape Photography',
    'Portrait Photography',
  ],
  authors: [{ name: 'Frans Delian' }],
  creator: 'Frans Delian',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fransdelian.com',
    siteName: 'Frans Delian Photography',
    title: `${siteSettings.title} — ${siteSettings.tagline}`,
    description: siteSettings.metaDescription,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&h=630&q=85',
        width: 1200,
        height: 630,
        alt: 'Frans Delian Photography — Stories Beyond The Frame',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteSettings.title} — ${siteSettings.tagline}`,
    description: siteSettings.metaDescription,
    creator: '@fransdelian',
    images: ['https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&h=630&q=85'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#080808] text-[#F2EFE9] font-sans selection:bg-[#C6AA7B] selection:text-[#080808]">
        <Navigation />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
