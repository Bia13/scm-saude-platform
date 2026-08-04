import {
  Activity,
  Building2,
  Target,
  Trophy,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { resultadosIndicadores } from "./indicadores";

export default function ResultadosIndicadoresPage() {
  const totalIndicadores = resultadosIndicadores.length;
  const desempenhoMedio = Math.round(
    resultadosIndicadores.reduce(
      (acc, item) => acc + (item.resultado / item.meta) * 100,
      0
    ) / totalIndicadores
  );
  const metasAtingidas = resultadosIndicadores.filter(
    (item) => item.resultado >= item.meta
  ).length;
  const municipiosComIndicadores = new Set(
    resultadosIndicadores.map((item) => item.municipio)
  ).size;

  const cards = [
    {
      title: "Indicadores",
      value: totalIndicadores,
      icon: Activity,
    },
    {
      title: "Desempenho Médio",
      value: `${desempenhoMedio}%`,
      icon: Target,
    },
    {
      title: "Metas Atingidas",
      value: metasAtingidas,
      icon: Trophy,
    },
    {
      title: "Municípios",
      value: municipiosComIndicadores,
      icon: Building2,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Resultados dos Indicadores
        </h1>

        <p className="text-muted-foreground">
          Acompanhe o desempenho dos indicadores estratégicos da plataforma.
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
            Resultados dos Indicadores
          </CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={resultadosIndicadores}
          />
        </CardContent>
      </Card>
    </div>
  );
}