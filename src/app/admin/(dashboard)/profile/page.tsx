import prisma from '@/lib/prisma';
import ProfileForm from '@/components/admin/ProfileForm';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminProfilePage() {
  const [profile, siteSettings] = await Promise.all([
    prisma.photographerProfile.findFirst(),
    prisma.siteSetting.findMany(),
  ]);

  const settingsMap: Record<string, string> = {};
  siteSettings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return <ProfileForm initialData={profile} initialSettings={settingsMap} />;
}
