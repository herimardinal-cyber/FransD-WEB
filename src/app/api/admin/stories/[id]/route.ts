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
  const story = await prisma.story.findUnique({
    where: { id },
    include: { coverImage: true },
  });

  if (!story) {
    return NextResponse.json({ success: false, error: 'Story not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true, story });
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
      excerpt,
      content,
      body,
      pullQuote,
      quoteText,
      quoteAuthor,
      coverImage,
      readTime,
      category,
      tags,
      status,
    } = data;

    if (slug) {
      const existing = await prisma.story.findFirst({
        where: { slug, NOT: { id } },
      });
      if (existing) {
        return NextResponse.json(
          { success: false, error: 'Slug is already used by another story.' },
          { status: 400 }
        );
      }
    }

    const currentStory = await prisma.story.findUnique({
      where: { id },
      include: { coverImage: true },
    });
    if (!currentStory) {
      return NextResponse.json({ success: false, error: 'Story not found' }, { status: 404 });
    }

    let publishedAt = currentStory.publishedAt;
    if (status === 'PUBLISHED' && !publishedAt) {
      publishedAt = new Date();
    }

    let coverImageId = currentStory.coverImageId;
    if (coverImage && (!currentStory.coverImage || currentStory.coverImage.url !== coverImage)) {
      const photo = await prisma.photo.create({
        data: {
          url: coverImage,
          altText: title || currentStory.title,
        },
      });
      coverImageId = photo.id;
    }

    const updated = await prisma.story.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(slug !== undefined && { slug }),
        ...(excerpt !== undefined && { excerpt }),
        ...((body !== undefined || content !== undefined) && { body: body || content }),
        ...(category !== undefined && { category }),
        ...((quoteText !== undefined || pullQuote !== undefined) && {
          quoteText: quoteText || pullQuote,
        }),
        ...(quoteAuthor !== undefined && { quoteAuthor }),
        ...(coverImageId !== undefined && { coverImageId }),
        ...(readTime !== undefined && { readTime }),
        ...(tags !== undefined && {
          tags: Array.isArray(tags) ? JSON.stringify(tags) : typeof tags === 'string' ? tags : '[]',
        }),
        ...(status !== undefined && { status, publishedAt }),
      },
    });

    await recordAuditLog(admin.id, 'UPDATE', 'Story', id, { title, slug, status });

    return NextResponse.json({ success: true, story: updated });
  } catch (error: unknown) {
    console.error('Update story failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update story.',
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
    const story = await prisma.story.findUnique({ where: { id } });
    if (!story) {
      return NextResponse.json({ success: false, error: 'Story not found' }, { status: 404 });
    }

    await prisma.story.delete({ where: { id } });
    await recordAuditLog(admin.id, 'DELETE', 'Story', id, { title: story.title });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Delete story failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete story.',
      },
      { status: 500 }
    );
  }
}
