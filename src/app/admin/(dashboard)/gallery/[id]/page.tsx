import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProjectForm from '@/components/admin/ProjectForm';

export default async function EditProjectPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const project = await prisma.photoProject.findUnique({
    where: { id },
    include: {
      coverImage: true,
      photos: {
        orderBy: { sortOrder: 'asc' },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <ProjectForm
      initialData={{
        ...project,
        status: project.status as 'DRAFT' | 'PUBLISHED' | 'ARCHIVED',
        featured: Boolean(project.featured),
        coverImage: project.coverImage?.url || null,
        photos: project.photos.map((p) => ({
          ...p,
          title: p.altText || 'Photograph',
          orientation: p.aspectRatio || 'landscape',
          iso: p.iso ? Number(p.iso) : null,
        })),
      }}
    />
  );
}
