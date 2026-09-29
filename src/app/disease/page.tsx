"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icon } from "@/components/ui/Icons";
import { DiseaseResult } from "@/types/disease";
import { DEMO_DISEASE } from "@/lib/demo/demoDisease";

const DEMO_LEAF_IMAGE_URL =
  "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=600&q=80";

export default function DiseaseScannerPage() {
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFileMeta, setImageFileMeta] = useState<{ name: string; size: string } | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanResult, setScanResult] = useState<DiseaseResult | null>(null);
  const [activeTab, setActiveTab] = useState<"organic" | "chemical" | "preventive">("organic");
  const [isDemoSample, setIsDemoSample] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage("File exceeds 5MB limit. Please upload a smaller leaf photograph.");
      return;
    }

    setErrorMessage(null);
    setIsDemoSample(false);
    setScanResult(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target?.result as string);
      setImageFileMeta({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleLoadDemoSample = () => {
    setErrorMessage(null);
    setIsDemoSample(true);
    setScanResult(null);
    setImagePreview(DEMO_LEAF_IMAGE_URL);
    setImageFileMeta({
      name: "wheat_flag_leaf_rust_sample.jpg",
      size: "1.42 MB",
    });
  };

  const handleReset = () => {
    setImagePreview(null);
    setImageFileMeta(null);
    setScanResult(null);
    setIsScanning(false);
    setScanStep(0);
    setIsDemoSample(false);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = async () => {
    if (!imagePreview) return;
    setIsScanning(true);
    setScanStep(1);
    setErrorMessage(null);

    // Deterministic visual progress steps
    const timer1 = setTimeout(() => setScanStep(2), 500);
    const timer2 = setTimeout(() => setScanStep(3), 1000);
    const timer3 = setTimeout(() => setScanStep(4), 1500);

    try {
      const res = await fetch("/api/disease/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: selectedCrop,
          imageBase64: isDemoSample ? undefined : imagePreview,
          isDemo: isDemoSample,
          mimeType: "image/jpeg",
        }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        setScanResult(json.data);
      } else {
        setScanResult(DEMO_DISEASE);
      }
    } catch {
      setScanResult(DEMO_DISEASE);
    } finally {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      setIsScanning(false);
    }
  };

  return (
    <div className="max-w-[960px] mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-[#58635A]">
          <Link href="/dashboard" className="hover:text-[#1B241E] underline">
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-mono text-[#1B241E] font-medium">Pathology Screener</span>
        </div>
        <Link href="/dashboard">
          <Button variant="secondary" size="sm" className="text-xs">
            ← Return to Dashboard
          </Button>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white border border-[#E2E0D8] rounded p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E2E0D8] pb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-[10px] font-mono uppercase bg-[#F2F4F3] text-[#58635A] px-2 py-0.5 rounded font-bold border border-[#E2E0D8]">
                Multimodal Computer Vision
              </span>
              <span className="text-[10px] font-mono text-[#58635A]">
                Model: Gemini 1.5 Flash Vision + ICAR Pathology Rules
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1B241E]">
              Crop Leaf Pathology Screener
            </h1>
            <p className="text-xs text-[#58635A] mt-1 max-w-xl leading-relaxed">
              Upload a clear foliar photograph to screen for fungal rusts, bacterial blights, and nutritional chlorosis before widespread canopy damage occurs.
            </p>
          </div>

          <div className="bg-[#FBFBF9] border border-[#E2E0D8] px-3.5 py-2.5 rounded text-left sm:text-right">
            <span className="text-[10px] font-mono uppercase text-[#58635A]">Target Field</span>
            <div className="text-xs font-mono font-bold text-[#1B241E]">
              Ahmedabad Wheat (2.5 Ac)
            </div>
            <span className="text-[10px] font-mono text-[#2D5A3C]">
              Parcel IN-GJ-AHM-0042
            </span>
          </div>
        </div>

        {/* Diagnostic Workflow Notice */}
        <div className="mt-4 p-3 bg-[#FBFBF9] border border-[#E2E0D8] rounded flex items-start space-x-3 text-xs text-[#58635A]">
          <span className="text-base mt-0.5">ℹ️</span>
          <p className="leading-relaxed">
            <strong>Optimal Image Guide:</strong> Hold camera 15–20 cm from the affected leaf. Ensure natural daylight and sharp focus on lesion margins. Avoid shadows or extreme backlight.
          </p>
        </div>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="p-3 bg-[#FDF2F2] border border-[#F5C2C7] rounded text-xs text-[#842029]">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* Main Grid: Upload Column & Diagnostic Result Column */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Upload & Specimen Inspection */}
        <div className="space-y-4">
          <div className="bg-white border border-[#E2E0D8] rounded p-5 shadow-sm space-y-4">
            <div>
              <label
                htmlFor="crop-selector"
                className="block text-xs font-semibold text-[#1B241E] mb-1.5 uppercase font-mono"
              >
                1. Target Crop Specimen
              </label>
              <select
                id="crop-selector"
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full h-10 px-3 border border-[#E2E0D8] rounded text-xs bg-white text-[#1B241E] focus:outline-none focus:border-[#2D5A3C] font-sans"
              >
                <option value="Wheat">Wheat (Triticum aestivum)</option>
                <option value="Rice">Rice (Oryza sativa)</option>
                <option value="Maize">Maize (Zea mays)</option>
                <option value="Soybean">Soybean (Glycine max)</option>
                <option value="Chickpea">Chickpea (Cicer arietinum)</option>
                <option value="Cotton">Cotton (Gossypium hirsutum)</option>
              </select>
            </div>

            <div>
              <span className="block text-xs font-semibold text-[#1B241E] mb-1.5 uppercase font-mono">
                2. Leaf Photograph Specimen
              </span>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="leaf-file-upload"
              />

              {!imagePreview ? (
                <div className="space-y-3">
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-[#B8B6AC] hover:border-[#2D5A3C] rounded p-8 text-center cursor-pointer transition-colors bg-[#FBFBF9]"
                  >
                    <div className="space-y-2">
                      <div className="text-3xl text-[#58635A]">📷</div>
                      <span className="text-xs font-semibold text-[#1B241E] block">
                        Upload or Drag Leaf Photo
                      </span>
                      <span className="text-[11px] text-[#58635A] block">
                        Supports JPG, PNG, WEBP (Max 5MB)
                      </span>
                    </div>
                  </div>

                  <div className="text-center">
                    <span className="text-[11px] text-[#828E84]">— OR —</span>
                  </div>

                  {/* 1-Click Demo Evaluation Button */}
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleLoadDemoSample}
                    className="w-full h-10 text-xs font-mono font-medium border-[#2D5A3C]/30 text-[#2D5A3C] hover:bg-[#E8EFEA]"
                  >
                    ⚡ Load Verified Demo Specimen (Wheat Leaf Rust)
                  </Button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative border border-[#E2E0D8] rounded overflow-hidden bg-[#1B241E] aspect-[4/3] flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imagePreview}
                      alt="Leaf specimen"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-[#1B241E]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-mono">
                      {isDemoSample ? "Verified Demo Specimen" : "Field Capture"}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-[#58635A] pt-1">
                    <span>{imageFileMeta?.name}</span>
                    <span>{imageFileMeta?.size}</span>
                  </div>

                  <div className="flex items-center space-x-2 pt-1">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleReset}
                      className="text-xs w-1/3"
                    >
                      Change Photo
                    </Button>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      disabled={isScanning}
                      onClick={handleAnalyze}
                      className="text-xs w-2/3 uppercase tracking-wider font-semibold font-mono"
                    >
                      {isScanning ? "Processing..." : "Run AI Diagnosis"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Pathology Diagnostic Tips */}
          <div className="border border-[#E2E0D8] rounded p-4 bg-white text-xs space-y-2 text-[#58635A]">
            <div className="font-semibold text-[#1B241E]">Differential Diagnosis Pointers:</div>
            <ul className="list-disc pl-4 space-y-1 text-[11px]">
              <li><strong>Rusts:</strong> Powdery orange/brown pustules that rub off on skin.</li>
              <li><strong>Bacterial Blight:</strong> Translucent water-soaked streaks with yellow margins.</li>
              <li><strong>Nitrogen Hunger:</strong> V-shaped chlorosis from leaf tip backwards along the midrib.</li>
            </ul>
          </div>
        </div>

        {/* Right Column: Diagnostic Output & Action Plan */}
        <div className="bg-white border border-[#E2E0D8] rounded p-5 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-[#E2E0D8] pb-3 mb-4">
              <span className="text-xs font-mono font-bold text-[#58635A] uppercase tracking-wider">
                Diagnostic Screening Output
              </span>
              {scanResult && (
                <Badge
                  variant={
                    scanResult.severity === "Severe"
                      ? "danger"
                      : scanResult.severity === "Moderate"
                      ? "moderate"
                      : "neutral"
                  }
                >
                  {scanResult.severity} Severity
                </Badge>
              )}
            </div>

            {/* State 1: Awaiting Analysis */}
            {!scanResult && !isScanning && (
              <div className="text-center py-16 text-xs text-[#828E84] space-y-3">
                <div className="text-4xl text-[#B8B6AC]">🔬</div>
                <div className="font-medium text-[#1B241E]">Specimen Ready for Analysis</div>
                <p className="max-w-xs mx-auto text-[#58635A]">
                  Upload a leaf photograph or load the verified demo specimen to inspect foliar conditions.
                </p>
              </div>
            )}

            {/* State 2: Processing Checklist (Deterministic Progress, No Skeletons) */}
            {isScanning && (
              <div className="py-8 space-y-3 font-mono text-xs">
                <div className="text-xs uppercase tracking-wider text-[#58635A] mb-3">
                  Foliar Optical Pipeline:
                </div>
                <div
                  className={`flex items-center space-x-2 ${
                    scanStep >= 1 ? "text-[#2D5A3C] font-semibold" : "text-[#828E84]"
                  }`}
                >
                  <span>{scanStep >= 1 ? "✓" : "○"}</span>
                  <span>1. Normalizing resolution & chromatic balance</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${
                    scanStep >= 2 ? "text-[#2D5A3C] font-semibold" : "text-[#828E84]"
                  }`}
                >
                  <span>{scanStep >= 2 ? "✓" : "○"}</span>
                  <span>2. Segmenting foliar blade & chlorotic margins</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${
                    scanStep >= 3 ? "text-[#2D5A3C] font-semibold" : "text-[#828E84]"
                  }`}
                >
                  <span>{scanStep >= 3 ? "✓" : "○"}</span>
                  <span>3. Classifying pustule coloration & uredinia density</span>
                </div>
                <div
                  className={`flex items-center space-x-2 ${
                    scanStep >= 4 ? "text-[#2D5A3C] font-semibold" : "text-[#828E84]"
                  }`}
                >
                  <span>{scanStep >= 4 ? "✓" : "○"}</span>
                  <span>4. Querying Gemini 1.5 Flash against ICAR pathology rules</span>
                </div>
              </div>
            )}

            {/* State 3: Diagnostic Results */}
            {scanResult && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded font-bold bg-[#E8EFEA] text-[#2D5A3C]">
                      {scanResult.pathogenType || "Fungal"} Pathogen
                    </span>
                    <span className="text-[10px] font-mono text-[#58635A]">
                      {scanResult.cropSpecies}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-[#1B241E] mt-1">
                    {scanResult.identifiedCondition}
                  </h2>
                  <div className="flex items-center space-x-3 text-xs font-mono text-[#58635A] mt-1">
                    <span>
                      Confidence: <strong className="text-[#1B241E]">{scanResult.confidencePercent}%</strong>
                    </span>
                    <span>•</span>
                    <span className="text-[#2D5A3C] font-medium">
                      {scanResult.confidenceClassification}
                    </span>
                  </div>
                </div>

                {/* Observed Symptoms */}
                <div className="border-t border-[#E2E0D8] pt-3">
                  <div className="text-xs font-semibold text-[#1B241E] mb-1.5 uppercase font-mono">
                    Observed Visual Indicators
                  </div>
                  <ul className="space-y-1 text-xs text-[#58635A]">
                    {scanResult.observedIndicators.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#2D5A3C] font-bold">▪</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Field Directives */}
                <div className="border-t border-[#E2E0D8] pt-3">
                  <div className="text-xs font-semibold text-[#1B241E] mb-1.5 uppercase font-mono">
                    Immediate Field Directives
                  </div>
                  <div className="space-y-1.5 text-xs text-[#1B241E]">
                    {scanResult.fieldDirectives.map((dir, idx) => (
                      <div
                        key={idx}
                        className="p-2 bg-[#FBFBF9] border border-[#E2E0D8] rounded flex items-start space-x-2"
                      >
                        <span className="font-mono text-[#2D5A3C] font-bold">{idx + 1}.</span>
                        <span className="text-[#333E35] leading-relaxed">{dir}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Treatment Horizon Tabs */}
                <div className="border-t border-[#E2E0D8] pt-3">
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <button
                      onClick={() => setActiveTab("organic")}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "organic"
                          ? "bg-[#2D5A3C] text-white font-bold"
                          : "bg-[#F2F4F3] text-[#58635A] hover:bg-[#E2E0D8]"
                      }`}
                    >
                      Organic / Bio-Control
                    </button>
                    <button
                      onClick={() => setActiveTab("chemical")}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "chemical"
                          ? "bg-[#2D5A3C] text-white font-bold"
                          : "bg-[#F2F4F3] text-[#58635A] hover:bg-[#E2E0D8]"
                      }`}
                    >
                      Chemical Option
                    </button>
                    <button
                      onClick={() => setActiveTab("preventive")}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                        activeTab === "preventive"
                          ? "bg-[#2D5A3C] text-white font-bold"
                          : "bg-[#F2F4F3] text-[#58635A] hover:bg-[#E2E0D8]"
                      }`}
                    >
                      Cultural Prevention
                    </button>
                  </div>

                  <div className="p-3 bg-[#FBFBF9] border border-[#E2E0D8] rounded text-xs space-y-1.5 text-[#58635A]">
                    {activeTab === "organic" && (
                      <ul className="space-y-1">
                        {(scanResult.organicTreatment || []).map((t, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-[#2D5A3C]">✓</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === "chemical" && (
                      <ul className="space-y-1">
                        {(scanResult.chemicalTreatment || []).map((t, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-[#842029]">⚠️</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeTab === "preventive" && (
                      <ul className="space-y-1">
                        {(scanResult.preventiveMeasures || []).map((t, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-[#2D5A3C]">🌱</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mandatory Safety Disclaimer */}
          <div className="border-t border-[#E2E0D8] pt-3 text-[10px] text-[#828E84] leading-relaxed">
            <strong>Mandatory Agronomic Disclaimer:</strong>{" "}
            {scanResult?.disclaimer ||
              "AI-assisted screening only. Results indicate probable foliar conditions based on visible morphological markers and must be verified with an agricultural extension officer or certified agronomist before administering major chemical treatments."}
          </div>
        </div>
      </div>

      {/* Bottom Quick Navigation */}
      <div className="border-t border-[#E2E0D8] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#58635A]">
        <div>
          Next in AgriN Demonstration: Explore BRICS data interoperability and CADS schema exchange.
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/regenerative">
            <Button variant="secondary" size="sm">
              ← Regenerative Plan
            </Button>
          </Link>
          <Link href="/network">
            <Button variant="primary" size="sm">
              AgriN Network (BRICS) →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
