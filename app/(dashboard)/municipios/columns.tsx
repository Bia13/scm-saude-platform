"use client"


import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";


import { MoreHorizontal, ArrowUpDown, EyeIcon, PencilIcon, TrashIcon } from "lucide-react";



export type Municipio = {

  id: string;
  nome: string;
  uf: string;
  codigo_ibge: string;
  populacao: number;
  status: string;

};



export const columns: ColumnDef<Municipio>[] = [

  {
  accessorKey: "nome",

  header: ({ column }) => {

    return (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(
            column.getIsSorted() === "asc"
          )
        }
      >
        Município

        <ArrowUpDown className="ml-2 h-4 w-4" />

      </Button>
    )

  },
},


  {
    accessorKey: "uf",
    header: "UF",
  },


  {
    accessorKey: "codigo_ibge",
    header: "Código IBGE",
  },


{
  accessorKey: "populacao",

  header: ({ column }) => (

    <Button
      variant="ghost"
      onClick={() =>
        column.toggleSorting(
          column.getIsSorted() === "asc"
        )
      }
    >
      População

      <ArrowUpDown className="ml-2 h-4 w-4" />

    </Button>

  ),


  cell: ({ row }) => {

    return row.original.populacao
      .toLocaleString("pt-BR")

  },

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

    id: "actions",
    header: "Ações",

    cell: ({ row }) => (

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4"/>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <EyeIcon />
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem>
          <PencilIcon />
            Editar
          </DropdownMenuItem>
                  <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600 focus:text-red-600">
          <TrashIcon />
            Excluir
          </DropdownMenuItem>


        </DropdownMenuContent>


      </DropdownMenu>

    ),

  },

];