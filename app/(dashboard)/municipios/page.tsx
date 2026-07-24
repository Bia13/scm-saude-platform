import {
  Building2,
  Users,
  Bell,
  ClipboardCheck,
  Plus,
  Search,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function MunicipiosPage() {
  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Municípios Clientes
          </h1>

          <p className="mt-1 text-muted-foreground">
            Gerencie todos os municípios cadastrados na SCM Saúde Platform.
          </p>
        </div>

        <Button className="rounded-xl h-11 px-5">
          <Plus className="mr-2 h-4 w-4" />
          Novo Município
        </Button>

      </div>

      {/* Cards */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <Card className="rounded-2xl p-6">
          <Building2 className="mb-6 h-5 w-5 text-muted-foreground" />

          <p className="text-3xl font-bold">27</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Municípios
          </p>
        </Card>

        <Card className="rounded-2xl p-6">
          <Users className="mb-6 h-5 w-5 text-muted-foreground" />

          <p className="text-3xl font-bold">483</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Usuários
          </p>
        </Card>

        <Card className="rounded-2xl p-6">
          <Bell className="mb-6 h-5 w-5 text-muted-foreground" />

          <p className="text-3xl font-bold">19</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Alertas
          </p>
        </Card>

        <Card className="rounded-2xl p-6">
          <ClipboardCheck className="mb-6 h-5 w-5 text-muted-foreground" />

          <p className="text-3xl font-bold">54</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Missões
          </p>
        </Card>

      </div>

      {/* Filtros */}

      <Card className="rounded-2xl p-5">

        <div className="flex flex-col gap-4 lg:flex-row">

          <div className="relative flex-1">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Buscar município..."
              className="pl-10 rounded-xl h-11"
            />

          </div>

          <Button
            variant="outline"
            className="justify-between rounded-xl h-11 w-full lg:w-44"
          >
            Estado

            <ChevronDown className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="justify-between rounded-xl h-11 w-full lg:w-44"
          >
            Status

            <ChevronDown className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            className="justify-between rounded-xl h-11 w-full lg:w-44"
          >
            Plano

            <ChevronDown className="h-4 w-4" />
          </Button>

        </div>

      </Card>

      {/* Placeholder da tabela */}

      <Card className="rounded-2xl border-dashed">

        <div className="flex h-[420px] flex-col items-center justify-center">

          <Building2 className="mb-5 h-12 w-12 text-muted-foreground/40" />

          <h3 className="text-lg font-semibold">
            Lista de Municípios
          </h3>

          <p className="mt-2 max-w-sm text-center text-sm text-muted-foreground">
            A tabela de municípios será exibida aqui. Na próxima etapa iremos
            adicionar busca, filtros, paginação e integração com os dados.
          </p>

        </div>

      </Card>

    </div>
  );
}