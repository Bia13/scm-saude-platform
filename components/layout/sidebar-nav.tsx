"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Building2,
  Users,
  BarChart3,
  LineChart,
  TriangleAlert,
  ClipboardCheck,
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
        title: "Centro de Decisão",
        url: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Gestão",
    items: [
      {
        title: "Municípios Clientes",
        url: "/municipios",
        icon: Building2,
      },
      {
        title: "Usuários",
        url: "/usuarios",
        icon: Users,
      },
    ],
  },
  {
    title: "Indicadores",
    items: [
      {
        title: "Indicadores Globais",
        url: "/indicadores",
        icon: BarChart3,
      },
      {
        title: "Resultados dos Indicadores",
        url: "/resultados",
        icon: LineChart,
      },
    ],
  },
  {
    title: "Operação",
    items: [
      {
        title: "Alertas",
        url: "/alertas",
        icon: TriangleAlert,
      },
      {
        title: "Missões",
        url: "/missoes",
        icon: ClipboardCheck,
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