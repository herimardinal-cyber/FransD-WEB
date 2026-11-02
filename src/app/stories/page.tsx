import React from 'react';
import { Metadata } from 'next';
import { getDbAllStories } from '@/lib/db-queries';
import StoriesPageClient from '@/components/stories/StoriesPageClient';

export const metadata: Metadata = {
  title: 'Stories & Visual Essays — Frans Delian Photography',
  description:
    'Reflections on the craft of light, field journals from remote expeditions, and philosophical essays by fine art photographer Frans Delian.',
};

export default async function StoriesPage() {
  const allStories = await getDbAllStories();

  return <StoriesPageClient allStories={allStories} />;
}
