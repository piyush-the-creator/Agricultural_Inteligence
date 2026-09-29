"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageToggle from "@/components/ui/LanguageToggle";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/farm", label: "My Farm" },
  { href: "/regenerative", label: "Regenerative Plan" },
  { href: "/disease", label: "Disease Scanner" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--line)]">
      <div className="wrap h-16 flex items-center justify-between gap-6">
        {/* Brand Identity */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 text-decoration-none font-medium text-[1.15rem] tracking-[-0.02em] text-[var(--ink)] group select-none"
            aria-label="AgriN AI home"
          >
            <svg
              className="w-[22px] h-[22px] stroke-[var(--leaf)] text-[var(--leaf)] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 21V9" />
              <path d="M12 13c-3.5 0-6-2.3-6-6 3.5 0 6 2.3 6 6z" />
              <path d="M12 15c0-3 2.3-5.2 6-5.2 0 3.2-2.4 5.2-6 5.2z" />
            </svg>
            <span className="font-semibold font-display">AgriN AI</span>
            <span className="text-[0.75rem] text-[var(--muted)] border border-[var(--line)] rounded-full px-2 py-0.5 font-normal leading-normal">
              Prototype
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-[0.95rem]" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`py-1.5 transition-colors border-b-[1.5px] ${
                    isActive
                      ? "border-[var(--leaf)] text-[var(--ink)] font-medium"
                      : "border-transparent text-[var(--muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Status Section */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-[0.85rem] text-[var(--muted)] whitespace-nowrap font-mono">
            <span
              className="w-[7px] h-[7px] rounded-full bg-[var(--stress)] animate-pulse"
              aria-hidden="true"
            />
            <span>Demo mode: Ahmedabad, wheat, 2.5 acres</span>
          </div>

          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
