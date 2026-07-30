"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { ResultadoIndicador } from "./indicadores"


export const columns: ColumnDef<ResultadoIndicador>[] = [
  {
    accessorKey: "indicador",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Indicador
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "municipio",
    header: "Município",
  },
  {
    accessorKey: "area",
    header: "Área",
  },
  {
    accessorKey: "meta",
    header: "Meta",
    cell: ({ row }) => `${row.original.meta}%`,
  },
  {
    accessorKey: "resultado",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Resultado
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => `${row.original.resultado}%`,
  },
{
  accessorKey: "status",

  header: "Status",

  cell: ({ row }) => {
    const status = row.original.status;

    const styles = {
      Excelente:
        "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",

      Atenção:
        "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",

      Crítico:
        "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",
    };

    return (
      <Badge
        variant="outline"
        className={`
          rounded-full
          px-3
          py-1
          gap-2
          font-medium
          ${styles[status as keyof typeof styles]}
        `}
      >
        {status}
      </Badge>
    );
  },
},
]