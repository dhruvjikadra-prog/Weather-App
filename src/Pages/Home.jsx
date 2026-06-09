import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import HourlyForecast from "../components/HourlyForecast";
import TemperatureChart from "../components/TempratureChart";
import Features from "../components/Features";
import Footer from "../components/Footer";
import earthVideo from "../assets/earth.mp4";
import "../assets/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [forecast, setForecast] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [aqi, setAqi] = useState(null);
    const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
    const [suggestions, setSuggestions] = useState([]);
    const [hourlyData, setHourlyData] = useState([]);
    const [aqiForecast, setAqiForecast] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);
    const [theme, setTheme] = useState("dark");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
            document.body.className = savedTheme;
        }
    }, []);

    const handleGo = () => {
        navigate('/login');
    }

    useEffect(() => {
        if (weather) {
            const condition = weather.weather[0].main.toLowerCase();

            let weatherClass = "";

            if (condition.includes("clear")) weatherClass = "clear-bg";
            else if (condition.includes("cloud")) weatherClass = "cloud-bg";
            else if (condition.includes("rain")) weatherClass = "rain-bg";
            else if (condition.includes("snow")) weatherClass = "snow-bg";
            else if (condition.includes("thunder")) weatherClass = "storm-bg";
            else weatherClass = "default-bg";

            document.body.classList.remove(
                "clear-bg",
                "cloud-bg",
                "rain-bg",
                "snow-bg",
                "storm-bg",
                "default-bg"
            );

            document.body.classList.add(weatherClass);
        }
    }, [weather]);

    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
    }, []);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                fetchCitySuggestions(searchTerm);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = () => {
            setSuggestions([]);
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        const saved = localStorage.getItem("recentCities");
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    const fetchCitySuggestions = async (value) => {
        if (value.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${API_KEY}`
            );
            const data = await response.json();
            setSuggestions(data);
        } catch (err) {
            console.log("Suggestion error");
        }
    };

    // Single Weather Fetch Function
    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) throw new Error("Unable to fetch weather data.");

            const data = await response.json();
            setWeather(data);
            fetchAQI(data.coord.lat, data.coord.lon);
            fetchAQIForecast(data.coord.lat, data.coord.lon);
            fetchForecast(data.name);

        } catch (err) {
            setError("Unable to fetch weather");
        } finally {
            setLoading(false);
        }
    };

    const fetchForecast = async (cityName) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
            );

            if (!response.ok) throw new Error("Forecast fetch failed");

            const data = await response.json();

            // 🔹 Full 3-hour interval data for hourly forecast
            setHourlyData(data.list);

            // 🔹 Filter only 12:00 PM for daily forecast cards
            const dailyData = data.list.filter(item =>
                item.dt_txt.includes("12:00:00")
            );

            setForecast(dailyData);

        } catch (err) {
            console.log(err);
        }
    };

    const calculateAQI = (pm25) => {
        if (pm25 <= 12) return Math.round((50 / 12) * pm25);
        if (pm25 <= 35.4) return Math.round(((100 - 51) / (35.4 - 12.1)) * (pm25 - 12.1) + 51);
        if (pm25 <= 55.4) return Math.round(((150 - 101) / (55.4 - 35.5)) * (pm25 - 35.5) + 101);
        if (pm25 <= 150.4) return Math.round(((200 - 151) / (150.4 - 55.5)) * (pm25 - 55.5) + 151);
        if (pm25 <= 250.4) return Math.round(((300 - 201) / (250.4 - 150.5)) * (pm25 - 150.5) + 201);
        return Math.round(((500 - 301) / (500.4 - 250.5)) * (pm25 - 250.5) + 301);
    };

    const fetchAQI = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );

            const data = await response.json();

            const pm25 = data.list[0].components.pm2_5;

            const calculatedAQI = calculateAQI(pm25);

            setAqi(calculatedAQI);

        } catch (err) {
            console.log("AQI fetch error");
        }
    };

    const fetchAQIForecast = async (lat, lon) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
            );

            const data = await response.json();

            // Take one AQI per day (same logic as forecast)
            const dailyAQI = data.list.filter((item, index) => index % 8 === 0);

            setAqiForecast(dailyAQI);

        } catch (err) {
            console.log("AQI forecast error");
        }
    };

    // Auto Detect Location with IP fallback
    useEffect(() => {

        const fetchByIP = async () => {
            try {
                const ipRes = await fetch("https://ipapi.co/json/");
                const ipData = await ipRes.json();
                fetchWeatherByCoords(ipData.latitude, ipData.longitude);
            } catch {
                setError("Could not detect location automatically.");
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherByCoords(
                        position.coords.latitude,
                        position.coords.longitude
                    );
                },
                () => {
                    fetchByIP();
                },
                {
                    timeout: 8000,
                    enableHighAccuracy: false
                }
            );
        } else {
            fetchByIP();
        }

    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
    };

    // Manual Search
    const handleSearch = async (city) => {
        city = city.trim();
        if (!city) {
            setError("Please enter a city name");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );

            if (response.status === 404)
                throw new Error("City not found. Please check spelling.");

            const data = await response.json();
            setWeather(data);
            fetchForecast(data.name);
            fetchAQI(data.coord.lat, data.coord.lon);
            fetchAQIForecast(data.coord.lat, data.coord.lon);

            // Save recent searches
            let updatedSearches = [
                city,
                ...recentSearches.filter(c => c.toLowerCase() !== city.toLowerCase())
            ];

            if (updatedSearches.length > 5) {
                updatedSearches = updatedSearches.slice(0, 5);
            }

            setRecentSearches(updatedSearches);
            localStorage.setItem("recentCities", JSON.stringify(updatedSearches));

        } catch (err) {
            setError(err.message);
            setWeather(null);
            setForecast([]);
            setHourlyData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-wrapper">

            {loading && !error && (
                <div className="loading-overlay">
                    <div className="loading-spinner"></div>
                    <p className="loading-text">Fetching Weather Data...</p>
                </div>
            )}

            {error && !loading && (
                <div className="error-overlay">
                    <div className="error-card">
                        <i className="fas fa-exclamation-triangle error-icon"></i>
                        <h4>Something Went Wrong</h4>
                        <p>{error}</p>

                        <button
                            className="btn btn-warning mt-3"
                            onClick={() => {
                                setError("");
                                setWeather(null);
                                setForecast([]);
                            }}
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}

            {/* VIDEO BACKGROUND */}
            <div className="video-container">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                    ref={(video) => {
                        if (video) video.playbackRate = 0.4;
                    }}
                >
                    <source src={earthVideo} type="video/mp4" />
                </video>
            </div>

            {weather && weather.weather[0].main.toLowerCase().includes("rain") && (
                <div className="rain-effect"></div>
            )}

            {weather && weather.weather[0].main.toLowerCase().includes("snow") && (
                <div className="snow-effect"></div>
            )}

            {/* CONTENT */}
            <div className="overlay">

                <Navbar theme={theme} toggleTheme={toggleTheme} />

                <div className="container py-5 mt-5">
                    <div className="row align-items-center">

                        {/* LEFT SIDE */}
                        <div className="col-lg-6 text-white content">
                            <h1 className="fw-bold mb-3">
                                <i className="fas fa-cloud-sun me-2"></i>
                                Weather Dashboard
                            </h1>
                            <p className="mb-4">Real-time weather insights at your fingertips</p>

                            {/* Bootstrap Form */}
                            <form
                                className="weather-search-form mb-3 position-relative"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch(e.target.city.value);
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        name="city"
                                        value={searchTerm}
                                        className="form-control rounded-start-pill"
                                        placeholder="Enter city name"
                                        autoComplete="off"
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-warning rounded-end-pill px-4"
                                    >
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>

                                {/* Suggestions */}
                                {suggestions.length > 0 && (
                                    <div className="suggestion-box">
                                        {suggestions.map((city, index) => (
                                            <div
                                                key={index}
                                                className="suggestion-item"
                                                onClick={() => {
                                                    setSearchTerm(city.name);
                                                    handleSearch(city.name);
                                                    setSuggestions([]);
                                                }}
                                            >
                                                {city.name}, {city.country}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </form>

                            {/* Recent Searches */}
                            {recentSearches.length > 0 && (
                                <div className="recent-searches mt-3">
                                    <h6 className="text-warning">Recent Searches</h6>
                                    <div className="recent-list">
                                        {recentSearches.map((city, index) => (
                                            <span
                                                key={index}
                                                className="recent-item"
                                                onClick={() => handleSearch(city)}
                                            >
                                                {city}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                className="btn btn-outline-warning rounded-pill px-4 mt-3"
                                onClick={() => {
                                    navigator.geolocation.getCurrentPosition((position) => {
                                        fetchWeatherByCoords(
                                            position.coords.latitude,
                                            position.coords.longitude
                                        );
                                    });
                                }}
                            >
                                <i className="fas fa-location-crosshairs me-2 mt-"></i>
                                Detect My Location
                            </button>
                        </div>

                        {/* RIGHT SIDE WEATHER CARD */}
                        <div className="col-lg-6">

                            {/* Weather Card */}
                            <div className="d-flex justify-content-center mb-4">
                                {!loading && weather && (
                                    <WeatherCard weather={weather} aqi={aqi} />
                                )}
                            </div>

                            {/* Hourly Forecast */}
                            {!loading && forecast.length > 0 && (
                                <HourlyForecast data={hourlyData} />
                            )}

                        </div>

                    </div>

                    {/* FORECAST SECTION */}
                    {forecast.length > 0 && (
                        <div className="row mt-5">
                            <div className="col-12">
                                <h4 className="text-white mb-4">5-Day Forecast</h4>

                                <div className="row g-4">
                                    {(isLoggedIn ? forecast.slice(0, 5) : forecast.slice(0, 2)).map(
                                        (day, index) => (
                                            <div className="col-6 col-md-4 col-lg-2" key={index}>
                                                <div className="forecast-card p-3">

                                                    <h6 className="forecast-day">
                                                        {new Date(day.dt_txt).toLocaleDateString("en-US", {
                                                            weekday: "short",
                                                        })}
                                                    </h6>

                                                    <img
                                                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                                        alt="weather icon"
                                                        className="forecast-icon"
                                                    />

                                                    <p className="forecast-temp">
                                                        {Math.round(day.main.temp)}°C
                                                    </p>

                                                    <p className="forecast-desc">
                                                        {day.weather[0].main}
                                                    </p>

                                                    <p className="forecast-rain">
                                                        <i className="fas fa-cloud-rain"></i>{" "}
                                                        {Math.round(day.pop * 100)}%
                                                    </p>

                                                    <div className="forecast-details">
                                                        <span>
                                                            <i className="fas fa-arrow-up"></i> {Math.round(day.main.temp_max)}°
                                                        </span>
                                                        <span>
                                                            <i className="fas fa-arrow-down"></i> {Math.round(day.main.temp_min)}°
                                                        </span>
                                                    </div>

                                                    <div className="forecast-extra">
                                                        <span>
                                                            <i className="fas fa-droplet"></i> {day.main.humidity}%
                                                        </span>
                                                        <span>
                                                            <i className="fas fa-wind"></i> {day.wind.speed} km/h
                                                        </span>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>

                                {!isLoggedIn && (
                                    <div className="text-center mt-4">
                                        <p className="text-warning">
                                            <i className="fas fa-lock"></i> Login to unlock full 5-day forecast
                                        </p>
                                        <button
                                            className="btn btn-warning rounded-pill px-4"
                                            onClick={handleGo}
                                        >
                                            Login Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {forecast.length > 0 && (
                        <div className="row mt-5">
                            <div className="col-12">

                                <h4 className="text-white mb-4">
                                    {isLoggedIn ? "5-Day Temperature Trend" : "2-Day Temperature Trend"}
                                </h4>

                                <TemperatureChart
                                    forecast={isLoggedIn ? forecast.slice(0, 5) : forecast.slice(0, 2)}
                                    aqiForecast={isLoggedIn ? aqiForecast.slice(0, 5) : aqiForecast.slice(0, 2)}
                                />

                                {!isLoggedIn && (
                                    <div className="text-center mt-4">
                                        <p className="text-warning">
                                            <i className="fas fa-lock"></i> Login to unlock full 5-day temperature chart
                                        </p>
                                        <button
                                            className="btn btn-warning rounded-pill px-4"
                                            onClick={handleGo}
                                        >
                                            Login Now
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>
                    )}


                </div>
                <Features />
                <Footer />
            </div>
        </div>
    );
}

export default Home;
