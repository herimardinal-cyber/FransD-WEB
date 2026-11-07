import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const profile = await prisma.photographerProfile.findFirst();
  return NextResponse.json({ success: true, profile });
}

export async function PUT(request: NextRequest) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const {
      displayName,
      name,
      tagline,
      biography,
      bio,
      philosophy,
      statement,
      portraitImageUrl,
      portraitUrl,
      location,
      email,
      phone,
    } = data;

    const existing = await prisma.photographerProfile.findFirst();

    const finalName = displayName || name || 'Frans Delian';
    const finalBio = biography || bio || '';
    const finalPhilosophy = philosophy || statement || '';
    const finalPortrait = portraitImageUrl || portraitUrl || null;

    const updated = existing
      ? await prisma.photographerProfile.update({
        where: { id: existing.id },
        data: {
          displayName: finalName,
          tagline: tagline || 'Stories Beyond The Frame',
          biography: finalBio,
          philosophy: finalPhilosophy,
          portraitImageUrl: finalPortrait,
          location: location || 'Zurich, Switzerland',
          email: email || 'studio@fransdelian.com',
          phone: phone || '+41 44 210 88 44',
        },
      })
      : await prisma.photographerProfile.create({
        data: {
          id: 'default',
          displayName: finalName,
          tagline: tagline || 'Stories Beyond The Frame',
          biography: finalBio,
          philosophy: finalPhilosophy,
          portraitImageUrl: finalPortrait,
          location: location || 'Zurich, Switzerland',
          email: email || 'studio@fransdelian.com',
          phone: phone || '+41 44 210 88 44',
        },
      });

    await recordAuditLog(admin.id, 'UPDATE_PROFILE', 'PhotographerProfile', updated.id, {
      name: finalName,
    });

    try {
      revalidatePath('/about');
      revalidatePath('/');
    } catch (e) {
      console.warn('Revalidation error:', e);
    }

    return NextResponse.json({ success: true, profile: updated });
  } catch (error: unknown) {
    console.error('Update profile failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update profile.',
      },
      { status: 500 }
    );
  }
}
