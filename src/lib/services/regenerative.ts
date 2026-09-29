import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { FarmIntelligence } from "@/types/farm";
import { RegenerativePlan, RegenerativeStage } from "@/types/regenerative";
import { DEMO_FARM } from "@/lib/demo/demoFarm";
import { DEMO_WEATHER } from "@/lib/demo/demoWeather";
import { DEMO_SATELLITE } from "@/lib/demo/demoSatellite";
import { DEMO_SOIL } from "@/lib/demo/demoSoil";

const RegenerativePlanSchema = z.object({
  stages: z.array(
    z.object({
      id: z.enum(["now", "this_week", "next_cycle", "long_term"]),
      phase: z.string(),
      timing: z.string(),
      action: z.string(),
      why: z.string(),
      dataInputs: z.array(z.string()),
      faoPillars: z.array(
        z.enum([
          "minimum_soil_disturbance",
          "permanent_soil_cover",
          "species_diversification",
        ])
      ),
      expectedImpact: z.string(),
    })
  ),
  carbonMetrics: z.object({
    baselineSOC: z.number(),
    targetSOC: z.number(),
    additionalWaterRetentionLitersPerAcre: z.number(),
    potentialNFixationKgPerHa: z.number(),
  }),
  faoPrinciplesCompliance: z.object({
    minimumSoilDisturbance: z.boolean(),
    permanentSoilCover: z.boolean(),
    speciesDiversification: z.boolean(),
  }),
});

/**
 * Deterministic FAO / ICAR regenerative agriculture plan generator.
 * Used as primary algorithm or zero-latency fallback.
 */
