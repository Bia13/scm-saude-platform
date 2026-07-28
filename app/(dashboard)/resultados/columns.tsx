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
      const status = row.original.status

      const variant =
        status === "Excelente"
          ? "default"
          : status === "Atenção"
          ? "secondary"
          : "destructive"

      return (
        <Badge variant={variant}>
          {status}
        </Badge>
      )
    },
  },
]