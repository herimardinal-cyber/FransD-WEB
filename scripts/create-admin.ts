import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  const args = process.argv.slice(2);
  const name = args[0] || 'Frans Delian';
  const email = args[1] || 'studio@fransdelian.com';
  const password = args[2] || 'FransMaster2026!';

  if (!email || !password) {
    console.error('Usage: npx tsx scripts/create-admin.ts <name> <email> <password>');
    process.exit(1);
  }

  const existing = await prisma.adminUser.findUnique({
    where: { email },
  });

  const passwordHash = await bcrypt.hash(password, 12);

  if (existing) {
    const updated = await prisma.adminUser.update({
      where: { email },
      data: {
        name,
        passwordHash,
        isActive: true,
      },
    });
    console.log(`[Admin] Successfully updated password for existing admin: ${updated.email}`);
  } else {
    const created = await prisma.adminUser.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'SUPERADMIN',
        isActive: true,
      },
    });
    console.log(`[Admin] Successfully created new admin user: ${created.email} (${created.name})`);
  }
}

createAdmin()
  .catch((e) => {
    console.error('[Admin Error]', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