export function generateDeterministicPlan(
  farmInput?: Partial<FarmIntelligence>
): RegenerativePlan {
  const farm = farmInput?.farm || DEMO_FARM;
  const weather = farmInput?.weather || DEMO_WEATHER;
  const satellite = farmInput?.satellite || DEMO_SATELLITE;
  const soil = farmInput?.soil || DEMO_SOIL;

  const rainExpected = (weather.rainfallNext48h ?? 18) > 5;
  const lowNitrogen = String(soil.nitrogen || "low").toLowerCase().includes("low");
  const cropName = farm.crop || "Wheat";

  // Stage 1: NOW
  const stage1: RegenerativeStage = rainExpected
    ? {
        id: "now",
        phase: "STAGE 1: NOW",
        timing: "Immediate (Next 48 Hours)",
        action: "Delay Irrigation & Retain Surface Moisture",
        why: `Forecast indicates ${weather.rainfallNext48h ?? 18}mm rainfall within 48h. Holding pumping prevents fuel waste, soil compaction, and nutrient leaching.`,
        dataInputs: [
          `Forecast: ${weather.rainfallNext48h ?? 18}mm rain`,
          `NDVI: ${satellite.currentNdvi} (${satellite.trend})`,
        ],
        faoPillars: ["minimum_soil_disturbance"],
        expectedImpact: "Saves ~12,000L pumping energy and prevents surface nitrogen run-off.",
      }
    : {
        id: "now",
        phase: "STAGE 1: NOW",
        timing: "Immediate (Next 48 Hours)",
        action: "Micro-Sprinkler or Deficit Drip Irrigation",
        why: `Atmospheric moisture deficit detected with ET₀ of ${weather.evapotranspirationDaily ?? 3.2}mm/day. Apply targeted irrigation early morning to minimize vapor loss.`,
        dataInputs: [
          `Temp: ${weather.temperature}°C`,
          `ET₀: ${weather.evapotranspirationDaily ?? 3.2} mm/day`,
        ],
        faoPillars: ["minimum_soil_disturbance"],
        expectedImpact: "Preserves root zone hydraulic conductivity with 30% lower evaporation.",
      };

  // Stage 2: THIS WEEK
  const stage2: RegenerativeStage = lowNitrogen
    ? {
        id: "this_week",
        phase: "STAGE 2: THIS WEEK",
        timing: "Days 3 to 7 (Post-Rainfall)",
        action: "Organic Nitrogen Top-Dressing & Light Surface Aeration",
        why: `Soil test indicates low nitrogen availability. Apply well-decomposed vermicompost or neem-coated urea post-drainage to stimulate tillering without microbial shock.`,
        dataInputs: [
          `Soil Test: Low Nitrogen`,
          `Soil pH: ${soil.ph ?? 6.8} (Optimal)`,
        ],
        faoPillars: ["permanent_soil_cover"],
        expectedImpact: "Restores vegetative nitrogen uptake while protecting indigenous mycorrhizal networks.",
      }
    : {
        id: "this_week",
        phase: "STAGE 2: THIS WEEK",
        timing: "Days 3 to 7",
        action: "Crop Canopy Foliar Biostimulant Spray",
        why: `Canopy NDVI is ${satellite.currentNdvi}. A foliar spray of liquid bio-fertilizer strengthens leaf cuticle resistance against sudden heat spikes.`,
        dataInputs: [
          `NDVI: ${satellite.currentNdvi}`,
          `Forecast Temp: ${weather.forecast?.[0]?.temperature ?? weather.temperature ?? 31}°C`,
        ],
        faoPillars: ["permanent_soil_cover"],
        expectedImpact: "Boosts leaf chlorophyll retention and resilience to climatic stress.",
      };

  // Stage 3: NEXT CROP CYCLE
  const rotationLegume =
    cropName.toLowerCase() === "wheat"
      ? "Chickpea (Cicer arietinum) or Summer Moong"
      : cropName.toLowerCase() === "rice"
      ? "Mustard or Black Gram"
      : "Cowpea / Pigeonpea";

  const stage3: RegenerativeStage = {
    id: "next_cycle",
    phase: "STAGE 3: NEXT CROP CYCLE",
    timing: "Post-Harvest (Zaid / Summer Transition)",
    action: `Legume Crop Rotation (${cropName} → ${rotationLegume})`,
    why: `Rotating with a short-duration pulse naturally fixes 35–40 kg atmospheric N/ha, breaks monoculture nematode cycles, and recharges deep root bio-pores.`,
    dataInputs: [
      `Primary Crop: ${cropName}`,
      `Rotational Complement: ${rotationLegume}`,
    ],
    faoPillars: ["species_diversification"],
    expectedImpact: "Fixes 35–40 kg N/ha and reduces synthetic fertilizer demand for the following season by 25%.",
  };

  // Stage 4: LONG-TERM RESILIENCE
  const stage4: RegenerativeStage = {
    id: "long_term",
    phase: "STAGE 4: LONG-TERM RESILIENCE",
    timing: "1 to 3 Years (Long-Term Horizon)",
    action: "Zero-Tillage Stubble Retention & Soil Organic Carbon Increase",
    why: `Transition to Happy Seeder direct-drilling and complete stubble retention. Raising baseline SOC from 0.54% to >0.85% increases farm soil water-holding capacity by ~20,000 liters/acre.`,
    dataInputs: [
      `Baseline Soil Organic Carbon: 0.54%`,
      `Target SOC: 0.85% (3-year horizon)`,
    ],
    faoPillars: ["minimum_soil_disturbance", "permanent_soil_cover"],
    expectedImpact: "Expands water retention by +20,000 L/acre, mitigates mid-season drought, and enhances carbon sequestration.",
  };

  return {
    farmId: farm.id || "IN-GJ-AHM-0042",
    farmName: (farm as any).name || `${farm.crop || "Wheat"} Farm (${farm.location || "Ahmedabad"})`,
    crop: cropName,
    areaAcres: farm.area || 2.5,
    stages: [stage1, stage2, stage3, stage4],
    carbonMetrics: {
      baselineSOC: 0.54,
      targetSOC: 0.85,
      additionalWaterRetentionLitersPerAcre: 20000,
      potentialNFixationKgPerHa: 38,
    },
    faoPrinciplesCompliance: {
      minimumSoilDisturbance: true,
      permanentSoilCover: true,
      speciesDiversification: true,
    },
    source: "fao-icar-deterministic",
    generatedAt: new Date().toISOString(),
  };
}

/**
 * Asynchronously synthesizes a localized Regenerative Farm Transition Plan
 * using Google Gemini 1.5 Pro with deterministic fallback.
 */
