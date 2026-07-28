export type ResultadoIndicador = {
  id: string
  indicador: string
  municipio: string
  area: string
  meta: number
  resultado: number
  status: "Excelente" | "Atenção" | "Crítico"
}

export const resultadosIndicadores: ResultadoIndicador[] = [
  {
    id: "1",
    indicador: "Cobertura APS",
    municipio: "Goiânia",
    area: "APS",
    meta: 90,
    resultado: 94,
    status: "Excelente",
  },
  {
    id: "2",
    indicador: "Vacinação",
    municipio: "Aparecida de Goiânia",
    area: "Imunização",
    meta: 95,
    resultado: 89,
    status: "Atenção",
  },
  {
    id: "3",
    indicador: "Tempo de Espera",
    municipio: "Catalão",
    area: "Regulação",
    meta: 20,
    resultado: 17,
    status: "Excelente",
  },
  {
    id: "4",
    indicador: "Pré-Natal",
    municipio: "Rio Verde",
    area: "Saúde da Mulher",
    meta: 85,
    resultado: 68,
    status: "Crítico",
  },
]