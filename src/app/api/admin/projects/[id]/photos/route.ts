import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id: projectId } = await context.params;

  try {
    const data = await request.json();
    const {
      url,
      title,
      caption,
      altText,
      width,
      height,
      orientation,
      aspectRatio,
      camera,
      lens,
      focalLength,
      aperture,
      shutterSpeed,
      iso,
    } = data;

    if (!url) {
      return NextResponse.json({ success: false, error: 'Photo URL is required.' }, { status: 400 });
    }

    const highestSort = await prisma.photo.aggregate({
      where: { projectId },
      _max: { sortOrder: true },
    });
    const sortOrder = (highestSort._max.sortOrder ?? 0) + 1;

    const photo = await prisma.photo.create({
      data: {
        projectId,
        url,
        caption: caption || null,
        altText: altText || title || 'Photography series study',
        width: width ? Number(width) : 1800,
        height: height ? Number(height) : 1200,
        aspectRatio: aspectRatio || orientation?.toLowerCase() || 'landscape',
        camera: camera || null,
        lens: lens || null,
        focalLength: focalLength || null,
        aperture: aperture || null,
        shutterSpeed: shutterSpeed || null,
        iso: iso ? String(iso) : null,
        sortOrder,
      },
    });

    await recordAuditLog(admin.id, 'ADD_PHOTO', 'Photo', photo.id, {
      projectId,
      url,
      altText: photo.altText,
    });

    return NextResponse.json({ success: true, photo });
  } catch (error: unknown) {
    console.error('Add photo failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to add photo.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id: projectId } = await context.params;
  const { searchParams } = new URL(request.url);
  const photoId = searchParams.get('photoId');

  if (!photoId) {
    return NextResponse.json({ success: false, error: 'photoId query parameter required' }, { status: 400 });
  }

  try {
    const photo = await prisma.photo.findFirst({
      where: { id: photoId, projectId },
    });

    if (!photo) {
      return NextResponse.json({ success: false, error: 'Photo not found' }, { status: 404 });
    }

    await prisma.photo.delete({ where: { id: photoId } });

    await recordAuditLog(admin.id, 'DELETE_PHOTO', 'Photo', photoId, { projectId });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Delete photo failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete photo.',
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id: projectId } = await context.params;

  try {
    const body = await request.json();
    if (Array.isArray(body.orderedIds)) {
      await prisma.$transaction(
        body.orderedIds.map((pId: string, idx: number) =>
          prisma.photo.update({
            where: { id: pId, projectId },
            data: { sortOrder: idx + 1 },
          })
        )
      );
      return NextResponse.json({ success: true });
    }

    const { photoId, title, altText, caption, orientation, aspectRatio, camera, lens, focalLength, aperture, shutterSpeed, iso } = body;
    if (!photoId) {
      return NextResponse.json({ success: false, error: 'photoId required' }, { status: 400 });
    }

    const updated = await prisma.photo.update({
      where: { id: photoId, projectId },
      data: {
        ...((title !== undefined || altText !== undefined) && {
          altText: altText || title,
        }),
        ...(caption !== undefined && { caption }),
        ...((orientation !== undefined || aspectRatio !== undefined) && {
          aspectRatio: aspectRatio || orientation?.toLowerCase(),
        }),
        ...(camera !== undefined && { camera }),
        ...(lens !== undefined && { lens }),
        ...(focalLength !== undefined && { focalLength }),
        ...(aperture !== undefined && { aperture }),
        ...(shutterSpeed !== undefined && { shutterSpeed }),
        ...(iso !== undefined && { iso: iso ? String(iso) : null }),
      },
    });

    return NextResponse.json({ success: true, photo: updated });
  } catch (error: unknown) {
    console.error('Update photo failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update photo order/meta.',
      },
      { status: 500 }
    );
  }
}
