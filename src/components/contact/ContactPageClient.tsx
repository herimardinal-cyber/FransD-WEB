'use client';

import React from 'react';
import { profile } from '@/data';
import ContactForm from '@/components/contact/ContactForm';
import { useLanguage } from '@/context/LanguageContext';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';

export default function ContactPageClient() {
  const { t, language } = useLanguage();

  return (
    <div className="pt-32 pb-24 sm:pb-32 bg-[#080808] min-h-screen text-[#F2EFE9] selection:bg-[#C6AA7B] selection:text-[#080808]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[#C6AA7B] block mb-3">
            {t.contact.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl tracking-wide text-[#F2EFE9] mb-6">
            {t.contact.title}
          </h1>
          <p className="text-sm sm:text-base text-[#A7A7A7] leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        {/* ========================================================= */}
        {/* MAIN CONTACT LAYOUT */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-24 border-b border-[#1d1d1d]">
          {/* Form Column */}
          <div className="lg:col-span-7 bg-[#0c0c0c] border border-[#262626] p-6 sm:p-10 lg:p-12 shadow-xl">
            <div className="mb-8 pb-4 border-b border-[#262626]">
              <h2 className="font-serif text-2xl text-[#F2EFE9] mb-1">{t.contact.formTitle}</h2>
              <p className="text-xs text-[#A7A7A7]">
                {t.contact.formDesc}
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Studio Details Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Channels */}
            <div className="bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block pb-2 border-b border-[#262626]">
                {t.contact.directChannels}
              </span>

              <div className="space-y-6 text-xs font-mono">
                <div className="flex items-start gap-4">
                  <Mail className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-1">{t.contact.electronicMail}</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm text-[#F2EFE9] hover:text-[#C6AA7B] transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-1">{t.contact.telephone}</span>
                    <a
                      href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                      className="text-sm text-[#F2EFE9] hover:text-[#C6AA7B] transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-1">{t.contact.atelierLocation}</span>
                    <span className="text-sm text-[#F2EFE9] block">Limmatquai 44</span>
                    <span className="text-[#A7A7A7]">8001 Zurich, Switzerland</span>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-4 h-4 text-[#C6AA7B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#717171] uppercase tracking-wider block mb-1">{t.contact.operatingHours}</span>
                    <span className="text-sm text-[#F2EFE9] block">
                      {language === 'id' ? 'Sen — Jum: 09:00 - 18:00 CET' : 'Mon — Fri: 09:00 - 18:00 CET'}
                    </span>
                    <span className="text-[#A7A7A7]">{t.contact.operatingDesc}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="bg-[#121212] border border-[#262626] p-6 sm:p-8 space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block pb-2 border-b border-[#262626]">
                {language === 'id' ? 'Arsip & Jejaring Digital' : 'Digital Archives'}
              </span>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                {profile.socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-[#171717] hover:bg-[#262626] border border-[#262626] text-[#A7A7A7] hover:text-[#F2EFE9] transition-all flex items-center justify-between"
                  >
                    <span>{s.platform}</span>
                    <ArrowUpRight className="w-3 h-3 text-[#C6AA7B]" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FREQUENT INQUIRY QUESTIONS */}
        <section className="pt-24">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6AA7B] block mb-2">
              {language === 'id' ? 'Protokol & Informasi' : 'Protocol & Terms'}
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#F2EFE9]">
              {language === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Addressed Inquiries'}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
            <div className="bg-[#121212] border border-[#262626] p-6 space-y-2">
              <h4 className="font-serif text-lg text-[#F2EFE9]">
                {language === 'id' ? 'Berapa estimasi waktu perencanaan untuk penugasan?' : 'What is the typical lead time for commissions?'}
              </h4>
              <p className="text-xs text-[#A7A7A7] leading-relaxed">
                {language === 'id'
                  ? 'Proyek editorial dan dokumenter umumnya memerlukan pemberitahuan dua hingga empat minggu sebelumnya untuk koordinasi logistik dan perizinan. Jadwal khusus dipertimbangkan secara individual.'
                  : 'Editorial and documentary projects typically require two to four weeks advance notice for logistics and permit arrangements. Expedited scheduling is assessed per case.'}
              </p>
            </div>

            <div className="bg-[#121212] border border-[#262626] p-6 space-y-2">
              <h4 className="font-serif text-lg text-[#F2EFE9]">
                {language === 'id' ? 'Bagaimana keaslian cetakan edisi terbatas dijamin?' : 'How are limited edition prints authenticated?'}
              </h4>
              <p className="text-xs text-[#A7A7A7] leading-relaxed">
                {language === 'id'
                  ? 'Seluruh cetakan seni murni diperiksa langsung secara manual, ditandatangani, diberi nomor edisi, dan disertai sertifikat keaslian arsip dengan segel holografik resmi terdaftar.'
                  : 'All fine art prints are hand-inspected, signed, numbered, and accompanied by an archival certificate of authenticity with a registered holographic seal.'}
              </p>
            </div>

            <div className="bg-[#121212] border border-[#262626] p-6 space-y-2">
              <h4 className="font-serif text-lg text-[#F2EFE9]">
                {language === 'id' ? 'Apakah bersedia melakukan perjalanan internasional?' : 'Do you travel internationally for assignments?'}
              </h4>
              <p className="text-xs text-[#A7A7A7] leading-relaxed">
                {language === 'id'
                  ? 'Tentu. Frans Delian secara rutin menerima penugasan visual ke berbagai pelosok dunia, selama persyaratan logistik dan kriteria ekspedisi terpenuhi.'
                  : 'Yes. Frans Delian regularly undertakes global assignments across remote locations, provided appropriate expedition and insurance criteria are met.'}
              </p>
            </div>

            <div className="bg-[#121212] border border-[#262626] p-6 space-y-2">
              <h4 className="font-serif text-lg text-[#F2EFE9]">
                {language === 'id' ? 'Apa saja opsi lisensi karya untuk penerbitan?' : 'What licensing options are available for publications?'}
              </h4>
              <p className="text-xs text-[#A7A7A7] leading-relaxed">
                {language === 'id'
                  ? 'Hak editorial eksklusif maupun non-eksklusif dinegosiasikan berdasarkan skala sirkulasi, cakupan wilayah, dan periode penggunaan. Hubungi studio kami untuk rincian skema lisensi.'
                  : 'Both exclusive and non-exclusive editorial rights are negotiated according to circulation size, territory, and duration. Contact the studio for our licensing schedule.'}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
