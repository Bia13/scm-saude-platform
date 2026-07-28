export type Missao = {
  id: number;
  titulo: string;
  descricao: string;
  categoria: string;
  prioridade: "Baixa" | "Média" | "Alta";
  status: "Pendente" | "Em andamento" | "Concluída";
  responsavel: string;
  prazo: string;
  concluida: boolean;
};


export const missoes: Missao[] = [

  {
    id: 1,
    titulo: "Atualizar cadastro municipal",
    descricao:
      "Realizar atualização dos dados cadastrais.",
    categoria: "Cadastro",
    prioridade: "Alta",
    status: "Em andamento",
    responsavel: "Administrador",
    prazo: "30/08/2026",
    concluida: false,
  },


  {
    id: 2,
    titulo: "Revisar indicadores",
    descricao:
      "Validar indicadores cadastrados.",
    categoria: "Indicadores",
    prioridade: "Média",
    status: "Pendente",
    responsavel: "Equipe Gestão",
    prazo: "05/09/2026",
    concluida: false,
  },

];