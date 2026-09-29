"use client";

import React, { useState } from "react";
import Link from "next/link";
import SatelliteGrowthTimeline from "@/components/dashboard/SatelliteGrowthTimeline";
import ReasoningTraceModal from "@/components/dashboard/ReasoningTraceModal";

export default function DashboardPage() {
  const [ndviVal, setNdviVal] = useState("0.71 NDVI");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tasks checklist state
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Check tensiometer in southeast parcel corner (Zone C)",
      sub: "Completed 8:30 AM",
      done: true,
      priority: false,
    },
    {
      id: 2,
      text: "Hold canal valve; postpone scheduled Thursday pump operation",
      sub: "High Priority",
      done: false,
      priority: true,
    },
    {
      id: 3,
      text: "Foliar spray with fermented buttermilk / Jeevamrutha after rain event",
      sub: "Scheduled for Friday",
      done: false,
      priority: false,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const handleToggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextDone = !t.done;
          showToast(nextDone ? "Task marked complete" : "Task reopened");
          return { ...t, done: nextDone };
        }
        return t;
      })
    );
  };

  const completedCount = tasks.filter((t) => t.done).length;

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
        <div className="wrap flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-[2rem] sm:text-[2.6rem] font-medium leading-tight text-[var(--ink)]">
              Farm Dashboard
            </h1>
            <p className="text-[var(--muted)] text-[1.05rem] mt-1 max-w-2xl">
              Live satellite telemetry, evapotranspiration rates, and explainable AI irrigation scheduling.
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-tmpl btn-tmpl-ghost btn-tmpl-sm text-xs"
            >
              Inspect Reasoning Trace
            </button>
            <Link href="/farm" className="btn-tmpl btn-tmpl-primary btn-tmpl-sm text-xs">
              Adjust Parcel
            </Link>
          </div>
        </div>
      </div>

      <div className="wrap space-y-7">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="kpi-card">
            <div className="label">Canopy Greenness</div>
            <div className="val text-[var(--ink)]">{ndviVal}</div>
            <div className="sub text-[var(--leaf)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--leaf)] inline-block" />
              Healthy vegetative vigor
            </div>
          </div>

          <div className="kpi-card">
            <div className="label">Root Moisture (15cm)</div>
            <div className="val text-[var(--ink)]">28.4%</div>
            <div className="sub text-[var(--leaf)]">Adequate field capacity</div>
          </div>

          <div className="kpi-card">
            <div className="label">Forecast Rain (48h)</div>
            <div className="val text-[var(--ink)]">18 mm</div>
            <div className="sub text-[var(--stress)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--stress)] inline-block animate-pulse" />
              82% confidence storm
            </div>
          </div>

          <div className="kpi-card">
            <div className="label">Recommended Action</div>
            <div className="val text-[1.35rem] text-[var(--leaf)] font-bold">
              Delay Irrigation
            </div>
            <div className="sub text-[var(--muted)]">Saves 42,000L borehole water</div>
          </div>
        </div>

        {/* Main Split: Timeline on Left, AI Reasoning & Soil on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
          {/* Left: Satellite Scrubber */}
          <div>
            <SatelliteGrowthTimeline
              onNDVIChange={(val) => setNdviVal(val)}
              onToast={showToast}
            />
          </div>

          {/* Right: Explainable AI Chain & Soil Chemistry */}
          <div className="flex flex-col gap-5">
            {/* Explainable AI Card */}
            <div className="card-tmpl reasoning-card">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[1.15rem] font-medium text-[var(--ink)]">
                  Explainable AI Reasoning (Gemini)
                </h3>
                <span className="text-[0.75rem] bg-[var(--leaf-soft)] text-[var(--leaf)] px-2 py-0.5 rounded-full font-semibold">
                  Determinism 99.4%
                </span>
              </div>

              <div className="chain-node">
                <h4 className="text-[0.95rem] font-medium text-[var(--ink)]">
                  1. Weather Observation
                </h4>
                <p className="text-[0.85rem] text-[var(--muted)]">
                  Open-Meteo ECMWF predicts a low depression with 18mm rain arriving within 36–48h.
                </p>
              </div>

              <div className="chain-node">
                <h4 className="text-[0.95rem] font-medium text-[var(--ink)]">
                  2. Soil Physics Check
                </h4>
                <p className="text-[0.85rem] text-[var(--muted)]">
                  HWSD loamy clay retention holds 28% water, providing a safe 72-hour moisture buffer.
                </p>
              </div>

              <div className="chain-node">
                <h4 className="text-[0.95rem] font-medium text-[var(--ink)]">
                  3. Synthesized Directive
                </h4>
                <p className="text-[0.85rem] text-[var(--muted)]">
                  <strong>Delay scheduled canal irrigation by 48 hours</strong> to prevent root rot and nitrogen leaching.
                </p>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-tmpl btn-tmpl-ghost btn-tmpl-sm w-full mt-2 text-xs"
              >
                Inspect Full Logic Graph
              </button>
            </div>

            {/* Soil Chemistry Profile */}
            <div className="card-tmpl">
              <h3 className="text-[1.15rem] font-medium text-[var(--ink)]">
                Soil Profile (HWSD v2.0 Grid)
              </h3>
              <p className="text-[0.85rem] text-[var(--muted)] mt-0.5">
                Alluvial Vertic Cambisols · Ahmedabad District
              </p>

              <div className="soil-metrics-grid">
                <div className="soil-pill">
                  <small className="text-[var(--muted)]">Soil Organic C</small>
                  <strong className="text-[var(--ink)]">0.64%</strong>
                  <div className="text-[0.72rem] text-[var(--stress)] font-medium">Needs +0.4%</div>
                </div>
                <div className="soil-pill">
                  <small className="text-[var(--muted)]">pH (H₂O 1:2.5)</small>
                  <strong className="text-[var(--ink)]">7.4</strong>
                  <div className="text-[0.72rem] text-[var(--leaf)] font-medium">Neutral</div>
                </div>
                <div className="soil-pill">
                  <small className="text-[var(--muted)]">C:N Ratio</small>
                  <strong className="text-[var(--ink)]">11.2</strong>
                  <div className="text-[0.72rem] text-[var(--leaf)] font-medium">Optimal decomp</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day ECMWF Atmospheric & ET0 Water Evaporation */}
        <div className="card-tmpl">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
            <div>
              <h3 className="text-[1.2rem] font-medium text-[var(--ink)]">
                7-Day ECMWF Atmospheric & ET₀ Water Evaporation
              </h3>
              <p className="text-[0.85rem] text-[var(--muted)]">
                Ahmedabad Station (23.0225° N, 72.5714° E) via Open-Meteo Ensemble
              </p>
            </div>
            <span className="text-[0.82rem] text-[var(--muted)] font-mono self-start sm:self-auto">
              ET₀ total: 24.2 mm/wk
            </span>
          </div>

          <div className="forecast-grid">
            <div className="forecast-day">
              <div className="day-name">TODAY</div>
              <div className="icon">☀️</div>
              <strong>28° / 17°</strong>
              <div className="text-[0.75rem] text-[var(--muted)] mt-1">ET₀ 4.2mm</div>
              <div className="rain-badge">0% rain</div>
            </div>
            <div className="forecast-day">
              <div className="day-name">WED</div>
              <div className="icon">⛅</div>
              <strong>29° / 18°</strong>
              <div className="text-[0.75rem] text-[var(--muted)] mt-1">ET₀ 4.0mm</div>
              <div className="rain-badge">10% rain</div>
            </div>
            <div className="forecast-day rainy">
              <div className="day-name">THU</div>
              <div className="icon">🌧️</div>
              <strong>24° / 16°</strong>
              <div className="text-[0.75rem] text-[var(--muted)] mt-1">ET₀ 1.8mm</div>
              <div className="rain-badge font-bold">82% · 18mm</div>
            </div>
            <div className="forecast-day rainy">
              <div className="day-name">FRI</div>
              <div className="icon">🌦️</div>
              <strong>26° / 16°</strong>
              <div className="text-[0.75rem] text-[var(--muted)] mt-1">ET₀ 2.5mm</div>
              <div className="rain-badge font-bold">65% · 6mm</div>
            </div>
            <div className="forecast-day">
              <div className="day-name">SAT</div>
              <div className="icon">🌤️</div>
              <strong>27° / 17°</strong>
              <div className="text-[0.75rem] text-[var(--muted)] mt-1">ET₀ 3.8mm</div>
              <div className="rain-badge">15% rain</div>
            </div>
            <div className="forecast-day">
              <div className="day-name">SUN</div>
              <div className="icon">☀️</div>
              <strong>28° / 17°</strong>
              <div className="text-[0.75rem] text-[var(--muted)] mt-1">ET₀ 3.9mm</div>
              <div className="rain-badge">5% rain</div>
            </div>
            <div className="forecast-day">
              <div className="day-name">MON</div>
              <div className="icon">☀️</div>
              <strong>29° / 18°</strong>
              <div className="text-[0.75rem] text-[var(--muted)] mt-1">ET₀ 4.0mm</div>
              <div className="rain-badge">0% rain</div>
            </div>
          </div>
        </div>

        {/* Agronomic Protocol Tasks Checklist */}
        <div className="card-tmpl">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h3 className="text-[1.2rem] font-medium text-[var(--ink)]">
                Agronomic Protocol Tasks
              </h3>
              <p className="text-[0.85rem] text-[var(--muted)]">
                Actions calculated by CADS policy rules for current vegetative stage.
              </p>
            </div>
            <span className="text-[0.8rem] bg-[var(--leaf-soft)] text-[var(--leaf)] px-3 py-1 rounded-full font-semibold font-mono">
              {completedCount} of {tasks.length} Done
            </span>
          </div>

          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <label>
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => handleToggleTask(task.id)}
                  />
                  <span
                    className={
                      task.done ? "line-through text-[var(--muted)]" : "text-[var(--ink)]"
                    }
                  >
                    {task.text}
                  </span>
                </label>
                <span
                  className={`text-[0.8rem] ${
                    task.done
                      ? "text-[var(--leaf)] font-medium"
                      : task.priority
                      ? "text-[var(--stress)] font-semibold"
                      : "text-[var(--muted)]"
                  }`}
                >
                  {task.sub}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Reasoning Tree Inspection Modal */}
      <ReasoningTraceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
