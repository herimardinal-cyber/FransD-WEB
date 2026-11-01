import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import StoryForm from '@/components/admin/StoryForm';

export default async function EditStoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const story = await prisma.story.findUnique({
    where: { id },
    include: { coverImage: true },
  });

  if (!story) {
    notFound();
  }

  return (
    <StoryForm
      initialData={{
        id: story.id,
        title: story.title,
        slug: story.slug,
        excerpt: story.excerpt,
        content: story.body,
        pullQuote: story.quoteText,
        coverImage: story.coverImage?.url || '',
        readTime: story.readTime,
        tags: story.tags || '[]',
        status: story.status as 'DRAFT' | 'PUBLISHED',
      }}
    />
  );
}
