function HourlyForecast({ data }) {
    if (!data || data.length === 0) return null;

    // Take first 8 time-based entries directly
    const hourlyData = data.slice(0, 8);

    return (
        <div className="hourly-container">
            <h4 className="hourly-title">Next 24 Hours Forecast</h4>

            <div className="hourly-scroll">
                {hourlyData.map((hour, index) => {
                    const time = new Date(hour.dt * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    });

                    const nowHour = new Date().getHours();
                    const cardHour = new Date(hour.dt * 1000).getHours();

                    return (
                        <div key={index} className={`hour-card ${nowHour === cardHour ? "active-hour" : ""}`}>
                            <p className="hour-time">{time}</p>

                            <img
                                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                                alt="icon"
                                className="hour-icon"
                            />

                            <p className="hour-temp">
                                {Math.round(hour.main.temp)}°C
                            </p>

                            <p className="hour-desc">
                                {hour.weather[0].main}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HourlyForecast;
