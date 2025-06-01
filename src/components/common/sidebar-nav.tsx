"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, BarChart3, MapIcon, TreesIcon, FlameIcon, DropletsIcon, BirdIcon } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  segment?: string | null;
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Threat Map", icon: MapIcon, segment: null },
  { href: "/dashboard/analytics", label: "Analytics Hub", icon: BarChart3, segment: "analytics" },
];

export function SidebarNav() {
  const pathname = usePathname();
  const currentSegment = pathname.split("/")[2] || null;

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.label}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={currentSegment === item.segment}
              tooltip={{ children: item.label, side: 'right', className: 'ml-2' }}
            >
              <a>
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
