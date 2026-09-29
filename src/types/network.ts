export interface CADSPacket {
  $schema: string;
  schema_version: string;
  node_id: string;
  node_country: string;
  institutional_anchor: string;
  cadastral_crs: string;
  geographic_reference: {
    district: string;
    state_province: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
    epsg_code: number;
  };
  crop_profile: {
    species: string;
    botanical_name: string;
    phenological_stage: string;
    area: number;
    area_unit: string;
  };
  telemetry: {
    meteorological: {
      source: string;
      temperature_c: number;
      rainfall_48h_mm: number;
      et0_daily_mm: number;
      relative_humidity_pct: number;
    };
    earth_observation: {
      platform: string;
      current_ndvi: number;
      canopy_trend: "increasing" | "stable" | "declining";
      observation_timestamp: string;
    };
    soil_chemistry: {
      standard: string;
      ph: number;
      organic_carbon_pct: number;
      nitrogen_kg_ha: number;
      soil_texture_class: string;
    };
  };
  inferred_signals: {
    vegetation_stress: "low" | "moderate" | "high";
    irrigation_demand: "urgent" | "normal" | "delay";
    regenerative_horizon: string;
  };
}

export interface NetworkNode {
  id: string;
  country: string;
  countryCode: string;
  flag: string;
  institutionalAnchor: string;
  location: string;
  crop: string;
  area: string;
  crs: string;
  satellite: string;
  soilRef: string;
  status: "Synchronized" | "Operational" | "Re-syncing";
  latencyMs: number;
  lastSync: string;
  complianceScorePct: number;
  cadsPacket: CADSPacket;
}
