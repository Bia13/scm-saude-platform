import { Alerta } from "./types"

export const alertas: Alerta[] = [
  {
    id: "ALT-001",
    titulo: "Cobertura vacinal abaixo da meta",
    municipio: "Goiânia",
    categoria: "Vacinação",
    prioridade: "Crítica",
    status: "Pendente",
    data: "25/07/2026",
  },
  {
    id: "ALT-002",
    titulo: "Fila de consultas elevada",
    municipio: "Aparecida",
    categoria: "Consultas",
    prioridade: "Alta",
    status: "Em andamento",
    data: "24/07/2026",
  },
  {
    id: "ALT-003",
    titulo: "Baixa produtividade APS",
    municipio: "Catalão",
    categoria: "APS",
    prioridade: "Média",
    status: "Pendente",
    data: "22/07/2026",
  },
  {
    id: "ALT-004",
    titulo: "Meta atingida",
    municipio: "Rio Verde",
    categoria: "Indicadores",
    prioridade: "Baixa",
    status: "Resolvido",
    data: "20/07/2026",
  },
]