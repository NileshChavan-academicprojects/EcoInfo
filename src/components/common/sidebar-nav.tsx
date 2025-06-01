
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import type { LucideIcon } from "lucide-react";
import { BarChart3, Map } from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  // segment prop is no longer needed with the simplified isActive logic
}

const navItems: NavItem[] = [
  { href: "/dashboard", label: "Threat Map", icon: Map },
  { href: "/dashboard/analytics", label: "Analytics Hub", icon: BarChart3 },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} legacyBehavior passHref>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href}
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
