import React from 'react';
import { Metadata } from 'next';
import { getDbAllProjects } from '@/lib/db-queries';
import GalleryPageClient from '@/components/gallery/GalleryPageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Gallery Archive — Frans Delian Photography',
  description:
    'Explore the complete photographic archive of Frans Delian. Curated collections spanning Landscape, Portraiture, Street, and Documentary assignments worldwide.',
};

export default async function GalleryPage() {
  const allProjects = await getDbAllProjects('All');

  return <GalleryPageClient initialProjects={allProjects} />;
}
