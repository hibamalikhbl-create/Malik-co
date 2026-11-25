import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Compass,
  Layers,
  Maximize2,
  Minimize2,
  Pause,
  RotateCcw,
  RotateCw,
} from 'lucide-react';
import { STRUCTURAL_LAYERS } from '../data/malikData';

interface IsometricHeroDioramaProps {
  selectedLayerId: string;
  onSelectLayer: (id: string) => void;
  showControls?: boolean;
}

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

interface Pt2 {
  x: number;
  y: number;
  depth: number;
}

interface ProjectedPoly {
  key: string;
  layerId: 'foundation' | 'culvert' | 'podium' | 'superstructure';
  points: string;
  fill: string;
  stroke: string;
  strokeWidth: number;
  depth: number;
  opacity?: number;
  dash?: string;
}

function easeOutCubic(t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - clamped, 3);
}

function segmentProgress(globalT: number, start: number, end: number): number {
  if (globalT <= start) return 0;
  if (globalT >= end) return 1;
  return easeOutCubic((globalT - start) / (end - start));
}

export const IsometricHeroDiorama: React.FC<IsometricHeroDioramaProps> = ({
  selectedLayerId,
  onSelectLayer,
  showControls = true,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ active: boolean; startX: number; startYaw: number }>({
    active: false,
    startX: 0,
    startYaw: 38,
  });

  const [exploded, setExploded] = useState(false);
  const [blueprintMode, setBlueprintMode] = useState(false);
  const [yawDeg, setYawDeg] = useState<number>(38);
  const [autoSpin, setAutoSpin] = useState<boolean>(false);
  const [buildProgress, setBuildProgress] = useState<number>(0);
  const [buildKey, setBuildKey] = useState<number>(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0, active: false });

  // Fast brick-by-brick build animation on initial site open (and when replayed)
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setBuildProgress(1);
      return;
    }

    setBuildProgress(0);
    let rafId = 0;
    const durationMs = 1350; // Fast, crisp ~1.35s brick-by-brick assembly
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      setBuildProgress(t);
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [buildKey]);

  // Smooth 360° pure-2D turntable rotation when Auto-360° is active
  useEffect(() => {
    if (!autoSpin) return;
    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let rafId = 0;
    let last = performance.now();

    const spin = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!dragRef.current.active) {
        setYawDeg((prev) => (prev + dt * 36) % 360);
      }
      rafId = requestAnimationFrame(spin);
    };

    rafId = requestAnimationFrame(spin);
    return () => cancelAnimationFrame(rafId);
  }, [autoSpin]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startYaw: yawDeg,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current;
    if (el && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setPointer({ x: nx, y: ny, active: true });
    }

    if (dragRef.current.active) {
      const dx = e.clientX - dragRef.current.startX;
      const nextYaw = (((dragRef.current.startYaw + dx * 0.55) % 360) + 360) % 360;
      setYawDeg(nextYaw);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if not captured
      }
    }
  };

  const handleMouseLeave = () => {
    setPointer({ x: 0, y: 0, active: false });
  };

  const replayBuild = () => {
    setBuildKey((k) => k + 1);
  };

  const activeLayer =
    STRUCTURAL_LAYERS.find((l) => l.id === selectedLayerId) || STRUCTURAL_LAYERS[0];

  const isLayerSelected = (id: string) => selectedLayerId === id;

  // Color palette switches cleanly between Solid Architectural Render and CAD Blueprint
  const c = useMemo(
    () =>
      blueprintMode
        ? {
            bg: '#0A2E17',
            stroke: '#86EFAC',
            strokeAccent: '#F4B41A',
            earthTop: 'rgba(15, 66, 33, 0.72)',
            earthFront: 'rgba(10, 46, 23, 0.90)',
            earthSide: 'rgba(7, 34, 17, 0.95)',
            concreteTop: 'rgba(134, 239, 172, 0.24)',
            concreteFront: 'rgba(134, 239, 172, 0.14)',
            concreteSide: 'rgba(134, 239, 172, 0.08)',
            towerTop: 'rgba(244, 180, 26, 0.45)',
            towerFront: 'rgba(15, 66, 33, 0.78)',
            towerSide: 'rgba(20, 83, 45, 0.65)',
            towerBack: 'rgba(10, 46, 23, 0.72)',
            brickAltFront: 'rgba(22, 95, 50, 0.85)',
            brickAltSide: 'rgba(16, 72, 38, 0.75)',
            gold: 'rgba(244, 180, 26, 0.85)',
            goldDark: 'rgba(180, 130, 8, 0.85)',
            glass: 'rgba(147, 197, 253, 0.55)',
            pipe: 'rgba(203, 213, 225, 0.35)',
            pipeDark: 'rgba(148, 163, 184, 0.28)',
            dark: '#062010',
          }
        : {
            bg: '#F3F4EF',
            stroke: '#0F4221',
            strokeAccent: '#D99B0C',
            earthTop: '#E5E7DF',
            earthFront: '#C8CFC3',
            earthSide: '#B1BAAB',
            concreteTop: '#ECEEE8',
            concreteFront: '#D7DCD2',
            concreteSide: '#BFC6B9',
            towerTop: '#F4B41A',
            towerFront: '#0F4221',
            towerSide: '#1C5B32',
            towerBack: '#0A3118',
            brickAltFront: '#155029',
            brickAltSide: '#226B3B',
            gold: '#F4B41A',
            goldDark: '#C98A09',
            glass: '#7CC4FA',
            pipe: '#B6BEC4',
            pipeDark: '#8E979E',
            dark: '#1E2621',
          },
    [blueprintMode]
  );

  // Pure 2D Orthographic-Isometric Projection Engine (supports true 360° yaw rotation)
  const scenePolys = useMemo(() => {
    const rad = (yawDeg * Math.PI) / 180;
    const cosY = Math.cos(rad);
    const sinY = Math.sin(rad);

    // Subtle pointer tilt stays pure 2D screen-space pitch adjustment
    const pitchDeg = 27 + (pointer.active ? pointer.y * 3.5 : 0);
    const pitchRad = (pitchDeg * Math.PI) / 180;
    const sinP = Math.sin(pitchRad);
    const cosP = Math.cos(pitchRad);

    const cx = 340;
    const cy = 358;
    const scale = 1.15;

    const project = (v: Vec3): Pt2 => {
      const rx = v.x * cosY - v.y * sinY;
      const ry = v.x * sinY + v.y * cosY;
      const sx = cx + rx * scale;
      const sy = cy + ry * sinP * scale - v.z * cosP * scale;
      return { x: sx, y: sy, depth: ry };
    };

    const polys: ProjectedPoly[] = [];

    // Helper: add an axis-aligned 3D box projected to visible 2D SVG faces
    const addBox = (opts: {
      key: string;
      layerId: ProjectedPoly['layerId'];
      x0: number;
      y0: number;
      z0: number;
      x1: number;
      y1: number;
      z1: number;
      topFill: string;
      bottomFill?: string;
      frontFill: string;
      backFill?: string;
      rightFill: string;
      leftFill?: string;
      stroke?: string;
      strokeWidth?: number;
      opacity?: number;
      depthBias?: number;
      rotZ?: number;
      pivot?: { x: number; y: number };
    }) => {
      const {
        key,
        layerId,
        x0,
        y0,
        z0,
        x1,
        y1,
        z1,
        topFill,
        bottomFill,
        frontFill,
        backFill,
        rightFill,
        leftFill,
        stroke = c.stroke,
        strokeWidth = 1.25,
        opacity = 1,
        depthBias = 0,
        rotZ = 0,
        pivot,
      } = opts;

      if (opacity <= 0.01) return;

      const corners: Vec3[] = [
        { x: x0, y: y0, z: z0 }, // 0
        { x: x1, y: y0, z: z0 }, // 1
        { x: x1, y: y1, z: z0 }, // 2
        { x: x0, y: y1, z: z0 }, // 3
        { x: x0, y: y0, z: z1 }, // 4
        { x: x1, y: y0, z: z1 }, // 5
        { x: x1, y: y1, z: z1 }, // 6
        { x: x0, y: y1, z: z1 }, // 7
      ];

      const transformed = rotZ
        ? corners.map((pt) => {
            const px = pivot ? pivot.x : (x0 + x1) / 2;
            const py = pivot ? pivot.y : (y0 + y1) / 2;
            const dx = pt.x - px;
            const dy = pt.y - py;
            const cr = Math.cos(rotZ);
            const sr = Math.sin(rotZ);
            return { x: px + dx * cr - dy * sr, y: py + dx * sr + dy * cr, z: pt.z };
          })
        : corners;

      const p = transformed.map(project);
      const boxCenterDepth =
        p.reduce((acc, v) => acc + v.depth, 0) / p.length;

      const faces: { idx: [number, number, number, number]; fill: string; name: string }[] = [
        { idx: [4, 5, 6, 7], fill: topFill, name: 'top' },
        { idx: [3, 2, 1, 0], fill: bottomFill || topFill, name: 'bottom' },
        { idx: [3, 2, 6, 7], fill: frontFill, name: 'front' },
        { idx: [1, 0, 4, 5], fill: backFill || frontFill, name: 'back' },
        { idx: [2, 1, 5, 6], fill: rightFill, name: 'right' },
        { idx: [0, 3, 7, 4], fill: leftFill || rightFill, name: 'left' },
      ];

      faces.forEach((f) => {
        if (f.name === 'bottom') return;
        const rawDepth =
          (p[f.idx[0]].depth + p[f.idx[1]].depth + p[f.idx[2]].depth + p[f.idx[3]].depth) / 4;

        // Cull back-facing vertical walls cleanly at all 360° angles
        if (f.name !== 'top' && rawDepth <= boxCenterDepth + 0.05) {
          return;
        }

        const avgDepth = rawDepth + depthBias;

        polys.push({
          key: `${key}-${f.name}`,
          layerId,
          points: f.idx.map((i) => `${p[i].x.toFixed(1)},${p[i].y.toFixed(1)}`).join(' '),
          fill: f.fill,
          stroke,
          strokeWidth,
          depth: avgDepth,
          opacity,
        });
      });
    };

    // Helper: horizontal cylinder (for RCC culvert pipe)
    const addHorizontalPipe = (opts: {
      key: string;
      layerId: ProjectedPoly['layerId'];
      x0: number;
      x1: number;
      cyPos: number;
      czPos: number;
      radius: number;
      fill: string;
      rimFill: string;
      opacity: number;
      depthBias?: number;
    }) => {
      const { key, layerId, x0, x1, cyPos, czPos, radius, fill, rimFill, opacity, depthBias = 0 } =
        opts;
      if (opacity <= 0.01) return;

      const sides = 10;
      const ring0: Pt2[] = [];
      const ring1: Pt2[] = [];
      for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        const vy = cyPos + Math.cos(a) * radius;
        const vz = czPos + Math.sin(a) * radius;
        ring0.push(project({ x: x0, y: vy, z: vz }));
        ring1.push(project({ x: x1, y: vy, z: vz }));
      }

      for (let i = 0; i < sides; i++) {
        const j = (i + 1) % sides;
        const pA = ring0[i];
        const pB = ring0[j];
        const pC = ring1[j];
        const pD = ring1[i];
        const shade = i < sides / 2 ? fill : c.pipeDark;
        const avgDepth = (pA.depth + pB.depth + pC.depth + pD.depth) / 4 + depthBias;
        polys.push({
          key: `${key}-seg-${i}`,
          layerId,
          points: `${pA.x.toFixed(1)},${pA.y.toFixed(1)} ${pB.x.toFixed(1)},${pB.y.toFixed(1)} ${pC.x.toFixed(1)},${pC.y.toFixed(1)} ${pD.x.toFixed(1)},${pD.y.toFixed(1)}`,
          fill: shade,
          stroke: c.stroke,
          strokeWidth: 0.7,
          depth: avgDepth,
          opacity,
        });
      }

      // Draw both pipe end caps sorted by depth (shows bell-spigot bore clearly from every 360° angle)
      [
        { ring: ring0, id: 'end0', x: x0 },
        { ring: ring1, id: 'end1', x: x1 },
      ].forEach(({ ring, id, x }) => {
        const avgD = ring.reduce((acc, pt) => acc + pt.depth, 0) / sides + depthBias + 0.4;
        polys.push({
          key: `${key}-${id}-rim`,
          layerId,
          points: ring.map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' '),
          fill: rimFill,
          stroke: c.stroke,
          strokeWidth: 1.3,
          depth: avgD,
          opacity,
        });

        // Inner dark bore
        const innerPts: Pt2[] = [];
        for (let i = 0; i < sides; i++) {
          const a = (i / sides) * Math.PI * 2;
          innerPts.push(
            project({
              x,
              y: cyPos + Math.cos(a) * radius * 0.62,
              z: czPos + Math.sin(a) * radius * 0.62,
            })
          );
        }
        polys.push({
          key: `${key}-${id}-bore`,
          layerId,
          points: innerPts.map((pt) => `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`).join(' '),
          fill: c.dark,
          stroke: c.stroke,
          strokeWidth: 1,
          depth: avgD + 0.15,
          opacity,
        });
      });
    };

    // Helper: vertical cylinder (bored cast-in-situ piles)
    const addVerticalPile = (
      key: string,
      px: number,
      py: number,
      z0: number,
      z1: number,
      r: number,
      opacity: number
    ) => {
      if (opacity <= 0.01) return;
      const sides = 8;
      const topR: Pt2[] = [];
      const botR: Pt2[] = [];
      for (let i = 0; i < sides; i++) {
        const a = (i / sides) * Math.PI * 2;
        const vx = px + Math.cos(a) * r;
        const vy = py + Math.sin(a) * r;
        topR.push(project({ x: vx, y: vy, z: z1 }));
        botR.push(project({ x: vx, y: vy, z: z0 }));
      }
      for (let i = 0; i < sides; i++) {
        const j = (i + 1) % sides;
        const avgDepth = (topR[i].depth + topR[j].depth + botR[i].depth + botR[j].depth) / 4 - 400;
        polys.push({
          key: `${key}-p-${i}`,
          layerId: 'foundation',
          points: `${topR[i].x.toFixed(1)},${topR[i].y.toFixed(1)} ${topR[j].x.toFixed(1)},${topR[j].y.toFixed(1)} ${botR[j].x.toFixed(1)},${botR[j].y.toFixed(1)} ${botR[i].x.toFixed(1)},${botR[i].y.toFixed(1)}`,
          fill: blueprintMode ? 'rgba(244,180,26,0.28)' : '#8E978B',
          stroke: c.stroke,
          strokeWidth: 0.9,
          depth: avgDepth,
          opacity,
        });
      }
    };

    // Explode vertical Z-offsets per layer
    const zExpFoundation = exploded ? -36 : 0;
    const zExpCulvert = exploded ? -12 : 0;
    const zExpPodium = exploded ? 16 : 0;
    const zExpTower = exploded ? 54 : 0;

    // =========================================================================
    // PHASE 1 (0.00 -> 0.20): LAYER 01 — PILING & EARTH STRATA BLOCK
    // =========================================================================
    const tFoundation = segmentProgress(buildProgress, 0.0, 0.18);
    const zDropFoundation = (1 - tFoundation) * 28;
    const selF = isLayerSelected('foundation');
    const strokeF = selF ? c.strokeAccent : c.stroke;

    [
      { x: -75, y: -45 },
      { x: 0, y: -45 },
      { x: 75, y: -45 },
      { x: -75, y: 45 },
      { x: 75, y: 45 },
    ].forEach((pile, idx) => {
      const tp = segmentProgress(buildProgress, idx * 0.02, 0.14 + idx * 0.02);
      addVerticalPile(
        `pile-${idx}`,
        pile.x,
        pile.y,
        -38 + zExpFoundation - (1 - tp) * 18,
        -6 + zExpFoundation,
        7,
        tp
      );
    });

    // Main soil strata cutaway block
    addBox({
      key: 'earth-strata',
      layerId: 'foundation',
      x0: -118,
      y0: -88,
      z0: -14 + zExpFoundation + zDropFoundation,
      x1: 118,
      y1: 88,
      z1: 8 + zExpFoundation + zDropFoundation,
      topFill: c.earthTop,
      frontFill: c.earthFront,
      backFill: c.earthFront,
      rightFill: c.earthSide,
      leftFill: c.earthSide,
      stroke: strokeF,
      strokeWidth: selF ? 2.1 : 1.4,
      opacity: tFoundation,
      depthBias: -240,
    });

    // =========================================================================
    // PHASE 2 (0.18 -> 0.36): LAYER 02 — STORM TRENCH & PRECAST RCC CULVERT
    // =========================================================================
    const tCulvert = segmentProgress(buildProgress, 0.16, 0.34);
    const zDropCulvert = (1 - tCulvert) * 32;
    const selC = isLayerSelected('culvert');
    const strokeC = selC ? c.strokeAccent : c.stroke;

    // Concrete trench cradle slab (positioned cleanly beside podium pad)
    addBox({
      key: 'culvert-cradle',
      layerId: 'culvert',
      x0: 56,
      y0: 24,
      z0: 8 + zExpCulvert + zDropCulvert,
      x1: 114,
      y1: 76,
      z1: 14 + zExpCulvert + zDropCulvert,
      topFill: blueprintMode ? 'rgba(134, 239, 172, 0.22)' : '#9CA699',
      frontFill: c.concreteFront,
      rightFill: c.concreteSide,
      stroke: strokeC,
      strokeWidth: selC ? 1.8 : 1.2,
      opacity: tCulvert,
      depthBias: -90,
    });

    // Large RCC Culvert Pipe
    addHorizontalPipe({
      key: 'rcc-pipe',
      layerId: 'culvert',
      x0: 60,
      x1: 110,
      cyPos: 50,
      czPos: 26 + zExpCulvert + zDropCulvert,
      radius: 13.5,
      fill: c.pipe,
      rimFill: blueprintMode ? 'rgba(203, 213, 225, 0.4)' : '#CFD5DA',
      opacity: tCulvert,
      depthBias: 0,
    });

    // =========================================================================
    // PHASE 3 (0.34 -> 0.54): LAYER 03 — PODIUM, CIVIC ANNEX & HYDRAULIC EXCAVATOR
    // =========================================================================
    const tPodium = segmentProgress(buildProgress, 0.32, 0.46);
    const tAnnex = segmentProgress(buildProgress, 0.38, 0.52);
    const tExcavator = segmentProgress(buildProgress, 0.42, 0.56);
    const selP = isLayerSelected('podium');
    const strokeP = selP ? c.strokeAccent : c.stroke;

    // Podium Concrete Pad
    addBox({
      key: 'podium-pad',
      layerId: 'podium',
      x0: -92,
      y0: -68,
      z0: 9 + zExpPodium + (1 - tPodium) * 26,
      x1: 52,
      y1: 52,
      z1: 22 + zExpPodium + (1 - tPodium) * 26,
      topFill: c.concreteTop,
      frontFill: c.concreteFront,
      backFill: c.concreteFront,
      rightFill: c.concreteSide,
      leftFill: c.concreteSide,
      stroke: strokeP,
      strokeWidth: selP ? 2 : 1.35,
      opacity: tPodium,
      depthBias: -140,
    });

    // Pitched-Roof Civic Annex (Malik & Co. crest motif)
    const annexZ = 22 + zExpPodium + (1 - tAnnex) * 24;
    addBox({
      key: 'civic-annex',
      layerId: 'podium',
      x0: -82,
      y0: -48,
      z0: annexZ,
      x1: -36,
      y1: 0,
      z1: annexZ + 28,
      topFill: c.concreteTop,
      frontFill: c.concreteFront,
      rightFill: c.concreteSide,
      stroke: strokeP,
      strokeWidth: 1.25,
      opacity: tAnnex,
      depthBias: 10,
    });

    // Stepped Pitched Gold Roof over Civic Annex
    addBox({
      key: 'annex-roof-1',
      layerId: 'podium',
      x0: -85,
      y0: -51,
      z0: annexZ + 28,
      x1: -33,
      y1: 3,
      z1: annexZ + 35,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.2,
      opacity: tAnnex,
      depthBias: 15,
    });
    addBox({
      key: 'annex-roof-2',
      layerId: 'podium',
      x0: -76,
      y0: -42,
      z0: annexZ + 35,
      x1: -42,
      y1: -6,
      z1: annexZ + 43,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.2,
      opacity: tAnnex,
      depthBias: 18,
    });

    // Hydraulic Yellow Excavator on Work Pad (Iconic Brand Emblem Homage)
    const exZ = 22 + zExpPodium + (1 - tExcavator) * 24;
    // Left & Right Tracks
    addBox({
      key: 'ex-track-l',
      layerId: 'podium',
      x0: -78,
      y0: 14,
      z0: exZ,
      x1: -34,
      y1: 24,
      z1: exZ + 9,
      topFill: c.dark,
      frontFill: c.dark,
      rightFill: c.dark,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tExcavator,
      depthBias: 20,
    });
    addBox({
      key: 'ex-track-r',
      layerId: 'podium',
      x0: -78,
      y0: 32,
      z0: exZ,
      x1: -34,
      y1: 42,
      z1: exZ + 9,
      topFill: c.dark,
      frontFill: c.dark,
      rightFill: c.dark,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tExcavator,
      depthBias: 20,
    });
    // Yellow Swing Deck
    addBox({
      key: 'ex-deck',
      layerId: 'podium',
      x0: -74,
      y0: 16,
      z0: exZ + 9,
      x1: -38,
      y1: 40,
      z1: exZ + 17,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.2,
      opacity: tExcavator,
      depthBias: 24,
    });
    // Blue-tinted Operator Cab
    addBox({
      key: 'ex-cab',
      layerId: 'podium',
      x0: -60,
      y0: 18,
      z0: exZ + 17,
      x1: -42,
      y1: 36,
      z1: exZ + 33,
      topFill: '#FDE047',
      frontFill: c.glass,
      rightFill: c.gold,
      backFill: c.goldDark,
      leftFill: c.glass,
      stroke: c.stroke,
      strokeWidth: 1.2,
      opacity: tExcavator,
      depthBias: 28,
    });
    // Excavator Boom Segment (stepped angled blocks reaching toward culvert)
    addBox({
      key: 'ex-boom-1',
      layerId: 'podium',
      x0: -42,
      y0: 25,
      z0: exZ + 22,
      x1: -16,
      y1: 31,
      z1: exZ + 38,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tExcavator,
      depthBias: 30,
    });
    addBox({
      key: 'ex-boom-2',
      layerId: 'podium',
      x0: -18,
      y0: 25,
      z0: exZ + 12,
      x1: -6,
      y1: 31,
      z1: exZ + 36,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tExcavator,
      depthBias: 31,
    });
    // Bucket
    addBox({
      key: 'ex-bucket',
      layerId: 'podium',
      x0: -10,
      y0: 23,
      z0: exZ + 4,
      x1: 2,
      y1: 33,
      z1: exZ + 13,
      topFill: c.dark,
      frontFill: c.dark,
      rightFill: c.dark,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tExcavator,
      depthBias: 32,
    });

    // =========================================================================
    // PHASE 4 (0.50 -> 1.00): LAYER 04 — FAST BRICK-BY-BRICK HIGH-RISE TOWER
    // =========================================================================
    const selT = isLayerSelected('superstructure');
    const strokeT = selT ? c.strokeAccent : c.stroke;
    const floors = 6;
    const floorHeight = 16;
    const baseTowerZ = 22 + zExpTower;

    // 6 floors × 4 bricks per floor = 24 interlocking structural bricks assembling rapidly
    const quadrants = [
      { qx0: -20, qy0: -48, qx1: 14, qy1: -14, alt: false },
      { qx0: 14, qy0: -48, qx1: 48, qy1: -14, alt: true },
      { qx0: -20, qy0: -14, qx1: 14, qy1: 20, alt: true },
      { qx0: 14, qy0: -14, qx1: 48, qy1: 20, alt: false },
    ];

    let brickIdx = 0;
    const totalBricks = floors * quadrants.length;

    for (let fl = 0; fl < floors; fl++) {
      for (let q = 0; q < quadrants.length; q++) {
        const startT = 0.48 + (brickIdx / totalBricks) * 0.36;
        const endT = startT + 0.08;
        const tb = segmentProgress(buildProgress, startT, endT);
        brickIdx++;

        if (tb <= 0.01) continue;

        const quad = quadrants[q];
        const z0 = baseTowerZ + fl * floorHeight + (1 - tb) * 28;
        const z1 = z0 + floorHeight - 1.2;

        // Masonry / RCC structural block
        addBox({
          key: `tower-brick-${fl}-${q}`,
          layerId: 'superstructure',
          x0: quad.qx0,
          y0: quad.qy0,
          z0,
          x1: quad.qx1,
          y1: quad.qy1,
          z1,
          topFill: fl === floors - 1 ? c.towerTop : c.concreteTop,
          frontFill: quad.alt ? c.brickAltFront : c.towerFront,
          backFill: quad.alt ? c.towerBack : c.brickAltFront,
          rightFill: quad.alt ? c.brickAltSide : c.towerSide,
          leftFill: quad.alt ? c.towerSide : c.brickAltSide,
          stroke: strokeT,
          strokeWidth: selT ? 1.5 : 1.0,
          opacity: tb,
          depthBias: 40 + fl * 4,
        });

        // Glass curtain-wall ribbon on exterior slab edge
        if (tb > 0.85) {
          addBox({
            key: `tower-glass-${fl}-${q}`,
            layerId: 'superstructure',
            x0: quad.qx0 + 2,
            y0: quad.qy0 + 2,
            z0: z0 + 4.5,
            x1: quad.qx1 - 2,
            y1: quad.qy1 - 2,
            z1: z0 + 10.5,
            topFill: c.glass,
            frontFill: c.glass,
            backFill: c.glass,
            rightFill: blueprintMode ? '#86EFAC' : '#BFDBFE',
            leftFill: blueprintMode ? '#86EFAC' : '#BFDBFE',
            stroke: c.stroke,
            strokeWidth: 0.5,
            opacity: tb * 0.9,
            depthBias: 42 + fl * 4,
          });
        }
      }
    }

    // Crown Parapet & Mechanical Penthouse (0.84 -> 0.94)
    const tCrown = segmentProgress(buildProgress, 0.84, 0.94);
    const crownZ = baseTowerZ + floors * floorHeight + (1 - tCrown) * 22;
    addBox({
      key: 'tower-crown',
      layerId: 'superstructure',
      x0: -22,
      y0: -50,
      z0: crownZ,
      x1: 50,
      y1: 22,
      z1: crownZ + 6,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: strokeT,
      strokeWidth: 1.3,
      opacity: tCrown,
      depthBias: 80,
    });
    addBox({
      key: 'tower-penthouse',
      layerId: 'superstructure',
      x0: -4,
      y0: -32,
      z0: crownZ + 6,
      x1: 32,
      y1: 4,
      z1: crownZ + 21,
      topFill: '#FDE68A',
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.2,
      opacity: tCrown,
      depthBias: 85,
    });

    // Tower Crane Mast & Jib (0.88 -> 1.00)
    const tCrane = segmentProgress(buildProgress, 0.88, 1.0);
    const craneBaseZ = 22 + zExpTower;
    const craneTopZ = crownZ + 38;
    addBox({
      key: 'crane-mast',
      layerId: 'superstructure',
      x0: 54,
      y0: -44,
      z0: craneBaseZ + (1 - tCrane) * 20,
      x1: 62,
      y1: -36,
      z1: craneTopZ,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tCrane,
      depthBias: 90,
    });
    // Horizontal Jib
    addBox({
      key: 'crane-jib',
      layerId: 'superstructure',
      x0: -8,
      y0: -43,
      z0: craneTopZ - 6,
      x1: 86,
      y1: -37,
      z1: craneTopZ,
      topFill: c.gold,
      frontFill: c.goldDark,
      rightFill: c.gold,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tCrane,
      depthBias: 95,
    });
    // Counterweight
    addBox({
      key: 'crane-counter',
      layerId: 'superstructure',
      x0: 74,
      y0: -45,
      z0: craneTopZ - 9,
      x1: 88,
      y1: -35,
      z1: craneTopZ + 2,
      topFill: c.dark,
      frontFill: c.dark,
      rightFill: c.dark,
      stroke: c.stroke,
      strokeWidth: 1.1,
      opacity: tCrane,
      depthBias: 96,
    });
    // Hook Block suspended from jib
    addBox({
      key: 'crane-hook',
      layerId: 'superstructure',
      x0: -4,
      y0: -42,
      z0: craneTopZ - 32,
      x1: 4,
      y1: -38,
      z1: craneTopZ - 26,
      topFill: c.goldDark,
      frontFill: c.gold,
      rightFill: c.goldDark,
      stroke: c.stroke,
      strokeWidth: 1,
      opacity: tCrane,
      depthBias: 97,
    });

    // Hoist cable line projected
    if (tCrane > 0.2) {
      const topH = project({ x: 0, y: -40, z: craneTopZ - 6 });
      const botH = project({ x: 0, y: -40, z: craneTopZ - 26 });
      polys.push({
        key: 'crane-cable',
        layerId: 'superstructure',
        points: `${topH.x.toFixed(1)},${topH.y.toFixed(1)} ${botH.x.toFixed(1)},${botH.y.toFixed(1)} ${(botH.x + 1).toFixed(1)},${botH.y.toFixed(1)}`,
        fill: 'none',
        stroke: c.stroke,
        strokeWidth: 1.4,
        depth: topH.depth + 98,
        opacity: tCrane,
      });
    }

    // Depth sort back-to-front (painter's algorithm for flawless 360° pure-2D occlusion)
    polys.sort((a, b) => a.depth - b.depth);
    return polys;
  }, [yawDeg, pointer, exploded, blueprintMode, buildProgress, selectedLayerId, c]);

  const normalizedAngle = Math.round(((yawDeg % 360) + 360) % 360)
    .toString()
    .padStart(3, '0');

  return (
    <div className="flex flex-col gap-3">
      {/* Interactive Toolbar above the 2D/3D-Illusion Viewport */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-2 border border-[#DFE2DC] bg-white px-4 py-2.5 rounded-xl">
          <div className="flex items-center gap-2 text-xs font-medium text-[#344238]">
            <Compass className="w-4 h-4 text-[#0F4221]" aria-hidden="true" />
            <span className="font-mono-tabular uppercase tracking-wider text-[11px] text-[#0F4221] font-semibold">
              2D Isometric Model · {activeLayer.elevation} · {normalizedAngle}°
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-[#F2F3EE] p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setAutoSpin((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                autoSpin ? 'bg-[#0F4221] text-white' : 'text-[#263029] hover:bg-white'
              }`}
              title="Toggle 360° orbit turntable"
            >
              {autoSpin ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Pause 360°</span>
                </>
              ) : (
                <>
                  <RotateCw className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>360° Orbit</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={replayBuild}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md text-[#263029] hover:bg-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              title="Replay brick-by-brick assembly"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Rebuild</span>
            </button>

            <button
              type="button"
              onClick={() => setExploded((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                exploded ? 'bg-[#0F4221] text-white' : 'text-[#263029] hover:bg-white'
              }`}
            >
              {exploded ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Collapse</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Explode</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setBlueprintMode((v) => !v)}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                blueprintMode
                  ? 'bg-[#D99B0C] text-[#111914] font-semibold'
                  : 'text-[#263029] hover:bg-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{blueprintMode ? 'Solid' : 'CAD'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Pure-2D 360° Isometric Viewport */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseLeave={handleMouseLeave}
        className={`iso-stage relative overflow-hidden rounded-2xl border transition-colors duration-200 touch-pan-y cursor-grab active:cursor-grabbing ${
          blueprintMode ? 'border-[#1E5C34] bg-[#0A2E17]' : 'border-[#D5DAD0] bg-[#F3F4EF]'
        }`}
        style={{
          boxShadow: blueprintMode
            ? '6px 6px 0 #072010, 0 24px 48px -20px rgba(7, 32, 16, 0.5)'
            : '6px 6px 0 #CFD5CC, 0 24px 48px -20px rgba(15, 66, 33, 0.16)',
        }}
      >
        <svg
          viewBox="0 0 680 480"
          className="w-full h-auto block select-none"
          role="img"
          aria-label="Interactive 360-degree pure 2D isometric engineering model assembling brick by brick"
        >
          <defs>
            <pattern id="isoGridHero" width="40" height="23.094" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 40 11.547 L 20 23.094 L 0 11.547 Z"
                fill="none"
                stroke={blueprintMode ? 'rgba(134, 239, 172, 0.14)' : 'rgba(15, 66, 33, 0.08)'}
                strokeWidth="0.8"
              />
            </pattern>
          </defs>

          <rect width="680" height="480" fill={c.bg} />
          <rect width="680" height="480" fill="url(#isoGridHero)" />

          {/* Vertical Axis Guide when Exploded */}
          {exploded && (
            <g opacity="0.5">
              <line
                x1="340"
                y1="45"
                x2="340"
                y2="430"
                stroke={c.strokeAccent}
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            </g>
          )}

          {/* Painter-sorted Pure 2D Projected Polygons */}
          {scenePolys.map((poly) => (
            <polygon
              key={poly.key}
              points={poly.points}
              fill={poly.fill}
              stroke={poly.stroke}
              strokeWidth={poly.strokeWidth}
              strokeLinejoin="round"
              opacity={poly.opacity}
              onClick={(e) => {
                e.stopPropagation();
                onSelectLayer(poly.layerId);
              }}
              className="cursor-pointer"
            />
          ))}
        </svg>

        {/* Unobtrusive Bottom 360° Azimuth Bar */}
        <div
          onPointerDown={(e) => e.stopPropagation()}
          className={`flex flex-wrap items-center justify-between gap-3 border-t px-4 py-2 text-[11px] ${
            blueprintMode
              ? 'border-[#1E5C34] bg-[#082412] text-[#D1E7D8]'
              : 'border-[#DCE0D7] bg-white/90 text-[#344238]'
          }`}
        >
          <span className="font-medium">Drag model or scrub for 360° 2D view</span>

          <div className="flex items-center gap-2.5 flex-1 max-w-[260px]">
            <input
              type="range"
              aria-label="Rotate 2D isometric model 360 degrees"
              min={0}
              max={360}
              value={Math.round(((yawDeg % 360) + 360) % 360)}
              onChange={(e) => {
                setAutoSpin(false);
                setYawDeg(Number(e.target.value));
              }}
              className="w-full accent-[#0F4221] cursor-pointer"
            />
            <span className="font-mono-tabular font-semibold w-9 text-right shrink-0">
              {normalizedAngle}°
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Layer Selector Strip below viewport */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {STRUCTURAL_LAYERS.slice()
          .reverse()
          .map((layer) => {
            const active = layer.id === selectedLayerId;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => onSelectLayer(layer.id)}
                className={`text-left px-3 py-2.5 rounded-xl border transition-all cursor-pointer ${
                  active
                    ? 'bg-[#0F4221] text-white border-[#0F4221] shadow-sm'
                    : 'bg-white text-[#1C2720] border-[#DFE2DC] hover:border-[#0F4221]/50'
                }`}
              >
                <div className="flex items-center justify-between gap-1 text-[11px] font-mono-tabular opacity-80">
                  <span>{layer.index}</span>
                  <span className="truncate">{layer.elevation}</span>
                </div>
                <div className="mt-1 text-xs font-semibold truncate">{layer.name}</div>
              </button>
            );
          })}
      </div>
    </div>
  );
};
