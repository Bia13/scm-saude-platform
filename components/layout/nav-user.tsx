"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

export function AppUser() {
  return (
    <DropdownMenu>

      <DropdownMenuTrigger>

        <Avatar>

          <AvatarFallback>
            G
          </AvatarFallback>

        </Avatar>

      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">

        <DropdownMenuItem>
          Gabriel
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Meu Perfil
        </DropdownMenuItem>

        <DropdownMenuItem>
          Configurações
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          Sair
        </DropdownMenuItem>

      </DropdownMenuContent>

    </DropdownMenu>
  );
}