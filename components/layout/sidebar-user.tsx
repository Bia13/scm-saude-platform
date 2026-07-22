"use client";

import {
  ChevronsUpDown,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarUser() {
  return (
    <SidebarFooter className="border-t">

      <SidebarMenu>

        <SidebarMenuItem>

          <DropdownMenu>

            <DropdownMenuTrigger asChild>

              <SidebarMenuButton
                size="lg"
                className="rounded-xl"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    AD
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    Administrador
                  </span>

                  <span className="truncate text-xs text-muted-foreground">
                    admin@scmsaude.com
                  </span>
                </div>

                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>

            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="end"
              className="w-64 rounded-xl"
            >

              <DropdownMenuItem>
                <User className="mr-2 size-4" />
                Meu Perfil
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Shield className="mr-2 size-4" />
                Minha Conta
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Settings className="mr-2 size-4" />
                Configurações
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-red-600 focus:text-red-600">
                <LogOut className="mr-2 size-4" />
                Sair
              </DropdownMenuItem>

            </DropdownMenuContent>

          </DropdownMenu>

        </SidebarMenuItem>

      </SidebarMenu>

    </SidebarFooter>
  );
}