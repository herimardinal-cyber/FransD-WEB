import { NextResponse } from 'next/server';
import { destroyAdminSession, getSessionAdmin, recordAuditLog } from '@/lib/auth';

export async function POST() {
  try {
    const admin = await getSessionAdmin();
    if (admin) {
      await recordAuditLog(admin.id, 'LOGOUT', 'AdminUser', admin.id, 'User initiated logout');
    }

    await destroyAdminSession();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process logout.' },
      { status: 500 }
    );
  }
}

