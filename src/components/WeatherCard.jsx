import { useState, useEffect } from "react";

function WeatherCard({ weather, aqi }) {

  const {
    name,
    main,
    weather: weatherInfo,
    wind,
    sys,
    visibility
  } = weather;

  const [animatedTemp, setAnimatedTemp] = useState(0);
  const temp = Math.round(weather.main.temp);
  const condition = weather.weather[0].main.toLowerCase();
  const iconCode = weather.weather[0].icon;
  const sunrise = new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const sunset = new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

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

  const getAQICategory = (value) => {
    if (value <= 50) return "Good";
    if (value <= 100) return "Moderate";
    if (value <= 150) return "Unhealthy (Sensitive)";
    if (value <= 200) return "Unhealthy";
    if (value <= 300) return "Very Unhealthy";
    return "Hazardous";
  };

  useEffect(() => {
    let start = 0;
    const end = temp;
    const duration = 800;
    const incrementTime = 20;
    const step = Math.ceil(end / (duration / incrementTime));

    const counter = setInterval(() => {
      start += step;
      if (start >= end) {
        start = end;
        clearInterval(counter);
      }
      setAnimatedTemp(start);
    }, incrementTime);

    return () => clearInterval(counter);
  }, [temp]);

  return (
    <div key={weather.name} className="weather-card">

      <div className={`weather-icon ${getIconClass()}`}>
        <img
          src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt="weather icon"
        />
      </div>

      <h2>{weather.name}</h2>

      <h1 className={`temperature ${getTempClass()}`}>
        <i className="fas fa-temperature-high"></i> {animatedTemp}°C
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

      <div className="sun-times">
        <span>
          <i className="fas fa-sun"></i> {sunrise}
        </span>
        <span>
          <i className="fas fa-moon"></i> {sunset}
        </span>
      </div>

      {aqi && (
        <div className="aqi-section">
          <div className="aqi-box">
            <span className="aqi-number">{aqi}</span>
            <span className="aqi-text">{getAQICategory(aqi)}</span>
          </div>
        </div>
      )}

      {/* EXTRA WEATHER DETAILS */}
      <div className="extra-details">
        <div className="extra-box">
          <i className="fas fa-temperature-high"></i>
          <span>Feels Like: {Math.round(main.feels_like)}°C</span>
        </div>

        <div className="extra-box">
          <i className="fas fa-gauge"></i>
          <span>Pressure: {main.pressure} hPa</span>
        </div>

        <div className="extra-box">
          <i className="fas fa-eye"></i>
          <span>Visibility: {(visibility / 1000).toFixed(1)} km</span>
        </div>
      </div>

    </div>
  );
}

export default WeatherCard;
