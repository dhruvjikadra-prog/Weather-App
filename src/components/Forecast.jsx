import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Forecast.css";

/* ── helpers ── */
const fmtDay = (dtTxt) =>
  new Date(dtTxt).toLocaleDateString("en-US", { weekday: "short" });
const fmtDate = (dtTxt) =>
  new Date(dtTxt).toLocaleDateString("en-US", { month: "short", day: "numeric" });

function Forecast({ forecast }) {
  const [showFull, setShowFull] = useState(false);
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const MAX_GUEST = 2;
  const MAX_USER = 7;
  const displayMax = showFull ? MAX_USER : MAX_GUEST;

  const displayed = forecast.slice(0, isLoggedIn ? MAX_USER : displayMax);

  const handleViewMore = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      setShowFull(true);
    }
  };

  /* temps for the whole visible set (for mini bar scale) */
  const allTemps = displayed.map(d => Math.round(d.main.temp));
  const tempMin = Math.min(...allTemps);
  const tempMax = Math.max(...allTemps);
  const tempRange = tempMax - tempMin || 1;

  return (
    <div className="forecast-wrapper">

      {/* ── Section Header ── */}
      <div className="forecast-header">
        <div className="forecast-header-left">
          <span className="forecast-accent-bar"></span>
          <h4 className="forecast-section-title">
            <i className="fas fa-calendar-days"></i>
            {isLoggedIn ? `${forecast.slice(0, MAX_USER).length}-Day Forecast` : "Forecast"}
          </h4>
        </div>
        {isLoggedIn && !showFull && forecast.length > MAX_GUEST && (
          <span className="forecast-count-badge">
            {forecast.slice(0, MAX_USER).length} days
          </span>
        )}
      </div>

      {/* ── Cards Grid ── */}
      <div className="forecast-container">
        {displayed.map((day, index) => {
          const pop = Math.round((day.pop ?? 0) * 100);
          const temp = Math.round(day.main.temp);
          const tempHi = Math.round(day.main.temp_max);
          const tempLo = Math.round(day.main.temp_min);
          const humidity = day.main.humidity;
          const wind = Math.round(day.wind.speed);
          const barPct = ((temp - tempMin) / tempRange) * 100;
          const isLocked = !isLoggedIn && index >= MAX_GUEST;

          return (
            <div
              key={index}
              className={`forecast-card ${isLocked ? "forecast-card--locked" : ""} ${hovered === index ? "forecast-card--hovered" : ""}`}
              style={{ animationDelay: `${index * 0.08}s` }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => isLocked && navigate("/login")}
            >

              {/* Lock overlay */}
              {isLocked && (
                <div className="forecast-lock-overlay">
                  <i className="fas fa-lock"></i>
                  <span>Login to unlock</span>
                </div>
              )}

              {/* Day label */}
              <div className="forecast-day-wrap">
                <h6 className="forecast-day">{fmtDay(day.dt_txt)}</h6>
                <p className="forecast-date-sub">{fmtDate(day.dt_txt)}</p>
              </div>

              {/* Weather icon */}
              <div className="forecast-icon-wrap">
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="forecast-icon"
                />
              </div>

              {/* Temp */}
              <p className="forecast-temp">{temp}°C</p>
              <p className="forecast-desc">{day.weather[0].main}</p>

              {/* Temp mini-bar */}
              <div className="forecast-bar-wrap" title={`${tempLo}° – ${tempHi}°`}>
                <div
                  className="forecast-bar-fill"
                  style={{ width: `${barPct}%` }}
                ></div>
              </div>

              {/* Hi / Lo */}
              <div className="forecast-range">
                <span className="fc-hi">
                  <i className="fas fa-arrow-up"></i>{tempHi}°
                </span>
                <span className="fc-lo">
                  <i className="fas fa-arrow-down"></i>{tempLo}°
                </span>
              </div>

              {/* Rain chance */}
              <p className="forecast-rain">
                <i className="fas fa-cloud-rain"></i>
                {pop}%
              </p>

              {/* Extra row */}
              <div className="forecast-details">
                <span>
                  <i className="fas fa-droplet"></i> {humidity}%
                </span>
                <span>
                  <i className="fas fa-wind"></i> {wind}
                </span>
              </div>

            </div>
          );
        })}

        {/* Ghost "locked" cards for guests to show there's more */}
        {!isLoggedIn && !showFull &&
          Array.from({ length: Math.min(2, forecast.length - MAX_GUEST) }).map((_, i) => (
            <div
              key={`ghost-${i}`}
              className="forecast-card forecast-card--ghost"
              onClick={() => navigate("/login")}
            >
              <div className="forecast-ghost-inner">
                <i className="fas fa-lock"></i>
                <span>Login to see more</span>
              </div>
            </div>
          ))
        }
      </div>

      {/* ── CTA / View More ── */}
      {!isLoggedIn && (
        <div className="forecast-cta">
          <div className="forecast-cta-inner">
            <i className="fas fa-lock forecast-cta-icon"></i>
            <div>
              <p className="forecast-cta-title">Unlock Full {MAX_USER}-Day Forecast</p>
              <p className="forecast-cta-sub">
                Login to access extended forecasts with humidity, wind speed & precipitation.
              </p>
            </div>
            <button className="forecast-cta-btn" onClick={handleViewMore}>
              Login Now <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      )}

      {isLoggedIn && !showFull && forecast.length > MAX_GUEST && (
        <div className="forecast-show-more">
          <button className="forecast-show-btn" onClick={() => setShowFull(true)}>
            <i className="fas fa-chevron-down"></i>
            Show All {forecast.slice(0, MAX_USER).length} Days
          </button>
        </div>
      )}

    </div>
  );
}

export default Forecast;