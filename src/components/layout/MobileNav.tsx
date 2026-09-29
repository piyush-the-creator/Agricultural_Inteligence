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
      className="md:hidden fixed inset-x-0 bottom-0 z-30 grid grid-cols-4 bg-[var(--bg)]/92 backdrop-blur-md border-t border-[var(--line)] pb-[env(safe-area-inset-bottom,0)] shadow-xs"
      aria-label="Mobile Navigation"
    >
      {MOBILE_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`flex flex-col items-center justify-center py-2.5 px-1 min-h-[56px] transition-colors ${
              isActive
                ? "text-[var(--leaf)] font-semibold"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            <Icon name={item.icon} className="w-4 h-4 mb-1" />
            <span className="text-[0.78rem] tracking-tight font-body">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
