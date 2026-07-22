"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  CalendarDays,
  DollarSign,
  FileText,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

type SidebarNavProps = {
  search: string;
};

const groups = [
  {
    title: "Principal",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        title: "Pacientes",
        url: "/patients",
        icon: Users,
      },
      {
        title: "Agenda",
        url: "/schedule",
        icon: CalendarDays,
      },
    ],
  },
  {
    title: "Gestão",
    items: [
      {
        title: "Financeiro",
        url: "/finance",
        icon: DollarSign,
      },
      {
        title: "Relatórios",
        url: "/reports",
        icon: FileText,
      },
    ],
  },
  {
    title: "Sistema",
    items: [
      {
        title: "Configurações",
        url: "/settings",
        icon: Settings,
      },
    ],
  },
];

export function SidebarNav({
  search,
}: SidebarNavProps) {
  const pathname = usePathname();

  const normalizedSearch = search.trim().toLowerCase();

  const filteredGroups = groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.title.toLowerCase().includes(normalizedSearch)
      ),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <SidebarContent>
      {filteredGroups.map((group) => (
        <SidebarGroup key={group.title}>
          <SidebarGroupLabel
            className="
              uppercase
              tracking-wider
              text-[11px]
              font-semibold
              group-data-[collapsible=icon]:hidden
            "
          >
            {group.title}
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname === item.url}
                    className="
                      h-11
                      rounded-xl
                      transition-colors
                      hover:bg-muted
                      data-[active=true]:bg-muted
                      data-[active=true]:text-foreground
                    "
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5 shrink-0" />

                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}

      {filteredGroups.length === 0 && (
        <div className="px-4 py-8 text-center text-sm text-muted-foreground">
          Nenhum resultado encontrado.
        </div>
      )}
    </SidebarContent>
  );
}