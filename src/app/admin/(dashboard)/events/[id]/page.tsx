import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import EventForm from '@/components/admin/EventForm';

export default async function EditEventPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: { coverImage: true },
  });

  if (!event) {
    notFound();
  }

  return (
    <EventForm
      initialData={{
        id: event.id,
        title: event.title,
        slug: event.slug,
        subtitle: event.eventType,
        description: event.description,
        venue: event.venue,
        city: event.city,
        country: event.country,
        startDate: event.startsAt,
        endDate: event.endsAt,
        status: event.status as 'UPCOMING' | 'ONGOING' | 'PAST',
        coverImage: event.coverImage?.url || '',
      }}
    />
  );
}
