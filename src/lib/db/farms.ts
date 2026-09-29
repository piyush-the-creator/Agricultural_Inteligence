import { getSupabaseServerClient } from "@/lib/supabase/server";
import { DEMO_FARM } from "@/lib/demo/demoFarm";
import { FarmProfile } from "@/types/farm";

export interface CreateFarmInput {
  name?: string;
  country: string;
  location: string;
  latitude: number;
  longitude: number;
  crop: string;
  area: number;
  areaUnit: "Acres" | "Hectares";
}

/**
 * Retrieves farm profile by ID.
 * Falls back to deterministic Ahmedabad demo farm if Supabase is offline or unconfigured.
 */
export async function getFarmById(farmId: string): Promise<FarmProfile> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    return DEMO_FARM;
  }

  try {
    const { data: farm, error: farmError } = await supabase
      .from("farms")
      .select("*, fields(*)")
      .eq("id", farmId)
      .single();

    if (farmError || !farm) {
      console.warn("[DB] Farm not found or query error, returning demo farm:", farmError?.message);
      return DEMO_FARM;
    }

    const field = farm.fields?.[0];

    return {
      id: farm.id,
      country: farm.country,
      location: farm.name,
      coordinates: {
        lat: Number(farm.latitude),
        lon: Number(farm.longitude),
      },
      crop: field?.crop || "Wheat",
      area: Number(farm.area),
      areaUnit: (farm.area_unit as "Acres" | "Hectares") || "Acres",
      sowingDays: 45,
      stage: field?.crop_stage || "Tillering (Day 45)",
    };
  } catch (error) {
    console.warn("[DB] Unexpected database error, using demo fallback:", error);
    return DEMO_FARM;
  }
}

/**
 * Creates or registers a new farm parcel in the database.
 */
export async function createFarm(input: CreateFarmInput): Promise<FarmProfile> {
  const supabase = getSupabaseServerClient();

  if (!supabase) {
    // Return simulated persisted farm profile
    return {
      id: `local-${Date.now()}`,
      country: input.country,
      location: input.location,
      coordinates: {
        lat: input.latitude,
        lon: input.longitude,
      },
      crop: input.crop,
      area: input.area,
      areaUnit: input.areaUnit,
      sowingDays: 1,
      stage: "Sowing / Early Emergence",
    };
  }

  try {
    const { data: farm, error: farmError } = await supabase
      .from("farms")
      .insert({
        name: input.location,
        country: input.country,
        latitude: input.latitude,
        longitude: input.longitude,
        area: input.area,
        area_unit: input.areaUnit,
      })
      .select()
      .single();

    if (farmError) throw farmError;

    // Create default field parcel
    const { data: field, error: fieldError } = await supabase
      .from("fields")
      .insert({
        farm_id: farm.id,
        name: `${input.crop} Parcel`,
        crop: input.crop,
        crop_stage: "Early Emergence",
      })
      .select()
      .single();

    if (fieldError) throw fieldError;

    return {
      id: farm.id,
      country: farm.country,
      location: farm.name,
      coordinates: {
        lat: Number(farm.latitude),
        lon: Number(farm.longitude),
      },
      crop: field.crop,
      area: Number(farm.area),
      areaUnit: (farm.area_unit as "Acres" | "Hectares") || "Acres",
      sowingDays: 1,
      stage: field.crop_stage,
    };
  } catch (error) {
    console.warn("[DB] Failed to insert farm into Supabase, using local fallback:", error);
    return {
      id: `local-${Date.now()}`,
      country: input.country,
      location: input.location,
      coordinates: {
        lat: input.latitude,
        lon: input.longitude,
      },
      crop: input.crop,
      area: input.area,
      areaUnit: input.areaUnit,
      sowingDays: 1,
      stage: "Early Emergence",
    };
  }
}
