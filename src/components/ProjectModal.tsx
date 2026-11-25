import React, { useEffect } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { LandmarkProject } from '../data/malikData';

interface ProjectModalProps {
  project: LandmarkProject | null;
  onClose: () => void;
  onRequestSimilar: (project: LandmarkProject) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-[#CFD5CC] bg-[#F8F7F4] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#DFE2DC] pb-4">
          <div>
            <div className="text-xs font-medium text-[#0F4221]">
              {project.city}, {project.province} · {project.categoryLabel} · {project.year}
            </div>
            <h3
              id="project-modal-title"
              className="mt-1.5 text-2xl sm:text-3xl font-bold text-[#111914]"
            >
              {project.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close project brief"
            className="rounded-lg border border-[#CFD5CC] bg-white p-2 text-[#263029] hover:bg-[#0F4221] hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-6 rounded-xl border border-[#DFE2DC] bg-white overflow-hidden">
            <img
              src={project.imageSrc}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              className={`w-full h-56 md:h-full object-cover ${
                project.imageFocus === 'top' ? 'object-top' : 'object-center'
              }`}
            />
          </div>
          <div className="md:col-span-6 grid grid-cols-2 gap-3.5">
            <div className="rounded-xl border border-[#DFE2DC] bg-white p-3.5">
              <div className="text-xs text-[#5A675D]">Contract Value</div>
              <div className="mt-1 text-base font-bold font-mono-tabular text-[#0F4221]">
                {project.valuePkr}
              </div>
            </div>
            <div className="rounded-xl border border-[#DFE2DC] bg-white p-3.5">
              <div className="text-xs text-[#5A675D]">Concrete Volume</div>
              <div className="mt-1 text-base font-bold font-mono-tabular text-[#111914]">
                {project.concreteVolume}
              </div>
            </div>
            <div className="rounded-xl border border-[#DFE2DC] bg-white p-3.5">
              <div className="text-xs text-[#5A675D]">Execution Span</div>
              <div className="mt-1 text-base font-bold font-mono-tabular text-[#111914]">
                {project.duration}
              </div>
            </div>
            <div className="rounded-xl border border-[#DFE2DC] bg-white p-3.5">
              <div className="text-xs text-[#5A675D]">Standard</div>
              <div className="mt-1 text-base font-bold text-[#111914]">{project.pecGrade}</div>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-5 text-sm text-[#263029] leading-relaxed">
          <p>{project.summary}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
              <div className="text-xs font-semibold text-[#0F4221]">Site &amp; Ground Challenge</div>
              <p className="mt-1.5 text-sm text-[#344238]">{project.engineeringChallenge}</p>
            </div>
            <div className="rounded-xl border border-[#DFE2DC] bg-white p-4">
              <div className="text-xs font-semibold text-[#0F4221]">Execution Method</div>
              <p className="mt-1.5 text-sm text-[#344238]">{project.solutionDelivered}</p>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold text-[#344238] mb-2">Key Deliverables</div>
            <ul className="space-y-2">
              {project.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-[#1C2720]">
                  <Check className="w-4 h-4 text-[#0F4221] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#DFE2DC] pt-5">
          <span className="text-xs font-mono-tabular text-[#5A675D]">{project.scaleMetric}</span>
          <button
            type="button"
            onClick={() => onRequestSimilar(project)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#0F4221] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A2E17] transition-colors cursor-pointer whitespace-nowrap"
          >
            <span>Request Tender for Similar Scope</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
