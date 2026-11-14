import prisma from '@/lib/prisma';
import ProjectForm from '@/components/admin/ProjectForm';

export default async function NewProjectPage() {
  const existingProjects = await prisma.photoProject.findMany({
    select: { category: true },
    distinct: ['category'],
  }).catch(() => []);
  const existingCategories = existingProjects.map((p) => p.category).filter(Boolean);

  return <ProjectForm existingCategories={existingCategories} />;
}


