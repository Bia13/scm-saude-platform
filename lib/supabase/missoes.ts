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