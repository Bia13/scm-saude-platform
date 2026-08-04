import {
  Activity,
  Building2,
  Clock,
  Users,
  AlertTriangle,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getMunicipios } from "@/lib/supabase/municipios";
import { getUsuarios } from "@/lib/supabase/users";
import { getMissoes } from "@/lib/supabase/missoes";
import { alertas } from "@/app/(dashboard)/alertas/data";

export default async function DashboardPage() {
  const [municipios, usuarios, missoes] = await Promise.all([
    getMunicipios(),
    getUsuarios(),
    getMissoes(),
  ]);

  const totalMunicipios = municipios.length;
  const totalUsuarios = usuarios.length;
  const totalAlertasAbertos = alertas.filter(
    (item) => item.status !== "Resolvido"
  ).length;
  const missoesAndamento = missoes.filter(
    (item) => item.status === "Em andamento"
  ).length;

  const cards = [
    {
      title: "Municípios Clientes",
      value: totalMunicipios,
      icon: Building2,
    },
    {
      title: "Usuários",
      value: totalUsuarios,
      icon: Users,
    },
    {
      title: "Alertas Abertos",
      value: totalAlertasAbertos,
      icon: AlertTriangle,
    },
    {
      title: "Missões em andamento",
      value: missoesAndamento,
      icon: Clock,
    },
  ];

  const tasks = [
    {
      title: "Revisão de indicadores municipais",
      description: "Verificar metas de vacinação e APS para o trimestre.",
      status: "Em andamento",
    },
    {
      title: "Atualizar plano de atuação",
      description: "Concluir mapeamento de ações em 5 municípios prioritários.",
      status: "Pendente",
    },
    {
      title: "Monitorar alertas críticos",
      description: "Acompanhar resoluções dos alertas mais urgentes.",
      status: "Em andamento",
    },
  ];

  const updates = [
    {
      title: "Estudo de cobertura vacinal",
      description: "Aparecida de Goiânia está em atenção para campanha de rotina.",
      time: "Agora",
    },
    {
      title: "Município com meta APS revisada",
      description: "Catalão tem nova recomendação de avaliação.",
      time: "30 min",
    },
    {
      title: "Relatório de indicadores gerado",
      description: "Painel mensal disponível para gestores.",
      time: "1 h",
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
        {/* Prioridades de Gestão */}

        <Card className="rounded-2xl lg:col-span-2">
          <CardContent className="p-6">
            <h3 className="mb-5 text-lg font-semibold">
              Prioridades de Gestão
            </h3>

            <div className="space-y-4">
              {tasks.map((task) => (
                <div
                  key={task.title}
                  className="rounded-xl border bg-background p-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {task.description}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">
                      {task.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atualizações */}

        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <h3 className="mb-5 text-lg font-semibold">
              Atualizações Recentes
            </h3>

            <div className="space-y-3">
              {updates.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl border bg-background p-4 transition-all hover:shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-lg">
                    ✅
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
      </div>
    </div>
  );
}