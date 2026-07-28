import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Siren,
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { StatCard } from "@/components/dashboard/stat-card"

import { alertas } from "./data"
import { columns } from "./columns"
import { DataTable } from "./data-table"

export default function AlertasPage() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Alertas
        </h1>

        <p className="mt-1 text-muted-foreground">
          Monitore ocorrências críticas e acompanhe a resolução dos alertas do sistema.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Alertas Ativos"
          value="18"
          subtitle="+3 hoje"
          icon={AlertTriangle}
        />

        <StatCard
          title="Críticos"
          value="4"
          subtitle="Prioridade máxima"
          icon={Siren}
        />

        <StatCard
          title="Em andamento"
          value="9"
          subtitle="50% dos alertas"
          icon={Clock3}
        />

        <StatCard
          title="Resolvidos"
          value="52"
          subtitle="Este mês"
          icon={CheckCircle2}
        />
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>Lista de Alertas</CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={alertas}
          />
        </CardContent>
      </Card>
    </div>
  )
}