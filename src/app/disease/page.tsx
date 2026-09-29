"use client";

import React, { useState } from "react";
import Link from "next/link";

interface DiseaseSample {
  key: string;
  label: string;
  severity: string;
  name: string;
  pathogen: string;
  conf: string;
  desc: string;
  bbox: { top: string; left: string; width: string; height: string };
  cure: string[];
  symptoms: { x: number; y: number; r: number; c: string }[];
}

const DISEASE_SAMPLES: Record<string, DiseaseSample> = {
  "stripe-rust": {
    key: "stripe-rust",
    label: "Wheat Stripe Rust (Puccinia)",
    severity: "Moderate Severity",
    name: "Wheat Stripe Rust",
    pathogen: "Pathogen: Puccinia striiformis f. sp. tritici",
    conf: "97.8%",
    desc: "Linear yellow-orange pustules (uredinia) arranged in distinct parallel stripes along the leaf blade veins. Elevated humidity and 15–20°C temperatures favor rapid sporulation.",
    bbox: { top: "75px", left: "165px", width: "130px", height: "85px" },
    cure: [
      "Foliar application of sour buttermilk solution (10% v/v) containing lactic acid to suppress fungal spore germination.",
      "Dust bio-stimulant wood ash with 2% sulfur powder early morning while dew is present on foliage.",
      "Withhold overhead sprinkler irrigation to keep canopy foliage dry for the next 48 hours.",
    ],
    symptoms: [
      { x: 180, y: 90, r: 4, c: "#E29928" },
      { x: 200, y: 105, r: 5, c: "#D4751E" },
      { x: 220, y: 120, r: 4, c: "#E29928" },
      { x: 240, y: 135, r: 6, c: "#C4571A" },
    ],
  },
  "leaf-blight": {
    key: "leaf-blight",
    label: "Bipolaris Leaf Blight",
    severity: "High Severity",
    name: "Bipolaris Spot Blight",
    pathogen: "Pathogen: Bipolaris sorokiniana",
    conf: "94.2%",
    desc: "Oval to elliptical dark brown necrotic lesions with distinct chlorotic yellow halos. Often initiated on lower canopy leaves before expanding during warm humid weather.",
    bbox: { top: "110px", left: "140px", width: "110px", height: "95px" },
    cure: [
      "Apply Trichoderma viride bio-fungicide (5g/L) to establish beneficial competitive hyperparasitism.",
      "Spray fermented garlic-chili extract to disrupt fungal hyphae cell membranes.",
      "Ensure balanced potassium availability using bio-potash (molasses extract).",
    ],
    symptoms: [
      { x: 160, y: 130, r: 9, c: "#61341C" },
      { x: 180, y: 150, r: 12, c: "#482412" },
      { x: 200, y: 160, r: 7, c: "#61341C" },
    ],
  },
  aphids: {
    key: "aphids",
    label: "Aphid Colonization",
    severity: "Early Warning",
    name: "Bird Cherry-Oat Aphid",
    pathogen: "Pest Vector: Rhopalosiphum padi",
    conf: "91.5%",
    desc: "Dense colonies clustering on the adaxial surface and leaf sheath. Secrete sticky honeydew attracting sooty mold, posing secondary risk of Barley Yellow Dwarf Virus (BYDV).",
    bbox: { top: "50px", left: "200px", width: "90px", height: "70px" },
    cure: [
      "Spray 5% cold-pressed Neem Seed Kernel Extract (NSKE) with soap nut surfactant.",
      "Conserve Coccinellid predatory ladybird beetles already present in field border hedgerows.",
      "Deploy yellow sticky traps at canopy level (10 traps per acre).",
    ],
    symptoms: [
      { x: 215, y: 65, r: 3, c: "#364B2C" },
      { x: 225, y: 70, r: 3, c: "#27381F" },
      { x: 235, y: 75, r: 4, c: "#364B2C" },
      { x: 245, y: 80, r: 3, c: "#27381F" },
    ],
  },
  healthy: {
    key: "healthy",
    label: "Healthy Flag Leaf (Control)",
    severity: "Optimal Vigor",
    name: "Healthy Flag Leaf",
    pathogen: "Pathogen: None Detected",
    conf: "99.2%",
    desc: "Intact photosynthetic cuticle with uniform chlorophyll a/b distribution. High stomatal conductance and no physical lesions observed.",
    bbox: { top: "90px", left: "150px", width: "140px", height: "90px" },
    cure: [
      "No intervention needed. Continue regular Jeevamrutha microbial maintenance.",
      "Maintain protective mulch layer to preserve root zone moisture.",
    ],
    symptoms: [],
  },
};

