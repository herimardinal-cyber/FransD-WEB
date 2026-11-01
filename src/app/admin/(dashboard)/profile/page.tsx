import prisma from '@/lib/prisma';
import ProfileForm from '@/components/admin/ProfileForm';

export default async function AdminProfilePage() {
  const profile = await prisma.photographerProfile.findFirst();

  return <ProfileForm initialData={profile} />;
}
