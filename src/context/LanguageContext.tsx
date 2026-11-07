'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'id';

export interface Translations {
  nav: {
    home: string;
    gallery: string;
    stories: string;
    events: string;
    about: string;
    contact: string;
    tagline: string;
  };
  hero: {
    badge: string;
    tagline: string;
    description: string;
    exploreWork: string;
    artistProfile: string;
    scrollDiscover: string;
  };
  home: {
    portfolio: string;
    selectedWorks: string;
    viewAllCollections: string;
    viewProject: string;
    artistAndPhilosophy: string;
    artistQuote: string;
    artistBioSnippet: string;
    readFullBio: string;
    explorePhilosophy: string;
    yearsInField: string;
    globalExhibitions: string;
    fieldNotes: string;
    curatedEssays: string;
    readAllEssays: string;
    readStory: string;
    publicAppearances: string;
    exhibitionsWorkshops: string;
    viewAllEvents: string;
    moreEvents: string;
    eventDetails: string;
    archiveDetails: string;
    concluded: string;
    upcoming: string;
    ongoing: string;
    ctaBadge: string;
    ctaTitle: string;
    ctaDesc: string;
    initiateConversation: string;
  };
  gallery: {
    archive: string;
    title: string;
    description: string;
    filterAll: string;
    photosCount: string;
    exploreSeries: string;
    camera: string;
    lens: string;
    medium: string;
    location: string;
    year: string;
    noProjectsTitle: string;
    noProjectsDesc: string;
    relatedSeries: string;
    backToGallery: string;
  };
  stories: {
    journal: string;
    title: string;
    description: string;
    readEssay: string;
    readTime: string;
    fieldNotes: string;
    relatedEssays: string;
    backToStories: string;
  };
  events: {
    schedule: string;
    title: string;
    description: string;
    upcomingSection: string;
    pastSection: string;
    viewDetails: string;
    archiveDoc: string;
    rsvpRequired: string;
    curator: string;
    programSchedule: string;
    backToEvents: string;
  };
  about: {
    badge: string;
    title: string;
    tagline: string;
    currentBase: string;
    primaryMedium: string;
    printArchival: string;
    inquireCommissions: string;
    viewWorks: string;
    philosophyBadge: string;
    philosophyQuote: string;
    apparatusBadge: string;
    apparatusTitle: string;
    apparatusDesc: string;
    honorsBadge: string;
    honorsTitle: string;
    honorsDesc: string;
  };
  contact: {
    badge: string;
    title: string;
    description: string;
    formTitle: string;
    formDesc: string;
    fullName: string;
    fullNamePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    inquiryType: string;
    subject: string;
    subjectPlaceholder: string;
    message: string;
    messagePlaceholder: string;
    types: {
      editorial: string;
      print: string;
      exhibition: string;
      commercial: string;
      other: string;
    };
    send: string;
    sending: string;
    successTitle: string;
    successDesc: string;
    ticketLabel: string;
    sendAnother: string;
    directChannels: string;
    electronicMail: string;
    telephone: string;
    atelierLocation: string;
    operatingHours: string;
    operatingDesc: string;
    representationTitle: string;
    representationDesc: string;
  };
  footer: {
    tagline: string;
    desc: string;
    explore: string;
    galleryArchive: string;
    visualStories: string;
    exhibitions: string;
    aboutPhilosophy: string;
    inquiries: string;
    representation: string;
    socialNetworks: string;
    allRightsReserved: string;
    edition: string;
    language: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      gallery: 'Gallery',
      stories: 'Stories',
      events: 'Events',
      about: 'About',
      contact: 'Contact',
      tagline: 'Stories Beyond The Frame',
    },
    hero: {
      badge: 'Fine Art & Documentary Photography',
      tagline: 'Stories Beyond The Frame',
      description:
        'Capturing the silence of ancient topographies, the fleeting poetry of natural light, and the enduring dignity of the human narrative.',
      exploreWork: 'Explore My Work',
      artistProfile: 'Artist Profile',
      scrollDiscover: 'Scroll to Discover',
    },
    home: {
      portfolio: 'Portfolio',
      selectedWorks: 'Selected Works',
      viewAllCollections: 'View All Collections',
      viewProject: 'View Project',
      artistAndPhilosophy: 'The Artist & Philosophy',
      artistQuote: '“Photography is an exercise in prolonged listening to what light leaves unsaid.”',
      artistBioSnippet:
        'Frans Delian is an international documentary and fine art photographer. Traveling to remote archipelagos, desert labyrinths, and megalopolis frontiers, his work turns toward moments of unguarding: when human emotion and natural atmosphere converge without rehearsal.',
      readFullBio: 'Read Full Biography',
      explorePhilosophy: 'Explore Darkroom Philosophy',
      yearsInField: 'Years in Field',
      globalExhibitions: 'Global Exhibitions',
      fieldNotes: 'Field Notes',
      curatedEssays: 'Curated Essays & Philosophy',
      readAllEssays: 'Read All Essays',
      readStory: 'Read Story',
      publicAppearances: 'Public Appearances',
      exhibitionsWorkshops: 'Exhibitions & Workshops',
      viewAllEvents: 'View All Events',
      moreEvents: 'More Events...',
      eventDetails: 'Event Details & RSVP',
      archiveDetails: 'View Archive & Details',
      concluded: 'Past',
      upcoming: 'Upcoming',
      ongoing: 'Ongoing',
      ctaBadge: 'Commissions & Print Acquisitions',
      ctaTitle: 'Have a vision that demands timeless visual craft?',
      ctaDesc:
        'Available for selective editorial assignments, museum exhibitions, brand campaigns, and private darkroom print acquisitions worldwide.',
      initiateConversation: 'Initiate a Conversation',
    },
    gallery: {
      archive: 'Photographic Archive',
      title: 'Visual Collections',
      description:
        'Each photographic body of work represents months of solitary immersion in light, geology, and human cadence. Select a category below to explore specific themes.',
      filterAll: 'All Works',
      photosCount: 'Photographs',
      exploreSeries: 'Explore Series',
      camera: 'Camera',
      lens: 'Lens',
      medium: 'Medium',
      location: 'Location',
      year: 'Year',
      noProjectsTitle: 'No projects found',
      noProjectsDesc: 'There are no archived projects in this category at the moment.',
      relatedSeries: 'Related Monographic Series',
      backToGallery: 'Back to Gallery Archive',
    },
    stories: {
      journal: 'The Journal',
      title: 'Stories & Essays',
      description:
        'The philosophical meditations, field notes, and encounters that take place beyond the boundary of the optical frame.',
      readEssay: 'Read Full Essay',
      readTime: 'min read',
      fieldNotes: 'Field Notes & Monologues',
      relatedEssays: 'Related Essays',
      backToStories: 'Back to Stories',
    },
    events: {
      schedule: 'Public Schedule',
      title: 'Exhibitions & Talks',
      description:
        'Solo gallery vernissages, museum installations, and private field masterclasses. Join Frans Delian in person across Europe and Asia.',
      upcomingSection: 'Upcoming & Ongoing',
      pastSection: 'Past Retrospectives & Talks',
      viewDetails: 'View Details',
      archiveDoc: 'Archive Documentation',
      rsvpRequired: 'RSVP Required',
      curator: 'Curator',
      programSchedule: 'Program Schedule',
      backToEvents: 'Back to Schedule',
    },
    about: {
      badge: 'Curriculum & Profile',
      title: 'Frans Delian',
      tagline: 'Stories Beyond The Frame',
      currentBase: 'Zurich, Switzerland',
      primaryMedium: 'Medium Format & Rangefinder',
      printArchival: 'Platinum-Palladium',
      inquireCommissions: 'Inquire for Commissions',
      viewWorks: 'View Works',
      philosophyBadge: 'The Core Philosophy',
      philosophyQuote:
        '“Shadow is not the absence of light; it is the velvet cushion upon which light reveals its sacred permanence.”',
      apparatusBadge: 'Optical Discipline',
      apparatusTitle: 'Technical Apparatus',
      apparatusDesc:
        'Crafted through pure mechanical precision and archival analog & digital mediums without digital manipulation.',
      honorsBadge: 'Recognition',
      honorsTitle: 'Selected Honors & Exhibitions',
      honorsDesc: 'A record of institutional solo retrospectives and global photography honors.',
    },
    contact: {
      badge: 'Inquiries & Commissions',
      title: 'Commence a Dialogue',
      description:
        'Whether inquiring about editorial assignments, exhibition prints, or international collaborations, please provide project scope and details below.',
      formTitle: 'Send a Message',
      formDesc: 'Fill out the required information. All fields marked with (*) are mandatory.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'e.g. Helena Vance',
      email: 'Email Address',
      emailPlaceholder: 'e.g. helena@atelier-gallery.ch',
      inquiryType: 'Type of Inquiry',
      subject: 'Subject',
      subjectPlaceholder: 'e.g. Fine Art Print Acquisition — The Solitary Gaze',
      message: 'Message',
      messagePlaceholder: 'Please outline your project timeline, requirements, and scope...',
      types: {
        editorial: 'Editorial & Assignment',
        print: 'Print Acquisition',
        exhibition: 'Exhibition & Curation',
        commercial: 'Commercial & Brand',
        other: 'General Inquiry',
      },
      send: 'Transmit Message',
      sending: 'Transmitting...',
      successTitle: 'Message Transmitted Successfully',
      successDesc:
        'Thank you for reaching out. The atelier has received your inquiry and will review your message within 24 to 48 hours.',
      ticketLabel: 'Inquiry Reference Code:',
      sendAnother: 'Send Another Inquiry',
      directChannels: 'Direct Atelier Channels',
      electronicMail: 'Electronic Mail',
      telephone: 'Telephone / Signal',
      atelierLocation: 'Atelier Location',
      operatingHours: 'Response Time',
      operatingDesc:
        'Inquiries are reviewed directly by Frans Delian Studio. Please allow up to 48 hours for curatorial responses.',
      representationTitle: 'Gallery Representation',
      representationDesc:
        'Represented by Galerie Chiaroscuro (Zurich) & Pavilion Tokyo for fine art prints and gallery exhibitions.',
    },
    footer: {
      tagline: 'Stories Beyond The Frame',
      desc: 'Fine art & documentary photography dedicated to the architecture of silence, fleeting light, and human narratives across the globe.',
      explore: 'Explore',
      galleryArchive: 'Gallery Archive',
      visualStories: 'Visual Stories & Essays',
      exhibitions: 'Exhibitions & Workshops',
      aboutPhilosophy: 'About & Philosophy',
      inquiries: 'Inquiries & Commissions',
      representation: 'Representation & Contact',
      socialNetworks: 'Social Networks',
      allRightsReserved: 'All rights reserved.',
      edition: 'Curated Dark Editorial Edition',
      language: 'Language',
    },
  },
  id: {
    nav: {
      home: 'Home',
      gallery: 'Gallery',
      stories: 'Stories',
      events: 'Events',
      about: 'About',
      contact: 'Contact',
      tagline: 'Stories Beyond The Frame',
    },
    hero: {
      badge: 'Fotografi & Dokumenter',
      tagline: 'Stories Beyond The Frame',
      description: 'Menangkap keheningan lanskap, puitika cahaya alami yang sekilas, dan martabat abadi narasi manusia.',
      exploreWork: 'Jelajahi Karya',
      artistProfile: 'Profil Fotografer',
      scrollDiscover: 'Scroll untuk Menjelajahi',
    },
    home: {
      portfolio: 'Portofolio',
      selectedWorks: 'Selected Works',
      viewAllCollections: 'Lihat Semua Koleksi',
      viewProject: 'Lihat Proyek',
      artistAndPhilosophy: 'Fotografer & Filosofi',
      artistQuote: '“Fotografi adalah latihan mendengarkan secara mendalam apa yang tersirat di balik cahaya.”',
      artistBioSnippet:
        'Frans Delian adalah fotografer seni murni dan dokumenter internasional. Menjelajahi kepulauan terpencil, labirin gurun, hingga perbatasan megapolitan, karyanya mengabadikan momen kejujuran: saat emosi manusia dan suasana alam menyatu tanpa rekayasa.',
      readFullBio: 'Baca Biografi Lengkap',
      explorePhilosophy: 'Filosofi Ruang Gelap',
      yearsInField: 'Tahun Berkarya',
      globalExhibitions: 'Pameran Global',
      fieldNotes: 'Catatan Lapangan',
      curatedEssays: 'Esai Kuratorial & Filosofi',
      readAllEssays: 'Baca Semua Esai',
      readStory: 'Baca Cerita',
      publicAppearances: 'Agenda Publik',
      exhibitionsWorkshops: 'Pameran & Lokakarya',
      viewAllEvents: 'Lihat Semua Event',
      moreEvents: 'Event Lainnya...',
      eventDetails: 'Detail Event & Reservasi',
      archiveDetails: 'Lihat Arsip & Detail',
      concluded: 'Selesai',
      upcoming: 'Mendatang',
      ongoing: 'Berlangsung',
      ctaBadge: 'Komisi Karya & Akuisisi Cetakan',
      ctaTitle: 'Memiliki visi yang menuntut ketelitian visual abadi?',
      ctaDesc:
        'Terbuka untuk penugasan editorial terpilih, pameran museum, kampanye visual, dan akuisisi cetakan seni ruang gelap di seluruh dunia.',
      initiateConversation: 'Mulai Percakapan',
    },
    gallery: {
      archive: 'Arsip Fotografi',
      title: 'Koleksi Visual',
      description:
        'Setiap rangkaian karya foto merupakan buah perenungan dalam sunyi, meresapi cahaya, kontur bumi, dan ritme kehidupan manusia.',
      filterAll: 'Semua Karya',
      photosCount: 'Foto',
      exploreSeries: 'Jelajahi Seri',
      camera: 'Kamera',
      lens: 'Lensa',
      medium: 'Medium',
      location: 'Lokasi',
      year: 'Tahun',
      noProjectsTitle: 'Proyek tidak ditemukan',
      noProjectsDesc: 'Belum ada arsip proyek pada kategori ini saat ini.',
      relatedSeries: 'Serial Monograf Terkait',
      backToGallery: 'Kembali ke Arsip Galeri',
    },
    stories: {
      journal: 'Jurnal Visual',
      title: 'Cerita & Esai',
      description:
        'Meditasi filosofis, catatan lapangan, dan perjumpaan yang hidup melampaui batas bingkai optik kamera.',
      readEssay: 'Baca Esai Lengkap',
      readTime: 'menit membaca',
      fieldNotes: 'Catatan Lapangan & Monolog',
      relatedEssays: 'Esai Terkait',
      backToStories: 'Kembali ke Cerita',
    },
    events: {
      schedule: 'Agenda Publik',
      title: 'Pameran & Diskusi',
      description:
        'Pembukaan galeri solo, instalasi museum, dan masterclass privat di alam bebas bersama Frans Delian di berbagai kota dunia.',
      upcomingSection: 'Mendatang & Berlangsung',
      pastSection: 'Arsip Pameran & Diskusi Lampau',
      viewDetails: 'Lihat Detail',
      archiveDoc: 'Dokumentasi Arsip',
      rsvpRequired: 'Reservasi Diperlukan',
      curator: 'Kurator',
      programSchedule: 'Jadwal Acara',
      backToEvents: 'Kembali ke Agenda',
    },
    about: {
      badge: 'Kurikulum & Profil',
      title: 'Frans Delian',
      tagline: 'Cerita Melampaui Bingkai',
      currentBase: 'Aceh, Indonesia',
      primaryMedium: 'Medium Format & Rangefinder',
      printArchival: 'Platinum-Palladium',
      inquireCommissions: 'Konsultasi Penugasan',
      viewWorks: 'Lihat Karya',
      philosophyBadge: 'Filosofi Utama',
      philosophyQuote:
        '“Bayangan bukanlah ketiadaan cahaya; melainkan bantalan beludru tempat cahaya menyingkapkan keabadiannya yang sakral.”',
      apparatusBadge: 'Disiplin Optik',
      apparatusTitle: 'Perangkat Teknis',
      apparatusDesc:
        'Diciptakan melalui ketepatan mekanik murni serta medium analog & digital arsip tanpa manipulasi sintetis.',
      honorsBadge: 'Apresiasi',
      honorsTitle: 'Penghargaan & Pameran Terpilih',
      honorsDesc: 'Rekam jejak pameran tunggal institusional dan penghargaan fotografi prestisius dunia.',
    },
    contact: {
      badge: 'Kontak & Konsultasi',
      title: 'Kirimkan Pesan',
      description:
        'Untuk akuisisi cetakan seni edisi terbatas, hak terbit monograf, proposal kurasi pameran, atau penugasan editorial internasional.',
      formTitle: 'Kirim Pesan ke Studio',
      formDesc: 'Silakan isi formulir di bawah ini. Semua bidang bertanda (*) wajib diisi.',
      fullName: 'Nama Lengkap',
      fullNamePlaceholder: 'cth. Arya Wijaya',
      email: 'Alamat Email',
      emailPlaceholder: 'cth. arya@galeri-koleksi.com',
      inquiryType: 'Jenis Keperluan',
      subject: 'Subjek Pesan',
      subjectPlaceholder: 'cth. Akuisisi Cetakan Fine Art — The Solitary Gaze',
      message: 'Isi Pesan',
      messagePlaceholder: 'Jelaskan rencana proyek, kebutuhan karya, atau rincian pertanyaan Anda...',
      types: {
        editorial: 'Editorial & Liputan',
        print: 'Akuisisi Cetakan Fine Art',
        exhibition: 'Pameran & Kuratorial',
        commercial: 'Komersial & Brand',
        other: 'Pertanyaan Umum',
      },
      send: 'Kirimkan Pesan',
      sending: 'Mengirimkan...',
      successTitle: 'Pesan Berhasil Terkirim',
      successDesc:
        'Terima kasih telah menghubungi kami. Studio Frans Delian telah menerima pesan Anda dan akan meninjau dalam kurun waktu 24 hingga 48 jam.',
      ticketLabel: 'Kode Referensi Pesan:',
      sendAnother: 'Kirim Pesan Lainnya',
      directChannels: 'Saluran Langsung Studio',
      electronicMail: 'Surat Elektronik (Email)',
      telephone: 'Telepon / Signal',
      atelierLocation: 'Lokasi Studio',
      operatingHours: 'Waktu Respon',
      operatingDesc:
        'Setiap pesan ditinjau langsung oleh Frans Delian Studio. Mohon beri waktu hingga 48 jam untuk tanggapan kuratorial.',
      representationTitle: 'Representasi Galeri',
      representationDesc:
        'Direpresentasikan secara internasional oleh Galerie Chiaroscuro (Zurich) & Pavilion Tokyo untuk cetakan seni murni.',
    },
    footer: {
      tagline: 'Cerita Melampaui Bingkai',
      desc: 'Fotografi seni murni & dokumenter yang didedikasikan untuk keheningan, cahaya sekilas, dan narasi manusia di seluruh dunia.',
      explore: 'Jelajahi',
      galleryArchive: 'Arsip Galeri',
      visualStories: 'Cerita Visual & Esai',
      exhibitions: 'Pameran & Lokakarya',
      aboutPhilosophy: 'Tentang & Filosofi',
      inquiries: 'Kontak & Penugasan',
      representation: 'Representasi & Kontak',
      socialNetworks: 'Jejaring Sosial',
      allRightsReserved: 'Hak cipta dilindungi undang-undang.',
      edition: 'Edisi Editorial Gelap Kuratorial',
      language: 'Pilihan Bahasa',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  formatDate: (dateString: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'frans_delian_lang';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'id')) {
        setLanguageState(savedLang);
      } else {
        // Detect browser language
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('id')) {
          setLanguageState('id');
        }
      }
    } catch {
      // Ignore localStorage access issues
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // Ignore
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
        formatDate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

