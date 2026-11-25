import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { HERITAGE_TIMELINE } from '../data/malikData';

export const HeritageDepthDeck: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => Math.max(0, i - 1));
  const next = () => setActiveIndex((i) => Math.min(HERITAGE_TIMELINE.length - 1, i + 1));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* Left Decade Rail */}
      <div className="lg:col-span-5 space-y-2.5">
        {HERITAGE_TIMELINE.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.year}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                isActive
                  ? 'bg-[#0F4221] text-white border-[#0F4221] shadow-md'
                  : 'bg-white text-[#1C2720] border-[#DFE2DC] hover:border-[#0F4221]/50'
              }`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-xs font-mono-tabular">
                  <span className={isActive ? 'text-[#F4B41A] font-bold' : 'text-[#0F4221] font-bold'}>
                    {item.year}
                  </span>
                  <span aria-hidden="true" className="opacity-40">·</span>
                  <span className={isActive ? 'text-[#D1E7D8]' : 'text-[#5A675D]'}>
                    {item.era}
                  </span>
                </div>
                <div className="mt-0.5 text-sm font-semibold truncate">{item.title}</div>
              </div>
              <span
                className={`text-xs font-mono-tabular shrink-0 ${
                  isActive ? 'text-[#F4B41A]' : 'text-[#5A675D]'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Pure-2D Layered 3D-Illusion Depth Stack */}
      <div className="lg:col-span-7">
        <div className="relative min-h-[340px] sm:min-h-[320px] flex items-center justify-center pt-4 pb-8 px-2 sm:px-6">
          {HERITAGE_TIMELINE.map((item, idx) => {
            const offset = idx - activeIndex;
            // Only render cards near active for crisp depth illusion
            const absOffset = Math.abs(offset);
            const isActive = offset === 0;
            const translateY = offset * 14;
            const translateX = offset * 18;
            const scale = 1 - absOffset * 0.055;
            const opacity = absOffset > 2 ? 0 : 1 - absOffset * 0.24;
            const zIndex = HERITAGE_TIMELINE.length - absOffset;

            return (
              <div
                key={item.year}
                onClick={() => setActiveIndex(idx)}
                style={{
                  transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
                  opacity,
                  zIndex,
                  pointerEvents: absOffset > 2 ? 'none' : 'auto',
                  boxShadow: isActive
                    ? '6px 6px 0 #0F4221, 0 24px 44px -18px rgba(15, 66, 33, 0.24)'
                    : '3px 3px 0 #CFD5CC',
                }}
                className={`absolute inset-x-2 sm:inset-x-6 rounded-2xl border p-6 sm:p-8 transition-all duration-200 ease-out cursor-pointer ${
                  isActive
                    ? 'bg-white border-[#0F4221]'
                    : 'bg-[#F3F4EF] border-[#D5DAD0]'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E8E1] pb-4">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-bold font-mono-tabular text-[#0F4221]">
                      {item.year}
                    </span>
                    <span className="text-xs font-mono-tabular uppercase tracking-wider text-[#5A675D]">
                      {item.era}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-[#344238]">
                    <MapPin className="w-3.5 h-3.5 text-[#D99B0C]" aria-hidden="true" />
                    <span>{item.cityFocus}</span>
                  </div>
                </div>

                <h3 className="mt-4 text-xl sm:text-2xl font-bold text-[#111914]">
                  {item.title}
                </h3>

                <p className="mt-2.5 text-sm sm:text-base text-[#344238] leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-5 pt-4 border-t border-[#E5E8E1] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="block text-[#5A675D] uppercase tracking-wider text-[11px]">
                      Benchmark Milestone
                    </span>
                    <span className="mt-0.5 block font-semibold font-mono-tabular text-[#0F4221]">
                      {item.milestoneMetric}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[#5A675D] uppercase tracking-wider text-[11px]">
                      Engineering Fleet & Tooling
                    </span>
                    <span className="mt-0.5 block font-semibold text-[#111914]">
                      {item.keyArtifact}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deck Controls */}
        <div className="mt-4 flex items-center justify-between px-2 sm:px-6">
          <div className="text-xs font-mono-tabular text-[#5A675D]">
            Milestone {String(activeIndex + 1).padStart(2, '0')} of{' '}
            {String(HERITAGE_TIMELINE.length).padStart(2, '0')} · 47 Years Continuous Operation
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prev}
              disabled={activeIndex === 0}
              aria-label="Previous milestone"
              className="rounded-lg border border-[#CFD5CC] bg-white p-2 text-[#111914] hover:border-[#0F4221] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={next}
              disabled={activeIndex === HERITAGE_TIMELINE.length - 1}
              aria-label="Next milestone"
              className="rounded-lg border border-[#CFD5CC] bg-white p-2 text-[#111914] hover:border-[#0F4221] disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
