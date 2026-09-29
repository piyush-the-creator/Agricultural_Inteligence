import { NextResponse } from "next/server";
import { BRICS_NODES } from "@/lib/demo/demoNetwork";

export async function GET() {
  return NextResponse.json({
    success: true,
    protocol: "CADS / AgriN Open Agricultural Interoperability Protocol",
    version: "1.0.4",
    totalNodes: BRICS_NODES.length,
    globalSyncStatus: "All 5 BRICS Nodes Operational",
    nodes: BRICS_NODES,
  });
}
