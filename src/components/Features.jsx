function Features() {
    return (
        <section className="features-section py-5 text-white">
            <div className="container">
                <div className="text-center mb-5">
                    <h2 className="section-title">Our Features</h2>
                    <p className="section-subtitle">
                        Everything you need for accurate and real-time weather updates.
                    </p>
                </div>

                <div className="row g-4">

                    <div className="col-md-6 col-lg-3">
                        <div className="feature-card">
                            <i className="fas fa-map-marker-alt feature-icon"></i>
                            <h5>Auto Location</h5>
                            <p>Detect your current location automatically and show live weather data instantly.</p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="feature-card">
                            <i className="fas fa-calendar-alt feature-icon"></i>
                            <h5>5-Day Forecast</h5>
                            <p>Get detailed 5-day weather forecast with temperature, humidity & wind data.</p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="feature-card">
                            <i className="fas fa-wind feature-icon"></i>
                            <h5>Air Quality Index</h5>
                            <p>Monitor real-time AQI levels and stay aware of pollution conditions.</p>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <div className="feature-card">
                            <i className="fas fa-bolt feature-icon"></i>
                            <h5>Fast & Accurate</h5>
                            <p>Powered by OpenWeather API for highly accurate and up-to-date weather insights.</p>
                        </div>
                    </div>

                </div>
            </div>

            <section className="why-section py-5 text-white">
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-6">
                            <h2 className="section-title mb-4">Why Choose ProWeather?</h2>
                            <ul className="why-list">
                                <li>✔ Real-time updates</li>
                                <li>✔ Clean and modern interface</li>
                                <li>✔ Detailed AQI information</li>
                                <li>✔ Mobile responsive design</li>
                                <li>✔ Secure premium forecast system</li>
                            </ul>
                        </div>

                        <div className="col-lg-6 text-center">
                            <i className="fas fa-cloud-sun-rain why-icon"></i>
                        </div>

                    </div>
                </div>
            </section>

        </section>


    );
}

export default Features;
