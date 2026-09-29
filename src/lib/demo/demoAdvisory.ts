import { AgroAdvisory, RegenerativePlan } from "@/types/advisory";

export const DEMO_ADVISORY: AgroAdvisory = {
  primaryAction: "DELAY SCHEDULED IRRIGATION",
  priority: "Medium",
  timeframe: "Next 24–48 Hours",
  shortRationale:
    "Precipitation of 18mm is expected within 48 hours. Surface soil moisture is sufficient to maintain wheat transpiration demand without deficit.",
  causalChain: {
    atmosphericSignal: "18mm rainfall pending within 48h (Open-Meteo)",
    satelliteCanopySignal: "NDVI 0.71 declining; non-critical moisture stress (Sentinel-2)",
    soilNutrientSignal: "Low nitrogen status (180 kg/ha); avoid broadcast runoff",
    deduction:
      "Holding irrigation conserves fuel expenditure and avoids nutrient leaching prior to the rain event.",
  },
  secondaryAction:
    "Prepare post-rainfall organic nitrogen compost top-dressing once soil drains.",
  provenance: "Gemini 1.5 Pro Agronomy Chain",
  timestamp: "2026-09-29T06:30:00.000Z",
};

export const DEMO_REGENERATIVE_PLAN: RegenerativePlan = {
  parcel: "Ahmedabad Wheat (2.5 Acres)",
  objective: "Soil Organic Carbon Accumulation & Natural Nitrogen Replenishment",
  governanceReference: "Aligned with ICAR and FAO Conservation Agriculture Frameworks",
  stages: [
    {
      stage: "Stage 1: Now",
      timeframe: "Immediate (Next 48 Hours)",
      action: "Delay Irrigation & Retain Surface Moisture",
      rationale:
        "Imminent 18mm rainfall will naturally replenish root zone without pumping fuel expenditure.",
      inputsConsidered: "Weather: 18mm rain | NDVI: 0.71",
    },
    {
      stage: "Stage 2: This Week",
      timeframe: "Days 3 to 7 (Post-Rainfall)",
      action: "Organic Nitrogen Top-Dressing & Light Surface Aeration",
      rationale:
        "Replenish low nitrogen reserve (180 kg/ha) using well-cured compost or vermicompost once field drains.",
      inputsConsidered: "Soil Test: Low Nitrogen | pH 6.8",
    },
    {
      stage: "Stage 3: Next Crop Cycle",
      timeframe: "Post-Harvest (Zaid / Summer Transition)",
      action: "Legume Crop Rotation (Wheat → Chickpea / Moong)",
      rationale:
        "Fixes 30–40 kg N/ha into soil, breaking monoculture weed cycles and rebuilding root mycorrhizal networks.",
      inputsConsidered: "Crop: Wheat | Regional Rotation: Pulse Legume",
    },
    {
      stage: "Stage 4: Long-Term Resilience",
      timeframe: "1 to 3 Years",
      action: "Stubble Retention & Soil Organic Carbon Increase",
      rationale:
        "Elevate organic carbon from 0.54% to >0.85%, expanding soil moisture retention by ~20,000 L/acre.",
      inputsConsidered: "Baseline Organic Carbon: 0.54%",
    },
  ],
};
