import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Menu,
  Phone,
  ShieldCheck,
  X,
} from 'lucide-react';
import {
  ALL_SERVICES,
  CAPABILITIES,
  LANDMARK_PROJECTS,
  LandmarkProject,
  PAKISTAN_CITIES,
  PRACTICE_DISCIPLINES,
  ProjectCategory,
  STRUCTURAL_LAYERS,
  TESTIMONIALS,
} from './data/malikData';
import { IsometricHeroDiorama } from './components/IsometricHeroDiorama';
import { IsometricCapabilityArt } from './components/IsometricCapabilityArt';
import { ServiceIsoIcon } from './components/ServiceIsoIcons';
import {
  SkylineMotifType,
  UrbanCardGraphic,
  UrbanSkylinePanorama,
} from './components/UrbanSkylineGraphics';
import { CostEstimator, EstimatorTransferPayload } from './components/CostEstimator';
import { ProjectModal } from './components/ProjectModal';
import { HeritageDepthDeck } from './components/HeritageDepthDeck';
import { FieldGallerySection } from './components/FieldGallerySection';

const LOGO_SRC = '/assets/aistudio/malik-and-co_c952fd35.png';

interface QuoteFormState {
  fullName: string;
  organization: string;
  phone: string;
  email: string;
  city: string;
  scope: string;
  siteDetails: string;
}

const FLEET_INVENTORY = [
  {
    unit: 'Hydraulic Tracked Excavators (20T–35T)',
    qty: '18 Units',
    spec: 'Deep Trench & Rock Work',
  },
  {
    unit: 'Mobile Concrete Batching Plants',
    qty: '04 Plants',
    spec: '90–120 m³/hr Combined',
  },
  {
    unit: 'Tower Cranes & Transit Mixers',
    qty: '14 Units',
    spec: 'High-Rise Vertical Pour',
  },
  {
    unit: 'Motor Graders, Rollers & Asphalt Pavers',
    qty: '12 Units',
    spec: 'NHA Highway Spec',
  },
];

