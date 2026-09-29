import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icons";
import { Badge } from "@/components/ui/Badge";

export default function HomePage() {
  return (
    <div className="space-y-12 sm:space-y-16 py-4">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                              */}
      {/* ------------------------------------------------------------- */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-4 sm:pt-8">
        <div className="inline-flex items-center space-x-2">
          <Badge variant="optimal" dot>
            Public Digital Good Prototype
          </Badge>
          <span className="text-[11px] font-mono text-[#58635A]">
            Code with Community • H2S / Google
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-[34px] font-semibold text-[#1B241E] tracking-tight leading-tight uppercase font-sans">
          Intelligent Farming. <br className="hidden sm:inline" />
          Regenerative Future.
        </h1>

        <p className="text-sm sm:text-base text-[#58635A] max-w-2xl mx-auto leading-relaxed">
          Translating multi-spectral satellite telemetry, soil chemistry, and hyper-local meteorological forecasts into localized, explainable, and regenerative farm decisions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link href="/farm" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">
              Analyze My Farm
              <Icon name="chevronRight" className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/network" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              Explore AgriN Network
            </Button>
          </Link>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. STRUCTURAL PIPELINE VISUALIZATION (UI/UX Section 14)       */}
      {/* ------------------------------------------------------------- */}
      <section className="border border-[#E2E0D8] rounded bg-white p-5 sm:p-7 shadow-none">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-[#E2E0D8] gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase font-semibold text-[#2D5A3C] tracking-wider block">
              Empirical Pipeline Architecture
            </span>
            <h2 className="text-sm sm:text-base font-semibold text-[#1B241E]">
              From Ground Telemetry to Regenerative Action
            </h2>
          </div>
          <span className="text-[11px] font-mono text-[#58635A] bg-[#F4F5F2] border border-[#E2E0D8] px-2 py-0.5 rounded self-start sm:self-auto">
            Zero Hallucination Protocol
          </span>
        </div>

        {/* 5-Stage Orthogonal Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
          {/* Stage 1 */}
          <div className="p-3.5 border border-[#E2E0D8] rounded bg-[#FBFBF9] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#58635A] uppercase block">Stage 01</span>
              <span className="font-semibold text-[#1B241E] text-sm mt-0.5 block">1. Field Parcel</span>
            </div>
            <div className="text-[11px] text-[#58635A] mt-2 pt-2 border-t border-[#E2E0D8] space-y-0.5">
              <div>Ahmedabad, India</div>
              <div>Wheat • 2.5 Acres</div>
            </div>
          </div>

          {/* Stage 2 */}
          <div className="p-3.5 border border-[#E2E0D8] rounded bg-[#FBFBF9] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#58635A] uppercase block">Stage 02</span>
              <span className="font-semibold text-[#1B241E] text-sm mt-0.5 block">2. Earth Data</span>
            </div>
            <div className="text-[11px] text-[#58635A] mt-2 pt-2 border-t border-[#E2E0D8] space-y-0.5">
              <div>Copernicus S-2 MSI</div>
              <div>Open-Meteo ECMWF</div>
            </div>
          </div>

          {/* Stage 3 */}
          <div className="p-3.5 border border-[#E2E0D8] rounded bg-[#FBFBF9] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#58635A] uppercase block">Stage 03</span>
              <span className="font-semibold text-[#1B241E] text-sm mt-0.5 block">3. Normalization</span>
            </div>
            <div className="text-[11px] text-[#58635A] mt-2 pt-2 border-t border-[#E2E0D8] space-y-0.5">
              <div>NDVI Ratio (0.71)</div>
              <div>Soil Chemistry HWSD</div>
            </div>
          </div>

          {/* Stage 4 */}
          <div className="p-3.5 border border-[#E2E0D8] rounded bg-[#FBFBF9] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#58635A] uppercase block">Stage 04</span>
              <span className="font-semibold text-[#1B241E] text-sm mt-0.5 block">4. AI Reasoning</span>
            </div>
            <div className="text-[11px] text-[#58635A] mt-2 pt-2 border-t border-[#E2E0D8] space-y-0.5">
              <div>Gemini 1.5 Causal Chain</div>
              <div>Explainability Matrix</div>
            </div>
          </div>

          {/* Stage 5 */}
          <div className="p-3.5 border border-[#BCE3C5] rounded bg-[#EBF5EE] flex flex-col justify-between">
            <div>
              <span className="text-[10px] text-[#1E5E2E] uppercase block font-semibold">Stage 05</span>
              <span className="font-semibold text-[#1E5E2E] text-sm mt-0.5 block">5. Local Action</span>
            </div>
            <div className="text-[11px] text-[#1E5E2E] mt-2 pt-2 border-t border-[#BCE3C5] space-y-0.5">
              <div>Delay Irrigation (48h)</div>
              <div>Rotate Legume Pulse</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. THREE CORE PILLARS                                         */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2E0D8] rounded p-5">
          <div className="w-8 h-8 rounded bg-[#EBF5EE] border border-[#BCE3C5] flex items-center justify-center text-[#1E5E2E] mb-3">
            <Icon name="satellite" className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-[#1B241E] mb-1">
            Empirical Multi-Source Fusion
          </h3>
          <p className="text-xs text-[#58635A] leading-relaxed">
            Direct ingestion of Sentinel-2 multispectral surface bands, Open-Meteo precipitation forecasts, and soil profiles. We never ask farmers to decode raw numbers.
          </p>
        </div>

        <div className="bg-white border border-[#E2E0D8] rounded p-5">
          <div className="w-8 h-8 rounded bg-[#FFF9EB] border border-[#F5DE9C] flex items-center justify-center text-[#875A00] mb-3">
            <Icon name="info" className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-[#1B241E] mb-1">
            Causal Explainability First
          </h3>
          <p className="text-xs text-[#58635A] leading-relaxed">
            Every AI recommendation links directly to the physical factors that triggered it. An open inspection drawer demystifies every agricultural directive.
          </p>
        </div>

        <div className="bg-white border border-[#E2E0D8] rounded p-5">
          <div className="w-8 h-8 rounded bg-[#F4F5F2] border border-[#E2E0D8] flex items-center justify-center text-[#1B241E] mb-3">
            <Icon name="leaf" className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-semibold text-[#1B241E] mb-1">
            Zero Cost Public Good
          </h3>
          <p className="text-xs text-[#58635A] leading-relaxed">
            Engineered exclusively with free APIs and open data protocols to serve small and marginal farmers with ₹0 licensing burden.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. FAST TRACK TO DEMO FARM                                    */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-[#FFFFFF] border border-[#E2E0D8] rounded p-6 text-center space-y-3">
        <span className="text-[11px] font-mono uppercase text-[#58635A] block">
          Ready for Hackathon Evaluation
        </span>
        <h2 className="text-lg font-semibold text-[#1B241E]">
          Explore the Live Demo Farm: Ahmedabad Wheat Parcel
        </h2>
        <p className="text-xs text-[#58635A] max-w-xl mx-auto">
          Experience the complete 2–4 minute evaluation journey with pre-seeded, verified telemetry from Gujarat, India.
        </p>
        <div className="pt-2">
          <Link href="/dashboard">
            <Button variant="primary" size="md">
              Launch Farm Dashboard
              <Icon name="chevronRight" className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
