import { DiseaseResult } from "@/types/disease";

export const DEMO_DISEASE: DiseaseResult = {
  identifiedCondition: "Leaf Rust (Puccinia triticina)",
  pathogenType: "Fungal",
  confidencePercent: 82,
  confidenceClassification: "Screening Level",
  cropSpecies: "Wheat (Triticum aestivum)",
  severity: "Moderate",
  observedIndicators: [
    "Clustered orange-brown pustules on the upper blade surface",
    "Chlorotic yellow halos surrounding mature fungal uredinia",
    "Absence of powdery mildew or foliar blight necrosis",
  ],
  fieldDirectives: [
    "Inspect plants within a 5-meter radius to determine the boundary of infection.",
    "Avoid late-evening sprinkler irrigation; leaf wetness accelerates fungal spore germination.",
    "Consult extension officer for bio-fungicide (Trichoderma viride) or approved triazole application if severity exceeds 5% of canopy.",
  ],
  organicTreatment: [
    "Foliar spray of 5% neem seed kernel extract (NSKE) to disrupt spore germination.",
    "Application of bio-control agent Trichoderma viride or Pseudomonas fluorescens at 10g/L.",
    "Spraying diluted sour buttermilk (fermented whey) as an organic antifungal foliar wash.",
  ],
  chemicalTreatment: [
    "Targeted spot-spray of Propiconazole 25% EC (1ml/L) or Tebuconazole 25.9% EC under extension advisor guidance.",
    "Maintain a mandatory 15-day pre-harvest interval (PHI) following chemical treatment.",
  ],
  preventiveMeasures: [
    "Plant rust-resistant certified cultivars (e.g., HD-2967, PBW-550, or DBW-187).",
    "Optimize balanced nitrogen fertilization — avoid excess urea which softens leaf cuticles.",
    "Practice crop rotation with legumes (Chickpea/Moong) to reduce overwintering spore reservoirs.",
  ],
  disclaimer:
    "AI-assisted screening only. Results should be verified with a qualified agricultural professional before making significant treatment decisions.",
  source: "demo-fallback",
  scannedAt: new Date().toISOString(),
};
