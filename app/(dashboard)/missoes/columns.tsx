"use client";

import {
  ColumnDef,
} from "@tanstack/react-table";

import {
  Checkbox,
} from "@/components/ui/checkbox";

import {
  Badge,
} from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Missao
} from "@/lib/supabase/missoes";


export const columns = (

  toggleMissao:(id:string)=>void,

  updateStatusMissao:
    (
      id:string,
      status:Missao["status"]
    )=>void


): ColumnDef<Missao>[] => [



{
  accessorKey:"concluida",

  header:"Concluído",


  cell:({row})=>{


    const missao=row.original;


    return (

      <Checkbox

        checked={
          missao.concluida
        }


        onCheckedChange={()=>
          toggleMissao(
            missao.id
          )
        }

      />

    );


  }

},




{
  accessorKey:"titulo",

  header:"Missão",


  cell:({row})=>{


    const missao=row.original;


    return (

      <div>


        <p
        className={`
          font-medium
          transition-all
          duration-300

          ${
            missao.concluida
            ?
            "line-through text-muted-foreground opacity-60"
            :
            ""
          }

        `}
        >

          {missao.titulo}


        </p>



        <p
        className="
          text-xs
          text-muted-foreground
        "
        >

          {missao.descricao}

        </p>



      </div>

    );


  }

},





{
  accessorKey:"categoria",

  header:"Categoria",


  cell:({row})=>(


    <Badge variant="outline">

      {row.original.categoria}

    </Badge>


  )

},





{
  accessorKey:"prioridade",

  header:"Prioridade",


  cell:({row})=>{


    const prioridade =
      row.original.prioridade;



    const classes = {


      "Crítica":
      "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300",


      "Alta":
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300",


      "Média":
      "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300",


      "Baixa":
      "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300",


    };



    return (

      <Badge

        className={
          classes[prioridade]
        }

      >

        {prioridade}

      </Badge>

    );


  }

},





{
  accessorKey:"status",

  header:"Status",


  cell:({row})=>{


    const missao=row.original;


    const statusStyles={


      "Concluída":
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",


      "Em andamento":
      "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",


      "Pendente":
      "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",


    };



    return (


      <DropdownMenu>


        <DropdownMenuTrigger asChild>


          <button>


            <Badge

              className="
                cursor-pointer
                gap-1
              "

            >

              {missao.status}

              <span>
                ▾
              </span>


            </Badge>


          </button>


        </DropdownMenuTrigger>



        <DropdownMenuContent>


          {
            [
              "Pendente",
              "Em andamento",
              "Concluída"

            ].map((status)=>(


              <DropdownMenuItem

                key={status}


                onClick={()=>


                  updateStatusMissao(

                    missao.id,

                    status as Missao["status"]

                  )

                }

              >

                {status}


              </DropdownMenuItem>


            ))
          }


        </DropdownMenuContent>


      </DropdownMenu>


    );


  }


},




];