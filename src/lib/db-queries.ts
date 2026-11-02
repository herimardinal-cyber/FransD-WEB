import prisma from '@/lib/prisma';
import type {
  Photo as PrismaPhoto,
  PhotoProject as PrismaPhotoProject,
  Story as PrismaStory,
  Event as PrismaEvent,
} from '@prisma/client';
import { PhotoProject, Photo, Story, Event, ProjectCategory } from '@/types';
import {
  projects as mockProjects,
  stories as mockStories,
  events as mockEvents,
} from '@/data';

type PrismaProjectWithPhotos = PrismaPhotoProject & {
  photos?: PrismaPhoto[];
  coverImage?: PrismaPhoto | null;
};

type PrismaStoryWithCover = PrismaStory & {
  coverImage?: PrismaPhoto | null;
};

type PrismaEventWithCover = PrismaEvent & {
  coverImage?: PrismaPhoto | null;
};

function mapPrismaPhoto(p: PrismaPhoto): Photo {
  const orientation = p.aspectRatio?.toLowerCase();
  const aspectRatio: 'landscape' | 'portrait' | 'square' =
    orientation === 'portrait' || orientation === 'square' ? orientation : 'landscape';

  return {
    id: p.id,
    projectId: p.projectId || undefined,
    url: p.url,
    altText: p.altText || 'Photograph by Frans Delian',
    caption: p.caption || undefined,
    width: p.width || 1920,
    height: p.height || 1080,
    aspectRatio,
    exif: {
      camera: p.camera || undefined,
      lens: p.lens || undefined,
      focalLength: p.focalLength || undefined,
      aperture: p.aperture || undefined,
      shutterSpeed: p.shutterSpeed || undefined,
      iso: p.iso || undefined,
    },
    sortOrder: p.sortOrder || 0,
  };
}

function mapPrismaProject(proj: PrismaProjectWithPhotos): PhotoProject {
  const photos = Array.isArray(proj.photos) ? proj.photos.map(mapPrismaPhoto) : [];
  const primaryCoverPhoto = proj.coverImage
    ? mapPrismaPhoto(proj.coverImage)
    : photos[0] || {
        id: `cover-${proj.id}`,
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=90',
        altText: proj.title,
        width: 1920,
        height: 1080,
        aspectRatio: 'landscape',
        sortOrder: 0,
      };

  return {
    id: proj.id,
    title: proj.title,
    slug: proj.slug,
    description: proj.description,
    longDescription: proj.longDescription || proj.description,
    category: (proj.category || 'Editorial') as ProjectCategory,
    year: proj.year,
    location: proj.location || 'Global',
    coverImage: primaryCoverPhoto,
    status: proj.status as 'PUBLISHED' | 'DRAFT' | 'ARCHIVED',
    featured: Boolean(proj.featured),
    sortOrder: proj.sortOrder || 0,
    publishedAt: proj.publishedAt ? new Date(proj.publishedAt).toISOString() : new Date().toISOString(),
    photos,
    client: proj.client || undefined,
  };
}

function mapPrismaStory(s: PrismaStoryWithCover): Story {
  let tags: string[] = [];
  try {
    tags = typeof s.tags === 'string' ? JSON.parse(s.tags) : [];
  } catch {
    tags = typeof s.tags === 'string' ? s.tags.split(',').map((t: string) => t.trim()) : [];
  }

  const paragraphs = s.body ? s.body.split(/\n\s*\n/).filter(Boolean) : [s.excerpt];

  const coverPhoto: Photo = s.coverImage
    ? mapPrismaPhoto(s.coverImage)
    : {
        id: `cover-${s.id}`,
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=90',
        altText: s.title,
        width: 1920,
        height: 1080,
        aspectRatio: 'landscape',
        sortOrder: 0,
      };

  return {
    id: s.id,
    title: s.title,
    slug: s.slug,
    excerpt: s.excerpt,
    body: paragraphs,
    coverImage: coverPhoto,
    status: s.status as 'PUBLISHED' | 'DRAFT',
    publishedAt: s.publishedAt ? new Date(s.publishedAt).toISOString() : new Date().toISOString(),
    readTime: s.readTime || '5 min read',
    category: s.category || tags[0] || 'Field Notes',
    tags,
    quote: s.quoteText
      ? {
          text: s.quoteText,
          author: s.quoteAuthor || 'Frans Delian',
        }
      : undefined,
  };
}

