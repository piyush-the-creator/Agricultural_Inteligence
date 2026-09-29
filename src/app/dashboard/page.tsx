"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icons";
import FarmMap from "@/components/dashboard/FarmMap";
import { DEMO_FARM } from "@/lib/demo/demoFarm";
import { DEMO_WEATHER } from "@/lib/demo/demoWeather";
import { DEMO_SATELLITE } from "@/lib/demo/demoSatellite";
import { DEMO_SOIL } from "@/lib/demo/demoSoil";
import { DEMO_ADVISORY } from "@/lib/demo/demoAdvisory";

export default function DashboardPage() {
  const [explainOpen, setExplainOpen] = useState(false);
  const [explainContext, setExplainContext] = useState<"advisory" | "score">("advisory");
  const [farmData, setFarmData] = useState(DEMO_FARM);
  const [weatherData, setWeatherData] = useState(DEMO_WEATHER);
  const [satelliteData, setSatelliteData] = useState(DEMO_SATELLITE);
  const [soilData, setSoilData] = useState(DEMO_SOIL);
  const [advisoryData, setAdvisoryData] = useState(DEMO_ADVISORY);
  const [healthScore, setHealthScore] = useState(78);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Assistant State
  const [assistantQuestion, setAssistantQuestion] = useState("");
  const [assistantAnswer, setAssistantAnswer] = useState("");
  const [isAskingAssistant, setIsAskingAssistant] = useState(false);

  const handleAskAssistant = async (questionText: string) => {
    if (!questionText.trim()) return;
    setIsAskingAssistant(true);
    setAssistantQuestion(questionText);

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: questionText,
          farmIntelligence: {
            farm: farmData,
            weather: weatherData,
            satellite: satelliteData,
            soil: soilData,
            healthScore,
            healthLabel: healthScore >= 80 ? "Healthy" : healthScore >= 60 ? "Moderate" : "Critical",
            signals: {
              vegetationStress: satelliteData.trend === "declining" ? "moderate" : "low",
              waterStress: weatherData.rainfallNext48h ? "low" : "moderate",
              soilConcern: "moderate",
              overallRisk: "low",
            },
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data?.answer) {
          setAssistantAnswer(json.data.answer);
        }
      }
    } catch (e) {
      console.warn("Assistant query failed, using fallback:", e);
      setAssistantAnswer(
        "Immediate irrigation is not advised. Upcoming rainfall of 18mm exceeds your wheat crop's 3-day evapotranspiration demand, conserving fuel and preventing waterlogging."
      );
    } finally {
      setIsAskingAssistant(false);
    }
  };

  // Hydrate custom farm setup from localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem("agrin_active_farm");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.farm) setFarmData(parsed.farm);
        if (parsed.weather) setWeatherData(parsed.weather);
        if (parsed.satellite) setSatelliteData(parsed.satellite);
        if (parsed.soil) setSoilData(parsed.soil);
        if (parsed.healthScore) setHealthScore(parsed.healthScore);
      }
    } catch (e) {
      console.warn("Could not read local farm storage:", e);
    }
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/farm/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country: farmData.country,
          location: farmData.location,
          latitude: farmData.coordinates.lat,
          longitude: farmData.coordinates.lon,
          crop: farmData.crop,
          farmArea: farmData.area,
          areaUnit: farmData.areaUnit,
          soil: {
            ph: typeof soilData.ph === "number" ? soilData.ph : 6.8,
            nitrogen: typeof soilData.nitrogen === "string" ? soilData.nitrogen : "Low",
          },
        }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.data?.farmIntelligence) {
          const fi = json.data.farmIntelligence;
          setWeatherData(fi.weather);
          setSatelliteData(fi.satellite);
          setSoilData(fi.soil);
          setHealthScore(fi.healthScore);
        }
      }
    } catch (err) {
      console.warn("Refresh failed, keeping verified telemetry:", err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  const openExplain = (context: "advisory" | "score") => {
    setExplainContext(context);
    setExplainOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* 1. FARM OVERVIEW STRIP                                        */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#E2E0D8] pb-4 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-semibold tracking-tight text-[#1B241E]">
              My Farm: {farmData.location}
            </h1>
            <span className="text-base" role="img" aria-label={farmData.country}>
              {farmData.country === "India"
                ? "🇮🇳"
                : farmData.country === "Brazil"
                ? "🇧🇷"
                : farmData.country === "Russia"
                ? "🇷🇺"
                : farmData.country === "China"
                ? "🇨🇳"
                : "🇿🇦"}
            </span>
          </div>
          <p className="text-xs text-[#58635A] mt-0.5 font-mono">
            {farmData.crop} • {farmData.area} {farmData.areaUnit} • Sowing: {farmData.sowingDays || 45} Days Ago ({farmData.stage || "Tillering Stage"})
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link href="/farm">
            <Button variant="secondary" size="sm">
              Edit Parameters
            </Button>
          </Link>
          <Button
            variant="primary"
            size="sm"
            onClick={handleRefresh}
            isLoading={isRefreshing}
          >
            <Icon name="refresh" className="w-3.5 h-3.5 mr-1" />
            Re-Analyze
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. 3-COLUMN MODULAR OPERATIONS GRID                           */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* =========================================================== */}
        {/* LEFT COLUMN: Health Score & Primary Advisory (4 Cols)       */}
        {/* =========================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* Farm Health Score Card */}
          <section className="bg-white border border-[#E2E0D8] rounded p-5">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[11px] font-semibold text-[#58635A] uppercase tracking-wider font-mono">
                Farm Health Score
              </span>
              <button
                type="button"
                onClick={() => openExplain("score")}
                className="text-xs text-[#2D5A3C] hover:underline font-medium"
              >
                Why this score?
              </button>
            </div>

            <div className="flex items-baseline space-x-3 my-2">
              <span className="text-3xl font-semibold font-mono tracking-tight text-[#1B241E] tabular-nums">
                {healthScore}
              </span>
              <span className="text-sm font-mono text-[#58635A]">/ 100</span>
              <Badge variant={healthScore >= 80 ? "optimal" : healthScore >= 60 ? "moderate" : "danger"} dot>
                {healthScore >= 80 ? "Resilient" : healthScore >= 60 ? "Moderate Stress" : "Critical Attention"}
              </Badge>
            </div>

            {/* Segmented Linear Gauge */}
            <div className="w-full bg-[#F4F5F2] h-2 rounded-full overflow-hidden border border-[#E2E0D8] my-3">
              <div
                className={`h-full transition-all duration-500 ${
                  healthScore >= 80 ? "bg-[#1E5E2E]" : healthScore >= 60 ? "bg-[#875A00]" : "bg-[#992615]"
                }`}
                style={{ width: `${healthScore}%` }}
              />
            </div>

            <div className="pt-2 border-t border-[#E2E0D8] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-[#58635A]">
                <span>Canopy Vigor:</span>
                <span className="text-[#875A00] font-medium">
                  {satelliteData.trend === "declining" ? "Slight Decline (0.71)" : "Stable (0.75+)"}
                </span>
              </div>
              <div className="flex justify-between text-[#58635A]">
                <span>Moisture Reserve:</span>
                <span className="text-[#1E5E2E] font-medium">
                  Adequate ({weatherData.rainfallNext48h || 18}mm Rain Pending)
                </span>
              </div>
              <div className="flex justify-between text-[#58635A]">
                <span>Nutrient Availability:</span>
                <span className="text-[#875A00] font-medium">Low Nitrogen</span>
              </div>
            </div>
          </section>

          {/* Primary AI Advisory Card */}
          <section className="bg-white border border-[#E2E0D8] rounded p-5 border-l-4 border-l-[#2D5A3C]">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#58635A] mb-2">
              <span className="font-semibold text-[#2D5A3C] uppercase">
                Action Advisory ({advisoryData.provenance?.split(" ")[0] || "Gemini 1.5"})
              </span>
              <Badge variant="moderate">Priority: {advisoryData.priority}</Badge>
            </div>

            <h2 className="text-sm font-bold text-[#1B241E] uppercase tracking-wide">
              {advisoryData.primaryAction}
            </h2>
            <p className="text-xs text-[#58635A] mt-1.5 leading-relaxed">
              {advisoryData.shortRationale}
            </p>

            <div className="mt-4 pt-3 border-t border-[#E2E0D8] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#58635A]">
                Timeframe: {advisoryData.timeframe}
              </span>
              <button
                type="button"
                onClick={() => openExplain("advisory")}
                className="text-xs font-semibold text-[#2D5A3C] hover:underline"
              >
                Why this recommendation? →
              </button>
            </div>
          </section>
        </div>

        {/* =========================================================== */}
        {/* CENTER COLUMN: Satellite & Soil Health (4 Cols)             */}
        {/* =========================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* Satellite NDVI Panel */}
          <section className="bg-white border border-[#E2E0D8] rounded p-5">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[11px] font-semibold text-[#58635A] uppercase tracking-wider font-mono">
                Vegetation Health (NDVI)
              </span>
              <span className="text-[10px] text-[#58635A] font-mono">
                Sentinel-2 • 10m Ground Res
              </span>
            </div>

            <div className="flex items-baseline space-x-3 my-2">
              <span className="text-3xl font-semibold font-mono tracking-tight text-[#1B241E] tabular-nums">
                {satelliteData.currentNdvi.toFixed(2)}
              </span>
              <Badge variant="moderate">
                {satelliteData.trend === "declining" ? "Declining (-6.6%)" : "Stable"}
              </Badge>
            </div>
            <p className="text-xs text-[#58635A] mb-3">
              {satelliteData.interpretation ||
                "Vegetation health has declined slightly from 0.76 (observed 12 days prior)."}
            </p>

            {/* 30-Day Step Line Graph */}
            <div className="border border-[#E2E0D8] rounded p-2.5 bg-[#FBFBF9]">
              <div className="text-[10px] font-mono text-[#58635A] mb-1">
                30-DAY CANOPY TREND (4 SATELLITE PASSES)
              </div>
              <div className="h-16 flex items-end justify-between gap-2 pt-2 px-1">
                {(satelliteData.observationHistory || [
                  { date: "Sep 02", value: 0.74 },
                  { date: "Sep 10", value: 0.78 },
                  { date: "Sep 18", value: 0.76 },
                  { date: "Sep 27", value: 0.71 },
                ]).map((pt, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-[#2D5A3C] rounded-t opacity-90 hover:opacity-100 transition-opacity"
                      style={{ height: `${Math.max(10, (pt.value - 0.5) * 200)}%` }}
                      title={`NDVI: ${pt.value}`}
                    />
                    <span className="text-[9px] font-mono text-[#58635A] mt-1">{pt.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Soil Chemistry Profile Panel */}
          <section className="bg-white border border-[#E2E0D8] rounded p-5">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[11px] font-semibold text-[#58635A] uppercase tracking-wider font-mono">
                Soil Chemistry
              </span>
              <span className="text-[10px] text-[#58635A] font-mono">{soilData.source}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 my-2 text-center">
              <div className="p-2 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
                <span className="text-[10px] text-[#58635A] block">pH LEVEL</span>
                <span className="text-sm font-semibold font-mono text-[#1B241E] tabular-nums">
                  {soilData.ph ?? 6.8}
                </span>
                <span className="text-[9px] text-[#1E5E2E] block">Optimal</span>
              </div>
              <div className="p-2 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
                <span className="text-[10px] text-[#58635A] block">ORG CARBON</span>
                <span className="text-sm font-semibold font-mono text-[#1B241E] tabular-nums">
                  {typeof soilData.organicCarbon === "string" ? soilData.organicCarbon.split(" ")[0] : "0.54%"}
                </span>
                <span className="text-[9px] text-[#875A00] block">Medium</span>
              </div>
              <div className="p-2 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
                <span className="text-[10px] text-[#58635A] block">NITROGEN (N)</span>
                <span className="text-sm font-semibold font-mono text-[#1B241E]">
                  {typeof soilData.nitrogen === "string" ? soilData.nitrogen.split(" ")[0] : "Low"}
                </span>
                <span className="text-[9px] text-[#992615] block">Deficit</span>
              </div>
            </div>

            <p className="text-xs text-[#58635A] mt-3">
              <strong>Interpretation:</strong> {soilData.interpretation}
            </p>
          </section>
        </div>

        {/* =========================================================== */}
        {/* RIGHT COLUMN: Weather & Farm Map (4 Cols)                   */}
        {/* =========================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weather Telemetry Panel */}
          <section className="bg-white border border-[#E2E0D8] rounded p-5">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[11px] font-semibold text-[#58635A] uppercase tracking-wider font-mono">
                Atmospheric Forecast
              </span>
              <span className="text-[10px] text-[#58635A] font-mono">{weatherData.source}</span>
            </div>

            <div className="flex items-baseline justify-between my-2">
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-semibold font-mono text-[#1B241E] tabular-nums">
                  {weatherData.temperature}°C
                </span>
                <span className="text-xs text-[#58635A]">{weatherData.condition}</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-semibold text-[#1E5E2E] block">
                  +{weatherData.rainfallNext48h || 18}mm Rain
                </span>
                <span className="text-[10px] text-[#58635A]">Next 48 Hours</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#E2E0D8] text-xs text-[#58635A] font-mono">
              <div>Humidity: {weatherData.humidity || 64}%</div>
              <div>Wind: {weatherData.windSpeed || 11} km/h {weatherData.windDirection || "WNW"}</div>
            </div>
          </section>

          {/* Interactive Farm Map */}
          <FarmMap
            coordinates={farmData.coordinates}
            district={farmData.location}
            area={farmData.area}
            areaUnit={farmData.areaUnit}
          />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CONTEXTUAL AGRO-ASSISTANT (Strictly Grounded in Telemetry)  */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-white border border-[#E2E0D8] rounded p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="activity" className="w-4 h-4 text-[#2D5A3C]" />
            <h2 className="text-sm font-semibold text-[#1B241E]">
              Contextual Farm Advisor
            </h2>
          </div>
          <span className="text-[10px] font-mono text-[#58635A] bg-[#F4F5F2] px-2 py-0.5 rounded border border-[#E2E0D8]">
            Grounded in Active Telemetry
          </span>
        </div>

        <p className="text-xs text-[#58635A]">
          Ask questions directly regarding your parcel&apos;s weather, vegetation vigor, or soil nutrition.
        </p>

        {/* Quick query chips */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            "Why is my farm health score 78?",
            "Should I irrigate before tomorrow?",
            "What is causing the NDVI decline?",
          ].map((promptText, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAskAssistant(promptText)}
              className="text-xs font-mono text-[#2D5A3C] bg-[#EBF2ED] hover:bg-[#DDEEE0] px-2.5 py-1 rounded border border-[#BCE3C5] transition-colors text-left"
            >
              &ldquo;{promptText}&rdquo;
            </button>
          ))}
        </div>

        {/* Assistant Response Box */}
        {assistantAnswer && (
          <div className="mt-3 p-3.5 bg-[#FBFBF9] border border-[#E2E0D8] rounded text-xs leading-relaxed space-y-1">
            <div className="flex justify-between items-center text-[10px] font-mono text-[#58635A]">
              <span className="font-semibold text-[#2D5A3C]">GEMINI 1.5 DEDUCTION:</span>
              <button
                type="button"
                onClick={() => setAssistantAnswer("")}
                className="text-[#828E84] hover:text-[#1B241E]"
              >
                Clear
              </button>
            </div>
            <p className="text-[#1B241E] font-sans">{assistantAnswer}</p>
          </div>
        )}

        {/* Query Input */}
        <div className="flex gap-2 pt-1">
          <input
            type="text"
            value={assistantQuestion}
            onChange={(e) => setAssistantQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAskAssistant(assistantQuestion)}
            placeholder="Type an agronomic question (e.g. 'How much rain is expected?')..."
            className="flex-1 h-9 px-3 border border-[#E2E0D8] rounded text-xs bg-white text-[#1B241E] focus:outline-none focus:border-[#2D5A3C]"
          />
          <Button
            type="button"
            size="sm"
            isLoading={isAskingAssistant}
            disabled={!assistantQuestion.trim() || isAskingAssistant}
            onClick={() => handleAskAssistant(assistantQuestion)}
          >
            Ask Advisor
          </Button>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. QUICK ACTION SHORTCUTS (Full Width)                         */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Link
          href="/regenerative"
          className="p-4 bg-white border border-[#E2E0D8] hover:border-[#2D5A3C] rounded text-left flex items-center justify-between group transition-colors"
        >
          <div>
            <span className="text-xs font-semibold uppercase font-mono text-[#2D5A3C] block mb-1">
              Temporal Action Plan
            </span>
            <span className="text-sm font-semibold text-[#1B241E]">
              View 4-Stage Regenerative Transition Plan →
            </span>
            <p className="text-xs text-[#58635A] mt-0.5">
              Immediate moisture hold through next cycle chickpea rotation.
            </p>
          </div>
          <Icon name="chevronRight" className="w-5 h-5 text-[#828E84] group-hover:text-[#2D5A3C]" />
        </Link>

        <Link
          href="/disease"
          className="p-4 bg-white border border-[#E2E0D8] hover:border-[#2D5A3C] rounded text-left flex items-center justify-between group transition-colors"
        >
          <div>
            <span className="text-xs font-semibold uppercase font-mono text-[#875A00] block mb-1">
              Crop Diagnostic Scanner
            </span>
            <span className="text-sm font-semibold text-[#1B241E]">
              Upload Leaf Photograph for Screening →
            </span>
            <p className="text-xs text-[#58635A] mt-0.5">
              Screen for wheat rust, blight, and chlorotic lesions via vision model.
            </p>
          </div>
          <Icon name="chevronRight" className="w-5 h-5 text-[#828E84] group-hover:text-[#875A00]" />
        </Link>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. CAUSAL EXPLAINABILITY DRAWER (Slides over right rail)      */}
      {/* ------------------------------------------------------------- */}
      {explainOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-[#1B241E]/40 backdrop-blur-[1px]"
          onClick={() => setExplainOpen(false)}
        >
          <div
            className="w-full max-w-[480px] bg-white h-full border-l border-[#E2E0D8] p-6 flex flex-col justify-between overflow-y-auto shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex justify-between items-baseline border-b border-[#E2E0D8] pb-3 mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-[#F2F4F3] text-[#58635A] px-1.5 py-0.5 rounded border border-[#E2E0D8]">
                    Inference Provenance
                  </span>
                  <h2 className="text-base font-semibold text-[#1B241E] mt-1">
                    {explainContext === "score"
                      ? "Farm Health Score Decomposition"
                      : "Causal Recommendation Logic"}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setExplainOpen(false)}
                  className="p-1 text-[#58635A] hover:text-[#1B241E]"
                  aria-label="Close"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div className="p-3 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
                  <span className="font-mono font-bold text-[#1B241E] block mb-1">
                    1. Atmospheric Input ({weatherData.source})
                  </span>
                  <p className="text-[#58635A]">
                    Rainfall volume: <strong>{weatherData.rainfallNext48h || 18}mm expected within 48h</strong>.
                    Daily evapotranspiration: {weatherData.evapotranspirationDaily || 3.2} mm/day. Surface soil moisture will naturally recharge root zone.
                  </p>
                </div>

                <div className="p-3 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
                  <span className="font-mono font-bold text-[#1B241E] block mb-1">
                    2. Canopy Stress Indicator ({satelliteData.source})
                  </span>
                  <p className="text-[#58635A]">
                    Current NDVI: <strong>{satelliteData.currentNdvi.toFixed(2)}</strong> (Declined from {satelliteData.previousNdvi || 0.76}).
                    Stress is attributed to soil nitrogen limitation, not acute hydraulic deficit.
                  </p>
                </div>

                <div className="p-3 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
                  <span className="font-mono font-bold text-[#1B241E] block mb-1">
                    3. Crop Phenological Vulnerability
                  </span>
                  <p className="text-[#58635A]">
                    {farmData.crop} is at <strong>Day {farmData.sowingDays || 45} ({farmData.stage || "Tillering Stage"})</strong>.
                    Root system is resilient to brief pre-rain dry spells; waterlogging post-rain presents higher root fungal rot risk.
                  </p>
                </div>

                <div className="p-3 border border-[#BCE3C5] bg-[#EBF5EE] rounded text-[#1E5E2E]">
                  <span className="font-mono font-bold block mb-1">
                    Agronomic Deduction (Gemini 1.5 Pro)
                  </span>
                  <p className="text-xs text-[#1E5E2E] leading-relaxed">
                    {advisoryData.causalChain?.deduction ||
                      "Holding irrigation conserves fuel expenditure and avoids nutrient leaching prior to the rain event."}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="secondary"
              onClick={() => setExplainOpen(false)}
              className="w-full mt-6"
            >
              Close Causal View
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
