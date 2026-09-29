import { NextRequest, NextResponse } from "next/server";
import { generateRegenerativePlan, generateDeterministicPlan } from "@/lib/services/regenerative";
import { FarmIntelligence } from "@/types/farm";

export async function GET(request: NextRequest) {
  try {
    const isDemoMode = process.env.DEMO_MODE === "true";
    let plan;

    if (isDemoMode) {
      plan = generateDeterministicPlan();
    } else {
      plan = await generateRegenerativePlan();
    }

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (err: any) {
    console.error("GET /api/regenerative error:", err);
    return NextResponse.json(
      {
        success: true,
        data: generateDeterministicPlan(),
        warning: "Fallback to deterministic FAO plan due to processing exception",
      },
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const farmIntelligence = body.farmIntelligence as FarmIntelligence | undefined;

    const plan = await generateRegenerativePlan(farmIntelligence);

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (err: any) {
    console.error("POST /api/regenerative error:", err);
    return NextResponse.json(
      {
        success: true,
        data: generateDeterministicPlan(),
        warning: "Fallback to deterministic FAO plan due to processing exception",
      },
      { status: 200 }
    );
  }
}
