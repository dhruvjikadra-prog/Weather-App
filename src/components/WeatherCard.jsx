function WeatherCard({ weather }) {
  const temp = Math.round(weather.main.temp);
  const condition = weather.weather[0].main.toLowerCase();
  const iconCode = weather.weather[0].icon;

  const getTempClass = () => {
    if (temp <= 10) return "cold";
    if (temp > 10 && temp <= 25) return "normal";
    if (temp > 25 && temp <= 35) return "hot";
    return "very-hot";
  };

  const getIconClass = () => {
    if (condition.includes("clear")) return "sun";
    if (condition.includes("cloud")) return "cloud";
    if (condition.includes("rain")) return "rain";
    if (condition.includes("snow")) return "snow";
    return "";
  };

  return (
    <div className="weather-card">

      <div className={`weather-icon ${getIconClass()}`}>
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt="weather icon"
        />
      </div>

      <h2>{weather.name}</h2>

      <h1 className={`temperature ${getTempClass()}`}>
        <i className="fas fa-temperature-high"></i> {temp}°C
      </h1>

      <p className="description">
        {weather.weather[0].description}
      </p>

      <div className="details">
        <span>
          <i className="fas fa-droplet"></i> {weather.main.humidity}%
        </span>
        <span>
          <i className="fas fa-wind"></i> {weather.wind.speed} km/h
        </span>
      </div>

    </div>
  );
}

export default WeatherCard;
