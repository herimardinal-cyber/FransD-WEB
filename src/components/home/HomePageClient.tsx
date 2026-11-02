'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PhotoProject, Story, Event } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowDown, ArrowUpRight, ArrowRight, Calendar, MapPin } from 'lucide-react';

interface HomePageClientProps {
  featuredProjects: PhotoProject[];
  stories: Story[];
  landingEvents: Event[];
}

export default function HomePageClient({
  featuredProjects,
  stories,
  landingEvents,
}: HomePageClientProps) {
  const { t, formatDate } = useLanguage();
  const recentStories = stories.slice(0, 3);

  return (
    <div className="w-full bg-[#080808] text-[#F2EFE9] selection:bg-[#C6AA7B] selection:text-[#080808]">
      {/* ========================================================= */}
      {/* A. HERO SECTION */}
      {/* ========================================================= */}
      <section className="relative h-screen min-h-[700px] w-full flex items-center justify-center overflow-hidden">
        {/* Full-bleed Hero Photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2400&q=90"
            alt="Cinematic Icelandic highlands shrouded in morning mist"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105 animate-pulse-slow filter brightness-[0.8] contrast-[1.1]"
          />
          {/* Subtle Dark Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-black/60" />
          <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-[#C6AA7B]/40 bg-[#080808]/60 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6AA7B] animate-ping" />
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B]">
              {t.hero.badge}
            </span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.12em] uppercase font-light text-[#F2EFE9] leading-[1.05] drop-shadow-2xl">
            Frans Delian
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#C6AA7B] mt-4 tracking-wide font-normal">
            &ldquo;{t.hero.tagline}&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-[#A7A7A7] max-w-xl mx-auto mt-6 tracking-wide leading-relaxed font-sans">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              href="/gallery"
              className="px-8 py-3.5 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] text-xs font-mono uppercase tracking-[0.22em] font-semibold transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(198,170,123,0.3)]"
            >
              <span>{t.hero.exploreWork}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/about"
              className="px-8 py-3.5 bg-black/40 hover:bg-white/10 text-[#F2EFE9] hover:text-[#C6AA7B] text-xs font-mono uppercase tracking-[0.22em] border border-white/20 transition-all duration-300"
            >
              {t.hero.artistProfile}
            </Link>
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-8 inset-x-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
          <span className="text-[9px] uppercase font-mono tracking-[0.3em] text-[#A7A7A7] mb-2">
            {t.hero.scrollDiscover}
          </span>
          <ArrowDown className="w-4 h-4 text-[#C6AA7B] animate-bounce" />
        </div>
      </section>

      {/* ========================================================= */}
      {/* B. SELECTED WORKS (FEATURED PROJECTS) */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-b border-[#1d1d1d]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-2">
              {t.home.portfolio}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F2EFE9] tracking-wide">
              {t.home.selectedWorks}
            </h2>
          </div>
          <Link
            href="/gallery"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#A7A7A7] hover:text-[#C6AA7B] transition-colors group"
          >
            <span>{t.home.viewAllCollections}</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {featuredProjects.map((project, index) => {
            const colSpan =
              index === 0
                ? 'md:col-span-8'
                : index === 1
                ? 'md:col-span-4'
                : index === 2
                ? 'md:col-span-5'
                : 'md:col-span-7';

            const aspect =
              index === 1
                ? 'aspect-[4/5]'
                : index === 0
                ? 'aspect-[16/10]'
                : 'aspect-[16/11]';

            return (
              <div key={project.id} className={`${colSpan} group flex flex-col`}>
                <Link
                  href={`/gallery/${project.slug}`}
                  className="relative w-full overflow-hidden bg-[#171717] border border-[#262626] block focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6AA7B]"
                >
                  <div className={`relative w-full ${aspect} overflow-hidden`}>
                    <Image
                      src={project.coverImage.url}
                      alt={project.coverImage.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#080808]/70 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#C6AA7B]" />
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-[#A7A7A7] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>{project.location}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </Link>

                <div className="pt-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors duration-300">
                      <Link href={`/gallery/${project.slug}`}>{project.title}</Link>
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#717171]">
                    {project.photos?.length || 0} {t.gallery.photosCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================= */}
      {/* C. ARTIST PHILOSOPHY & MONOLOGUE */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 bg-[#0c0c0c] border-b border-[#1d1d1d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Portrait Preview */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden bg-[#171717] border border-[#262626] shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90"
                  alt="Portrait of Frans Delian"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover filter contrast-[1.1] grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden sm:block p-4 bg-[#080808] border border-[#262626] text-[10px] font-mono tracking-widest uppercase text-[#C6AA7B]">
                Zurich Atelier • Worldwide
              </div>
            </div>

            {/* Philosophy Text */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B]">
                {t.home.artistAndPhilosophy}
              </span>

              <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#F2EFE9] leading-[1.25] font-light italic">
                {t.home.artistQuote}
              </blockquote>

              <p className="text-[#A7A7A7] text-sm sm:text-base leading-relaxed font-sans pt-2">
                {t.home.artistBioSnippet}
              </p>

              <div className="pt-6 flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="px-7 py-3 bg-[#171717] hover:bg-[#C6AA7B] text-[#F2EFE9] hover:text-[#080808] border border-[#262626] text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300"
                >
                  {t.home.readFullBio}
                </Link>

                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#A7A7A7] hover:text-[#C6AA7B] transition-colors"
                >
                  <span>{t.home.explorePhilosophy}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Minimal Metrics */}
              <div className="grid grid-cols-3 gap-6 pt-10 border-t border-[#1d1d1d]">
                <div>
                  <span className="font-serif text-3xl text-[#F2EFE9]">15+</span>
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-[#717171] mt-1">
                    {t.home.yearsInField}
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-[#F2EFE9]">PX3</span>
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-[#717171] mt-1">
                    Gold Winner 2025
                  </span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-[#F2EFE9]">40+</span>
                  <span className="block text-[10px] uppercase font-mono tracking-widest text-[#717171] mt-1">
                    {t.home.globalExhibitions}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* D. CURATED STORIES & ESSAYS */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 border-b border-[#1d1d1d]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-2">
              {t.home.fieldNotes}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#F2EFE9] tracking-wide">
              {t.home.curatedEssays}
            </h2>
          </div>
          <Link
            href="/stories"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#A7A7A7] hover:text-[#C6AA7B] transition-colors group"
          >
            <span>{t.home.readAllEssays}</span>
            <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {recentStories.map((story) => (
            <article key={story.id} className="group flex flex-col">
              <Link
                href={`/stories/${story.slug}`}
                className="relative aspect-[16/10] overflow-hidden bg-[#171717] border border-[#262626] block"
              >
                <Image
                  src={story.coverImage.url}
                  alt={story.coverImage.altText}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
              </Link>

              <div className="pt-5 flex flex-col space-y-2">
                <div className="flex items-center gap-3 text-xs font-mono text-[#A7A7A7]">
                  <span className="text-[#C6AA7B] uppercase tracking-wider">{story.category}</span>
                  <span>•</span>
                  <span>{formatDate(story.publishedAt)}</span>
                  <span>•</span>
                  <span>{story.readTime}</span>
                </div>

                <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors duration-300 leading-snug">
                  <Link href={`/stories/${story.slug}`}>{story.title}</Link>
                </h3>

                <p className="text-sm text-[#A7A7A7] line-clamp-3 leading-relaxed">
                  {story.excerpt}
                </p>

                <div className="pt-2">
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
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* E. EVENTS SECTION */}
      {/* ========================================================= */}
      <section className="py-24 sm:py-32 bg-[#0c0c0c] border-b border-[#1d1d1d]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-2">
                {t.home.publicAppearances}
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#F2EFE9] tracking-wide">
                {t.home.exhibitionsWorkshops}
              </h2>
            </div>
            <Link
              href="/events"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#A7A7A7] hover:text-[#C6AA7B] transition-colors group"
            >
              <span>{t.home.viewAllEvents}</span>
              <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {landingEvents.map((event) => {
              const startDate = formatDate(event.startsAt);

              return (
                <div
                  key={event.id}
                  className="group bg-[#121212] border border-[#262626] overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:border-[#C6AA7B]/50"
                >
                  <div className="relative sm:w-1/2 aspect-[4/3] sm:aspect-auto">
                    <Image
                      src={event.coverImage.url}
                      alt={event.coverImage.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 bg-[#080808]/90 text-[#C6AA7B] border border-[#262626]">
                        {event.eventType}
                      </span>
                      {event.status === 'PAST' && (
                        <span className="text-[9px] uppercase font-mono tracking-widest px-2 py-0.5 bg-[#1C1A17] text-[#A7A7A7] border border-[#333]">
                          {t.home.concluded}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-[#A7A7A7] mb-2">
                        <Calendar className="w-3.5 h-3.5 text-[#C6AA7B]" />
                        <span>{startDate}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors leading-snug">
                        <Link href={`/events/${event.slug}`}>{event.title}</Link>
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#A7A7A7] mt-2">
                        <MapPin className="w-3.5 h-3.5 text-[#C6AA7B] shrink-0" />
                        <span>{event.venue}, {event.city}</span>
                      </div>
                      <p className="text-xs text-[#A7A7A7] mt-3 line-clamp-3 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F2EFE9] hover:text-[#C6AA7B] transition-colors pt-2"
                    >
                      <span>{event.status === 'PAST' ? t.home.archiveDetails : t.home.eventDetails}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* More Events Button */}
          <div className="mt-14 sm:mt-16 flex justify-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#141414] hover:bg-[#C6AA7B] text-[#F2EFE9] hover:text-[#080808] border border-[#2E2E2E] hover:border-[#C6AA7B] text-xs font-mono uppercase tracking-[0.22em] font-semibold transition-all duration-300 group shadow-lg"
            >
              <span>{t.home.moreEvents}</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* F. CONTACT CALL TO ACTION */}
      {/* ========================================================= */}
      <section className="relative py-28 sm:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=2000&q=85"
            alt="Dramatic studio shadow and light"
            fill
            sizes="100vw"
            className="object-cover filter brightness-[0.25] contrast-[1.2]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B]">
              {t.home.ctaBadge}
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl text-[#F2EFE9] leading-[1.1]">
              {t.home.ctaTitle}
            </h2>
            <p className="text-[#A7A7A7] text-sm sm:text-base leading-relaxed">
              {t.home.ctaDesc}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] text-xs font-mono uppercase tracking-[0.22em] font-semibold transition-all duration-300 shadow-[0_0_25px_rgba(198,170,123,0.3)] flex items-center gap-2"
              >
                <span>{t.home.initiateConversation}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/about"
                className="px-8 py-4 bg-[#121212]/80 hover:bg-[#1C1A17] text-[#F2EFE9] hover:text-[#C6AA7B] text-xs font-mono uppercase tracking-[0.22em] border border-[#2E2E2E] transition-all duration-300"
              >
                {t.hero.artistProfile}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
