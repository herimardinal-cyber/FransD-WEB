import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { getUpcomingEvents, getPastEvents } from '@/data';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Exhibitions & Events — Frans Delian Photography',
  description: 'Upcoming gallery exhibitions, retrospective museum installations, and residential masterclasses by Frans Delian across Europe and Asia.',
};

export default function EventsPage() {
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#080808] min-h-screen text-[#F2EFE9]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-3">
            Public Schedule
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wide text-[#F2EFE9] mb-6">
            Exhibitions & Talks
          </h1>
          <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed">
            Solo gallery vernissages, museum installations, and private field masterclasses. Join Frans Delian in person across Europe and Asia.
          </p>
        </div>

        {/* ========================================================= */}
        {/* UPCOMING & CURRENT EVENTS */}
        {/* ========================================================= */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#262626]">
            <span className="w-2 h-2 rounded-full bg-[#C6AA7B] animate-pulse" />
            <h2 className="font-serif text-3xl text-[#F2EFE9]">Upcoming & Ongoing</h2>
          </div>

          <div className="space-y-12">
            {upcomingEvents.map((event) => {
              const startDate = new Date(event.startsAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });
              const endDate = new Date(event.endsAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              });

              return (
                <div
                  key={event.id}
                  className="group bg-[#121212] border border-[#262626] overflow-hidden grid grid-cols-1 lg:grid-cols-12 transition-all duration-300 hover:border-[#C6AA7B]/50"
                >
                  <div className="lg:col-span-5 relative aspect-[16/10] lg:aspect-auto min-h-[300px]">
                    <Image
                      src={event.coverImage.url}
                      alt={event.coverImage.altText}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] uppercase font-mono tracking-widest px-3 py-1 bg-[#080808]/90 text-[#C6AA7B] border border-[#262626]">
                        {event.eventType}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#A7A7A7]">
                        <span className="flex items-center gap-1.5 text-[#C6AA7B]">
                          <Calendar className="w-3.5 h-3.5" />
                          {startDate} — {endDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {event.venue}, {event.city} ({event.country})
                        </span>
                      </div>

                      <h3 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors leading-tight">
                        <Link href={`/events/${event.slug}`}>{event.title}</Link>
                      </h3>

                      <p className="text-sm text-[#A7A7A7] leading-relaxed">
                        {event.description}
                      </p>

                      {event.curator && (
                        <p className="text-xs font-mono text-[#717171]">
                          Curator: {event.curator}
                        </p>
                      )}
                    </div>

                    <div className="pt-6 border-t border-[#262626] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#C6AA7B]">
                        {event.entryFee || 'RSVP Required'}
                      </span>

                      <Link
                        href={`/events/${event.slug}`}
                        className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest px-5 py-2.5 bg-[#171717] hover:bg-[#C6AA7B] hover:text-[#080808] text-[#F2EFE9] border border-[#262626] transition-all"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================= */}
        {/* PAST RETROSPECTIVES */}
        {/* ========================================================= */}
        <section>
          <div className="flex items-center gap-3 mb-10 pb-4 border-b border-[#262626]">
            <h2 className="font-serif text-3xl text-[#F2EFE9]">Past Retrospectives & Talks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event) => {
              const startDate = new Date(event.startsAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              });

              return (
                <div
                  key={event.id}
                  className="group bg-[#121212] border border-[#262626] overflow-hidden flex flex-col transition-all duration-300 hover:border-[#C6AA7B]/50"
                >
                  <div className="relative aspect-[16/9] w-full">
                    <Image
                      src={event.coverImage.url}
                      alt={event.coverImage.altText}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-mono tracking-widest px-2.5 py-1 bg-[#080808]/90 text-[#A7A7A7] border border-[#262626]">
                        {event.eventType} (Concluded)
                      </span>
                    </div>
                  </div>

                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#A7A7A7]">
                        <span>{startDate}</span>
                        <span>•</span>
                        <span>{event.venue}, {event.city}</span>
                      </div>
                      <h3 className="font-serif text-2xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors">
                        <Link href={`/events/${event.slug}`}>{event.title}</Link>
                      </h3>
                      <p className="text-xs sm:text-sm text-[#A7A7A7] line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#C6AA7B] hover:text-[#D8BD8F] transition-colors"
                    >
                      <span>Archive Documentation</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