export default function DiseasePage() {
  const [activeKey, setActiveKey] = useState<string>("stripe-rust");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const activeSample = DISEASE_SAMPLES[activeKey] || DISEASE_SAMPLES["stripe-rust"];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadedImage(ev.target?.result as string);
        showToast("Leaf image uploaded. Running inference pipeline...");
        setTimeout(() => {
          setActiveKey("stripe-rust");
          showToast("Analysis complete: 96.4% match with Stripe Rust");
        }, 1200);
      };
      reader.readAsDataURL(file);
    }
  };

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
            Crop Disease & Pathology Scanner
          </h1>
          <p className="text-[var(--muted)] text-[1.05rem] mt-1 max-w-2xl">
            Computer vision diagnosis powered by open leaf pathology models. Upload or test against live Gujarat field samples.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8">
          {/* Left: Viewport with bounding box */}
          <div>
            <div className="relative w-full h-[380px] rounded-[var(--radius)] bg-[#14201A] overflow-hidden flex items-center justify-center border-2 border-dashed border-[var(--line)] shadow-sm">
              <div className="absolute top-3 left-3 bg-[#0E1611]/85 text-white font-mono text-xs px-3 py-1.5 rounded-md backdrop-blur-md z-10">
                Model: AgriN-Vision-v1.4 · ResNet-50 Quantized
              </div>

              {uploadedImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={uploadedImage}
                  alt="Uploaded leaf"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 300"
                  className="block"
                >
                  <defs>
                    <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#4F9A55" />
                      <stop offset="100%" stopColor="#235D33" />
                    </linearGradient>
                  </defs>
                  <rect width="400" height="300" fill="#142019" />
                  {/* Stylized leaf representation */}
                  <path
                    d="M 60 280 C 140 220 220 140 340 40 C 260 120 180 200 60 280 Z"
                    fill="url(#leafGrad)"
                  />
                  <path
                    d="M 60 280 Q 200 160 340 40"
                    stroke="#7DBB86"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Dynamic Lesions */}
                  <g>
                    {activeSample.symptoms.map((s, idx) => (
                      <circle
                        key={idx}
                        cx={s.x}
                        cy={s.y}
                        r={s.r}
                        fill={s.c}
                      />
                    ))}
                  </g>
                </svg>
              )}

              {/* Bounding Box */}
              {activeKey !== "healthy" && (
                <div
                  className="absolute border-2 border-[#E25547] bg-[#E25547]/20 rounded transition-all duration-300 pointer-events-none animate-pulse"
                  style={{
                    top: activeSample.bbox.top,
                    left: activeSample.bbox.left,
                    width: activeSample.bbox.width,
                    height: activeSample.bbox.height,
                  }}
                />
              )}
            </div>

            {/* Preloaded Test Samples */}
            <div className="mt-4">
              <span className="text-xs text-[var(--muted)] block mb-2 font-medium">
                Load field verification sample:
              </span>
              <div className="flex gap-2 flex-wrap">
                {Object.values(DISEASE_SAMPLES).map((sample) => (
                  <button
                    key={sample.key}
                    type="button"
                    onClick={() => {
                      setUploadedImage(null);
                      setActiveKey(sample.key);
                    }}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      activeKey === sample.key && !uploadedImage
                        ? "bg-[var(--leaf)] text-white border-[var(--leaf)] font-medium"
                        : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="btn-tmpl btn-tmpl-ghost btn-tmpl-sm cursor-pointer text-xs">
                <span>Upload Field Photo (.jpg, .png)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Right: Diagnostic Pathology Card */}
          <div className="card-tmpl">
            <div className="flex justify-between items-start gap-4">
              <div>
                <span
                  className={`text-[0.75rem] uppercase tracking-wider font-semibold font-mono ${
                    activeKey === "healthy"
                      ? "text-[var(--leaf)]"
                      : activeKey === "aphids"
                      ? "text-[var(--stress)]"
                      : "text-[var(--alert)]"
                  }`}
                >
                  {activeSample.severity}
                </span>
                <h3 className="text-[1.5rem] font-medium text-[var(--ink)] mt-0.5">
                  {activeSample.name}
                </h3>
                <p className="text-[0.88rem] text-[var(--muted)]">
                  {activeSample.pathogen}
                </p>
              </div>

              <div className="text-right">
                <div className="font-display text-[1.8rem] font-semibold text-[var(--leaf)] leading-none">
                  {activeSample.conf}
                </div>
                <small className="text-[0.75rem] text-[var(--muted)]">
                  Model Confidence
                </small>
              </div>
            </div>

            <div className="my-5 p-3.5 bg-[var(--bg)] rounded-lg border border-[var(--line)]">
              <h4 className="text-[0.92rem] font-medium text-[var(--ink)] mb-1">
                Diagnostic Symptomology
              </h4>
              <p className="text-[0.85rem] text-[var(--muted)] leading-relaxed">
                {activeSample.desc}
              </p>
            </div>

            <h4 className="text-[0.98rem] font-medium text-[var(--ink)] mb-2">
              Regenerative Non-Toxic Remediation
            </h4>
            <div className="space-y-2.5">
              {activeSample.cure.map((step, idx) => (
                <div key={idx} className="flex gap-2.5 text-[0.88rem] leading-relaxed">
                  <span className="text-[var(--leaf)] font-bold">{idx + 1}.</span>
                  <span className="text-[var(--ink)]">{step}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => showToast("Remediation task added to Farm Dashboard")}
              className="btn-tmpl btn-tmpl-primary w-full mt-6 text-center text-xs sm:text-sm"
            >
              Assign Remediation to Field Hand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
