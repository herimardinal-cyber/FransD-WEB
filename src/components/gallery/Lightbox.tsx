'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { Photo } from '@/types';

interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export default function Lightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentPhoto = photos[currentIndex];

  const handlePrevious = useCallback(() => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    } else {
      onNavigate(photos.length - 1);
    }
  }, [currentIndex, photos.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex < photos.length - 1) {
      onNavigate(currentIndex + 1);
    } else {
      onNavigate(0);
    }
  }, [currentIndex, photos.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevious();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handlePrevious, handleNext, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#080808]/96 backdrop-blur-xl flex flex-col justify-between animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-[#262626]/50">
        <div className="flex items-center space-x-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#C6AA7B]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
          </span>
          {currentPhoto.location && (
            <span className="hidden sm:inline-block text-xs text-[#A7A7A7] border-l border-[#262626] pl-4">
              {currentPhoto.location}
            </span>
          )}
        </div>

        <button
          onClick={onClose}
          className="p-2 text-[#A7A7A7] hover:text-[#F2EFE9] transition-colors rounded-full hover:bg-white/5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6AA7B]"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Navigation Arrows */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 sm:left-8 z-10 p-3 text-[#A7A7A7] hover:text-[#F2EFE9] hover:bg-white/10 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6AA7B]"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>

        <div className="relative w-full h-full max-w-6xl max-h-[78vh] flex items-center justify-center">
          <Image
            src={currentPhoto.url}
            alt={currentPhoto.altText}
            fill
            sizes="100vw"
            priority
            className="object-contain select-none transition-opacity duration-300"
          />
        </div>

        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-8 z-10 p-3 text-[#A7A7A7] hover:text-[#F2EFE9] hover:bg-white/10 rounded-full transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6AA7B]"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {/* Bottom Metadata Bar */}
      <div className="px-6 sm:px-10 py-5 border-t border-[#262626]/50 bg-[#080808]/90">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="max-w-2xl">
            {currentPhoto.caption && (
              <p className="font-serif text-lg text-[#F2EFE9] tracking-wide italic">
                &ldquo;{currentPhoto.caption}&rdquo;
              </p>
            )}
            <p className="text-xs text-[#A7A7A7] mt-0.5">{currentPhoto.altText}</p>
          </div>

          {currentPhoto.exif && (
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#A7A7A7] bg-[#171717] px-3.5 py-1.5 rounded border border-[#262626]">
              <span className="flex items-center gap-1.5 text-[#C6AA7B]">
                <Camera className="w-3.5 h-3.5" />
                {currentPhoto.exif.camera}
              </span>
              {currentPhoto.exif.focalLength && <span>• {currentPhoto.exif.focalLength}</span>}
              {currentPhoto.exif.aperture && <span>• {currentPhoto.exif.aperture}</span>}
              {currentPhoto.exif.shutterSpeed && <span>• {currentPhoto.exif.shutterSpeed}</span>}
              {currentPhoto.exif.iso && <span>• ISO {currentPhoto.exif.iso}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

