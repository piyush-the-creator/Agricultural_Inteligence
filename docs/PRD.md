# Product Requirements Document (PRD)
## AgriN AI — Regenerative Agricultural Intelligence Network

**Event:** Code with Community by H2S / Google  
**Prototype Type:** Hackathon MVP / Functional Demonstration  
**Primary Objective:** Demonstrate an AI-powered, interoperable agricultural intelligence platform for small and marginal farmers.  
**Budget Constraint:** ₹0 development budget  
**Primary AI:** Gemini  
**Frontend:** Next.js + TypeScript  
**Backend:** Next.js API layer  
**Database:** Supabase PostgreSQL  
**Deployment Target:** Vercel + Supabase  
**Development Workflow:** Gemini Pro + Antigravity  
**Document Purpose:** Product source of truth for subsequent TRD, App Flow and UI/UX documentation.

---

## 1. Product Overview
### 1.1 Product Name
**AgriN AI**  
**Tagline:** *From Farm Data to Smarter, Regenerative Decisions.*

AgriN AI is a prototype digital agriculture intelligence platform designed to help small and marginal farmers make better farming decisions using:
- Weather data
- Satellite-derived vegetation intelligence
- Soil information
- Crop information
- AI-based agricultural reasoning
- Crop disease image analysis
- Regenerative agriculture recommendations

The platform combines these data sources into a localized farm intelligence profile and converts technical agricultural data into simple, actionable recommendations.

---

## 2. Problem Statement
Small and marginal farmers in emerging economies often make agricultural decisions with limited access to:
- Localized weather intelligence
- Satellite-based crop monitoring
- Soil health information
- Early crop stress detection
- Disease identification
- Long-term soil management recommendations

This creates several problems:
1. Crop stress may be identified too late.
2. Irrigation decisions may not consider upcoming rainfall.
3. Soil degradation may be addressed reactively rather than preventively.
4. Farmers may lack accessible disease-screening tools.
5. Agricultural data is often fragmented between different systems.
6. Existing digital tools may provide raw information without converting it into simple, localized actions.
7. Different countries and agricultural ecosystems use different datasets and models, making interoperability difficult.

---

## 3. Product Vision
AgriN AI aims to demonstrate how a common digital agriculture intelligence layer can connect:
`Farm → Location → Weather → Satellite → Soil → Crop → AI Analysis → Localized Advisory → Regenerative Action`

The long-term vision is an interoperable agricultural network where countries can contribute compatible agricultural datasets, models and knowledge while farmers receive localized recommendations.

For the hackathon prototype, however, we will demonstrate the concept rather than attempt to build an actual multinational agricultural data exchange.

---

## 4. Product Goals
### Primary Goals
- **G1 — Localized agricultural intelligence:** Provide a farm-specific dashboard based on location, crop and available environmental data.
- **G2 — AI-powered advisory:** Use Gemini to transform structured agricultural data into understandable recommendations.
- **G3 — Satellite-based crop monitoring:** Demonstrate vegetation monitoring using satellite data and NDVI.
- **G4 — Weather-aware recommendations:** Use weather forecasts as an input to agricultural decisions.
- **G5 — Soil-aware recommendations:** Use soil information to influence crop and regenerative recommendations.
- **G6 — Crop disease screening:** Allow a farmer to upload a crop image and receive an AI-assisted disease/stress assessment.
- **G7 — Regenerative agriculture:** Recommend practices that consider long-term soil health rather than only immediate crop output.
- **G8 — Demonstrate interoperability:** Show how the same agricultural intelligence framework could operate across BRICS countries using standardized data structures.

---

## 5. Non-Goals (Explicitly Out of MVP Scope)
AgriN AI will NOT attempt to build:
- A government agricultural portal
- A real BRICS government data exchange
- A full agricultural ERP / marketplace / farmer payments / fertilizer purchasing
- Crop insurance / Loan processing / IoT hardware integration / Drone integration
- Custom satellite infrastructure / Proprietary weather forecasting model
- Proprietary LLM / ML model trained from scratch for disease recognition
- Blockchain-based agricultural records / Native Android/iOS app / Real-time communication / Full supply chain management

