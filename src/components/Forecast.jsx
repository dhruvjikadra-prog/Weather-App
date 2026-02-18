import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/Forecast.css";

function Forecast({ forecast }) {
  const [showFull, setShowFull] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleViewMore = () => {
    if (!isLoggedIn) {
      navigate("/login"); // redirect to login page
    } else {
      setShowFull(true);
    }
  };

  // Show only 2 days initially
  const displayedForecast = showFull ? forecast : forecast.slice(0, 2);

  return (
    <div className="forecast-wrapper">

      <div className="forecast-container">
        {displayedForecast.map((day, index) => (
          <div className="forecast-card" key={index}>
            <h4>
              {new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short"
              })}
            </h4>

            <img
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="icon"
            />

            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        ))}
      </div>

      {!showFull && (
        <button className="view-more-btn" onClick={handleViewMore}>
          View 5 Day Forecast
        </button>
      )}

    </div>
  );
}

export default Forecast;
