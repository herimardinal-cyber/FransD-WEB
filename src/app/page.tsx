import React from 'react';
import { Metadata } from 'next';
import { getDbFeaturedProjects, getDbAllStories, getDbLandingEvents } from '@/lib/db-queries';
import HomePageClient from '@/components/home/HomePageClient';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Frans Delian — Stories Beyond The Frame',
  description:
    'Fine art and documentary photography portfolio by Frans Delian. Capturing cinematic landscapes, human portraits, and timeless visual narratives.',
};

export default async function HomePage() {
  const [featuredProjects, stories, events, profile, siteSettings] = await Promise.all([
    getDbFeaturedProjects(),
    getDbAllStories(),
    getDbLandingEvents(4),
    prisma.photographerProfile.findFirst(),
    prisma.siteSetting.findMany(),
  ]);

  const settingsMap: Record<string, string> = {};
  siteSettings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return (
    <HomePageClient
      featuredProjects={featuredProjects}
      stories={stories}
      landingEvents={events}
      profile={profile}
      settings={settingsMap}
    />
  );
}
