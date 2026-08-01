"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ChevronsUpDown,
  LogOut,
  Settings,
  Shield,
  User,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

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

type UserProfile = {
  nome: string | null;
  email: string;
};

export function SidebarUser() {
  const router = useRouter();

  const supabase = useMemo(() => createClient(), []);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("nome")
        .eq("id", user.id)
        .single();

      setProfile({
        nome: data?.nome ?? null,
        email: user.email ?? "",
      });
    }

    loadUser();
  }, [supabase]);

  async function handleLogout() {
  setLogoutOpen(false);

  await new Promise((resolve) => setTimeout(resolve, 100));

  await supabase.auth.signOut();

  router.replace("/login");
}

  return (
    <>
      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="rounded-xl"
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

                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {profile?.nome ?? "Administrador"}
                    </span>

                    <span className="truncate text-xs text-muted-foreground">
                      {profile?.email ?? ""}
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

                <DropdownMenuItem
                  className="text-red-600 focus:text-red-600"
                  onSelect={(event) => {
                    event.preventDefault();
                    setUserMenuOpen(false);
                    requestAnimationFrame(() => {
                      setLogoutOpen(true);
                    });
                  }}
                >
                  <LogOut className="mr-2 size-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja sair da plataforma?</AlertDialogTitle>
            <AlertDialogDescription>
              Você será desconectado e precisará entrar novamente para continuar.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Sair</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}