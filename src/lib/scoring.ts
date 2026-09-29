import { WeatherData } from "@/types/weather";
import { SatelliteData } from "@/types/satellite";
import { SoilData } from "@/types/soil";
import { FarmSignals } from "@/types/farm";

export interface ScoringInputs {
  weather: WeatherData;
  satellite: SatelliteData;
  soil: SoilData;
  crop?: string;
}

export interface HealthScoreResult {
  score: number;
  label: "Critical" | "Needs Attention" | "Moderate" | "Healthy";
  breakdown: {
    vegetationScore: number; // 0 - 35
    weatherScore: number;    // 0 - 20
    soilScore: number;       // 0 - 25
    diseaseRiskScore: number;// 0 - 20
  };
  signals: FarmSignals;
}

/**
 * Deterministic Prototype Indicator:
 * Calculates the Farm Health Score (0-100) using weighted multi-variable heuristics:
 * - Vegetation condition: 35%
 * - Weather stress: 20%
 * - Soil condition: 25%
 * - Disease risk: 20%
 *
 * NOTE: This is a prototype indicator for decision-support, not an authoritative laboratory diagnosis.
 */
export function calculateFarmHealthScore({
  weather,
  satellite,
  soil,
}: ScoringInputs): HealthScoreResult {
  // 1. VEGETATION COMPONENT (Weight: 35 max points)
  let vegetationScore = 28; // Default healthy baseline
  const ndvi = satellite.currentNdvi;
  const change = satellite.ndviChange ?? 0;

  if (ndvi >= 0.75) {
    vegetationScore = 35;
  } else if (ndvi >= 0.65) {
    vegetationScore = 28;
  } else if (ndvi >= 0.50) {
    vegetationScore = 20;
  } else {
    vegetationScore = 10;
  }

  // Penalty if NDVI is declining
  if (change <= -0.05) {
    vegetationScore = Math.max(5, vegetationScore - 4);
  }

  // 2. WEATHER STRESS COMPONENT (Weight: 20 max points)
  let weatherScore = 18;
  const temp = weather.temperature;
  const rain48h = weather.rainfallNext48h ?? 0;

  if (temp > 38 || temp < 5) {
    weatherScore -= 8; // Thermal stress
  } else if (temp > 32) {
    weatherScore -= 3;
  }

  // Favorable rainfall vs waterlogging
  if (rain48h > 0 && rain48h <= 30) {
    weatherScore = Math.min(20, weatherScore + 2); // Favorable moisture recharge
  } else if (rain48h > 50) {
    weatherScore -= 6; // Waterlogging risk
  }

  // 3. SOIL EQUILIBRIUM COMPONENT (Weight: 25 max points)
  let soilScore = 20;
  const ph = soil.ph ?? 6.8;
  const nitrogen = String(soil.nitrogen || "").toLowerCase();

  // Optimal pH: 6.5 - 7.5
  if (ph < 6.0 || ph > 7.8) {
    soilScore -= 5;
  }

  // Nitrogen deficit penalty
  if (nitrogen.includes("low")) {
    soilScore -= 5;
  }

  // 4. DISEASE / PATHOLOGY RISK COMPONENT (Weight: 20 max points)
  let diseaseRiskScore = 18;
  const humidity = weather.humidity ?? 64;

  // High humidity + stagnant warmth increases foliar fungal risk
  if (humidity > 75) {
    diseaseRiskScore -= 5;
  }

  // Total Composite Score
  const totalScore = Math.max(
    0,
    Math.min(100, Math.round(vegetationScore + weatherScore + soilScore + diseaseRiskScore))
  );

  // Categorical Tier
  let label: "Critical" | "Needs Attention" | "Moderate" | "Healthy" = "Healthy";
  if (totalScore < 40) {
    label = "Critical";
  } else if (totalScore < 60) {
    label = "Needs Attention";
  } else if (totalScore < 80) {
    label = "Moderate";
  } else {
    label = "Healthy";
  }

  // Derived Categorical Signals
  const signals: FarmSignals = {
    vegetationStress:
      satellite.trend === "declining" || ndvi < 0.65
        ? "moderate"
        : ndvi < 0.50
        ? "high"
        : "low",
    waterStress:
      rain48h > 0
        ? "low" // pending rain relieves water stress
        : (weather.evapotranspirationDaily ?? 3.2) > 4.5
        ? "moderate"
        : "low",
    soilConcern: nitrogen.includes("low") || ph < 6.0 ? "moderate" : "low",
    overallRisk: totalScore < 60 ? "high" : totalScore < 75 ? "moderate" : "low",
  };

  return {
    score: totalScore,
    label,
    breakdown: {
      vegetationScore,
      weatherScore,
      soilScore,
      diseaseRiskScore,
    },
    signals,
  };
}
