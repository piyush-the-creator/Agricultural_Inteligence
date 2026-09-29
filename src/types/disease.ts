export interface DiseaseResult {
  identifiedCondition: string;
  pathogenType?: "Fungal" | "Bacterial" | "Viral" | "Nutritional Deficit" | "Healthy";
  confidencePercent: number;
  confidenceClassification: "Screening Level" | "Definitive Marker";
  cropSpecies: string;
  severity?: "Low" | "Moderate" | "Severe";
  observedIndicators: string[];
  fieldDirectives: string[];
  organicTreatment?: string[];
  chemicalTreatment?: string[];
  preventiveMeasures?: string[];
  disclaimer: string;
  source?: "gemini-1.5-flash" | "demo-fallback";
  scannedAt?: string;
}