---

## 6. Target Users
1. **Primary User:** Small / Marginal Farmer (Smartphone user, needs simple, practical, actionable answers without jargon).
2. **Secondary User:** Agricultural Advisor / Extension Worker (Helps interpret results; shares same MVP interface).
3. **Conceptual User:** Agricultural Data / Policy Organization (Represents the future BRICS interoperability layer; conceptual demonstration).

---

## 7. Core Product Principle
> **"Do not show farmers raw data without context."**

Convert **Data → Intelligence → Action**:
- Instead of raw NDVI/Rainfall/Soil numbers, show actionable insights:
  - 🌾 *Crop Health:* Vegetation health has declined slightly.
  - 💧 *Irrigation:* Rainfall is expected soon. Consider delaying irrigation.
  - 🧪 *Soil:* Organic matter is relatively low. Consider residue retention and organic amendments.
  - 🌱 *Next Crop:* A legume rotation could help improve soil nitrogen.

---

## 8. Core MVP Features
1. **Farm Setup**
2. **Farm Intelligence Dashboard**
3. **AI Agro-Advisory**
4. **Regenerative Agriculture Planner**
5. **AI Crop Disease Scanner**
6. **AgriN / BRICS Data Network (Conceptual Module)**

---

## 9. Final Prototype Screen Structure
```
LANDING
  │
  ▼
FARM SETUP
  │
  ▼
FARM ANALYSIS (Data Collection / Processing State)
  │
  ▼
FARM DASHBOARD
  ├── ADVISORY
  ├── REGENERATIVE PLAN
  ├── DISEASE SCANNER
  └── AGRIN NETWORK CONCEPT VIEW
```

---

## 10. Screen 1 — Landing Page
- **Hero:** "AgriN AI — AI-powered intelligence for regenerative agriculture. Satellite • Soil • Weather • AI"
- **Key CTA:** `[ Analyze My Farm ]`
- **Value Proposition:** Turn farm data into localized, actionable agricultural recommendations. Visual motifs: Agricultural field, satellite intelligence, digital data, farmer interaction, AI.

---

## 11. Screen 2 — Farm Setup
- **Inputs:**
  - **Country:** 🇮🇳 India, 🇧🇷 Brazil, 🇷🇺 Russia, 🇨🇳 China, 🇿🇦 South Africa (Supports BRICS interoperability concept)
  - **Location:** Search location or "Use current location" (lat/long)
  - **Crop:** Wheat, Rice, Maize, Soybean, Cotton, Chickpea
  - **Farm Area:** e.g., 2.5 acres
  - **Optional Soil Information:** pH, Organic Carbon, Nitrogen, Phosphorus, Potassium
- **CTA:** `[ Analyze My Farm ]`

---

## 12. Screen 3 — Farm Analysis / Data Collection
Processing / loading state displaying multi-source data aggregation:
- ✓ Location identified
- ✓ Weather data retrieved
- ✓ Satellite observation found
- ✓ Soil profile loaded
- ✓ Crop profile loaded
- Progress visualization demonstrating underlying architecture.

---

## 13. Screen 4 — Farm Intelligence Dashboard
Answers: *"What is happening on my farm right now?"*
- **13.1 Farm Header:** My Farm, Ahmedabad, Gujarat 🇮🇳, Wheat, 2.5 acres
- **14. Farm Health Score:** Simplified composite score (e.g., 78 / 100) calculated from structured signals (NDVI, weather stress, soil condition, crop condition, disease risk).
- **15. Weather Card:** Temp (29°C), Forecast, Rainfall (18mm expected), Humidity (64%), 7-day trend, with agricultural interpretation (e.g., "Rain expected in 24–48 hours → Irrigation demand may be lower").
- **16. Soil Health Card:** pH, Organic Carbon, N, P, K + short interpretation.
- **17. Satellite / NDVI Card:** Current NDVI (0.71), Previous (0.76), Trend (↓ Declining), NDVI over time sparkline/chart.
- **18. Farm Map:** Location grounding, approximate field boundary, crop area, vegetation representation.
- **19. AI Advisory:** Crop condition, Irrigation advice, Weather risk, Soil management, each with clear rationale.
- **20. Recommendation Explainability:** Clear breakdown of *why* (e.g., NDVI decreased + Rainfall expected + Crop is Wheat ⇒ Delay irrigation).

