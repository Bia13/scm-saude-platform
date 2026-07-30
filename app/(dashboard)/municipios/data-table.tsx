"use client"

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
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState } from "react"


interface DataTableProps<TData, TValue> {

  columns: ColumnDef<TData, TValue>[]

  data: TData[]

}


export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {


  const [filtering, setFiltering] = useState("")


  const [sorting, setSorting] =
    useState<SortingState>([])


  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([])


  const [ufFilter, setUfFilter] =
    useState("todos")


  const [statusFilter, setStatusFilter] =
    useState("todos")



  const ufs = Array.from(
    new Set(
      data.map((municipio: any) => municipio.uf)
    )
  )



  const status = Array.from(
    new Set(
      data.map((municipio: any) => municipio.status)
    )
  )



  const table = useReactTable({

    data,

    columns,


    state: {

      globalFilter: filtering,

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

  })



  return (

    <div className="space-y-4">


      {/* Toolbar */}

      <div className="flex flex-col gap-4 md:flex-row">


        {/* Busca */}

        <Input

          placeholder="Buscar município..."

          value={filtering}

          onChange={(event) =>
            setFiltering(event.target.value)
          }

          className="max-w-sm"

        />



        {/* UF */}

        <Select

          value={ufFilter}

          onValueChange={(value) => {


            setUfFilter(value)


            setColumnFilters((prev) => {


              const filters = prev.filter(
                (filter) =>
                  filter.id !== "uf"
              )


              if (value === "todos") {

                return filters

              }


              return [

                ...filters,

                {
                  id: "uf",
                  value,
                },

              ]

            })

          }}

        >


          <SelectTrigger className="w-[180px]">

            <SelectValue placeholder="UF" />

          </SelectTrigger>


          <SelectContent>


            <SelectItem value="todos">

              Todas UFs

            </SelectItem>



            {
              ufs.map((uf) => (

                <SelectItem
                  key={uf}
                  value={uf}
                >

                  {uf}

                </SelectItem>

              ))
            }


          </SelectContent>


        </Select>



        {/* Status */}

        <Select

          value={statusFilter}

          onValueChange={(value) => {


            setStatusFilter(value)


            setColumnFilters((prev) => {


              const filters = prev.filter(
                (filter) =>
                  filter.id !== "status"
              )


              if (value === "todos") {

                return filters

              }


              return [

                ...filters,

                {
                  id: "status",
                  value,
                },

              ]

            })


          }}

        >


          <SelectTrigger className="w-[180px]">

            <SelectValue placeholder="Status" />

          </SelectTrigger>



          <SelectContent>


            <SelectItem value="todos">

              Todos Status

            </SelectItem>



            {
              status.map((item) => (

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





      {/* Table */}


      <div className="rounded-2xl border">


        <Table>


          <TableHeader>


            {
              table.getHeaderGroups()
              .map((headerGroup) => (

                <TableRow
                  key={headerGroup.id}
                >


                  {
                    headerGroup.headers.map(
                      (header) => (

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

                      )
                    )
                  }


                </TableRow>


              ))
            }


          </TableHeader>




          <TableBody>


            {
              table.getRowModel().rows.length ? (


                table.getRowModel().rows.map(
                  (row) => (

                    <TableRow
                      key={row.id}
                    >


                      {
                        row.getVisibleCells()
                        .map((cell) => (

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

                  )
                )


              ) : (


                <TableRow>


                  <TableCell

                    colSpan={columns.length}

                    className="h-24 text-center"

                  >

                    Nenhum município encontrado.

                  </TableCell>


                </TableRow>


              )
            }


          </TableBody>


        </Table>




        {/* Paginação */}


        <div className="flex items-center justify-end gap-4 py-4 px-4">


          <div className="text-sm text-muted-foreground">

            Página{" "}

            {table.getState().pagination.pageIndex + 1}

            {" "}de{" "}

            {table.getPageCount()}


          </div>



          <Button

            variant="outline"

            size="sm"

            onClick={() =>
              table.previousPage()
            }

            disabled={
              !table.getCanPreviousPage()
            }

          >

            Anterior

          </Button>




          <Button

            variant="outline"

            size="sm"

            onClick={() =>
              table.nextPage()
            }

            disabled={
              !table.getCanNextPage()
            }

          >

            Próximo

          </Button>


        </div>


      </div>


    </div>

  )

}