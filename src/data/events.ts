import { Event } from '@/types';

export const events: Event[] = [
  {
    id: 'event-1',
    title: 'Echoes of Silence: Solo Exhibition & Monograph Launch',
    slug: 'echoes-of-silence-exhibition',
    eventType: 'Solo Exhibition',
    status: 'UPCOMING',
    startsAt: '2026-11-15T18:00:00Z',
    endsAt: '2026-12-20T21:00:00Z',
    venue: 'Pavilion of Fine Arts & Photography',
    city: 'Zurich',
    country: 'Switzerland',
    description: 'A comprehensive installation presenting forty large-scale platinum palladium prints from the Icelandic highland expedition, accompanied by the debut of the cloth-bound limited monograph.',
    coverImage: {
      id: 'photo-event-1-cover',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85',
      altText: 'Exhibition hall featuring large format fine art landscape prints on dark gallery walls',
      caption: 'The main gallery hall at Pavilion of Fine Arts',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    curator: 'Dr. Marianne Laurent, Former Senior Curator of Modern Media',
    entryFee: 'Complimentary with RSVP / Vernissage by Invitation',
    schedule: [
      { time: '18:00', activity: 'VIP & Press Preview with Frans Delian' },
      { time: '19:00', activity: 'Curator Introduction & Opening Remarks' },
      { time: '19:45', activity: 'Artist Walkthrough & Monograph Signing' },
      { time: '21:00', activity: 'Evening Reception & Wine Service' }
    ],
    photos: [
      {
        id: 'photo-event-1-sub1',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        altText: 'Installation view of mountain landscape works',
        caption: 'Glacial triptych installed in the North Wing',
        width: 1600,
        height: 1000,
        sortOrder: 1
      },
      {
        id: 'photo-event-1-sub2',
        url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1600&q=80',
        altText: 'Monolithic coastal prints on museum walls',
        caption: 'Basalt Series prints under museum halogen lighting',
        width: 1600,
        height: 1000,
        sortOrder: 2
      }
    ]
  },
  {
    id: 'event-2',
    title: 'The Decisive Shadow: Kyoto Street & Chiaroscuro Masterclass',
    slug: 'kyoto-street-masterclass',
    eventType: 'Masterclass',
    status: 'UPCOMING',
    startsAt: '2027-02-10T09:00:00Z',
    endsAt: '2027-02-15T18:00:00Z',
    venue: 'Kamo Atelier & Traditional Machiya',
    city: 'Kyoto',
    country: 'Japan',
    description: 'An intensive five-day residential workshop limited to eight photographers, focusing on natural light, negative space, and respectful street portraiture in historic Kyoto.',
    coverImage: {
      id: 'photo-event-2-cover',
      url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85',
      altText: 'Traditional Japanese wooden machiya street illuminated by gentle lanterns',
      caption: 'Evening atmosphere in Gion, Kyoto',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    curator: 'Organized in collaboration with Tokyo Photographic Guild',
    entryFee: '$2,800 USD (Includes lodging, daily critiques, and private field access)',
    schedule: [
      { time: 'Day 1', activity: 'Arrival, Welcome Dinner & Portfolio Reviews' },
      { time: 'Day 2', activity: 'Dawn Light in Higashiyama: Seeing Geometry in Shadow' },
      { time: 'Day 3', activity: 'Environmental Portraiture with Kyoto Artisans' },
      { time: 'Day 4', activity: 'Editing, Sequencing & Narrative Structure Workshop' },
      { time: 'Day 5', activity: 'Final Exhibition Print Selection & Graduation Dinner' }
    ]
  },
  {
    id: 'event-3',
    title: 'Stories Beyond The Frame: Retrospective 2020–2024',
    slug: 'stories-beyond-the-frame-retrospective',
    eventType: 'Solo Exhibition',
    status: 'PAST',
    startsAt: '2025-03-01T10:00:00Z',
    endsAt: '2025-04-14T20:00:00Z',
    venue: 'Galerie d’Art Contemporain',
    city: 'Paris',
    country: 'France',
    description: 'A five-year survey exhibiting Frans Delian’s major bodies of work across Iceland, Morocco, Central Asia, and Tokyo, examining the persistent thread of human solitude.',
    coverImage: {
      id: 'photo-event-3-cover',
      url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=85',
      altText: 'Exhibition documentation of Moroccan street portraits and light studies',
      caption: 'Retrospective installation view in Paris',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    curator: 'Hélène Vautier',
    entryFee: '€14 General Admission / Free on first Thursdays'
  },
  {
    id: 'event-4',
    title: 'The Poetics of Chiaroscuro: Artist Keynote at Leica Studio',
    slug: 'leica-keynote-chiaroscuro',
    eventType: 'Artist Talk',
    status: 'PAST',
    startsAt: '2024-10-18T19:00:00Z',
    endsAt: '2024-10-18T21:30:00Z',
    venue: 'Leica Gallery Wetzlar',
    city: 'Wetzlar',
    country: 'Germany',
    description: 'An intimate evening discussion on the discipline of monochrome vision, optical rangefinder focusing, and the balance between documentation and fine art.',
    coverImage: {
      id: 'photo-event-4-cover',
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85',
      altText: 'Auditorium discussion with projection of black and white photography',
      caption: 'Keynote lecture at Leica Headquarters',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    curator: 'Leica Akademie Europe',
    entryFee: 'Sold Out'
  }
];

