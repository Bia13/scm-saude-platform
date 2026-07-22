"use client";

import { usePathname } from "next/navigation";

import {
  Bell,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import {
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/patients": "Pacientes",
  "/schedule": "Agenda",
  "/finance": "Financeiro",
  "/reports": "Relatórios",
  "/settings": "Configurações",
};

export function AppHeader() {
  const pathname = usePathname();

  const title = titles[pathname] ?? "Dashboard";

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-16
        items-center
        justify-between
        border-b
        bg-background
        px-4
        md:px-6
      "
    >
      {/* Esquerda */}
      <div className="flex items-center gap-3">

        {/* Mobile */}
<div className="md:hidden">
  <SidebarTrigger
    variant="ghost"
    size="icon"
    className="rounded-xl"
  />
</div>

        <div>
          <h1 className="text-xl font-semibold tracking-tight">
            {title}
          </h1>
        </div>

      </div>

      {/* Direita */}
      <div className="flex items-center gap-2">

        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
        >
          <Bell className="size-5" />
        </Button>

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button
              variant="ghost"
              className="h-10 w-10 rounded-full p-0"
            >
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>

          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-64"
          >

            <DropdownMenuLabel>

              <div className="flex flex-col">

                <span className="font-medium">
                  Administrador
                </span>

                <span className="text-xs text-muted-foreground">
                  admin@scmsaude.com
                </span>

              </div>

            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>

              <DropdownMenuItem>

                <User className="mr-2 size-4" />

                Meu Perfil

              </DropdownMenuItem>

              <DropdownMenuItem>

                <Settings className="mr-2 size-4" />

                Configurações

              </DropdownMenuItem>

            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="text-red-600">

              <LogOut className="mr-2 size-4" />

              Sair

            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>
    </header>
  );
}