export async function generateRegenerativePlan(
  farmInput?: Partial<FarmIntelligence>
): Promise<RegenerativePlan> {
  const deterministicFallback = generateDeterministicPlan(farmInput);
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return deterministicFallback;
  }

  try {
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-pro",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
      },
    });

    const farm = farmInput?.farm || DEMO_FARM;
    const weather = farmInput?.weather || DEMO_WEATHER;
    const satellite = farmInput?.satellite || DEMO_SATELLITE;
    const soil = farmInput?.soil || DEMO_SOIL;

    const prompt = `
You are an expert regenerative agricultural advisor trained in FAO Conservation Agriculture and ICAR agro-ecology.
Create a structured 4-stage Regenerative Transition Plan for this smallholder farm:

FARM PROFILE:
- Location: ${farm.location}, ${farm.country}
- Crop: ${farm.crop} (${farm.area} ${farm.areaUnit})
- Stage: ${farm.stage || "Tillering"}

SATELLITE & CANOPY TELEMETRY:
- NDVI: ${satellite.currentNdvi} (${satellite.trend})
- Canopy Condition: ${satellite.agronomicStatus || "Vegetative"}

WEATHER TELEMETRY:
- Rainfall (next 48h): ${weather.rainfallNext48h ?? 18} mm
- Temperature: ${weather.temperature}°C
- ET₀: ${weather.evapotranspirationDaily ?? 3.2} mm/day

SOIL PROFILE:
- pH: ${soil.ph ?? 6.8}
- Organic Carbon: ${soil.organicCarbon ?? "0.54%"}
- Nitrogen: ${soil.nitrogen ?? "Low"}

Produce JSON matching this exact structure:
{
  "stages": [
    {
      "id": "now",
      "phase": "STAGE 1: NOW",
      "timing": "Immediate (Next 48 Hours)",
      "action": "...",
      "why": "...",
      "dataInputs": ["..."],
      "faoPillars": ["minimum_soil_disturbance"],
      "expectedImpact": "..."
    },
    {
      "id": "this_week",
      "phase": "STAGE 2: THIS WEEK",
      "timing": "Days 3 to 7",
      "action": "...",
      "why": "...",
      "dataInputs": ["..."],
      "faoPillars": ["permanent_soil_cover"],
      "expectedImpact": "..."
    },
    {
      "id": "next_cycle",
      "phase": "STAGE 3: NEXT CROP CYCLE",
      "timing": "Post-Harvest Transition",
      "action": "...",
      "why": "...",
      "dataInputs": ["..."],
      "faoPillars": ["species_diversification"],
      "expectedImpact": "..."
    },
    {
      "id": "long_term",
      "phase": "STAGE 4: LONG-TERM RESILIENCE",
      "timing": "1 to 3 Years",
      "action": "...",
      "why": "...",
      "dataInputs": ["..."],
      "faoPillars": ["minimum_soil_disturbance", "permanent_soil_cover"],
      "expectedImpact": "..."
    }
  ],
  "carbonMetrics": {
    "baselineSOC": 0.54,
    "targetSOC": 0.85,
    "additionalWaterRetentionLitersPerAcre": 20000,
    "potentialNFixationKgPerHa": 38
  },
  "faoPrinciplesCompliance": {
    "minimumSoilDisturbance": true,
    "permanentSoilCover": true,
    "speciesDiversification": true
  }
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = RegenerativePlanSchema.parse(JSON.parse(responseText));

    return {
      farmId: farm.id || "IN-GJ-AHM-0042",
      farmName: (farm as any).name || `${farm.crop || "Wheat"} Farm (${farm.location || "Ahmedabad"})`,
      crop: farm.crop || "Wheat",
      areaAcres: farm.area || 2.5,
      stages: parsed.stages,
      carbonMetrics: parsed.carbonMetrics,
      faoPrinciplesCompliance: parsed.faoPrinciplesCompliance,
      source: "gemini-pro",
      generatedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("Gemini regenerative generation failed, utilizing FAO/ICAR deterministic model:", err);
    return deterministicFallback;
  }
}
