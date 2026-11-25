import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { FIELD_GALLERY, FieldPhotoItem } from '../data/malikData';

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
              Active Site Supervision, Pipelines &amp; Pumping Stations
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#344238] leading-relaxed">
              Unfiltered photographs from our active municipal drainage, flyover corridor, earthworks,
              and pumping station sites across Pakistan.
            </p>
          </div>
          <p className="text-xs text-[#5A675D]">Click any photograph to view full size</p>
        </div>

        {/* Editorial Photo Grid: Featured wide shots + balanced field cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FIELD_GALLERY.map((photo, idx) => {
            const isFeatured = idx === 0 || idx === 1;
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => setSelectedIndex(idx)}
                className={`group text-left rounded-xl border border-[#DCE0D7] bg-white overflow-hidden transition-shadow hover:shadow-lg cursor-pointer flex flex-col ${
                  isFeatured && idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`relative w-full overflow-hidden bg-[#E5E8E0] ${
                    isFeatured && idx === 0 ? 'h-72 sm:h-88' : 'h-64 sm:h-72'
                  }`}
                >
                  <img
                    src={photo.src}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
                      photo.focus === 'top' ? 'object-top' : 'object-center'
                    }`}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-80"
                  />
                  <span className="absolute top-3 right-3 rounded-lg bg-black/55 p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Expand className="w-4 h-4" />
                  </span>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-[11px] font-medium text-[#FDE68A]">{photo.location}</div>
                    <div className="mt-0.5 text-base font-bold leading-snug">{photo.title}</div>
                  </div>
                </div>
                <div className="p-4 text-xs sm:text-sm text-[#344238] leading-relaxed">
                  {photo.caption}
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
                referrerPolicy="no-referrer"
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
