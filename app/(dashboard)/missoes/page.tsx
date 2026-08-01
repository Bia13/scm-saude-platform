import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


import {
  Target,
  Clock,
  CheckCircle2,
  ListTodo,
  Plus
} from "lucide-react";


import { DataTable } from "./data-table";

import { createClient } from "@/lib/supabase/server";


import { columns } from "./columns";
import { Button } from "@/components/ui/button";


export default async function MissoesPage() {


  const supabase =
    await createClient();

  const {
    data: missoes,
  } = await supabase

    .from("missoes")

    .select("*")

    .order(
      "created_at",
      {
        ascending:false,
      }
    );

  const listaMissoes =
    missoes ?? [];

  const total =
    listaMissoes.length;
  const pendentes =
    listaMissoes.filter(
      (item)=>
        item.status === "Pendente"
    ).length;
  const andamento =
    listaMissoes.filter(
      (item)=>
        item.status === "Em andamento"
    ).length;

  const concluidas =
    listaMissoes.filter(
      (item)=>
        item.status === "Concluída"
    ).length;

  const cards = [
    {
      title:"Total de Missões",
      value:total,
      icon:ListTodo,
    },

    {
      title:"Pendentes",
      value:pendentes,
      icon:Clock,
    },

    {
      title:"Em andamento",

      value:andamento,

      icon:Target,

    },

    {
      title:"Concluídas",

      value:concluidas,

      icon:CheckCircle2,

    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Missões
          </h1>

          <p className="text-muted-foreground">
          Acompanhe as missões estratégicas e atividades pendentes da plataforma.
          </p>
        </div>

        <Button className="h-11 rounded-xl px-5">
          <Plus className="mr-2 h-4 w-4" />
          Nova Missão
        </Button>
      </div>
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
        {
          cards.map((card)=>{
            const Icon =
              card.icon;

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
                  <div
                    className="
                      text-3xl
                      font-bold
                    "
                  >
                    {card.value}
                  </div>
                </CardContent>
              </Card>
            );
          })
        }

      </div>

      {/* TABELA */}
      <Card
        className="rounded-2xl"

      >
        <CardHeader>
          <CardTitle>
            Lista de Missões
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={listaMissoes}
          />
        </CardContent>
      </Card>

    </div>
  );


}