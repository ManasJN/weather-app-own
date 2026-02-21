import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: Number.parseInt(process.env.PORT || '5000', 10),
  openWeatherApiKey: process.env.OPENWEATHER_API_KEY,
  openAiApiKey: process.env.OPENAI_API_KEY,
  openWeatherBaseUrl: process.env.OPENWEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5',
  openAiModel: process.env.OPENAI_MODEL || 'gpt-4o-mini'
};

export const validateEnv = () => {
  const missing = [];

  if (!config.openWeatherApiKey) {
    missing.push('OPENWEATHER_API_KEY');
  }

  if (!config.openAiApiKey) {
    missing.push('OPENAI_API_KEY');
  }

  if (missing.length > 0) {
    console.warn(`Missing environment variables: ${missing.join(', ')}`);
  }
};
