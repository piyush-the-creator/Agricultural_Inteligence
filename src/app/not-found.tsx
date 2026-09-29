import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border border-[#E2E0D8] rounded p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#F2F4F3] border border-[#D3D8D5] flex items-center justify-center text-xl text-[#58635A]">
          🧭
        </div>

        <div>
          <span className="text-[10px] font-mono uppercase bg-[#F2F4F3] text-[#58635A] px-2 py-0.5 rounded border border-[#E2E0D8]">
            HTTP 404 • Resource Unmapped
          </span>
          <h1 className="text-xl font-bold text-[#1B241E] mt-2">
            Agricultural Parcel Not Found
          </h1>
          <p className="text-xs text-[#58635A] mt-1.5 leading-relaxed">
            The requested agricultural telemetry endpoint or screen does not exist within the current cadastral index.
          </p>
        </div>

        <div className="pt-2">
          <Link href="/dashboard">
            <Button variant="primary" size="sm" className="w-full text-xs">
              Return to Operations Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
