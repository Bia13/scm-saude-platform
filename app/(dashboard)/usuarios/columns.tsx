"use client"


import { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"


import { MoreHorizontal, ArrowUpDown, EyeIcon, PencilIcon, TrashIcon  } from "lucide-react"



export type Usuario = {

  id: string

  nome: string | null

  cargo: string | null

  status: string | null

  created_at: string


}



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
    cell: ({ row }) => (

      <Badge

        variant={
          row.original.status === "Ativo"
            ? "default"
            : "secondary"
        }
      >
        {row.original.status}
      </Badge>
    ),

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
            <MoreHorizontal
              className="h-4 w-4"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EyeIcon/>
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PencilIcon/>
            Editar
          </DropdownMenuItem>
                  <DropdownMenuSeparator />

          <DropdownMenuItem   className="text-red-600 focus:text-red-600"
>
            <TrashIcon/>
            Desativar usuário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    )

  }


]