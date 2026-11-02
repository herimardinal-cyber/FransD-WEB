'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PhotoProject, ProjectCategory } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

interface GalleryGridProps {
  initialProjects: PhotoProject[];
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Landscape',
  'Portrait',
  'Street',
  'Documentary',
  'Editorial',
];

export default function GalleryGrid({ initialProjects }: GalleryGridProps) {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return initialProjects;
    return initialProjects.filter(
      (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [initialProjects, activeCategory]);

  return (
    <div className="w-full">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat;
          const count =
            cat === 'All'
              ? initialProjects.length
              : initialProjects.filter((p) => p.category.toLowerCase() === cat.toLowerCase()).length;

          const label = cat === 'All' ? t.gallery.filterAll : cat;

          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.2em] rounded-full transition-all duration-300 font-medium ${
                isSelected
                  ? 'bg-[#C6AA7B] text-[#080808] shadow-[0_0_15px_rgba(198,170,123,0.3)]'
                  : 'bg-[#171717] text-[#A7A7A7] hover:text-[#F2EFE9] hover:bg-[#262626] border border-[#262626]'
              }`}
            >
              <span>{label}</span>
              <span className={`ml-2 text-[10px] font-mono ${isSelected ? 'text-[#080808]/80' : 'text-[#717171]'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-24 text-[#A7A7A7]">
          <p className="font-serif text-2xl text-[#F2EFE9] mb-2">{t.gallery.noProjectsTitle}</p>
          <p className="text-sm">{t.gallery.noProjectsDesc}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredProjects.map((project, idx) => {
            const isTall = idx % 3 === 1; // Asymmetric rhythm

            return (
              <Link
                key={project.id}
                href={`/gallery/${project.slug}`}
                className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6AA7B]"
              >
                {/* Image Container */}
                <div
                  className={`relative w-full overflow-hidden bg-[#171717] border border-[#262626]/70 ${
                    isTall ? 'aspect-[4/5]' : 'aspect-[16/11]'
                  }`}
                >
                  <Image
                    src={project.coverImage.url}
                    alt={project.coverImage.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Corner Accent Icon */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#080808]/70 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                    <ArrowUpRight className="w-4 h-4 text-[#C6AA7B]" />
                  </div>

                  {/* Category Pill on Image */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-[10px] uppercase font-mono tracking-[0.2em] px-2.5 py-1 bg-[#080808]/80 backdrop-blur-md text-[#C6AA7B] border border-[#262626]">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Project Info */}
                <div className="pt-4 flex flex-col space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-[#A7A7A7] font-mono tracking-wider">
                    <span>{project.location}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#A7A7A7] line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-[#717171]">
                    {project.photos.length} {t.gallery.photosCount}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
