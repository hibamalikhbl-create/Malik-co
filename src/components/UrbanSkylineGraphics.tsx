import React from 'react';

export type SkylineMotifType = 'tall_short' | 'pedestal_bridge' | 'shops' | 'mixed_district';

interface UrbanCardGraphicProps {
  type: SkylineMotifType;
}

/**
 * Pure 2D Isometric 3D-Illusion Architectural Graphics featuring
 * tall buildings, short buildings, retail shops, and pedestal/pedestrian bridges.
 */
export const UrbanCardGraphic: React.FC<UrbanCardGraphicProps> = ({ type }) => {
  if (type === 'tall_short') {
    return (
      <svg
        viewBox="0 0 320 170"
        className="w-full h-36 select-none"
        role="img"
        aria-label="Isometric 2D 3D-illusion illustration of tall high-rise towers alongside short buildings"
      >
        {/* Base ground plate */}
        <polygon points="160,82 296,136 160,164 24,136" fill="#E6E9E1" stroke="#0F4221" strokeWidth="1.3" />

        {/* Short building (Left) */}
        <polygon points="56,102 96,118 96,142 56,126" fill="#F4F5F0" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="96,118 128,104 128,128 96,142" fill="#CFD5CC" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="56,102 88,88 128,104 96,118" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.3" />
        <line x1="64" y1="114" x2="88" y2="124" stroke="#0F4221" strokeWidth="2.2" />
        <line x1="104" y1="123" x2="120" y2="116" stroke="#0F4221" strokeWidth="2.2" />

        {/* Tall High-Rise Tower (Center) */}
        <polygon points="122,36 166,54 166,148 122,130" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.5" />
        <polygon points="166,54 210,36 210,130 166,148" fill="#1C5B32" stroke="#0A2E17" strokeWidth="1.5" />
        <polygon points="166,18 210,36 166,54 122,36" fill="#F4B41A" stroke="#0A2E17" strokeWidth="1.5" />
        {/* Tall tower glass floors */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <line x1="128" y1={50 + i * 16} x2="160" y2={63 + i * 16} stroke="#93C5FD" strokeWidth="2.5" />
            <line x1="172" y1={63 + i * 16} x2="204" y2={50 + i * 16} stroke="#DBEAFE" strokeWidth="2.5" />
          </g>
        ))}

        {/* Medium-Short Annex (Right) */}
        <polygon points="214,88 244,100 244,132 214,120" fill="#ECEEE8" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="244,100 272,88 272,120 244,132" fill="#C4CBC0" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="244,76 272,88 244,100 214,88" fill="#D99B0C" stroke="#0F4221" strokeWidth="1.3" />
      </svg>
    );
  }

  if (type === 'pedestal_bridge') {
    return (
      <svg
        viewBox="0 0 320 170"
        className="w-full h-36 select-none"
        role="img"
        aria-label="Isometric 2D 3D-illusion illustration of a pedestal pedestrian bridge spanning a roadway"
      >
        {/* Base terrain & asphalt road below */}
        <polygon points="160,82 298,136 160,164 22,136" fill="#E5E8E0" stroke="#0F4221" strokeWidth="1.2" />
        <polygon points="94,148 214,100 246,113 126,161" fill="#2A342D" stroke="#0F4221" strokeWidth="1.2" />
        <line x1="112" y1="154" x2="229" y2="107" stroke="#F4B41A" strokeWidth="1.8" strokeDasharray="6 5" />

        {/* Left Pedestal Pier & Staircase Tower */}
        <polygon points="58,76 80,85 80,126 58,117" fill="#D4D9CF" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="80,85 98,77 98,118 80,126" fill="#AEB6AA" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="58,76 76,68 98,77 80,85" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.3" />
        {/* Access steps */}
        <polyline points="44,122 50,122 50,114 56,114 56,106 62,106" fill="none" stroke="#0F4221" strokeWidth="1.5" />

        {/* Right Pedestal Pier & Staircase Tower */}
        <polygon points="222,74 244,83 244,124 222,115" fill="#D4D9CF" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="244,83 262,75 262,116 244,124" fill="#AEB6AA" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="222,74 240,66 262,75 244,83" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.3" />

        {/* Elevated Pedestal / Pedestrian Bridge Span */}
        <polygon points="74,64 242,64 256,73 88,73" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.4" />
        <polygon points="88,73 256,73 256,82 88,82" fill="#C6CCC3" stroke="#0F4221" strokeWidth="1.4" />
        {/* Bridge Steel Truss / Guardrail Arch */}
        <path d="M88,64 Q172,30 256,64" fill="none" stroke="#D99B0C" strokeWidth="2.5" />
        {[106, 130, 154, 178, 202, 226].map((x) => (
          <line key={x} x1={x} y1="64" x2={x} y2="49" stroke="#0F4221" strokeWidth="1.4" />
        ))}
        <line x1="88" y1="56" x2="256" y2="56" stroke="#0F4221" strokeWidth="1.3" />
      </svg>
    );
  }

  if (type === 'shops') {
    return (
      <svg
        viewBox="0 0 320 170"
        className="w-full h-36 select-none"
        role="img"
        aria-label="Isometric 2D 3D-illusion illustration of retail shops and a commercial plaza row"
      >
        {/* Paved Plaza Forecourt */}
        <polygon points="160,84 294,136 160,164 26,136" fill="#E8EAE3" stroke="#0F4221" strokeWidth="1.2" />

        {/* Two-Storey Commercial Shop Block */}
        <polygon points="64,66 172,110 172,148 64,104" fill="#F7F7F3" stroke="#0F4221" strokeWidth="1.4" />
        <polygon points="172,110 252,76 252,114 172,148" fill="#D5DBD1" stroke="#0F4221" strokeWidth="1.4" />
        {/* Roof Parapet */}
        <polygon points="64,66 144,32 252,76 172,110" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.4" />
        <polygon points="82,66 144,40 234,76 172,102" fill="none" stroke="#F4B41A" strokeWidth="1.4" />

        {/* Shop Signboard Fascia */}
        <polygon points="64,82 172,126 172,132 64,88" fill="#0F4221" />

        {/* 3 Retail Shopfront Glass Bays & Striped Awnings */}
        {[0, 1, 2].map((b) => {
          const dx = b * 34;
          const dy = b * 14;
          return (
            <g key={b}>
              {/* Shop Glass Window */}
              <polygon
                points={`${72 + dx},${94 + dy} ${96 + dx},${104 + dy} ${96 + dx},${118 + dy} ${72 + dx},${108 + dy}`}
                fill="#93C5FD"
                stroke="#0F4221"
                strokeWidth="1.2"
              />
              {/* Angled Shop Awning */}
              <polygon
                points={`${68 + dx},${89 + dy} ${99 + dx},${102 + dy} ${93 + dx},${109 + dy} ${62 + dx},${96 + dy}`}
                fill={b % 2 === 0 ? '#F4B41A' : '#D99B0C'}
                stroke="#0F4221"
                strokeWidth="1.2"
              />
              {/* Upper Floor Office Windows */}
              <line
                x1={73 + dx}
                y1={77 + dy}
                x2={94 + dx}
                y2={86 + dy}
                stroke="#0F4221"
                strokeWidth="2.5"
              />
            </g>
          );
        })}

        {/* Side Corner Shop Display */}
        <polygon points="184,116 210,105 210,126 184,137" fill="#93C5FD" stroke="#0F4221" strokeWidth="1.2" />
        <polygon points="220,101 242,92 242,113 220,122" fill="#93C5FD" stroke="#0F4221" strokeWidth="1.2" />
      </svg>
    );
  }

  // mixed_district: combines tall tower, short building, shops, and a connecting pedestal bridge
  return (
    <svg
      viewBox="0 0 320 170"
      className="w-full h-36 select-none"
      role="img"
      aria-label="Isometric 2D 3D-illusion urban district showing tall buildings, short shops, and connecting pedestal bridge"
    >
      {/* City Block Base */}
      <polygon points="160,84 296,136 160,164 24,136" fill="#E6E9E1" stroke="#0F4221" strokeWidth="1.2" />
      {/* Dividing Street */}
      <polygon points="118,154 218,104 238,112 138,162" fill="#2E3831" />

      {/* Left: Tall Tower */}
      <polygon points="56,36 96,52 96,126 56,110" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.4" />
      <polygon points="96,52 130,37 130,111 96,126" fill="#1C5B32" stroke="#0A2E17" strokeWidth="1.4" />
      <polygon points="90,21 130,37 96,52 56,36" fill="#F4B41A" stroke="#0A2E17" strokeWidth="1.4" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="62" y1={49 + i * 15} x2="90" y2={60 + i * 15} stroke="#93C5FD" strokeWidth="2.2" />
      ))}

      {/* Right: Short Retail Shop Complex */}
      <polygon points="196,92 238,109 238,136 196,119" fill="#F7F7F3" stroke="#0F4221" strokeWidth="1.3" />
      <polygon points="238,109 272,94 272,121 238,136" fill="#CED5CB" stroke="#0F4221" strokeWidth="1.3" />
      <polygon points="196,92 230,77 272,94 238,109" fill="#D99B0C" stroke="#0F4221" strokeWidth="1.3" />
      {/* Shop awnings */}
      <polygon points="198,106 234,121 229,126 193,111" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.1" />

      {/* Connecting Pedestal Footbridge over Street */}
      <polygon points="116,78 214,88 220,94 122,84" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.2" />
      <polygon points="122,84 220,94 220,100 122,90" fill="#C6CCC3" stroke="#0F4221" strokeWidth="1.2" />
      <path d="M120,78 Q170,58 218,88" fill="none" stroke="#F4B41A" strokeWidth="2" />
      {/* Bridge pedestal column */}
      <rect x="166" y="92" width="7" height="36" fill="#AEB6AA" stroke="#0F4221" strokeWidth="1.2" />
    </svg>
  );
};

