import React from 'react';
import { Metadata } from 'next';
import AboutPageClient from '@/components/about/AboutPageClient';
import prisma from '@/lib/prisma';
import { profile as staticProfile } from '@/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About Frans Delian — Stories Beyond The Frame',
  description:
    'Biography, visual philosophy, honors, and optical discipline of international fine art photographer Frans Delian.',
};

export default async function AboutPage() {
  let dbProfile = null;
  try {
    dbProfile = await prisma.photographerProfile.findFirst();
  } catch (err) {
    console.error('Failed to fetch profile from DB:', err);
  }

  let profileData = staticProfile;
  if (dbProfile) {
    let bio = staticProfile.biography;
    try {
      bio = typeof dbProfile.biography === 'string' ? JSON.parse(dbProfile.biography) : dbProfile.biography;
    } catch {
      bio = dbProfile.biography ? dbProfile.biography.split(/\n\s*\n/).filter(Boolean) : [dbProfile.biography];
    }

    let phil = staticProfile.philosophy;
    try {
      phil = typeof dbProfile.philosophy === 'string' ? JSON.parse(dbProfile.philosophy) : dbProfile.philosophy;
    } catch {
      phil = dbProfile.philosophy ? dbProfile.philosophy.split(/\n\s*\n/).filter(Boolean) : [dbProfile.philosophy];
    }

    let bioId = null;
    if (dbProfile.biographyId) {
      try {
        bioId = JSON.parse(dbProfile.biographyId);
      } catch {
        bioId = dbProfile.biographyId.split(/\n\s*\n/).filter(Boolean);
      }
    }

    let philId = null;
    if (dbProfile.philosophyId) {
      try {
        philId = JSON.parse(dbProfile.philosophyId);
      } catch {
        philId = dbProfile.philosophyId.split(/\n\s*\n/).filter(Boolean);
      }
    }

    profileData = {
      ...staticProfile,
      displayName: dbProfile.displayName,
      tagline: dbProfile.tagline,
      taglineId: dbProfile.taglineId || undefined,
      biography: Array.isArray(bio) ? bio : [bio],
      biographyId: Array.isArray(bioId) ? bioId : bioId ? [bioId] : undefined,
      philosophy: Array.isArray(phil) ? phil : [phil],
      philosophyId: Array.isArray(philId) ? philId : philId ? [philId] : undefined,
      email: dbProfile.email,
      phone: dbProfile.phone,
      location: dbProfile.location,
      portraitImage: dbProfile.portraitImageUrl
        ? { ...staticProfile.portraitImage, url: dbProfile.portraitImageUrl }
        : staticProfile.portraitImage,
    };
  }

  return <AboutPageClient initialProfile={profileData} />;
}
