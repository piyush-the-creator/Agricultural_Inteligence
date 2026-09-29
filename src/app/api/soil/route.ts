import { NextRequest, NextResponse } from "next/server";
import { getSoilData } from "@/lib/services/soil";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = parseFloat(searchParams.get("lat") || "23.0225");
  const lon = parseFloat(searchParams.get("lon") || "72.5714");
  const userPh = searchParams.get("ph") ? parseFloat(searchParams.get("ph")!) : undefined;
  const userOrganicCarbon = searchParams.get("oc") || undefined;
  const userNitrogen = searchParams.get("n") || undefined;
  const userPhosphorus = searchParams.get("p") || undefined;
  const userPotassium = searchParams.get("k") || undefined;

  try {
    const soil = await getSoilData({
      latitude: lat,
      longitude: lon,
      userPh,
      userOrganicCarbon,
      userNitrogen,
      userPhosphorus,
      userPotassium,
    });

    return NextResponse.json({
      success: true,
      data: soil,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SOIL_API_ERROR",
          message: error.message || "Failed to retrieve soil chemical profile.",
        },
      },
      { status: 500 }
    );
  }
}
