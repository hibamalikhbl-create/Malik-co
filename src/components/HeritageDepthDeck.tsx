import React, { useEffect, useRef, useState } from 'react';
import { MapPin, RotateCcw } from 'lucide-react';
import { HERITAGE_TIMELINE } from '../data/malikData';

export const HeritageDepthDeck: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number>(0);
  const [replayNonce, setReplayNonce] = useState<number>(0);
  const [hasEntered, setHasEntered] = useState<boolean>(false);

  // Trigger sequential dot-by-dot timeline animation on scroll-into-view (or manual replay)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setHasEntered(true);
      setVisibleCount(HERITAGE_TIMELINE.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisibleCount(HERITAGE_TIMELINE.length);
      return;
    }

    setVisibleCount(0);
    const timers: number[] = [];
    HERITAGE_TIMELINE.forEach((_, idx) => {
      const t = window.setTimeout(() => {
        setVisibleCount(idx + 1);
      }, 180 + idx * 360);
      timers.push(t);
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [hasEntered, replayNonce]);

  const handleReplay = () => {
    setHasEntered(true);
    setReplayNonce((n) => n + 1);
  };

  const progressRatio = visibleCount / HERITAGE_TIMELINE.length;

  return (
    <div ref={containerRef} className="space-y-6">
      {/* Timeline Header Bar with Dot Progress & Replay */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DFE2DC] pb-4">
        <div className="flex items-center gap-3 text-xs font-mono-tabular text-[#344238]">
          <span className="font-bold text-[#0F4221]">
            {String(visibleCount).padStart(2, '0')} /{' '}
            {String(HERITAGE_TIMELINE.length).padStart(2, '0')} Generations
          </span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            {HERITAGE_TIMELINE.map((item, idx) => {
              const lit = idx < visibleCount;
              return (
                <span
                  key={item.year}
                  className={`inline-block rounded-full transition-all duration-300 ${
                    lit ? 'w-2.5 h-2.5 bg-[#0F4221] ring-2 ring-[#F4B41A]/70' : 'w-2 h-2 bg-[#CFD5CC]'
                  }`}
                />
              );
            })}
          </span>
        </div>

        <button
          type="button"
          onClick={handleReplay}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#CFD5CC] bg-white px-3 py-1.5 text-xs font-medium text-[#1C2720] hover:border-[#0F4221] hover:text-[#0F4221] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          <span>Replay Timeline Dots</span>
        </button>
      </div>

      {/* Animated Dotted Vertical Timeline (Each Generation Shown Once with Isolated Portrait) */}
      <div className="relative pl-8 sm:pl-12 space-y-6">
        {/* Static Dotted Background Track */}
        <div
          aria-hidden="true"
          className="absolute left-[11px] sm:left-[17px] top-6 bottom-6 w-[2px]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #BCC4B8 1.5px, transparent 1.75px)',
            backgroundSize: '2px 10px',
            backgroundRepeat: 'repeat-y',
          }}
        />

        {/* Animated Active Green/Gold Dotted Line */}
        <div
          aria-hidden="true"
          className="absolute left-[11px] sm:left-[17px] top-6 w-[2px] transition-all duration-500 ease-out"
          style={{
            height: `calc(${Math.max(0, Math.min(1, progressRatio)) * 100}% - 48px)`,
            backgroundImage:
              'radial-gradient(circle, #0F4221 1.75px, transparent 2px)',
            backgroundSize: '2px 10px',
            backgroundRepeat: 'repeat-y',
          }}
        />

        {HERITAGE_TIMELINE.map((item, idx) => {
          const isRevealed = idx < visibleCount;
          const isLatest = idx === visibleCount - 1;

          return (
            <article
              key={item.year}
              className={`relative transition-all duration-500 ease-out ${
                isRevealed
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-4 scale-[0.985]'
              }`}
            >
              {/* Animated Timeline Dot */}
              <div
                aria-hidden="true"
                className="absolute -left-8 sm:-left-12 top-7 flex items-center justify-center"
              >
                <span
                  className={`relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-500 ${
                    isRevealed
                      ? 'bg-[#0F4221] border-[#F4B41A] shadow-sm scale-100'
                      : 'bg-white border-[#CFD5CC] scale-75'
                  }`}
                >
                  {isLatest && (
                    <span className="absolute inset-0 rounded-full bg-[#F4B41A]/45 animate-ping" />
                  )}
                  <span className="relative text-[10px] sm:text-[11px] font-mono-tabular font-bold text-white">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </span>
              </div>

              {/* Milestone Card with Clean Background-Removed Portrait */}
              <div className="rounded-2xl border border-[#D4D9CF] bg-white p-5 sm:p-6 extrude-card grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
                {/* Complete Unclipped Generation Portrait Frame */}
                <div className="md:col-span-3 flex justify-center">
                  <div className="relative w-32 h-36 sm:w-36 sm:h-40 rounded-xl border border-[#D4D9CF] bg-[#F5F6F1] overflow-hidden shadow-xs">
                    <img
                      src={item.portraitSrc}
                      alt={`${item.leader} — Generation ${String(idx + 1).padStart(2, '0')}`}
                      decoding="async"
                      className="w-full h-full object-cover object-top select-none"
                    />
                  </div>
                </div>

                {/* Era Heading, Leader & Full Narrative */}
                <div className="md:col-span-9 space-y-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E8E1] pb-2.5">
                    <div>
                      <span className="text-[11px] font-mono-tabular font-bold text-[#D99B0C] uppercase tracking-wider">
                        Generation {String(idx + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0F4221] leading-snug">
                        {item.year} | {item.era}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-[#4B584E]">
                      <MapPin className="w-3.5 h-3.5 text-[#D99B0C]" aria-hidden="true" />
                      <span>{item.cityFocus}</span>
                    </div>
                  </div>

                  <div className="text-base sm:text-lg font-bold text-[#111914]">
                    {item.leader}
                  </div>

                  <p className="text-sm sm:text-[15px] text-[#344238] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
