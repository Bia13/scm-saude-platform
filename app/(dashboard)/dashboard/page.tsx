import {
  Activity,
  CalendarDays,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { StatCard } from "@/components/dashboard/stat-card";

export default function DashboardPage() {
  return (
    <>
      <section>
        <h2 className="text-3xl font-bold tracking-tight">
          Bom dia, Administrador 👋
        </h2>

        <p className="mt-1 mb-4 text-muted-foreground">
          Bem-vindo novamente ao SCM Saúde Platform.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-4">
        <StatCard
  title="Consultas Hoje"
  value="37"
  subtitle="+5%"
  icon={CalendarDays}
/>

<StatCard
  title="Receita Mensal"
  value="R$ 18.450"
  subtitle="+8%"
  icon={DollarSign}
/>

<StatCard
  title="Ocupação"
  value="84%"
  subtitle="Excelente"
  icon={Activity}
/>
<StatCard
  title="Alertas Pendentes"
  value="12"
  subtitle="3 críticos"
  icon={AlertTriangle}
/>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="mb-5 text-lg font-semibold">
              Agenda de Hoje
            </h3>

            <div className="space-y-4">
              {[
                ["09:00", "João Silva"],
                ["10:30", "Maria Souza"],
                ["13:00", "Carlos Oliveira"],
                ["15:45", "Fernanda Lima"],
              ].map(([hora, nome]) => (
                <div
                  key={hora}
                  className="flex items-center justify-between rounded-xl border bg-background p-4"
                >
                  <div>
                    <p className="font-medium">{nome}</p>

                    <p className="text-sm text-muted-foreground">
                      Consulta de rotina
                    </p>
                  </div>

                  <span className="font-semibold">{hora}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
  <h3 className="mb-5 text-lg font-semibold">
    Atividades Recentes
  </h3>

  <div className="space-y-3">

    {[
      {
        icon: "🟢",
        title: "Novo paciente cadastrado",
        description: "João Silva foi registrado",
        time: "Agora",
      },
      {
        icon: "📅",
        title: "Consulta confirmada",
        description: "Maria Souza • Cardiologia",
        time: "12 min",
      },
      {
        icon: "💰",
        title: "Receita atualizada",
        description: "Fechamento financeiro diário",
        time: "35 min",
      },
      {
        icon: "📄",
        title: "Relatório exportado",
        description: "Indicadores de desempenho",
        time: "1 h",
      },
      {
        icon: "⚙️",
        title: "Configuração alterada",
        description: "Preferências do sistema",
        time: "Ontem",
      },
    ].map((item) => (
      <div
        key={item.title}
        className="flex items-start gap-4 rounded-xl border bg-background p-4 transition-all hover:shadow-sm"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
          {item.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium">{item.title}</p>

            <span className="text-xs text-muted-foreground">
              {item.time}
            </span>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {item.description}
          </p>
        </div>
      </div>
    ))}

  </div>
</CardContent>
        </Card>
      </section>
    </>
  );
}  