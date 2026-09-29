# App Flow + User Flow Document
## AgriN AI — Regenerative Agricultural Intelligence Network

**Event:** Code with Community by H2S / Google  
**Prototype:** AgriN AI  
**Document Type:** Application Flow + User Flow  
**Version:** MVP / Hackathon Prototype  
**Based On:** AgriN AI PRD + TRD  
**Document Purpose:** Interaction source of truth for UI/UX and routing.

---

## 1. Purpose of This Document
This document defines how users move through AgriN AI and how the application behaves at every stage:
`PRD (What + Why) → TRD (Technical How) → APP FLOW + USER FLOW (User Movement) → UI/UX (Look & Interaction)`

---

## 2. Core Product Journey & Loop
```
┌───────────────┐
│    FARMER     │
└───────┬───────┘
        ↓ Tell us about your farm
┌───────────────┐
│   FARM SETUP  │
└───────┬───────┘
        ↓ Collect farm data
┌─────────────────┼─────────────────┐
↓                 ↓                 ↓
WEATHER        SATELLITE          SOIL
└─────────────────┼─────────────────┘
                  ↓
          DATA NORMALIZATION
                  ↓
            SIGNAL ENGINE
                  ↓
               GEMINI
                  ↓
┌─────────────────┼─────────────────┐
↓                 ↓                 ↓
ADVISORY     REGENERATIVE       DISEASE
                PLAN            SCANNER
└─────────────────┼─────────────────┘
                  ↓
            AGRIN NETWORK (BRICS Concept)
                  ↓
                 END
```
**Philosophy:** Input → Understand → Analyze → Explain → Act.

---

## 3. Navigation Routes
- `/` — Landing Page (Hero, Value Prop, CTA)
- `/farm` — Farm Setup (Step-by-step guided input)
- `/dashboard` — Farm Intelligence Dashboard (Health score, Weather, Satellite/NDVI, Soil, Map, AI Advisory, Explanations, Q&A Assistant)
- `/regenerative` — Regenerative Agriculture Plan (Now, This Week, Next Crop, Long-Term Soil Health)
- `/disease` — AI Crop Disease Image Scanner (Upload, Gemini Vision, Screening Result, Action Steps, Disclaimer)
- `/network` — AgriN Network / BRICS Interoperability Concept (Visual map, Country profiles, Common data schema)

---

## 4. Primary User Journey & Guided Steps

### 4.1 Landing Page (`/`)
- Hero CTA: `[ Analyze My Farm ]` → navigates to `/farm`
- Secondary Link: `Explore AgriN Network` → navigates to `/network`
- Returning user banner (if farm state exists in storage): `[ Continue to My Farm ]` → navigates to `/dashboard`

### 4.2 Farm Setup (`/farm`)
Guided micro-steps with minimal friction:
1. **Country:** 🇮🇳 India, 🇧🇷 Brazil, 🇷🇺 Russia, 🇨🇳 China, 🇿🇦 South Africa
2. **Location:** Search location or "Use Current Location" (auto-resolves lat/long + place name)
3. **Crop:** Wheat, Rice, Maize, Soybean, Cotton, Chickpea
4. **Farm Area:** Number input + unit toggle (Acres / Hectares)
5. **Soil Info (Optional):** pH, Organic Carbon, N, P, K with `[ Skip for now ]` option
6. **Review & Trigger:** Summary card + `[ Analyze My Farm ]`

### 4.3 Farm Analysis Processing State
Dynamic progress state (avoiding blank spinners):
- ✓ Location identified
- ✓ Weather data retrieved
- ✓ Soil profile loaded
- ✓ Satellite observation found
- ○ Calculating crop health & generating advisory
- Progress bar transition to `/dashboard`

### 4.4 Dashboard (`/dashboard`)
Answers: *"What is happening on my farm, and what should I do about it?"*
- **Header:** Location, Crop, Area + `[ Edit Farm ]`
- **Farm Health Score:** e.g., 78/100 (Moderate) + expandable "Why this score?" breakdown
- **Weather Card:** Temp, Rainfall forecast, Humidity + Agronomic Interpretation (e.g. "Rain expected within 48h → Delay irrigation")
- **Satellite / NDVI Card:** Current NDVI, Previous NDVI, Trend direction + sparkline/chart
- **Soil Health Card:** pH, Organic carbon, N-P-K + interpretation + link to `/regenerative`
- **Interactive Map:** Leaflet map centered on coordinates, field polygon outline
- **AI Agro-Advisory:** Actionable cards with Category, Urgency, Recommendation, and **"Why this recommendation?"** explainability modal/drawer
- **Contextual Farm Assistant:** Ask questions about the current farm metrics (e.g. "Why is NDVI declining?") strictly grounded in farm data

