
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trees, Flame, Droplets, Bird, MapPin } from "lucide-react";
import { ThreatSummaryDialog } from "@/components/threats/threat-summary-dialog";

interface ThreatLayer {
  id: string;
  name: string;
  icon: React.ElementType;
  mockData: Record<string, any>;
}

const threatLayers: ThreatLayer[] = [
  { id: "deforestation", name: "Deforestation", icon: Trees, mockData: { location: "Amazon Rainforest", severity: "High", details: "Significant canopy loss detected in the last 7 days." } },
  { id: "wildfire", name: "Wildfire Risk", icon: Flame, mockData: { location: "California, USA", severity: "Very High", details: "Extreme dry conditions and high winds indicate imminent wildfire danger." } },
  { id: "water_pollution", name: "Water Pollution", icon: Droplets, mockData: { location: "Ganges River, India", severity: "Critical", details: "Elevated levels of industrial pollutants detected." } },
  { id: "biodiversity", name: "Biodiversity Threats", icon: Bird, mockData: { location: "Coral Triangle", severity: "Medium", details: "Decline in coral health and fish populations observed." } },
];

export default function ThreatMapPage() {
  const [activeLayers, setActiveLayers] = useState<Record<string, boolean>>({
    deforestation: true,
    wildfire: true,
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<ThreatLayer | null>(null);

  const handleLayerToggle = (layerId: string) => {
    setActiveLayers((prev) => ({ ...prev, [layerId]: !prev[layerId] }));
  };

  const handleMockThreatClick = (threat: ThreatLayer) => {
    setSelectedThreat(threat);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-2">
      <h1 className="text-3xl font-headline mb-6 text-foreground">Threat Map</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-3 shadow-lg">
          <CardHeader>
            <CardTitle>Global Environmental Threats</CardTitle>
            <CardDescription>Real-time visualization of environmental threats. Click on markers for details.</CardDescription>
          </CardHeader>
          <CardContent className="relative aspect-[16/9] bg-muted rounded-md overflow-hidden border">
            <Image
              src="https://placehold.co/1200x675.png"
              alt="World Map Placeholder"
              layout="fill"
              objectFit="cover"
              data-ai-hint="openstreetmap style map"
              className="opacity-50"
            />
            {/* Mock clickable threat markers */}
            {threatLayers.map((threat, index) => activeLayers[threat.id] && (
              <Button 
                key={threat.id}
                variant="outline" 
                size="icon"
                className="absolute rounded-full w-10 h-10 bg-destructive hover:bg-destructive/80 border-2 border-destructive-foreground/50 shadow-xl"
                style={{ 
                  top: `${20 + index * 15}%`, 
                  left: `${25 + index * 18}%`,
                  transform: 'translate(-50%, -50%)' 
                }}
                onClick={() => handleMockThreatClick(threat)}
                aria-label={`View ${threat.name} details`}
              >
                <threat.icon className="h-5 w-5 text-destructive-foreground" />
              </Button>
            ))}
             <div className="absolute bottom-4 right-4 p-2 bg-background/80 rounded-md text-xs text-muted-foreground shadow">
                Map data CC BY OpenStreetMap contributors
             </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Threat Layers</CardTitle>
            <CardDescription>Toggle visibility of threat layers on the map.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {threatLayers.map((layer) => (
              <div key={layer.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                <Checkbox
                  id={layer.id}
                  checked={activeLayers[layer.id] || false}
                  onCheckedChange={() => handleLayerToggle(layer.id)}
                />
                <layer.icon className="h-5 w-5 text-primary" />
                <Label htmlFor={layer.id} className="flex-1 cursor-pointer text-sm">
                  {layer.name}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {selectedThreat && (
        <ThreatSummaryDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          threatType={selectedThreat.name}
          threatData={selectedThreat.mockData}
        />
      )}
       <Card className="mt-6 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="text-primary" /> Simulated Alert
          </CardTitle>
          <CardDescription>Click to view a sample AI-generated threat summary.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => handleMockThreatClick(threatLayers[0])}>
            Show Deforestation Alert Summary
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

    