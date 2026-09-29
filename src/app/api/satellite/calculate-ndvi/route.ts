import { NextRequest, NextResponse } from "next/server";
import { calculateNDVI } from "@/lib/services/satellite";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nirBand8, redBand4 } = body;

    if (typeof nirBand8 !== "number" || typeof redBand4 !== "number") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Valid numeric nirBand8 and redBand4 reflectance values are required.",
          },
        },
        { status: 400 }
      );
    }

    const ndvi = calculateNDVI(nirBand8, redBand4);

    let classification = "Dense Resilient Canopy";
    if (ndvi < 0.2) classification = "Bare Soil / Water Body";
    else if (ndvi < 0.5) classification = "Sparse / Stressed Vegetation";
    else if (ndvi <= 0.72) classification = "Moderate Canopy Vigor";

    return NextResponse.json({
      success: true,
      data: {
        ndvi,
        classification,
        bands: { nirBand8, redBand4 },
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "CALCULATION_ERROR",
          message: error.message || "Failed to calculate NDVI from spectral reflectance.",
        },
      },
      { status: 500 }
    );
  }
}
