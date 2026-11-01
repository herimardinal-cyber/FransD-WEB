import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';
import { createAdminSession, recordAuditLog } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Find active user
    const adminUser = await prisma.adminUser.findUnique({
      where: { email: normalizedEmail },
    });

    if (!adminUser || !adminUser.isActive) {
      // Artificial delay to prevent timing attacks
      await new Promise((res) => setTimeout(res, 500));
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, adminUser.passwordHash);

    if (!isMatch) {
      await new Promise((res) => setTimeout(res, 500));
      return NextResponse.json(
        { success: false, error: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Create session and set cookie
    await createAdminSession(adminUser.id);
    await recordAuditLog(adminUser.id, 'LOGIN', 'AdminUser', adminUser.id, {
      email: adminUser.email,
      userAgent: request.headers.get('user-agent') || 'Unknown',
    });

    return NextResponse.json({
      success: true,
      user: {
        id: adminUser.id,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal authentication error.' },
      { status: 500 }
    );
  }
}
