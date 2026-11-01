import prisma from '@/lib/prisma';
import SettingsForm from '@/components/admin/SettingsForm';

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const settingsMap: Record<string, string> = {};
  settings.forEach((s) => {
    settingsMap[s.key] = s.value;
  });

  return <SettingsForm initialSettings={settingsMap} />;
}
