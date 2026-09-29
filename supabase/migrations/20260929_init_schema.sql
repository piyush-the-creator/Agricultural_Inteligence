-- ==============================================================================
-- AgriN AI — Supabase PostgreSQL Schema Migration
-- Migration: 20260929_init_schema.sql
-- Description: Core schema for farms, fields, observations, advisories, and scans.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS TABLE (Optional/Guest authentication supported)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. FARMS TABLE
CREATE TABLE IF NOT EXISTS public.farms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    country TEXT NOT NULL DEFAULT 'India',
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    area NUMERIC(8, 2) NOT NULL DEFAULT 2.5,
    area_unit TEXT NOT NULL DEFAULT 'Acres',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for geographic lookup
CREATE INDEX IF NOT EXISTS idx_farms_coords ON public.farms(latitude, longitude);
CREATE INDEX IF NOT EXISTS idx_farms_user ON public.farms(user_id);

-- 3. FIELDS TABLE
CREATE TABLE IF NOT EXISTS public.fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    farm_id UUID NOT NULL REFERENCES public.farms(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT 'Main Parcel',
    crop TEXT NOT NULL DEFAULT 'Wheat',
    crop_stage TEXT DEFAULT 'Tillering',
    geometry JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_fields_farm ON public.fields(farm_id);

-- 4. CROP CYCLES TABLE
CREATE TABLE IF NOT EXISTS public.crop_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    crop TEXT NOT NULL,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_crop_cycles_field ON public.crop_cycles(field_id);

-- 5. WEATHER SNAPSHOTS TABLE
CREATE TABLE IF NOT EXISTS public.weather_snapshots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    temperature NUMERIC(5, 2) NOT NULL,
    humidity NUMERIC(5, 2),
    rainfall NUMERIC(6, 2) DEFAULT 0.0,
    forecast_date DATE DEFAULT CURRENT_DATE,
    source TEXT NOT NULL DEFAULT 'Open-Meteo',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weather_snapshots_field ON public.weather_snapshots(field_id, created_at DESC);

-- 6. SATELLITE OBSERVATIONS TABLE
CREATE TABLE IF NOT EXISTS public.satellite_observations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    observation_date DATE NOT NULL,
    ndvi NUMERIC(4, 3) NOT NULL,
    previous_ndvi NUMERIC(4, 3),
    cloud_cover NUMERIC(5, 2) DEFAULT 0.0,
    source TEXT NOT NULL DEFAULT 'Copernicus Sentinel-2',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_satellite_obs_field ON public.satellite_observations(field_id, observation_date DESC);

-- 7. SOIL PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.soil_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    ph NUMERIC(4, 2) DEFAULT 6.8,
    organic_carbon TEXT DEFAULT 'Medium',
    nitrogen TEXT DEFAULT 'Low',
    phosphorus TEXT DEFAULT 'Medium',
    potassium TEXT DEFAULT 'High',
    source TEXT NOT NULL DEFAULT 'HWSD v2.0',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_soil_profiles_field ON public.soil_profiles(field_id);

-- 8. ADVISORIES TABLE
CREATE TABLE IF NOT EXISTS public.advisories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID NOT NULL REFERENCES public.fields(id) ON DELETE CASCADE,
    health_score INTEGER NOT NULL CHECK (health_score >= 0 AND health_score <= 100),
    summary TEXT NOT NULL,
    risk_data JSONB,
    recommendations JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_advisories_field ON public.advisories(field_id, created_at DESC);

-- 9. DISEASE SCANS TABLE
CREATE TABLE IF NOT EXISTS public.disease_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    field_id UUID REFERENCES public.fields(id) ON DELETE SET NULL,
    image_url TEXT,
    possible_condition TEXT NOT NULL,
    confidence NUMERIC(5, 2) NOT NULL,
    observations JSONB,
    recommendations JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_disease_scans_field ON public.disease_scans(field_id, created_at DESC);

-- 10. ROW LEVEL SECURITY (Public Demo Access Allowed)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fields ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crop_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weather_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.satellite_observations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.soil_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advisories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disease_scans ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read and write access for hackathon prototype evaluation
CREATE POLICY "Public anonymous read access" ON public.farms FOR SELECT USING (true);
CREATE POLICY "Public anonymous insert access" ON public.farms FOR INSERT WITH CHECK (true);
CREATE POLICY "Public anonymous update access" ON public.farms FOR UPDATE USING (true);

CREATE POLICY "Public anonymous read fields" ON public.fields FOR SELECT USING (true);
CREATE POLICY "Public anonymous insert fields" ON public.fields FOR INSERT WITH CHECK (true);

CREATE POLICY "Public anonymous read advisories" ON public.advisories FOR SELECT USING (true);
CREATE POLICY "Public anonymous insert advisories" ON public.advisories FOR INSERT WITH CHECK (true);

CREATE POLICY "Public anonymous read disease scans" ON public.disease_scans FOR SELECT USING (true);
CREATE POLICY "Public anonymous insert disease scans" ON public.disease_scans FOR INSERT WITH CHECK (true);

-- 11. PRE-SEEDED DEMO FARM FIXTURE (Ahmedabad Wheat)
INSERT INTO public.users (id, email)
VALUES ('00000000-0000-0000-0000-000000000001', 'demo.farmer@agrin.ai')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.farms (id, user_id, name, country, latitude, longitude, area, area_unit)
VALUES (
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000001',
    'Ahmedabad Wheat Demo Farm',
    'India',
    23.0225,
    72.5714,
    2.5,
    'Acres'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.fields (id, farm_id, name, crop, crop_stage)
VALUES (
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000002',
    'Parcel 43QDA',
    'Wheat',
    'Tillering (Day 45)'
)
ON CONFLICT (id) DO NOTHING;
