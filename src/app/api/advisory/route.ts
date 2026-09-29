import { NextRequest, NextResponse } from "next/server";
import { generateFarmAdvisory } from "@/lib/services/gemini";
import { FarmIntelligence } from "@/types/farm";
import { DEMO_ADVISORY } from "@/lib/demo/demoAdvisory";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const farmData = body.farmIntelligence as FarmIntelligence;

    if (!farmData || !farmData.farm || !farmData.weather) {
      return NextResponse.json({
        success: true,
        data: DEMO_ADVISORY,
        warning: "Supplied inputs incomplete; returning calibrated demonstration advisory.",
      });
    }

    const advisory = await generateFarmAdvisory(farmData);

    return NextResponse.json({
      success: true,
      data: advisory,
    });
  } catch (error: any) {
    console.warn("[Advisory API Fallback]:", error);
    return NextResponse.json(
      {
        success: true,
        data: DEMO_ADVISORY,
        warning: "Fallback to calibrated demonstration advisory due to reasoning service timeout",
      },
      { status: 200 }
    );
  }
}
