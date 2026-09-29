# Technical Requirements Document (TRD)
## AgriN AI — Regenerative Agricultural Intelligence Network

**Project Type:** Hackathon Prototype / Functional MVP  
**Event:** Code with Community by H2S / Google  
**Development Constraint:** ₹0 budget  
**Primary AI:** Gemini API  
**Frontend:** Next.js + TypeScript  
**Backend:** Next.js API Routes / Server-side functions  
**Database:** Supabase PostgreSQL  
**Deployment:** Vercel  
**Architecture:** Modular monolith  
**Document Status:** Technical source of truth for implementation

---

## 1. Technical Objective
AgriN AI must provide a lightweight technical architecture capable of:
1. Accepting farmer and farm information.
2. Fetching agricultural/environmental data.
3. Normalizing that data into a common farm intelligence object.
4. Performing deterministic calculations such as NDVI trends and risk signals.
5. Sending structured information to Gemini.
6. Returning localized agricultural recommendations.
7. Performing AI-assisted crop disease image analysis.
8. Persisting relevant farm and analysis information.
9. Providing a conceptual interoperability layer for BRICS agricultural data.
10. Remaining functional even if an external API temporarily fails.

Prioritize: Fast implementation + reliability + zero-cost operation + easy demonstration. Avoid enterprise-level complexity.

---

## 2. Architecture Decision & Rationale
Modular monolithic Next.js application using App Router.
- **Explicitly avoid:** Microservices, Docker/Kubernetes, separate Express backend, Redis, Kafka, dedicated Python ML server, GraphQL.
- **Tech stack:** Next.js + TypeScript + Supabase + External APIs (Open-Meteo, Copernicus/Sentinel-2, SoilGrids) + Gemini API.

```
                         ┌───────────────────┐
                         │     Browser       │
                         │ Desktop / Mobile  │
                         └─────────┬─────────┘
                                   │
                                   ▼
                         ┌───────────────────┐
                         │     Next.js       │
                         │   App + API       │
                         └─────────┬─────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              │                    │                    │
              ▼                    ▼                    ▼
       ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
       │ Weather     │      │ Satellite   │      │ Soil        │
       │ Service     │      │ Service     │      │ Service     │
       └─────────────┘      └─────────────┘      └─────────────┘
              │                    │                    │
              └────────────────────┼────────────────────┘
                                   ▼
                         ┌───────────────────┐
                         │ Data Normalizer   │
                         └─────────┬─────────┘
                                   ▼
                         ┌───────────────────┐
                         │ Signal / Scoring  │
                         │ Engine            │
                         └─────────┬─────────┘
                                   ▼
                         ┌───────────────────┐
                         │   Gemini AI       │
                         └─────────┬─────────┘
                                   ▼
                         ┌───────────────────┐
                         │ Advisory /        │
                         │ Recommendation    │
                         │ Engine            │
                         └─────────┬─────────┘
                                   ▼
                         ┌───────────────────┐
                         │ Supabase          │
                         │ PostgreSQL        │
                         └───────────────────┘
```

---

## 3. Technology Stack Breakdown
| Layer | Technology | Purpose |
|---|---|---|
| Frontend | Next.js, React, TypeScript | Web application & type safety |
| Styling | Tailwind CSS | UI components & styling |
| Charts | Recharts | NDVI / weather visualizations |
| Maps | Leaflet / React-Leaflet | Farm map & visual grounding |
| Backend | Next.js Route Handlers | API layer |
| Database | Supabase PostgreSQL | Persistence |
| DB Access | Supabase JS Client | Simple, fast setup |
| AI | Gemini API | Agro-advisory, vision disease screening, assistant |
| Weather | Open-Meteo | Free weather forecast & history |
| Satellite | Copernicus / Sentinel-2 | Free satellite vegetation data / NDVI |
| Soil | SoilGrids / Demo dataset | Soil properties |
| Validation | Zod | Request & AI response validation |
| Deployment | Vercel | Zero-cost serverless hosting |

---

## 4. Frontend & Route Architecture
```
app/
├── page.tsx                  # Landing page
├── dashboard/page.tsx        # Farm intelligence dashboard
├── farm/page.tsx             # Farm setup form
├── regenerative/page.tsx     # Regenerative agriculture planner
├── disease/page.tsx          # Crop disease image scanner
├── network/page.tsx          # BRICS network interoperability concept
└── api/
    ├── weather/route.ts
    ├── soil/route.ts
    ├── satellite/route.ts
    ├── farm/analyze/route.ts
    ├── advisory/route.ts
    ├── regenerative/route.ts
    ├── disease/route.ts
    └── assistant/route.ts
```

---

## 5. Normalized Data Contracts

### 5.1 WeatherData
```typescript
interface WeatherData {
  temperature: number;
  humidity?: number;
  rainfallNext24h?: number;
  rainfallNext7Days?: number;
  windSpeed?: number;
  forecast: {
    date: string;
    temperature: number;
    precipitation: number;
  }[];
}
```

