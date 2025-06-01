"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { summarizeThreatReport, type SummarizeThreatReportInput } from "@/ai/flows/summarize-threat-report";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ThreatSummaryDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  threatType: string;
  threatData: Record<string, any>; 
}

export function ThreatSummaryDialog({
  isOpen,
  onOpenChange,
  threatType,
  threatData,
}: ThreatSummaryDialogProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && threatType && threatData) {
      const fetchSummary = async () => {
        setIsLoading(true);
        setError(null);
        setSummary(null);
        try {
          const input: SummarizeThreatReportInput = {
            threatType: threatType,
            // Convert threatData object to a descriptive string for the AI
            threatData: `Location: ${threatData.location}. Severity: ${threatData.severity}. Details: ${threatData.details}`,
          };
          const result = await summarizeThreatReport(input);
          setSummary(result.summary);
        } catch (err) {
          console.error("Error generating summary:", err);
          setError("Failed to generate threat summary. Please try again.");
        } finally {
          setIsLoading(false);
        }
      };
      fetchSummary();
    }
  }, [isOpen, threatType, threatData]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Threat Summary: {threatType}</DialogTitle>
          <DialogDescription>
            AI-generated summary of the selected environmental threat.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Generating summary...</p>
            </div>
          )}
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {summary && (
            <div className="prose prose-sm max-w-none rounded-md border bg-muted/30 p-4 text-sm">
              <p>{summary}</p>
            </div>
          )}
          <div className="text-xs text-muted-foreground">
            <strong>Mock Threat Data:</strong>
            <pre className="mt-1 whitespace-pre-wrap bg-muted/20 p-2 rounded-md text-xs">
              {JSON.stringify(threatData, null, 2)}
            </pre>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
