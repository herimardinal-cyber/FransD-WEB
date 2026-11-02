import React from 'react';
import { Metadata } from 'next';
import ContactPageClient from '@/components/contact/ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact & Inquiries — Frans Delian Photography',
  description:
    'Inquire for editorial assignments, commercial campaigns, museum curation, or limited edition darkroom print acquisitions with Frans Delian.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
