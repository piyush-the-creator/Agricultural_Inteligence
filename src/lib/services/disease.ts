import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { DiseaseResult } from "@/types/disease";
import { DEMO_DISEASE } from "@/lib/demo/demoDisease";

const DiseaseAnalysisSchema = z.object({
  identifiedCondition: z.string().min(1),
  pathogenType: z.enum(["Fungal", "Bacterial", "Viral", "Nutritional Deficit", "Healthy"]),
  confidencePercent: z.number().min(0).max(100),
  confidenceClassification: z.enum(["Screening Level", "Definitive Marker"]),
  cropSpecies: z.string().min(1),
  severity: z.enum(["Low", "Moderate", "Severe"]),
  observedIndicators: z.array(z.string()).min(1),
  fieldDirectives: z.array(z.string()).min(1),
  organicTreatment: z.array(z.string()).default([]),
  chemicalTreatment: z.array(z.string()).default([]),
  preventiveMeasures: z.array(z.string()).default([]),
  disclaimer: z.string().min(1),
});

/**
 * Returns a crop-tailored deterministic disease screening result.
 */
export function getDeterministicDiseaseResult(crop: string = "Wheat"): DiseaseResult {
  const normalizedCrop = crop.toLowerCase();

  if (normalizedCrop.includes("rice")) {
    return {
      identifiedCondition: "Bacterial Leaf Blight (Xanthomonas oryzae)",
      pathogenType: "Bacterial",
      confidencePercent: 79,
      confidenceClassification: "Screening Level",
      cropSpecies: "Rice (Oryza sativa)",
      severity: "Moderate",
      observedIndicators: [
        "Water-soaked to yellowish-white wavy lesions along leaf margins",
        "Milky bacterial exudate droplets visible early morning on lesion surfaces",
        "Premature drying and rolling of upper flag leaves",
      ],
      fieldDirectives: [
        "Drain excess standing water from paddy fields to lower relative humidity.",
        "Refrain from top-dressing nitrogen fertilizers until lesion spread ceases.",
        "Maintain bund hygiene and remove host weed grasses along field margins.",
      ],
      organicTreatment: [
        "Foliar spray of fresh cow dung slurry supernatant (20%) or neem leaf extract.",
        "Application of Pseudomonas fluorescens talc formulation at 5g/L water.",
      ],
      chemicalTreatment: [
        "Spray Streptocycline (0.1g/L) combined with Copper Oxychloride (2.5g/L) on affected patches.",
        "Ensure spray nozzle does not touch infected foliage to prevent mechanical transfer.",
      ],
      preventiveMeasures: [
        "Adopt BLB-resistant varieties such as Improved Samba Mahsuri or IR64.",
        "Avoid clipping seedling leaf tips during transplantation.",
      ],
      disclaimer:
        "AI-assisted screening only. Results should be verified with a qualified agricultural professional before making significant treatment decisions.",
      source: "demo-fallback",
      scannedAt: new Date().toISOString(),
    };
  }

  if (normalizedCrop.includes("maize") || normalizedCrop.includes("corn")) {
    return {
      identifiedCondition: "Fall Armyworm Foliar Damage & Leaf Blight",
      pathogenType: "Nutritional Deficit",
      confidencePercent: 84,
      confidenceClassification: "Screening Level",
      cropSpecies: "Maize (Zea mays)",
      severity: "Moderate",
      observedIndicators: [
        "Elongated chlorotic streaks between leaf veins with pin-hole perforations",
        "Mild fungal sporulation along lower leaf margins",
        "Early whorl feeding symptoms without deep stalk entry",
      ],
      fieldDirectives: [
        "Scout field in a 'W' pattern checking 20 consecutive plants in 5 locations.",
        "Apply neem cake in the soil whorl to deter nocturnal larval activity.",
        "Intercrop with Desmodium or molasses grass (Push-Pull strategy).",
      ],
      organicTreatment: [
        "Spray Bacillus thuringiensis (Bt) kurstaki formulation at 2g/L.",
        "Hand-pick egg masses and apply sand/wood ash into leaf whorls.",
      ],
      chemicalTreatment: [
        "Targeted whorl application of Emamectin Benzoate 5% SG (0.4g/L) if damage exceeds threshold.",
      ],
      preventiveMeasures: [
        "Early and uniform planting across the village cluster.",
        "Deep summer plowing to expose pupae to predatory birds and solar heat.",
      ],
      disclaimer:
        "AI-assisted screening only. Results should be verified with a qualified agricultural professional before making significant treatment decisions.",
      source: "demo-fallback",
      scannedAt: new Date().toISOString(),
    };
  }

  // Default Wheat Leaf Rust
  return DEMO_DISEASE;
}

/**
 * Analyzes a leaf image using Google Gemini 1.5 Flash Vision.
 * Automatically falls back to deterministic crop-specific screening if API key is absent or offline.
 */
export async function analyzeLeafImage(
  imageBase64: string,
  mimeType: string = "image/jpeg",
  crop: string = "Wheat"
): Promise<DiseaseResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    return getDeterministicDiseaseResult(crop);
  }

  try {
    const ai = new GoogleGenerativeAI(apiKey);
    const model = ai.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    // Strip data URL header if present
    const cleanBase64 = imageBase64.replace(/^data:image\/[a-zA-Z]+;base64,/, "");

    const prompt = `
You are a senior plant pathologist and agronomist at an agricultural research institute (ICAR / CIMMYT).
Examine this crop leaf photograph for diseases, foliar pathogens, nutrient deficiencies, or pest symptoms.

TARGET CROP: ${crop}

Analyze the visible foliar structures:
1. Examine lesion geometry, pustule coloration, chlorotic borders, halo zones, fungal mycelium, or necrotic tissue.
2. Determine the most probable condition, pathogen type (Fungal, Bacterial, Viral, Nutritional Deficit, or Healthy).
3. Assign a realistic confidence percentage (0-100) and classify as "Screening Level" or "Definitive Marker".
4. Determine severity ("Low", "Moderate", "Severe").
5. List 2-4 observable morphological indicators.
6. Provide 2-3 immediate, practical field directives for smallholder farmers.
7. Provide 2-3 organic / cultural remedies (neem, bio-control, trichoderma, pruning, aeration).
8. Provide 1-2 standard chemical intervention guidelines if applicable with safety warnings.
9. Provide 2-3 long-term preventive cultural practices.
10. Include the mandatory non-diagnostic disclaimer: "AI-assisted screening only. Results should be verified with a qualified agricultural professional before making significant treatment decisions."

Respond ONLY with valid JSON matching this schema:
{
  "identifiedCondition": "...",
  "pathogenType": "Fungal",
  "confidencePercent": 82,
  "confidenceClassification": "Screening Level",
  "cropSpecies": "${crop}",
  "severity": "Moderate",
  "observedIndicators": ["..."],
  "fieldDirectives": ["..."],
  "organicTreatment": ["..."],
  "chemicalTreatment": ["..."],
  "preventiveMeasures": ["..."],
  "disclaimer": "AI-assisted screening only. Results should be verified with a qualified agricultural professional before making significant treatment decisions."
}
`;

    const result = await model.generateContent([
      {
        inlineData: {
          data: cleanBase64,
          mimeType: mimeType,
        },
      },
      { text: prompt },
    ]);

    const responseText = result.response.text();
    const parsed = DiseaseAnalysisSchema.parse(JSON.parse(responseText));

    return {
      ...parsed,
      source: "gemini-1.5-flash",
      scannedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("Gemini Flash Vision failed, falling back to deterministic disease fixture:", err);
    return getDeterministicDiseaseResult(crop);
  }
}
