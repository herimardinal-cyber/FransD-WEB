import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getProjectBySlug, getRelatedProjects, projects } from '@/data';
import ProjectPhotoGrid from '@/components/gallery/ProjectPhotoGrid';
import { ArrowLeft, ArrowRight, Calendar, MapPin } from 'lucide-react';

interface GalleryDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: GalleryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Frans Delian',
    };
  }

  return {
    title: `${project.title} — ${project.category} Portfolio`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Frans Delian Photography`,
      description: project.description,
      images: [
        {
          url: project.coverImage.url,
          width: project.coverImage.width,
          height: project.coverImage.height,
          alt: project.coverImage.altText,
        },
      ],
    },
  };
}

export default async function GalleryDetailPage({ params }: GalleryDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(slug, 2);

  return (
    <article className="min-h-screen bg-[#080808] text-[#F2EFE9] selection:bg-[#C6AA7B] selection:text-[#080808]">
      {/* ========================================================= */}
      {/* 1. CINEMATIC HERO COVER */}
      {/* ========================================================= */}
      <div className="relative h-[70vh] min-h-[500px] w-full flex items-end overflow-hidden">
        <Image
          src={project.coverImage.url}
          alt={project.coverImage.altText}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />

        {/* Hero Meta Info */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 w-full">
          <div className="flex flex-col space-y-4 max-w-4xl">
            {/* Back link */}
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C6AA7B] hover:text-[#F2EFE9] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Archive</span>
            </Link>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A7A7A7]">
              <span className="px-2.5 py-1 bg-[#171717] border border-[#262626] text-[#C6AA7B] uppercase tracking-wider">
                {project.category}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C6AA7B]" />
                {project.location}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#C6AA7B]" />
                {project.year}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F2EFE9] tracking-wide leading-tight">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. PROJECT OVERVIEW & EDITORIAL NARRATIVE */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-20 border-b border-[#1d1d1d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Narrative text */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block">
                Series Synopsis
              </span>
              <p className="font-serif text-2xl sm:text-3xl text-[#F2EFE9] leading-relaxed italic">
                &ldquo;{project.description}&rdquo;
              </p>
              {project.longDescription && (
                <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed pt-2">
                  {project.longDescription}
                </p>
              )}
            </div>

            {/* Specifications Sidebar */}
            <div className="lg:col-span-4 bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block pb-2 border-b border-[#262626]">
                Metadata & Details
              </span>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[#717171] uppercase tracking-wider block mb-1">Location</span>
                  <span className="text-[#F2EFE9]">{project.location}</span>
                </div>
                <div>
                  <span className="text-[#717171] uppercase tracking-wider block mb-1">Period</span>
                  <span className="text-[#F2EFE9]">Expedition Year {project.year}</span>
                </div>
                <div>
                  <span className="text-[#717171] uppercase tracking-wider block mb-1">Medium & Format</span>
                  <span className="text-[#F2EFE9]">Medium Format / Monochrome Platinum</span>
                </div>
                {project.client && (
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-1">Commission</span>
                    <span className="text-[#F2EFE9]">{project.client}</span>
                  </div>
                )}
                <div>
                  <span className="text-[#717171] uppercase tracking-wider block mb-1">Archive Plates</span>
                  <span className="text-[#C6AA7B] font-semibold">{project.photos.length} Works</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. PHOTO PLATES & LIGHTBOX GALLERY */}
      {/* ========================================================= */}
      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <ProjectPhotoGrid photos={project.photos} />
      </section>

      {/* ========================================================= */}
      {/* 4. RELATED / NEXT COLLECTIONS */}
      {/* ========================================================= */}
      {relatedProjects.length > 0 && (
        <section className="py-20 bg-[#0c0c0c] border-t border-[#1d1d1d]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl text-[#F2EFE9]">Other Photographic Series</h2>
              <Link
                href="/gallery"
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#A7A7A7] hover:text-[#C6AA7B] transition-colors flex items-center gap-1.5"
              >
                <span>View Full Archive</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/gallery/${rp.slug}`}
                  className="group bg-[#121212] border border-[#262626] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#C6AA7B]/50"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={rp.coverImage.url}
                      alt={rp.coverImage.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-[#080808]/90 text-[#C6AA7B] border border-[#262626]">
                        {rp.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors mb-2">
                      {rp.title}
                    </h3>
                    <p className="text-xs text-[#A7A7A7] line-clamp-2 leading-relaxed">
                      {rp.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

