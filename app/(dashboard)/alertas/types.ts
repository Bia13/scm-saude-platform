export type Alerta = {
  id: string
  titulo: string
  municipio: string
  categoria: string
  prioridade: "Crítica" | "Alta" | "Média" | "Baixa"
  status: "Pendente" | "Em andamento" | "Resolvido"
  data: string
}+