### 4.5 Regenerative Agriculture Planner (`/regenerative`)
Action hierarchy across 4 time horizons:
- **Now / Today:** Immediate actions (e.g. monitor moisture, delay irrigation)
- **This Week:** Short-term field management (e.g. scout rust spots, evaluate drainage)
- **Next Crop Cycle:** Crop rotation guidance (e.g. Wheat → Chickpea legume rotation for nitrogen fixation)
- **Long Term:** Soil health pillars (organic matter, cover cropping, reduced tillage, water efficiency)

### 4.6 AI Crop Disease Scanner (`/disease`)
- Crop selector (defaults to current farm crop)
- Drag-and-drop / camera upload (supports JPG, PNG, WEBP, ≤ 5MB)
- Processing state with symptom extraction
- Result: Possible Condition (e.g., Leaf Rust), AI Confidence estimate (e.g., 82%), Visual symptoms observed, Recommended next steps
- **Mandatory Disclaimer:** Non-diagnostic disclaimer visible on all scan results.

### 4.7 AgriN Network / BRICS Interoperability (`/network`)
- Storytelling visualization connecting 5 BRICS hubs: 🇮🇳 India, 🇧🇷 Brazil, 🇷🇺 Russia, 🇨🇳 China, 🇿🇦 South Africa
- Interactive country selector loading regional agricultural context (crop, climate, soil)
- Common Agricultural Data Schema showcase (demonstrating how standardized JSON interoperates across nations)
- Quick CTA: `[ Explore Demo Farm ]` → loads country demo into `/dashboard`

---

## 5. Resilience & Fallback UX Flow
```
User Action → Live API → Success?
  ├── YES → Render fresh data
  └── NO  → Check Cache → Available?
               ├── YES → Render cached data with subtle indicator
               └── NO  → Render pre-seeded Demo Data + friendly toast:
                         "Satellite data is temporarily unavailable. Showing latest verified farm observation."
```
- No raw 500 error screens or stack traces to the user.
- Dashboard progressively hydrates so slow/failing endpoints never block the entire UI.

---

## 6. Interaction Matrix
| Origin Screen | Trigger Action | System Response | Target View |
|---|---|---|---|
| Landing | Analyze My Farm | Initialize setup state | `/farm` |
| Landing | Explore Network | Open BRICS visualizer | `/network` |
| Farm Setup | Submit Details | Trigger parallel analysis | Analysis Loader → `/dashboard` |
| Dashboard | Why this score? | Expand signal calculation breakdown | In-page Modal / Drawer |
| Dashboard | View Forecast | Expand 7-day weather detail | In-page Sheet / Drawer |
| Dashboard | View NDVI Trend | Display Recharts time series | In-page Modal / Chart |
| Dashboard | View Regenerative Plan | Retain farm context & navigate | `/regenerative` |
| Dashboard | Scan Crop Image | Open disease scanner | `/disease` |
| Dashboard | Edit Farm | Pre-fill form with current state | `/farm` |
| Disease | Analyze Image | Run Gemini Vision + validate output | Disease Result Card |
| Disease | Back to Dashboard | Return to farm context | `/dashboard` |
| Network | Select Country | Switch active BRICS node & schema | `/network` |
| Network | Explore Country Farm | Load country preset into dashboard | `/dashboard` |

---

## 7. Mobile-First & Desktop Responsiveness
- **Mobile (< 768px):** Bottom navigation bar (`Home`, `Farm`, `Dashboard`, `Plan`, `Scan`, `Network`), vertical stack for dashboard cards, full-width touch targets.
- **Desktop (>= 768px):** Top navigation bar, multi-column dashboard grid (Health + Weather + Soil top row, Advisory + Map second row, NDVI trend + Regenerative overview third row).
