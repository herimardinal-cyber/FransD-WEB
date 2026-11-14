import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
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
    return NextResponse.json({ success: false, error: 'Project not found.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, project });
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
      description,
      category,
      year,
      location,
      client,
      featured,
      isFeatured,
      status,
      sortOrder,
      coverImage,
    } = data;

    if (slug) {
      const existing = await prisma.photoProject.findFirst({
        where: {
          slug,
          NOT: { id },
        },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Slug is already used by another project.' },
          { status: 400 }
        );
      }
    }

    let coverImageIdToSet: string | null | undefined = undefined;
    if (coverImage !== undefined) {
      if (coverImage) {
        const existingPhoto = await prisma.photo.findFirst({
          where: { projectId: id, url: coverImage },
        });
        if (existingPhoto) {
          coverImageIdToSet = existingPhoto.id;
        } else {
          const newPhoto = await prisma.photo.create({
            data: {
              projectId: id,
              url: coverImage,
              altText: (title || 'Project Cover').slice(0, 500),
              width: 1920,
              height: 1080,
              aspectRatio: 'landscape',
            },
          });
          coverImageIdToSet = newPhoto.id;
        }
      } else {
        coverImageIdToSet = null;
      }
    }

    const updated = await prisma.photoProject.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && { category }),
        ...(year !== undefined && { year: Number(year) }),
        ...(location !== undefined && { location }),
        ...(client !== undefined && { client }),
        ...((featured !== undefined || isFeatured !== undefined) && {
          featured: Boolean(featured ?? isFeatured),
        }),
        ...(status !== undefined && { status }),
        ...(sortOrder !== undefined && { sortOrder: Number(sortOrder) }),
        ...(coverImageIdToSet !== undefined && { coverImageId: coverImageIdToSet }),
      },
    });

    await recordAuditLog(admin.id, 'UPDATE', 'PhotoProject', id, { title, slug, status });

    try {
      revalidatePath('/');
      revalidatePath('/gallery');
      if (updated.slug) revalidatePath(`/gallery/${updated.slug}`);
    } catch (e) {
      console.warn('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, project: updated });
  } catch (error: unknown) {
    console.error('Update project failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update project.',
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
    const project = await prisma.photoProject.findUnique({ where: { id } });
    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    await prisma.photoProject.delete({ where: { id } });
    await recordAuditLog(admin.id, 'DELETE', 'PhotoProject', id, { title: project.title });

    try {
      revalidatePath('/');
      revalidatePath('/gallery');
      revalidatePath(`/gallery/${project.slug}`);
    } catch (e) {
      console.warn('Revalidation error:', e);
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Delete project failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete project.',
      },
      { status: 500 }
    );
  }
}
