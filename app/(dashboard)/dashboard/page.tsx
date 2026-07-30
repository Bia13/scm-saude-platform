import {
  Activity,
  CalendarDays,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  const cards = [
    {
      title: "Consultas Hoje",
      value: "37",
      icon: CalendarDays,
    },
    {
      title: "Receita Mensal",
      value: "R$ 18.450",
      icon: DollarSign,
    },
    {
      title: "Ocupação",
      value: "84%",
      icon: Activity,
    },
    {
      title: "Alertas Pendentes",
      value: "12",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Bom dia, Administrador 👋
        </h1>

        <p className="text-muted-foreground">
          Bem-vindo novamente ao SCM Saúde Platform.
        </p>
      </div>

      {/* Cards */}

      <div
        className="
          grid
          gap-4
          md:grid-cols-2
          lg:grid-cols-4
        "
      >
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Card
              key={card.title}
              className="rounded-2xl"
            >
              <CardHeader
                className="
                  flex
                  flex-row
                  items-center
                  justify-between
                  pb-2
                "
              >
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>

                <Icon className="size-5 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold">
                  {card.value}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Conteúdo */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Agenda */}

        <Card className="rounded-2xl lg:col-span-2">
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
                    <p className="font-medium">
                      {nome}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Consulta de rotina
                    </p>
                  </div>

                  <span className="font-semibold">
                    {hora}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades */}

        <Card className="rounded-2xl">
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
                      <p className="font-medium">
                        {item.title}
                      </p>

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
      </div>
    </div>
  );
}