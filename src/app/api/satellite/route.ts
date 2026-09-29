import { NextRequest, NextResponse } from "next/server";
import { getSatelliteData } from "@/lib/services/satellite";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lat = parseFloat(searchParams.get("lat") || "23.0225");
  const lon = parseFloat(searchParams.get("lon") || "72.5714");

  if (isNaN(lat) || isNaN(lon)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INVALID_INPUT",
          message: "Valid numeric latitude and longitude query parameters are required.",
        },
      },
      { status: 400 }
    );
  }

  try {
    const satellite = await getSatelliteData({ latitude: lat, longitude: lon });
    return NextResponse.json({
      success: true,
      data: satellite,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SATELLITE_API_ERROR",
          message: error.message || "Failed to retrieve satellite earth observation telemetry.",
        },
      },
      { status: 500 }
    );
  }
}
