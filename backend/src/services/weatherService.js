import { config } from '../config.js';

const buildUrl = (endpoint, params) => {
  const url = new URL(`${config.openWeatherBaseUrl}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  url.searchParams.set('appid', config.openWeatherApiKey);
  return url;
};

const mapCurrentWeather = (data) => ({
  city: data.name,
  country: data.sys?.country,
  temperature: data.main?.temp,
  feelsLike: data.main?.feels_like,
  humidity: data.main?.humidity,
  windSpeed: data.wind?.speed,
  condition: data.weather?.[0]?.main,
  description: data.weather?.[0]?.description,
  icon: data.weather?.[0]?.icon
});

const mapForecast = (data) => {
  const byDay = new Map();

  data.list?.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toISOString().split('T')[0];

    if (!byDay.has(dayKey)) {
      byDay.set(dayKey, []);
    }

    byDay.get(dayKey).push(item);
  });

  return Array.from(byDay.entries())
    .slice(0, 5)
    .map(([date, entries]) => {
      const midday = entries.reduce((prev, current) => {
        const prevHour = new Date(prev.dt * 1000).getHours();
        const currentHour = new Date(current.dt * 1000).getHours();
        return Math.abs(currentHour - 12) < Math.abs(prevHour - 12) ? current : prev;
      });

      const minTemp = Math.min(...entries.map((entry) => entry.main.temp_min));
      const maxTemp = Math.max(...entries.map((entry) => entry.main.temp_max));

      return {
        date,
        minTemp,
        maxTemp,
        humidity: midday.main.humidity,
        windSpeed: midday.wind.speed,
        condition: midday.weather?.[0]?.main,
        description: midday.weather?.[0]?.description,
        icon: midday.weather?.[0]?.icon
      };
    });
};

const requestOpenWeather = async (endpoint, params) => {
  const response = await fetch(buildUrl(endpoint, params));

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => ({}));
    const message = errorPayload?.message || 'Weather API request failed';
    const error = new Error(message);
    error.statusCode = response.status;
    throw error;
  }

  return response.json();
};

export const getCurrentWeatherByCity = async (city) => {
  const data = await requestOpenWeather('/weather', {
    q: city,
    units: 'metric'
  });

  return mapCurrentWeather(data);
};

export const getFiveDayForecastByCity = async (city) => {
  const data = await requestOpenWeather('/forecast', {
    q: city,
    units: 'metric'
  });

  return mapForecast(data);
};

export const getWeatherSnapshot = async (city) => {
  const [current, forecast] = await Promise.all([
    getCurrentWeatherByCity(city),
    getFiveDayForecastByCity(city)
  ]);

  return { current, forecast };
};
