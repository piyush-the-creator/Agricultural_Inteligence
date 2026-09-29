# AgriN AI — Production Deployment Guide
## Vercel (Next.js 15) + Supabase (PostgreSQL)

This guide provides step-by-step instructions to deploy **AgriN AI (Regenerative Agricultural Intelligence Network)** to production under a strict **₹0 development and hosting budget** using free-tier services.

---

## 1. Architectural Architecture & Free-Tier Services

| Component | Provider | Free Tier Specification |
|---|---|---|
| **Frontend & API Routes** | Vercel | Unlimited static hosting, 100GB bandwidth/mo, Serverless edge functions |
| **Database & Schema** | Supabase | Free tier: 500MB PostgreSQL, 1GB file storage, 50,000 monthly active users |
| **Reasoning Engine** | Google AI Studio | Gemini 1.5 Pro & Flash: 15 Requests Per Minute (RPM) free tier |
| **Atmospheric Telemetry** | Open-Meteo | Up to 10,000 daily API calls, zero API key required |
| **Satellite Imagery** | Copernicus Sentinel-2 | Open access Level-2A surface reflectance data / calibrated cache |

---

## 2. Step 1: Provision Supabase PostgreSQL Database

1. Navigate to [supabase.com](https://supabase.com) and create a new free project.
2. Select an AWS region close to your primary audience (e.g., `ap-south-1` for Mumbai / India).
3. Once the database is provisioned, open the **SQL Editor** from the left navigation panel.
4. Copy the entire contents of [`supabase/migrations/20260929_init_schema.sql`](file:///c:/Users/Dell/Desktop/Agricultural_Inteligence/supabase/migrations/20260929_init_schema.sql) and paste them into the SQL Editor.
5. Click **Run**. This will create:
   - 9 relational tables (`farms`, `fields`, `crop_cycles`, `weather_snapshots`, `satellite_observations`, `soil_profiles`, `advisories`, `disease_scans`, `cads_nodes`).
   - Indexes on geographic coordinates and parcel identifiers.
   - Row-Level Security (RLS) policies allowing public demonstration read/write.
   - Pre-seeded Ahmedabad Wheat farm (`IN-GJ-AHM-0042`) and initial telemetry records.
6. Open **Project Settings $\rightarrow$ API** and copy:
   - **Project URL** (`NEXT_PUBLIC_SUPABASE_URL`)
   - **anon / public key** (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - **service_role secret key** (`SUPABASE_SERVICE_ROLE_KEY`)

---

## 3. Step 2: Obtain Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Sign in with your Google account.
3. Click **Get API key** $\rightarrow$ **Create API key in new project**.
4. Copy the generated key (`GEMINI_API_KEY`).
5. *Note: Keep `DEMO_MODE=true` if deploying for hackathon evaluation to guarantee zero-latency fallback even if free rate limits are reached.*

---

## 4. Step 3: Deploy to Vercel

### Option A: 1-Click Git Import (Recommended)
1. Push your local workspace repository to GitHub.
2. Log into [vercel.com](https://vercel.com) and click **Add New... $\rightarrow$ Project**.
3. Select your `Agricultural_Inteligence` GitHub repository.
4. Set the **Framework Preset** to **Next.js** (root directory `./`).
5. Expand the **Environment Variables** panel and add the following:

```env
# Required for Gemini AI Reasoning
GEMINI_API_KEY=your_gemini_api_key_here

# Required for Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Fail-Safe Demonstration Mode
DEMO_MODE=true

# External APIs
OPEN_METEO_BASE_URL=https://api.open-meteo.com/v1/forecast
```

6. Click **Deploy**. Vercel will run `npm run build` and provision all 23 static and dynamic routes.

---

## 5. Step 4: Post-Deployment Smoke Test Matrix

After deployment, test the production URLs:

| Test Item | Verification URL | Expected Output |
|---|---|---|
| **System Health** | `https://your-domain.vercel.app/api/health` | HTTP 200: `{"status": "operational", "demoMode": true}` |
| **Landing Hero** | `https://your-domain.vercel.app/` | Hero loads with high-contrast earth tones and CTA |
| **Farm Onboarding** | `https://your-domain.vercel.app/farm` | Click *Analyze My Farm* $\rightarrow$ 5-step checklist completes in ~2.5s |
| **Operations Dashboard** | `https://your-domain.vercel.app/dashboard` | 3-column layout, Farm Health Score 78, interactive NDVI map toggle |
| **Causal Explainability** | Drawer in `/dashboard` | Click *Inspect Agronomic Reasoning* $\rightarrow$ 480px slide-out displays causal chain |
| **Regenerative Plan** | `https://your-domain.vercel.app/regenerative` | 4-stage horizons + SOC water simulator slider operational |
| **Disease Screener** | `https://your-domain.vercel.app/disease` | 1-click *Load Verified Demo Specimen* $\rightarrow$ diagnosis appears in < 1.5s |
| **Federated Network** | `https://your-domain.vercel.app/network` | All 5 BRICS nodes synchronize, live CADS JSON packet copy works |

---

## 6. Zero-Budget Maintenance & Security Notice

- **Security Verification:** `GEMINI_API_KEY` and `SUPABASE_SERVICE_ROLE_KEY` are strictly server-side and never exposed to client-side bundles.
- **Cost Guarantee:** All third-party services utilized operate strictly within permanent free tiers. No credit card charges will occur under standard demonstration volumes.
- **Fail-Safe Fallback:** If any external service is unavailable or rate-limited, AgriN AI's built-in 3-tier cascade (`Live → Cache → Pre-seeded Demo`) automatically serves verified agricultural data with zero unhandled 500 errors.
