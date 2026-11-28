import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ClipboardList,
  Handshake,
  Mail,
  MapPin,
  Menu,
  Mic,
  Phone,
  Wrench,
  X,
} from 'lucide-react';
import {
  ALL_SERVICES,
  COMPANY_INFO,
  PRACTICE_DISCIPLINES,
  SITE_CITY_OPTIONS,
  SPECIALIZATIONS,
} from './data/malikData';
import { IsometricHeroDiorama } from './components/IsometricHeroDiorama';
import { ServiceIsoIcon } from './components/ServiceIsoIcons';
import { UrbanSkylinePanorama } from './components/UrbanSkylineGraphics';
import { HeritageDepthDeck } from './components/HeritageDepthDeck';
import { FieldGallerySection } from './components/FieldGallerySection';
import { InteriorDesignShowcase } from './components/InteriorDesignShowcase';
import { ElevenLabsVoiceDesk } from './components/ElevenLabsVoiceDesk';

const LOGO_SRC = '/assets/aistudio/malik-and-co_c952fd35.png';
const ABOUT_US_PHOTO = '/assets/aistudio/WhatsApp_Image_2026-10-25_at_11.07.39_AM__1__70df3863.jpeg';

interface QuoteFormState {
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  city: string;
  scope: string;
  plotArea: string;
  siteDetails: string;
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [voiceDeskOpen, setVoiceDeskOpen] = useState(false);

  const [formState, setFormState] = useState<QuoteFormState>({
    fullName: '',
    organization: '',
    phone: '',
    email: '',
    city: 'Karachi',
    scope: 'Construction',
    plotArea: '',
    siteDetails: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof QuoteFormState, string>>>({});
  const [submittedDocket, setSubmittedDocket] = useState<string | null>(null);

  // Dynamically sync canonical and social card URLs to active origin
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const shareImageUrl = `${window.location.origin}/assets/aistudio/WhatsApp_Image_2026-11-19_at_6.12.31_AM_a9571b33.jpeg`;

    const canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonicalEl) canonicalEl.href = canonicalUrl;

    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonicalUrl;

    const ogImg = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImg) ogImg.content = shareImageUrl;

    const twImg = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    if (twImg) twImg.content = shareImageUrl;
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof QuoteFormState, string>> = {};

