import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Plus, Eye, Calendar, MapPin } from 'lucide-react';
import DeleteEventButton from './DeleteEventButton';

export default async function AdminEventsPage() {
  const events = await prisma.event.findMany({
    include: { coverImage: true },
    orderBy: { startsAt: 'desc' },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-1">
            Exhibitions & Workshops
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] tracking-tight">
            Events ({events.length})
          </h1>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Event</span>
        </Link>
      </div>

      {/* Events List */}
      {events.length === 0 ? (
        <div className="bg-[#121212] border border-[#222] p-12 text-center">
          <Calendar className="w-12 h-12 text-[#555] mx-auto mb-4" />
          <h3 className="font-serif text-xl text-[#F2EFE9]">No Exhibitions Scheduled</h3>
          <p className="text-xs font-mono text-[#717171] mt-1 mb-6">
            Announce gallery retrospectives, museum talks, or workshops.
          </p>
          <Link
            href="/admin/events/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6AA7B] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Event</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[#121212] border border-[#222] hover:border-[#333] transition-all flex flex-col justify-between group overflow-hidden"
            >
              <div className="relative aspect-[16/10] bg-[#171717] overflow-hidden">
                <Image
                  src={event.coverImage?.url || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <div className="absolute top-3 left-3 z-10">
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 font-semibold ${
                      event.status === 'UPCOMING'
                        ? 'bg-blue-950/80 text-blue-300 border border-blue-700/60'
                        : event.status === 'ONGOING'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                        : 'bg-zinc-900/80 text-zinc-400 border border-zinc-700'
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#C6AA7B] mb-1 flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{event.venue}, {event.city}</span>
                  </div>
                  <h2 className="font-serif text-xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors leading-snug line-clamp-1">
                    {event.title}
                  </h2>
                  <p className="text-xs text-[#A7A7A7] mt-2 line-clamp-2 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] font-mono text-[#717171]">
                  <span>{new Date(event.startsAt).toLocaleDateString()}</span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/events/${event.id}`}
                      className="px-3 py-1.5 bg-[#1C1A17] hover:bg-[#C6AA7B] text-[#C6AA7B] hover:text-[#080808] border border-[#C6AA7B]/30 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Edit</span>
                    </Link>
                    <DeleteEventButton eventId={event.id} eventTitle={event.title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
