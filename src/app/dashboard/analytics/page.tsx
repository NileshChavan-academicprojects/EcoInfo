
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trees, Flame, Droplets, Bird, Network, Activity, Atom, Sigma, Workflow } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Pie, PieChart as RechartsPieChart, Cell } from "recharts"

const deforestationData = [
  { month: "Jan", loss: 1200, color: "hsl(var(--chart-1))" },
  { month: "Feb", loss: 1500, color: "hsl(var(--chart-1))" },
  { month: "Mar", loss: 1300, color: "hsl(var(--chart-1))" },
  { month: "Apr", loss: 1800, color: "hsl(var(--chart-1))" },
  { month: "May", loss: 1600, color: "hsl(var(--chart-1))" },
  { month: "Jun", loss: 2000, color: "hsl(var(--chart-1))" },
];

const wildfireData = [
  { year: "2020", incidents: 300, color: "hsl(var(--chart-2))" },
  { year: "2021", incidents: 450, color: "hsl(var(--chart-2))" },
  { year: "2022", incidents: 380, color: "hsl(var(--chart-2))" },
  { year: "2023", incidents: 520, color: "hsl(var(--chart-2))" },
  { year: "2024", incidents: 250, color: "hsl(var(--chart-2))" }, // partial
];

const pollutionLevels = [
  { date: "01/07", level: 50, color: "hsl(var(--chart-3))" },
  { date: "02/07", level: 55, color: "hsl(var(--chart-3))" },
  { date: "03/07", level: 62, color: "hsl(var(--chart-3))" },
  { date: "04/07", level: 58, color: "hsl(var(--chart-3))" },
  { date: "05/07", level: 70, color: "hsl(var(--chart-3))" },
  { date: "06/07", level: 65, color: "hsl(var(--chart-3))" },
  { date: "07/07", level: 72, color: "hsl(var(--chart-3))" },
];

const biodiversityStatusData = [
    { name: "Mammals", value: 400, fill: "hsl(var(--chart-1))" },
    { name: "Birds", value: 300, fill: "hsl(var(--chart-2))" },
    { name: "Reptiles", value: 300, fill: "hsl(var(--chart-3))" },
    { name: "Amphibians", value: 200, fill: "hsl(var(--chart-4))" },
    { name: "Fish", value: 278, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
  loss: { label: "Area (sq km)", color: "hsl(var(--chart-1))" },
  incidents: { label: "Incidents", color: "hsl(var(--chart-2))" },
  level: { label: "Pollution Index", color: "hsl(var(--chart-3))" },
  value: { label: "Species Count" }
} satisfies Record<string, any>;

const predictionTechniques = [
  {
    name: "Spatio-Temporal Graph Neural Networks (ST-GNN)",
    icon: Network,
    bestFor: "Pollution spread, wildfire propagation",
    why: "Models geographic relationships (rivers/roads) + time dynamics",
    ecoSentinelUse: "Predict contaminant flow in watersheds"
  },
  {
    name: "Transformer-based Time Series Models (TFT, Informer)",
    icon: Activity,
    bestFor: "Long-horizon forecasting (air quality, climate trends)",
    why: "Advanced architectures for capturing complex temporal patterns",
    ecoSentinelUse: "PM2.5 forecasting 30 days ahead"
  },
  {
    name: "Physics-Informed Neural Networks (PINNs)",
    icon: Atom,
    bestFor: "Incorporating scientific laws (fluid dynamics, thermodynamics)",
    why: "Combines data-driven learning with established physical principles",
    ecoSentinelUse: "Combining weather models with ML for fire spread prediction"
  },
  {
    name: "Gaussian Processes (GPs)",
    icon: Sigma,
    bestFor: "Uncertainty quantification in sparse-data regions",
    why: "Provides probabilistic predictions, highlighting areas of low confidence",
    ecoSentinelUse: "Biodiversity predictions in unexplored forests"
  },
  {
    name: "Causal AI Models (Granger Causality, DoWhy)",
    icon: Workflow,
    bestFor: "Policy impact simulation (e.g., \"How would logging bans affect fire risk?\")",
    why: "Helps understand cause-and-effect relationships beyond correlation",
    ecoSentinelUse: "Simulating impact of conservation policies on threat levels"
  }
];


export default function AnalyticsHubPage() {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-headline mb-6 text-foreground">Analytics Hub</h1>
      <p className="mb-8 text-muted-foreground">
        Key environmental metrics and trends visualized.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trees className="h-6 w-6 text-primary" />
              Deforestation Trends
            </CardTitle>
            <CardDescription>Monthly forest area loss (sq km).</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsBarChart data={deforestationData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="loss" radius={4} />
              </RechartsBarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-primary" />
              Wildfire Incident Rate
            </CardTitle>
            <CardDescription>Annual wildfire incidents.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <RechartsLineChart data={wildfireData} accessibilityLayer margin={{ top:5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="incidents" strokeWidth={2} dot={true} />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Droplets className="h-6 w-6 text-primary" />
              Water Pollution Index
            </CardTitle>
            <CardDescription>Daily pollution index readings.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <RechartsLineChart data={pollutionLevels} accessibilityLayer margin={{ top:5, right: 20, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false}/>
                    <XAxis dataKey="date"/>
                    <YAxis domain={[40,80]}/>
                    <ChartTooltip content={<ChartTooltipContent hideIndicator />}/>
                    <Line type="natural" dataKey="level" strokeWidth={2} dot={{r:4}} activeDot={{r:6}}/>
                </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bird className="h-6 w-6 text-primary" />
              Biodiversity Status
            </CardTitle>
            <CardDescription>Species distribution by category.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ChartContainer config={chartConfig} className="h-[300px] w-full aspect-square">
                <RechartsPieChart accessibilityLayer>
                    <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="name"/>}/>
                    <Pie data={biodiversityStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                         {biodiversityStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-headline mb-6 text-foreground">Top Prediction Techniques for Environmental Forecasting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {predictionTechniques.map((tech) => (
            <Card key={tech.name} className="shadow-lg flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-start gap-3">
                  <tech.icon className="h-7 w-7 text-primary mt-1 flex-shrink-0" />
                  <span className="flex-1">{tech.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3 text-sm">
                <div>
                  <h4 className="font-semibold text-foreground/90">Best for:</h4>
                  <p className="text-muted-foreground">{tech.bestFor}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground/90">Why:</h4>
                  <p className="text-muted-foreground">{tech.why}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground/90">EcoSentinel Use:</h4>
                  <p className="text-muted-foreground">{tech.ecoSentinelUse}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

