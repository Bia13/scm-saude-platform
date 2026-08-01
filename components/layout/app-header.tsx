"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Bell,
  User,
  Settings,
  LogOut,
  CheckCheck,
  ArrowRight,
  CalendarDays,
  Target,
  RefreshCcw,
} from "lucide-react";

import { createClient } from "@/lib/supabase/client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const title = titles[pathname] ?? "Dashboard";
  const [notifications, setNotifications] = useState([
  {
    id: 1,
    type: "calendar",
    title: "Atualização de indicadores",
    description: "Os dados de hoje já foram processados.",
    time: "Há 5 minutos",
    unread: true,
  },
  {
    id: 2,
    type: "target",
    title: "Nova missão atribuída",
    description: "Uma nova missão foi criada para monitoramento.",
    time: "Há 1 hora",
    unread: false,
  },
  {
    id: 3,
    type: "sync",
    title: "Sincronização concluída",
    description: "Os municípios foram sincronizados.",
    time: "Ontem",
    unread: true,
  },
]);
const unreadNotifications = notifications.filter(
  (n) => n.unread
).length;
function markAllAsRead() {
  setNotifications((prev) =>
    prev.map((item) => ({
      ...item,
      unread: false,
    }))
  );
}
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative rounded-xl"
              >
                <Bell className="size-5" />

                {unreadNotifications > 0 ? (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full px-1.5"
                  >
                    {unreadNotifications > 9 ? "9+" : unreadNotifications}
                  </Badge>
                ) : null}
              </Button>
            </DropdownMenuTrigger>

           <DropdownMenuContent
  align="end"
  className="w-[380px] overflow-hidden rounded-2xl p-0"
>
  <div className="flex items-center justify-between border-b px-4 py-3">
    <div>
      <h3 className="font-semibold">
        Notificações
      </h3>

      <p className="text-xs text-muted-foreground">
        {unreadNotifications}{" "}
        {unreadNotifications === 1 ? "nova" : "novas"}
      </p>
    </div>

    <Button
      variant="ghost"
      size="sm"
      className="h-8"
      onClick={markAllAsRead}
    >
      <CheckCheck className="mr-2 h-4 w-4" />
      Marcar todas
    </Button>
  </div>

  <div className="max-h-[360px] overflow-y-auto">
    {notifications.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-10">
        <Bell className="mb-3 h-10 w-10 text-muted-foreground/40" />

        <p className="font-medium">
          Nenhuma notificação
        </p>

        <p className="text-sm text-muted-foreground">
          Você está em dia 🎉
        </p>
      </div>
    ) : (
      notifications.map((notification) => {
        const Icon =
          notification.type === "calendar"
            ? CalendarDays
            : notification.type === "target"
            ? Target
            : RefreshCcw;

        return (
          <button
            key={notification.id}
            className="
              flex
              w-full
              gap-3
              border-b
              p-4
              text-left
              transition-colors
              hover:bg-muted/40
              last:border-0
            "
          >
            <div className="rounded-xl bg-muted p-2 w-[32px] h-[32px] flex items-center justify-center">
              <Icon className="h-4 w-4" />
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {notification.title}
                </p>

                {notification.unread && (
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {notification.description}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {notification.time}
              </p>
            </div>
          </button>
        );
      })
    )}
  </div>

  <div className="border-t p-2">
    <Button
      variant="ghost"
      className="w-full justify-between"
    >
      Ver todas as notificações

      <ArrowRight className="h-4 w-4" />
    </Button>
  </div>
</DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu open={userMenuOpen} onOpenChange={setUserMenuOpen}>
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
                onSelect={(event) => {
                  event.preventDefault();
                  setUserMenuOpen(false);
                  requestAnimationFrame(() => {
                    setLogoutOpen(true);
                  });
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

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