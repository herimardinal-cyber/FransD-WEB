import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getDbEventBySlug, getDbAllEvents } from '@/lib/db-queries';
import { ArrowLeft, ArrowRight, Calendar, MapPin, Ticket, User } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

interface EventDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const all = await getDbAllEvents();
  return all.map((e) => ({
    slug: e.slug,
  }));
}

export async function generateMetadata({ params }: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getDbEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found | Frans Delian',
    };
  }

  return {
    title: `${event.title} — Frans Delian Events`,
    description: event.description,
    openGraph: {
      title: `${event.title} — Frans Delian Photography`,
      description: event.description,
      images: [
        {
          url: event.coverImage.url,
          width: event.coverImage.width,
          height: event.coverImage.height,
          alt: event.coverImage.altText,
        },
      ],
    },
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { slug } = await params;
  const event = await getDbEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const startDate = new Date(event.startsAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const endDate = new Date(event.endsAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const isConcluded = event.status === 'PAST';

  return (
    <article className="min-h-screen bg-[#080808] text-[#F2EFE9] selection:bg-[#C6AA7B] selection:text-[#080808]">
      {/* ========================================================= */}
      {/* 1. CINEMATIC EVENT HERO */}
      {/* ========================================================= */}
      <div className="relative h-[65vh] min-h-[480px] w-full flex items-end overflow-hidden">
        <Image
          src={event.coverImage.url}
          alt={event.coverImage.altText}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[0.7]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/40 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 w-full">
          <div className="max-w-4xl space-y-4">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C6AA7B] hover:text-[#F2EFE9] transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Events & Exhibitions</span>
            </Link>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A7A7A7]">
              <span className="px-2.5 py-1 bg-[#171717] border border-[#262626] text-[#C6AA7B] uppercase tracking-wider">
                {event.eventType}
              </span>
              <span
                className={`px-2.5 py-1 border text-[10px] uppercase tracking-wider font-semibold ${
                  isConcluded
                    ? 'border-[#717171] text-[#717171] bg-[#121212]'
                    : 'border-[#C6AA7B]/60 text-[#C6AA7B] bg-[#C6AA7B]/10'
                }`}
              >
                {event.status}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl text-[#F2EFE9] tracking-wide leading-tight">
              {event.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. EVENT OVERVIEW & LOGISTICS GRID */}
      {/* ========================================================= */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Main Description */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-3">
                Event Overview
              </span>
              <p className="font-serif text-2xl text-[#F2EFE9] leading-relaxed italic mb-6">
                &ldquo;{event.description}&rdquo;
              </p>
              <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed">
                The presentation features large-format archival prints rendered in platinum-palladium and carbon pigment, showcasing master-level tonal gradations. Attendees will have the opportunity to engage with detailed artist proofs, technical journals, and limited edition catalogues.
              </p>
            </div>

            {/* Schedule Section if available */}
            {event.schedule && event.schedule.length > 0 && (
              <div className="pt-6 border-t border-[#262626]">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-6">
                  Program Schedule & Itinerary
                </span>
                <div className="space-y-4">
                  {event.schedule.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 bg-[#121212] border border-[#262626]"
                    >
                      <span className="font-mono text-xs text-[#C6AA7B] font-semibold tracking-wider shrink-0 w-20">
                        {item.time}
                      </span>
                      <span className="text-xs sm:text-sm text-[#F2EFE9]">
                        {item.activity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Event Photos if available */}
            {event.photos && event.photos.length > 0 && (
              <div className="pt-8 border-t border-[#262626]">
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-6">
                  Installation Plates & Documentation
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {event.photos.map((ph) => (
                    <div key={ph.id} className="relative aspect-[4/3] bg-[#171717] border border-[#262626]">
                      <Image
                        src={ph.url}
                        alt={ph.altText}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Logistics Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block pb-2 border-b border-[#262626]">
                Location & Access
              </span>

              <div className="space-y-5 text-xs font-mono">
                <div className="flex items-start gap-3">
                  <Calendar className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-0.5">Dates</span>
                    <span className="text-[#F2EFE9] text-sm">
                      {startDate} — {endDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-0.5">Venue</span>
                    <span className="text-[#F2EFE9] text-sm">{event.venue}</span>
                    <span className="text-[#A7A7A7] block">{event.city}, {event.country}</span>
                  </div>
                </div>

                {event.curator && (
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[#717171] uppercase tracking-wider block mb-0.5">Curator</span>
                      <span className="text-[#F2EFE9]">{event.curator}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <Ticket className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-0.5">Admission</span>
                    <span className="text-[#C6AA7B] font-semibold text-sm">
                      {event.entryFee || 'RSVP Required'}
                    </span>
                  </div>
                </div>
              </div>

              {!isConcluded ? (
                <div className="pt-4 border-t border-[#262626]">
                  <Link
                    href={`/contact?subject=RSVP Inquiry: ${encodeURIComponent(event.title)}`}
                    className="w-full py-4 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>RSVP / Inquire for Seat</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t border-[#262626] text-center">
                  <span className="text-xs font-mono text-[#717171] uppercase tracking-wider">
                    This public engagement has concluded
                  </span>
                </div>
              )}
            </div>

            {/* Note on Photography Masterclasses */}
            <div className="bg-[#171717]/50 border border-[#262626] p-6 text-xs text-[#A7A7A7] leading-relaxed">
              <span className="text-[#C6AA7B] font-mono uppercase tracking-wider block mb-2">
                Press & Collector Accommodations
              </span>
              Accredited press members and private institutional collectors seeking private viewings or curator-led tours may contact the studio directly at least 7 business days prior.
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}

