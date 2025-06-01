
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";

export default function AnalyticToolsPage() {
  return (
    <div className="container mx-auto py-2">
      <div className="mb-6 flex items-center gap-3">
        <LayoutGrid className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-headline text-foreground">Analytic Tools</h1>
      </div>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Explore Analytic Tools</CardTitle>
          <CardDescription>
            This section will house various analytic tools and dashboards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Analytic tools content will be displayed here. Stay tuned for updates!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
