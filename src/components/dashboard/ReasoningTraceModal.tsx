"use client";

import React from "react";

interface ReasoningTraceModalProps {
  isOpen: boolean;
  onClose: () => void;
  parcelId?: string;
}

export default function ReasoningTraceModal({
  isOpen,
  onClose,
  parcelId = "IND-GJ-AMD-2024-0089",
}: ReasoningTraceModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[#0E1611]/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[var(--surface)] w-full max-w-[650px] max-h-[85vh] rounded-t-[20px] sm:rounded-[20px] p-6 sm:p-8 overflow-y-auto border border-[var(--line)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start gap-4 mb-6">
          <div>
            <h2 className="text-[1.5rem] font-medium text-[var(--ink)]">
              Gemini 1.5 Explainable Reasoning Tree
            </h2>
            <p className="text-[0.85rem] text-[var(--muted)] mt-0.5">
              Full causal audit chain for Parcel {parcelId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="btn-tmpl btn-tmpl-ghost btn-tmpl-sm text-xs"
          >
            Close
          </button>
        </div>

        <div className="border-l-2 border-[var(--leaf)] pl-5 flex flex-col gap-5 text-left">
          <div>
            <span className="text-[0.75rem] uppercase text-[var(--leaf)] font-bold tracking-wider font-mono">
              Data Ingestion Layer
            </span>
            <h4 className="text-[1rem] font-medium text-[var(--ink)] my-1">
              Copernicus Sentinel-2 Surface Reflectance (L2A)
            </h4>
            <p className="text-[0.88rem] text-[var(--muted)] leading-relaxed">
              Acquired NIR (Band 8: 842nm) = 0.442, Red (Band 4: 665nm) = 0.075. Formula (NIR - Red)/(NIR + Red) yields a normalized difference vegetation index of 0.710. Field shows high canopy biomass with zero moisture wilt signature.
            </p>
          </div>

          <div>
            <span className="text-[0.75rem] uppercase text-[var(--leaf)] font-bold tracking-wider font-mono">
              Meteorological Integration Layer
            </span>
            <h4 className="text-[1rem] font-medium text-[var(--ink)] my-1">
              Open-Meteo High Resolution ECMWF Run
            </h4>
            <p className="text-[0.88rem] text-[var(--muted)] leading-relaxed">
              Synoptic barometric pressure dip over Arabian Sea indicates cyclonic feeder band. Probability of precipitation exceeding 15mm is evaluated at 82% within the 36h to 48h temporal window.
            </p>
          </div>

          <div>
            <span className="text-[0.75rem] uppercase text-[var(--leaf)] font-bold tracking-wider font-mono">
              Agronomic Knowledge Synthesis
            </span>
            <h4 className="text-[1rem] font-medium text-[var(--ink)] my-1">
              Soil Moisture Flux & Nitrogen Conservation
            </h4>
            <p className="text-[0.88rem] text-[var(--muted)] leading-relaxed">
              If irrigation of 40,000L is pumped today and followed by 18mm rainfall on Thursday, root zone saturation will exceed 100% field capacity. This induces anoxic soil conditions, inhibits symbiotic mycorrhizae, and leaches available nitrate below the root zone.
            </p>
          </div>

          <div className="bg-[var(--leaf-soft)] p-4 rounded-lg border border-[var(--leaf)]/20">
            <span className="text-[0.75rem] uppercase text-[var(--leaf)] font-bold tracking-wider font-mono">
              Prescribed Decision
            </span>
            <h4 className="text-[1.05rem] font-medium text-[var(--leaf)] my-1">
              Direct Recommendation: Defer Irrigation
            </h4>
            <p className="text-[0.88rem] text-[var(--ink)] leading-relaxed">
              Hold off electric pump. Re-evaluate on Friday morning post-rainfall event. Conserves borehole electricity and prevents waterlogging.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
