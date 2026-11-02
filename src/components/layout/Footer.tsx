'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { profile, siteSettings } from '@/data';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t border-[#262626] bg-[#080808] text-[#F2EFE9] pt-20 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-[#1d1d1d]">
          {/* Brand Column */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <Link href="/" className="inline-block group">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.2em] uppercase text-[#F2EFE9] group-hover:text-[#C6AA7B] transition-colors">
                Frans Delian
              </span>
            </Link>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C6AA7B] font-mono">
              {t.footer.tagline}
            </p>
            <p className="text-[#A7A7A7] text-sm leading-relaxed max-w-sm pt-2">
              {t.footer.desc}
            </p>

            {/* Language Switcher in Brand Column */}
            <div className="pt-2">
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6AA7B] font-mono">
              {t.footer.explore}
            </span>
            <ul className="space-y-2.5 text-sm text-[#A7A7A7]">
              <li>
                <Link href="/gallery" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  {t.footer.galleryArchive}
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  {t.footer.visualStories}
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  {t.footer.exhibitions}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  {t.footer.aboutPhilosophy}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  {t.footer.inquiries}
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6AA7B] font-mono">
              {t.footer.representation}
            </span>
            <div className="text-sm text-[#A7A7A7] space-y-2">
              <p>Studio: Zurich, Switzerland</p>
              <a
                href={`mailto:${profile.email}`}
                className="text-[#F2EFE9] hover:text-[#C6AA7B] transition-colors flex items-center gap-1.5 font-mono text-xs pt-1"
              >
                <span>{profile.email}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C6AA7B]" />
              </a>
            </div>

            <div className="pt-4">
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6AA7B] font-mono block mb-3">
                {t.footer.socialNetworks}
              </span>
              <div className="flex flex-wrap gap-4 text-xs tracking-wider uppercase text-[#A7A7A7]">
                {profile.socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#F2EFE9] hover:border-[#C6AA7B] border-b border-transparent transition-all pb-0.5"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A7A7A7] space-y-4 sm:space-y-0">
          <p>© {siteSettings.copyrightYear} Frans Delian. {t.footer.allRightsReserved}</p>
          <p className="text-[11px] tracking-widest text-[#717171]">
            {t.footer.edition}
          </p>
        </div>
      </div>
    </footer>
  );
}
