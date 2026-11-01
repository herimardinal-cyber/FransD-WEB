'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';
import Lightbox from './Lightbox';
import { Maximize2 } from 'lucide-react';

interface ProjectPhotoGridProps {
  photos: Photo[];
}

export default function ProjectPhotoGrid({ photos }: ProjectPhotoGridProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  return (
    <>
      <div className="w-full">
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#262626]">
          <h2 className="font-serif text-2xl text-[#F2EFE9] tracking-wide">
            Project Plates & Frames
          </h2>
          <span className="text-xs font-mono text-[#A7A7A7] tracking-widest uppercase">
            {photos.length} Selected Works • Click to Enlarge
          </span>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {photos.map((photo, index) => {
            const isFullWidth = index % 3 === 0;

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhotoIndex(index)}
                className={`group relative cursor-pointer overflow-hidden bg-[#171717] border border-[#262626] transition-all duration-300 hover:border-[#C6AA7B]/50 ${
                  isFullWidth ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <Image
                  src={photo.url}
                  alt={photo.altText}
                  fill
                  sizes={isFullWidth ? '100vw' : '(max-width: 768px) 100vw, 50vw'}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="px-4 py-2 rounded-full bg-[#080808]/80 backdrop-blur-md border border-[#C6AA7B]/40 text-[#F2EFE9] text-xs font-mono tracking-widest uppercase flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C6AA7B]" />
                    <span>View Fullscreen</span>
                  </div>
                </div>

                {/* Caption Tag */}
                {photo.caption && (
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-xs font-serif italic text-[#F2EFE9] tracking-wide">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <Lightbox
          photos={photos}
          currentIndex={selectedPhotoIndex}
          isOpen={selectedPhotoIndex !== null}
          onClose={() => setSelectedPhotoIndex(null)}
          onNavigate={(newIndex) => setSelectedPhotoIndex(newIndex)}
        />
      )}
    </>
  );
}

