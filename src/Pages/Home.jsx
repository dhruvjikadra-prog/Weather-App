import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import Forecast from "../components/Forecast";
import Features from "../components/Features";
import Footer from "../components/Footer";
import earthVideo from "../assets/earth.mp4";
import "../assets/Home.css";

function Home() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [forecast, setForecast] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [aqi, setAqi] = useState(null);

    useEffect(() => {
        const loginStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loginStatus === "true");
    }, []);

    // Single Weather Fetch Function
    const fetchWeatherByCoords = async (lat, lon) => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=26dceb95ee8945f2f49e630a950d219e&units=metric`
            );

            if (!response.ok) throw new Error("Weather fetch failed");

            const data = await response.json();
            setWeather(data);
            fetchAQI(data.coord.lat, data.coord.lon);
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
                `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=26dceb95ee8945f2f49e630a950d219e&units=metric`
            );

            if (!response.ok) throw new Error("Forecast fetch failed");

            const data = await response.json();

            // Get one forecast per day
            const dailyData = data.list.filter((item, index) => index % 8 === 0);
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
                `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=26dceb95ee8945f2f49e630a950d219e`
            );

            const data = await response.json();

            const pm25 = data.list[0].components.pm2_5;

            const calculatedAQI = calculateAQI(pm25);

            setAqi(calculatedAQI);

        } catch (err) {
            console.log("AQI fetch error");
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
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=26dceb95ee8945f2f49e630a950d219e&units=metric`
            );

            if (!response.ok) throw new Error("City not found");

            const data = await response.json();
            setWeather(data);
            fetchForecast(data.name);
            fetchAQI(data.coord.lat, data.coord.lon);

        } catch (err) {
            setError(err.message);
            setWeather(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home-wrapper">

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

            {/* PARTICLES */}
            <div className="particles">
                <span></span><span></span><span></span><span></span><span></span>
            </div>

            {/* CONTENT */}
            <div className="overlay">

                <Navbar />

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
                                className="d-flex mb-3"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSearch(e.target.city.value);
                                }}
                            >
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control rounded-start-pill"
                                    placeholder="Enter city name"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-warning rounded-end-pill px-4"
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>

                            <button
                                className="btn btn-outline-warning rounded-pill px-4"
                                onClick={() => window.location.reload()}
                            >
                                <i className="fas fa-location-crosshairs me-2"></i>
                                Detect My Location
                            </button>
                        </div>

                        {/* RIGHT SIDE WEATHER CARD */}
                        <div className="col-lg-6 d-flex justify-content-center align-items-start">
                            {weather && <WeatherCard weather={weather} aqi={aqi} />}
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
                                                        alt="icon"
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
                                            🔒 Login to unlock full 5-day forecast
                                        </p>
                                        <button
                                            className="btn btn-warning rounded-pill px-4"
                                            onClick={() => window.location.href = "/login"}
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
