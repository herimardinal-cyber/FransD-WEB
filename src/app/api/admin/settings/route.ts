import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const settings = await prisma.siteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return NextResponse.json({ success: true, settings: settingsMap });
}

export async function PUT(request: NextRequest) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { settings } = await request.json();

    if (!settings || typeof settings !== 'object') {
      return NextResponse.json({ success: false, error: 'Invalid settings payload' }, { status: 400 });
    }

    const updates = Object.entries(settings).map(([key, value]) =>
      prisma.siteSetting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    );

    await prisma.$transaction(updates);

    await recordAuditLog(admin.id, 'UPDATE_SETTINGS', 'SiteSetting', 'global', {
      updatedKeys: Object.keys(settings),
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Update settings failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update settings.',
      },
      { status: 500 }
    );
  }
}
