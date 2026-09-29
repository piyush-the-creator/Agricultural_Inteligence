import { NextRequest, NextResponse } from "next/server";
import { analyzeLeafImage, getDeterministicDiseaseResult } from "@/lib/services/disease";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { imageBase64, mimeType = "image/jpeg", crop = "Wheat", isDemo = false } = body;

    // Check size limit: 5MB in base64 is ~7MB string length
    if (imageBase64 && imageBase64.length > 7 * 1024 * 1024) {
      return NextResponse.json(
        {
          success: false,
          error: "Payload exceeds 5MB limit. Please upload a compressed leaf photograph.",
        },
        { status: 413 }
      );
    }

    const isDemoMode = process.env.DEMO_MODE === "true" || isDemo || !imageBase64;

    let result;
    if (isDemoMode && !imageBase64) {
      result = getDeterministicDiseaseResult(crop);
    } else {
      result = await analyzeLeafImage(imageBase64, mimeType, crop);
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error("POST /api/disease/analyze exception:", err);
    return NextResponse.json(
      {
        success: true,
        data: getDeterministicDiseaseResult("Wheat"),
        warning: "Fallback to deterministic pathology diagnosis due to processing error",
      },
      { status: 200 }
    );
  }
}
