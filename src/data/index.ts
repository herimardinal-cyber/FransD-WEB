import { projects } from './projects';
import { stories } from './stories';
import { events } from './events';
import { profile } from './profile';
import { siteSettings } from './site';
import { ProjectCategory, PhotoProject, Story, Event } from '@/types';

export { projects, stories, events, profile, siteSettings };

export function getFeaturedProjects(): PhotoProject[] {
  return projects.filter((p) => p.featured && p.status === 'PUBLISHED');
}

export function getAllProjects(category?: ProjectCategory | string): PhotoProject[] {
  const published = projects.filter((p) => p.status === 'PUBLISHED');
  if (!category || category === 'All') return published;
  return published.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export function getProjectBySlug(slug: string): PhotoProject | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(currentSlug: string, limit = 2): PhotoProject[] {
  return projects
    .filter((p) => p.slug !== currentSlug && p.status === 'PUBLISHED')
    .slice(0, limit);
}

export function getAllStories(): Story[] {
  return stories.filter((s) => s.status === 'PUBLISHED');
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}

export function getRelatedStories(currentSlug: string, limit = 2): Story[] {
  return stories
    .filter((s) => s.slug !== currentSlug && s.status === 'PUBLISHED')
    .slice(0, limit);
}

export function getAllEvents(): Event[] {
  return events;
}

export function getUpcomingEvents(): Event[] {
  return events.filter((e) => e.status === 'UPCOMING' || e.status === 'ONGOING');
}

export function getPastEvents(): Event[] {
  return events.filter((e) => e.status === 'PAST');
}

export function getEventBySlug(slug: string): Event | undefined {
  return events.find((e) => e.slug === slug);
}

