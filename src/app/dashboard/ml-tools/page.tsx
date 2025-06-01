
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BrainCircuit, Trees, Flame, Droplets, Bird, CloudFog } from "lucide-react";

interface MLModel {
  name: string;
  description: string;
}

interface MLModule {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  models: MLModel[];
}

const mlModules: MLModule[] = [
  {
    id: "deforestation",
    title: "Deforestation Module",
    icon: Trees,
    description: "Analyzing and detecting forest cover changes.",
    models: [
      { name: "ViT (Vision Transformer)", description: "High-resolution satellite image analysis." },
      { name: "U-Net Segmentation", description: "Pixel-level land cover change detection." },
    ],
  },
  {
    id: "wildfire",
    title: "Wildfire Module",
    icon: Flame,
    description: "Forecasting risk and modeling fire spread.",
    models: [
      { name: "Prophet Time-Series", description: "Long-term risk forecasting." },
      { name: "Graph Neural Networks", description: "Terrain/topography spread modeling." },
    ],
  },
  {
    id: "water_pollution",
    title: "Water Pollution Module",
    icon: Droplets,
    description: "Detecting anomalies and predicting pollution flow.",
    models: [
      { name: "Isolation Forest", description: "Real-time anomaly detection." },
      { name: "ST-GCN (Spatio-Temporal Graph CNN)", description: "Pollution flow prediction." },
    ],
  },
  {
    id: "biodiversity",
    title: "Biodiversity Module",
    icon: Bird,
    description: "Identifying species and classifying environmental sounds.",
    models: [
      { name: "Wav2Vec 2.0", description: "Few-shot species identification." },
      { name: "YAMNet Audio CNN", description: "Environmental sound classification." },
    ],
  },
  {
    id: "air_quality",
    title: "Air Quality Module",
    icon: CloudFog,
    description: "Forecasting pollutants and providing uncertainty-aware predictions.",
    models: [
      { name: "Transformer Models", description: "PM2.5/NO₂ forecasting." },
      { name: "Gaussian Process Regression", description: "Uncertainty-aware predictions." },
    ],
  },
];

export default function MLToolsPage() {
  return (
    <div className="container mx-auto py-2">
      <div className="mb-8 flex items-center gap-3">
        <BrainCircuit className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline text-foreground">Machine Learning Models & Tools</h1>
      </div>
      <p className="mb-8 text-muted-foreground">
        Explore the advanced machine learning models powering EcoSentinel's environmental analysis capabilities. Each module utilizes specialized AI to address specific ecological challenges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mlModules.map((module) => (
          <Card key={module.id} className="shadow-lg flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <module.icon className="h-6 w-6 text-primary" />
                {module.title}
              </CardTitle>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <h4 className="font-semibold mb-2 text-sm text-foreground">Models Employed:</h4>
              <ul className="space-y-3">
                {module.models.map((model) => (
                  <li key={model.name}>
                    <Badge variant="secondary" className="mr-2 mb-1">{model.name}</Badge>
                    <p className="text-xs text-muted-foreground">{model.description}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
