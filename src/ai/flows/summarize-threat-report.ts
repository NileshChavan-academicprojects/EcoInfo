'use server';

/**
 * @fileOverview Summarizes threat reports for different environmental threats.
 *
 * - summarizeThreatReport - A function that generates a summary of a specific threat report.
 * - SummarizeThreatReportInput - The input type for the summarizeThreatReport function.
 * - SummarizeThreatReportOutput - The return type for the summarizeThreatReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeThreatReportInputSchema = z.object({
  threatType: z.string().describe('The type of environmental threat (e.g., deforestation, wildfire risk, water pollution, biodiversity threats).'),
  threatData: z.string().describe('Detailed data related to the specific environmental threat.'),
});
export type SummarizeThreatReportInput = z.infer<typeof SummarizeThreatReportInputSchema>;

const SummarizeThreatReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the threat report.'),
});
export type SummarizeThreatReportOutput = z.infer<typeof SummarizeThreatReportOutputSchema>;

export async function summarizeThreatReport(input: SummarizeThreatReportInput): Promise<SummarizeThreatReportOutput> {
  return summarizeThreatReportFlow(input);
}

const summarizeThreatReportPrompt = ai.definePrompt({
  name: 'summarizeThreatReportPrompt',
  input: {schema: SummarizeThreatReportInputSchema},
  output: {schema: SummarizeThreatReportOutputSchema},
  prompt: `You are an environmental expert tasked with summarizing threat reports.

  Based on the provided threat type and data, generate a concise and informative summary.

  Threat Type: {{{threatType}}}
  Threat Data: {{{threatData}}}

  Summary:`,
});

const summarizeThreatReportFlow = ai.defineFlow(
  {
    name: 'summarizeThreatReportFlow',
    inputSchema: SummarizeThreatReportInputSchema,
    outputSchema: SummarizeThreatReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeThreatReportPrompt(input);
    return output!;
  }
);
