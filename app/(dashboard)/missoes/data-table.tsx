"use client";
import { updateMissaoStatus } from "@/lib/supabase/missoes";
import { useRouter } from "next/navigation";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  SortingState,
  ColumnFiltersState,
  useReactTable,
} from "@tanstack/react-table";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


import {
  useEffect,
  useState,
} from "react";

import { cn } from "@/lib/utils";


import {
  Missao,
  MissaoStatus,
} from "@/lib/supabase/missoes";




interface DataTableProps {


  columns: (

    toggleMissao:(id:string)=>void,

    updateStatusMissao:(
      id:string,
      status:MissaoStatus
    )=>void

  ) => ColumnDef<Missao>[];



  data: Missao[];

}







export function DataTable({

  columns,

  data,

}:DataTableProps){


  const router = useRouter();

  const [
    tableData,
    setTableData
  ] = useState<Missao[]>(data);





  useEffect(()=>{

    setTableData(data);

  },[data]);





  const [
    filtering,
    setFiltering
  ] = useState("");





  const [
    sorting,
    setSorting
  ] = useState<SortingState>([]);





  const [
    columnFilters,
    setColumnFilters
  ] = useState<ColumnFiltersState>([]);





  const [
    categoriaFilter,
    setCategoriaFilter
  ] = useState("todos");





  const [
    prioridadeFilter,
    setPrioridadeFilter
  ] = useState("todos");





  const [
    statusFilter,
    setStatusFilter
  ] = useState("todos");









  /*
    Alternar concluída
  */
async function toggleMissao(id: string) {
  const missao = tableData.find((m) => m.id === id);

  if (!missao) return;

  const novoStatus =
    missao.status === "Concluída"
      ? "Pendente"
      : "Concluída";

  await updateStatusMissao(id, novoStatus);
}

async function updateStatusMissao(
  id: string,
  status: MissaoStatus
) {
  try {
    await updateMissaoStatus(id, status);

    setTableData((prev) =>
      prev.map((missao) =>
        missao.id === id
          ? {
              ...missao,
              status,
              concluida: status === "Concluída",
            }
          : missao
      )
    );

    router.refresh();
  } catch (error) {
    console.error(error);
  }
}









  /*
    Opções filtros
  */


  const categorias = Array.from(

    new Set(

      tableData.map(

        (missao)=>
          missao.categoria

      )

    )

  );




  const prioridades = Array.from(

    new Set(

      tableData.map(

        (missao)=>
          missao.prioridade

      )

    )

  );




  const statusOptions = Array.from(

    new Set(

      tableData.map(

        (missao)=>
          missao.status

      )

    )

  );









  const table = useReactTable({



    data:tableData,



    columns:

      columns(

        toggleMissao,

        updateStatusMissao

      ),



    state:{


      globalFilter:
        filtering,


      sorting,


      columnFilters,


    },



    onGlobalFilterChange:

      setFiltering,



    onSortingChange:

      setSorting,



    onColumnFiltersChange:

      setColumnFilters,



    getCoreRowModel:

      getCoreRowModel(),



    getFilteredRowModel:

      getFilteredRowModel(),



    getSortedRowModel:

      getSortedRowModel(),



    getPaginationRowModel:

      getPaginationRowModel(),


  });










  function updateFilter(

    id:string,

    value:string

  ){


    setColumnFilters((prev)=>{


      const filters =

        prev.filter(

          (filter)=>

            filter.id !== id

        );




      if(value === "todos")

        return filters;





      return [

        ...filters,


        {

          id,

          value

        }

      ];


    });


  }









return (

<div className="space-y-4">







{/* FILTROS */}



<div

className="
flex
flex-col
gap-4
md:flex-row
"

>



<Input

placeholder="Buscar missão..."

value={filtering}

onChange={(e)=>

setFiltering(
e.target.value
)

}

className="max-w-sm"

/>








<Select

value={categoriaFilter}

onValueChange={(value)=>{


setCategoriaFilter(value);


updateFilter(
"categoria",
value
);


}}

>



<SelectTrigger className="w-[180px]">

<SelectValue placeholder="Categoria"/>

</SelectTrigger>



<SelectContent>


<SelectItem value="todos">

Todas categorias

</SelectItem>



{

categorias.map((item)=>(

<SelectItem

key={item}

value={item}

>

{item}

</SelectItem>

))

}


</SelectContent>


</Select>









<Select

value={prioridadeFilter}

onValueChange={(value)=>{


setPrioridadeFilter(value);


updateFilter(
"prioridade",
value
);


}}

>



<SelectTrigger className="w-[180px]">

<SelectValue placeholder="Prioridade"/>

</SelectTrigger>



<SelectContent>


<SelectItem value="todos">

Todas prioridades

</SelectItem>



{

prioridades.map((item)=>(

<SelectItem

key={item}

value={item}

>

{item}

</SelectItem>

))

}


</SelectContent>


</Select>









<Select

value={statusFilter}

onValueChange={(value)=>{


setStatusFilter(value);


updateFilter(
"status",
value
);


}}

>



<SelectTrigger className="w-[180px]">

<SelectValue placeholder="Status"/>

</SelectTrigger>



<SelectContent>


<SelectItem value="todos">

Todos status

</SelectItem>



{

statusOptions.map((item)=>(

<SelectItem

key={item}

value={item}

>

{item}

</SelectItem>

))

}


</SelectContent>


</Select>






</div>









{/* TABELA */}



<div className="rounded-2xl border">



<Table>



<TableHeader>


{

table.getHeaderGroups()
.map((headerGroup)=>(


<TableRow

key={headerGroup.id}

>


{

headerGroup.headers.map((header)=>(


<TableHead

key={header.id}

>


{
flexRender(

header.column.columnDef.header,

header.getContext()

)
}


</TableHead>


))

}


</TableRow>


))


}


</TableHeader>







<TableBody>


{


table.getRowModel().rows.length ?


table.getRowModel().rows.map((row)=>(


<TableRow


key={row.id}


className={cn(

"transition-all duration-300",

row.original.concluida &&

"bg-muted/40 opacity-70"

)}



>


{

row.getVisibleCells()
.map((cell)=>(


<TableCell

key={cell.id}

>


{

flexRender(

cell.column.columnDef.cell,

cell.getContext()

)

}


</TableCell>


))

}


</TableRow>


))


:

(


<TableRow>


<TableCell

colSpan={

table.getAllColumns().length

}

className="h-24 text-center"

>


Nenhuma missão encontrada.


</TableCell>


</TableRow>


)


}



</TableBody>


</Table>



</div>









{/* PAGINAÇÃO */}



<div

className="
flex
items-center
justify-end
gap-4
py-4
"

>


<div className="text-sm text-muted-foreground">

Página{" "}

{table.getState().pagination.pageIndex + 1}

{" "}de{" "}

{table.getPageCount()}


</div>





<Button

variant="outline"

size="sm"

onClick={()=>table.previousPage()}

disabled={!table.getCanPreviousPage()}

>

Anterior

</Button>





<Button

variant="outline"

size="sm"

onClick={()=>table.nextPage()}

disabled={!table.getCanNextPage()}

>

Próximo

</Button>



</div>






</div>


);


}