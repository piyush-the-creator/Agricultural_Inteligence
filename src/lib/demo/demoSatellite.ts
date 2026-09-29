import { SatelliteData } from "@/types/satellite";

export const DEMO_SATELLITE: SatelliteData = {
  isDemo: true,
  source: "Copernicus Sentinel-2 MSI Level-2A",
  tileId: "43QDA",
  currentNdvi: 0.71,
  previousNdvi: 0.76,
  ndviChange: -0.05,
  changePercent: -6.6,
  trend: "declining",
  cloudCoveragePercent: 4.2,
  resolutionMeters: 10,
  agronomicStatus: "Moderate Canopy Stress",
  observationDate: "2026-09-27",
  observationHistory: [
    { date: "Sep 02", value: 0.74, sceneId: "S2A_MSIL2A_20260902_43QDA" },
    { date: "Sep 10", value: 0.78, sceneId: "S2B_MSIL2A_20260910_43QDA" },
    { date: "Sep 18", value: 0.76, sceneId: "S2A_MSIL2A_20260918_43QDA" },
    { date: "Sep 27", value: 0.71, sceneId: "S2B_MSIL2A_20260927_43QDA" },
  ],
  interpretation:
    "Vegetation vigor has slipped 6.6% over 12 days, correlated with low soil nitrogen during tillering stage.",
};
