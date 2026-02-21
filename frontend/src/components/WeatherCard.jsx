const WeatherCard = ({ weather }) => {
  if (!weather) {
    return null;
  }

  return (
    <section className="card">
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <p className="condition">{weather.description}</p>
      <div className="metrics">
        <div>
          <span>Temperature</span>
          <strong>{Math.round(weather.temperature)}°C</strong>
        </div>
        <div>
          <span>Humidity</span>
          <strong>{weather.humidity}%</strong>
        </div>
        <div>
          <span>Wind</span>
          <strong>{weather.windSpeed} m/s</strong>
        </div>
        <div>
          <span>Feels Like</span>
          <strong>{Math.round(weather.feelsLike)}°C</strong>
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
