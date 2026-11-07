import Link from 'next/link';
import Image from 'next/image';
import prisma from '@/lib/prisma';
import { Plus, Eye, Image as ImageIcon, Calendar, MapPin } from 'lucide-react';
import DeleteProjectButton from './DeleteProjectButton';

export default async function AdminGalleryListPage() {
  const projects = await prisma.photoProject.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      coverImage: {
        select: { url: true },
      },
      photos: {
        orderBy: { sortOrder: 'asc' },
        take: 1,
        select: { url: true },
      },
      _count: {
        select: { photos: true },
      },
    },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-1">
            Portfolio Series
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] tracking-tight">
            Photo Projects ({projects.length})
          </h1>
        </div>

        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      {/* Projects Grid / List */}
      {projects.length === 0 ? (
        <div className="bg-[#121212] border border-[#222] p-12 text-center">
          <ImageIcon className="w-12 h-12 text-[#555] mx-auto mb-4" />
          <h3 className="font-serif text-xl text-[#F2EFE9]">No Photo Projects Yet</h3>
          <p className="text-xs font-mono text-[#717171] mt-1 mb-6">
            Begin by curating your first series or editorial portfolio.
          </p>
          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6AA7B] text-[#080808] font-mono text-xs uppercase tracking-wider font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Series</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => {
            const coverUrl = project.coverImage?.url || project.photos[0]?.url;

            return (
              <div
                key={project.id}
                className="bg-[#121212] border border-[#222] hover:border-[#333] transition-all flex flex-col justify-between group overflow-hidden"
              >
                {/* Cover Image Preview */}
                <div className="relative aspect-[16/10] bg-[#171717] overflow-hidden">
                  {coverUrl ? (
                    <Image
                      src={coverUrl}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#555]">
                      <ImageIcon className="w-8 h-8 mb-1" />
                      <span className="text-[10px] font-mono uppercase">No Photos</span>
                    </div>
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                    <span
                      className={`text-[9px] font-mono uppercase px-2 py-0.5 font-semibold ${project.status === 'PUBLISHED'
                        ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                        : project.status === 'DRAFT'
                          ? 'bg-amber-950/80 text-amber-300 border border-amber-700/60'
                          : 'bg-zinc-900/80 text-zinc-400 border border-zinc-700'
                        }`}
                    >
                      {project.status}
                    </span>

                    {project.featured && (
                      <span className="text-[9px] font-mono uppercase bg-[#C6AA7B] text-[#080808] px-2 py-0.5 font-bold">
                        Featured
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-xs px-2 py-1 text-[10px] font-mono text-[#F2EFE9] flex items-center gap-1 z-10">
                    <ImageIcon className="w-3 h-3 text-[#C6AA7B]" />
                    <span>{project._count.photos} photos</span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-[#C6AA7B] mb-1">
                      {project.category}
                    </div>
                    <h2 className="font-serif text-xl text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors leading-snug line-clamp-1">
                      {project.title}
                    </h2>
                    <p className="text-xs text-[#A7A7A7] mt-2 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] font-mono text-[#717171]">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#C6AA7B]" />
                        {project.year}
                      </span>
                      {project.location && (
                        <span className="flex items-center gap-1 truncate max-w-[120px]">
                          <MapPin className="w-3 h-3 text-[#C6AA7B]" />
                          {project.location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/gallery/${project.id}`}
                        className="px-3 py-1.5 bg-[#1C1A17] hover:bg-[#C6AA7B] text-[#C6AA7B] hover:text-[#080808] border border-[#C6AA7B]/30 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Edit</span>
                      </Link>
                      <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
