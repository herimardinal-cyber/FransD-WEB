import { Story } from '@/types';

export const stories: Story[] = [
  {
    id: 'story-1',
    title: 'The Anatomy of Stillness: 40 Days in the Icelandic Interior',
    slug: 'the-anatomy-of-stillness',
    category: 'Field Notes',
    publishedAt: '2025-09-02T00:00:00Z',
    readTime: '6 min read',
    excerpt: 'What happens when silence becomes so profound that the only sound left is the friction of your own breathing against glacial wind?',
    coverImage: {
      id: 'photo-story-1-cover',
      url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1800&q=85',
      altText: 'Vast barren volcanic ridge cloaked in early morning mist',
      caption: 'Dawn over the highland rift, 4:15 AM',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    quote: {
      text: "The landscape does not ask to be conquered; it demands that you surrender your impatience before it yields its true form.",
      author: "Frans Delian"
    },
    tags: ['Landscape', 'Iceland', 'Philosophy', 'Medium Format'],
    body: [
      'In the urban center, we measure time by seconds, deadlines, and notifications. In the highland volcanic desert of central Iceland, time is reckoned in tectonic fissures and the millimeter-per-century retreat of basalt shelves.',
      'For forty consecutive days, I lived out of an outfitted four-wheel drive camper with two mechanical camera bodies and twenty rolls of medium-format film. There was no cellular reception, no synthetic lighting, and no schedule other than the perpetual shifting of arctic twilight.',
      'The initial instinct of any photographer arriving in such terrain is frenzy: the vastness is intimidating, and you rush to frame everything at once. But after the seventh day of biting rain and gale-force wind, the camera remained in its pelican case. I realized that until you learn to sit through the monotony of mist without resentment, you cannot comprehend the geology you are trying to frame.',
      'When the cloud layer finally sheared open above the glacier at four in the morning, the light was not dramatic in the postcard sense. It was pale, austere, and silver. A single line of volcanic moraine emerged from the shadows like the spine of a sleeping leviathan. I pressed the shutter release only once.',
      'Photography, at its most honest, is an exercise in subtraction. It is stripping away the noise until only the primordial balance of mass, shadow, and silence remains on the negative.'
    ],
    galleryImages: [
      {
        id: 'photo-story-1-sub1',
        url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
        altText: 'First golden light cutting across glacial jagged rim',
        caption: 'The edge of the ice cap at first dawn',
        width: 1600,
        height: 1000,
        sortOrder: 1
      },
      {
        id: 'photo-story-1-sub2',
        url: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1600&q=80',
        altText: 'Sea foam meeting black basalt volcanic sands',
        caption: 'Wave patterns along the southern black coastline',
        width: 1600,
        height: 1000,
        sortOrder: 2
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'story-2',
    title: 'Between Breath and Shutter: Why I Still Work With Manual Glass',
    slug: 'between-breath-and-shutter',
    category: 'Craft & Process',
    publishedAt: '2025-05-18T00:00:00Z',
    readTime: '5 min read',
    excerpt: 'In an era of hyper-intelligent autofocus and computational rendering, the friction of manual focusing is not nostalgia—it is a spiritual discipline.',
    coverImage: {
      id: 'photo-story-2-cover',
      url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1800&q=85',
      altText: 'Close up of a classic mechanical camera lens and textured controls',
      caption: 'The tactile precision of calibrated brass and glass',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    quote: {
      text: "Speed makes images disposable. Resistance and deliberate hesitation make them memorable.",
      author: "Frans Delian"
    },
    tags: ['Craft', 'Optics', 'Mindfulness', 'Cameras'],
    body: [
      'Modern cameras are engineering marvels. They can track an eye darting across a crowded terminal, calculate scene exposure in milliseconds, and fire thirty uncompressed RAW frames in a single heartbeat.',
      'Yet with each technological efficiency gained, a subtle sensory contract between photographer and subject is broken. When the machine does the seeing, the human becomes a mere trigger operator.',
      'Turning a manual focus ring forces your physical body to lean into the composition. You see the world dissolve from creamy abstraction into sharp, crisp reality through the optical viewfinder. In that microsecond where the eyelash snap into focus, you have to hold your breath, steady your elbows, and commit.',
      'There is no "I will fix the framing in post" or "I will pick the best out of forty bursts." There is only that single decisive moment, and the willingness to accept imperfection if the emotional truth was caught.'
    ],
    galleryImages: [
      {
        id: 'photo-story-2-sub1',
        url: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&w=1600&q=80',
        altText: 'Vintage mechanical camera resting on studio wooden table',
        caption: 'Tools honed by time and human hands',
        width: 1600,
        height: 1000,
        sortOrder: 1
      }
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'story-3',
    title: 'The Poetics of Fleeting Light in the Moroccan Souks',
    slug: 'poetics-of-fleeting-light',
    category: 'Travel Journal',
    publishedAt: '2024-12-10T00:00:00Z',
    readTime: '7 min read',
    excerpt: 'Navigating the cedar-canopied corridors of Fez, where midday sunlight falls like golden daggers across ancient spice sacks and brass lamps.',
    coverImage: {
      id: 'photo-story-3-cover',
      url: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1800&q=85',
      altText: 'High contrast light cutting through roof reeds in Fez souks',
      caption: 'Sunlight carving geometries in the spice market',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    quote: {
      text: "Shadow is not the absence of light; it is the velvet cushion upon which light reveals its brilliance.",
      author: "Frans Delian"
    },
    tags: ['Morocco', 'Street', 'Documentary', 'Light'],
    body: [
      'To enter the Medina of Fez is to step outside chronological time. Nine thousand narrow alleys, untouched by motorized vehicles, reverberate with the rhythmic hammer of coppersmiths, the scent of crushed cumin, and the damp smell of sheep wool.',
      'For a photographer obsessed with high contrast and geometric chiaroscuro, the souks are both a sanctuary and an ordeal. The overhead reed awnings, woven from dried eucalyptus and cane, create natural slats. For twenty minutes between 11:40 AM and 12:00 PM, direct sunlight enters these slits at an angle of forty-five degrees.',
      'In those twenty minutes, mundane reality turns transcendent. Dust kicked up by donkeys transforms into airborne gold leaf. An elderly weaver stepping across the threshold is momentarily crowned in incandescent white light while his workshop behind him remains steeped in indigo darkness.',
      'I waited beside the archway for four days until an apprentice carrying a brass tea tray crossed that exact shaft of light. The resulting negative holds not just a figure, but the thousand-year breath of North African trade.'
    ],
    status: 'PUBLISHED'
  },
  {
    id: 'story-4',
    title: 'The Ethics of the Unstaged: On Photographing Strangers',
    slug: 'ethics-of-the-unstaged',
    category: 'Essay',
    publishedAt: '2024-07-25T00:00:00Z',
    readTime: '6 min read',
    excerpt: 'Street photography is often described as capturing stolen moments. But true documentary portraiture is not theft—it is an act of deep reverence.',
    coverImage: {
      id: 'photo-story-4-cover',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1800&q=85',
      altText: 'Candid expressive portrait of an elder craftsman in thoughtful repose',
      caption: 'Master Kenji in his Kyoto atelier',
      width: 1800,
      height: 1200,
      sortOrder: 1
    },
    quote: {
      text: "When you raise a lens toward a human being, you are not taking a picture—you are asking for a fragment of their soul to be remembered.",
      author: "Frans Delian"
    },
    tags: ['Ethics', 'Portraits', 'Humanism', 'Street'],
    body: [
      'There is a cynical school of street photography that treats passersby as props for clever visual puns or grotesque caricatures. You see them leaping in front of strangers with wide-angle flashes, startling their subjects for the sake of shock value.',
      'I rejected this approach early in my career. A photograph made through disrespect will always carry the sour aftertaste of its creation, no matter how geometrically neat the frame might be.',
      'When working on "The Solitary Gaze" in Kyoto and Berlin, my first step was never touching the camera bag. I spent hours simply conversing, drinking bitter green tea, listening to stories of craft, grief, and quiet ambition. By the time I picked up the camera, the invisible defensive armor people wear in public had dissolved.',
      'True intimacy cannot be stolen. It can only be offered.'
    ],
    status: 'PUBLISHED'
  }
];

