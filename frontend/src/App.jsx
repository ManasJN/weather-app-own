import { useState } from 'react';
import { askWeatherAssistant, fetchCurrentWeather, fetchForecast } from './api';
import AIAssistant from './components/AIAssistant';
import ForecastList from './components/ForecastList';
import WeatherCard from './components/WeatherCard';
import './styles.css';

const App = () => {
  const [cityInput, setCityInput] = useState('Delhi');
  const [city, setCity] = useState('Delhi');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!cityInput.trim()) {
      return;
    }

    setLoadingWeather(true);
    setError('');

    try {
      const selectedCity = cityInput.trim();
      const [weatherResponse, forecastResponse] = await Promise.all([
        fetchCurrentWeather(selectedCity),
        fetchForecast(selectedCity)
      ]);

      setCity(selectedCity);
      setWeather(weatherResponse);
      setForecast(forecastResponse);
      setAnswer('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingWeather(false);
    }
  };

  const handleAsk = async (question) => {
    setLoadingAi(true);
    setError('');

    try {
      const response = await askWeatherAssistant({ city, question });
      setAnswer(response.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <main className="container">
      <h1>AI Weather Forecast</h1>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search city"
          value={cityInput}
          onChange={(event) => setCityInput(event.target.value)}
        />
        <button type="submit" disabled={loadingWeather}>
          {loadingWeather ? 'Loading...' : 'Search'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      <WeatherCard weather={weather} />
      <ForecastList forecast={forecast} />

      <AIAssistant city={city} onAsk={handleAsk} loading={loadingAi} />
      {answer && <section className="card ai-answer">{answer}</section>}
    </main>
  );
};

export default App;
