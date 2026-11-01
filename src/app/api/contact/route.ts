import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, inquiryType, subject, message, honeypot } = body;

    // Honeypot check for spam bots
    if (honeypot) {
      return NextResponse.json({ success: true, referenceId: 'FD-OK' });
    }

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: 'A valid name is required (max 100 characters).' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim()) || email.length > 150) {
      return NextResponse.json(
        { success: false, error: 'A valid email address is required.' },
        { status: 400 }
      );
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0 || subject.length > 200) {
      return NextResponse.json(
        { success: false, error: 'Subject is required (max 200 characters).' },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 15 || message.length > 5000) {
      return NextResponse.json(
        { success: false, error: 'Message must be between 15 and 5,000 characters.' },
        { status: 400 }
      );
    }

    // Client IP for rate audit
    const ipAddress =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    // Store in MySQL
    const savedMessage = await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        inquiryType: inquiryType || 'Editorial & Assignment',
        subject: subject.trim(),
        message: message.trim(),
        ipAddress,
        status: 'UNREAD',
      },
    });

    const referenceId = `FD-${savedMessage.id.slice(-6).toUpperCase()}`;

    // Optional SMTP Notification (failsafe - does not interrupt success)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        });

        const recipient = process.env.CONTACT_EMAIL_TO || 'studio@fransdelian.com';
        await transporter.sendMail({
          from: `"Frans Delian Portfolio" <${process.env.SMTP_USER}>`,
          to: recipient,
          replyTo: email.trim(),
          subject: `[Portfolio Inquiry] ${subject.trim()} (${referenceId})`,
          text: `New inquiry from ${name.trim()} (${email.trim()}):\n\nType: ${inquiryType}\n\n${message.trim()}`,
          html: `
            <div style="font-family: serif; color: #171717; max-width: 600px; padding: 20px;">
              <h2 style="color: #C6AA7B; border-bottom: 1px solid #ddd; padding-bottom: 8px;">New Studio Inquiry (${referenceId})</h2>
              <p><strong>From:</strong> ${name.trim()} &lt;${email.trim()}&gt;</p>
              <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
              <p><strong>Subject:</strong> ${subject.trim()}</p>
              <div style="background: #f8f8f8; padding: 15px; border-left: 3px solid #C6AA7B; margin-top: 15px;">
                <p style="white-space: pre-wrap;">${message.trim()}</p>
              </div>
            </div>
          `,
        });
      } catch (smtpErr) {
        console.error('[SMTP Notification Warning] Message stored in DB, but email failed:', smtpErr);
      }
    }

    return NextResponse.json({
      success: true,
      referenceId,
      messageId: savedMessage.id,
    });
  } catch (error) {
    console.error('Contact Submission Error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
