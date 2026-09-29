"use client";

import React, { useState } from "react";
import { Icon } from "@/components/ui/Icons";

interface FarmMapProps {
  coordinates: {
    lat: number;
    lon: number;
  };
  district?: string;
  area?: number;
  areaUnit?: string;
}

export default function FarmMap({
  coordinates,
  district = "Ahmedabad, Gujarat",
  area = 2.5,
  areaUnit = "Acres",
}: FarmMapProps) {
  const [showNdviOverlay, setShowNdviOverlay] = useState(false);

  return (
    <section className="bg-white border border-[#E2E0D8] rounded p-5 space-y-3">
      <div className="flex justify-between items-baseline">
        <span className="text-[11px] font-semibold text-[#58635A] uppercase tracking-wider font-mono">
          Field Parcel ({area} {areaUnit})
        </span>
        <button
          type="button"
          onClick={() => setShowNdviOverlay(!showNdviOverlay)}
          className={`text-[10px] font-mono px-2 py-0.5 rounded border transition-colors ${
            showNdviOverlay
              ? "bg-[#2D5A3C] text-white border-[#2D5A3C]"
              : "bg-[#F4F5F2] text-[#58635A] border-[#E2E0D8] hover:text-[#1B241E]"
          }`}
        >
          {showNdviOverlay ? "✓ NDVI Overlay Active" : "Toggle NDVI Layer"}
        </button>
      </div>

      {/* Map Graphic Container */}
      <div
        className={`w-full h-40 rounded flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300 border ${
          showNdviOverlay
            ? "bg-[#E2F0D9] border-[#A9D18E]"
            : "bg-[#EBF2ED] border-[#BCE3C5]"
        }`}
      >
        {/* Orthogonal Cadastral Grid */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#2D5A3C_1px,transparent_1px)] [background-size:10px_10px]" />

        {/* Parcel Boundary Polygon */}
        <div
          className={`border-2 border-dashed rounded relative z-10 flex flex-col items-center justify-center p-3 transition-colors ${
            showNdviOverlay
              ? "border-[#1E5E2E] bg-[#2D5A3C]/20 text-[#1E5E2E]"
              : "border-[#2D5A3C] bg-[#2D5A3C]/10 text-[#1B241E]"
          }`}
          style={{ width: "68%", height: "65%" }}
        >
          <div className="flex items-center space-x-1.5 bg-white/95 px-2 py-0.5 rounded border border-[#E2E0D8] shadow-sm">
            <Icon name="mapPin" className="w-3 h-3 text-[#2D5A3C]" />
            <span className="text-[10px] font-mono font-semibold">
              Parcel 43QDA • {area} ac
            </span>
          </div>

          {showNdviOverlay && (
            <span className="text-[9px] font-mono text-[#1E5E2E] mt-1 bg-white/90 px-1 rounded">
              Mean NDVI: 0.71 (Vigor Slipped)
            </span>
          )}
        </div>

        {/* Metadata Footer on Map */}
        <div className="absolute bottom-1.5 left-2 right-2 flex justify-between items-center text-[9px] font-mono text-[#58635A] pointer-events-none">
          <span>
            {coordinates.lat.toFixed(4)}° N, {coordinates.lon.toFixed(4)}° E
          </span>
          <span>EPSG:4326 • 10m Res</span>
        </div>
      </div>
    </section>
  );
}
