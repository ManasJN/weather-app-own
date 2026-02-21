const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

const ForecastList = ({ forecast }) => {
  if (!forecast?.length) {
    return null;
  }

  return (
    <section className="card">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecast.map((item) => (
          <article key={item.date} className="forecast-item">
            <p>{formatDate(item.date)}</p>
            <strong>
              {Math.round(item.maxTemp)}° / {Math.round(item.minTemp)}°
            </strong>
            <small>{item.description}</small>
          </article>
        ))}
      </div>
    </section>
  );
};

export default ForecastList;
