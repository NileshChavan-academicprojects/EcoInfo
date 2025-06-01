
'use server';
/**
 * @fileOverview A tool to simulate fetching current weather data.
 *
 * - getCurrentWeatherTool - A Genkit tool that returns mock weather data for a given location.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GetCurrentWeatherInputSchema = z.object({
  location: z.string().describe('The city or area for which to get the weather forecast (e.g., "London" or "Paris, FR").'),
});
export type GetCurrentWeatherInput = z.infer<typeof GetCurrentWeatherInputSchema>;

export const GetCurrentWeatherOutputSchema = z.object({
  location: z.string().describe('The location for which the weather was "fetched".'),
  temperature: z.number().describe('The current temperature in Celsius.'),
  description: z.string().describe('A brief description of the weather conditions (e.g., "Sunny", "Cloudy").'),
  humidity: z.number().describe('The current humidity percentage (0-100).'),
  windSpeed: z.number().describe('The current wind speed in km/h.'),
  unit: z.string().describe('The unit for temperature, e.g. Celsius or Fahrenheit. Default to Celsius').optional(),
});
export type GetCurrentWeatherOutput = z.infer<typeof GetCurrentWeatherOutputSchema>;

// Mock weather data for a few locations
const mockWeatherData: Record<string, GetCurrentWeatherOutput> = {
  'london': { location: 'London, UK', temperature: 15, description: 'Cloudy with a chance of rain', humidity: 70, windSpeed: 10, unit: 'Celsius' },
  'paris': { location: 'Paris, FR', temperature: 18, description: 'Partly sunny', humidity: 60, windSpeed: 5, unit: 'Celsius' },
  'new york': { location: 'New York, US', temperature: 22, description: 'Sunny and clear', humidity: 50, windSpeed: 8, unit: 'Celsius' },
  'tokyo': { location: 'Tokyo, JP', temperature: 20, description: 'Overcast', humidity: 80, windSpeed: 12, unit: 'Celsius' },
  'sydney': { location: 'Sydney, AU', temperature: 25, description: 'Clear skies', humidity: 55, windSpeed: 15, unit: 'Celsius' },
};

export const getCurrentWeatherTool = ai.defineTool(
  {
    name: 'getCurrentWeather',
    description: 'Gets the current weather conditions for a specified location. Returns temperature in Celsius by default.',
    inputSchema: GetCurrentWeatherInputSchema,
    outputSchema: GetCurrentWeatherOutputSchema,
  },
  async (input) => {
    const locationKey = input.location.toLowerCase().split(',')[0].trim(); // Simple key generation
    
    // Return mock data if available, otherwise generate some plausible random data
    if (mockWeatherData[locationKey]) {
      return mockWeatherData[locationKey];
    }

    // Fallback to "random" mock data if location not in predefined set
    const randomTemp = Math.floor(Math.random() * 25) + 5; // Temp between 5 and 30 C
    const descriptions = ['Sunny', 'Cloudy', 'Partly Cloudy', 'Rainy', 'Windy'];
    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomHumidity = Math.floor(Math.random() * 50) + 30; // Humidity between 30% and 80%
    const randomWind = Math.floor(Math.random() * 20) + 5; // Wind speed between 5 and 25 km/h

    return {
      location: input.location,
      temperature: randomTemp,
      description: randomDesc,
      humidity: randomHumidity,
      windSpeed: randomWind,
      unit: 'Celsius'
    };
  }
);
