import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const stories = await prisma.story.findMany({
    include: { coverImage: true },
    orderBy: { publishedAt: 'desc' },
  });

  return NextResponse.json({ success: true, stories });
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

    const essayBody = body || content;
    if (!title || !slug || !excerpt || !essayBody) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, excerpt, and content body are required.' },
        { status: 400 }
      );
    }

    const existing = await prisma.story.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A story with this slug already exists.' },
        { status: 400 }
      );
    }

    // Handle cover photo
    let coverImageId: string | null = null;
    if (coverImage) {
      const photo = await prisma.photo.create({
        data: {
          url: coverImage,
          altText: title,
        },
      });
      coverImageId = photo.id;
    }

    const story = await prisma.story.create({
      data: {
        title,
        slug,
        excerpt,
        body: essayBody,
        category: category || 'Field Notes',
        quoteText: quoteText || pullQuote || null,
        quoteAuthor: quoteAuthor || 'Frans Delian',
        coverImageId,
        readTime: readTime || '5 min read',
        tags: Array.isArray(tags) ? JSON.stringify(tags) : typeof tags === 'string' ? tags : '[]',
        status: status || 'DRAFT',
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      },
    });

    await recordAuditLog(admin.id, 'CREATE', 'Story', story.id, { title, slug });

    return NextResponse.json({ success: true, story });
  } catch (error: unknown) {
    console.error('Create story failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create story.',
      },
      { status: 500 }
    );
  }
}
