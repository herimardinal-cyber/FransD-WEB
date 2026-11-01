import React from 'react';
import { Metadata } from 'next';
import { getAllProjects } from '@/data';
import GalleryGrid from '@/components/gallery/GalleryGrid';

export const metadata: Metadata = {
  title: 'Gallery Archive — Frans Delian Photography',
  description: 'Explore the complete photographic archive of Frans Delian. Curated collections spanning Landscape, Portraiture, Street, and Documentary assignments worldwide.',
};

export default function GalleryPage() {
  const allProjects = getAllProjects('All');

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#080808] min-h-screen text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-3">
            Photographic Archive
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wide text-[#F2EFE9] mb-6">
            Visual Collections
          </h1>
          <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed">
            Each photographic body of work represents months of solitary immersion in light, geology, and human cadence. Select a category below to explore specific themes.
          </p>
        </div>

        {/* Gallery Interactive Grid */}
        <GalleryGrid initialProjects={allProjects} />
      </div>
    </div>
  );
}

