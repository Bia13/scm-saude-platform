import {
  Building2,
  Users,
  Bell,
  ClipboardCheck,
  Plus,
} from "lucide-react";

import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";

import { getMunicipios } from "@/lib/supabase/municipios";

import { DataTable } from "./data-table";
import { columns } from "./columns";


export default async function MunicipiosPage() {

  const municipios = await getMunicipios();


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


        <StatCard
          title="Municípios"
          value={municipios.length}
          subtitle="Municípios ao total"
          icon={Building2}
        />


        <StatCard
          title="Usuários"
          value="483"
          subtitle="+18 este mês"
          icon={Users}
        />


        <StatCard
          title="Alertas"
          value="19"
          subtitle="Alertas ao totais"
          icon={Bell}
        />


        <StatCard
          title="Missões"
          value="54"
          subtitle="Em andamento"
          icon={ClipboardCheck}
        />


      </div>



      {/* Data Table */}

      <DataTable
        columns={columns}
        data={municipios}
      />


    </div>
  );
}