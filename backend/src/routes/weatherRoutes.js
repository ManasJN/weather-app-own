import { Router } from 'express';
import { getCurrentWeatherByCity, getFiveDayForecastByCity, getWeatherSnapshot } from '../services/weatherService.js';
import { answerWeatherQuestion } from '../services/aiService.js';
import { HttpError } from '../utils/httpError.js';

const router = Router();

const ensureCity = (city) => {
  if (!city || !city.trim()) {
    throw new HttpError(400, 'City name is required.');
  }

  return city.trim();
};

router.get('/weather', async (req, res, next) => {
  try {
    const city = ensureCity(req.query.city);
    const weather = await getCurrentWeatherByCity(city);
    res.json({ data: weather });
  } catch (error) {
    next(error);
  }
});

router.get('/forecast', async (req, res, next) => {
  try {
    const city = ensureCity(req.query.city);
    const forecast = await getFiveDayForecastByCity(city);
    res.json({ data: forecast });
  } catch (error) {
    next(error);
  }
});

router.post('/ask', async (req, res, next) => {
  try {
    const city = ensureCity(req.body.city);
    const question = req.body.question?.trim();

    if (!question) {
      throw new HttpError(400, 'Question is required.');
    }

    const snapshot = await getWeatherSnapshot(city);
    const answer = await answerWeatherQuestion({ city, question, weather: snapshot });

    res.json({
      data: {
        answer,
        city,
        question
      }
    });
  } catch (error) {
    next(error);
  }
});

export default router;
