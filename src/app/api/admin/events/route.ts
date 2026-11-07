import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const events = await prisma.event.findMany({
    include: { coverImage: true },
    orderBy: { startsAt: 'desc' },
  });

  return NextResponse.json({ success: true, events });
}

export async function POST(request: NextRequest) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      title,
      slug,
      subtitle,
      eventType,
      description,
      venue,
      city,
      country,
      startDate,
      startsAt,
      endDate,
      endsAt,
      status,
      coverImage,
    } = data;

    const openingDate = startsAt || startDate;
    if (!title || !slug || !venue || !city || !openingDate) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, venue, city, and start date are required.' },
        { status: 400 }
      );
    }

    const existing = await prisma.event.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An event with this slug already exists.' },
        { status: 400 }
      );
    }

    let coverImageId: string | null = null;
    if (coverImage) {
      const photo = await prisma.photo.create({
        data: {
          url: coverImage,
          altText: (title || '').slice(0, 500),
        },
      });
      coverImageId = photo.id;
    }

    const parsedStartDate = new Date(openingDate);
    const parsedEndDate = (endsAt || endDate) ? new Date(endsAt || endDate) : parsedStartDate;

    const event = await prisma.event.create({
      data: {
        title,
        slug,
        eventType: eventType || subtitle || 'Solo Exhibition',
        description: description || '',
        venue,
        city,
        country: country || 'Global',
        startsAt: parsedStartDate,
        endsAt: parsedEndDate,
        status: status || 'UPCOMING',
        coverImageId,
      },
    });

    await recordAuditLog(admin.id, 'CREATE', 'Event', event.id, { title, slug });

    return NextResponse.json({ success: true, event });
  } catch (error: unknown) {
    console.error('Create event failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create event.',
      },
      { status: 500 }
    );
  }
}
