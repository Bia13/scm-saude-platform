"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Bell,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { SidebarTrigger } from "@/components/ui/sidebar";
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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/municipios": "Municípios",
  "/usuarios": "Usuários",
  "/indicadores": "Indicadores Globais",
  "/resultados-indicadores": "Resultados dos Indicadores",
};

type UserProfile = {
  nome: string | null;
  email: string;
};

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const title = titles[pathname] ?? "Dashboard";

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("nome")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
      }

      setProfile({
        nome: data?.nome ?? null,
        email: user.email ?? "",
      });
    }

    loadUser();
  }, [supabase]);

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    router.replace("/login");
    router.refresh();
  }

  return (
    <>
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
          <div className="md:hidden">
            <SidebarTrigger
              variant="ghost"
              size="icon"
              className="rounded-xl"
            />
          </div>

          <h1 className="text-xl font-semibold tracking-tight">
            {title}
          </h1>
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
                    {profile?.nome
                      ?.split(" ")
                      .map((nome) => nome[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase() ?? "AD"}
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
                    {profile?.nome ?? "Administrador"}
                  </span>

                  <span className="text-xs text-muted-foreground">
                    {profile?.email ?? ""}
                  </span>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Meu Perfil
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Configurações
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
  onSelect={(e) => {
    e.preventDefault()

    setTimeout(() => {
      setLogoutOpen(true)
    }, 0)
  }}
>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

    </>
  );
}