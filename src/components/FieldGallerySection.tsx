import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, Film, X } from 'lucide-react';
import { FIELD_GALLERY, FIELD_VIDEOS, FieldPhotoItem } from '../data/malikData';

export const FieldGallerySection: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') {
        setSelectedIndex((i) => (i === null ? null : (i + 1) % FIELD_GALLERY.length));
      }
      if (e.key === 'ArrowLeft') {
        setSelectedIndex((i) =>
          i === null ? null : (i - 1 + FIELD_GALLERY.length) % FIELD_GALLERY.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedIndex]);

  const activePhoto: FieldPhotoItem | null =
    selectedIndex !== null ? FIELD_GALLERY[selectedIndex] : null;

  return (
    <section id="field-gallery" className="border-b border-[#DFE2DC] bg-[#F8F7F4] py-16 lg:py-20">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#0F4221]">
              On-Site Field Archive · Real Ground Execution
            </p>
            <h2
              className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#111914]"
              style={{ textWrap: 'balance' }}
            >
              Active Site Supervision, Interiors &amp; Structural Execution
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#344238] leading-relaxed">
              Field videos and photographs from our structural slabs, interior fit-outs, site
              surveying, deep foundations, bridges, and engineering inspections across Pakistan.
            </p>
          </div>
          <p className="text-xs text-[#5A675D]">
            Hover for project details · Click any frame to enlarge
          </p>
        </div>

        {/* Compact Lightweight On-Site Video Strip (lazy loaded via poster + preload="none") */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {FIELD_VIDEOS.map((video) => (
            <div
              key={video.id}
              className="rounded-xl border border-[#DCE0D7] bg-white p-3 flex flex-col"
            >
              <div className="relative h-48 sm:h-52 w-full rounded-lg overflow-hidden border border-[#D4D9D0] bg-[#111914] flex items-center justify-center">
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  playsInline
                  preload="none"
                  aria-label={video.title}
                  className="w-full h-full object-contain block"
                />
              </div>
              <div className="pt-3 px-1">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F4221]">
                  <Film className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{video.tag}</span>
                </div>
                <h3 className="mt-1 text-sm font-bold text-[#111914] leading-snug">
                  {video.title}
                </h3>
                <p className="mt-1 text-xs text-[#4B584E] leading-relaxed line-clamp-2">
                  {video.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive Small-Framed Photo Grid with Hover Detail Reveal */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FIELD_GALLERY.map((photo, idx) => {
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className="group relative text-left rounded-xl border border-[#DCE0D7] bg-[#111914] overflow-hidden h-40 sm:h-44 transition-all duration-300 hover:shadow-lg hover:border-[#0F4221] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F4221] cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={`${photo.title} — ${photo.location}`}
                  loading="lazy"
                  decoding="async"
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    photo.focus === 'top'
                      ? 'object-top'
                      : photo.focus === 'upper'
                      ? 'object-[center_20%]'
                      : 'object-center'
                  }`}
                />

                {/* Idle bottom title bar (subtle, hides smoothly on hover) */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent px-2.5 pb-2 pt-7 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0"
                >
                  <div className="text-[11px] font-semibold text-white leading-tight line-clamp-1">
                    {photo.title}
                  </div>
                </div>

                {/* Hover / Focus Project Details Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A160E]/95 via-[#0A160E]/75 to-[#0A160E]/30 p-2.5 flex flex-col justify-between opacity-0 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0">
                  <div className="flex justify-end">
                    <span className="rounded-md bg-white/15 p-1 text-white">
                      <Expand className="w-3 h-3" />
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold text-[#F4B41A] truncate">
                      {photo.location}
                    </div>
                    <div className="mt-0.5 text-xs font-bold text-white leading-snug line-clamp-2">
                      {photo.title}
                    </div>
                    <p className="mt-1 text-[10px] text-[#D1E7D8] leading-snug line-clamp-2">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox Viewer */}
      {activePhoto && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-4xl rounded-2xl bg-[#111914] border border-white/15 overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-white/10 text-white">
              <div>
                <div className="text-xs text-[#F4B41A]">{activePhoto.location}</div>
                <div className="text-sm sm:text-base font-semibold">{activePhoto.title}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIndex(null)}
                aria-label="Close photograph"
                className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center max-h-[70vh]">
              <img
                src={activePhoto.src}
                alt={activePhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={() =>
                  setSelectedIndex(
                    (selectedIndex - 1 + FIELD_GALLERY.length) % FIELD_GALLERY.length
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 p-2.5 text-white hover:bg-[#0F4221] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="Next photograph"
                onClick={() => setSelectedIndex((selectedIndex + 1) % FIELD_GALLERY.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/65 p-2.5 text-white hover:bg-[#0F4221] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-3.5 text-xs sm:text-sm text-[#D1E7D8] flex items-center justify-between gap-4">
              <span>{activePhoto.caption}</span>
              <span className="font-mono-tabular text-xs text-[#9AA598] shrink-0">
                {selectedIndex + 1} / {FIELD_GALLERY.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
