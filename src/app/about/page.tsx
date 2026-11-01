import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { profile } from '@/data';
import { ArrowRight, Award, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Frans Delian — Stories Beyond The Frame',
  description: 'Biography, visual philosophy, honors, and optical discipline of international fine art photographer Frans Delian.',
};

export default function AboutPage() {
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
                src={profile.portraitImage.url}
                alt={profile.portraitImage.altText}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover filter contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="mt-6 p-6 bg-[#121212] border border-[#262626] text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-[#717171]">Current Base:</span>
                <span className="text-[#F2EFE9]">Zurich, Switzerland</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717171]">Primary Medium:</span>
                <span className="text-[#F2EFE9]">Medium Format & Rangefinder</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#717171]">Print Archival:</span>
                <span className="text-[#C6AA7B]">Platinum-Palladium</span>
              </div>
            </div>
          </div>

          {/* Biography Column */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-2">
                Curriculum & Profile
              </span>
              <h1 className="font-serif text-5xl sm:text-7xl text-[#F2EFE9] tracking-wide mb-2">
                {profile.displayName}
              </h1>
              <p className="font-serif italic text-xl sm:text-2xl text-[#C6AA7B]">
                &ldquo;{profile.tagline}&rdquo;
              </p>
            </div>

            <div className="space-y-6 text-sm sm:text-base text-[#A7A7A7] leading-[1.8] font-sans">
              {profile.biography.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_20px_rgba(198,170,123,0.2)]"
              >
                Inquire for Commissions
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-3.5 bg-[#171717] hover:bg-[#262626] text-[#F2EFE9] border border-[#262626] uppercase tracking-[0.2em] transition-all"
              >
                View Works
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 2. PHILOSOPHY & FIELD REFLECTION */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-[#1d1d1d]">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B]">
              The Core Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#F2EFE9] leading-snug">
              &ldquo;Shadow is not the absence of light; it is the velvet cushion upon which light reveals its sacred permanence.&rdquo;
            </h2>
            <div className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed space-y-4 max-w-2xl mx-auto text-left">
              {profile.philosophy.map((ph, idx) => (
                <p key={idx}>{ph}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* 3. AWARDS, EXHIBITIONS & GEAR ACCORDION / GRID */}
        {/* ========================================================= */}
        <section className="py-24 border-b border-[#1d1d1d]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {/* Honors & Awards */}
            <div>
              <div className="flex items-center gap-2 mb-8 pb-3 border-b border-[#262626]">
                <Award className="w-5 h-5 text-[#C6AA7B]" />
                <h3 className="font-serif text-3xl text-[#F2EFE9]">Recognitions & Awards</h3>
              </div>
              <div className="space-y-6">
                {profile.awards.map((award, idx) => (
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
                <h3 className="font-serif text-3xl text-[#F2EFE9]">Selected Exhibitions</h3>
              </div>
              <div className="space-y-6">
                {profile.exhibitions.map((ex, idx) => (
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
              Optical Discipline
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9] mb-4">
              Tools of Restraint
            </h3>
            <p className="text-sm text-[#A7A7A7] leading-relaxed">
              Every instrument is chosen for tactile transparency. Working with manual lenses and mechanical shutters preserves direct tactile communion between eye, glass, and negative.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {profile.gear.map((g, idx) => (
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
            Commence Collaboration
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#F2EFE9]">
            Let Us Craft What Words Cannot Say
          </h2>
          <p className="text-sm text-[#A7A7A7] leading-relaxed">
            For museum bookings, private print catalog viewings, and assignment inquiries, reach out directly to the studio atelier.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#C6AA7B] hover:bg-[#D8BD8F] text-[#080808] font-mono text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-[0_0_20px_rgba(198,170,123,0.2)]"
            >
              <span>Contact Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
