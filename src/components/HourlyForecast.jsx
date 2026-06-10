import { useState } from "react";

function HourlyForecast({ data }) {
    const [showAll, setShowAll] = useState(false);

    if (!data || data.length === 0) return null;

    // First 8 slots normally; toggle reveals up to 16
    const visibleData = showAll ? data.slice(0, 16) : data.slice(0, 8);

    const hourShown = visibleData.length * 3;

    const nowHour = new Date().getHours();

    return (
        <div className="hourly-container">

            {/* ── Section Header ── */}
            <div className="hourly-header">
                <div className="hourly-header-left">
                    <span className="hourly-accent-bar"></span>
                    <h4 className="hourly-title">
                        <i className="fas fa-clock"></i>
                        Next {hourShown} Hours
                    </h4>
                </div>
                {data.length > 8 && (
                    <button
                        className="hourly-toggle-btn"
                        onClick={() => setShowAll(!showAll)}
                    >
                        {showAll ? (
                            <>
                                <i className="fas fa-chevron-up"></i>
                                Show Less
                            </>
                        ) : (
                            <>
                                <i className="fas fa-chevron-down"></i>
                                Show More
                            </>
                        )}
                    </button>
                )}
            </div>

            {/* ── Scrollable Strip ── */}
            <div className="hourly-scroll">
                {visibleData.map((hour, index) => {
                    const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    const cardHour = new Date(hour.dt * 1000).getHours();
                    const isNow = nowHour === cardHour;
                    const pop = Math.round((hour.pop ?? 0) * 100);
                    const windSpeed = Math.round(hour.wind?.speed ?? 0);
                    const feelsLike = Math.round(hour.main?.feels_like ?? hour.main?.temp);

                    return (
                        <div
                            key={index}
                            className={`hour-card ${isNow ? "active-hour" : ""}`}
                        >
                            {/* "Now" badge */}
                            {isNow && (
                                <span className="hour-now-badge">Now</span>
                            )}

                            {/* Time */}
                            <p className="hour-time">
                                {isNow ? "Now" : time}
                            </p>

                            {/* Weather icon */}
                            <div className="hour-icon-wrap">
                                <img
                                    src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                                    alt={hour.weather[0].description}
                                    className="hour-icon"
                                />
                            </div>

                            {/* Temperature */}
                            <p className="hour-temp">
                                {Math.round(hour.main.temp)}°C
                            </p>

                            {/* Condition */}
                            <p className="hour-desc">
                                {hour.weather[0].main}
                            </p>

                            {/* Feels like */}
                            <p className="hour-feels">
                                <i className="fas fa-temperature-three-quarters"></i>
                                {feelsLike}°
                            </p>

                            {/* Precipitation chance */}
                            {pop > 0 && (
                                <p className="hour-pop">
                                    <i className="fas fa-droplet"></i>
                                    {pop}%
                                </p>
                            )}

                            {/* Wind speed */}
                            <p className="hour-wind">
                                <i className="fas fa-wind"></i>
                                {windSpeed} <span className="hour-wind-unit">km/h</span>
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* ── Summary strip below scroll ── */}
            <div className="hourly-summary">
                <div className="hs-item">
                    <i className="fas fa-temperature-half"></i>
                    <span>
                        {Math.round(Math.max(...visibleData.map(h => h.main.temp)))}°
                        <em> / </em>
                        {Math.round(Math.min(...visibleData.map(h => h.main.temp)))}°
                    </span>
                    <small>Hi / Lo</small>
                </div>
                <div className="hs-divider"></div>
                <div className="hs-item">
                    <i className="fas fa-droplet"></i>
                    <span>{Math.max(...visibleData.map(h => Math.round((h.pop ?? 0) * 100)))}%</span>
                    <small>Max Rain</small>
                </div>
                <div className="hs-divider"></div>
                <div className="hs-item">
                    <i className="fas fa-wind"></i>
                    <span>{Math.round(Math.max(...visibleData.map(h => h.wind?.speed ?? 0)))} km/h</span>
                    <small>Max Wind</small>
                </div>
                <div className="hs-divider"></div>
                <div className="hs-item">
                    <i className="fas fa-eye"></i>
                    <span>{visibleData.length} slots</span>
                    <small>Shown</small>
                </div>
            </div>

        </div>
    );
}

export default HourlyForecast;