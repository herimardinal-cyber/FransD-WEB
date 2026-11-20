import React from 'react';
import { Metadata } from 'next';
import { getDbPhotographerProfile, getDbSiteSettings } from '@/lib/db-queries';
import ContactPageClient from '@/components/contact/ContactPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Contact & Inquiries — Frans Delian Photography',
  description:
    'Inquire for editorial assignments, commercial campaigns, museum curation, or limited edition darkroom print acquisitions with Frans Delian.',
};

export default async function ContactPage() {
  const [profile, settings] = await Promise.all([
    getDbPhotographerProfile(),
    getDbSiteSettings(),
  ]);

  return <ContactPageClient profile={profile} settings={settings} />;
}
