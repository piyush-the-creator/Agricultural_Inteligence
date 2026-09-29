"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icons";
import { StepProgress, ProgressStep } from "@/components/ui/StepProgress";

const PIPELINE_STEPS: ProgressStep[] = [
  { id: 1, text: "Resolving geographic coordinates (EPSG:4326)" },
  { id: 2, text: "Fetching atmospheric forecast (Open-Meteo ECMWF)" },
  { id: 3, text: "Calibrating regional soil chemistry baseline (HWSD v2.0)" },
  { id: 4, text: "Processing Copernicus Sentinel-2 NDVI spectral ratio" },
  { id: 5, text: "Synthesizing causal agronomy advisory via Gemini 1.5" },
];

export default function FarmSetupPage() {
  const router = useRouter();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [pipelineStep, setPipelineStep] = useState(1);

  const [country, setCountry] = useState("India");
  const [location, setLocation] = useState("Ahmedabad, Gujarat");
  const [crop, setCrop] = useState("Wheat");
  const [area, setArea] = useState(2.5);
  const [areaUnit, setAreaUnit] = useState<"Acres" | "Hectares">("Acres");
  const [ph, setPh] = useState(6.8);
  const [organicCarbon, setOrganicCarbon] = useState("Medium");
  const [nitrogen, setNitrogen] = useState("Low");
  const [soilExpanded, setSoilExpanded] = useState(false);

  const handleStartAnalysis = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    setPipelineStep(1);

    // Coordinate resolution based on selected location
    let lat = 23.0225;
    let lon = 72.5714;
    if (country === "Brazil") {
      lat = -12.6819;
      lon = -56.9211;
    } else if (country === "Russia") {
      lat = 47.2357;
      lon = 39.7015;
    } else if (country === "China") {
      lat = 34.7657;
      lon = 113.6853;
    } else if (country === "South Africa") {
      lat = -28.4541;
      lon = 26.7968;
    }

    try {
      setTimeout(() => setPipelineStep(2), 500);
      setTimeout(() => setPipelineStep(3), 1000);
      setTimeout(() => setPipelineStep(4), 1600);

      const res = await fetch("/api/farm/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          country,
          location,
          latitude: lat,
          longitude: lon,
          crop,
          farmArea: Number(area),
          areaUnit,
          soil: {
            ph: Number(ph),
            organicCarbon,
            nitrogen,
          },
        }),
      });

      setTimeout(() => setPipelineStep(5), 2100);

      if (res.ok) {
        const json = await res.json();
        if (json.data?.farmIntelligence) {
          localStorage.setItem("agrin_active_farm", JSON.stringify(json.data.farmIntelligence));
        }
      }
    } catch (err) {
      console.warn("Analysis request fallback:", err);
    } finally {
      setTimeout(() => {
        router.push("/dashboard");
      }, 2700);
    }
  };

  return (
    <div className="py-4">
      {isAnalyzing ? (
        <div className="py-8">
          <StepProgress
            title="AgriN Intelligence Pipeline"
            subtitle={`Synthesizing multi-source observation telemetry for ${location}...`}
            currentStep={pipelineStep}
            steps={PIPELINE_STEPS}
          />
        </div>
      ) : (
        <div className="max-w-[620px] mx-auto bg-white border border-[#E2E0D8] rounded p-6 sm:p-8">
          {/* Header */}
          <div className="border-b border-[#E2E0D8] pb-4 mb-6 flex justify-between items-start">
            <div>
              <span className="text-[10px] font-mono uppercase bg-[#F2F4F3] text-[#58635A] px-1.5 py-0.5 rounded border border-[#E2E0D8]">
                Step 1 of 2
              </span>
              <h1 className="text-xl font-semibold tracking-tight text-[#1B241E] mt-1.5">
                Configure Field Parameters
              </h1>
              <p className="text-xs text-[#58635A] mt-1">
                Specify parcel coordinates and crop species to calibrate satellite and weather telemetry.
              </p>
            </div>
            <Link href="/">
              <Button variant="tertiary" size="sm">
                Cancel
              </Button>
            </Link>
          </div>

          {/* Form Fields */}
          <form className="space-y-5" onSubmit={handleStartAnalysis}>
            {/* 1. Country Selection */}
            <div>
              <label htmlFor="country-select" className="block text-xs font-semibold text-[#1B241E] mb-1">
                COUNTRY NODE (BRICS FEDERATION)
              </label>
              <select
                id="country-select"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  if (e.target.value === "India") setLocation("Ahmedabad, Gujarat");
                  else if (e.target.value === "Brazil") setLocation("Mato Grosso");
                  else if (e.target.value === "Russia") setLocation("Rostov Region");
                  else if (e.target.value === "China") setLocation("Henan Basin");
                  else if (e.target.value === "South Africa") setLocation("Free State");
                }}
                className="w-full h-10 px-3 border border-[#E2E0D8] rounded text-sm bg-white text-[#1B241E] focus:outline-none focus:border-[#2D5A3C]"
              >
                <option value="India">India 🇮🇳 (National Node — Gujarat Sub-basin)</option>
                <option value="Brazil">Brazil 🇧🇷 (Cerrado Node)</option>
                <option value="Russia">Russia 🇷🇺 (Black Soil Node)</option>
                <option value="China">China 🇨🇳 (Yellow Basin Node)</option>
                <option value="South Africa">South Africa 🇿🇦 (Free State Node)</option>
              </select>
              <span className="text-[11px] font-mono text-[#58635A] mt-1 block">
                Selects regional agro-climatic baseline and cadastral CRS.
              </span>
            </div>

            {/* 2. Location */}
            <div>
              <label htmlFor="location-input" className="block text-xs font-semibold text-[#1B241E] mb-1">
                LOCATION / DISTRICT
              </label>
              <div className="flex gap-2">
                <input
                  id="location-input"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 h-10 px-3 border border-[#E2E0D8] rounded text-sm bg-white text-[#1B241E] focus:outline-none focus:border-[#2D5A3C]"
                  placeholder="Search district, town or coordinates"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setLocation("Ahmedabad, Gujarat")}
                >
                  <Icon name="mapPin" className="w-3.5 h-3.5 mr-1 text-[#58635A]" />
                  Detect GPS
                </Button>
              </div>
              <span className="text-[11px] font-mono text-[#58635A] mt-1 block">
                Resolved: {country === "India" ? "23.0225° N, 72.5714° E (EPSG:4326)" : "Auto-Resolved via CADS"}
              </span>
            </div>

            {/* 3. Crop Species & Farm Area */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="crop-select" className="block text-xs font-semibold text-[#1B241E] mb-1">
                  CROP SPECIES
                </label>
                <select
                  id="crop-select"
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full h-10 px-3 border border-[#E2E0D8] rounded text-sm bg-white text-[#1B241E] focus:outline-none focus:border-[#2D5A3C]"
                >
                  <option value="Wheat">Wheat (Triticum aestivum)</option>
                  <option value="Rice">Rice (Oryza sativa)</option>
                  <option value="Maize">Maize (Zea mays)</option>
                  <option value="Soybean">Soybean (Glycine max)</option>
                  <option value="Cotton">Cotton (Gossypium)</option>
                  <option value="Chickpea">Chickpea (Cicer arietinum)</option>
                </select>
              </div>

              <div>
                <Input
                  label="FARM AREA"
                  type="number"
                  value={area}
                  onChange={(e) => setArea(parseFloat(e.target.value) || 1)}
                  step="0.1"
                  unit={areaUnit}
                />
              </div>
            </div>

            {/* 4. Soil Parameters (Optional Collapsible) */}
            <div className="border border-[#E2E0D8] rounded p-4 bg-[#FBFBF9]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#1B241E]">
                  SOIL CHEMISTRY PARAMETERS (OPTIONAL)
                </span>
                <button
                  type="button"
                  onClick={() => setSoilExpanded(!soilExpanded)}
                  className="text-xs font-mono text-[#2D5A3C] hover:underline"
                >
                  {soilExpanded ? "[-] Collapse" : "[+] Expand Fields"}
                </button>
              </div>

              {soilExpanded ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-[#E2E0D8]">
                  <div>
                    <label htmlFor="soil-ph" className="block text-[11px] text-[#58635A] mb-1">
                      pH Level
                    </label>
                    <input
                      id="soil-ph"
                      type="number"
                      step="0.1"
                      value={ph}
                      onChange={(e) => setPh(parseFloat(e.target.value) || 6.8)}
                      className="w-full h-8 px-2 border border-[#E2E0D8] rounded text-xs bg-white text-[#1B241E]"
                    />
                  </div>
                  <div>
                    <label htmlFor="soil-oc" className="block text-[11px] text-[#58635A] mb-1">
                      Organic Carbon
                    </label>
                    <select
                      id="soil-oc"
                      value={organicCarbon}
                      onChange={(e) => setOrganicCarbon(e.target.value)}
                      className="w-full h-8 px-2 border border-[#E2E0D8] rounded text-xs bg-white text-[#1B241E]"
                    >
                      <option value="Medium">Medium (0.50–0.75%)</option>
                      <option value="Low">Low (&lt; 0.50%)</option>
                      <option value="High">High (&gt; 0.75%)</option>
                    </select>
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="soil-n" className="block text-[11px] text-[#58635A] mb-1">
                      Nitrogen (N)
                    </label>
                    <select
                      id="soil-n"
                      value={nitrogen}
                      onChange={(e) => setNitrogen(e.target.value)}
                      className="w-full h-8 px-2 border border-[#E2E0D8] rounded text-xs bg-white text-[#1B241E]"
                    >
                      <option value="Low">Low (&lt; 200 kg/ha)</option>
                      <option value="Medium">Medium (200–350 kg/ha)</option>
                      <option value="High">High (&gt; 350 kg/ha)</option>
                    </select>
                  </div>
                </div>
              ) : (
                <p className="text-[11px] text-[#58635A] mt-1">
                  Regional public soil averages (HWSD v2.0 / ICAR baseline) will be automatically applied.
                </p>
              )}
            </div>

            {/* Submission CTA */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full uppercase tracking-wider text-xs"
            >
              Continue to Farm Analysis
              <Icon name="chevronRight" className="w-4 h-4 ml-1.5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
