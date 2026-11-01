import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDbStoryBySlug, getDbRelatedStories, getDbAllStories } from '@/lib/db-queries';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';

interface StoryDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const all = await getDbAllStories();
  return all.map((s) => ({
    slug: s.slug,
  }));
}

export async function generateMetadata({ params }: StoryDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getDbStoryBySlug(slug);

  if (!story) {
    return {
      title: 'Story Not Found | Frans Delian',
    };
  }

  return {
    title: `${story.title} — Frans Delian Journal`,
    description: story.excerpt,
    openGraph: {
      title: `${story.title} — Frans Delian Photography`,
      description: story.excerpt,
      type: 'article',
      publishedTime: story.publishedAt,
      images: [
        {
          url: story.coverImage.url,
          width: story.coverImage.width,
          height: story.coverImage.height,
          alt: story.coverImage.altText,
        },
      ],
    },
  };
}

export default async function StoryDetailPage({ params }: StoryDetailPageProps) {
  const { slug } = await params;
  const story = await getDbStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const relatedStories = await getDbRelatedStories(slug, 2);
  const formattedDate = new Date(story.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <article className="min-h-screen bg-[#080808] text-[#F2EFE9] selection:bg-[#C6AA7B] selection:text-[#080808]">
      {/* ========================================================= */}
      {/* 1. HERO HEADER */}
      {/* ========================================================= */}
      <header className="pt-36 pb-16 sm:pb-24 max-w-4xl mx-auto px-6 text-center">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] hover:text-[#F2EFE9] transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Journal</span>
        </Link>

        <div className="flex items-center justify-center gap-3 text-xs font-mono text-[#A7A7A7] mb-6">
          <span className="uppercase tracking-widest text-[#C6AA7B]">{story.category}</span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#C6AA7B]" />
            {formattedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#C6AA7B]" />
            {story.readTime}
          </span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-[#F2EFE9] tracking-wide leading-tight mb-8">
          {story.title}
        </h1>

        <p className="font-serif italic text-lg sm:text-2xl text-[#C6AA7B] max-w-2xl mx-auto leading-relaxed">
          &ldquo;{story.excerpt}&rdquo;
        </p>
      </header>

      {/* ========================================================= */}
      {/* 2. FULL-WIDTH HERO COVER */}
      {/* ========================================================= */}
      <div className="relative w-full max-w-6xl mx-auto px-6 mb-20">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#171717] border border-[#262626] shadow-2xl">
          <Image
            src={story.coverImage.url}
            alt={story.coverImage.altText}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {story.coverImage.caption && (
          <p className="text-center text-xs font-mono text-[#A7A7A7] tracking-wider mt-4">
            Plate: {story.coverImage.caption}
          </p>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. ESSAY BODY */}
      {/* ========================================================= */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 space-y-8 text-base sm:text-lg text-[#A7A7A7] leading-[1.9] font-sans pb-24">
        {story.body.map((paragraph, index) => (
          <p
            key={index}
            className={
              index === 0
                ? 'first-letter:font-serif first-letter:text-6xl sm:first-letter:text-7xl first-letter:font-bold first-letter:float-left first-letter:mr-4 first-letter:text-[#C6AA7B] first-letter:leading-none text-[#F2EFE9]'
                : ''
            }
          >
            {paragraph}
          </p>
        ))}

        {/* Pull Quote */}
        {story.quote && (
          <figure className="my-14 py-8 px-8 sm:px-12 border-y border-[#262626] bg-[#121212]/50 text-center">
            <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#F2EFE9] leading-snug">
              &ldquo;{story.quote.text}&rdquo;
            </blockquote>
            <figcaption className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] mt-4">
              — {story.quote.author}
            </figcaption>
          </figure>
        )}

        {/* Inline Gallery Images */}
        {story.galleryImages && story.galleryImages.length > 0 && (
          <div className="my-14 space-y-8">
            {story.galleryImages.map((img) => (
              <figure key={img.id} className="bg-[#121212] border border-[#262626] overflow-hidden">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={img.url}
                    alt={img.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
                {img.caption && (
                  <figcaption className="p-4 text-xs font-mono text-[#A7A7A7] tracking-wider text-center border-t border-[#262626]">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Tags */}
        {story.tags && story.tags.length > 0 && (
          <div className="pt-10 border-t border-[#262626] flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#717171] mr-2">Topics:</span>
            {story.tags.map((t) => (
              <span
                key={t}
                className="text-xs font-mono px-3 py-1 bg-[#171717] border border-[#262626] text-[#A7A7A7] rounded-none"
              >
                #{t}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 4. RELATED STORIES */}
      {/* ========================================================= */}
      {relatedStories.length > 0 && (
        <section className="py-20 bg-[#0c0c0c] border-t border-[#1d1d1d]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="flex items-center justify-between mb-12">
              <h2 className="font-serif text-3xl text-[#F2EFE9]">Further Reading</h2>
              <Link
                href="/stories"
                className="text-xs font-mono uppercase tracking-[0.2em] text-[#A7A7A7] hover:text-[#C6AA7B] transition-colors flex items-center gap-1.5"
              >
                <span>Journal Index</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedStories.map((rs) => (
                <Link
                  key={rs.id}
                  href={`/stories/${rs.slug}`}
                  className="group bg-[#121212] border border-[#262626] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#C6AA7B]/50"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={rs.coverImage.url}
                      alt={rs.coverImage.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 bg-[#080808]/90 text-[#C6AA7B] border border-[#262626]">
                        {rs.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors mb-2">
                      {rs.title}
                    </h3>
                    <p className="text-xs text-[#A7A7A7] line-clamp-2 leading-relaxed">
                      {rs.excerpt}
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

