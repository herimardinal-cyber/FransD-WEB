'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { profile as staticProfile } from '@/data';
import { PhotographerProfile } from '@/types';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Award, MapPin } from 'lucide-react';

interface AboutPageClientProps {
  initialProfile?: PhotographerProfile;
}

export default function AboutPageClient({ initialProfile }: AboutPageClientProps) {
  const { t, language } = useLanguage();
  const profile = initialProfile || staticProfile;

  const idBio = [
    'Frans Delian adalah fotografer seni murni dan dokumenter internasional yang berbasis di Zurich, Swiss. Karyanya telah dipamerkan di berbagai galeri terkemuka dan institusi seni di Eropa, Asia, dan Amerika Utara.',
    'Selama lebih dari lima belas tahun, Delian mendedikasikan hidupnya untuk mendokumentasikan sudut-sudut bumi yang paling sunyi — dataran tinggi Islandia yang dingin, labirin medina kuno di Afrika Utara, hingga kesunyian manusia di tengah gemerlap megapolitan Tokyo.',
    'Menggunakan format medium mekanis dan sistem rangefinder klasik, ia menolak kecepatan fotografi digital modern demi ketelitian dan apresiasi mendalam terhadap cahaya alami dan geometri chiaroscuro.',
  ];

  const idPhilosophy = [
    'Cahaya bukanlah sekadar alat penerang; ia adalah entitas hidup yang bernafas dan mengubah wujud ruang.',
    'Komposisi yang jujur tidak lahir dari manipulasi, melainkan dari kesabaran menanti momen ketika realitas menyingkapkan dirinya sendiri tanpa rasa cemas.',
    'Setiap cetakan seni murni dibuat secara manual menggunakan metode platinum-palladium untuk memastikan ketahanan arsip melampaui ratusan tahun.',
  ];

  const rawBio = profile.biography;
  const rawPhil = profile.philosophy;

  const bioParas = language === 'id'
    ? idBio
    : (Array.isArray(rawBio) ? rawBio : [typeof rawBio === 'string' ? rawBio : '']);

  const philosophyParas = language === 'id'
    ? idPhilosophy
    : (Array.isArray(rawPhil) ? rawPhil : [typeof rawPhil === 'string' ? rawPhil : '']);

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#080808] min-h-screen text-[#F2EFE9] selection:bg-[#C6AA7B] selection:text-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* ========================================================= */}
        {/* 1. HERO PROFILE SECTION */}
        {/* ========================================================= */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-24 border-b border-[#1d1d1d]">
          {/* Portrait Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden bg-[#171717] border border-[#262626] shadow-2xl">
              <Image
                src={profile.portraitImage?.url || staticProfile.portraitImage.url}
                alt={profile.portraitImage?.altText || profile.displayName}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="mt-6 p-6 bg-[#121212] border border-[#262626] text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-[#717171]">{language === 'id' ? 'Basis Studio:' : 'Current Base:'}</span>
                <span className="text-[#F2EFE9]">{profile.location || t.about.currentBase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717171]">{language === 'id' ? 'Medium Utama:' : 'Primary Medium:'}</span>
                <span className="text-[#F2EFE9]">{t.about.primaryMedium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717171]">{language === 'id' ? 'Cetakan Arsip:' : 'Print Archival:'}</span>
                <span className="text-[#C6AA7B]">{t.about.printArchival}</span>
              </div>
            </div>
          </div>

          {/* Biography Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-2">
                {t.about.badge}
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-[#F2EFE9] tracking-wide mb-2">
                {profile.displayName}
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl text-[#C6AA7B]">
                &ldquo;{profile.tagline || t.about.tagline}&rdquo;
              </p>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[#A7A7A7] leading-[1.8] font-sans">
              {bioParas.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_20px_rgba(198,170,123,0.2)]"
              >
                {t.about.inquireCommissions}
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-3.5 border border-[#262626] hover:border-[#C6AA7B] text-[#F2EFE9] uppercase tracking-[0.2em] transition-all"
              >
                {t.about.viewWorks}
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. ARTISTIC PHILOSOPHY */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-[#1d1d1d]">
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-2">
              {t.about.philosophyBadge}
            </span>
            <blockquote className="font-serif italic text-2xl sm:text-3xl text-[#F2EFE9] leading-snug">
              &ldquo;{t.about.philosophyQuote}&rdquo;
            </blockquote>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {philosophyParas.map((phil, idx) => (
              <div
                key={idx}
                className="p-8 bg-[#121212] border border-[#262626] hover:border-[#C6AA7B]/40 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <span className="text-xs font-mono text-[#C6AA7B]">0{idx + 1}</span>
                  <p className="text-sm text-[#A7A7A7] leading-relaxed font-sans">{phil}</p>
                </div>
                <div className="w-8 h-[1px] bg-[#C6AA7B]/40 mt-8" />
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. HONORS, AWARDS & SELECTED EXHIBITIONS */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-[#1d1d1d]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Honors & Awards */}
            <div>
              <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[#262626]">
                <Award className="w-5 h-5 text-[#C6AA7B]" />
                <h3 className="font-serif text-3xl text-[#F2EFE9]">{t.about.honorsTitle}</h3>
              </div>
              <div className="space-y-6">
                {(profile.awards || staticProfile.awards).map((award, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4 pb-4 border-b border-[#1d1d1d]">
                    <div>
                      <h4 className="text-sm sm:text-base font-serif text-[#F2EFE9]">{award.title}</h4>
                      <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">{award.organization}</p>
                    </div>
                    <span className="text-xs font-mono text-[#C6AA7B] tracking-wider shrink-0">
                      {award.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Exhibitions */}
            <div>
              <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[#262626]">
                <MapPin className="w-5 h-5 text-[#C6AA7B]" />
                <h3 className="font-serif text-3xl text-[#F2EFE9]">
                  {language === 'id' ? 'Pameran Pilihan' : 'Selected Exhibitions'}
                </h3>
              </div>
              <div className="space-y-6">
                {(profile.exhibitions || staticProfile.exhibitions).map((ex, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-4 pb-4 border-b border-[#1d1d1d]">
                    <div>
                      <h4 className="text-sm sm:text-base font-serif text-[#F2EFE9]">{ex.title}</h4>
                      <p className="text-xs text-[#A7A7A7] font-mono mt-0.5">{ex.location}</p>
                    </div>
                    <span className="text-xs font-mono text-[#C6AA7B] tracking-wider shrink-0">
                      {ex.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 4. OPTICS & GEAR DISCIPLINE */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-[#1d1d1d]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-2">
              {t.about.apparatusBadge}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] mb-4">
              {t.about.apparatusTitle}
            </h3>
            <p className="text-sm text-[#A7A7A7] leading-relaxed">
              {t.about.apparatusDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(profile.gear || staticProfile.gear).map((g, idx) => (
              <div key={idx} className="bg-[#121212] border border-[#262626] p-6 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#C6AA7B] block pb-2 border-b border-[#262626]">
                  {g.category}
                </span>
                <ul className="space-y-2.5 text-xs font-mono text-[#A7A7A7]">
                  {g.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#C6AA7B]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* 5. CONTACT INVITATION */}
        {/* ========================================================= */}
        <section className="pt-24 text-center max-w-2xl mx-auto space-y-6">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B]">
            {t.home.ctaBadge}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F2EFE9]">
            {t.home.ctaTitle}
          </h2>
          <p className="text-sm text-[#A7A7A7] leading-relaxed">
            {t.home.ctaDesc}
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_20px_rgba(198,170,123,0.2)]"
            >
              <span>{t.home.initiateConversation}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
