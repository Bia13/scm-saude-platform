import {
  Activity,
  Building2,
  Target,
  Trophy,
} from "lucide-react"

import { StatCard } from "@/components/dashboard/stat-card"
import { DataTable } from "./data-table"

import { columns } from "./columns"
import { resultadosIndicadores } from "./indicadores"

export default function ResultadosIndicadoresPage() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Resultados dos Indicadores
        </h1>

        <p className="mt-1 text-muted-foreground">
          Acompanhe o desempenho dos indicadores estratégicos da plataforma.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Indicadores"
          value="24"
          subtitle="Monitorados"
          icon={Activity}
        />

        <StatCard
          title="Desempenho Médio"
          value="91%"
          subtitle="Excelente"
          icon={Target}
        />

        <StatCard
          title="Metas Atingidas"
          value="18"
          subtitle="75% do total"
          icon={Trophy}
        />

        <StatCard
          title="Municípios"
          value="20"
          subtitle="Avaliados"
          icon={Building2}
        />
      </div>

      <DataTable
        columns={columns}
        data={resultadosIndicadores}
      />
    </div>
  )
}