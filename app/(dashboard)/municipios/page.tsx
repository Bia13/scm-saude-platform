import {
  Building2,
  Users,
  Bell,
  ClipboardCheck,
  Plus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { getMunicipios } from "@/lib/supabase/municipios";
import { getUsuarios } from "@/lib/supabase/users";
import { getMissoes } from "@/lib/supabase/missoes";
import { alertas } from "@/app/(dashboard)/alertas/data";

import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function MunicipiosPage() {
  const [municipios, usuarios, missoes] = await Promise.all([
    getMunicipios(),
    getUsuarios(),
    getMissoes(),
  ]);

  const totalMunicipios = municipios.length;
  const totalUsuarios = usuarios.length;
  const totalAlertas = alertas.length;
  const totalMissoes = missoes.length;

  const cards = [
    {
      title: "Municípios",
      value: totalMunicipios,
      icon: Building2,
    },
    {
      title: "Usuários",
      value: totalUsuarios,
      icon: Users,
    },
    {
      title: "Alertas",
      value: totalAlertas,
      icon: Bell,
    },
    {
      title: "Missões",
      value: totalMissoes,
      icon: ClipboardCheck,
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Municípios Clientes
          </h1>

          <p className="text-muted-foreground">
            Gerencie todos os municípios cadastrados na SCM Saúde Platform.
          </p>
        </div>

        <Button
          className="h-11 rounded-xl px-5"
          disabled
          title="Funcionalidade em breve"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Município
        </Button>
      </div>

      {/* CARDS */}

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
                <CardTitle
                  className="
                    text-sm
                    font-medium
                  "
                >
                  {card.title}
                </CardTitle>

                <Icon
                  className="
                    size-5
                    text-muted-foreground
                  "
                />
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

      {/* TABELA */}

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>
            Lista de Municípios
          </CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={municipios}
          />
        </CardContent>
      </Card>
    </div>
  );
}