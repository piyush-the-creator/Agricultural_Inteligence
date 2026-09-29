export interface NdviObservation {
  date: string;
  value: number;
  sceneId?: string;
}

export interface SatelliteData {
  isDemo?: boolean;
  source: string;
  tileId?: string;
  currentNdvi: number;
  previousNdvi?: number;
  ndviChange?: number;
  changePercent?: number;
  observationDate?: string;
  cloudCoveragePercent?: number;
  resolutionMeters?: number;
  trend?: "improving" | "stable" | "declining";
  agronomicStatus?: string;
  observationHistory?: NdviObservation[];
  interpretation?: string;
}
