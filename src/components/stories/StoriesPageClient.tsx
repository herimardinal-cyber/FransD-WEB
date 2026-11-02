'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Story } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

interface StoriesPageClientProps {
  allStories: Story[];
}

export default function StoriesPageClient({ allStories }: StoriesPageClientProps) {
  const { t, formatDate } = useLanguage();
  const featuredStory = allStories[0];
  const remainingStories = allStories.slice(1);

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#080808] min-h-screen text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-3">
            {t.stories.journal}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wide text-[#F2EFE9] mb-6">
            {t.stories.title}
          </h1>
          <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed">
            {t.stories.description}
          </p>
        </div>

        {/* FEATURED STORY BANNER */}
        {featuredStory && (
          <div className="mb-20 border border-[#262626] bg-[#121212] overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto min-h-[380px] overflow-hidden">
                <Image
                  src={featuredStory.coverImage.url}
                  alt={featuredStory.coverImage.altText}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent lg:hidden" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 bg-[#080808]/90 text-[#C6AA7B] border border-[#262626]">
                    {featuredStory.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 p-8 sm:p-12 lg:p-16 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-mono text-[#A7A7A7]">
                    <span className="text-[#C6AA7B] uppercase tracking-wider">{featuredStory.category}</span>
                    <span>•</span>
                    <span>{featuredStory.readTime}</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors leading-tight">
                    <Link href={`/stories/${featuredStory.slug}`}>{featuredStory.title}</Link>
                  </h2>

                  <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed line-clamp-4">
                    {featuredStory.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#262626] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#717171]">
                    {formatDate(featuredStory.publishedAt)}
                  </span>
                  <Link
                    href={`/stories/${featuredStory.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C6AA7B] hover:text-[#D8BD8F] transition-colors"
                  >
                    <span>{t.stories.readEssay}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ESSAYS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {remainingStories.map((story) => {
            const dateStr = formatDate(story.publishedAt);

            return (
              <article
                key={story.id}
                className="group bg-[#121212] border border-[#262626] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#C6AA7B]/50"
              >
                <Link
                  href={`/stories/${story.slug}`}
                  className="relative aspect-[16/10] w-full overflow-hidden block"
                >
                  <Image
                    src={story.coverImage.url}
                    alt={story.coverImage.altText}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:opacity-0 transition-opacity" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 bg-[#080808]/80 text-[#C6AA7B] border border-[#262626]">
                      {story.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#A7A7A7]">
                      <Calendar className="w-3 h-3 text-[#C6AA7B]" />
                      <span>{dateStr}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3 text-[#C6AA7B]" />
                      <span>{story.readTime}</span>
                    </div>

                    <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors leading-snug">
                      <Link href={`/stories/${story.slug}`}>{story.title}</Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#A7A7A7] line-clamp-3 leading-relaxed">
                      {story.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#262626]">
                    <Link
                      href={`/stories/${story.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#C6AA7B] hover:text-[#D8BD8F] transition-colors"
                    >
                      <span>{t.home.readStory}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
