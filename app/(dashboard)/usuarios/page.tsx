import {
  Users,
  UserCheck,
  UserX,
  ShieldCheck,
  Building2,
  Plus,
} from "lucide-react";


import { StatCard } from "@/components/dashboard/stat-card";

import { Button } from "@/components/ui/button";


import { getUsuarios } from "@/lib/supabase/users";


import { DataTable } from "./data-table";

import { columns } from "./columns";



export default async function UsuariosPage() {


  const usuarios = await getUsuarios();
    console.log("USUARIOS:", usuarios);



  return (

    <div className="space-y-8 p-8">



      {/* Header */}


      <div className="flex items-center justify-between">


        <div>


          <h1 className="text-3xl font-bold tracking-tight">

            Usuários

          </h1>


          <p className="mt-1 text-muted-foreground">

            Gerencie os usuários cadastrados na SCM Saúde Platform.

          </p>


        </div>



        <Button className="rounded-xl h-11 px-5">


          <Plus className="mr-2 h-4 w-4"/>


          Novo Usuário


        </Button>


      </div>




      {/* Cards */}


     <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

  <StatCard
    title="Usuários"
    value={usuarios.length}
    subtitle="Usuários cadastrados"
    icon={Users}
  />


  <StatCard
    title="Ativos"
    value={
      usuarios.filter(
        (u) => u.status === "Ativo"
      ).length
    }
    subtitle="Usuários ativos"
    icon={UserCheck}
  />


  <StatCard
    title="Inativos"
    value={
      usuarios.filter(
        (u) => u.status === "Inativo"
      ).length
    }
    subtitle="Usuários desativados"
    icon={UserX}
  />


  <StatCard
    title="Administradores"
    value={
      usuarios.filter(
        (u) => u.cargo === "Administrador"
      ).length
    }
    subtitle="Perfis administrativos"
    icon={ShieldCheck}
  />

</div>

      <DataTable
        columns={columns}
        data={usuarios}
      />
    </div>

  );

}