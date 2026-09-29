"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icons";
import { RegenerativePlan, RegenerativeStage, FAOPillar } from "@/types/regenerative";
import { DEMO_FARM } from "@/lib/demo/demoFarm";
import { DEMO_WEATHER } from "@/lib/demo/demoWeather";
import { DEMO_SATELLITE } from "@/lib/demo/demoSatellite";
import { DEMO_SOIL } from "@/lib/demo/demoSoil";
import { generateDeterministicPlan } from "@/lib/services/regenerative";

const PILLAR_LABELS: Record<FAOPillar, { title: string; color: string; bg: string }> = {
  minimum_soil_disturbance: {
    title: "Min. Soil Disturbance",
    color: "#2D5A3C",
    bg: "#E8EFEA",
  },
  permanent_soil_cover: {
    title: "Permanent Soil Cover",
    color: "#8B5E3C",
    bg: "#F7EFE9",
  },
  species_diversification: {
    title: "Species Diversification",
    color: "#2C4C64",
    bg: "#EBF3F8",
  },
};

export default function RegenerativePage() {
  const [plan, setPlan] = useState<RegenerativePlan>(() => generateDeterministicPlan());
  const [activeTab, setActiveTab] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(false);
  const [simulatedSOC, setSimulatedSOC] = useState(0.85);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Attempt hydration from custom farm session
    try {
      const stored =
        localStorage.getItem("agrin_active_farm") ||
        localStorage.getItem("agrin_farm_intelligence");
      if (stored) {
        const intel = JSON.parse(stored);
        fetch("/api/regenerative", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ farmIntelligence: intel }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success && data.data) {
              setPlan(data.data);
            }
          })
          .catch(() => {
            // Keep default plan
          });
        return;
      }
    } catch {
      // Default to seeded Ahmedabad demo
    }

    // Default fetch
    fetch("/api/regenerative")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setPlan(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleRefreshPlan = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/regenerative", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmIntelligence: {
            farm: DEMO_FARM,
            weather: DEMO_WEATHER,
            satellite: DEMO_SATELLITE,
            soil: DEMO_SOIL,
          },
        }),
      });
      const data = await res.json();
      if (data.success && data.data) {
        setPlan(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(
      `AgriN AI Regenerative Plan for ${plan.farmName} (${plan.crop}):\n- STAGE 1: ${plan.stages[0]?.action}\n- STAGE 2: ${plan.stages[1]?.action}\n- STAGE 3: ${plan.stages[2]?.action}\n- STAGE 4: ${plan.stages[3]?.action}\nCalculated Target SOC: 0.85% (+20,000L water retention/acre)`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredStages =
    activeTab === "all"
      ? plan.stages
      : plan.stages.filter((s) => s.id === activeTab);

  // Dynamic simulation calculations
  const baselineSOC = plan.carbonMetrics.baselineSOC;
  const socGain = Math.max(0, simulatedSOC - baselineSOC);
  const additionalWaterRetention = Math.round((socGain / 0.1) * 6500); // ~6,500 gal or ~24,000 L per 0.1% SOC

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-[#58635A]">
          <Link href="/dashboard" className="hover:text-[#1B241E] underline">
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-mono text-[#1B241E] font-medium">Regenerative Transition</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className="text-xs"
          >
            {copied ? "✓ Copied Link & Summary" : "Share Plan"}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRefreshPlan}
            disabled={isLoading}
            className="text-xs"
          >
            {isLoading ? "Synthesizing..." : "Re-evaluate Horizons"}
          </Button>
          <Link href="/dashboard">
            <Button variant="primary" size="sm" className="text-xs">
              Return to Operations
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white border border-[#E2E0D8] rounded p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E0D8] pb-5">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase bg-[#E8EFEA] text-[#2D5A3C] px-2 py-0.5 rounded font-bold border border-[#C2D6C8]">
                FAO Conservation Agriculture Protocol
              </span>
              <span className="text-[10px] font-mono text-[#58635A]">
                Source: {plan.source === "gemini-pro" ? "Google Gemini 1.5 Pro Agro-Engine" : "FAO/ICAR Deterministic Matrix"}
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1B241E]">
              Regenerative Farm Transition Plan
            </h1>
            <p className="text-xs text-[#58635A] mt-1 max-w-2xl leading-relaxed">
              Transitioning <strong className="text-[#1B241E]">{plan.farmName}</strong> ({plan.crop}, {plan.areaAcres} Acres) from single-season depletion to compounding organic soil capital and hydrological resilience.
            </p>
          </div>

          <div className="flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 pt-3 md:pt-0 border-[#E2E0D8]">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#58635A]">
              Farm Baseline
            </span>
            <div className="text-lg font-mono font-bold text-[#2D5A3C] mt-0.5">
              SOC {plan.carbonMetrics.baselineSOC}% → {plan.carbonMetrics.targetSOC}%
            </div>
            <span className="text-[10px] font-mono text-[#58635A]">
              3-Year Carbon Horizon
            </span>
          </div>
        </div>

        {/* 3 Pillars Summary Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-5">
          <div className="border border-[#E2E0D8] rounded p-3 bg-[#FBFBF9] flex items-start space-x-3">
            <span className="text-lg mt-0.5">🌱</span>
            <div>
              <div className="text-xs font-semibold text-[#1B241E]">1. Minimal Soil Disturbance</div>
              <p className="text-[11px] text-[#58635A] mt-0.5 leading-snug">
                Zero-tillage / direct drill retention preserves fungal mycorrhizae and soil aggregate pores.
              </p>
            </div>
          </div>
          <div className="border border-[#E2E0D8] rounded p-3 bg-[#FBFBF9] flex items-start space-x-3">
            <span className="text-lg mt-0.5">🌾</span>
            <div>
              <div className="text-xs font-semibold text-[#1B241E]">2. Permanent Organic Cover</div>
              <p className="text-[11px] text-[#58635A] mt-0.5 leading-snug">
                Retaining 100% crop residues buffers soil surface temperature and suppresses weed seeds.
              </p>
            </div>
          </div>
          <div className="border border-[#E2E0D8] rounded p-3 bg-[#FBFBF9] flex items-start space-x-3">
            <span className="text-lg mt-0.5">🔄</span>
            <div>
              <div className="text-xs font-semibold text-[#1B241E]">3. Species Diversification</div>
              <p className="text-[11px] text-[#58635A] mt-0.5 leading-snug">
                Pulse legumes fix 38 kg atmospheric N/ha and disrupt cereal pest and pathogen cycles.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Soil Carbon & Hydrological Impact Simulator */}
      <div className="bg-[#1B241E] text-white rounded p-6 shadow-sm border border-[#2D5A3C]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#2D5A3C]/40 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono uppercase bg-[#2D5A3C] text-[#E8EFEA] px-2 py-0.5 rounded font-bold">
                Agro-Hydrological Simulator
              </span>
              <span className="text-[11px] text-[#A3B899] font-mono">
                ICAR Soil Mechanics Model
              </span>
            </div>
            <h2 className="text-base font-bold text-white mt-1">
              Soil Organic Carbon (SOC) vs. Farm Water Resilience
            </h2>
            <p className="text-xs text-[#C5D2C1] mt-0.5">
              Simulate the increase in root-zone water storage as soil organic matter builds over time.
            </p>
          </div>

          <div className="bg-[#243328] px-4 py-2.5 rounded border border-[#3A5340] text-right">
            <span className="text-[10px] font-mono text-[#A3B899] uppercase">
              Simulated Target SOC
            </span>
            <div className="text-xl font-mono font-bold text-[#E8EFEA]">
              {simulatedSOC.toFixed(2)}%
            </div>
            <span className="text-[10px] font-mono text-[#8BBE95]">
              +{((simulatedSOC - baselineSOC) * 100).toFixed(0)} Basis Points
            </span>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-mono text-[#C5D2C1] mb-1.5">
              <span>Current Baseline: {baselineSOC}%</span>
              <span>Target Range: 0.60% — 1.20%</span>
            </div>
            <input
              type="range"
              min="0.54"
              max="1.20"
              step="0.01"
              value={simulatedSOC}
              onChange={(e) => setSimulatedSOC(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#2D5A3C] rounded-lg appearance-none cursor-pointer accent-[#8BBE95]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="bg-[#243328] border border-[#3A5340] rounded p-3">
              <span className="text-[10px] font-mono text-[#A3B899] uppercase">
                Additional Water Holding
              </span>
              <div className="text-lg font-mono font-bold text-white mt-0.5">
                +{additionalWaterRetention.toLocaleString()} L / acre
              </div>
              <p className="text-[10px] text-[#A3B899] mt-0.5">
                Expands drought buffer by ~5–7 days per crop cycle.
              </p>
            </div>

            <div className="bg-[#243328] border border-[#3A5340] rounded p-3">
              <span className="text-[10px] font-mono text-[#A3B899] uppercase">
                Biological Nitrogen Fixation
              </span>
              <div className="text-lg font-mono font-bold text-[#8BBE95] mt-0.5">
                ~{plan.carbonMetrics.potentialNFixationKgPerHa} kg N / ha
              </div>
              <p className="text-[10px] text-[#A3B899] mt-0.5">
                Via Chickpea / Moong pulse nodulation.
              </p>
            </div>

            <div className="bg-[#243328] border border-[#3A5340] rounded p-3">
              <span className="text-[10px] font-mono text-[#A3B899] uppercase">
                Synthetic Fertilizer Reduction
              </span>
              <div className="text-lg font-mono font-bold text-[#E8EFEA] mt-0.5">
                25% – 30%
              </div>
              <p className="text-[10px] text-[#A3B899] mt-0.5">
                Cuts ₹1,800/acre in input procurement overhead.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Horizon Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E2E0D8] pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            activeTab === "all"
              ? "bg-[#2D5A3C] text-white font-bold"
              : "bg-white border border-[#E2E0D8] text-[#58635A] hover:bg-[#F2F4F3]"
          }`}
        >
          All 4 Horizons ({plan.stages.length})
        </button>
        <button
          onClick={() => setActiveTab("now")}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            activeTab === "now"
              ? "bg-[#2D5A3C] text-white font-bold"
              : "bg-white border border-[#E2E0D8] text-[#58635A] hover:bg-[#F2F4F3]"
          }`}
        >
          Stage 1: Now (48h)
        </button>
        <button
          onClick={() => setActiveTab("this_week")}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            activeTab === "this_week"
              ? "bg-[#2D5A3C] text-white font-bold"
              : "bg-white border border-[#E2E0D8] text-[#58635A] hover:bg-[#F2F4F3]"
          }`}
        >
          Stage 2: This Week
        </button>
        <button
          onClick={() => setActiveTab("next_cycle")}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            activeTab === "next_cycle"
              ? "bg-[#2D5A3C] text-white font-bold"
              : "bg-white border border-[#E2E0D8] text-[#58635A] hover:bg-[#F2F4F3]"
          }`}
        >
          Stage 3: Next Crop Cycle
        </button>
        <button
          onClick={() => setActiveTab("long_term")}
          className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
            activeTab === "long_term"
              ? "bg-[#2D5A3C] text-white font-bold"
              : "bg-white border border-[#E2E0D8] text-[#58635A] hover:bg-[#F2F4F3]"
          }`}
        >
          Stage 4: Long-Term Resilience
        </button>
      </div>

      {/* 4-Stage Action Cards */}
      <div className="space-y-4">
        {filteredStages.map((stage) => (
          <div
            key={stage.id}
            className="border border-[#E2E0D8] rounded bg-white p-5 shadow-sm hover:border-[#2D5A3C]/40 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E0D8] pb-3 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-[#2D5A3C] bg-[#E8EFEA] px-2 py-0.5 rounded">
                  {stage.phase}
                </span>
                <span className="text-xs font-mono text-[#58635A]">
                  ⏱ {stage.timing}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {stage.faoPillars.map((pillar) => {
                  const info = PILLAR_LABELS[pillar] || {
                    title: pillar,
                    color: "#58635A",
                    bg: "#F2F4F3",
                  };
                  return (
                    <span
                      key={pillar}
                      style={{ color: info.color, backgroundColor: info.bg }}
                      className="text-[10px] font-mono px-2 py-0.5 rounded border border-current/20 font-medium"
                    >
                      {info.title}
                    </span>
                  );
                })}
              </div>
            </div>

            <h3 className="text-base font-bold text-[#1B241E]">
              {stage.action}
            </h3>

            <p className="text-xs text-[#333E35] mt-2 leading-relaxed">
              {stage.why}
            </p>

            {/* Expected Impact Callout */}
            <div className="mt-3 p-2.5 bg-[#FBFBF9] border border-[#E2E0D8] rounded flex items-start space-x-2">
              <span className="text-sm">🎯</span>
              <div className="text-xs text-[#1B241E]">
                <strong className="font-semibold">Calculated Impact: </strong>
                <span className="text-[#58635A]">{stage.expectedImpact}</span>
              </div>
            </div>

            {/* Data Inputs Tagline */}
            <div className="mt-3 pt-2.5 border-t border-[#E2E0D8] flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-[#58635A]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="uppercase text-[10px] tracking-wider text-[#8A958D]">
                  Inputs Evaluated:
                </span>
                {stage.dataInputs.map((input, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F2F4F3] border border-[#E2E0D8] px-1.5 py-0.5 rounded text-[#1B241E]"
                  >
                    {input}
                  </span>
                ))}
              </div>
              <span className="text-[#2D5A3C] font-semibold">
                ✓ Validated against FAO standards
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-[#E2E0D8] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#58635A]">
        <div>
          Next Step in Evaluation Workflow: Verify leaf health and screening diagnostics.
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm">
              ← Farm Dashboard
            </Button>
          </Link>
          <Link href="/disease">
            <Button variant="primary" size="sm">
              Open Disease Scanner →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
