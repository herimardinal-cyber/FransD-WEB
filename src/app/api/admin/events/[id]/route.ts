import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;
  const event = await prisma.event.findUnique({
    where: { id },
    include: { coverImage: true },
  });

  if (!event) {
    return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, event });
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

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

    if (slug) {
      const existing = await prisma.event.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Slug is already used by another event.' },
          { status: 400 }
        );
      }
    }

    const currentEvent = await prisma.event.findUnique({
      where: { id },
      include: { coverImage: true },
    });
    if (!currentEvent) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    let coverImageId = currentEvent.coverImageId;
    if (coverImage && (!currentEvent.coverImage || currentEvent.coverImage.url !== coverImage)) {
      const photo = await prisma.photo.create({
        data: {
          url: coverImage,
          altText: (title || currentEvent.title || '').slice(0, 500),
        },
      });
      coverImageId = photo.id;
    }

    const openingDate = startsAt || startDate;
    const closingDate = endsAt || endDate;

    const updated = await prisma.event.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...((eventType !== undefined || subtitle !== undefined) && {
          eventType: eventType || subtitle,
        }),
        ...(description !== undefined && { description }),
        ...(venue !== undefined && { venue }),
        ...(city !== undefined && { city }),
        ...(country !== undefined && { country }),
        ...(openingDate !== undefined && { startsAt: new Date(openingDate) }),
        ...(closingDate !== undefined && { endsAt: new Date(closingDate) }),
        ...(status !== undefined && { status }),
        ...(coverImageId !== undefined && { coverImageId }),
      },
    });

    await recordAuditLog(admin.id, 'UPDATE', 'Event', id, { title, slug, status });

    return NextResponse.json({ success: true, event: updated });
  } catch (error: unknown) {
    console.error('Update event failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update event.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const event = await prisma.event.findUnique({ where: { id } });
    if (!event) {
      return NextResponse.json({ success: false, error: 'Event not found' }, { status: 404 });
    }

    await prisma.event.delete({ where: { id } });
    await recordAuditLog(admin.id, 'DELETE', 'Event', id, { title: event.title });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Delete event failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete event.',
      },
      { status: 500 }
    );
  }
}
