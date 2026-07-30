"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Bar,
  BarChart,
  Line,
  LineChart,
  Cell,
  Pie,
  PieChart,
    PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { atendimentosMensais, atendimentosMunicipios, pacientesAtendidos, statusMunicipios, indicadoresArea, taxaOcupacao} from "./chart-data"

import {
  Activity,
  AlertTriangle,
  Building2,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const chartConfig = {
  consultas: {
    label: "Consultas",
    color: "var(--chart-1)",
  },
  pacientes: {
    label: "Pacientes",
    color: "var(--chart-2)",
  },
   municipios: {
    label: "Municípios",
    color: "var(--chart-3)",
  },
  indicadores: {
    label: "Indicadores",
    color: "var(--chart-4)",
  },
    ativo: {
    label: "Ativo",
    color: "var(--chart-1)",
  },

  inativo: {
    label: "Inativo",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

export default function IndicadoresPage() {
  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Indicadores Globais
        </h1>

        <p className="mt-1 text-muted-foreground">
          Acompanhe os principais indicadores estratégicos da SCM Saúde
          Platform.
        </p>
      </div>

      {/* Cards */}
<div
  className="
    grid
    gap-4
    md:grid-cols-2
    lg:grid-cols-4
  "
>
  {[
    {
      title: "Consultas",
      value: "2.845",
      icon: CalendarDays,
    },
    {
      title: "Municípios",
      value: "18",
      icon: Building2,
    },
    {
      title: "Ocupação",
      value: "84%",
      icon: Activity,
    },
    {
      title: "Alertas",
      value: "12",
      icon: AlertTriangle,
    },
  ].map((card) => {
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

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Area Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Evolução de Atendimentos</CardTitle>
            <CardDescription>
              Total de consultas realizadas nos últimos meses.
            </CardDescription>

          </CardHeader>

          <CardContent className="h-[350px]">
            <CardContent>
  <ChartContainer
    config={chartConfig}
    className="h-[350px] w-full"
  >
    <AreaChart
      accessibilityLayer
      data={atendimentosMensais}
      margin={{
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} />

      <XAxis
        dataKey="mes"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
      />

      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent />}
      />

      <Area
        dataKey="pacientes"
        type="natural"
        fill="var(--color-pacientes)"
        fillOpacity={0.4}
        stroke="var(--color-pacientes)"
        stackId="a"
      />

      <Area
        dataKey="consultas"
        type="natural"
        fill="var(--color-consultas)"
        fillOpacity={0.4}
        stroke="var(--color-consultas)"
        stackId="a"
      />
    </AreaChart>
  </ChartContainer>
</CardContent>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Atendimentos por Município</CardTitle>

            <CardDescription>
              Comparativo entre os municípios cadastrados.
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[350px]">
            <CardContent>
  <ChartContainer
    config={chartConfig}
    className="h-[350px] w-full"
  >
    <BarChart
      accessibilityLayer
      data={atendimentosMunicipios}
    >
      <CartesianGrid vertical={false} />

      <XAxis
        dataKey="municipio"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
      />

      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent />}
      />

      <Bar
        dataKey="consultas"
        fill="var(--color-consultas)"
        radius={8}
      />
    </BarChart>
  </ChartContainer>
</CardContent>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Evolução de Pacientes</CardTitle>

            <CardDescription>
              Crescimento mensal de pacientes atendidos.
            </CardDescription>
          </CardHeader>

          <CardContent className="h-[350px]">
            <CardContent>
  <ChartContainer
    config={chartConfig}
    className="h-[350px] w-full"
  >
    <LineChart
      accessibilityLayer
      data={pacientesAtendidos}
      margin={{
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} />

      <XAxis
        dataKey="mes"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
      />

      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent />}
      />

      <Line
        type="natural"
        dataKey="pacientes"
        stroke="var(--color-pacientes)"
        strokeWidth={3}
        dot={{
          fill: "var(--color-pacientes)",
          r: 4,
        }}
        activeDot={{
          r: 6,
        }}
      />
    </LineChart>
  </ChartContainer>
</CardContent>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Status dos Municípios</CardTitle>

            <CardDescription>
              Distribuição dos municípios ativos e inativos.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex h-[350px] items-center justify-center">
            <CardContent>
  <ChartContainer
    config={chartConfig}
    className="mx-auto aspect-square h-[350px]"
  >
    <PieChart>
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />

      <Pie
        data={statusMunicipios}
        dataKey="quantidade"
        nameKey="status"
        innerRadius={70}
        strokeWidth={5}
      >
        {statusMunicipios.map((item) => (
          <Cell
            key={item.status}
            fill={item.fill}
          />
        ))}
      </Pie>
    </PieChart>
  </ChartContainer>
</CardContent>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Indicadores por Área</CardTitle>

            <CardDescription>
              Comparativo dos principais indicadores estratégicos.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex h-[350px] items-center justify-center">
            <CardContent>
  <ChartContainer
    config={chartConfig}
    className="mx-auto aspect-square h-[350px]"
  >
    <RadarChart
      accessibilityLayer
      data={indicadoresArea}
    >
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent />}
      />

      <PolarGrid />

      <PolarAngleAxis
        dataKey="indicador"
      />

      <Radar
        dataKey="valor"
        fill="var(--color-indicadores)"
        fillOpacity={0.45}
        stroke="var(--color-indicadores)"
        strokeWidth={2}
      />
    </RadarChart>
  </ChartContainer>
</CardContent>
          </CardContent>
        </Card>

        {/* Radial Chart */}
        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle>Taxa de Ocupação</CardTitle>

            <CardDescription>
              Percentual médio de ocupação das unidades.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex h-[350px] items-center justify-center">
            <CardContent className="flex h-[280px] items-center justify-center sm:h-[320px] lg:h-[360px]">
  <ChartContainer
    config={chartConfig}
    className="mx-auto h-full aspect-square"
  >
    <RadialBarChart
      data={taxaOcupacao}
      startAngle={90}
      endAngle={-270}
      innerRadius="75%"
      outerRadius="100%"
    >
      <ChartTooltip
        cursor={false}
        content={<ChartTooltipContent hideLabel />}
      />

      <PolarAngleAxis
        type="number"
        domain={[0, 100]}
        tick={false}
      />

      <RadialBar
        dataKey="value"
        background
        cornerRadius={12}
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x="50%"
          className="fill-foreground text-4xl font-bold"
        >
          84%
        </tspan>

        <tspan
          x="50%"
          dy="1.6em"
          className="fill-muted-foreground text-sm"
        >
          Ocupação
        </tspan>
      </text>
    </RadialBarChart>
  </ChartContainer>
</CardContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}