// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview Generates environmental protection tips based on threat level alerts.
 *
 * - generateEnvironmentalTips - A function that generates tips for protecting the environment.
 * - GenerateEnvironmentalTipsInput - The input type for the generateEnvironmentalTips function.
 * - GenerateEnvironmentalTipsOutput - The return type for the generateEnvironmentalTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEnvironmentalTipsInputSchema = z.object({
  threatLevel: z
    .string()
    .describe("The threat level in the user's area (e.g., high, medium, low)."),
  threatType: z
    .string()
    .describe('The type of environmental threat (e.g., deforestation, pollution).'),
  location: z.string().describe('The location of the user (e.g., city, region).'),
});
export type GenerateEnvironmentalTipsInput = z.infer<
  typeof GenerateEnvironmentalTipsInputSchema
>;

const GenerateEnvironmentalTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of tips for protecting the environment.'),
});
export type GenerateEnvironmentalTipsOutput = z.infer<
  typeof GenerateEnvironmentalTipsOutputSchema
>;

export async function generateEnvironmentalTips(
  input: GenerateEnvironmentalTipsInput
): Promise<GenerateEnvironmentalTipsOutput> {
  return generateEnvironmentalTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEnvironmentalTipsPrompt',
  input: {schema: GenerateEnvironmentalTipsInputSchema},
  output: {schema: GenerateEnvironmentalTipsOutputSchema},
  prompt: `You are an environmental expert. Based on the threat level, threat type, and location provided, generate a list of actionable tips for the user to help protect the environment.

Threat Level: {{{threatLevel}}}
Threat Type: {{{threatType}}}
Location: {{{location}}}

Tips:`, // The AI will complete this with the tips.
});

const generateEnvironmentalTipsFlow = ai.defineFlow(
  {
    name: 'generateEnvironmentalTipsFlow',
    inputSchema: GenerateEnvironmentalTipsInputSchema,
    outputSchema: GenerateEnvironmentalTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
