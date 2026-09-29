"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function RegenerativePage() {
  const [acres, setAcres] = useState(2.5);
  const [somTarget, setSomTarget] = useState(0.45);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Mathematical Agronomy Estimations:
  // 1 acre-furrow slice (~2,000,000 kg soil). 0.1% increase in SOC ≈ 1.08 tons CO2e sequestered per acre.
  const co2eTotal = (acres * (somTarget / 0.1) * 1.08).toFixed(1);

  // Fertilizer reduction: Indian Urea subsidized MRP + DAP savings ≈ ₹5,680 per acre when biological cycling kicks in.
  const fertRupees = Math.round(acres * 5680 * (somTarget / 0.45));

  // Water holding capacity increase: Each 1% SOM increase holds ~27,000 gallons (102,000 L) per acre.
  const waterKL = Math.round(acres * somTarget * 280);

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 right-6 bg-[var(--ink)] text-[var(--bg)] px-5 py-3 rounded-full text-sm shadow-xl z-50 animate-bounce">
          {toastMessage}
        </div>
      )}

      {/* Page Header */}
      <div className="border-b border-[var(--line)] pb-6 pt-4">
        <div className="wrap">
          <h1 className="text-[2rem] sm:text-[2.6rem] font-medium leading-tight text-[var(--ink)]">
            Regenerative Transition Strategy
          </h1>
          <p className="text-[var(--muted)] text-[1.05rem] mt-1 max-w-2xl">
            Transition from synthetic chemical dependency to biological soil carbon sequestration while maintaining yield.
          </p>
        </div>
      </div>

      <div className="wrap space-y-12">
        {/* Interactive Carbon & Savings Calculator */}
        <div className="calc-card">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <span className="text-[0.75rem] uppercase font-semibold text-[var(--leaf)] bg-white/10 px-3 py-1 rounded-full inline-block font-mono tracking-wider">
                AgriN Economic & Soil Carbon Engine
              </span>
              <h2 className="text-[1.8rem] sm:text-[2.2rem] font-medium text-white mt-2">
                Transition ROI & Sequestration Simulator
              </h2>
              <p className="text-white/80 max-w-xl text-[1rem] mt-1.5 leading-relaxed">
                Model your fertilizer cost reduction and soil carbon gains based on farm size and regenerative target.
              </p>
            </div>
            <button
              onClick={() => showToast("Protocol exported as CADS transition PDF")}
              className="btn-tmpl btn-tmpl-ghost text-white border-white/30 hover:border-white text-xs self-start md:self-auto"
            >
              Download Farm Transition Spec
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-7">
            <div className="calc-slider-group">
              <label className="flex justify-between text-[0.95rem] text-white/90 mb-2">
                <span>
                  Cultivated Area: <strong className="text-white">{acres}</strong> Acres
                </span>
                <span className="text-xs text-white/60 font-mono">1 to 50 acres</span>
              </label>
              <input
                type="range"
                min={1}
                max={50}
                step={0.5}
                value={acres}
                onChange={(e) => setAcres(parseFloat(e.target.value))}
                className="w-full accent-[var(--leaf)] cursor-pointer"
              />
            </div>

            <div className="calc-slider-group">
              <label className="flex justify-between text-[0.95rem] text-white/90 mb-2">
                <span>
                  Target Soil Organic Carbon Gain:{" "}
                  <strong className="text-white">+{somTarget.toFixed(2)}%</strong>
                </span>
                <span className="text-xs text-white/60 font-mono">3-Year Target</span>
              </label>
              <input
                type="range"
                min={0.1}
                max={1.5}
                step={0.05}
                value={somTarget}
                onChange={(e) => setSomTarget(parseFloat(e.target.value))}
                className="w-full accent-[var(--leaf)] cursor-pointer"
              />
            </div>
          </div>

          <div className="calc-results-grid">
            <div>
              <div className="calc-res-val">{co2eTotal} t</div>
              <div className="calc-res-lbl">CO₂e Sequestration Potential</div>
            </div>
            <div>
              <div className="calc-res-val">₹ {fertRupees.toLocaleString("en-IN")}</div>
              <div className="calc-res-lbl">Synthetic Urea & DAP Savings / Year</div>
            </div>
            <div>
              <div className="calc-res-val">{waterKL} kL</div>
              <div className="calc-res-lbl">Soil Moisture Storage Capacity Added</div>
            </div>
          </div>
        </div>

        {/* 4-Phase Transition Roadmap */}
        <div>
          <h2 className="text-[1.8rem] font-medium mb-1.5 text-[var(--ink)]">
            4-Season Regeneration Trajectory
          </h2>
          <p className="text-[var(--muted)] mb-6 text-[0.98rem]">
            Gradual reduction in synthetic NPK accompanied by mycorrhizal inoculation to avoid yield dips.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border-2 border-[var(--leaf)] bg-[var(--surface)] rounded-[10px] p-5 shadow-xs">
              <div className="text-[0.75rem] uppercase font-semibold text-[var(--leaf)] mb-2 font-mono">
                Current Stage · Year 1
              </div>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Phase 1: Inoculation
              </h3>
              <p className="text-[0.88rem] text-[var(--muted)] leading-relaxed">
                Introduce cow-dung fermented microbial inoculants (Jeevamrutha). Cut synthetic nitrogen by 25%. Maintain mulch cover.
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[10px] p-5 shadow-xs">
              <div className="text-[0.75rem] uppercase font-semibold text-[var(--muted)] mb-2 font-mono">
                Season 2
              </div>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Phase 2: Pulse Intercrop
              </h3>
              <p className="text-[0.88rem] text-[var(--muted)] leading-relaxed">
                Intercrop with chickpea/moong pulse (Rhizobia nodules). Reduce chemical DAP by 45%. Introduce bio-pest decoctions.
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[10px] p-5 shadow-xs">
              <div className="text-[0.75rem] uppercase font-semibold text-[var(--muted)] mb-2 font-mono">
                Season 3
              </div>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Phase 3: Fungal Balance
              </h3>
              <p className="text-[0.88rem] text-[var(--muted)] leading-relaxed">
                Establish Glomus intraradices Arbuscular Mycorrhizal network. Transition to minimal disc disturbance.
              </p>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[10px] p-5 shadow-xs">
              <div className="text-[0.75rem] uppercase font-semibold text-[var(--muted)] mb-2 font-mono">
                Season 4
              </div>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Phase 4: Full Biological
              </h3>
              <p className="text-[0.88rem] text-[var(--muted)] leading-relaxed">
                100% biological fertility cycle. Soil organic carbon &gt; 1.0%. Eligible for open-market regenerative premium certificate.
              </p>
            </div>
          </div>
        </div>

        {/* Biological Amendment Protocols */}
        <div>
          <h2 className="text-[1.8rem] font-medium mb-1.5 text-[var(--ink)]">
            Open Biological Recipes
          </h2>
          <p className="text-[var(--muted)] mb-6 text-[0.98rem]">
            Locally preparable inputs requiring zero proprietary corporate purchases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="card-tmpl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[1.15rem] font-medium text-[var(--ink)]">
                  Jeevamrutha Culture
                </h3>
                <span className="text-[0.72rem] px-2 py-0.5 rounded-full bg-[var(--leaf-soft)] text-[var(--leaf)] font-semibold font-mono">
                  Soil Biology
                </span>
              </div>
              <p className="text-[0.88rem] text-[var(--muted)] mb-3 leading-relaxed">
                Rich microbial culture that multiplies native soil aerobic bacteria to accelerate organic matter mineralisation.
              </p>
              <div className="text-[0.82rem] bg-[var(--bg)] p-3 rounded-md border border-[var(--line)] leading-relaxed">
                <strong>Recipe (200L):</strong> 10kg desi cow dung, 10L cow urine, 2kg jaggery, 2kg besan flour, handful virgin forest soil. Ferment 48h.
              </div>
            </div>

            <div className="card-tmpl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[1.15rem] font-medium text-[var(--ink)]">
                  Neem-Karanj Decoction
                </h3>
                <span className="text-[0.72rem] px-2 py-0.5 rounded-full bg-[var(--leaf-soft)] text-[var(--leaf)] font-semibold font-mono">
                  Bio-Insecticide
                </span>
              </div>
              <p className="text-[0.88rem] text-[var(--muted)] mb-3 leading-relaxed">
                Natural azadirachtin repellent targeting aphid colonies and borers without killing predatory ladybird beetles.
              </p>
              <div className="text-[0.82rem] bg-[var(--bg)] p-3 rounded-md border border-[var(--line)] leading-relaxed">
                <strong>Recipe (100L):</strong> 5kg crushed neem leaves, 2kg karanj leaves, boiled in 20L water, filtered and diluted with 0.1% soap nut.
              </div>
            </div>

            <div className="card-tmpl">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-[1.15rem] font-medium text-[var(--ink)]">
                  Sour Buttermilk Spray
                </h3>
                <span className="text-[0.72rem] px-2 py-0.5 rounded-full bg-[var(--leaf-soft)] text-[var(--leaf)] font-semibold font-mono">
                  Anti-Fungal
                </span>
              </div>
              <p className="text-[0.88rem] text-[var(--muted)] mb-3 leading-relaxed">
                Lactic acid bacteria and copper ion treatment creating an acidic leaf surface protective film against rust.
              </p>
              <div className="text-[0.82rem] bg-[var(--bg)] p-3 rounded-md border border-[var(--line)] leading-relaxed">
                <strong>Recipe:</strong> 5L old sour curd fermented in a copper vessel for 7 days until greenish tint appears. Dilute in 100L water.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
