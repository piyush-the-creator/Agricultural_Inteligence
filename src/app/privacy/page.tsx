import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function PrivacyPage() {
  return (
    <div className="max-w-[720px] mx-auto bg-white border border-[#E2E0D8] rounded p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#E2E0D8] pb-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[#1B241E]">
            Privacy Policy & Data Stewardship
          </h1>
          <p className="text-xs text-[#58635A] mt-1">
            Ethical data boundaries for the AgriN AI digital public good prototype.
          </p>
        </div>
        <Link href="/">
          <Button variant="secondary" size="sm">
            ← Home
          </Button>
        </Link>
      </div>

      <div className="space-y-4 text-xs text-[#58635A] leading-relaxed">
        <section className="space-y-1.5">
          <h2 className="text-sm font-semibold text-[#1B241E]">1. No Commercial Monetization</h2>
          <p>
            Farm coordinates, soil chemical profiles, and crop leaf images submitted to AgriN AI are processed exclusively for real-time agronomic reasoning and localized advisory synthesis. We do not sell or monetize farmer data.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-semibold text-[#1B241E]">2. Ephemeral Image Analysis</h2>
          <p>
            Uploaded crop leaf photographs are buffered in-memory for computer vision pathology analysis and discarded following session completion. No biometric or personally identifiable image storage is maintained.
          </p>
        </section>

        <section className="space-y-1.5">
          <h2 className="text-sm font-semibold text-[#1B241E]">3. Public Good Stewardship</h2>
          <p>
            Anonymized regional vegetation vitality indices may be utilized to compute macro-level food security and climate resilience trends without exposing individual cadastral parcel boundaries.
          </p>
        </section>
      </div>
    </div>
  );
}
