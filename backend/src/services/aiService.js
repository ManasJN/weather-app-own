import OpenAI from 'openai';
import { config } from '../config.js';

const client = new OpenAI({ apiKey: config.openAiApiKey });

export const answerWeatherQuestion = async ({ city, question, weather }) => {
  const prompt = `You are a helpful weather assistant. Use only the provided weather data and avoid making up unknown facts. Keep answers short (max 4 sentences) and practical.\n\nCity: ${city}\nQuestion: ${question}\nCurrent Weather: ${JSON.stringify(weather.current)}\n5-Day Forecast: ${JSON.stringify(weather.forecast)}`;

  const completion = await client.chat.completions.create({
    model: config.openAiModel,
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: 'You answer weather-related questions based on provided JSON data.'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  });

  return completion.choices?.[0]?.message?.content?.trim() || 'I could not generate a weather insight right now.';
};
