"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, IconName } from "@/components/ui/Icons";

interface MobileNavItem {
  href: string;
  label: string;
  icon: IconName;
}

const MOBILE_ITEMS: MobileNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: "activity" },
  { href: "/farm", label: "Farm", icon: "mapPin" },
  { href: "/regenerative", label: "Plan", icon: "leaf" },
  { href: "/disease", label: "Scan", icon: "flask" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E0D8] z-30 flex justify-around items-center h-[60px] px-2 shadow-[0_-1px_3px_rgba(27,36,30,0.04)]"
      aria-label="Mobile Navigation"
    >
      {MOBILE_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center justify-center flex-1 h-full min-h-[48px] py-1 transition-colors ${
              isActive
                ? "text-[#2D5A3C] font-semibold"
                : "text-[#58635A] hover:text-[#1B241E]"
            }`}
          >
            <Icon name={item.icon} className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] uppercase font-mono tracking-tight">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
