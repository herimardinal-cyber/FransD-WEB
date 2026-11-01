import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionAdmin();
  if (!admin) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const { status } = await request.json();

    if (!['UNREAD', 'READ', 'ARCHIVED', 'SPAM'].includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    await recordAuditLog(admin.id, 'UPDATE_STATUS', 'ContactMessage', id, { status });

    return NextResponse.json({ success: true, message });
  } catch (error: unknown) {
    console.error('Update message failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to update message.',
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
    const message = await prisma.contactMessage.findUnique({ where: { id } });
    if (!message) {
      return NextResponse.json({ success: false, error: 'Message not found' }, { status: 404 });
    }

    await prisma.contactMessage.delete({ where: { id } });
    await recordAuditLog(admin.id, 'DELETE', 'ContactMessage', id, {
      name: message.name,
      email: message.email,
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error('Delete message failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to delete message.',
      },
      { status: 500 }
    );
  }
}
