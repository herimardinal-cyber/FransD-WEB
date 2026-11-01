import { PhotographerProfile } from '@/types';

export const profile: PhotographerProfile = {
  id: 'profile-frans-delian',
  displayName: 'Frans Delian',
  tagline: 'Stories Beyond The Frame',
  biography: [
    'Frans Delian is an international documentary and editorial photographer whose work examines the quiet friction between human emotion, ancient geography, and fleeting natural light.',
    'Over the past fifteen years, Frans has traveled to the edges of the inhabited world—from the volcanic highlands of Iceland and the high steppes of Western Mongolia to the ancient alleyways of Fez and the neon monoliths of Tokyo. Rather than capturing sensational spectacles, his lens gravitates toward the unspoken: the lingering pause between words, the geometry of shadow on a stone threshold, and the silent endurance of those who live in close communion with raw nature.',
    'Trained both in traditional analog darkroom printing and modern high-fidelity medium format digital systems, Frans approaches every frame with extreme economy. He creates photographs not to catalogue the surface of things, but to preserve the interior emotional atmosphere that transcends the immediate moment.'
  ],
  philosophy: [
    'To photograph is not to seize or conquer. It is an act of prolonged listening. In an age intoxicated by noise, instant gratification, and algorithmically optimized imagery, I believe in the radical dignity of stillness.',
    'Light is our universal language, but shadow is what grants it weight and truth. When we honor darkness instead of artificially eliminating it, the elements that remain illuminated become unforgettable sacred artifacts.'
  ],
  portraitImage: {
    id: 'photo-frans-portrait',
    url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=85',
    altText: 'Portrait of Frans Delian holding a rangefinder camera in atmospheric northern light',
    caption: 'Frans Delian in his studio atelier, 2025',
    width: 1400,
    height: 1800,
    aspectRatio: 'portrait',
    sortOrder: 1
  },
  secondaryPortraitImage: {
    id: 'photo-frans-field',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1400&q=85',
    altText: 'Frans Delian observing weather patterns during Icelandic field expedition',
    caption: 'Field notes in the Icelandic Highlands, 2024',
    width: 1400,
    height: 1800,
    aspectRatio: 'portrait',
    sortOrder: 2
  },
  email: 'studio@fransdelian.com',
  phone: '+41 44 210 88 44',
  location: 'Zurich, Switzerland & Worldwide on Commission',
  socialLinks: [
    { platform: 'Instagram', url: 'https://instagram.com/fransdelian', handle: '@fransdelian' },
    { platform: '500px', url: 'https://500px.com/fransdelian', handle: 'fransdelian' },
    { platform: 'Behance', url: 'https://behance.net/fransdelian', handle: 'fransdelian' },
    { platform: 'VSCO', url: 'https://vsco.co/fransdelian', handle: 'fransdelian.grid' }
  ],
  awards: [
    { year: '2025', title: 'Prix de la Photographie Paris (PX3)', organization: 'Gold Winner in Fine Art / Landscape' },
    { year: '2024', title: 'International Photography Awards (IPA)', organization: 'First Place, Editorial Documentary Series' },
    { year: '2023', title: 'Sony World Photography Awards', organization: 'Shortlist, Creative Fine Art Category' },
    { year: '2022', title: 'Leica Oskar Barnack Award Finalist', organization: 'Leica Camera International' }
  ],
  exhibitions: [
    { year: '2026', title: 'Echoes of Silence (Solo)', location: 'Pavilion of Fine Arts, Zurich', type: 'Solo' },
    { year: '2025', title: 'Stories Beyond The Frame (Retrospective)', location: 'Galerie d’Art Contemporain, Paris', type: 'Solo' },
    { year: '2024', title: 'Nordic Light Masters (Group)', location: 'Fotografiska, Stockholm', type: 'Group' },
    { year: '2023', title: 'Shadows of the Silk Road', location: 'Tokyo Photographic Gallery, Ginza', type: 'Solo' },
    { year: '2022', title: 'Contemporary Humanism', location: 'Somerset House, London', type: 'Group' }
  ],
  press: [
    { year: '2025', publication: 'Aperture Quarterly', articleTitle: 'Frans Delian: The Quiet Monumentality of the North' },
    { year: '2024', publication: 'Blind Magazine', articleTitle: 'Into the Shadow of Fez with Frans Delian' },
    { year: '2023', publication: 'Leica Fotografie International (LFI)', articleTitle: 'Mastering the Monochrom: Rangefinder Precision' }
  ],
  gear: [
    {
      category: 'Primary Cameras',
      items: ['Hasselblad 907X 50C Medium Format', 'Leica M11 Monochrom Rangefinder', 'Leica SL2 Mirrorless']
    },
    {
      category: 'Prime Optics',
      items: ['Leica Summilux-M 35mm f/1.4 ASPH', 'Leica Summicron-M 50mm f/2.0 Dual-Range', 'Hasselblad XCD 80mm f/1.9', 'Hasselblad XCD 45mm f/4P']
    },
    {
      category: 'Field & Analog',
      items: ['Linhof Master Technika 4x5 Field Camera', 'Gitzo Mountaineer Carbon Fiber Tripods', 'Sekonic L-858D-U Speedmaster Light Meter']
    }
  ]
};