function mapPrismaEvent(e: PrismaEventWithCover): Event {
  const coverPhoto: Photo = e.coverImage
    ? mapPrismaPhoto(e.coverImage)
    : {
        id: `cover-${e.id}`,
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=90',
        altText: e.title,
        width: 1920,
        height: 1080,
        aspectRatio: 'landscape',
        sortOrder: 0,
      };

  const eventType = e.eventType || 'Solo Exhibition';

  let schedule: { time: string; activity: string }[] | undefined;
  if (e.scheduleJson) {
    try {
      schedule = JSON.parse(e.scheduleJson);
    } catch {
      schedule = undefined;
    }
  }

  return {
    id: e.id,
    title: e.title,
    slug: e.slug,
    description: e.description,
    venue: e.venue,
    city: e.city,
    country: e.country,
    startsAt: e.startsAt ? new Date(e.startsAt).toISOString() : new Date().toISOString(),
    endsAt: e.endsAt ? new Date(e.endsAt).toISOString() : new Date().toISOString(),
    coverImage: coverPhoto,
    status: e.status as 'UPCOMING' | 'PAST' | 'ONGOING',
    eventType,
    curator: e.curator || 'Frans Delian Studio',
    entryFee: e.entryFee || undefined,
    schedule,
  };
}

/* ========================================================================= */
/* PUBLIC DB QUERIES WITH FALLBACK TO STATIC SEED DATA                        */
/* ========================================================================= */

export async function getDbFeaturedProjects(): Promise<PhotoProject[]> {
  try {
    const projects = await prisma.photoProject.findMany({
      where: { status: 'PUBLISHED', featured: true },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
        coverImage: true,
      },
      orderBy: { sortOrder: 'asc' },
    });

    if (projects && projects.length > 0) {
      return projects.map(mapPrismaProject);
    }
  } catch (error) {
    console.warn('Falling back to static projects:', error);
  }

  return mockProjects.filter((p) => p.featured && p.status === 'PUBLISHED');
}

export async function getDbAllProjects(category?: string): Promise<PhotoProject[]> {
  try {
    const projects = await prisma.photoProject.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
        coverImage: true,
      },
      orderBy: { sortOrder: 'asc' },
    });

    if (projects && projects.length > 0) {
      const mapped = projects.map(mapPrismaProject);
      if (!category || category === 'All') return mapped;
      return mapped.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }
  } catch (error) {
    console.warn('Falling back to static projects:', error);
  }

  const published = mockProjects.filter((p) => p.status === 'PUBLISHED');
  if (!category || category === 'All') return published;
  return published.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getDbProjectBySlug(slug: string): Promise<PhotoProject | undefined> {
  try {
    const project = await prisma.photoProject.findUnique({
      where: { slug },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
        coverImage: true,
      },
    });

    if (project) {
      return mapPrismaProject(project);
    }
  } catch (error) {
    console.warn('Falling back to static project search:', error);
  }

  return mockProjects.find((p) => p.slug === slug);
}

export async function getDbRelatedProjects(currentSlug: string, limit = 2): Promise<PhotoProject[]> {
  try {
    const projects = await prisma.photoProject.findMany({
      where: {
        status: 'PUBLISHED',
        slug: { not: currentSlug },
      },
      include: {
        photos: { orderBy: { sortOrder: 'asc' } },
        coverImage: true,
      },
      take: limit,
      orderBy: { sortOrder: 'asc' },
    });

    if (projects && projects.length > 0) {
      return projects.map(mapPrismaProject);
    }
  } catch (error) {
    console.warn('Falling back to static related projects:', error);
  }

  return mockProjects
    .filter((p) => p.slug !== currentSlug && p.status === 'PUBLISHED')
    .slice(0, limit);
}

