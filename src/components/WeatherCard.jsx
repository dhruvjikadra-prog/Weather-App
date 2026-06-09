import { useState, useEffect } from "react";

function WeatherCard({ weather, aqi }) {

  const {
    name,
    main,
    weather: weatherInfo,
    wind,
    sys,
    visibility,
    clouds,
  } = weather;

  const [animatedTemp, setAnimatedTemp] = useState(0);
  const temp = Math.round(main.temp);
  const condition = weatherInfo[0].main.toLowerCase();
  const iconCode = weatherInfo[0].icon;

  const sunrise = new Date(sys.sunrise * 1000).toLocaleTimeString([], {
    hour: "2-digit", minute: "2-digit",
  });
  const sunset = new Date(sys.sunset * 1000).toLocaleTimeString([], {
    hour: "2-digit", minute: "2-digit",
  });

  /* ── temperature colour ── */
  const getTempClass = () => {
    if (temp <= 0) return "freezing";
    if (temp <= 10) return "cold";
    if (temp <= 20) return "cool";
    if (temp <= 28) return "normal";
    if (temp <= 35) return "hot";
    return "very-hot";
  };

  /* ── icon animation class ── */
  const getIconClass = () => {
    if (condition.includes("clear")) return "sun";
    if (condition.includes("cloud")) return "cloud";
    if (condition.includes("rain") || condition.includes("drizzle")) return "rain";
    if (condition.includes("snow")) return "snow";
    if (condition.includes("thunder")) return "storm";
    return "";
  };

  /* ── AQI helpers ── */
  const getAQICategory = (value) => {
    if (value <= 50) return { label: "Good", color: "#34d399" };
    if (value <= 100) return { label: "Moderate", color: "#fcd34d" };
    if (value <= 150) return { label: "Unhealthy (Sensitive)", color: "#fb923c" };
    if (value <= 200) return { label: "Unhealthy", color: "#f87171" };
    if (value <= 300) return { label: "Very Unhealthy", color: "#c084fc" };
    return { label: "Hazardous", color: "#be123c" };
  };

  /* ── wind direction degrees → compass ── */
  const getWindDir = (deg) => {
    const dirs = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return dirs[Math.round((deg ?? 0) / 45) % 8];
  };

  /* ── dew point approx ── */
  const dewPoint = Math.round(
    main.temp - ((100 - main.humidity) / 5)
  );

  /* ── animated counter ── */
  useEffect(() => {
    setAnimatedTemp(0);
    let v = 0; const end = temp;
    const id = setInterval(() => {
      v += Math.ceil(end / 35);
      if (v >= end) { v = end; clearInterval(id); }
      setAnimatedTemp(v);
    }, 20);
    return () => clearInterval(id);
  }, [temp]);

  const aqiInfo = aqi ? getAQICategory(aqi) : null;
  const aqiBarPct = aqi ? Math.min((aqi / 300) * 100, 100) : 0;

  return (
    <div className={`weather-card wcard-cond-${getIconClass()}`}>

      {/* ── Header: city + country + date ── */}
      <div className="wc-header">
        <div className="wc-location">
          <i className="fas fa-location-dot wc-loc-icon"></i>
          <div>
            <h2 className="wc-city">{name}
              <span className="wc-country">{sys.country}</span>
            </h2>
            <p className="wc-date">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric"
              })}
            </p>
          </div>
        </div>

        {/* condition badge */}
        <div className="wc-cond-badge">
          <div className={`weather-icon ${getIconClass()}`}>
            <img
              src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
              alt={weatherInfo[0].description}
              className="wc-icon"
            />
          </div>
        </div>
      </div>

      {/* ── Temperature ── */}
      <div className="wc-temp-row">
        <h1 className={`temperature ${getTempClass()}`}>
          {animatedTemp}
          <span className="wc-degree">°C</span>
        </h1>
        <div className="wc-temp-meta">
          <span className="wc-feels">
            <i className="fas fa-temperature-three-quarters"></i>
            Feels {Math.round(main.feels_like)}°
          </span>
          <span className="wc-desc">{weatherInfo[0].description}</span>
          <span className="wc-hilow">
            <span className="wc-hi"><i className="fas fa-arrow-up"></i>{Math.round(main.temp_max)}°</span>
            <span className="wc-lo"><i className="fas fa-arrow-down"></i>{Math.round(main.temp_min)}°</span>
          </span>
        </div>
      </div>

      {/* ── Primary Stats ── */}
      <div className="wc-stats">
        <div className="wc-stat">
          <i className="fas fa-droplet"></i>
          <span>{main.humidity}%</span>
          <small>Humidity</small>
        </div>
        <div className="wc-stat-sep"></div>
        <div className="wc-stat">
          <i className="fas fa-wind"></i>
          <span>{Math.round(wind.speed)} <em>km/h</em></span>
          <small>{getWindDir(wind.deg)}</small>
        </div>
        <div className="wc-stat-sep"></div>
        <div className="wc-stat">
          <i className="fas fa-gauge-simple-high"></i>
          <span>{main.pressure}</span>
          <small>hPa</small>
        </div>
        <div className="wc-stat-sep"></div>
        <div className="wc-stat">
          <i className="fas fa-eye"></i>
          <span>{((visibility ?? 10000) / 1000).toFixed(1)}</span>
          <small>km vis</small>
        </div>
      </div>

      {/* ── Sunrise / Sunset ── */}
      <div className="sun-times">
        <span>
          <i className="fas fa-sun"></i> {sunrise}
          <em>Sunrise</em>
        </span>
        <div className="sun-arc">
          <div className="sun-arc-track">
            <div className="sun-arc-fill"></div>
            <span className="sun-arc-dot">☀</span>
          </div>
        </div>
        <span>
          <i className="fas fa-moon"></i> {sunset}
          <em>Sunset</em>
        </span>
      </div>

      {/* ── AQI Section ── */}
      {aqi && aqiInfo && (
        <div className="aqi-section-wrap">
          <div className="aqi-box" style={{ borderColor: `${aqiInfo.color}44` }}>
            <div className="aqi-left">
              <i className="fas fa-leaf" style={{ color: aqiInfo.color }}></i>
              <div>
                <span className="aqi-number" style={{ color: aqiInfo.color }}>{aqi}</span>
                <span className="aqi-label">AQI</span>
              </div>
            </div>
            <div className="aqi-right">
              <span className="aqi-text" style={{ color: aqiInfo.color }}>{aqiInfo.label}</span>
              <div className="aqi-bar-track">
                <div
                  className="aqi-bar-fill"
                  style={{
                    width: `${aqiBarPct}%`,
                    background: `linear-gradient(90deg, #34d399, ${aqiInfo.color})`
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Extra Details Grid ── */}
      <div className="extra-details">
        <div className="extra-box">
          <i className="fas fa-temperature-half"></i>
          <span>{Math.round(main.feels_like)}°C</span>
          <small>Feels Like</small>
        </div>
        <div className="extra-box">
          <i className="fas fa-gauge"></i>
          <span>{main.pressure}</span>
          <small>hPa</small>
        </div>
        <div className="extra-box">
          <i className="fas fa-cloud"></i>
          <span>{clouds?.all ?? 0}%</span>
          <small>Cloud Cover</small>
        </div>
        <div className="extra-box">
          <i className="fas fa-water"></i>
          <span>{dewPoint}°C</span>
          <small>Dew Point</small>
        </div>
        <div className="extra-box">
          <i className="fas fa-wind"></i>
          <span>{getWindDir(wind.deg)}</span>
          <small>Wind Dir</small>
        </div>
        <div className="extra-box">
          <i className="fas fa-eye"></i>
          <span>{((visibility ?? 10000) / 1000).toFixed(1)} km</span>
          <small>Visibility</small>
        </div>
      </div>

    </div>
  );
}

export default WeatherCard;