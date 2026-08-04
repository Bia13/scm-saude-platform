import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Siren,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { alertas } from "./data";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AlertasPage() {
  const alertasAbertos = alertas.filter(
    (item) => item.status !== "Resolvido"
  ).length;
  const alertasCriticos = alertas.filter(
    (item) => item.prioridade === "Crítica"
  ).length;
  const alertasAndamento = alertas.filter(
    (item) => item.status === "Em andamento"
  ).length;
  const alertasResolvidos = alertas.filter(
    (item) => item.status === "Resolvido"
  ).length;

  const cards = [
    {
      title: "Alertas Ativos",
      value: alertasAbertos,
      icon: AlertTriangle,
    },
    {
      title: "Críticos",
      value: alertasCriticos,
      icon: Siren,
    },
    {
      title: "Em andamento",
      value: alertasAndamento,
      icon: Clock3,
    },
    {
      title: "Resolvidos",
      value: alertasResolvidos,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Alertas
        </h1>

        <p className="text-muted-foreground">
          Monitore ocorrências críticas e acompanhe a resolução dos alertas do
          sistema.
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

      {/* Tabela */}

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            Lista de Alertas
          </CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={alertas}
          />
        </CardContent>
      </Card>
    </div>
  );
}