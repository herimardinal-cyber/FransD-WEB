import { MetadataRoute } from 'next';
import { projects, stories, events } from '@/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fransdelian.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stories`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/gallery/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  const storyRoutes: MetadataRoute.Sitemap = stories.map((s) => ({
    url: `${baseUrl}/stories/${s.slug}`,
    lastModified: new Date(s.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  const eventRoutes: MetadataRoute.Sitemap = events.map((e) => ({
    url: `${baseUrl}/events/${e.slug}`,
    lastModified: new Date(e.startsAt),
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...storyRoutes, ...eventRoutes];
}

