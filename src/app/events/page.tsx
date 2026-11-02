import React from 'react';
import { Metadata } from 'next';
import { getDbUpcomingEvents, getDbPastEvents } from '@/lib/db-queries';
import EventsPageClient from '@/components/events/EventsPageClient';

export const metadata: Metadata = {
  title: 'Exhibitions & Events — Frans Delian Photography',
  description:
    'Upcoming gallery exhibitions, retrospective museum installations, and residential masterclasses by Frans Delian across Europe and Asia.',
};

export default async function EventsPage() {
  const [upcomingEvents, pastEvents] = await Promise.all([
    getDbUpcomingEvents(),
    getDbPastEvents(),
  ]);

  return (
    <EventsPageClient
      upcomingEvents={upcomingEvents}
      pastEvents={pastEvents}
    />
  );
}