    if (formState.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = formState.phone.replace(/[\s()-]/g, '');
    if (!/^(\+?92|0)?3\d{9}$|^\+?\d{10,14}$/.test(cleanPhone)) {
      errors.phone = 'Enter a valid mobile or landline number (e.g. 0334 2199979).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = 'Enter a valid email address.';
    }
    if (formState.siteDetails.trim().length < 8) {
      errors.siteDetails = 'Briefly describe your plot area, location, or project requirements.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedDocket(`MC-PLAN-${randomCode}`);
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F8F7F4] text-[#151C17]">
      {/* ===================================================================== */}
      {/* TOP BAR CONTRACT: Strictly 3 Zones separated by gap-8                 */}
      {/* ===================================================================== */}
      <header className="sticky top-0 z-40 border-b border-[#DFE2DC] bg-[#F8F7F4]/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="text-xl font-bold tracking-tight text-[#0F4221] font-display whitespace-nowrap shrink-0"
          >
            Malik &amp; Co.
          </a>

          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#344238]"
          >
            <a
              href="#blueprint"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              3D Blueprint
            </a>
            <a
              href="#services"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Disciplines
            </a>
            <a
              href="#field-gallery"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Site Photos
            </a>
            <a
              href="#specializations"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Specializations
            </a>
            <a
              href="#heritage"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Legacy
            </a>
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="hidden sm:inline-flex items-center justify-center rounded-lg bg-[#0F4221] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0A2E17] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Request Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden inline-flex items-center justify-center rounded-lg border border-[#CFD5CC] bg-white p-2 text-[#111914] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#DFE2DC] bg-white px-4 py-4 space-y-2">
            {[
              { label: '3D Blueprint', id: 'blueprint' },
              { label: 'Disciplines', id: 'services' },
              { label: 'Site Photos', id: 'field-gallery' },
              { label: 'Specializations', id: 'specializations' },
              { label: 'Legacy & About Us', id: 'heritage' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-[#1C2720] hover:bg-[#F3F4EF] cursor-pointer"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="mt-2 w-full rounded-lg bg-[#0F4221] px-4 py-2.5 text-sm font-semibold text-white cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* =================================================================== */}
        {/* 1. HERO SECTION: Crest Emblem + Statement + 2D Isometric Stage      */}
        {/* =================================================================== */}
        <section className="arch-grid-bg border-b border-[#DFE2DC]">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              <div className="lg:col-span-5 flex flex-col justify-between gap-8">
                <div>
                  <div className="flex items-center gap-4">
                    <div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white border-2 border-[#0F4221] p-1 shrink-0 overflow-hidden flex items-center justify-center"
                      style={{ boxShadow: '3px 3px 0 #0F4221' }}
                    >
                      {!logoFailed ? (
                        <img
                          src={LOGO_SRC}
                          alt="M/S Malik & Company official circular crest logo"
                          onError={() => setLogoFailed(true)}
                          className="w-full h-full object-contain rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-[#0F4221] text-white flex flex-col items-center justify-center text-center p-1">
                          <Building2 className="w-6 h-6 text-[#F4B41A]" />
                          <span className="text-[9px] font-bold tracking-wider mt-0.5">M&amp;C</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs leading-relaxed text-[#344238]">
                      <div className="font-semibold text-[#0F4221]">M/S Malik &amp; Company</div>
                      <div className="font-medium text-[#1C2720]">
                        {COMPANY_INFO.pecRegistration}
                      </div>
                      <div className="text-[#5A675D]">{COMPANY_INFO.electricalLicense}</div>
                    </div>
                  </div>

                  <h1
                    className="mt-7 font-bold tracking-tight text-[#111914] leading-[1.06]"
                    style={{
                      fontSize: 'clamp(2.15rem, 3.8vw, 3.35rem)',
                      textWrap: 'balance',
                    }}
                  >
                    One-Window Engineering, Design &amp; Construction.
                  </h1>

                  <p className="mt-5 text-sm sm:text-base text-[#344238] leading-relaxed max-w-[56ch]">
                    Built on a five-generation family legacy dating back to the 1930s, M/S Malik
                    &amp; Company delivers integrated services across Interior Designers,
                    Construction, Engineers, Architecture, Structural, Planners Developers, MEP
                    Design, Infrastructure Consultancy, Renovation Works, and Demolish Works.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="extrude-btn inline-flex items-center gap-2.5 rounded-lg bg-[#0F4221] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0A2E17] cursor-pointer whitespace-nowrap"
                    >
                      <span>Schedule Consultation</span>
                      <ArrowRight className="w-4 h-4 text-[#F4B41A]" aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => scrollToSection('field-gallery')}
                      className="inline-flex items-center gap-1.5 px-2 py-2 text-sm font-semibold text-[#0F4221] hover:underline underline-offset-4 cursor-pointer whitespace-nowrap"
                    >
                      <span>View Field Photos</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>

                  <p className="text-xs text-[#5A675D]">
                    Serving government &amp; private sector clients across Pakistan, preparing for
                    international expansion.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive 2D Isometric 3D-Illusion Structural Stage */}
              <div id="blueprint" className="lg:col-span-7 flex flex-col justify-center">
                <IsometricHeroDiorama />
              </div>
            </div>

            {/* 4-Column Proof Strip */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[#DFE2DC] pt-8">
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  1930s
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  Five Generations of Construction Craftsmanship
                </div>
              </div>
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  10
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  Integrated Design, Engineering, Renovation &amp; Demolish Disciplines
                </div>
              </div>
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  2,000+
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  Delivered Buildings, Interiors, Bridges &amp; Infrastructure Works
                </div>
              </div>
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  PEC C-B
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  One-Window Solution Provider · License No. KC-1341
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 2. ONE-WINDOW DISCIPLINES & INTERIOR DESIGN STUDIO                  */}
        {/* =================================================================== */}
        <section id="services" className="arch-isometric-grid border-b border-[#DFE2DC] py-14 lg:py-18">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold text-[#0F4221]">
                  M/S Malik &amp; Company · One-Window Solution Provider
                </p>
                <h2
                  className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                  style={{ textWrap: 'balance' }}
                >
                  Core Engineering, Design, Renovation &amp; Construction Disciplines
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-[#344238]">
                  {PRACTICE_DISCIPLINES.join(' · ')}
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-[#0F4221] font-semibold">
                www.malikasif.com
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {ALL_SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setFormState((prev) => ({
                      ...prev,
                      scope: service.title,
                      siteDetails: `Discipline Inquiry: ${service.title} (${service.discipline})`,
                    }));
                    scrollToSection('contact');
                  }}
                  className="text-left rounded-xl border border-[#DCE0D7] bg-white p-4 hover:border-[#0F4221] transition-colors flex flex-col justify-between gap-3 cursor-pointer"
                >
                  <div className="space-y-2.5">
                    <ServiceIsoIcon id={service.id} />
                    <div className="min-w-0">
                      <div className="text-[11px] font-medium text-[#5A675D]">
                        {service.discipline}
                      </div>
                      <h3 className="mt-0.5 text-base font-bold text-[#111914] leading-snug">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#344238] leading-relaxed">{service.description}</p>
                </button>
              ))}
            </div>

            <InteriorDesignShowcase
              onRequestConsultation={(focusLabel) => {
                setFormState((prev) => ({
                  ...prev,
                  scope: 'Interior Designers',
                  siteDetails: focusLabel,
                }));
                scrollToSection('contact');
              }}
            />
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. REAL ON-SITE PROJECT PHOTOGRAPHS (ALL 9 UPLOADED FIELD PHOTOS)   */}
        {/* =================================================================== */}
        <FieldGallerySection />

        {/* =================================================================== */}
        {/* 4. ARCHITECTURAL SKYLINES: TALL, SHORT, SHOPS & PEDESTAL BRIDGES    */}
        {/* =================================================================== */}
        <section className="arch-grid-bg border-b border-[#DFE2DC] py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold text-[#0F4221]">
                Architecture, Structural &amp; Infrastructure Scale
              </p>
              <h2
                className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                style={{ textWrap: 'balance' }}
              >
                Tall Towers, Civic Blocks, Commercial Shops &amp; Pedestal Bridges
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#344238] leading-relaxed">
                From multi-storey corporate towers and low-rise civic blocks to street-level
                retail shops and elevated pedestal bridges across Karachi and Sialkot.
              </p>
            </div>

            <div className="mt-8">
              <UrbanSkylinePanorama />
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. SPECIALIZATIONS OF M/S MALIK & CO + TOOLS & ALLIANCES            */}
        {/* =================================================================== */}
        <section
          id="specializations"
          className="arch-isometric-grid border-b border-[#DFE2DC] py-16 lg:py-20"
        >
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold text-[#0F4221]">
                Specializations of M/S Malik &amp; Company
              </p>
              <h2
                className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                style={{ textWrap: 'balance' }}
              >
                Ten Disciplines Across Design, Engineering, Renovation &amp; Demolition
              </h2>
              <p className="mt-2.5 text-sm sm:text-base text-[#344238]">
                Detailed deliverables across Interior Designers, Construction, Engineers,
                Architecture, Structural, Planners Developers, MEP Design, Infrastructure
                Consultancy, Renovation Works, and Demolish Works.
              </p>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {SPECIALIZATIONS.map((spec) => (
                <article
                  key={spec.id}
                  className="rounded-2xl border border-[#D4D9CF] bg-white p-6 sm:p-7 extrude-card flex flex-col justify-between gap-5"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono-tabular text-[#5A675D]">
                      <span>{spec.kicker}</span>
                      <span className="font-bold text-[#0F4221]">{spec.number}</span>
                    </div>
                    <h3 className="mt-2 text-xl font-bold text-[#111914] leading-snug">
                      {spec.title}
                    </h3>
                    <p className="mt-2.5 text-sm text-[#344238] leading-relaxed">
                      {spec.description}
                    </p>
                  </div>

                  <ul className="border-t border-[#E5E8E1] pt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs font-medium text-[#1C2720]">
                    {spec.services.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#0F4221] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>

            {/* Tools, Machinery & Industry Alliances */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-[#DFE2DC] bg-white p-6 sm:p-8 flex flex-col justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F4221]">
                    <Wrench className="w-4 h-4 text-[#D99B0C]" aria-hidden="true" />
                    <span>Tools &amp; Machinery Availability</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold text-[#111914]">
                    Every Tool from Traditional to Modern Available
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] text-[#344238] leading-relaxed">
                    From time-tested hand and site-masonry tools to modern demolition breakers,
                    renovation equipment, and surveying instruments, we maintain complete tooling
                    availability to mobilize any site without delay.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-[#CFD5CC] bg-[#0F4221] text-white p-6 sm:p-8 flex flex-col justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#F4B41A]">
                    <Handshake className="w-4 h-4" aria-hidden="true" />
                    <span>Partner Network &amp; Outsourcing</span>
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">
                    Alliances Across Major &amp; Small Companies
                  </h3>
                  <p className="mt-3 text-sm sm:text-[15px] text-[#D1E7D8] leading-relaxed">
                    Backed by established working alliances with both large engineering firms and
                    specialized small contractors, we also arrange reliable specialized outsourcing
                    whenever project scale, timeline, or technical scope requires it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 6. ABOUT US (WITH CRISP ARCHIVAL PHOTO) & 5-GENERATION TIMELINE     */}
        {/* =================================================================== */}
        <section id="heritage" className="arch-grid-bg border-b border-[#DFE2DC] py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center pb-14 border-b border-[#DFE2DC]">
              <div className="lg:col-span-5">
                <figure className="rounded-2xl border border-[#D4D9CF] bg-white overflow-hidden extrude-card">
                  <div className="h-64 sm:h-72 w-full overflow-hidden bg-[#E5E8E0] border-b border-[#DFE2DC]">
                    <img
                      src={ABOUT_US_PHOTO}
                      alt="Archival photograph of M/S Malik & Company leadership at an official civic handover"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <figcaption className="p-4 sm:p-5 text-xs sm:text-sm text-[#344238] leading-relaxed bg-white">
                    <div className="font-bold text-[#0F4221]">
                      Five Generations of Craftsmanship &amp; Engineering
                    </div>
                    <p className="mt-1">
                      From Late Malik Abdul Mehtab Din Sahib in Sialkot (1930s) and Respected Malik
                      Abdul Salam Sahib establishing Malik &amp; Company in Karachi to Civil Engineer
                      Muhammad Asif Malik leading our PEC (C-B) firm today.
                    </p>
                  </figcaption>
                </figure>
              </div>

              <div className="lg:col-span-7">
                <p className="text-xs font-semibold text-[#0F4221]">
                  About Us · Five-Generation Family Legacy
                </p>
                <h2
                  className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                  style={{ textWrap: 'balance' }}
                >
                  A Legacy Built Over Generations
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#344238] leading-relaxed">
                  {COMPANY_INFO.introParagraph}
                </p>
              </div>
            </div>

            {/* Interactive Animated Dotted Milestone Timeline */}
            <div className="mt-14 mb-8 max-w-2xl">
              <p className="text-xs font-semibold text-[#0F4221]">
                Milestone Timeline · 1930s – Present
              </p>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#111914]">
                Five Generations from Sialkot to Karachi &amp; Beyond
              </h2>
            </div>

            <HeritageDepthDeck />
          </div>
        </section>

        {/* =================================================================== */}
        {/* 7. UNIFIED CUSTOM PROJECT PLAN & DIRECT CONSULTATION DESK           */}
        {/* =================================================================== */}
        <section id="contact" className="bg-white py-16 lg:py-20">
          <div id="estimator" className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              {/* Left Column: Direct Office Credentials & Custom Plan Proposal */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-[#0F4221]">
                    Direct Office &amp; Custom Planning Desk · PEC Category C-B
                  </p>
                  <h2
                    className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                    style={{ textWrap: 'balance' }}
                  >
                    Connect with M/S Malik &amp; Company
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#344238] leading-relaxed">
                    Every project is prepared in a custom plan tailored to your plot area and
                    selected discipline — Interior Designers, Construction, Engineers,
                    Architecture, Structural, Planners Developers, MEP Design, Infrastructure
                    Consultancy, Renovation Works, or Demolish Works.
                  </p>
                </div>

                {/* Karachi Headquarters Card */}
                <div className="rounded-xl border border-[#DFE2DC] bg-[#F8F7F4] p-5 space-y-3 text-sm">
                  <div className="text-xs font-bold text-[#0F4221] tracking-wide">
                    KARACHI MAIN OFFICE
                  </div>
                  <address className="not-italic text-[#263029] leading-relaxed">
                    <div className="font-semibold">Malik &amp; Co.</div>
                    {COMPANY_INFO.addressLines.map((line) => (
                      <div key={line}>{line}</div>
                    ))}
                  </address>

                  <div className="pt-3 border-t border-[#E5E8E1] space-y-2 text-xs sm:text-sm">
                    <a
                      href={`tel:${COMPANY_INFO.cell.replace(/[^0-9+]/g, '')}`}
                      className="flex items-center gap-2 font-mono-tabular font-semibold text-[#0F4221] hover:underline"
                    >
                      <Phone className="w-4 h-4 text-[#D99B0C]" aria-hidden="true" />
                      <span>Cell: {COMPANY_INFO.cell}</span>
                    </a>
                    <a
                      href={`mailto:${COMPANY_INFO.email}`}
                      className="flex items-center gap-2 font-medium text-[#263029] hover:text-[#0F4221] hover:underline"
                    >
                      <Mail className="w-4 h-4 text-[#D99B0C]" aria-hidden="true" />
                      <span>{COMPANY_INFO.email}</span>
                    </a>
                  </div>
                </div>

                {/* Tailored Engineering Proposal Summary */}
                <div className="rounded-xl border border-[#CFD5CC] bg-[#0F4221] text-white p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#F4B41A]">
                      Tailored Engineering Proposal
                    </span>
                    <ClipboardList className="w-4 h-4 text-[#F4B41A] shrink-0" aria-hidden="true" />
                  </div>
                  <div className="text-lg font-bold">Custom Plan &amp; BOQ</div>
                  <div className="space-y-2 text-xs text-[#D1E7D8]">
                    {[
                      'One-window Interior Designers, Construction, Engineers, Architecture & Structural',
                      'Planners Developers, MEP Design, Infrastructure Consultancy, Renovation & Demolish Works',
                      COMPANY_INFO.pecRegistration,
                      COMPANY_INFO.electricalLicense,
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#F4B41A] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Multilingual Voice Consultation Desk Launcher */}
                <div className="rounded-xl border border-[#DFE2DC] bg-[#F8F7F4] p-5 space-y-3">
                  <div className="text-xs font-semibold text-[#0F4221]">
                    Multilingual Voice Desk · English · اردو · العربية · ਪੰਜਾਬੀ · سنڌي
                  </div>
                  <div className="text-base font-bold text-[#111914]">
                    Speak with Our Engineering Desk
                  </div>
                  <p className="text-xs text-[#344238] leading-relaxed">
                    Ask voice questions about CEO Engr. Muhammad Asif Malik, our five-generation
                    legacy, PEC Category C-B credentials, or any of our ten disciplines.
                  </p>
                  <button
                    type="button"
                    onClick={() => setVoiceDeskOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0F4221] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0A2E17] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Mic className="w-3.5 h-3.5 text-[#F4B41A]" aria-hidden="true" />
                    <span>Open Voice Consultation</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Unified Custom Plan & Consultation Request Form */}
              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-[#CFD5CC] bg-[#F8F7F4] p-6 sm:p-8 extrude-card">
                  {submittedDocket ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-[#0F4221] text-[#F4B41A] flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#0F4221] font-bold">
                        Custom Plan Inquiry Registered · {submittedDocket}
                      </div>
                      <h3 className="text-2xl font-bold text-[#111914]">
                        Thank you, {formState.fullName}.
                      </h3>
                      <p className="mx-auto max-w-md text-sm text-[#344238] leading-relaxed">
                        Your custom plan request for <strong>{formState.city}</strong> (
                        {formState.scope}) has been logged. Our Karachi desk will follow up at{' '}
                        <strong>{formState.phone}</strong> or you can call us directly at{' '}
                        <strong>{COMPANY_INFO.cell}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedDocket(null);
                          setFormState((prev) => ({ ...prev, plotArea: '', siteDetails: '' }));
                        }}
                        className="mt-2 inline-flex items-center justify-center rounded-lg border border-[#0F4221] px-5 py-2.5 text-xs font-semibold text-[#0F4221] hover:bg-[#0F4221] hover:text-white transition-colors cursor-pointer"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={validateAndSubmit} noValidate className="space-y-5">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#DFE2DC] pb-4">
                        <h3 className="text-xl font-bold text-[#111914]">
                          Request Custom Plan &amp; Consultation
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono-tabular text-[#0F4221]">
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>{COMPANY_INFO.cell}</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="q-name"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Full Name *
                          </label>
                          <input
                            id="q-name"
                            type="text"
                            value={formState.fullName}
                            onChange={(e) =>
                              setFormState({ ...formState, fullName: e.target.value })
                            }
                            placeholder="Your full name"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          />
                          {formErrors.fullName && (
                            <p className="mt-1 text-xs text-red-700">{formErrors.fullName}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="q-org"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Organization / Client Name
                          </label>
                          <input
                            id="q-org"
                            type="text"
                            value={formState.organization}
                            onChange={(e) =>
                              setFormState({ ...formState, organization: e.target.value })
                            }
                            placeholder="Company or Private Client"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="q-phone"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Phone / WhatsApp *
                          </label>
                          <input
                            id="q-phone"
                            type="tel"
                            value={formState.phone}
                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                            placeholder="0334-2199979"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm font-mono-tabular text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          />
                          {formErrors.phone && (
                            <p className="mt-1 text-xs text-red-700">{formErrors.phone}</p>
                          )}
                        </div>

                        <div>
                          <label
                            htmlFor="q-email"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Email Address *
                          </label>
                          <input
                            id="q-email"
                            type="email"
                            value={formState.email}
                            onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                            placeholder="name@company.pk"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-xs text-red-700">{formErrors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label
                            htmlFor="q-city"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Project Location
                          </label>
                          <select
                            id="q-city"
                            value={formState.city}
                            onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                            className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          >
                            {SITE_CITY_OPTIONS.map((cityName) => (
                              <option key={cityName} value={cityName}>
                                {cityName}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="q-scope"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Discipline / Scope
                          </label>
                          <select
                            id="q-scope"
                            value={formState.scope}
                            onChange={(e) => setFormState({ ...formState, scope: e.target.value })}
                            className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          >
                            {PRACTICE_DISCIPLINES.map((discipline) => (
                              <option key={discipline} value={discipline}>
                                {discipline}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="q-area"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Plot / Project Area
                          </label>
                          <input
                            id="q-area"
                            type="text"
                            value={formState.plotArea}
                            onChange={(e) =>
                              setFormState({ ...formState, plotArea: e.target.value })
                            }
                            placeholder="e.g. 500 Sq. Yards, 4 Floors"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="q-details"
                          className="block text-xs font-semibold text-[#344238] mb-1.5"
                        >
                          Specific Requirements &amp; Site Brief *
                        </label>
                        <textarea
                          id="q-details"
                          rows={3}
                          value={formState.siteDetails}
                          onChange={(e) =>
                            setFormState({ ...formState, siteDetails: e.target.value })
                          }
                          placeholder="Share your plot area, location, and scope across Interior Designers, Construction, Engineers, Architecture, Structural, Planners Developers, MEP Design, Infrastructure Consultancy, Renovation Works, or Demolish Works."
                          className="w-full rounded-lg border border-[#CFD5CC] bg-white px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                        />
                        {formErrors.siteDetails && (
                          <p className="mt-1 text-xs text-red-700">{formErrors.siteDetails}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="extrude-btn w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F4221] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0A2E17] cursor-pointer whitespace-nowrap"
                      >
                        <span>Request Custom Plan &amp; Consultation</span>
                        <ArrowRight className="w-4 h-4 text-[#F4B41A]" aria-hidden="true" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ===================================================================== */}
      {/* FOOTER WITH KARACHI & SIALKOT ICONS + CONTACT INFO                    */}
      {/* ===================================================================== */}
      <footer className="border-t border-[#DFE2DC] bg-[#0F4221] text-white">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/15 pb-8">
            <div className="flex items-center gap-4">
              {!logoFailed && (
                <img
                  src={LOGO_SRC}
                  alt="Malik & Co. Crest"
                  className="w-14 h-14 rounded-full bg-white p-0.5 object-contain shrink-0"
                />
              )}
              <div>
                <div className="text-xl font-bold font-display">M/S Malik &amp; Company</div>
                <div className="text-xs text-[#BCE0C7] mt-0.5">
                  PEC Category C-B · License No. KC-1341 · Five-Generation Legacy
                </div>
              </div>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 text-xs text-[#D1E7D8]">
              <a href="#blueprint" className="hover:text-white transition-colors">
                3D Blueprint
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                Disciplines
              </a>
              <a href="#field-gallery" className="hover:text-white transition-colors">
                Site Photos
              </a>
              <a href="#specializations" className="hover:text-white transition-colors">
                Specializations
              </a>
              <a href="#heritage" className="hover:text-white transition-colors">
                Legacy
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-[#BCE0C7]">
            <span>© 2026 M/S Malik &amp; Company · Shahrah-e-Faisal, Karachi</span>

            <div className="flex flex-wrap items-center gap-5">
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#F4B41A]" aria-hidden="true" />
                <span>Karachi (Main Office)</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-white font-medium">
                <Building2 className="w-3.5 h-3.5 text-[#F4B41A]" aria-hidden="true" />
                <span>Sialkot (1930s Origin)</span>
              </span>
              <a
                href="tel:03342199979"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors font-mono-tabular"
              >
                <Phone className="w-3.5 h-3.5 text-[#F4B41A]" aria-hidden="true" />
                <span>0334-2199979</span>
              </a>
              <a
                href="mailto:asif.maliknco@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#F4B41A]" aria-hidden="true" />
                <span>asif.maliknco@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <ElevenLabsVoiceDesk
        isOpen={voiceDeskOpen}
        onOpenChange={setVoiceDeskOpen}
        onNavigateToContact={() => scrollToSection('contact')}
      />
    </div>
  );
}
