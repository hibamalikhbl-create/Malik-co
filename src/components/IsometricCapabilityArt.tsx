import React from 'react';

interface IsometricCapabilityArtProps {
  type: 'culverts' | 'highrise' | 'highways' | 'industrial';
  compact?: boolean;
}

export const IsometricCapabilityArt: React.FC<IsometricCapabilityArtProps> = ({
  type,
  compact = false,
}) => {
  const heightClass = compact ? 'h-40' : 'h-48';

  if (type === 'culverts') {
    return (
      <svg
        viewBox="0 0 360 200"
        className={`w-full ${heightClass} select-none`}
        role="img"
        aria-label="Isometric 2D cross-section of reinforced concrete storm culvert and excavation trench"
      >
        {/* Isometric earth block */}
        <polygon points="180,32 320,96 180,160 40,96" fill="#E8EAE3" stroke="#0F4221" strokeWidth="1.5" />
        <polygon points="40,96 180,160 180,186 40,122" fill="#CBD2C7" stroke="#0F4221" strokeWidth="1.5" />
        <polygon points="180,160 320,96 320,122 180,186" fill="#B5BEB1" stroke="#0F4221" strokeWidth="1.5" />

        {/* Sub-base trench cut */}
        <polygon points="180,54 274,97 180,140 86,97" fill="#D8DDD3" stroke="#0F4221" strokeWidth="1.2" strokeDasharray="3 3" />
        <polygon points="98,97 180,60 262,97 180,134" fill="#9AA598" opacity="0.55" />

        {/* Twin 3D-illusion precast concrete culvert pipes */}
        <g transform="translate(0, -4)">
          {/* Pipe 1 body */}
          <path
            d="M118,92 L205,52 C214,48 226,56 226,69 C226,80 218,89 209,93 L122,133 Z"
            fill="#9BA3A8"
            stroke="#0F4221"
            strokeWidth="1.5"
          />
          {/* Pipe highlight ridge */}
          <line x1="122" y1="96" x2="210" y2="56" stroke="#E5E9EC" strokeWidth="2.5" opacity="0.7" />
          {/* Bell collar */}
          <ellipse cx="122" cy="112" rx="14" ry="22" transform="rotate(-12 122 112)" fill="#BAC1C6" stroke="#0F4221" strokeWidth="1.5" />
          <ellipse cx="122" cy="112" rx="9" ry="15" transform="rotate(-12 122 112)" fill="#1C2720" stroke="#0F4221" strokeWidth="1.2" />
          {/* Water flow glint */}
          <path d="M118,120 Q122,124 127,120" fill="none" stroke="#60A5FA" strokeWidth="2" />
        </g>

        {/* Second parallel culvert */}
        <g transform="translate(36, 16)">
          <path
            d="M118,92 L205,52 C214,48 226,56 226,69 C226,80 218,89 209,93 L122,133 Z"
            fill="#879096"
            stroke="#0F4221"
            strokeWidth="1.5"
          />
          <line x1="122" y1="96" x2="210" y2="56" stroke="#D1D7DB" strokeWidth="2" opacity="0.6" />
          <ellipse cx="122" cy="112" rx="14" ry="22" transform="rotate(-12 122 112)" fill="#AEB6BB" stroke="#0F4221" strokeWidth="1.5" />
          <ellipse cx="122" cy="112" rx="9" ry="15" transform="rotate(-12 122 112)" fill="#1C2720" stroke="#0F4221" strokeWidth="1.2" />
        </g>

        {/* Concrete headwall & excavator bucket marker */}
        <polygon points="222,42 248,54 248,86 222,74" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.5" />
        <polygon points="222,42 238,34 264,46 248,54" fill="#FCD34D" stroke="#0F4221" strokeWidth="1.5" />
        <polygon points="248,54 264,46 264,78 248,86" fill="#C98D0A" stroke="#0F4221" strokeWidth="1.5" />

        {/* Technical elevation lines */}
        <line x1="32" y1="96" x2="32" y2="122" stroke="#D99B0C" strokeWidth="1.5" />
        <line x1="28" y1="96" x2="36" y2="96" stroke="#D99B0C" strokeWidth="1.5" />
        <line x1="28" y1="122" x2="36" y2="122" stroke="#D99B0C" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === 'highrise') {
    return (
      <svg
        viewBox="0 0 360 200"
        className={`w-full ${heightClass} select-none`}
        role="img"
        aria-label="Isometric 2D 3D-illusion drawing of a multi-storey RCC commercial tower"
      >
        {/* Podium base */}
        <polygon points="180,118 286,162 180,192 74,162" fill="#DFE3DA" stroke="#0F4221" strokeWidth="1.4" />
        {/* Main Tower Left Face */}
        <polygon points="116,52 180,82 180,174 116,144" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.5" />
        {/* Main Tower Right Face */}
        <polygon points="180,82 244,52 244,144 180,174" fill="#1B5A31" stroke="#0A2E17" strokeWidth="1.5" />
        {/* Roof Slab */}
        <polygon points="180,22 244,52 180,82 116,52" fill="#F4B41A" stroke="#0A2E17" strokeWidth="1.5" />
        {/* Core penthouse */}
        <polygon points="180,12 204,24 180,36 156,24" fill="#FDE68A" stroke="#0A2E17" strokeWidth="1.2" />
        <polygon points="156,24 180,36 180,52 156,40" fill="#D99B0C" stroke="#0A2E17" strokeWidth="1.2" />
        <polygon points="180,36 204,24 204,40 180,52" fill="#B47E06" stroke="#0A2E17" strokeWidth="1.2" />

        {/* Isometric Curtain-Wall Floor Lines */}
        {[0, 1, 2, 3, 4].map((floor) => {
          const yOff = floor * 17;
          return (
            <g key={floor}>
              <line
                x1="122"
                y1={66 + yOff}
                x2="174"
                y2={90 + yOff}
                stroke="#93C5FD"
                strokeWidth="2.4"
                opacity="0.78"
              />
              <line
                x1="186"
                y1={90 + yOff}
                x2="238"
                y2={66 + yOff}
                stroke="#DBEAFE"
                strokeWidth="2.4"
                opacity="0.88"
              />
            </g>
          );
        })}

        {/* Adjacent pitched annex */}
        <polygon points="84,116 116,131 116,154 84,139" fill="#E8EAE3" stroke="#0F4221" strokeWidth="1.3" />
        <polygon points="84,116 100,98 116,131" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.3" />
      </svg>
    );
  }

  if (type === 'highways') {
    return (
      <svg
        viewBox="0 0 360 200"
        className={`w-full ${heightClass} select-none`}
        role="img"
        aria-label="Isometric 2D 3D-illusion drawing of an elevated highway interchange and girder bridge"
      >
        {/* Ground terrain */}
        <polygon points="180,60 326,122 180,184 34,122" fill="#E5E8E0" stroke="#0F4221" strokeWidth="1.3" />
        {/* Lower arterial road */}
        <polygon points="84,142 252,72 282,85 114,155" fill="#37413B" stroke="#0F4221" strokeWidth="1.3" />
        <line x1="100" y1="148" x2="266" y2="79" stroke="#F4B41A" strokeWidth="1.6" strokeDasharray="6 6" />

        {/* Bridge piers (3D illusion extruded columns) */}
        {[
          { x: 130, y: 108 },
          { x: 185, y: 128 },
          { x: 240, y: 148 },
        ].map((p, idx) => (
          <g key={idx}>
            <polygon points={`${p.x - 8},${p.y - 26} ${p.x},${p.y - 22} ${p.x},${p.y + 4} ${p.x - 8},${p.y}`} fill="#9CA39B" stroke="#0F4221" strokeWidth="1.2" />
            <polygon points={`${p.x},${p.y - 22} ${p.x + 8},${p.y - 26} ${p.x + 8},${p.y} ${p.x},${p.y + 4}`} fill="#7B847A" stroke="#0F4221" strokeWidth="1.2" />
          </g>
        ))}

        {/* Elevated Flyover Deck */}
        <polygon points="62,62 92,48 300,124 270,138" fill="#222C26" stroke="#0F4221" strokeWidth="1.5" />
        {/* Deck concrete side beam */}
        <polygon points="62,62 270,138 270,148 62,72" fill="#C6CCC3" stroke="#0F4221" strokeWidth="1.5" />
        <polygon points="270,138 300,124 300,134 270,148" fill="#9DA59A" stroke="#0F4221" strokeWidth="1.5" />
        {/* Highway lane markings */}
        <line x1="78" y1="55" x2="285" y2="131" stroke="#F4B41A" strokeWidth="2" strokeDasharray="8 6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 360 200"
      className={`w-full ${heightClass} select-none`}
      role="img"
      aria-label="Isometric 2D 3D-illusion drawing of a wide-span industrial steel portal complex"
    >
      {/* Concrete plinth */}
      <polygon points="180,104 314,154 180,192 46,154" fill="#D9DDD5" stroke="#0F4221" strokeWidth="1.4" />
      {/* Left Warehouse Side */}
      <polygon points="74,94 176,136 176,168 74,126" fill="#F2F3EE" stroke="#0F4221" strokeWidth="1.5" />
      {/* Right Front Gable */}
      <polygon points="176,136 280,94 280,126 176,168" fill="#D1D6CD" stroke="#0F4221" strokeWidth="1.5" />
      {/* Sawtooth / Portal Roof Planes */}
      <polygon points="74,94 176,52 280,94 176,136" fill="#0F4221" stroke="#0A2E17" strokeWidth="1.5" />
      {/* Skylight strips */}
      <polygon points="116,88 176,63 236,88 176,113" fill="none" stroke="#F4B41A" strokeWidth="2" />
      {/* Loading bay doors */}
      {[0, 1, 2].map((b) => (
        <polygon
          key={b}
          points={`${190 + b * 28},${133 - b * 11} ${208 + b * 28},${126 - b * 11} ${208 + b * 28},${148 - b * 11} ${190 + b * 28},${155 - b * 11}`}
          fill="#F4B41A"
          stroke="#0F4221"
          strokeWidth="1.3"
        />
      ))}
      {/* Overhead water/silage silo */}
      <ellipse cx="288" cy="86" rx="14" ry="7" fill="#F4B41A" stroke="#0F4221" strokeWidth="1.3" />
      <path d="M274,86 L274,114 C274,118 302,118 302,114 L302,86" fill="#E5E7EB" stroke="#0F4221" strokeWidth="1.3" />
    </svg>
  );
};
