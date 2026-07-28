"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Eye, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Alerta } from "./types";

export const columns: ColumnDef<Alerta>[] = [
  {
    accessorKey: "titulo",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Alerta
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "municipio",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Município
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    accessorKey: "categoria",

    header: "Categoria",
  },

  {
    accessorKey: "prioridade",

    header: "Prioridade",

    cell: ({ row }) => {
      const prioridade = row.original.prioridade;

      const classes = {
        Crítica:
          "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",

        Alta:
          "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",

        Média:
          "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",

        Baixa:
          "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
      };

      return (
        <Badge className={classes[prioridade]}>
          {prioridade}
        </Badge>
      );
    },
  },

  {
    accessorKey: "status",

    header: "Status",

    cell: ({ row }) => {
      const status = row.original.status;

      const classes = {
        Pendente:
          "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",

        "Em andamento":
          "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",

        Resolvido:
          "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
      };

      return (
        <Badge className={classes[status]}>
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "data",

    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Data
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },

  {
    id: "actions",

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
            <Eye className="mr-2 h-4 w-4" />
            Ver detalhes
          </DropdownMenuItem>

          <DropdownMenuItem>
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Marcar como resolvido
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];