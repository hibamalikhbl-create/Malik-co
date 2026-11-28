import React, { useEffect, useState } from 'react';
import { ArrowRight, Compass, Pause, PenTool, Play, RotateCcw } from 'lucide-react';

interface InteriorDesignShowcaseProps {
  onRequestConsultation: (focusLabel: string) => void;
}

export const InteriorDesignShowcase: React.FC<InteriorDesignShowcaseProps> = ({
  onRequestConsultation,
}) => {
  const [activeRender, setActiveRender] = useState<'residential' | 'office'>('residential');
  const [progress, setProgress] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [replayNonce, setReplayNonce] = useState<number>(0);

  // Smooth 15-second interior design & fit-out assembly sequence
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setProgress(1);
      setIsPlaying(false);
      return;
    }

    if (!isPlaying) return;

    let rafId = 0;
    const durationMs = 15000; // 15 seconds complete interior build
    const startTime = performance.now();
    setProgress(0);

    const tick = (now: number) => {
      const elapsed = (now - startTime) % durationMs;
      const p = elapsed / durationMs;
      setProgress(p);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, replayNonce]);

  const stageLabel =
    progress < 0.33
      ? '01 · Space Planning & Shell'
      : progress < 0.66
      ? '02 · Millwork, Glazing & MEP'
      : '03 · Furniture & Final Décor';

  const shellAlpha = Math.min(1, progress / 0.25);
  const fitoutAlpha = Math.max(0, Math.min(1, (progress - 0.28) / 0.3));
  const decorAlpha = Math.max(0, Math.min(1, (progress - 0.6) / 0.32));

  return (
    <div className="mt-12 rounded-2xl border border-[#DCE0D7] bg-white p-6 sm:p-8 lg:p-10 extrude-card">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* LEFT COLUMN: Editorial Vision & Mission + Two Side-by-Side 15s Interior Build Renders */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-7">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#0F4221]">
                <PenTool className="w-3.5 h-3.5 text-[#D99B0C]" aria-hidden="true" />
                <span>Interior Design Studio · Karachi</span>
              </div>

              <div className="flex items-center gap-2 bg-[#F2F3EE] px-2.5 py-1 rounded-lg text-[11px] font-mono-tabular text-[#263029]">
                <button
                  type="button"
                  onClick={() => setIsPlaying((v) => !v)}
                  aria-label={isPlaying ? 'Pause 15s interior build' : 'Play 15s interior build'}
                  className="rounded p-1 hover:bg-white text-[#0F4221] cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                    setReplayNonce((n) => n + 1);
                  }}
                  aria-label="Replay 15s interior build"
                  className="rounded p-1 hover:bg-white text-[#0F4221] cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>

            <h3
              className="mt-2.5 text-2xl sm:text-3xl font-bold tracking-tight text-[#111914] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Vision and Mission: Elevating Lifestyles through Design
            </h3>

            <p className="mt-4 text-sm sm:text-[15px] text-[#344238] leading-relaxed">
              M/S Malik &amp; Company operates with a clear vision: to uplift and enhance the quality
              of everyday life through thoughtful interior architecture. We believe refined design
              should not only be visually appealing, but also improve the comfort and wellbeing of
              its occupants. This vision drives our mission to craft interiors that are balanced and
              highly functional—delivering harmonious corporate offices, residences, and executive
              lounges built for work, rest, and hospitality across Karachi.
            </p>

            {/* 15-Second Fit-Out Stage Progress Bar */}
            <div className="mt-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-medium text-[#4B584E]">
                <span className="text-[#0F4221] font-semibold">{stageLabel}</span>
                <span>Space Planning · Furniture Layouts · Material Selection · Décor</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#ECEEE8] overflow-hidden">
                <div
                  className="h-full bg-[#0F4221] transition-[width] duration-75"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Two Side-by-Side Interior Perspective Render Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Render 01: Sunlit Open-Plan Dining & Lounge */}
            <button
              type="button"
              onClick={() => setActiveRender('residential')}
              className={`group text-left rounded-xl border overflow-hidden transition-all cursor-pointer bg-[#F8F7F4] ${
                activeRender === 'residential'
                  ? 'border-[#0F4221] shadow-md'
                  : 'border-[#DCE0D7] hover:border-[#0F4221]/60'
              }`}
            >
              <div className="relative h-52 w-full overflow-hidden bg-[#EAE6DF]">
                <svg
                  viewBox="0 0 360 220"
                  className="w-full h-full block select-none"
                  role="img"
                  aria-label="Architectural 2D perspective illustration of a sunlit modern residential dining and living interior"
                >
                  <defs>
                    <linearGradient id="skyDay" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#E0F2FE" />
                      <stop offset="100%" stopColor="#F8FAFC" />
                    </linearGradient>
                    <linearGradient id="ceilingWarm" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#F5F3EE" />
                      <stop offset="100%" stopColor="#E7E2D8" />
                    </linearGradient>
                    <linearGradient id="floorOak" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#EDE4D5" />
                      <stop offset="100%" stopColor="#D6C7B2" />
                    </linearGradient>
                  </defs>

                  {/* Stage 1 (0–5s): Architectural Shell & Curtain Wall */}
                  <g opacity={shellAlpha}>
                    <polygon points="0,0 360,0 310,36 72,36" fill="url(#ceilingWarm)" />
                    <polygon points="72,170 310,170 360,220 0,220" fill="url(#floorOak)" />
                    <rect x="72" y="36" width="238" height="134" fill="url(#skyDay)" />
                    <ellipse cx="145" cy="142" rx="34" ry="20" fill="#86A789" opacity="0.45" />
                    <ellipse cx="265" cy="136" rx="42" ry="26" fill="#6F9475" opacity="0.45" />
                    <line x1="152" y1="36" x2="152" y2="170" stroke="#334139" strokeWidth="2.5" />
                    <line x1="232" y1="36" x2="232" y2="170" stroke="#334139" strokeWidth="2.5" />
                    <line x1="72" y1="36" x2="310" y2="36" stroke="#334139" strokeWidth="2" />
                    <polygon points="0,0 72,36 72,170 0,220" fill="#EAE6DD" />
                  </g>

                  {/* Stage 2 (5–10s): Cabinetry, Drapes & Linear Lighting */}
                  <g opacity={fitoutAlpha}>
                    <polygon points="72,36 100,36 96,170 72,170" fill="#D5CDC0" opacity="0.85" />
                    <polygon points="282,36 310,36 310,170 286,170" fill="#D5CDC0" opacity="0.85" />
                    <polygon points="215,36 244,36 242,170 218,170" fill="#DFD8CC" opacity="0.7" />
                    <polygon points="10,48 64,66 64,116 10,112" fill="#4B594B" />
                    <polygon
                      points="10,112 64,116 64,142 10,152"
                      fill="#F6F5F1"
                      stroke="#CBD5E1"
                      strokeWidth="0.8"
                    />
                    <polygon points="10,152 64,142 64,174 10,192" fill="#C7BEB0" />
                    <ellipse
                      cx="132"
                      cy="18"
                      rx="6"
                      ry="2.2"
                      fill="#FDE68A"
                      stroke="#9CA3AF"
                      strokeWidth="0.7"
                    />
                    <ellipse
                      cx="240"
                      cy="18"
                      rx="6"
                      ry="2.2"
                      fill="#FDE68A"
                      stroke="#9CA3AF"
                      strokeWidth="0.7"
                    />
                    <line x1="138" y1="18" x2="138" y2="72" stroke="#4B5563" strokeWidth="1" />
                    <line x1="230" y1="22" x2="230" y2="76" stroke="#4B5563" strokeWidth="1" />
                    <polygon
                      points="116,72 246,76 246,84 116,80"
                      fill="#FFFFFF"
                      stroke="#D99B0C"
                      strokeWidth="1"
                    />
                  </g>

                  {/* Stage 3 (10–15s): Walnut Furniture, Chairs & Décor */}
                  <g opacity={decorAlpha}>
                    <polygon
                      points="108,148 256,148 282,165 86,165"
                      fill="#9A6B43"
                      stroke="#5C3D23"
                      strokeWidth="1"
                    />
                    <polygon points="86,165 282,165 282,171 86,171" fill="#704B2D" />
                    <rect x="118" y="171" width="12" height="32" fill="#5C3D23" />
                    <rect x="234" y="171" width="12" height="32" fill="#5C3D23" />
                    {[122, 166, 210].map((cx) => (
                      <g key={cx}>
                        <rect
                          x={cx}
                          y="156"
                          width="22"
                          height="16"
                          rx="4"
                          fill="#D6CBB8"
                          stroke="#78716C"
                          strokeWidth="0.9"
                        />
                        <rect x={cx + 3} y="172" width="16" height="10" rx="2" fill="#C7B9A3" />
                        <line x1={cx + 5} y1="182" x2={cx + 3} y2="198" stroke="#5C3D23" strokeWidth="2" />
                        <line
                          x1={cx + 17}
                          y1="182"
                          x2={cx + 19}
                          y2="198"
                          stroke="#5C3D23"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                    <polygon points="292,158 318,158 314,186 296,186" fill="#0F4221" />
                    <ellipse cx="305" cy="146" rx="14" ry="13" fill="#3F6E48" />
                  </g>
                </svg>
              </div>
              <div className="px-4 py-3 border-t border-[#E2E5DD] bg-white">
                <div className="text-xs font-bold text-[#111914]">
                  Daylight Residence &amp; Dining Suite
                </div>
                <div className="text-[11px] text-[#5A675D] mt-0.5">
                  Timber joinery · Curtain glazing · Warm linear lighting
                </div>
              </div>
            </button>

            {/* Render 02: Concrete & Cognac Executive Study */}
            <button
              type="button"
              onClick={() => setActiveRender('office')}
              className={`group text-left rounded-xl border overflow-hidden transition-all cursor-pointer bg-[#F8F7F4] ${
                activeRender === 'office'
                  ? 'border-[#0F4221] shadow-md'
                  : 'border-[#DCE0D7] hover:border-[#0F4221]/60'
              }`}
            >
              <div className="relative h-52 w-full overflow-hidden bg-[#2C3330]">
                <svg
                  viewBox="0 0 360 220"
                  className="w-full h-full block select-none"
                  role="img"
                  aria-label="Architectural 2D perspective illustration of an executive office and concrete lounge interior"
                >
                  <defs>
                    <linearGradient id="concreteWall" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#949B96" />
                      <stop offset="100%" stopColor="#6D746F" />
                    </linearGradient>
                    <linearGradient id="darkCeiling" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#171D1A" />
                      <stop offset="100%" stopColor="#262E2A" />
                    </linearGradient>
                  </defs>

                  {/* Stage 1 (0–5s): Ceiling, Floor & Concrete Back Wall */}
                  <g opacity={shellAlpha}>
                    <polygon points="0,0 360,0 300,34 62,34" fill="url(#darkCeiling)" />
                    <polygon points="62,168 300,168 360,220 0,220" fill="#B79E80" />
                    <rect x="62" y="34" width="238" height="134" fill="url(#concreteWall)" />
                    {[115, 178, 240].map((x) => (
                      <line key={x} x1={x} y1="34" x2={x} y2="168" stroke="#525853" strokeWidth="1.2" />
                    ))}
                    {[74, 118].map((y) => (
                      <line key={y} x1="62" y1={y} x2="300" y2={y} stroke="#525853" strokeWidth="1" />
                    ))}
                    <polygon points="0,0 62,34 62,168 0,220" fill="#4A544E" />
                    <polygon points="10,22 50,42 50,152 10,180" fill="#D8E5DF" opacity="0.85" />
                  </g>

                  {/* Stage 2 (5–10s): Shelving & Linear Lighting */}
                  <g opacity={fitoutAlpha}>
                    <rect
                      x="130"
                      y="54"
                      width="104"
                      height="98"
                      fill="none"
                      stroke="#1E2421"
                      strokeWidth="2.5"
                    />
                    <line x1="182" y1="54" x2="182" y2="152" stroke="#1E2421" strokeWidth="2" />
                    {[78, 102, 126].map((y) => (
                      <g key={y}>
                        <line x1="130" y1={y} x2="234" y2={y} stroke="#1E2421" strokeWidth="2.2" />
                        <rect x="138" y={y - 12} width="14" height="12" fill="#D99B0C" opacity="0.8" />
                        <rect x="192" y={y - 14} width="22" height="14" fill="#334139" />
                      </g>
                    ))}
                    <line x1="168" y1="22" x2="168" y2="62" stroke="#111914" strokeWidth="1.4" />
                    <line x1="286" y1="22" x2="286" y2="62" stroke="#111914" strokeWidth="1.4" />
                    <rect x="150" y="62" width="154" height="8" rx="1.5" fill="#18201B" />
                    <rect x="154" y="68" width="146" height="3" fill="#FEF3C7" />
                  </g>

                  {/* Stage 3 (10–15s): Lounge Chairs, Executive Desk & Seating */}
                  <g opacity={decorAlpha}>
                    <polygon
                      points="34,142 66,142 74,174 28,174"
                      fill="#C26A31"
                      stroke="#7C3F19"
                      strokeWidth="1"
                    />
                    <rect x="28" y="164" width="46" height="14" rx="3" fill="#A85522" />
                    <polygon
                      points="78,148 106,148 112,174 74,174"
                      fill="#B5602B"
                      stroke="#7C3F19"
                      strokeWidth="1"
                    />
                    <polygon
                      points="122,146 312,146 330,162 110,162"
                      fill="#B38353"
                      stroke="#6B4A2B"
                      strokeWidth="1"
                    />
                    <rect x="122" y="162" width="198" height="38" fill="#8C6239" />
                    <rect
                      x="174"
                      y="114"
                      width="44"
                      height="28"
                      rx="2"
                      fill="#E2E8F0"
                      stroke="#1E2421"
                      strokeWidth="1.5"
                    />
                    <rect x="192" y="142" width="8" height="6" fill="#334139" />
                    <rect
                      x="154"
                      y="156"
                      width="38"
                      height="44"
                      rx="6"
                      fill="#1E2622"
                      stroke="#0F1713"
                      strokeWidth="1.2"
                    />
                    <rect
                      x="218"
                      y="158"
                      width="36"
                      height="42"
                      rx="6"
                      fill="#28322D"
                      stroke="#0F1713"
                      strokeWidth="1.2"
                    />
                  </g>
                </svg>
              </div>
              <div className="px-4 py-3 border-t border-[#E2E5DD] bg-white">
                <div className="text-xs font-bold text-[#111914]">
                  Executive Office &amp; Concrete Lounge
                </div>
                <div className="text-[11px] text-[#5A675D] mt-0.5">
                  Board-formed concrete · Steel shelving · Acoustic ceiling
                </div>
              </div>
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E8E1] pt-5">
            <p className="text-xs text-[#5A675D]">
              Space planning, furniture layouts, material selection &amp; décor solutions.
            </p>
            <button
              type="button"
              onClick={() =>
                onRequestConsultation(
                  activeRender === 'residential'
                    ? 'Interior Design: Residential & Hospitality Lounge Fit-Out'
                    : 'Interior Design: Corporate Office & Concrete Lounge Fit-Out'
                )
              }
              className="extrude-btn inline-flex items-center gap-2 rounded-lg bg-[#0F4221] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0A2E17] cursor-pointer whitespace-nowrap"
            >
              <span>Book Interior Design Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#F4B41A]" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Uploaded Interior Transformation Video + Two Concept Sketches */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="rounded-xl border border-[#DCE0D7] bg-[#F8F7F4] p-3.5">
            <div className="flex items-center justify-between gap-2 mb-2.5 text-[11px] font-medium text-[#344238]">
              <span className="font-semibold text-[#0F4221]">
                Interior Transformation Reel · Sketch to Finish
              </span>
              <span className="font-mono-tabular text-[#5A675D]">Karachi Studio</span>
            </div>
            <div className="mx-auto w-full max-w-[235px] aspect-[9/16] rounded-lg overflow-hidden border border-[#CFD5CC] bg-[#151C17]">
              <video
                src="/assets/aistudio/Interior_design_transformation_v__f256942b_d5b688fd.mp4"
                autoPlay
                loop
                muted
                playsInline
                controls
                preload="metadata"
                aria-label="Interior design transformation video showing architectural sketch evolving into finished coffered timber ceiling, hardwood floor, and furnished living room"
                className="w-full h-full object-cover block"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Sketch 01: Slatted Ceiling Reception Lobby & Lounge Perspective */}
            <figure className="relative rounded-xl border border-[#E5E8E1] bg-white p-2.5 overflow-hidden">
            <svg
              viewBox="0 0 420 195"
              className="w-full h-auto block select-none"
              role="img"
              aria-label="Architectural pencil sketch perspective of a corporate reception lobby with slatted ceiling fins and hanging lights"
            >
              <defs>
                <radialGradient id="sketchFade1" cx="50%" cy="50%" r="54%">
                  <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </radialGradient>
              </defs>

              <rect width="420" height="195" fill="#FFFFFF" />
              <polygon points="10,145 140,115 300,115 410,155 410,190 10,190" fill="#F4F5F4" />

              {/* Vertical Ceiling Timber Fins / Louvers */}
              <g stroke="#2C322E" strokeWidth="1" opacity="0.85">
                {[30, 44, 58, 72, 86, 100, 114, 128, 142, 156, 170].map((x, idx) => (
                  <line key={x} x1={x} y1="6" x2={x + 14} y2={48 - idx * 1.4} />
                ))}
                {[66, 94, 122, 148].map((x, idx) => (
                  <g key={x}>
                    <line x1={x} y1="18" x2={x} y2={58 - idx * 3} strokeWidth="0.9" />
                    <rect
                      x={x - 3}
                      y={58 - idx * 3}
                      width="6"
                      height="16"
                      fill="#E5E7EB"
                      stroke="#1F2421"
                      strokeWidth="0.9"
                    />
                  </g>
                ))}
              </g>

              {/* Atrium Partitions */}
              <g stroke="#1F2421" fill="none">
                <line x1="150" y1="26" x2="365" y2="62" strokeWidth="1.2" />
                <line x1="150" y1="36" x2="365" y2="70" strokeWidth="0.8" />
                <line x1="150" y1="115" x2="375" y2="115" strokeWidth="0.8" />
                <rect x="172" y="48" width="52" height="67" strokeWidth="1" fill="#FAFAFA" opacity="0.7" />
                <rect x="228" y="54" width="44" height="61" strokeWidth="0.9" />
                {[312, 320, 328, 336, 344, 352, 360].map((x) => (
                  <line key={x} x1={x} y1="22" x2={x} y2="148" strokeWidth="0.9" opacity="0.8" />
                ))}
                <line x1="340" y1="10" x2="340" y2="48" strokeWidth="0.9" />
                <path d="M328,58 A12,10 0 0,1 352,58 Z" fill="#E5E7EB" strokeWidth="1" />
              </g>

              {/* Reception Desk + Bonsai */}
              <g stroke="#1F2421" strokeWidth="1.1">
                <polygon points="36,104 166,112 198,104 72,96" fill="#F7F7F6" />
                <polygon points="36,104 166,112 166,144 36,138" fill="#EBECEB" />
                <polygon points="166,112 198,104 198,136 166,144" fill="#DCDEDD" />
                <polygon points="56,139 148,143 148,158 56,154" fill="#D2D4D3" />
                <rect x="52" y="92" width="20" height="8" fill="#D5D7D6" />
                <path d="M62,92 C60,84 65,80 62,74" fill="none" strokeWidth="1.2" />
                <ellipse cx="62" cy="72" rx="12" ry="7" fill="#E5E7E5" />
              </g>

              {/* Lounge Ottomans & Chair */}
              <g stroke="#1F2421" strokeWidth="1" fill="#ECEEED">
                <ellipse cx="305" cy="144" rx="16" ry="7" />
                <ellipse cx="332" cy="148" rx="14" ry="6" />
                <path d="M354,132 Q374,120 388,138 L384,158 L352,155 Z" fill="#F4F5F4" />
              </g>

              <g stroke="#9CA3AF" strokeWidth="0.55" opacity="0.65">
                {[120, 132, 146, 162, 178].map((y) => (
                  <line key={y} x1="18" y1={y + 12} x2="402" y2={y + 8} />
                ))}
                <line x1="190" y1="115" x2="60" y2="188" />
                <line x1="225" y1="115" x2="180" y2="188" />
                <line x1="265" y1="115" x2="305" y2="188" />
              </g>

              <rect width="420" height="195" fill="url(#sketchFade1)" pointerEvents="none" />
            </svg>
            <figcaption className="mt-1 flex items-center justify-between px-1 text-[10px] text-[#5A675D]">
              <span className="font-medium text-[#263029]">Sketch 01 · Reception</span>
              <span className="inline-flex items-center gap-1 font-mono-tabular">
                <Compass className="w-3 h-3 text-[#0F4221]" aria-hidden="true" />
                Perspective
              </span>
            </figcaption>
          </figure>

          {/* Sketch 02: Mezzanine Loft Staircase & Hexagonal Geometric Wall */}
          <figure className="relative rounded-xl border border-[#E5E8E1] bg-white p-2.5 overflow-hidden">
            <svg
              viewBox="0 0 420 205"
              className="w-full h-auto block select-none"
              role="img"
              aria-label="Architectural pencil sketch perspective of a mezzanine loft suite with open staircase and hexagonal geometric wall panels"
            >
              <defs>
                <radialGradient id="sketchFade2" cx="50%" cy="50%" r="54%">
                  <stop offset="72%" stopColor="#FFFFFF" stopOpacity="0" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1" />
                </radialGradient>
              </defs>

              <rect width="420" height="205" fill="#FFFFFF" />

              <g stroke="#252B27" fill="none" strokeWidth="1">
                <polygon points="18,16 392,16 320,62 115,62" fill="#F9FAFA" />
                <polygon points="115,62 320,62 320,144 115,144" fill="#FFFFFF" />
                <polygon points="18,16 115,62 115,144 18,188" fill="#F5F6F5" />
                <polygon points="320,62 392,16 392,188 320,144" fill="#F3F4F3" />
                <polygon points="18,188 115,144 320,144 392,188" fill="#EFEFEF" />
              </g>

              <g stroke="#1F2421" strokeWidth="1.1" fill="#F8F9F8">
                <ellipse cx="264" cy="36" rx="22" ry="8" />
                <ellipse cx="326" cy="36" rx="26" ry="9" />
                <ellipse cx="264" cy="39" rx="18" ry="6" strokeWidth="0.7" />
              </g>

              <g stroke="#2C322E" strokeWidth="0.95" fill="#F7F8F7">
                {[
                  { x: 266, y: 84 },
                  { x: 286, y: 74 },
                  { x: 306, y: 84 },
                  { x: 266, y: 106 },
                  { x: 286, y: 96 },
                  { x: 306, y: 106 },
                  { x: 326, y: 94 },
                  { x: 344, y: 82 },
                  { x: 344, y: 106 },
                  { x: 364, y: 94 },
                ].map((hex, i) => (
                  <polygon
                    key={i}
                    points={`${hex.x},${hex.y - 10} ${hex.x + 9},${hex.y - 5} ${hex.x + 9},${hex.y + 5} ${hex.x},${hex.y + 10} ${hex.x - 9},${hex.y + 5} ${hex.x - 9},${hex.y - 5}`}
                  />
                ))}
              </g>

              <g stroke="#1F2421" strokeWidth="1.1">
                <polygon points="44,68 188,68 188,74 44,74" fill="#D5D7D6" />
                <polygon points="44,44 188,44 188,68 44,68" fill="#FFFFFF" opacity="0.5" />
                <line x1="126" y1="68" x2="36" y2="174" strokeWidth="1.6" />
                <line x1="110" y1="36" x2="26" y2="136" strokeWidth="1" />
                <line x1="26" y1="136" x2="26" y2="174" strokeWidth="1" />
                {[0, 1, 2, 3, 4, 5, 6, 7].map((step) => {
                  const sx = 42 + step * 11;
                  const sy = 166 - step * 12;
                  return (
                    <polygon
                      key={step}
                      points={`${sx},${sy} ${sx + 22},${sy} ${sx + 26},${sy + 4} ${sx + 4},${sy + 4}`}
                      fill="#E3E5E4"
                    />
                  );
                })}
              </g>

              <g stroke="#1F2421" strokeWidth="1">
                <rect x="134" y="88" width="76" height="50" fill="#FAFAFA" />
                <rect x="142" y="96" width="38" height="28" fill="#E8EAE9" />
                <polygon points="196,136 254,136 292,166 226,166" fill="#FFFFFF" />
                <polygon points="226,166 292,166 292,176 226,176" fill="#D8DAD9" />
                <polygon points="266,132 322,132 366,164 304,164" fill="#FFFFFF" />
                <polygon points="304,164 366,164 366,174 304,174" fill="#D8DAD9" />
                <polygon points="108,164 198,154 226,180 124,188" fill="#F1F2F1" strokeDasharray="2 1" />
              </g>

              <rect width="420" height="205" fill="url(#sketchFade2)" pointerEvents="none" />
            </svg>
            <figcaption className="mt-1 flex items-center justify-between px-1 text-[10px] text-[#5A675D]">
              <span className="font-medium text-[#263029]">Sketch 02 · Loft &amp; Hex Wall</span>
              <span className="inline-flex items-center gap-1 font-mono-tabular">
                <Compass className="w-3 h-3 text-[#0F4221]" aria-hidden="true" />
                Section
              </span>
            </figcaption>
          </figure>
          </div>
        </div>
      </div>
    </div>
  );
};
