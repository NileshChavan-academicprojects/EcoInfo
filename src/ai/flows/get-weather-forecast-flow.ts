
'use server';
/**
 * @fileOverview A Genkit flow to get and describe the weather for a location.
 *
 * - getWeatherForecast - A function that uses a tool to get weather data and an LLM to describe it.
 * - GetWeatherForecastInput - The input type for the getWeatherForecast function.
 * - GetWeatherForecastOutput - The return type for the getWeatherForecast function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {getCurrentWeatherTool, GetCurrentWeatherInputSchema} from '@/ai/tools/get-current-weather-tool';

// Re-exporting the input schema if it's identical and meant to be used directly
export const GetWeatherForecastInputSchema = GetCurrentWeatherInputSchema;
export type GetWeatherForecastInput = z.infer<typeof GetWeatherForecastInputSchema>;

export const GetWeatherForecastOutputSchema = z.object({
  forecast: z.string().describe('A human-readable weather forecast summary.'),
  rawTemperature: z.number().optional().describe('The raw temperature value.'),
  rawDescription: z.string().optional().describe('The raw weather condition description.'),
  rawHumidity: z.number().optional().describe('The raw humidity percentage.'),
  rawWindSpeed: z.number().optional().describe('The raw wind speed.'),
  unit: z.string().optional().describe('The unit for temperature'),
});
export type GetWeatherForecastOutput = z.infer<typeof GetWeatherForecastOutputSchema>;

export async function getWeatherForecast(input: GetWeatherForecastInput): Promise<GetWeatherForecastOutput> {
  return getWeatherForecastFlow(input);
}

const weatherPrompt = ai.definePrompt({
  name: 'weatherForecastPrompt',
  input: {schema: GetWeatherForecastInputSchema},
  output: {schema: GetWeatherForecastOutputSchema},
  tools: [getCurrentWeatherTool],
  prompt: `You are a helpful weather assistant.
  Use the getCurrentWeather tool to fetch the current weather conditions for the user's specified location: {{{location}}}.
  Once you have the weather data from the tool, provide a concise, friendly, and informative summary of the current weather conditions.
  Mention the temperature, what it feels like (e.g., "a bit chilly", "pleasantly warm"), the general conditions (e.g., "sunny spells", "overcast skies"), humidity, and wind.
  Also include the raw weather data from the tool in the output fields: rawTemperature, rawDescription, rawHumidity, rawWindSpeed, and unit.
  If the tool provides a unit for temperature, make sure to include it in your description and the raw output. Default to Celsius if not specified.
  Example: "Currently in London, it's 15°C and feels a bit chilly. Expect cloudy skies with a chance of rain. Humidity is at 70% and the wind is blowing at 10 km/h."
  `,
});

const getWeatherForecastFlow = ai.defineFlow(
  {
    name: 'getWeatherForecastFlow',
    inputSchema: GetWeatherForecastInputSchema,
    outputSchema: GetWeatherForecastOutputSchema,
  },
  async (input) => {
    const {output} = await weatherPrompt(input);
    if (!output) {
      throw new Error("Could not generate weather forecast.");
    }
    // The LLM should directly populate the output schema, including raw data fields
    return output;
  }
);
