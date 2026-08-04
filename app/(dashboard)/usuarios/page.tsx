import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  Plus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { getUsuarios } from "@/lib/supabase/users";

import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function UsuariosPage() {
  const usuarios = await getUsuarios();

  const total = usuarios.length;

  const ativos = usuarios.filter(
    (u) => u.status === "Ativo"
  ).length;

  const inativos = usuarios.filter(
    (u) => u.status === "Inativo"
  ).length;

  const administradores = usuarios.filter(
    (u) => u.cargo === "Administrador"
  ).length;

  const cards = [
    {
      title: "Usuários",
      value: total,
      icon: Users,
    },
    {
      title: "Ativos",
      value: ativos,
      icon: UserCheck,
    },
    {
      title: "Inativos",
      value: inativos,
      icon: UserX,
    },
    {
      title: "Administradores",
      value: administradores,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Usuários
          </h1>

          <p className="text-muted-foreground">
            Gerencie os usuários cadastrados na SCM Saúde Platform.
          </p>
        </div>

        <Button
          className="h-11 rounded-xl px-5"
          disabled
          title="Funcionalidade em breve"
        >
          <Plus className="mr-2 h-4 w-4" />
          Novo Usuário
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
            Lista de Usuários
          </CardTitle>
        </CardHeader>

        <CardContent>
          <DataTable
            columns={columns}
            data={usuarios}
          />
        </CardContent>
      </Card>
    </div>
  );
}