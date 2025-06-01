
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, Trees, Flame, Droplets, Bird, Waves } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, Line, LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Pie, PieChart as RechartsPieChart, Cell, ResponsiveContainer } from "recharts"
import Image from "next/image";

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

const contaminantFlowData = [
  { time: "0h", upstream: 5, midstream: 1, downstream: 0 },
  { time: "6h", upstream: 15, midstream: 5, downstream: 2 },
  { time: "12h", upstream: 30, midstream: 12, downstream: 6 },
  { time: "18h", upstream: 20, midstream: 25, downstream: 15 },
  { time: "24h", upstream: 10, midstream: 18, downstream: 22 },
];

const chartConfig = {
  loss: { label: "Area (sq km)", color: "hsl(var(--chart-1))" },
  incidents: { label: "Incidents", color: "hsl(var(--chart-2))" },
  level: { label: "Pollution Index", color: "hsl(var(--chart-3))" },
  value: { label: "Species Count" },
  upstream: { label: "Upstream Conc.", color: "hsl(var(--chart-4))" },
  midstream: { label: "Midstream Conc.", color: "hsl(var(--chart-5))" },
  downstream: { label: "Downstream Conc.", color: "hsl(var(--chart-1))" }, // Reusing chart-1 color
} satisfies Record<string, any>;


export default function AnalyticsHubPage() {
  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-headline mb-6 text-foreground">Analytics Hub</h1>
      <p className="mb-8 text-muted-foreground">
        Key environmental metrics and trends visualized.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <Line type="monotone" dataKey="incidents" strokeWidth={2} dot={true} stroke="var(--color-incidents)" />
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
                    <Line type="natural" dataKey="level" strokeWidth={2} dot={{r:4}} activeDot={{r:6}} stroke="var(--color-level)" />
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

        <Card className="shadow-lg md:col-span-2"> {/* Span 2 columns on medium screens and up */}
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Waves className="h-6 w-6 text-primary" />
              Contaminant Flow Prediction
            </CardTitle>
            <CardDescription>Simulated contaminant concentration in a watershed over time (µg/L).</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[350px] w-full">
              <RechartsLineChart data={contaminantFlowData} accessibilityLayer margin={{ top:5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" />
                <YAxis label={{ value: 'Concentration (µg/L)', angle: -90, position: 'insideLeft', offset: -10 }} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line type="monotone" dataKey="upstream" strokeWidth={2} dot={true} stroke="var(--color-upstream)" name="Upstream" />
                <Line type="monotone" dataKey="midstream" strokeWidth={2} dot={true} stroke="var(--color-midstream)" name="Midstream" />
                <Line type="monotone" dataKey="downstream" strokeWidth={2} dot={true} stroke="var(--color-downstream)" name="Downstream" />
              </RechartsLineChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
