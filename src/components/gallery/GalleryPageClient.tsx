'use client';

import React from 'react';
import { PhotoProject } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import GalleryGrid from '@/components/gallery/GalleryGrid';

interface GalleryPageClientProps {
  initialProjects: PhotoProject[];
}

export default function GalleryPageClient({ initialProjects }: GalleryPageClientProps) {
  const { t } = useLanguage();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#080808] min-h-screen text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-3">
            {t.gallery.archive}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wide text-[#F2EFE9] mb-6">
            {t.gallery.title}
          </h1>
          <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed">
            {t.gallery.description}
          </p>
        </div>

        {/* Gallery Interactive Grid */}
        <GalleryGrid initialProjects={initialProjects} />
      </div>
    </div>
  );
}
