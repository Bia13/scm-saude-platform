import { ReactNode } from "react";

import {
  Activity,
  CalendarDays,
  DollarSign,
  Users,
} from "lucide-react";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { Card, CardContent } from "@/components/ui/card";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppHeader } from "@/components/layout/app-header";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen>

      <AppSidebar />

      <SidebarInset className="flex min-h-screen flex-col bg-muted/20">

        <AppHeader />

        <main className="flex-1 overflow-auto">

          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">

            <section>
              <h2 className="text-3xl font-bold tracking-tight">
                Bom dia, Administrador 👋
              </h2>

              <p className="mt-1 text-muted-foreground">
                Bem-vindo novamente ao SCM Saúde Platform.
              </p>
            </section>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pacientes
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      1.528
                    </h3>

                    <span className="text-xs text-emerald-600">
                      +12 este mês
                    </span>
                  </div>

                  <Users className="size-8 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Consultas Hoje
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      37
                    </h3>

                    <span className="text-xs text-emerald-600">
                      +5%
                    </span>
                  </div>

                  <CalendarDays className="size-8 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Receita Mensal
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      R$ 18.450
                    </h3>

                    <span className="text-xs text-emerald-600">
                      +8%
                    </span>
                  </div>

                  <DollarSign className="size-8 text-muted-foreground" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Ocupação
                    </p>

                    <h3 className="mt-2 text-3xl font-bold">
                      84%
                    </h3>

                    <span className="text-xs text-emerald-600">
                      Excelente
                    </span>
                  </div>

                  <Activity className="size-8 text-muted-foreground" />
                </CardContent>
              </Card>

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

              <Card>

                <CardContent className="p-6">

                  <h3 className="mb-5 text-lg font-semibold">
                    Atividades Recentes
                  </h3>

                  <div className="space-y-4">

                    <p>🟢 Novo paciente cadastrado</p>
                    <p>📅 Consulta confirmada</p>
                    <p>💰 Receita atualizada</p>
                    <p>📄 Relatório exportado</p>
                    <p>⚙️ Configuração alterada</p>

                  </div>

                </CardContent>

              </Card>

            </section>

            {children}

          </div>

        </main>

      </SidebarInset>

    </SidebarProvider>
  );
}