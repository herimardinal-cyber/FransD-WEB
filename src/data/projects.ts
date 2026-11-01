import { PhotoProject } from '@/types';

export const projects: PhotoProject[] = [
  {
    id: 'proj-1',
    title: 'Echoes of Silence',
    slug: 'echoes-of-silence',
    category: 'Landscape',
    year: 2025,
    location: 'Highlands & Fjords, Iceland',
    description: 'An exploration of vast Nordic solitude where geological time slows to the rhythm of drifting mist and volcanic basalt.',
    longDescription: 'Created over forty days traversing the remote interior of Iceland, "Echoes of Silence" captures landscapes untouched by the hurried tempo of modern life. Working exclusively in dawn and twilight, each frame records the subtle tension between ancient ice sheets, volcanic black sand plains, and the ephemeral breath of mist over geothermal ridges.',
    coverImage: {
      id: 'photo-eos-cover',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85',
      altText: 'Mist rising over volcanic ridges in Iceland at twilight',
      caption: 'Dawn over the highland rift, Iceland',
      width: 1800,
      height: 1200,
      aspectRatio: 'landscape',
      location: 'Landmannalaugar, Iceland',
      exif: {
        camera: 'Leica SL2',
        lens: 'Vario-Elmarit-SL 24-90mm f/2.8-4 ASPH',
        focalLength: '35mm',
        aperture: 'f/8.0',
        shutterSpeed: '1/15s',
        iso: '64'
      },
      sortOrder: 1
    },
    status: 'PUBLISHED',
    featured: true,
    sortOrder: 1,
    publishedAt: '2025-08-14T00:00:00Z',
    client: 'Personal Exhibition Series',
    photos: [
      {
        id: 'photo-eos-1',
        url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85',
        altText: 'Mist rising over volcanic ridges in Iceland at twilight',
        caption: 'Dawn over the highland rift, Iceland',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Landmannalaugar, Iceland',
        exif: { camera: 'Leica SL2', focalLength: '35mm', aperture: 'f/8.0', shutterSpeed: '1/15s', iso: '64' },
        sortOrder: 1
      },
      {
        id: 'photo-eos-2',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=85',
        altText: 'Glacial peaks catching the first ray of golden sunlight',
        caption: 'First light breaking over snow-covered peaks',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Vatnajökull, Iceland',
        exif: { camera: 'Leica SL2', focalLength: '70mm', aperture: 'f/5.6', shutterSpeed: '1/250s', iso: '100' },
        sortOrder: 2
      },
      {
        id: 'photo-eos-3',
        url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1800&q=85',
        altText: 'Monolithic coastal sea stack standing firm against turbulent tides',
        caption: 'Sea stacks and Atlantic swells at Reynisfjara',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Vik, Iceland',
        exif: { camera: 'Leica SL2', focalLength: '24mm', aperture: 'f/11', shutterSpeed: '2.5s', iso: '50' },
        sortOrder: 3
      },
      {
        id: 'photo-eos-4',
        url: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85',
        altText: 'Starry skies over jagged snowbound alpine peaks',
        caption: 'Night sky above the silent glacial valley',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Kirkjufell, Iceland',
        exif: { camera: 'Leica SL2', focalLength: '21mm', aperture: 'f/1.4', shutterSpeed: '20s', iso: '3200' },
        sortOrder: 4
      },
      {
        id: 'photo-eos-5',
        url: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1800&q=85',
        altText: 'Morning fog winding through evergreen forest valleys',
        caption: 'Layered ridge lines emerging through sea mist',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Westfjords, Iceland',
        exif: { camera: 'Leica SL2', focalLength: '90mm', aperture: 'f/6.3', shutterSpeed: '1/80s', iso: '100' },
        sortOrder: 5
      },
      {
        id: 'photo-eos-6',
        url: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1800&q=85',
        altText: 'Deep forest path filtered by canopy light and autumn tones',
        caption: 'The solitary corridor between mountain passes',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Thórsmörk, Iceland',
        exif: { camera: 'Leica SL2', focalLength: '50mm', aperture: 'f/4.0', shutterSpeed: '1/125s', iso: '200' },
        sortOrder: 6
      }
    ]
  },
  {
    id: 'proj-2',
    title: 'The Solitary Gaze',
    slug: 'the-solitary-gaze',
    category: 'Portrait',
    year: 2025,
    location: 'Berlin & Kyoto',
    description: 'A study in human introspection through stripped-back natural light and minimalist environmental framing.',
    longDescription: 'Stripping away theatrical set pieces, "The Solitary Gaze" approaches portraiture as a collaborative meditation. Across artists, sculptors, and poets photographed in their private quarters, the camera acts not as an interrogator, but as a silent witness to moments of unguarding.',
    coverImage: {
      id: 'photo-tsg-cover',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
      altText: 'Introspective editorial portrait illuminated by gentle northern window light',
      caption: 'Claire in morning light, Berlin studio',
      width: 1600,
      height: 2000,
      aspectRatio: 'portrait',
      location: 'Kreuzberg, Berlin',
      exif: {
        camera: 'Hasselblad 907X 50C',
        lens: 'XCD 80mm f/1.9',
        focalLength: '80mm',
        aperture: 'f/2.2',
        shutterSpeed: '1/160s',
        iso: '100'
      },
      sortOrder: 1
    },
    status: 'PUBLISHED',
    featured: true,
    sortOrder: 2,
    publishedAt: '2025-06-20T00:00:00Z',
    client: 'Editorial Commission — L’Éphémère Journal',
    photos: [
      {
        id: 'photo-tsg-1',
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
        altText: 'Introspective editorial portrait illuminated by gentle northern window light',
        caption: 'Claire in morning light, Berlin studio',
        width: 1600,
        height: 2000,
        aspectRatio: 'portrait',
        location: 'Berlin, Germany',
        exif: { camera: 'Hasselblad 907X', focalLength: '80mm', aperture: 'f/2.2', shutterSpeed: '1/160s', iso: '100' },
        sortOrder: 1
      },
      {
        id: 'photo-tsg-2',
        url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1600&q=85',
        altText: 'Character study of artisan woodworker in natural light',
        caption: 'Kenji, master wood turner in his Gion workshop',
        width: 1600,
        height: 2000,
        aspectRatio: 'portrait',
        location: 'Kyoto, Japan',
        exif: { camera: 'Hasselblad 907X', focalLength: '65mm', aperture: 'f/2.8', shutterSpeed: '1/125s', iso: '200' },
        sortOrder: 2
      },
      {
        id: 'photo-tsg-3',
        url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=85',
        altText: 'Cinematic profile portrait with chiaroscuro shadow play',
        caption: 'Elena between rehearsals, Philharmonie',
        width: 1600,
        height: 2000,
        aspectRatio: 'portrait',
        location: 'Berlin, Germany',
        exif: { camera: 'Hasselblad 907X', focalLength: '90mm', aperture: 'f/2.0', shutterSpeed: '1/200s', iso: '160' },
        sortOrder: 3
      },
      {
        id: 'photo-tsg-4',
        url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1600&q=85',
        altText: 'Monochromatic portrait showcasing textured shadows and candid gaze',
        caption: 'Marcus, author and essayist',
        width: 1600,
        height: 2000,
        aspectRatio: 'portrait',
        location: 'Kyoto, Japan',
        exif: { camera: 'Hasselblad 907X', focalLength: '80mm', aperture: 'f/2.5', shutterSpeed: '1/100s', iso: '400' },
        sortOrder: 4
      },
      {
        id: 'photo-tsg-5',
        url: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1600&q=85',
        altText: 'Fashion editorial portrait with soft directional shadow',
        caption: 'Aura in late afternoon dusk',
        width: 1600,
        height: 2000,
        aspectRatio: 'portrait',
        location: 'Berlin, Germany',
        exif: { camera: 'Hasselblad 907X', focalLength: '80mm', aperture: 'f/1.9', shutterSpeed: '1/320s', iso: '100' },
        sortOrder: 5
      }
    ]
  },
  {
    id: 'proj-3',
    title: 'Whispers of the Medina',
    slug: 'whispers-of-the-medina',
    category: 'Street',
    year: 2024,
    location: 'Fez & Marrakech, Morocco',
    description: 'Shadows, saffron dust, and geometries carved by centuries of footfall through medieval alleyways.',
    longDescription: 'In the walled labyrinth of Fez el-Bali, light behaves like liquid poured through reed roofs and cracked cedar lattices. This documentary series follows the daily choreography of artisans, dye tanners, and bread carriers whose crafts remain deeply rooted in ancient cadence.',
    coverImage: {
      id: 'photo-wotm-cover',
      url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=85',
      altText: 'Sunbeams piercing through a woven lattice in a Moroccan market corridor',
      caption: 'Shafts of morning sun in the souks of Fez',
      width: 1800,
      height: 1200,
      aspectRatio: 'landscape',
      location: 'Fez Medina, Morocco',
      exif: {
        camera: 'Leica M11 Monochrom',
        lens: 'Summilux-M 35mm f/1.4 ASPH',
        focalLength: '35mm',
        aperture: 'f/2.8',
        shutterSpeed: '1/500s',
        iso: '400'
      },
      sortOrder: 1
    },
    status: 'PUBLISHED',
    featured: true,
    sortOrder: 3,
    publishedAt: '2024-11-05T00:00:00Z',
    client: 'National Geographic Traveler Editorial',
    photos: [
      {
        id: 'photo-wotm-1',
        url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=85',
        altText: 'Sunbeams piercing through a woven lattice in a Moroccan market corridor',
        caption: 'Shafts of morning sun in the souks of Fez',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Fez, Morocco',
        sortOrder: 1
      },
      {
        id: 'photo-wotm-2',
        url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1800&q=85',
        altText: 'Geometric archway framing a quiet desert courtyard',
        caption: 'Zellij tilework and midday stillness',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Marrakech, Morocco',
        sortOrder: 2
      },
      {
        id: 'photo-wotm-3',
        url: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&w=1800&q=85',
        altText: 'Narrow shadowed alley leading towards a sunlit archway',
        caption: 'The quiet hour before prayer call',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Fez, Morocco',
        sortOrder: 3
      },
      {
        id: 'photo-wotm-4',
        url: 'https://images.unsplash.com/photo-1509718443690-d8e2fb3474b7?auto=format&fit=crop&w=1800&q=85',
        altText: 'Carpet merchant inspecting dyed wool in the courtyard',
        caption: 'Weaver selecting dyed yarn',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Marrakech, Morocco',
        sortOrder: 4
      }
    ]
  },
  {
    id: 'proj-4',
    title: 'Architectonics of Shadow',
    slug: 'architectonics-of-shadow',
    category: 'Editorial',
    year: 2024,
    location: 'Tokyo & Osaka, Japan',
    description: 'High-contrast monochrome studies dissecting the monumental geometry and glass facades of Japanese modernism.',
    longDescription: 'Drawing inspiration from Jun’ichirō Tanizaki’s "In Praise of Shadows," this collection examines how contemporary architecture negotiates illumination and void. Concrete cantilevers and glass towers become gigantic light dials reflecting the quiet isolation of the megalopolis.',
    coverImage: {
      id: 'photo-aos-cover',
      url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=85',
      altText: 'Dramatic upward architectural perspective of Tokyo skyscraper glass facade',
      caption: 'Convergence of steel and night sky, Shinjuku',
      width: 1800,
      height: 1200,
      aspectRatio: 'landscape',
      location: 'Shinjuku, Tokyo',
      exif: {
        camera: 'Sony A7R V',
        lens: 'FE 16-35mm f/2.8 GM II',
        focalLength: '16mm',
        aperture: 'f/8.0',
        shutterSpeed: '1/30s',
        iso: '100'
      },
      sortOrder: 1
    },
    status: 'PUBLISHED',
    featured: true,
    sortOrder: 4,
    publishedAt: '2024-09-18T00:00:00Z',
    client: 'Architecture & Design Biennale',
    photos: [
      {
        id: 'photo-aos-1',
        url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1800&q=85',
        altText: 'Dramatic upward architectural perspective of Tokyo skyscraper glass facade',
        caption: 'Convergence of steel and night sky, Shinjuku',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Tokyo, Japan',
        sortOrder: 1
      },
      {
        id: 'photo-aos-2',
        url: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=1800&q=85',
        altText: 'Minimal spiral staircase casting sculptural shadow on concrete',
        caption: 'Helical descent, Ginza design center',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Tokyo, Japan',
        sortOrder: 2
      },
      {
        id: 'photo-aos-3',
        url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85',
        altText: 'Reflective corporate tower mirrored against stormy twilight skies',
        caption: 'Monolith in slate gray',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Osaka, Japan',
        sortOrder: 3
      },
      {
        id: 'photo-aos-4',
        url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1800&q=85',
        altText: 'Minimal concrete interior with thin geometric shaft of sunlight',
        caption: 'The aperture of silence',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Tokyo, Japan',
        sortOrder: 4
      }
    ]
  },
  {
    id: 'proj-5',
    title: 'Nomads of the High Steppe',
    slug: 'nomads-of-the-high-steppe',
    category: 'Documentary',
    year: 2024,
    location: 'Bayan-Ölgii, Western Mongolia',
    description: 'Living alongside eagle hunters in the sub-zero Altai mountains during seasonal transhumance.',
    longDescription: 'At altitudes exceeding 3,000 meters where winter temperatures plummet below -35°C, Kazakh eagle hunters maintain an ancient covenant with golden eagles. Documented over three weeks living in felt yurts, this project captures intimate family rituals, migration on horseback, and the harsh beauty of survival on the open steppe.',
    coverImage: {
      id: 'photo-noths-cover',
      url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=85',
      altText: 'Eagle hunter on horseback navigating windswept snow plains beneath rugged mountains',
      caption: 'Rider descending into the western valley at sundown',
      width: 1800,
      height: 1200,
      aspectRatio: 'landscape',
      location: 'Altai Mountains, Mongolia',
      exif: {
        camera: 'Leica SL2',
        lens: 'APO-Vario-Elmarit-SL 90-280mm f/2.8-4',
        focalLength: '135mm',
        aperture: 'f/4.0',
        shutterSpeed: '1/1000s',
        iso: '200'
      },
      sortOrder: 1
    },
    status: 'PUBLISHED',
    featured: false,
    sortOrder: 5,
    publishedAt: '2024-04-12T00:00:00Z',
    client: 'Humanity Documentary Grant',
    photos: [
      {
        id: 'photo-noths-1',
        url: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=85',
        altText: 'Eagle hunter on horseback navigating windswept snow plains beneath rugged mountains',
        caption: 'Rider descending into the western valley at sundown',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Altai Mountains, Mongolia',
        sortOrder: 1
      },
      {
        id: 'photo-noths-2',
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1800&q=85',
        altText: 'Traditional Kazakh winter camp illuminated by warm hearth smoke',
        caption: 'Twilight over the winter settlement',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Bayan-Ölgii, Mongolia',
        sortOrder: 2
      },
      {
        id: 'photo-noths-3',
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1800&q=85',
        altText: 'Caravan traversing expansive golden grasslands',
        caption: 'The autumn relocation across the plateau',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Western Mongolia',
        sortOrder: 3
      }
    ]
  },
  {
    id: 'proj-6',
    title: 'Dusk Along the Bosphorus',
    slug: 'dusk-along-the-bosphorus',
    category: 'Street',
    year: 2023,
    location: 'Istanbul, Turkey',
    description: 'A poetic visual diary recording the melancholy "Hüzün" that envelopes Istanbul as seagulls wheel over ferry wakes.',
    longDescription: 'Capturing the golden haze and deep amber lanterns where Europe meets Asia across the straits. From fishermen lingering on the Galata Bridge to old wooden mansions decaying with grace along the shorelines, Istanbul reveals its quiet dignity at the threshold of night.',
    coverImage: {
      id: 'photo-datb-cover',
      url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1800&q=85',
      altText: 'Silhouetted ferry crossing misty Bosphorus waters at sunset with minarets in background',
      caption: 'Evening ferry crossing toward Kadıköy',
      width: 1800,
      height: 1200,
      aspectRatio: 'landscape',
      location: 'Istanbul, Turkey',
      exif: {
        camera: 'Leica M10-R',
        lens: 'Summicron-M 50mm f/2',
        focalLength: '50mm',
        aperture: 'f/2.8',
        shutterSpeed: '1/250s',
        iso: '400'
      },
      sortOrder: 1
    },
    status: 'PUBLISHED',
    featured: false,
    sortOrder: 6,
    publishedAt: '2023-11-20T00:00:00Z',
    client: 'Personal Visual Journal',
    photos: [
      {
        id: 'photo-datb-1',
        url: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1800&q=85',
        altText: 'Silhouetted ferry crossing misty Bosphorus waters at sunset with minarets in background',
        caption: 'Evening ferry crossing toward Kadıköy',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Istanbul, Turkey',
        sortOrder: 1
      },
      {
        id: 'photo-datb-2',
        url: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a1b?auto=format&fit=crop&w=1800&q=85',
        altText: 'Cobblestone streets of Karaköy with historic street lamp glow',
        caption: 'Lantern glow in Karaköy alleys',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Istanbul, Turkey',
        sortOrder: 2
      },
      {
        id: 'photo-datb-3',
        url: 'https://images.unsplash.com/photo-1527838832700-5059252407fa?auto=format&fit=crop&w=1800&q=85',
        altText: 'Fishermen lines hanging over Galata bridge into twilight mist',
        caption: 'Fishermen at Galata Bridge',
        width: 1800,
        height: 1200,
        aspectRatio: 'landscape',
        location: 'Istanbul, Turkey',
        sortOrder: 3
      }
    ]
  }
];