const EXPLORE_CARDS: {
  id: string;
  targetSection: string;
  title: string;
  subtitle: string;
  summary: string;
  action: string;
  motif: SkylineMotifType;
}[] = [
  {
    id: 'explore-divisions',
    targetSection: 'capabilities',
    title: 'Tall Towers & Short Civic Blocks',
    subtitle: 'Engineering Divisions',
    summary:
      'Multi-storey seismic RCC towers alongside low-rise institutional halls, self-performed with 48 owned heavy machines.',
    action: 'View Capabilities',
    motif: 'tall_short',
  },
  {
    id: 'explore-bridges',
    targetSection: 'projects',
    title: 'Pedestal Bridges & Civil Culverts',
    subtitle: 'Delivered Portfolio',
    summary:
      'Elevated pedestrian pedestal bridges, flyovers, and storm culverts delivered across Karachi and Sialkot.',
    action: 'View Projects',
    motif: 'pedestal_bridge',
  },
  {
    id: 'explore-shops',
    targetSection: 'field-gallery',
    title: 'Commercial Shops & Retail Plazas',
    subtitle: 'Active Site Archive',
    summary:
      'Street-facing retail arcades, multi-bay shopfronts, and market-corridor drainage lines built without halting local trade.',
    action: 'See Field Photos',
    motif: 'shops',
  },
  {
    id: 'explore-planning',
    targetSection: 'estimator',
    title: 'Mixed-Scale Urban Planning & BOQ',
    subtitle: 'Cost Estimator',
    summary:
      'Estimate budgets in Marla, Kanal, Sq. Ft., or Running Ft. backed by 47 years of Pakistani site benchmarks.',
    action: 'Open Estimator',
    motif: 'mixed_district',
  },
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const [selectedLayerId, setSelectedLayerId] = useState<string>('superstructure');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [activeProject, setActiveProject] = useState<LandmarkProject | null>(null);

  const [formState, setFormState] = useState<QuoteFormState>({
    fullName: '',
    organization: '',
    phone: '',
    email: '',
    city: 'Karachi',
    scope: 'Turnkey Commercial',
    siteDetails: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof QuoteFormState, string>>>({});
  const [submittedDocket, setSubmittedDocket] = useState<string | null>(null);

  const selectedLayer = useMemo(
    () => STRUCTURAL_LAYERS.find((l) => l.id === selectedLayerId) || STRUCTURAL_LAYERS[0],
    [selectedLayerId]
  );

  const cities = useMemo(
    () => ['All Cities', ...Array.from(new Set(LANDMARK_PROJECTS.map((p) => p.city)))],
    []
  );

  const filteredProjects = useMemo(() => {
    return LANDMARK_PROJECTS.filter((p) => {
      const catMatch = activeCategory === 'all' || p.category === activeCategory;
      const cityMatch = selectedCity === 'All Cities' || p.city === selectedCity;
      return catMatch && cityMatch;
    });
  }, [activeCategory, selectedCity]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTransferFromEstimator = (payload: EstimatorTransferPayload) => {
    setFormState((prev) => ({
      ...prev,
      city: payload.city,
      scope: payload.projectType,
      siteDetails: `Estimated Scope: ${payload.areaSummary} · Indicative Budget: ${payload.estimatedBudgetPkr}`,
    }));
    setSubmittedDocket(null);
    scrollToSection('contact');
  };

  const handleRequestSimilarProject = (project: LandmarkProject) => {
    setActiveProject(null);
    setFormState((prev) => ({
      ...prev,
      city: project.city,
      scope: project.categoryLabel,
      siteDetails: `Reference Project: ${project.title} (${project.scaleMetric}, ${project.pecGrade})`,
    }));
    setSubmittedDocket(null);
    scrollToSection('contact');
  };

  const validateAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<Record<keyof QuoteFormState, string>> = {};

    if (formState.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    const cleanPhone = formState.phone.replace(/[\s()-]/g, '');
    if (!/^(\+?92|0)?3\d{9}$|^\+?\d{10,14}$/.test(cleanPhone)) {
      errors.phone = 'Enter a valid Pakistani mobile or landline number (e.g. 0300 1234567).';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = 'Enter a valid business or personal email address.';
    }
    if (formState.siteDetails.trim().length < 8) {
      errors.siteDetails = 'Briefly specify plot dimensions, location, or tender scope.';
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    setSubmittedDocket(`MC-1979-${randomCode}`);
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
              Services
            </a>
            <a
              href="#field-gallery"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Site Photos
            </a>
            <a
              href="#projects"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Projects
            </a>
            <a
              href="#capabilities"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Capabilities
            </a>
            <a
              href="#estimator"
              className="hover:text-[#0F4221] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Estimator
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
              { label: 'Services', id: 'services' },
              { label: 'Site Photos', id: 'field-gallery' },
              { label: 'Projects', id: 'projects' },
              { label: 'Capabilities', id: 'capabilities' },
              { label: 'Estimator', id: 'estimator' },
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
                          alt="Malik & Co. official circular seal featuring excavator, high-rise buildings, and culvert pipe"
                          referrerPolicy="no-referrer"
                          onError={() => setLogoFailed(true)}
                          className="w-full h-full object-contain rounded-full"
                        />
                      ) : (
                        <div className="w-full h-full rounded-full bg-[#0F4221] text-white flex flex-col items-center justify-center text-center p-1">
                          <Building2 className="w-6 h-6 text-[#F4B41A]" />
                          <span className="text-[9px] font-bold tracking-wider mt-0.5">
                            M&amp;C 1979
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs leading-relaxed text-[#344238]">
                      <div className="font-semibold text-[#0F4221]">
                        M/S Malik &amp; Company · Est. 1979
                      </div>
                      <div>PEC Category C-A · Engineering Consultants</div>
                      <div className="text-[#5A675D]">Karachi (Main) · Sialkot (Est. 1979)</div>
                    </div>
                  </div>

                  <h1
                    className="mt-7 font-bold tracking-tight text-[#111914] leading-[1.06]"
                    style={{
                      fontSize: 'clamp(2.25rem, 4vw, 3.5rem)',
                      textWrap: 'balance',
                    }}
                  >
                    Civil Infrastructure, Pipelines &amp; Commercial Builds Since 1979.
                  </h1>

                  <p className="mt-5 text-base sm:text-[17px] text-[#344238] leading-relaxed max-w-[54ch]">
                    From trunk sewerage lines, pumping stations, and pedestal bridges to street-level
                    shops and reinforced concrete towers, Malik &amp; Co. executes ground-up civil
                    works across Pakistan with an owned heavy fleet.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToSection('contact')}
                      className="extrude-btn inline-flex items-center gap-2.5 rounded-lg bg-[#0F4221] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0A2E17] cursor-pointer whitespace-nowrap"
                    >
                      <span>Schedule Site Consultation</span>
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
                    Serving municipal boards, industrial estates, and private commercial developers.
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive 2D Isometric 3D-Illusion Structural Stage */}
              <div id="blueprint" className="lg:col-span-7 flex flex-col justify-center">
                <IsometricHeroDiorama
                  selectedLayerId={selectedLayerId}
                  onSelectLayer={setSelectedLayerId}
                />
              </div>
            </div>

            {/* 4-Column Proof Strip */}
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[#DFE2DC] pt-8">
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  1979
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  47 Years of Continuous Field Delivery
                </div>
              </div>
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  PEC C-A
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  Highest No-Limit Engineering License
                </div>
              </div>
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  420+
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  Pipelines, Pumping Stations, Shops &amp; Towers
                </div>
              </div>
              <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                <div className="text-2xl sm:text-3xl font-bold font-mono-tabular text-[#0F4221]">
                  48 Units
                </div>
                <div className="mt-1 text-xs font-medium text-[#4B584E]">
                  Owned Excavators, Loaders &amp; Batching Plants
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 2. INTERACTIVE 2D STRUCTURAL LAYER INSPECTOR                        */}
        {/* =================================================================== */}
        <section className="border-b border-[#DFE2DC] bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <p className="text-xs font-semibold text-[#0F4221]">
                  Selected Layer · {selectedLayer.elevation}
                </p>
                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#111914]">
                  {selectedLayer.name}
                </h2>
                <p className="mt-1.5 text-xs text-[#5A675D]">{selectedLayer.spec}</p>
                <p className="mt-4 text-sm sm:text-base text-[#344238] leading-relaxed">
                  {selectedLayer.summary}
                </p>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {selectedLayer.highlights.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-[#DFE2DC] bg-[#F8F7F4] p-5 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#0F4221] shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-[#1C2720] leading-snug">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. ALL ENGINEERING CONSULTANTS & CONSTRUCTION SERVICES              */}
        {/* =================================================================== */}
        <section id="services" className="arch-isometric-grid border-b border-[#DFE2DC] py-14 lg:py-18">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold text-[#0F4221]">
                  M/S Malik &amp; Company · Foundations for the Future
                </p>
                <h2
                  className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                  style={{ textWrap: 'balance' }}
                >
                  Engineering Consultants &amp; Construction Services
                </h2>
                <p className="mt-2.5 text-sm sm:text-base text-[#344238]">
                  {PRACTICE_DISCIPLINES.join(' · ')}
                </p>
              </div>
              <span className="text-xs font-mono-tabular text-[#0F4221] font-semibold">
                www.malikasif.com
              </span>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ALL_SERVICES.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    setFormState((prev) => ({
                      ...prev,
                      siteDetails: `Service Inquiry: ${service.title} (${service.discipline})`,
                    }));
                    scrollToSection('contact');
                  }}
                  className="text-left rounded-xl border border-[#DCE0D7] bg-white p-4 hover:border-[#0F4221] transition-colors flex flex-col justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
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
          </div>
        </section>

        {/* =================================================================== */}
        {/* 4. REAL ON-SITE PROJECT PHOTOGRAPHS (ALL 9 UPLOADED FIELD PHOTOS)   */}
        {/* =================================================================== */}
        <FieldGallerySection />

        {/* =================================================================== */}
        {/* 4. EXPLORE MALIK & CO.: TALL, SHORT, SHOPS & PEDESTAL BRIDGES       */}
        {/* =================================================================== */}
        <section className="arch-grid-bg border-b border-[#DFE2DC] py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold text-[#0F4221]">Explore Malik &amp; Co.</p>
              <h2
                className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                style={{ textWrap: 'balance' }}
              >
                Engineering Divisions, Portfolio &amp; Planning Tools
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#344238] leading-relaxed">
                From tall corporate towers and low-rise civic blocks to street-level retail shops
                and elevated pedestal bridges across Pakistan’s urban corridors.
              </p>
            </div>

            <div className="mt-8">
              <UrbanSkylinePanorama />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {EXPLORE_CARDS.map((card) => (
                <button
                  key={card.id}
                  type="button"
                  onClick={() => scrollToSection(card.targetSection)}
                  className="w-full h-full text-left rounded-2xl border border-[#D4D9CF] bg-white p-5 extrude-card flex flex-col justify-between gap-4 cursor-pointer"
                >
                  <div>
                    <div className="text-xs font-medium text-[#5A675D]">{card.subtitle}</div>
                    <div className="mt-2.5 rounded-xl border border-[#E5E8E1] bg-[#F8F7F4] p-2">
                      <UrbanCardGraphic type={card.motif} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-[#111914] leading-snug">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm text-[#344238] leading-relaxed">{card.summary}</p>
                  </div>

                  <div className="border-t border-[#E5E8E1] pt-3.5 flex items-center justify-between text-xs font-semibold text-[#0F4221]">
                    <span>{card.action}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 5. LANDMARK PAKISTANI PROJECTS (WITH REAL PHOTOGRAPHS) & PROOF      */}
        {/* =================================================================== */}
        <section id="projects" className="border-b border-[#DFE2DC] bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold text-[#0F4221]">Delivered Across Pakistan</p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]">
                  Selected Civil &amp; Structural Case Studies
                </h2>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div
                  role="tablist"
                  aria-label="Filter projects by engineering sector"
                  className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-[#F2F3EE] border border-[#DFE2DC]"
                >
                  {(
                    [
                      { id: 'all', label: 'All Sectors' },
                      { id: 'civil', label: 'Civil & Culverts' },
                      { id: 'highrise', label: 'High-Rise' },
                      { id: 'highways', label: 'Highways' },
                      { id: 'industrial', label: 'Pumping & Industrial' },
                    ] as { id: ProjectCategory; label: string }[]
                  ).map((tab) => {
                    const active = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setActiveCategory(tab.id)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          active
                            ? 'bg-[#0F4221] text-white'
                            : 'text-[#344238] hover:text-[#111914] hover:bg-white/70'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                <select
                  aria-label="Filter projects by city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="rounded-xl border border-[#DFE2DC] bg-[#F8F7F4] px-3.5 py-2.5 text-xs font-semibold text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-10">
              {filteredProjects.length === 0 ? (
                <div className="rounded-2xl border border-[#DFE2DC] bg-[#F8F7F4] p-10 text-center space-y-3">
                  <p className="text-base font-semibold text-[#111914]">
                    No projects match this sector and city combination.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all');
                      setSelectedCity('All Cities');
                    }}
                    className="rounded-lg bg-[#0F4221] px-4 py-2 text-xs font-semibold text-white cursor-pointer"
                  >
                    Reset Project Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="w-full h-full text-left rounded-2xl border border-[#D4D9CF] bg-[#F8F7F4] overflow-hidden extrude-card flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="h-52 w-full overflow-hidden bg-[#E5E8E0] border-b border-[#DFE2DC]">
                          <img
                            src={project.imageSrc}
                            alt={project.imageAlt}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover ${
                              project.imageFocus === 'top' ? 'object-top' : 'object-center'
                            }`}
                          />
                        </div>

                        <div className="p-6 pb-4">
                          <div className="flex items-center justify-between gap-2 text-xs text-[#4B584E]">
                            <span>
                              {project.city} · {project.categoryLabel}
                            </span>
                            <span className="font-mono-tabular">{project.year}</span>
                          </div>

                          <h3 className="mt-2 text-xl font-bold text-[#111914] leading-snug">
                            {project.title}
                          </h3>

                          <p className="mt-3 text-sm text-[#344238] leading-relaxed">
                            {project.summary}
                          </p>
                        </div>
                      </div>

                      <div className="px-6 py-4 border-t border-[#DFE2DC] flex items-center justify-between gap-3 text-xs">
                        <div className="font-mono-tabular">
                          <span className="font-bold text-[#0F4221]">{project.valuePkr}</span>
                          <span aria-hidden="true" className="mx-1.5 text-[#9AA598]">
                            ·
                          </span>
                          <span className="text-[#4B584E]">{project.concreteVolume}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-semibold text-[#0F4221] shrink-0">
                          <span>Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Client Endorsements */}
            <div className="mt-14 border-t border-[#DFE2DC] pt-12">
              <div className="text-xs font-semibold text-[#0F4221]">
                Consultant &amp; Client Verification
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {TESTIMONIALS.map((t) => (
                  <blockquote
                    key={t.author}
                    className="rounded-2xl border border-[#DFE2DC] bg-[#F8F7F4] p-6 flex flex-col justify-between gap-5"
                  >
                    <p className="text-sm text-[#263029] leading-relaxed">“{t.quote}”</p>
                    <footer className="border-t border-[#DFE2DC] pt-4 text-xs">
                      <div className="font-bold text-[#111914]">{t.author}</div>
                      <div className="text-[#4B584E] mt-0.5">
                        {t.role} · {t.organization}
                      </div>
                      <div className="mt-1 text-[#0F4221] font-medium">
                        Project: {t.projectRef}
                      </div>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 6. CORE CAPABILITIES & OWNED HEAVY EQUIPMENT FLEET                  */}
        {/* =================================================================== */}
        <section
          id="capabilities"
          className="arch-isometric-grid border-b border-[#DFE2DC] py-16 lg:py-20"
        >
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#0F4221]">Engineering Divisions</p>
              <h2
                className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
                style={{ textWrap: 'balance' }}
              >
                Four Core Disciplines Executed Under Single-Point Accountability.
              </h2>
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {CAPABILITIES.map((cap) => {
                const isWide = cap.span === 'wide';
                return (
                  <article
                    key={cap.id}
                    className={`rounded-2xl border border-[#D4D9CF] bg-white p-6 sm:p-7 extrude-card flex flex-col justify-between gap-6 ${
                      isWide ? 'lg:col-span-2' : 'lg:col-span-1'
                    }`}
                  >
                    <div
                      className={`grid gap-6 items-center ${
                        isWide ? 'grid-cols-1 md:grid-cols-12' : 'grid-cols-1'
                      }`}
                    >
                      <div className={isWide ? 'md:col-span-7' : ''}>
                        <div className="text-xs font-medium text-[#5A675D]">{cap.kicker}</div>
                        <h3 className="mt-2 text-xl sm:text-2xl font-bold text-[#111914]">
                          {cap.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-[15px] text-[#344238] leading-relaxed">
                          {cap.description}
                        </p>
                      </div>

                      <div
                        className={`${
                          isWide ? 'md:col-span-5' : ''
                        } rounded-xl border border-[#E5E8E1] bg-[#F8F7F4] p-3`}
                      >
                        <IsometricCapabilityArt type={cap.artType} compact={!isWide} />
                      </div>
                    </div>

                    <div className="border-t border-[#E5E8E1] pt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-medium text-[#0F4221]">
                      {cap.metrics.map((metric, i) => (
                        <React.Fragment key={metric}>
                          <span>{metric}</span>
                          {i < cap.metrics.length - 1 && (
                            <span aria-hidden="true" className="text-[#9AA598]">
                              ·
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Owned Fleet & QA Standards */}
            <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <p className="text-xs font-semibold text-[#0F4221]">In-House Mobilization</p>
                <h3 className="mt-1.5 text-2xl font-bold text-[#111914]">
                  Owned Equipment Fleet &amp; Batching Capacity
                </h3>
                <div className="mt-5 rounded-2xl border border-[#DFE2DC] overflow-x-auto bg-white">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#F2F3EE] text-xs uppercase text-[#344238]">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Equipment Class</th>
                        <th className="px-4 py-3 font-semibold">Fleet Size</th>
                        <th className="px-4 py-3 font-semibold">Application</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E8E1]">
                      {FLEET_INVENTORY.map((row) => (
                        <tr key={row.unit}>
                          <td className="px-4 py-3.5 font-medium text-[#111914]">{row.unit}</td>
                          <td className="px-4 py-3.5 font-mono-tabular font-semibold text-[#0F4221]">
                            {row.qty}
                          </td>
                          <td className="px-4 py-3.5 text-[#4B584E]">{row.spec}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="lg:col-span-5 rounded-2xl border border-[#CFD5CC] bg-[#0F4221] text-white p-6 sm:p-8 flex flex-col justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold text-[#F4B41A]">
                    ISO 9001:2015 &amp; ASTM Testing
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">Site Quality Assurance Protocol</h3>
                  <ul className="mt-5 space-y-3 text-sm text-[#D1E7D8]">
                    {[
                      '7-day & 28-day concrete cube compression testing on every pour',
                      'ASTM A615 Grade-60 tensile & bend verification per steel batch',
                      'Field Density Tests (FDT) verifying 98% MDD trench compaction',
                      'Full-time HSE officers enforcing zero-LTI site safety standards',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#F4B41A] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 7. INTERACTIVE 1979–2026 HERITAGE DEPTH STACK & COVERAGE            */}
        {/* =================================================================== */}
        <section id="heritage" className="arch-grid-bg border-b border-[#DFE2DC] py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-semibold text-[#0F4221]">
                Institutional Legacy · 1979–2026
              </p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]">
                Four Decades of Ground Engineering Across Pakistan
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#344238]">
                Step through our company milestones from 1979 municipal drainage and culvert works to
                modern high-rise and pumping facilities.
              </p>
            </div>

            <HeritageDepthDeck />

            <div className="mt-14 border-t border-[#DFE2DC] pt-12">
              <div className="text-xs font-semibold text-[#0F4221]">
                Regional Soil &amp; Seismic Engineering Coverage
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                {PAKISTAN_CITIES.map((city) => (
                  <div
                    key={city.name}
                    className="rounded-2xl border border-[#DFE2DC] bg-white p-5 flex flex-col justify-between gap-3"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#111914]">{city.name}</h3>
                      <span className="text-xs font-mono-tabular font-semibold text-[#0F4221]">
                        {city.seismicZone}
                      </span>
                    </div>
                    <p className="text-sm text-[#344238] leading-relaxed">{city.soilNote}</p>
                    <div className="pt-2 border-t border-[#E5E8E1] flex items-center gap-2 text-xs text-[#4B584E]">
                      <ShieldCheck className="w-4 h-4 text-[#0F4221]" aria-hidden="true" />
                      <span>Full mobilization &amp; site lab support</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 8. PAKISTAN BOQ COST & TIMELINE ESTIMATOR                           */}
        {/* =================================================================== */}
        <section id="estimator" className="border-b border-[#DFE2DC] bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-xs font-semibold text-[#0F4221]">Budget &amp; Material Planning</p>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]">
                Estimate Your Project in Marla, Kanal, or Sq. Ft.
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[#344238]">
                Calibrated to current Pakistani Grade-60 steel, OPC/SRC cement, and regional soil
                conditions across major urban centers.
              </p>
            </div>

            <CostEstimator onTransferToQuote={handleTransferFromEstimator} />

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 rounded-2xl border border-[#DFE2DC] bg-[#F8F7F4] p-6">
                <div className="text-xs font-semibold text-[#0F4221]">
                  Pakistani Standard Plot Conversions
                </div>
                <dl className="mt-4 divide-y divide-[#E5E8E1] text-sm">
                  <div className="py-3 flex items-center justify-between">
                    <dt className="text-[#344238]">1 Marla (Standard Urban)</dt>
                    <dd className="font-mono-tabular font-semibold text-[#111914]">225 sq. ft.</dd>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <dt className="text-[#344238]">10 Marla Plot Footprint</dt>
                    <dd className="font-mono-tabular font-semibold text-[#111914]">2,250 sq. ft.</dd>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <dt className="text-[#344238]">1 Kanal (20 Marla)</dt>
                    <dd className="font-mono-tabular font-semibold text-[#111914]">4,500 sq. ft.</dd>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <dt className="text-[#344238]">1 Acre (8 Kanal)</dt>
                    <dd className="font-mono-tabular font-semibold text-[#111914]">36,000 sq. ft.</dd>
                  </div>
                </dl>
              </div>

              <div className="lg:col-span-7 rounded-2xl border border-[#DFE2DC] bg-[#F8F7F4] p-6">
                <div className="text-xs font-semibold text-[#0F4221]">
                  City Soil &amp; Seismic Cost Index
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-xs uppercase text-[#5A675D] border-b border-[#E5E8E1]">
                      <tr>
                        <th className="pb-2.5 font-semibold">City</th>
                        <th className="pb-2.5 font-semibold">Seismic</th>
                        <th className="pb-2.5 font-semibold">Index</th>
                        <th className="pb-2.5 font-semibold">Geotechnical Basis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5E8E1]">
                      {PAKISTAN_CITIES.map((c) => (
                        <tr key={c.name}>
                          <td className="py-2.5 font-semibold text-[#111914]">{c.name}</td>
                          <td className="py-2.5 font-mono-tabular text-xs text-[#0F4221]">
                            {c.seismicZone}
                          </td>
                          <td className="py-2.5 font-mono-tabular text-xs font-semibold">
                            {c.multiplier.toFixed(2)}×
                          </td>
                          <td className="py-2.5 text-xs text-[#4B584E]">{c.soilNote}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 9. TENDER & SITE CONSULTATION FORM                                  */}
        {/* =================================================================== */}
        <section id="contact" className="arch-isometric-grid py-16 lg:py-20">
          <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-[#0F4221]">
                    Tendering &amp; Engineering Desk
                  </p>
                  <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]">
                    Submit Drawings, BOQs, or Site Coordinates.
                  </h2>
                  <p className="mt-3 text-sm sm:text-base text-[#344238] leading-relaxed">
                    Our chief estimator and senior structural engineer review every commercial,
                    industrial, and civil inquiry within 24 working hours.
                  </p>
                </div>

                <div className="space-y-4 border-t border-[#DFE2DC] pt-6 text-sm">
                  <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                    <div className="text-xs font-bold text-[#0F4221]">
                      KARACHI MAIN HEADQUARTERS
                    </div>
                    <div className="mt-1 text-[#263029]">
                      Suite 302, Clifton Commercial Block 5, Karachi
                    </div>
                    <div className="mt-1 font-mono-tabular text-xs text-[#5A675D]">
                      www.malikasif.com · tenders@malikasif.com · +92 (21) 3583-9920
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
                    <div className="text-xs font-bold text-[#0F4221]">
                      SIALKOT FOUNDING OFFICE (EST. 1979)
                    </div>
                    <div className="mt-1 text-[#263029]">
                      Engineering Block, Paris Road / Cantt Area, Sialkot
                    </div>
                    <div className="mt-1 font-mono-tabular text-xs text-[#5A675D]">
                      1979 Founding Operations · Mon–Sat 09:00–18:00 PKT
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-[#CFD5CC] bg-white p-6 sm:p-8 extrude-card">
                  {submittedDocket ? (
                    <div className="py-8 text-center space-y-4">
                      <div className="mx-auto w-12 h-12 rounded-full bg-[#0F4221] text-[#F4B41A] flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div className="text-xs font-mono-tabular uppercase tracking-wider text-[#0F4221] font-bold">
                        Tender Inquiry Registered · {submittedDocket}
                      </div>
                      <h3 className="text-2xl font-bold text-[#111914]">
                        Thank you, {formState.fullName}.
                      </h3>
                      <p className="mx-auto max-w-md text-sm text-[#344238] leading-relaxed">
                        Your project brief for <strong>{formState.city}</strong> (
                        {formState.scope}) has been assigned to our regional engineering desk. We
                        will contact you at <strong>{formState.phone}</strong>.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedDocket(null);
                          setFormState((prev) => ({ ...prev, siteDetails: '' }));
                        }}
                        className="mt-2 inline-flex items-center justify-center rounded-lg border border-[#0F4221] px-5 py-2.5 text-xs font-semibold text-[#0F4221] hover:bg-[#0F4221] hover:text-white transition-colors cursor-pointer"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={validateAndSubmit} noValidate className="space-y-5">
                      <div className="flex items-center justify-between border-b border-[#E5E8E1] pb-4">
                        <h3 className="text-xl font-bold text-[#111914]">
                          Request Site Visit or Tender Bid
                        </h3>
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0F4221]">
                          <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Direct Desk</span>
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
                            placeholder="Engr. Kamran Siddiqui"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
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
                            Organization / Developer
                          </label>
                          <input
                            id="q-org"
                            type="text"
                            value={formState.organization}
                            onChange={(e) =>
                              setFormState({ ...formState, organization: e.target.value })
                            }
                            placeholder="Company or Private Client"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
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
                            placeholder="+92 300 8421979"
                            className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3.5 py-2.5 text-sm font-mono-tabular text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
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
                            className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          />
                          {formErrors.email && (
                            <p className="mt-1 text-xs text-red-700">{formErrors.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="q-city"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Site City
                          </label>
                          <select
                            id="q-city"
                            value={formState.city}
                            onChange={(e) => setFormState({ ...formState, city: e.target.value })}
                            className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          >
                            {PAKISTAN_CITIES.map((c) => (
                              <option key={c.name} value={c.name}>
                                {c.name}
                              </option>
                            ))}
                            <option value="Other Pakistan City">Other Pakistan City</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="q-scope"
                            className="block text-xs font-semibold text-[#344238] mb-1.5"
                          >
                            Engineering Scope
                          </label>
                          <select
                            id="q-scope"
                            value={formState.scope}
                            onChange={(e) => setFormState({ ...formState, scope: e.target.value })}
                            className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                          >
                            <option value="Turnkey Commercial">Turnkey Commercial Tower</option>
                            <option value="RCC Grey Structure">RCC Grey Structure</option>
                            <option value="Civil & Culverts">
                              Storm Culverts &amp; Trunk Sewerage
                            </option>
                            <option value="Highways & Bridges">
                              Highways, Flyovers &amp; Pedestal Bridges
                            </option>
                            <option value="Pumping & Industrial">
                              Pumping Stations &amp; Industrial Plants
                            </option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="q-details"
                          className="block text-xs font-semibold text-[#344238] mb-1.5"
                        >
                          Plot Area, Location &amp; Target Start Date *
                        </label>
                        <textarea
                          id="q-details"
                          rows={3}
                          value={formState.siteDetails}
                          onChange={(e) =>
                            setFormState({ ...formState, siteDetails: e.target.value })
                          }
                          placeholder="e.g. 4 Kanal commercial plaza in Clifton Karachi or Paris Road Sialkot, B2+G+6, soil report available."
                          className="w-full rounded-lg border border-[#CFD5CC] bg-[#F8F7F4] px-3.5 py-2.5 text-sm text-[#111914] focus:outline-none focus:ring-2 focus:ring-[#0F4221]"
                        />
                        {formErrors.siteDetails && (
                          <p className="mt-1 text-xs text-red-700">{formErrors.siteDetails}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="extrude-btn w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#0F4221] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0A2E17] cursor-pointer whitespace-nowrap"
                      >
                        <span>Submit Tender Consultation Request</span>
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
      {/* QUIET FOOTER                                                          */}
      {/* ===================================================================== */}
      <footer className="border-t border-[#DFE2DC] bg-[#0F4221] text-white">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border-b border-white/15 pb-8">
            <div className="flex items-center gap-4">
              {!logoFailed && (
                <img
                  src={LOGO_SRC}
                  alt="Malik & Co. 1979 Crest"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full bg-white p-0.5 object-contain shrink-0"
                />
              )}
              <div>
                <div className="text-xl font-bold font-display">Malik &amp; Co.</div>
                <div className="text-xs text-[#BCE0C7] mt-0.5">
                  Civil Engineering &amp; Construction · Est. 1979 · PEC Category C-A · ISO
                  9001:2015
                </div>
              </div>
            </div>

            <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 text-xs text-[#D1E7D8]">
              <a href="#blueprint" className="hover:text-white transition-colors">
                3D Blueprint
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                Services
              </a>
              <a href="#field-gallery" className="hover:text-white transition-colors">
                Site Photos
              </a>
              <a href="#projects" className="hover:text-white transition-colors">
                Projects
              </a>
              <a href="#capabilities" className="hover:text-white transition-colors">
                Capabilities
              </a>
              <a href="#estimator" className="hover:text-white transition-colors">
                Estimator
              </a>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </nav>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#BCE0C7]">
            <span>© 1979–2026 M/S Malik &amp; Company · www.malikasif.com</span>
            <span>Karachi (Main Office) · Sialkot (Est. 1979)</span>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onRequestSimilar={handleRequestSimilarProject}
      />
    </div>
  );
}
