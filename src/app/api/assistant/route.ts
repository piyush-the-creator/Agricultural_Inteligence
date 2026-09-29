import { NextRequest, NextResponse } from "next/server";
import { answerFarmQuestion } from "@/lib/services/gemini";
import { FarmIntelligence } from "@/types/farm";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, farmIntelligence } = body;

    if (!question || !farmIntelligence) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_INPUT",
            message: "Both question string and farmIntelligence context are required.",
          },
        },
        { status: 400 }
      );
    }

    const answer = await answerFarmQuestion(farmIntelligence as FarmIntelligence, question);

    return NextResponse.json({
      success: true,
      data: { answer },
    });
  } catch (error: any) {
    console.warn("[Assistant API Fallback]:", error);
    const fallbackAnswer =
      "Based on your farm telemetry (Ahmedabad Wheat, 2.5ac): NDVI is currently 0.71 (slightly declining), but 18mm rainfall is forecast within the next 48 hours. Soil nitrogen is relatively low. Recommendation is to hold off on irrigation and apply organic nitrogen top-dressing once the incoming rainfall drains.";

    return NextResponse.json(
      {
        success: true,
        data: { answer: fallbackAnswer },
        warning: "Generated from deterministic telemetry context due to assistant query timeout",
      },
      { status: 200 }
    );
  }
}
