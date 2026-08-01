"use client"

import { useMemo, useState } from "react"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([])

  const municipios = useMemo(
    () =>
      Array.from(
        new Set(
          (data as any[])
            .map((item) => item.municipio)
            .filter(Boolean)
        )
      ).sort(),
    [data]
  )

  const areas = useMemo(
    () =>
      Array.from(
        new Set(
          (data as any[])
            .map((item) => item.area)
            .filter(Boolean)
        )
      ).sort(),
    [data]
  )

  const status = useMemo(
    () =>
      Array.from(
        new Set(
          (data as any[])
            .map((item) => item.status)
            .filter(Boolean)
        )
      ).sort(),
    [data]
  )

  const table = useReactTable({
    data,
    columns,

    state: {
      sorting,
      globalFilter,
      columnFilters,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="space-y-4">
      {/* Toolbar */}

      <div className="flex flex-col gap-4 lg:flex-row">
        <Input
          placeholder="Buscar indicador..."
          value={globalFilter}
          onChange={(event) =>
            setGlobalFilter(event.target.value)
          }
          className="lg:max-w-sm"
        />

        {/* Município */}

        <Select
          value={
            (table
              .getColumn("municipio")
              ?.getFilterValue() as string) ?? "todos"
          }
          onValueChange={(value) =>
            table
              .getColumn("municipio")
              ?.setFilterValue(
                value === "todos" ? undefined : value
              )
          }
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Município" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="todos">
              Todos municípios
            </SelectItem>

            {municipios.map((municipio) => (
              <SelectItem
                key={municipio}
                value={municipio}
              >
                {municipio}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Área */}

        <Select
          value={
            (table
              .getColumn("area")
              ?.getFilterValue() as string) ?? "todos"
          }
          onValueChange={(value) =>
            table
              .getColumn("area")
              ?.setFilterValue(
                value === "todos" ? undefined : value
              )
          }
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Área" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="todos">
              Todas áreas
            </SelectItem>

            {areas.map((area) => (
              <SelectItem
                key={area}
                value={area}
              >
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}

        <Select
          value={
            (table
              .getColumn("status")
              ?.getFilterValue() as string) ?? "todos"
          }
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(
                value === "todos" ? undefined : value
              )
          }
        >
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="todos">
              Todos status
            </SelectItem>

            {status.map((item) => (
              <SelectItem
                key={item}
                value={item}
              >
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Tabela */}

      <div className="rounded-2xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Paginação */}
 
         <div className="flex flex-col gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
 
           <div className="text-sm text-muted-foreground">
             Exibindo{" "}
             {
               table.getFilteredRowModel().rows
                 .length
             }{" "}
             resultado(s)
           </div>
 
           <div className="flex items-center gap-4 self-end">
 
             <span className="text-sm text-muted-foreground">
               Página{" "}
               {table.getState().pagination
                 .pageIndex + 1}{" "}
               de {table.getPageCount()}
             </span>
 
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
               Próxima
             </Button>
 
           </div>
         </div>
      </div>
    </div>
  )
}