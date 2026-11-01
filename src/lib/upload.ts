import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB

function validateMagicBytes(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return true;
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return true;
  }

  // WebP: 52 49 46 46 (RIFF) ... 57 45 42 50 (WEBP)
  const isRiff =
    buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46;
  const isWebp =
    buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;
  if (isRiff && isWebp) {
    return true;
  }

  return false;
}

export async function saveUploadedFile(file: File): Promise<{
  url: string;
  filename: string;
  size: number;
  mimeType: string;
}> {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File exceeds maximum allowable size (15MB)');
  }

  const rawExt = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(rawExt) || (file.type && !ALLOWED_MIME_TYPES.includes(file.type))) {
    throw new Error('Unsupported image format. Allowed: JPG, PNG, WebP');
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!validateMagicBytes(buffer)) {
    throw new Error('File header signature validation failed. Please upload a genuine image file.');
  }

  // Target directory
  const baseUploadDir = process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads');
  await fs.mkdir(baseUploadDir, { recursive: true });

  // Generate non-colliding random filename
  const randomPrefix = crypto.randomBytes(16).toString('hex');
  const safeExt = rawExt === '.jpeg' ? '.jpg' : rawExt;
  const filename = `${randomPrefix}${safeExt}`;
  const targetPath = path.join(baseUploadDir, filename);

  // Write file
  await fs.writeFile(targetPath, buffer);

  // URL resolution: if stored in ./public/uploads, url is /uploads/filename
  // In VPS Ubuntu with /var/lib/frans-delian/uploads, Nginx serves /uploads/ directly or Next.js route serves it
  const url = `/uploads/${filename}`;

  return {
    url,
    filename,
    size: file.size,
    mimeType: file.type || 'image/jpeg',
  };
}
