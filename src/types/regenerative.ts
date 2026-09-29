export type FAOPillar =
  | "minimum_soil_disturbance"
  | "permanent_soil_cover"
  | "species_diversification";

export interface RegenerativeStage {
  id: "now" | "this_week" | "next_cycle" | "long_term";
  phase: string;
  timing: string;
  action: string;
  why: string;
  dataInputs: string[];
  faoPillars: FAOPillar[];
  expectedImpact: string;
}

export interface CarbonMetrics {
  baselineSOC: number; // e.g. 0.54%
  targetSOC: number; // e.g. 0.85%
  additionalWaterRetentionLitersPerAcre: number; // e.g. 20000
  potentialNFixationKgPerHa: number; // e.g. 38
}

export interface FAOCallout {
  pillar: FAOPillar;
  title: string;
  description: string;
}

export interface RegenerativePlan {
  farmId: string;
  farmName: string;
  crop: string;
  areaAcres: number;
  stages: RegenerativeStage[];
  carbonMetrics: CarbonMetrics;
  faoPrinciplesCompliance: {
    minimumSoilDisturbance: boolean;
    permanentSoilCover: boolean;
    speciesDiversification: boolean;
  };
  source: "gemini-pro" | "fao-icar-deterministic" | "cached-demo";
  generatedAt: string;
}