---

## 21. Regenerative Agriculture Planner
- Shifts mindset from single-season yield maximization to long-term soil health and productivity.
- **Structure:**
  - Current Season: Actions for current crop (stress monitoring, residue management, irrigation optimization).
  - Next Crop Cycle: Potential rotation (e.g., Wheat → Chickpea) with agronomic justification.
  - Long-Term Soil Health: Organic matter, water efficiency, crop rotation, soil cover.
- **Time Horizons:** Today, This Week, Next Crop, Long Term.

---

## 23–25. AI Crop Disease Scanner
- **Flow:** Select crop → Upload/capture image → AI Vision analysis → Structured Screening Result.
- **Output:** Possible condition (e.g., Leaf Rust), Confidence score (e.g., 82%), Observed indicators, Recommended next steps.
- **Safety Disclaimer:** Prominent notice: "AI-assisted screening only. Results should be verified with a qualified agricultural professional before making significant treatment decisions." Clearly distinguish *possible* vs *confirmed*.

---

## 26. Contextual AI Agricultural Assistant
- Lightweight assistant grounded strictly in the farm's actual data.
- Answers questions like "Why is my crop health declining?" using telemetry (NDVI, weather, soil). Not an unconstrained general chatbot.

---

## 27. AI Architecture Requirements
- Deterministic data-first approach:
  `External Data → Data Normalization → Deterministic Calculations & Signals → Gemini → Explanation & Recommendations`
- Gemini does not invent arbitrary base numbers.

---

## 28–30. Data Sources & Schema
- **Weather:** Open-Meteo (free, no key required).
- **Satellite:** Copernicus Sentinel-2 / NDVI calculation (with cached/demo fallback).
- **Soil:** SoilGrids / local demo fallback dataset.
- **AI:** Gemini API (advisory, regenerative planning, vision disease scanning, contextual Q&A).
- **Core Farm Data Object:** Standardized JSON containing country, location, crop, farmArea, soil, weather, satellite telemetry.

---

## 31. Database Requirements (Supabase PostgreSQL)
Core entities:
- `users` (optional/guest)
- `farms`
- `fields`
- `crop_cycles`
- `weather_snapshots`
- `satellite_observations`
- `soil_profiles`
- `advisories`
- `disease_scans`

---

## 32–34. BRICS / Interoperability Module
- Storytelling & concept demonstration of standardized agricultural data exchange across BRICS (Brazil, Russia, India, China, South Africa).
- Demonstrates common schema compatibility across diverse regional crop profiles.

---

## 35–40. UX, Auth & Demo Mode
- **Zero Authentication Required for MVP:** Immediate access for judges and evaluators.
- **Demo Mode & Fallbacks:** Pre-seeded fallback data (e.g., Ahmedabad Wheat farm) to guarantee 100% resilience against external API rate limits or downtime.
- **Mobile-First Design:** Accessible, high contrast, clean typography, responsive layout.

---

## 41. Zero-Cost Constraint
Built 100% with free tiers: Next.js, TypeScript, Tailwind CSS, Supabase free tier, Open-Meteo, Copernicus Sentinel-2 free data, Gemini API free tier, Leaflet/MapLibre, Vercel free tier.

---

## 44–47. AI Safety & Structured Output
- Conservative advisory language ("Possible condition", "Consider", "May indicate").
- Structured JSON outputs for advisory and disease screening.

---

## 56. MVP Scope Lock
- **BUILD:** Landing, Farm Setup, Analysis loader, Dashboard (Weather, Soil, Satellite/NDVI, Farm Health Score, AI Advisory, Explainability, Map), Regenerative Plan, Disease Image Scanner, Contextual Assistant, BRICS Interoperability concept, Responsive UI, Demo fallback data.
- **DO NOT BUILD:** Auth, Payments, Marketplace, IoT, Blockchain, Native app, Real BRICS backend exchange, Custom ML training, Full GIS/ERP.
