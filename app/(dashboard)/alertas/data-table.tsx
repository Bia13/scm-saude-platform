"use client";

import { useState } from "react";

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
} from "@tanstack/react-table";

import { Search } from "lucide-react";

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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [filtering, setFiltering] = useState("");

  const [sorting, setSorting] =
    useState<SortingState>([]);

  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>([]);

  const [categoriaFilter, setCategoriaFilter] =
    useState("todos");

  const [prioridadeFilter, setPrioridadeFilter] =
    useState("todos");

  const [statusFilter, setStatusFilter] =
    useState("todos");

  const categorias = Array.from(
    new Set(
      data.map((alerta: any) => alerta.categoria)
    )
  );

  const prioridades = Array.from(
    new Set(
      data.map((alerta: any) => alerta.prioridade)
    )
  );

  const status = Array.from(
    new Set(
      data.map((alerta: any) => alerta.status)
    )
  );

  const table = useReactTable({
    data,
    columns,

    state: {
      globalFilter: filtering,
      sorting,
      columnFilters,
    },

    onGlobalFilterChange: setFiltering,

    onSortingChange: setSorting,

    onColumnFiltersChange: setColumnFilters,

    getCoreRowModel: getCoreRowModel(),

    getFilteredRowModel: getFilteredRowModel(),

    getSortedRowModel: getSortedRowModel(),

    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="space-y-4">

      {/* Toolbar */}

      <div className="flex flex-col gap-4 xl:flex-row">

        <div className="relative w-full xl:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Buscar alerta..."
            value={filtering}
            onChange={(event) =>
              setFiltering(event.target.value)
            }
            className="pl-9"
          />
        </div>

        {/* Categoria */}

        <Select
          value={categoriaFilter}
          onValueChange={(value) => {
            setCategoriaFilter(value);

            setColumnFilters((prev) => {
              const filters = prev.filter(
                (filter) =>
                  filter.id !== "categoria"
              );

              if (value === "todos") {
                return filters;
              }

              return [
                ...filters,
                {
                  id: "categoria",
                  value,
                },
              ];
            });
          }}
        >
          <SelectTrigger className="w-full xl:w-[180px]">
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="todos">
              Todas Categorias
            </SelectItem>

            {categorias.map((categoria) => (
              <SelectItem
                key={categoria}
                value={categoria}
              >
                {categoria}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Prioridade */}

        <Select
          value={prioridadeFilter}
          onValueChange={(value) => {
            setPrioridadeFilter(value);

            setColumnFilters((prev) => {
              const filters = prev.filter(
                (filter) =>
                  filter.id !== "prioridade"
              );

              if (value === "todos") {
                return filters;
              }

              return [
                ...filters,
                {
                  id: "prioridade",
                  value,
                },
              ];
            });
          }}
        >
          <SelectTrigger className="w-full xl:w-[180px]">
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="todos">
              Todas Prioridades
            </SelectItem>

            {prioridades.map((prioridade) => (
              <SelectItem
                key={prioridade}
                value={prioridade}
              >
                {prioridade}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status */}

        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value);

            setColumnFilters((prev) => {
              const filters = prev.filter(
                (filter) =>
                  filter.id !== "status"
              );

              if (value === "todos") {
                return filters;
              }

              return [
                ...filters,
                {
                  id: "status",
                  value,
                },
              ];
            });
          }}
        >
          <SelectTrigger className="w-full xl:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="todos">
              Todos Status
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

      <div className="rounded-2xl border overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table
                .getHeaderGroups()
                .map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                  >
                    {headerGroup.headers.map(
                      (header) => (
                        <TableHead
                          key={header.id}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column
                                  .columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                ))}
            </TableHeader>

            <TableBody>
              {table.getRowModel().rows
                .length ? (
                table
                  .getRowModel()
                  .rows.map((row) => (
                    <TableRow
                      key={row.id}
                    >
                      {row
                        .getVisibleCells()
                        .map((cell) => (
                          <TableCell
                            key={cell.id}
                          >
                            {flexRender(
                              cell.column
                                .columnDef.cell,
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
                    Nenhum alerta encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginação */}

        <div className="flex flex-col gap-4 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="text-sm text-muted-foreground">
            Exibindo{" "}
            {
              table.getFilteredRowModel().rows
                .length
            }{" "}
            alerta(s)
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
  );
}