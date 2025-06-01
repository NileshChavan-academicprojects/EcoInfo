
import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-threat-report.ts';
import '@/ai/flows/generate-environmental-tips.ts';
import '@/ai/flows/get-weather-forecast-flow.ts'; // Added new flow
