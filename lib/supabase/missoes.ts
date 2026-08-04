import { createClient } from "@/lib/supabase/client";

export async function updateMissaoStatus(
  id: string,
  status: "Pendente" | "Em andamento" | "Concluída"
) {
  const supabase = createClient();

  const { error } = await supabase
    .from("missoes")
    .update({
      status,
      concluida: status === "Concluída",
    })
    .eq("id", id);

  if (error) throw error;
}

export async function getMissoes() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("missoes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}

export type MissaoStatus =
  | "Pendente"
  | "Em andamento"
  | "Concluída";


export type MissaoPrioridade =
  | "Crítica"
  | "Alta"
  | "Média"
  | "Baixa";


export type MissaoCategoria =
  | "Administrativo"
  | "Cadastro"
  | "Indicadores"
  | "Sistema"
  | "Gestão";


export interface Missao {


  id: string;


  titulo: string;


  descricao: string | null;


  categoria: MissaoCategoria | string;


  prioridade: MissaoPrioridade;


  status: MissaoStatus;


  concluida: boolean;


  responsavel_id: string | null;


  prazo: string | null;


  created_at: string;


  updated_at: string;


}