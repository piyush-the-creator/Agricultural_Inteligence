import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function TermsPage() {
  return (
    <div className="max-w-[720px] mx-auto bg-white border border-[#E2E0D8] rounded p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#E2E0D8] pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#1B241E]">
            Terms of Service & Advisory Notice
          </h1>
          <p className="text-xs text-[#58635A] mt-1">
            Operational boundaries and agronomic disclaimer for AgriN AI.
          </p>
        </div>
        <Link href="/">
          <Button variant="secondary" size="sm">
            ← Home
          </Button>
        </Link>
      </div>

      <div className="space-y-4 text-xs text-[#58635A] leading-relaxed">
        <section className="space-y-1.5">
          <h2 className="text-sm font-semibold text-[#1B241E]">1. Prototype Advisory Notice</h2>
          <p>
            AgriN AI provides automated, algorithmic agricultural guidance synthesized from earth observation and meteorological data. All advisory notes constitute informational recommendations and do not substitute for on-field evaluations by certified agricultural extension officers.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-semibold text-[#1B241E]">2. Atmospheric & Satellite Volatility</h2>
          <p>
            Earth observation feeds (Copernicus Sentinel-2) are subject to orbital revisit cadences and atmospheric cloud occlusion. Weather forecasts (Open-Meteo ECMWF) operate on numerical resolution grids and localized microclimates may deviate from regional baselines.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-semibold text-[#1B241E]">3. Zero Commercial Vendor Lock-In</h2>
          <p>
            AgriN AI operates independently of commercial agrochemical, fertilizer, or seed manufacturers. Recommendations prioritize natural biological cycles and conservation agriculture principles.
          </p>
        </section>
      </div>
    </div>
  );
}
