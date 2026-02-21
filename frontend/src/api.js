const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const request = async (endpoint, options = {}) => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || 'Request failed');
  }

  return payload.data;
};

export const fetchCurrentWeather = (city) => request(`/weather?city=${encodeURIComponent(city)}`);
export const fetchForecast = (city) => request(`/forecast?city=${encodeURIComponent(city)}`);
export const askWeatherAssistant = ({ city, question }) =>
  request('/ask', {
    method: 'POST',
    body: JSON.stringify({ city, question })
  });