### 5.2 SatelliteData
```typescript
interface SatelliteData {
  currentNdvi: number;
  previousNdvi?: number;
  ndviChange?: number;
  observationDate?: string;
  cloudCover?: number;
  trend?: "improving" | "stable" | "declining";
}
```

### 5.3 SoilData
```typescript
interface SoilData {
  ph?: number;
  organicCarbon?: number | string;
  nitrogen?: number | string;
  phosphorus?: number | string;
  potassium?: number | string;
  source: string;
}
```

### 5.4 FarmIntelligence (Main Contract)
```typescript
interface FarmIntelligence {
  farm: {
    country: string;
    latitude: number;
    longitude: number;
    crop: string;
    farmArea: number;
  };
  weather: WeatherData;
  soil: SoilData;
  satellite: SatelliteData;
  signals: {
    vegetationStress: "low" | "moderate" | "high";
    waterStress: "low" | "moderate" | "high";
    soilConcern: "low" | "moderate" | "high";
    overallRisk: "low" | "moderate" | "high";
  };
}
```

---

## 6. Deterministic Signal & Scoring Engine
Implemented in `lib/scoring.ts`:
- **NDVI calculation:** `(NIR - RED) / (NIR + RED)` with division by zero protection.
- **NDVI change & trend:** `current - previous`.
- **Farm Health Score:** Weighted composite heuristic:
  - Vegetation condition (35%)
  - Weather stress (20%)
  - Soil condition (25%)
  - Disease risk (20%)
- **Tiers:**
  - 0–39: Critical
  - 40–59: Needs Attention
  - 60–79: Moderate
  - 80–100: Healthy
- Labelled clearly in UI as *"AgriN Farm Health Score — Prototype Indicator"*.

---

## 7. Gemini AI Integration & Safety
Located in `lib/services/gemini.ts`:
- **Functions:**
  - `generateFarmAdvisory(farmData: FarmIntelligence)`
  - `generateRegenerativePlan(farmData: FarmIntelligence)`
  - `analyzeDiseaseImage(image: string, crop: string)`
  - `answerFarmQuestion(farmData: FarmIntelligence, question: string)`
- **Key security:** `GEMINI_API_KEY` strictly in `.env.local` (never `NEXT_PUBLIC_*`).
- **Validation:** Strict **Zod** schema validation for all Gemini JSON outputs with graceful fallback upon parsing errors.
- **Disease Result Schema:**
```typescript
interface DiseaseResult {
  possibleCondition: string;
  confidence: number;
  observations: string[];
  recommendedNextSteps: string[];
  disclaimer: string;
}
```
- Disclaimers required on all diagnostic screens.

---

## 8. Resilience & Demo Mode Strategy
- **Fallback cascade:** `Live API → Cached Data → Demo Seed Data → UI works seamlessly`.
- A failed external API will **never** throw a 500 error on the dashboard.
- Demo data pre-configured for Ahmedabad, India (Wheat, 2.5 acres, NDVI 0.71, Temp 29°C, Rain 18mm, pH 6.8).
- Parallel external data fetching using `Promise.all([getWeather, getSoil, getSatellite])`.

---

## 9. Database Schema (Supabase PostgreSQL)
Tables:
- `users` (id, created_at)
- `farms` (id, user_id, name, country, latitude, longitude, area, created_at, updated_at)
- `fields` (id, farm_id, name, crop, crop_stage, geometry, created_at)
- `crop_cycles` (id, field_id, crop, start_date, end_date, status)
- `weather_snapshots` (id, field_id, temperature, humidity, rainfall, forecast_date, source, created_at)
- `satellite_observations` (id, field_id, observation_date, ndvi, previous_ndvi, cloud_cover, source, created_at)
- `soil_profiles` (id, field_id, ph, organic_carbon, nitrogen, phosphorus, potassium, source, created_at)
- `advisories` (id, field_id, health_score, summary, risk_data, recommendations, created_at)
- `disease_scans` (id, field_id, image_url, possible_condition, confidence, observations, recommendations, created_at)

---

## 10. BRICS Interoperability Data Model
```typescript
interface AgriculturalDataPacket {
  country: string;
  location: {
    latitude: number;
    longitude: number;
  };
  crop: string;
  soil?: SoilData;
  weather?: WeatherData;
  satellite?: SatelliteData;
  cropStage?: string;
  timestamp: string;
}
```
Profiles for: 🇮🇳 India, 🇧🇷 Brazil, 🇷🇺 Russia, 🇨🇳 China, 🇿🇦 South Africa.

---

## 11. Implementation Priorities
- **P0 (Required):** Next.js project setup, Farm setup, Dashboard, Weather service, Demo satellite/NDVI, Soil service, Gemini advisory, Farm health score, Regenerative plan, Disease scanner, Demo fallback.
- **P1 (Important):** Live satellite integration, Map (Leaflet), NDVI chart (Recharts), Supabase persistence, Contextual assistant.
- **P2 (Polish):** BRICS network visualizer, Advanced transitions, Extra crop profiles.
