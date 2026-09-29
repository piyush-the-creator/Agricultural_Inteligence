"use client";

import React, { useState, useMemo } from "react";

const COLS = 12;
const ROWS = 9;
const PIXEL_SIZE = 40;

const RAMP = [
  { val: 0.3, rgb: [228, 223, 166] },
  { val: 0.5, rgb: [185, 207, 124] },
  { val: 0.7, rgb: [79, 154, 85] },
  { val: 0.85, rgb: [31, 94, 51] },
];

function getColor(v: number): string {
  if (v <= RAMP[0].val) return `rgb(${RAMP[0].rgb.join(",")})`;
  for (let i = 1; i < RAMP.length; i++) {
    if (v <= RAMP[i].val) {
      const a = RAMP[i - 1].val;
      const b = RAMP[i].val;
      const ca = RAMP[i - 1].rgb;
      const cb = RAMP[i].rgb;
      const t = (v - a) / (b - a);
      const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
      const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
      const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
      return `rgb(${r},${g},${bl})`;
    }
  }
  return `rgb(${RAMP[RAMP.length - 1].rgb.join(",")})`;
}

export default function SatelliteFieldInteractive() {
  const [readout, setReadout] = useState("Average greenness (NDVI) 0.71");

  const pixels = useMemo(() => {
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };

    const rawVals: { r: number; c: number; raw: number }[] = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const dry = Math.max(0, 1 - Math.hypot(c - 10, r - 7) / 3.6);
        const val =
          0.72 +
          0.07 * Math.sin(c * 0.6) +
          0.05 * Math.cos(r * 0.9) +
          (rnd() - 0.5) * 0.06 -
          dry * 0.28;
        rawVals.push({ r, c, raw: val });
      }
    }

    const mean =
      rawVals.reduce((acc, curr) => acc + curr.raw, 0) / rawVals.length;
    const shift = 0.71 - mean;

    return rawVals.map((item) => {
      const v = Math.max(0.1, Math.min(0.95, item.raw + shift));
      return {
        r: item.r,
        c: item.c,
        v,
        color: getColor(v),
        delay: (item.c + item.r) * 28,
      };
    });
  }, []);

  return (
    <figure className="m-0">
      <svg
        viewBox={`0 0 ${COLS * PIXEL_SIZE} ${ROWS * PIXEL_SIZE}`}
        role="img"
        aria-label="Satellite greenness map of the Ahmedabad wheat parcel. Most of the field is healthy, with a drier patch in the lower right."
        className="block w-full h-auto rounded-[10px] border border-[var(--line)] bg-[var(--surface)] shadow-xs"
      >
        {pixels.map((p, idx) => (
          <rect
            key={idx}
            x={p.c * PIXEL_SIZE}
            y={p.r * PIXEL_SIZE}
            width={PIXEL_SIZE}
            height={PIXEL_SIZE}
            fill={p.color}
            className="transition-all duration-150 hover:stroke-[var(--ink)] hover:stroke-[1.5px] cursor-pointer"
            style={{
              animation: "pixel .5s ease-out forwards",
              animationDelay: `${p.delay}ms`,
              opacity: 0,
            }}
            onPointerEnter={() =>
              setReadout(
                `Pixel ${p.r + 1}, ${p.c + 1} · NDVI ${p.v.toFixed(2)}`
              )
            }
            onPointerLeave={() =>
              setReadout("Average greenness (NDVI) 0.71")
            }
          />
        ))}
      </svg>

      <figcaption className="mt-3.5 flex justify-between gap-4 text-[0.85rem] text-[var(--muted)] font-mono tabular-nums">
        <span>Ahmedabad wheat parcel, 2.5 acres</span>
        <span className="text-[var(--ink)] min-h-[1.4em] font-medium font-mono">
          {readout}
        </span>
      </figcaption>

      <div className="flex items-center gap-2 mt-2.5 text-[0.78rem] text-[var(--muted)]">
        <span>Sparse</span>
        <i className="flex-[0_0_120px] h-1.5 rounded-[3px] bg-gradient-to-r from-[#E4DFA6] via-[#4F9A55] to-[#1F5E33]" />
        <span>Dense</span>
      </div>

      <ul className="mt-5 pt-1 border-t border-[var(--line)] space-y-0 text-[0.95rem] p-0 mb-0 list-none">
        <li className="flex justify-between gap-4 py-2.5 border-b border-[var(--line)]">
          <span className="text-[var(--ink)]">Rain forecast</span>
          <span className="text-[var(--muted)]">Expected within 48 hours</span>
        </li>
        <li className="flex justify-between gap-4 py-2.5 border-b border-[var(--line)]">
          <span className="text-[var(--ink)]">Crop greenness</span>
          <span className="text-[var(--muted)]">Healthy, NDVI 0.71</span>
        </li>
        <li className="flex justify-between gap-4 py-2.5 border-b border-[var(--line)] font-semibold">
          <span className="text-[var(--ink)]">Advice</span>
          <span className="text-[var(--leaf)] font-semibold">
            Delay irrigation by 48 hours
          </span>
        </li>
      </ul>
    </figure>
  );
}
