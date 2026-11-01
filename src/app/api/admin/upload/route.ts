import { NextRequest, NextResponse } from 'next/server';
import { getSessionAdmin, recordAuditLog } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/upload';

export async function POST(request: NextRequest) {
  try {
    const admin = await getSessionAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { success: false, error: 'No valid file provided.' },
        { status: 400 }
      );
    }

    const saved = await saveUploadedFile(file);

    await recordAuditLog(admin.id, 'UPLOAD', 'File', saved.filename, {
      originalName: file.name,
      size: saved.size,
      mimeType: saved.mimeType,
      url: saved.url,
    });

    return NextResponse.json({
      success: true,
      file: saved,
    });
  } catch (error: unknown) {
    console.error('File upload failed:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'File upload failed.',
      },
      { status: 500 }
    );
  }
}
