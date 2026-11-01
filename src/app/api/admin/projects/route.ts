import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const projects = await prisma.photoProject.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      coverImage: true,
      photos: {
        take: 1,
        orderBy: { sortOrder: 'asc' },
        select: { url: true, aspectRatio: true },
      },
      _count: {
        select: { photos: true },
      },
    },
  });

  return NextResponse.json({ success: true, projects });
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
      description,
      category,
      year,
      location,
      client,
      featured,
      isFeatured,
      status,
    } = data;

    if (!title || !slug || !category || !year) {
      return NextResponse.json(
        { success: false, error: 'Title, slug, category, and year are required.' },
        { status: 400 }
      );
    }

    // Check slug uniqueness
    const existing = await prisma.photoProject.findUnique({ where: { slug } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A project with this slug already exists.' },
        { status: 400 }
      );
    }

    const highestSort = await prisma.photoProject.aggregate({
      _max: { sortOrder: true },
    });
    const sortOrder = (highestSort._max.sortOrder ?? 0) + 1;

    const project = await prisma.photoProject.create({
      data: {
        title,
        slug,
        description: description || '',
        category,
        year: Number(year),
        location: location || null,
        client: client || null,
        featured: Boolean(featured ?? isFeatured),
        status: status || 'DRAFT',
        sortOrder,
      },
    });

    await recordAuditLog(admin.id, 'CREATE', 'PhotoProject', project.id, { title, slug });

    return NextResponse.json({ success: true, project });
  } catch (error: unknown) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create project.',
      },
      { status: 500 }
    );
  }
}
