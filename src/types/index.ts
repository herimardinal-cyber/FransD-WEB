export interface Photo {
  id: string;
  projectId?: string;
  url: string;
  altText: string;
  caption?: string;
  width: number;
  height: number;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  location?: string;
  exif?: {
    camera?: string;
    lens?: string;
    focalLength?: string;
    aperture?: string;
    shutterSpeed?: string;
    iso?: string;
  };
  sortOrder: number;
}

export type ProjectCategory = 
  | 'All'
  | 'Landscape'
  | 'Portrait'
  | 'Documentary'
  | 'Street'
  | 'Editorial';

export interface PhotoProject {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  year: number;
  location: string;
  coverImage: Photo;
  status: 'PUBLISHED' | 'DRAFT' | 'ARCHIVED';
  featured: boolean;
  sortOrder: number;
  publishedAt: string;
  photos: Photo[];
  client?: string;
}

export interface Story {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string[];
  coverImage: Photo;
  status: 'PUBLISHED' | 'DRAFT';
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  galleryImages?: Photo[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  venue: string;
  city: string;
  country: string;
  startsAt: string;
  endsAt: string;
  coverImage: Photo;
  status: 'UPCOMING' | 'PAST' | 'ONGOING';
  eventType: 'Solo Exhibition' | 'Masterclass' | 'Artist Talk' | 'Photo Walk';
  curator?: string;
  entryFee?: string;
  photos?: Photo[];
  schedule?: {
    time: string;
    activity: string;
  }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  handle: string;
}

export interface PhotographerProfile {
  id: string;
  displayName: string;
  tagline: string;
  biography: string[];
  philosophy: string[];
  portraitImage: Photo;
  secondaryPortraitImage?: Photo;
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
  awards: {
    year: string;
    title: string;
    organization: string;
  }[];
  exhibitions: {
    year: string;
    title: string;
    location: string;
    type: 'Solo' | 'Group';
  }[];
  press: {
    year: string;
    publication: string;
    articleTitle: string;
  }[];
  gear: {
    category: string;
    items: string[];
  }[];
}

export interface SiteSettings {
  title: string;
  tagline: string;
  metaDescription: string;
  contactEmail: string;
  primaryLocation: string;
  copyrightYear: number;
}