export async function getDbAllStories(): Promise<Story[]> {
  try {
    const stories = await prisma.story.findMany({
      where: { status: 'PUBLISHED' },
      include: { coverImage: true },
      orderBy: { publishedAt: 'desc' },
    });

    if (stories && stories.length > 0) {
      return stories.map(mapPrismaStory);
    }
  } catch (error) {
    console.warn('Falling back to static stories:', error);
  }

  return mockStories.filter((s) => s.status === 'PUBLISHED');
}

export async function getDbStoryBySlug(slug: string): Promise<Story | undefined> {
  try {
    const story = await prisma.story.findUnique({
      where: { slug },
      include: { coverImage: true },
    });

    if (story) {
      return mapPrismaStory(story);
    }
  } catch (error) {
    console.warn('Falling back to static story search:', error);
  }

  return mockStories.find((s) => s.slug === slug);
}

export async function getDbRelatedStories(currentSlug: string, limit = 2): Promise<Story[]> {
  try {
    const stories = await prisma.story.findMany({
      where: {
        status: 'PUBLISHED',
        slug: { not: currentSlug },
      },
      include: { coverImage: true },
      take: limit,
      orderBy: { publishedAt: 'desc' },
    });

    if (stories && stories.length > 0) {
      return stories.map(mapPrismaStory);
    }
  } catch (error) {
    console.warn('Falling back to static related stories:', error);
  }

  return mockStories
    .filter((s) => s.slug !== currentSlug && s.status === 'PUBLISHED')
    .slice(0, limit);
}

export async function getDbAllEvents(): Promise<Event[]> {
  try {
    const events = await prisma.event.findMany({
      include: { coverImage: true },
      orderBy: { startsAt: 'desc' },
    });

    if (events && events.length > 0) {
      return events.map(mapPrismaEvent);
    }
  } catch (error) {
    console.warn('Falling back to static events:', error);
  }

  return mockEvents;
}

export async function getDbLandingEvents(limit = 4): Promise<Event[]> {
  try {
    // 1. Fetch upcoming / ongoing events first (ascending by date)
    const upcoming = await prisma.event.findMany({
      where: {
        status: { in: ['UPCOMING', 'ONGOING'] },
      },
      include: { coverImage: true },
      orderBy: { startsAt: 'asc' },
    });

    // 2. Fetch past events (descending, most recent first)
    const past = await prisma.event.findMany({
      where: {
        status: 'PAST',
      },
      include: { coverImage: true },
      orderBy: { startsAt: 'desc' },
    });

    // Combine: active events first, then recent exhibitions
    const combined = [...upcoming, ...past].slice(0, limit);
    if (combined && combined.length > 0) {
      return combined.map(mapPrismaEvent);
    }
  } catch (error) {
    console.warn('Falling back to static landing events:', error);
  }

  const allMock = [...mockEvents].sort(
    (a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime()
  );
  return allMock.slice(0, limit);
}

export async function getDbUpcomingEvents(): Promise<Event[]> {
  try {
    const events = await prisma.event.findMany({
      where: {
        status: { in: ['UPCOMING', 'ONGOING'] },
      },
      include: { coverImage: true },
      orderBy: { startsAt: 'asc' },
    });

    if (events && events.length > 0) {
      return events.map(mapPrismaEvent);
    }
  } catch (error) {
    console.warn('Falling back to static upcoming events:', error);
  }

  return mockEvents.filter((e) => e.status === 'UPCOMING' || e.status === 'ONGOING');
}

export async function getDbPastEvents(): Promise<Event[]> {
  try {
    const events = await prisma.event.findMany({
      where: { status: 'PAST' },
      include: { coverImage: true },
      orderBy: { startsAt: 'desc' },
    });

    if (events && events.length > 0) {
      return events.map(mapPrismaEvent);
    }
  } catch (error) {
    console.warn('Falling back to static past events:', error);
  }

  return mockEvents.filter((e) => e.status === 'PAST');
}

export async function getDbEventBySlug(slug: string): Promise<Event | undefined> {
  try {
    const event = await prisma.event.findUnique({
      where: { slug },
      include: { coverImage: true },
    });

    if (event) {
      return mapPrismaEvent(event);
    }
  } catch (error) {
    console.warn('Falling back to static event search:', error);
  }

  return mockEvents.find((e) => e.slug === slug);
}
