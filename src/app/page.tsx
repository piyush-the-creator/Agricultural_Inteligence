import React from "react";
import Link from "next/link";
import SatelliteFieldInteractive from "@/components/home/SatelliteFieldInteractive";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION                                               */}
      {/* ------------------------------------------------------------- */}
      <section className="py-12 md:py-20" aria-labelledby="hero-title">
        <div className="wrap grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-8 lg:gap-16 items-center">
          <div>
            <h1
              id="hero-title"
              className="text-[2.6rem] sm:text-[3.2rem] lg:text-[4.2rem] leading-[1.02] tracking-[-0.035em] font-medium text-[var(--ink)]"
            >
              Intelligent farming for a regenerative future.
            </h1>
            <p className="mt-6 max-w-[34em] text-[var(--muted)] text-[1.15rem] leading-relaxed">
              AgriN reads satellite images, weather forecasts and soil chemistry for your field, then tells you what to do next and why.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/farm" className="btn-tmpl btn-tmpl-primary">
                Analyze my farm
              </Link>
              <Link href="/network" className="btn-tmpl btn-tmpl-ghost">
                Explore the AgriN network
              </Link>
            </div>
            <p className="mt-7 text-[0.88rem] text-[var(--muted)]">
              A public digital good prototype, built for Code with Community by H2S / Google.
            </p>
          </div>

          <div>
            <SatelliteFieldInteractive />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. PIPELINE SECTION                                           */}
      {/* ------------------------------------------------------------- */}
      <section
        className="py-16 md:py-24 border-t border-[var(--line)]"
        id="how"
        aria-labelledby="how-title"
      >
        <div className="wrap">
          <div className="max-w-[40rem] mb-14">
            <h2
              id="how-title"
              className="text-[1.9rem] sm:text-[2.5rem] leading-[1.1] font-medium text-[var(--ink)]"
            >
              From field data to farm action
            </h2>
            <p className="mt-4 text-[var(--muted)] text-[1.05rem]">
              Every recommendation follows the same five steps, and you can inspect each one. Nothing is invented along the way.
            </p>
          </div>

          <ol className="grid grid-cols-1 md:grid-cols-5 gap-0 p-0 m-0 list-none">
            {/* Step 1 */}
            <li className="relative pt-7 pr-5 border-t-[1.5px] border-[var(--line)] md:border-l-0 max-md:border-t-0 max-md:border-l-[1.5px] max-md:pl-7 max-md:pb-8">
              <span className="absolute -top-[6px] left-0 max-md:top-1 max-md:-left-[6px] w-2.5 h-2.5 rounded-full bg-[var(--bg)] border-2 border-[var(--leaf)]" />
              <small className="block text-[0.82rem] text-[var(--muted)] mb-1 font-mono uppercase">
                Step 1
              </small>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Field parcel
              </h3>
              <p className="text-[0.93rem] text-[var(--muted)] leading-relaxed">
                Ahmedabad, India. Wheat on 2.5 acres.
              </p>
            </li>

            {/* Step 2 */}
            <li className="relative pt-7 pr-5 border-t-[1.5px] border-[var(--line)] md:border-l-0 max-md:border-t-0 max-md:border-l-[1.5px] max-md:pl-7 max-md:pb-8">
              <span className="absolute -top-[6px] left-0 max-md:top-1 max-md:-left-[6px] w-2.5 h-2.5 rounded-full bg-[var(--bg)] border-2 border-[var(--leaf)]" />
              <small className="block text-[0.82rem] text-[var(--muted)] mb-1 font-mono uppercase">
                Step 2
              </small>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Earth data
              </h3>
              <p className="text-[0.93rem] text-[var(--muted)] leading-relaxed">
                Sentinel-2 satellite imagery and Open-Meteo weather forecasts.
              </p>
            </li>

            {/* Step 3 */}
            <li className="relative pt-7 pr-5 border-t-[1.5px] border-[var(--line)] md:border-l-0 max-md:border-t-0 max-md:border-l-[1.5px] max-md:pl-7 max-md:pb-8">
              <span className="absolute -top-[6px] left-0 max-md:top-1 max-md:-left-[6px] w-2.5 h-2.5 rounded-full bg-[var(--bg)] border-2 border-[var(--leaf)]" />
              <small className="block text-[0.82rem] text-[var(--muted)] mb-1 font-mono uppercase">
                Step 3
              </small>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Normalization
              </h3>
              <p className="text-[0.93rem] text-[var(--muted)] leading-relaxed">
                Crop greenness scored as NDVI 0.71, combined with HWSD soil chemistry.
              </p>
            </li>

            {/* Step 4 */}
            <li className="relative pt-7 pr-5 border-t-[1.5px] border-[var(--line)] md:border-l-0 max-md:border-t-0 max-md:border-l-[1.5px] max-md:pl-7 max-md:pb-8">
              <span className="absolute -top-[6px] left-0 max-md:top-1 max-md:-left-[6px] w-2.5 h-2.5 rounded-full bg-[var(--bg)] border-2 border-[var(--leaf)]" />
              <small className="block text-[0.82rem] text-[var(--muted)] mb-1 font-mono uppercase">
                Step 4
              </small>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                AI reasoning
              </h3>
              <p className="text-[0.93rem] text-[var(--muted)] leading-relaxed">
                Gemini 1.5 builds a cause-and-effect chain from the data.
              </p>
            </li>

            {/* Step 5 */}
            <li className="relative pt-7 pr-0 border-t-[1.5px] border-[var(--leaf)] md:border-l-0 max-md:border-t-0 max-md:border-l-[1.5px] max-md:border-l-[var(--leaf)] max-md:pl-7 max-md:pb-0">
              <span className="absolute -top-[6px] left-0 max-md:top-1 max-md:-left-[6px] w-2.5 h-2.5 rounded-full bg-[var(--leaf)] border-2 border-[var(--leaf)]" />
              <small className="block text-[0.82rem] text-[var(--leaf)] mb-1 font-mono uppercase font-semibold">
                Step 5
              </small>
              <h3 className="text-[1.15rem] font-medium mb-2 text-[var(--ink)]">
                Local action
              </h3>
              <p className="text-[0.93rem] text-[var(--ink)] leading-relaxed font-medium">
                Delay irrigation for 48 hours. Rotate in a legume pulse.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. PRINCIPLES SECTION                                         */}
      {/* ------------------------------------------------------------- */}
      <section
        className="py-16 md:py-24 border-t border-[var(--line)]"
        aria-labelledby="why-title"
      >
        <div className="wrap">
          <div className="max-w-[40rem] mb-14">
            <h2
              id="why-title"
              className="text-[1.9rem] sm:text-[2.5rem] leading-[1.1] font-medium text-[var(--ink)]"
            >
              Built to be understood, and free to use
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
            {/* Principle 1 */}
            <div className="md:pr-9 md:border-r md:border-[var(--line)]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-[26px] h-[26px] stroke-[var(--leaf)] fill-none stroke-[1.5] stroke-round mb-5"
              >
                <circle cx="6" cy="7" r="2.5" />
                <circle cx="18" cy="7" r="2.5" />
                <circle cx="12" cy="18" r="2.5" />
                <path d="M8 8.5l3 7M16 8.5l-3 7" />
              </svg>
              <h3 className="text-[1.3rem] font-medium mb-2.5 text-[var(--ink)]">
                Many sources, one picture
              </h3>
              <p className="text-[var(--muted)] text-[0.98rem] leading-relaxed">
                Satellite bands, rainfall forecasts and soil profiles are combined for you. You never have to read raw numbers.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="md:px-9 md:border-r md:border-[var(--line)]">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-[26px] h-[26px] stroke-[var(--leaf)] fill-none stroke-[1.5] stroke-round mb-5"
              >
                <circle cx="11" cy="11" r="6.5" />
                <path d="M16 16l5 5" />
                <path d="M8.5 11l2 2 3.5-4" />
              </svg>
              <h3 className="text-[1.3rem] font-medium mb-2.5 text-[var(--ink)]">
                Every advice has a reason
              </h3>
              <p className="text-[var(--muted)] text-[0.98rem] leading-relaxed">
                Each recommendation links to the exact readings that triggered it. Open the inspection drawer to see them.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="md:pl-9">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="w-[26px] h-[26px] stroke-[var(--leaf)] fill-none stroke-[1.5] stroke-round mb-5"
              >
                <path d="M12 21s-7-4.6-7-10.2A4.3 4.3 0 0 1 12 8a4.3 4.3 0 0 1 7 2.8C19 16.4 12 21 12 21z" />
              </svg>
              <h3 className="text-[1.3rem] font-medium mb-2.5 text-[var(--ink)]">
                Free for every farmer
              </h3>
              <p className="text-[var(--muted)] text-[0.98rem] leading-relaxed">
                Built only on free APIs and open data, so small and marginal farmers pay ₹0 in licence fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. DEMO BAND                                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="pb-16 md:pb-24">
        <div className="wrap">
          <div className="bg-[var(--deep)] text-[var(--on-deep)] rounded-[20px] p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-end shadow-md">
            <div>
              <h2 className="text-[1.9rem] sm:text-[2.4rem] lg:text-[2.9rem] leading-[1.08] max-w-[16em] font-medium text-white">
                Walk through the live demo farm in Ahmedabad
              </h2>
              <p className="mt-4 text-[var(--on-deep)]/80 max-w-[30em] text-[1.05rem] leading-relaxed">
                A wheat parcel with real, pre-loaded readings from Gujarat. The full tour takes 2 to 4 minutes.
              </p>
            </div>

            <div className="flex flex-col items-start gap-3.5">
              <Link
                href="/dashboard"
                className="btn-tmpl bg-[var(--on-deep)] text-[var(--deep)] border-[var(--on-deep)] hover:bg-white font-medium"
              >
                Open the farm dashboard
              </Link>
              <small className="text-[var(--on-deep)]/70 text-[0.88rem]">
                No sign-up needed.
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
