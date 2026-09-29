import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "operational",
    service: "AgriN AI Federated Core",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    demoNode: "Ahmedabad (IN-GJ-AHM-0042)",
    environment: process.env.NODE_ENV,
    demoMode: process.env.DEMO_MODE === "true",
  });
}
