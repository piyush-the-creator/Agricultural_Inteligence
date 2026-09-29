"use client";

import React, { useState, useEffect, useRef } from "react";

const STAGE_FACTORS: Record<number, number> = {
  1: 0.22,
  2: 0.45,
  3: 0.71,
  4: 0.82,
  5: 0.35,
};

const STAGE_BADGES: Record<number, string> = {
  1: "Stage: Emergence & Seedling (Day 1-20)",
  2: "Stage: Crown Root Initiation (Day 21-40)",
  3: "Stage: Tillering & Stem Elongation (Day 41-70)",
  4: "Stage: Heading & Flowering (Day 71-95)",
  5: "Stage: Grain Hardening & Maturity (Day 96-120)",
};

const STAGE_SUMMARIES: Record<number, string> = {
  1: "Observation: Soil moisture primary determinant. Seedlings establishing root matrix.",
  2: "Observation: CRI nodal roots expanding. Moisture sensitivity peak.",
  3: "Observation Date: Day 52 · Tillering vigor optimal. No nitrogen stress visible in spectral band B8/B4.",
  4: "Observation: Flag leaf NDVI peak 0.82. Water requirement high.",
  5: "Observation: Canopy senescence begins. Moisture reduction favorable for grain dry down.",
};

interface SatelliteGrowthTimelineProps {
  onNDVIChange?: (val: string) => void;
  onToast?: (msg: string) => void;
}

export default function SatelliteGrowthTimeline({
  onNDVIChange,
  onToast,
}: SatelliteGrowthTimelineProps) {
  const [stage, setStage] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Background base
    ctx.fillStyle = "#1A2921";
    ctx.fillRect(0, 0, w, h);

    const currentNDVI = STAGE_FACTORS[stage] || 0.71;

    // Draw simulated multi-spectral pixel scan lines
    const cols = 24;
    const rows = 10;
    const cw = w / cols;
    const rh = h / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const noise = Math.sin(c * 0.5) * Math.cos(r * 0.7) * 0.15;
        const val = Math.max(0.1, Math.min(0.95, currentNDVI + noise));

        const green = Math.round(60 + val * 160);
        const red = Math.round(180 - val * 140);
        ctx.fillStyle = `rgb(${red}, ${green}, 70)`;
        ctx.fillRect(c * cw + 1, r * rh + 1, cw - 2, rh - 2);
      }
    }

    // Overlay scan telemetry text
    ctx.fillStyle = "rgba(255,255,255,0.88)";
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillText(
      `SENTINEL-2 L2A · NIR-RED INDEX: ${currentNDVI.toFixed(2)}`,
      16,
      24
    );
    ctx.fillText(
      `FIELD CANOPY VIGOR: ${
        currentNDVI > 0.6
          ? "HIGH"
          : currentNDVI > 0.35
          ? "MODERATE"
          : "EMERGENCE"
      }`,
      16,
      42
    );
  }, [stage]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setStage(val);
    const ndviVal = `${(STAGE_FACTORS[val] || 0.71).toFixed(2)} NDVI`;
    onNDVIChange?.(ndviVal);
  };

  return (
    <div className="card-tmpl p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="text-[1.25rem] font-medium text-[var(--ink)]">
            Sentinel-2 Satellite Timeline
          </h3>
          <p className="text-[0.85rem] text-[var(--muted)]">
            Scrub through vegetative growth stages across the 120-day wheat cycle.
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium bg-[var(--leaf-soft)] text-[var(--leaf)] px-3 py-1 rounded-full self-start sm:self-auto">
          {STAGE_BADGES[stage]}
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={260}
        className="w-full h-auto rounded-lg bg-[var(--surface-elevated)] border border-[var(--line)] shadow-xs"
      />

      <input
        type="range"
        min={1}
        max={5}
        value={stage}
        onChange={handleSliderChange}
        className="w-full mt-4 mb-2 accent-[var(--leaf)] cursor-pointer"
      />

      <div className="flex justify-between text-[0.8rem] text-[var(--muted)] font-mono">
        <span>Sowing (Day 1)</span>
        <span>CRI Stage (Day 25)</span>
        <span>Tillering (Day 50)</span>
        <span>Grain Filling (Day 85)</span>
        <span>Harvest (Day 115)</span>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-[var(--bg)] p-3 sm:px-4 rounded-lg border border-[var(--line)]">
        <span className="text-[0.88rem] text-[var(--muted)]">
          {STAGE_SUMMARIES[stage]}
        </span>
        <button
          onClick={() =>
            onToast?.("Sentinel-2 Band B8/B4 RAW TIF downloaded (Tile T43QDA)")
          }
          className="btn-tmpl btn-tmpl-ghost btn-tmpl-sm whitespace-nowrap self-end sm:self-auto text-xs"
        >
          Export Geotiff
        </button>
      </div>
    </div>
  );
}
