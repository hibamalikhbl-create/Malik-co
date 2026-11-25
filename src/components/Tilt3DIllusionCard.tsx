import React, { useRef, useState } from 'react';

interface Tilt3DIllusionCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
}

export const Tilt3DIllusionCard: React.FC<Tilt3DIllusionCardProps> = ({
  children,
  className = '',
  intensity = 6,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const ry = (px - 0.5) * intensity * 2;
    const rx = -(py - 0.5) * intensity * 2;

    setTilt({
      rx,
      ry,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`iso-stage ${className}`}
    >
      <div
        className="iso-plane relative h-full w-full"
        style={{
          transform: tilt.active
            ? `rotateX(${tilt.rx.toFixed(2)}deg) rotateY(${tilt.ry.toFixed(2)}deg) translateZ(4px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
        }}
      >
        {/* Subtle 2D specular illumination layer */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-200"
          style={{
            opacity: tilt.active ? 1 : 0,
            background: `radial-gradient(circle 340px at ${tilt.gx}% ${tilt.gy}%, rgba(244, 180, 26, 0.09), transparent 70%)`,
          }}
        />
        {children}
      </div>
    </div>
  );
};
