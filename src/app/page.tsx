import React from 'react';
import { Metadata } from 'next';
import { getDbFeaturedProjects, getDbAllStories, getDbLandingEvents } from '@/lib/db-queries';
import HomePageClient from '@/components/home/HomePageClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Frans Delian — Stories Beyond The Frame',
  description:
    'Fine art and documentary photography portfolio by Frans Delian. Capturing cinematic landscapes, human portraits, and timeless visual narratives.',
};

export default async function HomePage() {
  const [featuredProjects, stories, events] = await Promise.all([
    getDbFeaturedProjects(),
    getDbAllStories(),
    getDbLandingEvents(4),
  ]);

  return (
    <HomePageClient
      featuredProjects={featuredProjects}
      stories={stories}
      landingEvents={events}
    />
  );
}
