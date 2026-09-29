"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FarmPage() {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeLayer, setActiveLayer] = useState<"ndvi" | "moisture" | "zones">("ndvi");
  const [syncing, setSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([
    "[System] Ready. Waiting for Copernicus Sentinel-2 query...",
    "[Telemetry] Last recorded pass: 3 days ago · Cloud coverage: 2.1%",
    "[Orbit] Next satellite transit over Ahmedabad: Today 11:28 IST",
  ]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [farmName, setFarmName] = useState("Ahmedabad Wheat Parcel Alpha");
  const [acres, setAcres] = useState("2.5");
  const [crop, setCrop] = useState("wheat");
  const [sowDate, setSowDate] = useState("2025-11-15");
  const [irrigation, setIrrigation] = useState("canal");
  const [tillage, setTillage] = useState("reduced");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Render GIS Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Satellite tile base
    ctx.fillStyle = "#D6DDD0";
    ctx.fillRect(0, 0, w, h);

    // Contour lines
    ctx.strokeStyle = "#CAD3C3";
    ctx.lineWidth = 1;
    for (let y = 30; y < h; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.3, y - 20, w * 0.7, y + 20, w, y);
      ctx.stroke();
    }

    // Parcel Boundary polygon (2.5 acre plot)
    const pts = [
      { x: 70, y: 60 },
      { x: 520, y: 75 },
      { x: 500, y: 350 },
      { x: 90, y: 330 },
    ];

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.clip();

    if (activeLayer === "ndvi") {
      const grad = ctx.createLinearGradient(70, 60, 520, 350);
      grad.addColorStop(0, "#2F7341");
      grad.addColorStop(0.7, "#479B58");
      grad.addColorStop(1, "#B5C467");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (activeLayer === "moisture") {
      const grad = ctx.createLinearGradient(70, 60, 500, 350);
      grad.addColorStop(0, "#2D758C");
      grad.addColorStop(0.6, "#3A9BB8");
      grad.addColorStop(1, "#97CBD9");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    } else if (activeLayer === "zones") {
      ctx.fillStyle = "#2F7341";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "rgba(201, 154, 46, 0.75)";
      ctx.beginPath();
      ctx.arc(430, 270, 110, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    // Outline parcel boundary
    ctx.beginPath();
    ctx.moveTo(pts[0].x, pts[0].y);
    pts.forEach((p) => ctx.lineTo(p.x, p.y));
    ctx.closePath();
    ctx.strokeStyle = "#14201A";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Corner GPS markers
    pts.forEach((p) => {
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#14201A";
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    // GIS Labels
    ctx.font = '12px "Instrument Sans", sans-serif';
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.6)";
    ctx.shadowBlur = 4;
    ctx.fillText("Zone A (High Vigor · 1.8 ac)", 120, 180);
    ctx.fillText("Zone B (Sandy Loam Spot · 0.7 ac)", 310, 280);
    ctx.shadowBlur = 0;
  }, [activeLayer]);

  const handleSyncSatellite = () => {
    setSyncing(true);
    const newLogs = [
      `[${new Date().toLocaleTimeString()}] Authenticating Copernicus Open Access Hub API...`,
      `[${new Date().toLocaleTimeString()}] Resolving footprint tile T43QDA (Ahmedabad Rural)...`,
      `[${new Date().toLocaleTimeString()}] Fetching Sentinel-2 Level-2A BOA surface bands...`,
      `[${new Date().toLocaleTimeString()}] Atmospheric aerosol correction applied (Sen2Cor v2.10)...`,
      `[${new Date().toLocaleTimeString()}] Mean NDVI calculated across 2.5 acres: 0.714...`,
      `[${new Date().toLocaleTimeString()}] Gemini 1.5 synthesized latest advisory: CADS packet verified. DONE.`,
    ];

    let i = 0;
    setSyncLogs([]);
    const interval = setInterval(() => {
      if (i < newLogs.length) {
        setSyncLogs((prev) => [...prev, newLogs[i]]);
        i++;
      } else {
        clearInterval(interval);
        setSyncing(false);
        showToast("Sentinel-2 Telemetry in Sync");
      }
    }, 450);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem(
        "agrin_active_farm",
        JSON.stringify({
          farm: {
            name: farmName,
            area: parseFloat(acres) || 2.5,
            crop,
            location: "Ahmedabad, Gujarat",
            country: "India",
            stage: "Tillering",
          },
        })
      );
    } catch {}
    showToast("Farm parameters updated across network model");
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
            My Farm Parcel
          </h1>
          <p className="text-[var(--muted)] text-[1.05rem] mt-1 max-w-2xl">
            GIS field perimeter boundary, multispectral layer selector, and direct Sentinel-2 telemetry synchronizer.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8">
          {/* Left: Parcel GIS Canvas & Terminal */}
          <div>
            <div className="relative rounded-[var(--radius)] overflow-hidden border border-[var(--line)] bg-[#E8EBDF] h-[420px] shadow-xs">
              <div className="absolute top-3.5 left-3.5 flex gap-2 z-10 bg-[var(--surface)] p-1 rounded-full border border-[var(--line)] shadow-xs">
                <button
                  type="button"
                  onClick={() => setActiveLayer("ndvi")}
                  className={`border-0 px-3 py-1.5 text-xs rounded-full transition-colors ${
                    activeLayer === "ndvi"
                      ? "bg-[var(--ink)] text-white font-medium"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  NDVI Greenness
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer("moisture")}
                  className={`border-0 px-3 py-1.5 text-xs rounded-full transition-colors ${
                    activeLayer === "moisture"
                      ? "bg-[var(--ink)] text-white font-medium"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  NDWI Moisture
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLayer("zones")}
                  className={`border-0 px-3 py-1.5 text-xs rounded-full transition-colors ${
                    activeLayer === "zones"
                      ? "bg-[var(--ink)] text-white font-medium"
                      : "text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  Management Zones
                </button>
              </div>

              <canvas
                ref={canvasRef}
                width={600}
                height={420}
                className="w-full h-full block"
              />
            </div>

            <div className="flex justify-between items-center mt-3 text-[0.85rem] text-[var(--muted)] font-mono">
              <span>Parcel ID: IND-GJ-AMD-2024-0089</span>
              <span>{"Coordinates: 23°01'44.2\"N 72°34'12.0\"E"}</span>
            </div>

            {/* Sync Terminal Box */}
            <div className="card-tmpl mt-5">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-[1rem] font-medium text-[var(--ink)]">
                  Sentinel-2 Live Earth Observation Sync
                </h4>
                <button
                  disabled={syncing}
                  onClick={handleSyncSatellite}
                  className="btn-tmpl btn-tmpl-primary btn-tmpl-sm text-xs"
                >
                  {syncing ? "Querying Orbit..." : "Sync Satellite Pass"}
                </button>
              </div>

              <div className="bg-[#0E1611] text-[#8BE49B] font-mono text-[0.8rem] p-4 rounded-lg h-44 overflow-y-auto leading-relaxed border border-[#1B3A26]">
                {syncLogs.map((log, index) => (
                  <div key={index}>{log}</div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Parcel Parameters Editor */}
          <div className="card-tmpl">
            <h3 className="text-[1.25rem] font-medium mb-4 text-[var(--ink)]">
              Field Parcel Parameters
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
              <div>
                <label className="block text-[0.85rem] text-[var(--muted)] mb-1.5 font-medium">
                  Parcel Name & Location
                </label>
                <input
                  type="text"
                  value={farmName}
                  onChange={(e) => setFarmName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[0.95rem] focus:outline-none focus:border-[var(--leaf)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[0.85rem] text-[var(--muted)] mb-1.5 font-medium">
                    Acreage (Acres)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={acres}
                    onChange={(e) => setAcres(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[0.95rem] focus:outline-none focus:border-[var(--leaf)]"
                  />
                </div>
                <div>
                  <label className="block text-[0.85rem] text-[var(--muted)] mb-1.5 font-medium">
                    Primary Crop
                  </label>
                  <select
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[0.95rem] focus:outline-none focus:border-[var(--leaf)]"
                  >
                    <option value="wheat">Wheat (Triticum durum)</option>
                    <option value="cotton">Cotton (Bt Cotton)</option>
                    <option value="chickpea">Chickpea (Gram pulse)</option>
                    <option value="mustard">Mustard (Oilseed)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[0.85rem] text-[var(--muted)] mb-1.5 font-medium">
                  Sowing Date
                </label>
                <input
                  type="date"
                  value={sowDate}
                  onChange={(e) => setSowDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[0.95rem] focus:outline-none focus:border-[var(--leaf)]"
                />
              </div>

              <div>
                <label className="block text-[0.85rem] text-[var(--muted)] mb-1.5 font-medium">
                  Irrigation Infrastructure
                </label>
                <select
                  value={irrigation}
                  onChange={(e) => setIrrigation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[0.95rem] focus:outline-none focus:border-[var(--leaf)]"
                >
                  <option value="canal">Canal Gravity Flow / Furrow</option>
                  <option value="drip">Drip Irrigation System (Micro)</option>
                  <option value="sprinkler">Sprinkler Guns</option>
                  <option value="rainfed">Pure Rainfed / Zero Bore</option>
                </select>
              </div>

              <div>
                <label className="block text-[0.85rem] text-[var(--muted)] mb-1.5 font-medium">
                  Soil Management Baseline
                </label>
                <select
                  value={tillage}
                  onChange={(e) => setTillage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[var(--line)] bg-[var(--bg)] text-[var(--ink)] text-[0.95rem] focus:outline-none focus:border-[var(--leaf)]"
                >
                  <option value="reduced">Reduced Till + Organic Mulch</option>
                  <option value="conv">Conventional Deep Disc Plowing</option>
                  <option value="zero">Zero Tillage (Happy Seeder)</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  type="submit"
                  className="btn-tmpl btn-tmpl-primary w-full text-center"
                >
                  Save Parcel Profile
                </button>
                <Link
                  href="/dashboard"
                  className="btn-tmpl btn-tmpl-ghost w-full text-center text-xs"
                >
                  Return to Dashboard →
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
