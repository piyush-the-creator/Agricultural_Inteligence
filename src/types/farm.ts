import { WeatherData } from "./weather";
import { SatelliteData } from "./satellite";
import { SoilData } from "./soil";

export interface FarmLocation {
  latitude: number;
  longitude: number;
  district?: string;
  state?: string;
  country: string;
}

export interface FarmProfile {
  id?: string;
  country: string;
  location: string;
  coordinates: {
    lat: number;
    lon: number;
  };
  crop: string;
  area: number;
  areaUnit: "Acres" | "Hectares";
  sowingDays?: number;
  stage?: string;
}

export interface FarmSignals {
  vegetationStress: "low" | "moderate" | "high";
  waterStress: "low" | "moderate" | "high";
  soilConcern: "low" | "moderate" | "high";
  overallRisk: "low" | "moderate" | "high";
}

export interface FarmIntelligence {
  farm: FarmProfile;
  weather: WeatherData;
  soil: SoilData;
  satellite: SatelliteData;
  signals: FarmSignals;
  healthScore: number;
  healthLabel: "Critical" | "Needs Attention" | "Moderate" | "Healthy";
}
