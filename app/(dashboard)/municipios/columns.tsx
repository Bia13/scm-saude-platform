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

  cell: ({ row }) => {
    const status = row.original.status;

    const styles = {
      Ativo:
        "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300",

      Inativo:
        "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",

      Implantação:
        "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300",
    };

    const dot = {
      Ativo: "bg-green-500",

      Inativo: "bg-red-500",

      Implantação: "bg-yellow-500",
    };

    return (
      <Badge
        variant="outline"
        className={`
          gap-2
          rounded-full
          px-3
          py-1
          font-medium
          ${styles[status as keyof typeof styles] ?? ""}
        `}
      >
        {status}
      </Badge>
    );
  },
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