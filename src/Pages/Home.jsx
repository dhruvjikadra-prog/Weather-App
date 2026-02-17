import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import earthVideo from "../assets/earth.mp4";
import "../assets/Home.css";

function Home() {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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

        } catch (err) {
            setError("Unable to fetch weather");
        } finally {
            setLoading(false);
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

                <div className="dashboard-container">

                    <div className="dashboard-left">
                        <h1 className="app-title">🌤 Weather Dashboard</h1>
                        <p className="subtitle">
                            Real-time weather insights at your fingertips
                        </p>

                        <SearchBar onSearch={handleSearch} />

                        <button
                            className="detect-btn"
                            onClick={() => window.location.reload()}
                        >
                            <i className="fas fa-location-crosshairs"></i> Detect My Location
                        </button>

                        {loading && <div className="loader"></div>}
                        {error && (
                            <p className="error">
                                <i className="fas fa-circle-exclamation"></i> {error}
                            </p>
                        )}
                    </div>

                    <div className="dashboard-right">
                        {weather && <WeatherCard weather={weather} />}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Home;
