"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  ArrowUpDown,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from "lucide-react";

export type Usuario = {
  id: string;
  nome: string | null;
  cargo: string | null;
  status: string | null;
  created_at: string;
};

export const columns: ColumnDef<Usuario>[] = [
  {
    accessorKey: "nome",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Usuário
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "cargo",

    header: "Cargo",
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;

      const styles = {
        Ativo:
          "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",

        Inativo:
          "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
      };

      return (
        <Badge
          variant="outline"
          className={`
            rounded-full
            px-3
            py-1
            font-medium
            gap-2
            ${styles[status as keyof typeof styles] ?? ""}
          `}
        >
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "created_at",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Criado em
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),

    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleDateString("pt-BR"),
  },

  {
    id: "actions",

    header: "Ações",

    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EyeIcon className="mr-2 h-4 w-4" />
            Visualizar
          </DropdownMenuItem>

          <DropdownMenuItem>
            <PencilIcon className="mr-2 h-4 w-4" />
            Editar
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="text-red-600 focus:text-red-600">
            <TrashIcon className="mr-2 h-4 w-4" />
            Desativar usuário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];