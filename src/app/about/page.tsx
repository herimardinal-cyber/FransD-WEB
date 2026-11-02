import React from 'react';
import { Metadata } from 'next';
import AboutPageClient from '@/components/about/AboutPageClient';

export const metadata: Metadata = {
  title: 'About Frans Delian — Stories Beyond The Frame',
  description:
    'Biography, visual philosophy, honors, and optical discipline of international fine art photographer Frans Delian.',
};

export default function AboutPage() {
  return <AboutPageClient />;
}
