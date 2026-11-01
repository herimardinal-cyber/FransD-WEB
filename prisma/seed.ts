import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { projects } from '../src/data/projects';
import { stories } from '../src/data/stories';
import { events } from '../src/data/events';
import { profile } from '../src/data/profile';
import { siteSettings } from '../src/data/site';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Starting Database Seeding ---');

  // 1. Initial Admin User
  const existingAdmin = await prisma.adminUser.findFirst({
    where: { email: 'admin@fransdelian.com' },
  });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash('FransDelian2026!', 12);
    const admin = await prisma.adminUser.create({
      data: {
        name: 'Frans Delian',
        email: 'admin@fransdelian.com',
        passwordHash,
        role: 'SUPERADMIN',
        isActive: true,
      },
    });
    console.log(`[Admin] Created initial admin: ${admin.email}`);
  } else {
    console.log('[Admin] Admin already exists');
  }

  // 2. Photographer Profile
  await prisma.photographerProfile.upsert({
    where: { id: 'default' },
    update: {
      displayName: profile.displayName,
      tagline: profile.tagline,
      biography: JSON.stringify(profile.biography),
      philosophy: JSON.stringify(profile.philosophy),
      portraitImageUrl: profile.portraitImage.url,
      secondaryPortraitUrl: profile.secondaryPortraitImage?.url,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      socialLinksJson: JSON.stringify(profile.socialLinks),
      awardsJson: JSON.stringify(profile.awards),
      exhibitionsJson: JSON.stringify(profile.exhibitions),
      gearJson: JSON.stringify(profile.gear),
    },
    create: {
      id: 'default',
      displayName: profile.displayName,
      tagline: profile.tagline,
      biography: JSON.stringify(profile.biography),
      philosophy: JSON.stringify(profile.philosophy),
      portraitImageUrl: profile.portraitImage.url,
      secondaryPortraitUrl: profile.secondaryPortraitImage?.url,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
      socialLinksJson: JSON.stringify(profile.socialLinks),
      awardsJson: JSON.stringify(profile.awards),
      exhibitionsJson: JSON.stringify(profile.exhibitions),
      gearJson: JSON.stringify(profile.gear),
    },
  });
  console.log('[Profile] Seeded photographer profile');

  // 3. Site Settings
  const defaultSettings = [
    { key: 'site_title', value: siteSettings.title },
    { key: 'site_tagline', value: siteSettings.tagline },
    { key: 'meta_description', value: siteSettings.metaDescription },
    { key: 'contact_email', value: siteSettings.contactEmail },
    { key: 'primary_location', value: siteSettings.primaryLocation },
    { key: 'copyright_year', value: String(siteSettings.copyrightYear) },
  ];

  for (const setting of defaultSettings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: { key: setting.key, value: setting.value },
    });
  }
  console.log('[Settings] Seeded site settings');

  // 4. Projects & Photos
  for (const proj of projects) {
    const existing = await prisma.photoProject.findUnique({
      where: { slug: proj.slug },
    });

    if (!existing) {
      const createdProject = await prisma.photoProject.create({
        data: {
          title: proj.title,
          slug: proj.slug,
          description: proj.description,
          longDescription: proj.longDescription,
          category: proj.category,
          year: proj.year,
          location: proj.location,
          client: proj.client,
          status: proj.status,
          featured: proj.featured,
          sortOrder: proj.sortOrder,
          publishedAt: new Date(proj.publishedAt),
        },
      });

      // Create photos
      let coverPhotoId: string | null = null;
      for (const ph of proj.photos) {
        const photoRecord = await prisma.photo.create({
          data: {
            projectId: createdProject.id,
            url: ph.url,
            altText: ph.altText,
            caption: ph.caption,
            width: ph.width,
            height: ph.height,
            aspectRatio: ph.aspectRatio || 'landscape',
            camera: ph.exif?.camera,
            lens: ph.exif?.lens,
            focalLength: ph.exif?.focalLength,
            aperture: ph.exif?.aperture,
            shutterSpeed: ph.exif?.shutterSpeed,
            iso: ph.exif?.iso,
            sortOrder: ph.sortOrder,
          },
        });

        if (ph.sortOrder === 1 && !coverPhotoId) {
          coverPhotoId = photoRecord.id;
        }
      }

      if (coverPhotoId) {
        await prisma.photoProject.update({
          where: { id: createdProject.id },
          data: { coverImageId: coverPhotoId },
        });
      }
    }
  }
  console.log('[Projects] Seeded photo projects and plates');

  // 5. Stories
  for (const st of stories) {
    const existing = await prisma.story.findUnique({
      where: { slug: st.slug },
    });

    if (!existing) {
      // Create cover photo record
      const coverPhoto = await prisma.photo.create({
        data: {
          url: st.coverImage.url,
          altText: st.coverImage.altText,
          caption: st.coverImage.caption,
          width: st.coverImage.width,
          height: st.coverImage.height,
          sortOrder: 1,
        },
      });

      await prisma.story.create({
        data: {
          title: st.title,
          slug: st.slug,
          excerpt: st.excerpt,
          body: JSON.stringify(st.body),
          category: st.category,
          readTime: st.readTime,
          tags: st.tags?.join(','),
          quoteText: st.quote?.text,
          quoteAuthor: st.quote?.author,
          status: st.status,
          coverImageId: coverPhoto.id,
          publishedAt: new Date(st.publishedAt),
        },
      });
    }
  }
  console.log('[Stories] Seeded stories and journal articles');

  // 6. Events
  for (const ev of events) {
    const existing = await prisma.event.findUnique({
      where: { slug: ev.slug },
    });

    if (!existing) {
      const coverPhoto = await prisma.photo.create({
        data: {
          url: ev.coverImage.url,
          altText: ev.coverImage.altText,
          caption: ev.coverImage.caption,
          width: ev.coverImage.width,
          height: ev.coverImage.height,
          sortOrder: 1,
        },
      });

      await prisma.event.create({
        data: {
          title: ev.title,
          slug: ev.slug,
          description: ev.description,
          venue: ev.venue,
          city: ev.city,
          country: ev.country,
          eventType: ev.eventType,
          curator: ev.curator,
          entryFee: ev.entryFee,
          startsAt: new Date(ev.startsAt),
          endsAt: new Date(ev.endsAt),
          scheduleJson: ev.schedule ? JSON.stringify(ev.schedule) : null,
          coverImageId: coverPhoto.id,
          status: ev.status,
        },
      });
    }
  }
  console.log('[Events] Seeded exhibitions and masterclasses');

  console.log('--- Database Seeding Complete ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

