"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/farm", label: "My Farm" },
  { href: "/regenerative", label: "Regenerative Plan" },
  { href: "/disease", label: "Disease Scanner" },
  { href: "/network", label: "AgriN Network" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E0D8]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand Identity */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-left flex items-baseline space-x-2 group">
            <span className="font-semibold text-[15px] tracking-tight text-[#1B241E] group-hover:text-[#2D5A3C] transition-colors">
              AgriN AI
            </span>
            <span className="text-[10px] font-mono uppercase bg-[#F2F4F3] text-[#58635A] px-1.5 py-0.5 rounded border border-[#E2E0D8]">
              Prototype
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-1" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 text-[13px] font-medium transition-colors border-b-2 ${
                    isActive
                      ? "border-[#2D5A3C] text-[#1B241E] font-semibold"
                      : "border-transparent text-[#58635A] hover:text-[#1B241E]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Status Section */}
        <div className="flex items-center space-x-2.5">
          <span className="hidden sm:inline-flex items-center text-[11px] font-mono text-[#58635A] bg-[#F4F5F2] border border-[#E2E0D8] px-2 py-0.5 rounded">
            Ahmedabad • Wheat 2.5 ac
          </span>
          <span className="inline-flex items-center space-x-1.5 text-[11px] font-mono text-[#1E5E2E] bg-[#EBF5EE] border border-[#BCE3C5] px-2 py-0.5 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E5E2E] animate-pulse"></span>
            <span>Demo Mode</span>
          </span>
        </div>
      </div>
    </header>
  );
}
