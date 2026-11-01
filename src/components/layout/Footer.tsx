import React from 'react';
import Link from 'next/link';
import { profile, siteSettings } from '@/data';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
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
              {siteSettings.tagline}
            </p>
            <p className="text-[#A7A7A7] text-sm leading-relaxed max-w-sm pt-2">
              Fine art & documentary photography dedicated to the architecture of silence, fleeting light, and human narratives across the globe.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 flex flex-col space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6AA7B] font-mono">
              Explore
            </span>
            <ul className="space-y-2.5 text-sm text-[#A7A7A7]">
              <li>
                <Link href="/gallery" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  Gallery Archive
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  Visual Stories & Essays
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  Exhibitions & Workshops
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F2EFE9] transition-colors inline-block py-0.5">
                  Inquiries & Commissions
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect & Social */}
          <div className="md:col-span-4 flex flex-col space-y-4">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C6AA7B] font-mono">
              Representation & Contact
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
                Social Networks
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
          <p>© {siteSettings.copyrightYear} Frans Delian. All rights reserved.</p>
          <p className="text-[11px] tracking-widest text-[#717171]">
            Curated Dark Editorial Edition — Phase 1 Frontend
          </p>
        </div>
      </div>
    </footer>
  );
}

