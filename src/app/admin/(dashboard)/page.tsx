import Link from 'next/link';
import prisma from '@/lib/prisma';
import {
  Images,
  BookOpen,
  Calendar,
  Mail,
  Plus,
  ArrowRight,
  Eye,
  CheckCircle,
  Clock,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  // Fetch real counts concurrently
  const [
    totalProjects,
    publishedProjects,
    totalPhotos,
    totalStories,
    totalEvents,
    unreadMessages,
    totalMessages,
    recentProjects,
    recentMessages,
  ] = await Promise.all([
    prisma.photoProject.count(),
    prisma.photoProject.count({ where: { status: 'PUBLISHED' } }),
    prisma.photo.count(),
    prisma.story.count({ where: { status: 'PUBLISHED' } }),
    prisma.event.count(),
    prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
    prisma.contactMessage.count(),
    prisma.photoProject.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        photos: {
          take: 1,
          select: { url: true },
        },
      },
    }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-1">
            Studio Overview
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] tracking-tight">
            Dashboard
          </h1>
        </div>

        {/* Action Shortcuts */}
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/stories/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#252525] text-[#F2EFE9] border border-[#333] font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Story</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Projects */}
        <div className="bg-[#121212] border border-[#222] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7A7A7] mb-4">
            <span className="text-xs font-mono uppercase tracking-wider">Photo Projects</span>
            <Images className="w-4 h-4 text-[#C6AA7B]" />
          </div>
          <div>
            <div className="font-serif text-3xl text-[#F2EFE9]">{totalProjects}</div>
            <p className="text-[11px] font-mono text-[#717171] mt-1">
              {publishedProjects} Published • {totalPhotos} Photos
            </p>
          </div>
          <Link
            href="/admin/gallery"
            className="mt-4 pt-3 border-t border-[#1C1C1C] text-[11px] font-mono text-[#A7A7A7] hover:text-[#C6AA7B] flex items-center justify-between transition-colors"
          >
            <span>Manage Gallery</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Stories */}
        <div className="bg-[#121212] border border-[#222] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7A7A7] mb-4">
            <span className="text-xs font-mono uppercase tracking-wider">Field Stories</span>
            <BookOpen className="w-4 h-4 text-[#C6AA7B]" />
          </div>
          <div>
            <div className="font-serif text-3xl text-[#F2EFE9]">{totalStories}</div>
            <p className="text-[11px] font-mono text-[#717171] mt-1">
              Editorial essays published
            </p>
          </div>
          <Link
            href="/admin/stories"
            className="mt-4 pt-3 border-t border-[#1C1C1C] text-[11px] font-mono text-[#A7A7A7] hover:text-[#C6AA7B] flex items-center justify-between transition-colors"
          >
            <span>Manage Stories</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Events */}
        <div className="bg-[#121212] border border-[#222] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7A7A7] mb-4">
            <span className="text-xs font-mono uppercase tracking-wider">Exhibitions & Events</span>
            <Calendar className="w-4 h-4 text-[#C6AA7B]" />
          </div>
          <div>
            <div className="font-serif text-3xl text-[#F2EFE9]">{totalEvents}</div>
            <p className="text-[11px] font-mono text-[#717171] mt-1">
              Museum, solo & masterclasses
            </p>
          </div>
          <Link
            href="/admin/events"
            className="mt-4 pt-3 border-t border-[#1C1C1C] text-[11px] font-mono text-[#A7A7A7] hover:text-[#C6AA7B] flex items-center justify-between transition-colors"
          >
            <span>Manage Events</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Inquiries */}
        <div className="bg-[#121212] border border-[#222] p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#A7A7A7] mb-4">
            <span className="text-xs font-mono uppercase tracking-wider">Client Inquiries</span>
            <Mail className="w-4 h-4 text-[#C6AA7B]" />
          </div>
          <div>
            <div className="font-serif text-3xl text-[#F2EFE9] flex items-center gap-2">
              <span>{unreadMessages}</span>
              {unreadMessages > 0 && (
                <span className="text-xs font-mono bg-[#C6AA7B] text-[#080808] px-2 py-0.5 font-semibold">
                  New
                </span>
              )}
            </div>
            <p className="text-[11px] font-mono text-[#717171] mt-1">
              {totalMessages} Total Received
            </p>
          </div>
          <Link
            href="/admin/messages"
            className="mt-4 pt-3 border-t border-[#1C1C1C] text-[11px] font-mono text-[#A7A7A7] hover:text-[#C6AA7B] flex items-center justify-between transition-colors"
          >
            <span>View Inquiries</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Two-Column Section: Recent Projects & Recent Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Projects */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-[#F2EFE9]">Recent Projects</h2>
              <p className="text-xs font-mono text-[#717171]">Latest portfolio series</p>
            </div>
            <Link
              href="/admin/gallery"
              className="text-xs font-mono text-[#C6AA7B] hover:underline uppercase tracking-wider"
            >
              All Projects &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#1C1C1C]">
            {recentProjects.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-[#717171]">
                No projects found. Create your first project above.
              </div>
            ) : (
              recentProjects.map((project) => (
                <div
                  key={project.id}
                  className="py-3.5 flex items-center justify-between gap-4 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors truncate">
                        {project.title}
                      </span>
                      {project.featured && (
                        <span className="text-[9px] font-mono uppercase bg-[#C6AA7B]/20 text-[#C6AA7B] px-1.5 py-0.5 border border-[#C6AA7B]/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-[#717171] mt-0.5">
                      {project.category} • {project.location || 'Global'} ({project.year})
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 ${
                        project.status === 'PUBLISHED'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {project.status}
                    </span>
                    <Link
                      href={`/admin/gallery/${project.id}`}
                      className="p-1.5 text-[#717171] hover:text-[#F2EFE9] transition-colors"
                      title="Edit project"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="bg-[#121212] border border-[#222] p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl text-[#F2EFE9]">Recent Inquiries</h2>
              <p className="text-xs font-mono text-[#717171]">Direct studio dispatches</p>
            </div>
            <Link
              href="/admin/messages"
              className="text-xs font-mono text-[#C6AA7B] hover:underline uppercase tracking-wider"
            >
              All Inquiries &rarr;
            </Link>
          </div>

          <div className="divide-y divide-[#1C1C1C]">
            {recentMessages.length === 0 ? (
              <div className="py-8 text-center text-xs font-mono text-[#717171]">
                No messages received yet.
              </div>
            ) : (
              recentMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="py-3.5 flex items-start justify-between gap-4 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#F2EFE9] truncate">
                        {msg.name}
                      </span>
                      <span className="text-[11px] font-mono text-[#717171] truncate">
                        &lt;{msg.email}&gt;
                      </span>
                    </div>
                    <p className="text-xs text-[#A7A7A7] truncate mt-0.5">
                      {msg.subject}
                    </p>
                    <div className="text-[10px] font-mono text-[#555] mt-1 flex items-center gap-2">
                      <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{msg.inquiryType}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    {msg.status === 'UNREAD' ? (
                      <span className="text-[10px] font-mono uppercase bg-[#C6AA7B]/20 text-[#C6AA7B] px-2 py-0.5 border border-[#C6AA7B]/30 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        Unread
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase bg-zinc-900 text-zinc-500 px-2 py-0.5 flex items-center gap-1">
                        <CheckCircle className="w-2.5 h-2.5" />
                        Read
                      </span>
                    )}
                    <Link
                      href={`/admin/messages`}
                      className="p-1.5 text-[#717171] hover:text-[#C6AA7B] transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
