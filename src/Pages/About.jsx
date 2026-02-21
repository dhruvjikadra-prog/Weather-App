import React, {useState, useEffect} from "react";
import Navbar from "../components/Navbar";

function About() {

    const [theme, setTheme] = useState("dark");
    useEffect(() => {
            const savedTheme = localStorage.getItem("theme");
            if (savedTheme) {
                setTheme(savedTheme);
                document.body.className = savedTheme;
            }
        }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        document.body.className = newTheme;
        localStorage.setItem("theme", newTheme);
    };

    return (
        <div className="about-wrapper text-white py-5">

            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <div className="container">

                {/* Page Title */}
                <div className="text-center mb-5 mt-5">
                    <h1 className="fw-bold">
                        <i className="fas fa-cloud-sun me-2 text-warning"></i>
                        About ProWeather
                    </h1>
                    <p className="opacity-75">
                        A modern and responsive weather dashboard built with React.
                    </p>
                </div>

                {/* About Section */}
                <div className="row align-items-center mb-5">
                    <div className="col-md-6 mb-4">
                        <h3 className="fw-semibold mb-3">
                            <i className="fas fa-info-circle me-2 text-warning"></i>
                            What is ProWeather?
                        </h3>
                        <p>
                            ProWeather is a real-time weather application that provides
                            accurate weather updates, 5-day forecasts, air quality index,
                            and hourly insights using live API data.
                        </p>
                        <p>
                            Developed as part of Internship Program 2026 to demonstrate
                            practical knowledge of React, API integration, and responsive UI.
                        </p>
                    </div>

                    <div className="col-md-6 text-center">
                        <i className="fas fa-cloud-sun fa-7x text-warning"></i>
                    </div>
                </div>

                {/* Features Section */}
                <div className="row text-center mb-5">
                    <h3 className="fw-semibold mb-4">
                        <i className="fas fa-star me-2 text-warning"></i>
                        Key Features
                    </h3>

                    <div className="col-md-3 mb-4">
                        <div className="about-feature-card">
                            <i className="fas fa-map-marker-alt fa-2x mb-3 text-warning"></i>
                            <h6>Live Location</h6>
                            <p className="small opacity-75">
                                Auto-detect user location instantly.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="about-feature-card">
                            <i className="fas fa-chart-line fa-2x mb-3 text-warning"></i>
                            <h6>5-Day Forecast</h6>
                            <p className="small opacity-75">
                                Detailed multi-day weather prediction.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="about-feature-card">
                            <i className="fas fa-wind fa-2x mb-3 text-warning"></i>
                            <h6>Air Quality</h6>
                            <p className="small opacity-75">
                                Real-time AQI monitoring system.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-3 mb-4">
                        <div className="about-feature-card">
                            <i className="fas fa-moon fa-2x mb-3 text-warning"></i>
                            <h6>Dark Mode</h6>
                            <p className="small opacity-75">
                                Toggle between light and dark themes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="text-center">
                    <h3 className="fw-semibold mb-3">
                        <i className="fas fa-code me-2 text-warning"></i>
                        Tech Stack
                    </h3>
                    <p className="opacity-75">
                        <i className="fab fa-react me-2 text-info"></i> React.js |
                        <i className="fas fa-cloud me-2 ms-2 text-warning"></i> OpenWeather API |
                        <i className="fab fa-bootstrap me-2 ms-2 text-purple"></i> Bootstrap |
                        <i className="fab fa-github me-2 ms-2"></i> GitHub
                    </p>
                </div>

            </div>
        </div>
    );
}

export default About;