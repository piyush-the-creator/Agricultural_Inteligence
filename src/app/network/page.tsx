"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { NetworkNode } from "@/types/network";
import { BRICS_NODES } from "@/lib/demo/demoNetwork";

export default function NetworkPage() {
  const [nodes, setNodes] = useState<NetworkNode[]>(BRICS_NODES);
  const [selectedNode, setSelectedNode] = useState<NetworkNode>(BRICS_NODES[0]);
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<"cads_json" | "telemetry_summary">("cads_json");

  useEffect(() => {
    fetch("/api/network/nodes")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.nodes?.length > 0) {
          setNodes(data.nodes);
          setSelectedNode(data.nodes[0]);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyJSON = () => {
    const jsonStr = JSON.stringify(selectedNode.cadsPacket, null, 2);
    navigator.clipboard?.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const avgLatency = Math.round(
    nodes.reduce((acc, curr) => acc + curr.latencyMs, 0) / (nodes.length || 1)
  );

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-[#58635A]">
          <Link href="/dashboard" className="hover:text-[#1B241E] underline">
            Dashboard
          </Link>
          <span>/</span>
          <span className="font-mono text-[#1B241E] font-medium">AgriN Network (BRICS)</span>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard">
            <Button variant="secondary" size="sm" className="text-xs">
              ← Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="bg-white border border-[#E2E0D8] rounded p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E0D8] pb-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="text-[10px] font-mono uppercase bg-[#E8EFEA] text-[#2D5A3C] px-2 py-0.5 rounded font-bold border border-[#C2D6C8]">
                Digital Public Good (DPG) Prototype
              </span>
              <span className="text-[10px] font-mono text-[#58635A]">
                Protocol: CADS v1.0.4 • Open Agricultural Data Schema
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#1B241E]">
              AgriN Federated Agricultural Network
            </h1>
            <p className="text-xs text-[#58635A] mt-1 max-w-2xl leading-relaxed">
              Demonstrating cross-border agronomic telemetry interoperability across BRICS agricultural zones. Disparate national data systems exchange standardized soil, weather, and satellite observations without centralized data silos or vendor lock-in.
            </p>
          </div>

          <div className="bg-[#FBFBF9] border border-[#E2E0D8] px-4 py-3 rounded text-left md:text-right">
            <span className="text-[10px] font-mono uppercase text-[#58635A] block">
              Federation Health
            </span>
            <div className="text-xs font-mono font-bold text-[#1E5E2E] flex items-center md:justify-end space-x-1.5 mt-0.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[#1E5E2E] animate-pulse" />
              <span>{nodes.length} / {nodes.length} Nodes Synchronized</span>
            </div>
            <span className="text-[10px] font-mono text-[#58635A]">
              Avg Peer Latency: {avgLatency}ms
            </span>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-xs">
          <div className="border border-[#E2E0D8] rounded p-3 bg-[#FBFBF9]">
            <span className="font-mono text-[10px] text-[#2D5A3C] font-bold block uppercase">
              1. Local Data Sovereignty
            </span>
            <p className="text-[11px] text-[#58635A] mt-1 leading-snug">
              Telemetry remains hosted at national research institutes (ICAR, EMBRAPA, ARC) with zero mandatory central cloud ingestion.
            </p>
          </div>

          <div className="border border-[#E2E0D8] rounded p-3 bg-[#FBFBF9]">
            <span className="font-mono text-[10px] text-[#2D5A3C] font-bold block uppercase">
              2. Unified Semantics (CADS)
            </span>
            <p className="text-[11px] text-[#58635A] mt-1 leading-snug">
              Normalizes coordinate reference systems (CRS), spectral indices, and soil chemistry metrics into a single lightweight schema.
            </p>
          </div>

          <div className="border border-[#E2E0D8] rounded p-3 bg-[#FBFBF9]">
            <span className="font-mono text-[10px] text-[#2D5A3C] font-bold block uppercase">
              3. AI Agro-Interoperability
            </span>
            <p className="text-[11px] text-[#58635A] mt-1 leading-snug">
              Google Gemini synthesizes identical CADS packets across continents to generate localized vernacular farming advice.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Topology Selector */}
      <div className="bg-white border border-[#E2E0D8] rounded p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E0D8] pb-3">
          <div>
            <span className="text-xs font-mono font-bold text-[#1B241E] uppercase tracking-wider">
              Federated Node Registry (Select Node to Inspect Schema)
            </span>
            <span className="text-xs text-[#58635A] block mt-0.5">
              5 Federated National Agronomy Nodes Active
            </span>
          </div>
          <Badge variant="optimal" dot>
            Network Operational
          </Badge>
        </div>

        {/* Node Selection Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
          {nodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <button
                key={node.id}
                onClick={() => setSelectedNode(node)}
                className={`p-3 border rounded text-left transition-all ${
                  isSelected
                    ? "border-[#2D5A3C] bg-[#E8EFEA]/40 ring-1 ring-[#2D5A3C] shadow-xs"
                    : "border-[#E2E0D8] bg-[#FBFBF9] hover:bg-white hover:border-[#B8B6AC]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1B241E] flex items-center space-x-1.5">
                    <span>{node.flag}</span>
                    <span>{node.country}</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#2D5A3C] font-semibold">
                    {node.latencyMs}ms
                  </span>
                </div>
                <div className="text-[11px] text-[#58635A] truncate font-medium">
                  {node.crop.split(" (")[0]}
                </div>
                <div className="text-[10px] font-mono text-[#828E84] truncate mt-0.5">
                  {node.location}
                </div>
                <div className="mt-2 pt-1.5 border-t border-[#E2E0D8] flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#2D5A3C] font-medium">● {node.status}</span>
                  <span className="text-[#58635A]">{node.complianceScorePct}% CADS</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Schema Inspector for Selected Node */}
      <div className="bg-white border border-[#E2E0D8] rounded p-6 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E0D8] pb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{selectedNode.flag}</span>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-lg font-bold text-[#1B241E]">
                  {selectedNode.country} Node: {selectedNode.institutionalAnchor}
                </h2>
                <Badge variant="optimal">CADS v1.0 Compliant</Badge>
              </div>
              <p className="text-xs text-[#58635A] mt-0.5">
                Location: {selectedNode.location} • Crop: {selectedNode.crop} • Scale: {selectedNode.area}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveView("cads_json")}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                activeView === "cads_json"
                  ? "bg-[#2D5A3C] text-white font-bold"
                  : "bg-[#F2F4F3] text-[#58635A] hover:bg-[#E2E0D8]"
              }`}
            >
              JSON Telemetry Packet
            </button>
            <button
              onClick={() => setActiveView("telemetry_summary")}
              className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                activeView === "telemetry_summary"
                  ? "bg-[#2D5A3C] text-white font-bold"
                  : "bg-[#F2F4F3] text-[#58635A] hover:bg-[#E2E0D8]"
              }`}
            >
              Parameters Grid
            </button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyJSON}
              className="text-xs font-mono"
            >
              {copied ? "✓ Copied JSON" : "Copy CADS JSON"}
            </Button>
          </div>
        </div>

        {/* 4-Quadrant Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs font-mono">
          <div className="p-3 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
            <span className="text-[10px] text-[#58635A] block uppercase tracking-wider">
              Geospatial CRS Standard
            </span>
            <div className="text-xs font-bold text-[#1B241E] mt-1">
              {selectedNode.crs}
            </div>
            <span className="text-[10px] text-[#2D5A3C] block mt-0.5">
              Cadastral Boundary Compatible
            </span>
          </div>

          <div className="p-3 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
            <span className="text-[10px] text-[#58635A] block uppercase tracking-wider">
              Earth Observation Feed
            </span>
            <div className="text-xs font-bold text-[#1B241E] mt-1">
              {selectedNode.satellite}
            </div>
            <span className="text-[10px] text-[#2D5A3C] block mt-0.5">
              NDVI {selectedNode.cadsPacket.telemetry.earth_observation.current_ndvi} (
              {selectedNode.cadsPacket.telemetry.earth_observation.canopy_trend})
            </span>
          </div>

          <div className="p-3 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
            <span className="text-[10px] text-[#58635A] block uppercase tracking-wider">
              Soil Taxonomy Baseline
            </span>
            <div className="text-xs font-bold text-[#1B241E] mt-1">
              {selectedNode.soilRef}
            </div>
            <span className="text-[10px] text-[#2D5A3C] block mt-0.5">
              pH {selectedNode.cadsPacket.telemetry.soil_chemistry.ph} • SOC{" "}
              {selectedNode.cadsPacket.telemetry.soil_chemistry.organic_carbon_pct}%
            </span>
          </div>

          <div className="p-3 border border-[#E2E0D8] rounded bg-[#FBFBF9]">
            <span className="text-[10px] text-[#58635A] block uppercase tracking-wider">
              Inferred Agronomic Action
            </span>
            <div className="text-xs font-bold text-[#1B241E] mt-1">
              {selectedNode.cadsPacket.inferred_signals.irrigation_demand === "delay"
                ? "Delay Irrigation (48h)"
                : selectedNode.cadsPacket.inferred_signals.irrigation_demand === "urgent"
                ? "Immediate Soil Furrowing"
                : "Standard Maintenance"}
            </div>
            <span className="text-[10px] text-[#2D5A3C] block mt-0.5">
              Derived from CADS telemetry
            </span>
          </div>
        </div>

        {/* View 1: JSON Telemetry Packet */}
        {activeView === "cads_json" && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-mono text-[#58635A]">
                CADS Standard Data Interchange Packet (Ready for Gemini Reasoning):
              </span>
              <span className="text-[10px] font-mono text-[#2D5A3C]">
                Schema: https://agrin.org/schema/v1/cads.json
              </span>
            </div>
            <pre className="text-xs font-mono bg-[#1B241E] text-[#E8EFEA] p-4 rounded border border-[#2D5A3C] overflow-x-auto max-h-[380px] leading-relaxed">
              {JSON.stringify(selectedNode.cadsPacket, null, 2)}
            </pre>
          </div>
        )}

        {/* View 2: Parameters Grid */}
        {activeView === "telemetry_summary" && (
          <div className="border border-[#E2E0D8] rounded overflow-hidden text-xs">
            <table className="w-full text-left font-mono">
              <thead className="bg-[#F2F4F3] border-b border-[#E2E0D8] text-[11px] text-[#58635A]">
                <tr>
                  <th className="p-2.5">Domain</th>
                  <th className="p-2.5">Parameter</th>
                  <th className="p-2.5">Node Value</th>
                  <th className="p-2.5">CADS Standardization</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E0D8] text-[#1B241E]">
                <tr>
                  <td className="p-2.5 font-bold">Atmospheric</td>
                  <td className="p-2.5">Air Temperature</td>
                  <td className="p-2.5">{selectedNode.cadsPacket.telemetry.meteorological.temperature_c}°C</td>
                  <td className="p-2.5 text-[#58635A]">Normalized Celsius (float)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Atmospheric</td>
                  <td className="p-2.5">48h Rain Forecast</td>
                  <td className="p-2.5">{selectedNode.cadsPacket.telemetry.meteorological.rainfall_48h_mm} mm</td>
                  <td className="p-2.5 text-[#58635A]">Precipitation Depth (mm)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Satellite</td>
                  <td className="p-2.5">Vegetation NDVI</td>
                  <td className="p-2.5">{selectedNode.cadsPacket.telemetry.earth_observation.current_ndvi}</td>
                  <td className="p-2.5 text-[#58635A]">(B8 - B4) / (B8 + B4) Level-2A</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Soil</td>
                  <td className="p-2.5">Soil Organic Carbon</td>
                  <td className="p-2.5">{selectedNode.cadsPacket.telemetry.soil_chemistry.organic_carbon_pct}%</td>
                  <td className="p-2.5 text-[#58635A]">Walkley-Black equivalent (%)</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Soil</td>
                  <td className="p-2.5">Available Nitrogen</td>
                  <td className="p-2.5">{selectedNode.cadsPacket.telemetry.soil_chemistry.nitrogen_kg_ha} kg/ha</td>
                  <td className="p-2.5 text-[#58635A]">Alkaline Permanganate Standard</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Validation and Digital Public Good Compliance Note */}
        <div className="pt-3 border-t border-[#E2E0D8] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#58635A]">
          <div className="flex items-center space-x-2">
            <span className="text-[#2D5A3C] font-bold">✓ DPG Standard Compliant</span>
            <span>•</span>
            <span>Non-proprietary JSON-LD format</span>
            <span>•</span>
            <span>CC-BY 4.0 Open Agricultural Commons</span>
          </div>
          <span className="text-[11px] font-mono text-[#828E84]">
            Node ID: {selectedNode.cadsPacket.node_id}
          </span>
        </div>
      </div>

      {/* Cross-Border Interoperability Narrative */}
      <div className="bg-[#FBFBF9] border border-[#E2E0D8] rounded p-6 text-xs text-[#58635A] space-y-3">
        <h3 className="font-bold text-[#1B241E] text-sm font-mono uppercase">
          Why Standardized Data Interoperability (CADS) Changes Smallholder Economics
        </h3>
        <p className="leading-relaxed">
          Smallholder farmers across the Global South (India, Brazil, South Africa, China) cultivate land under similar ecological stresses—such as rainfall unpredictability and declining soil organic carbon—yet their digital tools remain trapped within proprietary, fragmented walled gardens.
        </p>
        <p className="leading-relaxed">
          By defining an open, zero-licensing standard like <strong>CADS (Common Agricultural Data Schema)</strong>, local extension advisors and autonomous AI engines can reason over identical structured schemas regardless of whether the ground telemetry originates from an Indian farmer with a 2-acre wheat parcel or a Brazilian agro-ecological cooperative.
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-[#E2E0D8] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#58635A]">
        <div>
          Next in AgriN Demonstration: UI Polish, outdoor contrast testing, and system fallback audits.
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/disease">
            <Button variant="secondary" size="sm">
              ← Disease Scanner
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm">
              Return to Farm Operations →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
