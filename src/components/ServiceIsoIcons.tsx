import React from 'react';

export type EngineeringServiceId =
  | 'interior-design'
  | 'construction-mgmt'
  | 'engineers'
  | 'architecture'
  | 'structural-analysis'
  | 'urban-planning'
  | 'mep-design'
  | 'infrastructure-consultancy'
  | 'renovation-works'
  | 'demolish-works'
  | 'geotechnical'
  | 'concrete-tech'
  | 'steel-structures'
  | 'transportation'
  | 'environmental'
  | 'water-resources'
  | 'hydraulics'
  | 'surveying';

interface ServiceIsoIconProps {
  id: EngineeringServiceId;
}

export const ServiceIsoIcon: React.FC<ServiceIsoIconProps> = ({ id }) => {
  switch (id) {
    case 'interior-design':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <polygon points="44,12 74,26 44,40 14,26" fill="#F8F7F4" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="14,26 44,40 44,64 14,50" fill="#E5E7DF" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="44,40 74,26 74,50 44,64" fill="#D5DAD0" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="44,40 74,50 44,64 14,50" fill="#F3E5C8" stroke="#0F4221" strokeWidth="1.1" />
          <polygon points="22,42 36,48 36,54 22,48" fill="#8C5828" stroke="#0F4221" strokeWidth="1" />
          <polygon points="50,46 64,40 64,46 50,52" fill="#0F4221" stroke="#0A2E17" strokeWidth="1" />
          <line x1="44" y1="16" x2="44" y2="27" stroke="#0F4221" strokeWidth="1.1" />
          <ellipse cx="44" cy="29" rx="7" ry="3" fill="#F4B41A" stroke="#0F4221" strokeWidth="1" />
        </svg>
      );

    case 'construction-mgmt':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <line x1="20" y1="14" x2="20" y2="62" stroke="#D99B0C" strokeWidth="3" />
          <line x1="12" y1="20" x2="52" y2="20" stroke="#D99B0C" strokeWidth="3" />
          <rect x="34" y="28" width="38" height="28" rx="3" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1.4" />
          <rect x="38" y="34" width="16" height="4" rx="1" fill="#0F4221" />
          <rect x="44" y="41" width="22" height="4" rx="1" fill="#F4B41A" />
          <rect x="40" y="48" width="18" height="4" rx="1" fill="#60A5FA" />
          <polygon points="28,58 76,58 80,64 24,64" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.2" />
        </svg>
      );

    case 'engineers':
    case 'surveying':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <line x1="28" y1="38" x2="18" y2="66" stroke="#0F4221" strokeWidth="2" />
          <line x1="28" y1="38" x2="28" y2="66" stroke="#0F4221" strokeWidth="2" />
          <line x1="28" y1="38" x2="38" y2="66" stroke="#0F4221" strokeWidth="2" />
          <rect x="21" y="24" width="14" height="14" rx="2" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.3" />
          <circle cx="28" cy="31" r="3" fill="#0F4221" />
          <polygon points="44,54 78,46 80,64 46,70" fill="#D9E8C8" stroke="#0F4221" strokeWidth="1.2" />
          <path d="M52,58 Q62,53 72,58" fill="none" stroke="#0F4221" strokeWidth="1" />
          <path d="M50,28 L72,28 L66,18 L56,18 Z" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.2" />
          <line x1="47" y1="28" x2="75" y2="28" stroke="#0F4221" strokeWidth="1.8" />
        </svg>
      );

    case 'architecture':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          {/* Isometric architectural volume & stepped terrace */}
          <polygon points="44,12 72,26 44,40 16,26" fill="#E6EFE4" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="16,26 44,40 44,66 16,52" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.2" />
          <polygon points="44,40 72,26 72,52 44,66" fill="#DCE8D2" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="24,36 36,42 36,56 24,50" fill="#93C5FD" stroke="#F4B41A" strokeWidth="1" />
          <polygon points="52,42 64,36 64,50 52,56" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1" />
          {/* Drafting set-square */}
          <polygon points="54,14 78,24 54,24" fill="#F4B41A" opacity="0.9" stroke="#0F4221" strokeWidth="1.1" />
        </svg>
      );

    case 'structural-analysis':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <polygon points="44,10 68,20 44,30 20,20" fill="#DBEAFE" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="20,20 44,30 44,68 20,58" fill="#93C5FD" opacity="0.65" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="44,30 68,20 68,58 44,68" fill="#60A5FA" opacity="0.55" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="20,48 44,58 44,68 20,58" fill="#F4B41A" opacity="0.85" stroke="#0F4221" strokeWidth="1" />
          <polygon points="44,58 68,48 68,58 44,68" fill="#EA580C" opacity="0.7" stroke="#0F4221" strokeWidth="1" />
          {[1, 2, 3].map((r) => (
            <g key={r}>
              <line x1="20" y1={20 + r * 12} x2="44" y2={30 + r * 12} stroke="#0F4221" strokeWidth="0.9" />
              <line x1="44" y1={30 + r * 12} x2="68" y2={20 + r * 12} stroke="#0F4221" strokeWidth="0.9" />
            </g>
          ))}
          <line x1="32" y1="25" x2="32" y2="63" stroke="#0F4221" strokeWidth="0.9" />
          <line x1="56" y1="25" x2="56" y2="63" stroke="#0F4221" strokeWidth="0.9" />
        </svg>
      );

    case 'urban-planning':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <polygon points="44,24 78,42 44,62 10,42" fill="#DCE8D2" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="22,26 34,32 34,48 22,42" fill="#0F4221" stroke="#0A2E17" strokeWidth="1" />
          <polygon points="34,32 44,26 44,42 34,48" fill="#1C5B32" stroke="#0A2E17" strokeWidth="1" />
          <polygon points="46,16 58,22 58,46 46,40" fill="#0F4221" stroke="#0A2E17" strokeWidth="1" />
          <polygon points="58,22 68,16 68,40 58,46" fill="#F4B41A" stroke="#0A2E17" strokeWidth="1" />
          <polygon points="32,44 42,49 42,57 32,52" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1" />
        </svg>
      );

    case 'mep-design':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          {/* HVAC duct + Electrical panel + Plumbing pipework */}
          <rect x="14" y="18" width="44" height="12" rx="2" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.2" />
          <line x1="24" y1="18" x2="24" y2="30" stroke="#0F4221" strokeWidth="1" />
          <line x1="42" y1="18" x2="42" y2="30" stroke="#0F4221" strokeWidth="1" />
          {/* Electrical distribution panel with bolt */}
          <rect x="46" y="34" width="26" height="30" rx="2" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.2" />
          <polygon points="60,40 54,49 59,49 56,58 65,47 60,47" fill="#F4B41A" />
          {/* Pressurized water pipe + valve */}
          <rect x="12" y="46" width="30" height="8" rx="2" fill="#60A5FA" stroke="#0F4221" strokeWidth="1.2" />
          <circle cx="26" cy="40" r="6" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1.2" />
          <line x1="26" y1="40" x2="29" y2="37" stroke="#D99B0C" strokeWidth="1.5" />
        </svg>
      );

    case 'infrastructure-consultancy':
    case 'steel-structures':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <polygon points="10,48 74,24 80,29 16,53" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.3" />
          <path d="M14,48 Q45,10 76,26" fill="none" stroke="#0F4221" strokeWidth="2.2" />
          <path d="M18,50 Q48,14 78,28" fill="none" stroke="#F4B41A" strokeWidth="1.6" />
          {[28, 40, 52, 64].map((x, i) => (
            <line key={x} x1={x} y1={43 - i * 5} x2={x} y2={28 - (i === 1 || i === 2 ? 4 : 0)} stroke="#0F4221" strokeWidth="1.1" />
          ))}
          <rect x="38" y="45" width="12" height="22" fill="#94A3B8" stroke="#0F4221" strokeWidth="1.2" />
        </svg>
      );

    case 'renovation-works':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          {/* Isometric structure upgrade: existing concrete block + gold/green retrofit framing */}
          <polygon points="44,18 70,30 44,42 18,30" fill="#E2E8F0" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="18,30 44,42 44,64 18,52" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="44,42 70,30 70,52 44,64" fill="#94A3B8" stroke="#0F4221" strokeWidth="1.2" />
          {/* New facade & glazing overlay */}
          <polygon points="48,38 66,30 66,46 48,54" fill="#DBEAFE" stroke="#F4B41A" strokeWidth="1.4" />
          {/* Finishing roller / trowel indicator */}
          <rect x="24" y="10" width="20" height="8" rx="2" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.2" />
          <path d="M44,14 L52,14 L52,22" fill="none" stroke="#0F4221" strokeWidth="1.8" />
        </svg>
      );

    case 'demolish-works':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          {/* Controlled dismantling boom + concrete slab sections */}
          <polygon points="14,56 46,66 74,56 42,46" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.2" />
          {/* Stepped concrete blocks being cleared */}
          <polygon points="42,36 58,42 58,56 42,50" fill="#94A3B8" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="58,42 70,36 70,50 58,56" fill="#64748B" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="42,36 54,30 70,36 58,42" fill="#E2E8F0" stroke="#0F4221" strokeWidth="1.2" />
          {/* Hydraulic breaker arm */}
          <line x1="16" y1="54" x2="26" y2="20" stroke="#D99B0C" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="26" y1="20" x2="46" y2="28" stroke="#D99B0C" strokeWidth="3" strokeLinecap="round" />
          <polygon points="44,26 52,32 45,35" fill="#0F4221" />
        </svg>
      );

    case 'geotechnical':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <polygon points="44,24 74,38 44,52 14,38" fill="#B7D0A0" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="14,38 44,52 44,70 14,56" fill="#C49A6C" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="44,52 74,38 74,56 44,70" fill="#8C6239" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="36,16 52,16 52,58 36,58" fill="#9CA3A8" stroke="#0F4221" strokeWidth="1.3" />
          <polygon points="28,50 60,50 60,58 28,58" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.2" />
        </svg>
      );

    case 'concrete-tech':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <path d="M18,22 L18,60 C18,66 44,66 44,60 L44,22 Z" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.3" />
          <ellipse cx="31" cy="22" rx="13" ry="5" fill="#E2E8F0" stroke="#0F4221" strokeWidth="1.3" />
          <g stroke="#0F4221" strokeWidth="1.2">
            <line x1="50" y1="30" x2="76" y2="20" />
            <line x1="50" y1="42" x2="76" y2="32" />
            <line x1="50" y1="54" x2="76" y2="44" />
            <line x1="54" y1="24" x2="54" y2="62" />
            <line x1="64" y1="20" x2="64" y2="58" />
            <line x1="74" y1="16" x2="74" y2="54" />
          </g>
        </svg>
      );

    case 'transportation':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <polygon points="44,14 78,34 44,54 10,34" fill="#A7C98F" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="18,46 62,20 70,25 26,51" fill="#334139" stroke="#0F4221" strokeWidth="1.1" />
          <polygon points="22,22 66,48 58,53 14,27" fill="#334139" stroke="#0F4221" strokeWidth="1.1" />
          <line x1="22" y1="48" x2="66" y2="22" stroke="#F4B41A" strokeWidth="1.4" strokeDasharray="4 3" />
          <line x1="18" y1="25" x2="62" y2="50" stroke="#F4B41A" strokeWidth="1.4" strokeDasharray="4 3" />
        </svg>
      );

    case 'environmental':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <ellipse cx="30" cy="48" rx="18" ry="10" fill="#93C5FD" stroke="#0F4221" strokeWidth="1.3" />
          <ellipse cx="58" cy="36" rx="16" ry="9" fill="#60A5FA" stroke="#0F4221" strokeWidth="1.3" />
          <line x1="14" y1="48" x2="46" y2="48" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="22,16 38,22 38,34 22,28" fill="#E2E8F0" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="38,22 48,18 48,30 38,34" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.2" />
        </svg>
      );

    case 'water-resources':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <polygon points="12,34 44,16 74,30 42,48" fill="#60A5FA" stroke="#0F4221" strokeWidth="1.2" />
          <polygon points="16,38 56,56 56,68 16,50" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.3" />
          <polygon points="56,56 76,44 76,56 56,68" fill="#94A3B8" stroke="#0F4221" strokeWidth="1.3" />
          {[24, 34, 44].map((x, idx) => (
            <polygon
              key={x}
              points={`${x},${42 + idx * 4} ${x + 6},${45 + idx * 4} ${x + 6},${60 + idx * 2} ${x},${57 + idx * 2}`}
              fill="#93C5FD"
              stroke="#0F4221"
              strokeWidth="1"
            />
          ))}
        </svg>
      );

    case 'hydraulics':
      return (
        <svg viewBox="0 0 88 80" className="w-16 h-14 shrink-0 select-none" aria-hidden="true">
          <rect x="14" y="38" width="54" height="10" rx="2" fill="#94A3B8" stroke="#0F4221" strokeWidth="1.3" />
          <rect x="26" y="34" width="6" height="18" rx="1" fill="#60A5FA" stroke="#0F4221" strokeWidth="1.2" />
          <rect x="52" y="34" width="6" height="18" rx="1" fill="#CBD5E1" stroke="#0F4221" strokeWidth="1.2" />
          <circle cx="41" cy="24" r="9" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1.3" />
          <line x1="41" y1="24" x2="46" y2="19" stroke="#D99B0C" strokeWidth="1.8" />
          <line x1="41" y1="33" x2="41" y2="38" stroke="#0F4221" strokeWidth="2" />
          <path d="M58,48 L58,64" stroke="#94A3B8" strokeWidth="8" />
          <path d="M58,48 L58,64" stroke="#0F4221" strokeWidth="1.3" />
        </svg>
      );
  }
};
