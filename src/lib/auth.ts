import { cookies } from 'next/headers';
import crypto from 'crypto';
import prisma from './prisma';

const SESSION_COOKIE_NAME = 'fd_admin_session';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

// Helper to hash token before saving to database
function hashToken(token: string): string {
  return crypto.createHash('sha256').update(token).digest('hex');
}

/**
 * Creates a new cryptographically secure session and sets the HttpOnly cookie.
 */
export async function createAdminSession(adminUserId: string): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await prisma.adminSession.create({
    data: {
      adminUserId,
      tokenHash,
      expiresAt,
    },
  });

  // Update last login
  await prisma.adminUser.update({
    where: { id: adminUserId },
    data: { lastLoginAt: new Date() },
  });

  const cookieStore = await cookies();
  const isHttps = process.env.NEXT_PUBLIC_APP_URL?.startsWith('https');
  cookieStore.set(SESSION_COOKIE_NAME, rawToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' && !!isHttps,
    sameSite: 'lax',
    path: '/',
    expires: expiresAt,
  });

  return rawToken;
}

/**
 * Validates the session from the HttpOnly cookie.
 */
export async function getSessionAdmin() {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!rawToken) {
    return null;
  }

  const tokenHash = hashToken(rawToken);

  const session = await prisma.adminSession.findUnique({
    where: { tokenHash },
    include: {
      adminUser: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
        },
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.adminSession.delete({ where: { id: session.id } }).catch(() => {});
    }
    return null;
  }

  if (!session.adminUser || !session.adminUser.isActive) {
    return null;
  }

  return session.adminUser;
}

/**
 * Destroys current session and clears cookie.
 */
export async function destroyAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (rawToken) {
    const tokenHash = hashToken(rawToken);
    await prisma.adminSession.deleteMany({
      where: { tokenHash },
    }).catch(() => {});
  }

  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Records an audit log entry.
 */
export async function recordAuditLog(
  adminUserId: string | null,
  action: string,
  entityType: string,
  entityId?: string,
  details?: Record<string, unknown> | string
) {
  try {
    await prisma.auditLog.create({
      data: {
        adminUserId,
        action,
        entityType,
        entityId: entityId || null,
        details: typeof details === 'object' ? JSON.stringify(details) : details || null,
      },
    });
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}

