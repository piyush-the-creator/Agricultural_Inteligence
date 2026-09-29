"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("AgriN AI Unhandled Client Error caught by Error Boundary:", error);
  }, [error]);

  const handleResetDemo = () => {
    try {
      localStorage.removeItem("agrin_active_farm");
      localStorage.removeItem("agrin_farm_intelligence");
    } catch {}
    reset();
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-[#E2E0D8] rounded p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF9EB] border border-[#F5DE9C] flex items-center justify-center text-xl text-[#875A00]">
          ⚠️
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase bg-[#F2F4F3] text-[#58635A] px-2 py-0.5 rounded border border-[#E2E0D8]">
            Fail-Safe Error Boundary Active
          </span>
          <h1 className="text-xl font-bold text-[#1B241E] mt-2">
            Transient Interface Exception
          </h1>
          <p className="text-xs text-[#58635A] mt-1.5 leading-relaxed">
            The platform encountered a non-fatal client error. The deterministic fallback system is active to preserve telemetry integrity.
          </p>
        </div>

        <div className="p-3 bg-[#FBFBF9] border border-[#E2E0D8] rounded text-left text-xs font-mono text-[#58635A] overflow-hidden text-ellipsis">
          <span className="text-[10px] uppercase text-[#828E84] block">Error Message:</span>
          <span className="text-[#992615] font-medium">{error?.message || "Unknown client exception"}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleResetDemo}
            className="flex-1 text-xs"
          >
            Reset Session to Demo
          </Button>
          <Link href="/dashboard" className="flex-1">
            <Button variant="primary" size="sm" className="w-full text-xs">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