/**
 * Wide 2D Isometric 3D-Illusion Urban Panorama Banner showcasing
 * Tall High-Rises, Short Civic Buildings, Commercial Retail Shops, and Pedestal Bridges.
 */
export const UrbanSkylinePanorama: React.FC = () => {
  return (
    <div
      className="rounded-2xl border border-[#CFD5CC] bg-white p-3 sm:p-4 overflow-hidden"
      style={{
        boxShadow: '6px 6px 0 #CFD5CC, 0 20px 38px -18px rgba(15, 66, 33, 0.16)',
      }}
    >
      <svg
        viewBox="0 0 1120 260"
        className="w-full h-auto block select-none"
        role="img"
        aria-label="2D isometric 3D-illusion Pakistani architectural panorama showing tall high-rise towers, short residential and civic buildings, street-level shops, and a pedestal pedestrian bridge"
      >
        <defs>
          <pattern id="skylineIsoGrid" width="36" height="20.78" patternUnits="userSpaceOnUse">
            <path
              d="M 18 0 L 36 10.39 L 18 20.78 L 0 10.39 Z"
              fill="none"
              stroke="rgba(15, 66, 33, 0.06)"
              strokeWidth="0.8"
            />
          </pattern>
        </defs>

        <rect width="1120" height="260" rx="12" fill="#F5F6F1" />
        <rect width="1120" height="260" rx="12" fill="url(#skylineIsoGrid)" />

        {/* Ground Roadway & Sidewalk Datum */}
        <polygon points="40,218 1080,218 1040,244 80,244" fill="#DFE3DA" stroke="#0F4221" strokeWidth="1.2" />
        <polygon points="80,224 1040,224 1020,238 100,238" fill="#2A342D" />
        <line x1="120" y1="231" x2="1000" y2="231" stroke="#F4B41A" strokeWidth="1.8" strokeDasharray="14 12" />

        {/* 1. SHORT CIVIC BUILDING (Far Left) */}
        <g transform="translate(65, 118)">
          <polygon points="0,34 64,54 64,104 0,84" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="64,54 114,34 114,84 64,104" fill="#CFD5CC" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="0,34 50,14 114,34 64,54" fill="#D99B0C" stroke="#0F4221" strokeWidth="1.4" />
          <rect x="14" y="54" width="14" height="18" transform="skewY(17)" fill="#93C5FD" stroke="#0F4221" strokeWidth="1.1" />
          <rect x="38" y="54" width="14" height="18" transform="skewY(17)" fill="#93C5FD" stroke="#0F4221" strokeWidth="1.1" />
          <text x="8" y="118" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#0F4221">
            SHORT CIVIC BLOCK
          </text>
        </g>

        {/* 2. TALL HIGH-RISE CORPORATE TOWER (Left-Center) */}
        <g transform="translate(205, 18)">
          <polygon points="0,32 54,54 54,204 0,182" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.5" />
          <polygon points="54,54 108,32 108,182 54,204" fill="#1C5B32" stroke="#0A2E17" strokeWidth="1.5" />
          <polygon points="54,10 108,32 54,54 0,32" fill="#F4B41A" stroke="#0A2E17" strokeWidth="1.5" />
          {/* Core penthouse */}
          <polygon points="34,14 54,22 74,14 54,6" fill="#FDE68A" stroke="#0A2E17" strokeWidth="1.2" />
          {/* Curtain wall levels */}
          {[0, 1, 2, 3, 4, 5, 6].map((f) => (
            <g key={f}>
              <line x1="8" y1={50 + f * 20} x2="46" y2={65 + f * 20} stroke="#93C5FD" strokeWidth="3.2" />
              <line x1="62" y1={65 + f * 20} x2="100" y2={50 + f * 20} stroke="#DBEAFE" strokeWidth="3.2" />
            </g>
          ))}
          <text x="6" y="218" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#0F4221">
            TALL RCC TOWER
          </text>
        </g>

        {/* 3. RETAIL SHOPS ROW WITH AWNINGS (Center) */}
        <g transform="translate(350, 126)">
          <polygon points="0,28 132,56 132,96 0,68" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="132,56 176,36 176,76 132,96" fill="#CED5CB" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="0,28 44,8 176,36 132,56" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.4" />
          {/* Shop fascia band */}
          <polygon points="0,40 132,68 132,75 0,47" fill="#0F4221" />
          {/* 3 Storefronts + Awnings */}
          {[0, 1, 2].map((s) => (
            <g key={s} transform={`translate(${s * 42}, ${s * 9})`}>
              <polygon points="8,53 38,59 38,76 8,70" fill="#93C5FD" stroke="#0F4221" strokeWidth="1.1" />
              <polygon points="5,48 41,56 35,64 -1,56" fill={s === 1 ? '#D99B0C' : '#F4B41A'} stroke="#0F4221" strokeWidth="1.1" />
            </g>
          ))}
          <text x="16" y="110" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#0F4221">
            COMMERCIAL SHOPS
          </text>
        </g>

        {/* 4. ELEVATED PEDESTAL / PEDESTRIAN BRIDGE (Center-Right) */}
        <g transform="translate(555, 92)">
          {/* Left & Right Pedestal Piers + Stairs */}
          <polygon points="16,44 36,52 36,128 16,120" fill="#CFD5CC" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="36,52 52,45 52,121 36,128" fill="#AEB6AA" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="194,44 214,52 214,128 194,120" fill="#CFD5CC" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="214,52 230,45 230,121 214,128" fill="#AEB6AA" stroke="#0F4221" strokeWidth="1.4" />
          {/* Center Support Pedestal */}
          <polygon points="112,56 128,62 128,128 112,122" fill="#B5BEB1" stroke="#0F4221" strokeWidth="1.3" />

          {/* Bridge Deck & Arch Truss */}
          <polygon points="8,36 224,36 238,46 22,46" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.4" />
          <polygon points="22,46 238,46 238,56 22,56" fill="#D5DBD1" stroke="#0F4221" strokeWidth="1.4" />
          <path d="M22,36 Q130,-4 238,36" fill="none" stroke="#F4B41A" strokeWidth="3" />
          {[48, 76, 104, 132, 160, 188, 212].map((vx) => (
            <line key={vx} x1={vx} y1="36" x2={vx} y2="17" stroke="#0F4221" strokeWidth="1.4" />
          ))}
          <line x1="22" y1="27" x2="238" y2="27" stroke="#0F4221" strokeWidth="1.4" />
          {/* Stair stringers */}
          <polyline points="0,122 8,122 8,112 16,112 16,102" fill="none" stroke="#0F4221" strokeWidth="1.6" />
          <text x="58" y="144" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#0F4221">
            PEDESTAL BRIDGE
          </text>
        </g>

        {/* 5. TALL SECONDARY TOWER & SHORT PAVILION (Far Right) */}
        <g transform="translate(830, 40)">
          {/* Tall slim tower */}
          <polygon points="0,28 46,48 46,182 0,162" fill="#184E2B" stroke="#0A2E17" strokeWidth="1.4" />
          <polygon points="46,48 90,28 90,162 46,182" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.4" />
          <polygon points="45,8 90,28 46,48 0,28" fill="#F4B41A" stroke="#0A2E17" strokeWidth="1.4" />
          {[0, 1, 2, 3, 4].map((f) => (
            <line key={f} x1="8" y1={44 + f * 22} x2="38" y2={57 + f * 22} stroke="#DBEAFE" strokeWidth="2.8" />
          ))}
          {/* Short Corner Shop Pavilion */}
          <polygon points="104,114 148,132 148,180 104,162" fill="#FFFFFF" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="148,132 186,114 186,162 148,180" fill="#CFD5CC" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="104,114 142,96 186,114 148,132" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.4" />
          <polygon points="108,134 142,148 142,164 108,150" fill="#93C5FD" stroke="#0F4221" strokeWidth="1.1" />
          <text x="12" y="196" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="600" fill="#0F4221">
            HIGH-RISE &amp; SHOPS
          </text>
        </g>
      </svg>
    </div>
  );
};
