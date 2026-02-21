import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

function TemperatureChart({ forecast }) {

    const [visible, setVisible] = useState({
        temp: true,
        humidity: true,
        wind: true,
        aqi: true
    });

    if (!forecast || forecast.length === 0) return null;

    const labels = forecast.map(day =>
        new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "short" })
    );

    const temperatures = forecast.map(day => Math.round(day.main.temp));
    const humidity = forecast.map(day => day.main.humidity);
    const windSpeed = forecast.map(day => Math.round(day.wind.speed));
    const aqiData = forecast.map(() =>
        Math.floor(Math.random() * 150) + 50
    );

    const data = {
        labels,
        datasets: [
            visible.temp && {
                label: "Temperature (°C)",
                data: temperatures,
                borderColor: "#ffc107",
                backgroundColor: "rgba(255,193,7,0.2)",
                tension: 0.4,
                fill: true,
            },
            visible.humidity && {
                label: "Humidity (%)",
                data: humidity,
                borderColor: "#00c3ff",
                tension: 0.4,
            },
            visible.wind && {
                label: "Wind Speed",
                data: windSpeed,
                borderColor: "#ff4d6d",
                tension: 0.4,
            },
            visible.aqi && {
                label: "AQI",
                data: aqiData,
                borderColor: "#ff3b3b",
                borderDash: [6, 6],
                tension: 0.4,
            }
        ].filter(Boolean)
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500,
            easing: "easeInOutQuart"
        },
        plugins: {
            legend: {
                labels: { color: "white" }
            }
        },
        scales: {
            x: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.08)" }
            },
            y: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.08)" }
            }
        }
    };

    const avgTemp = Math.round(
        temperatures.reduce((a, b) => a + b, 0) / temperatures.length
    );

    return (
        <div className="chart-container">

            {/* Chart Summary */}
            <div className="chart-summary">
                <div>
                    <h5>Avg Temp</h5>
                    <p>{avgTemp}°C</p>
                </div>
                <div>
                    <h5>Max AQI</h5>
                    <p>{Math.max(...aqiData)}</p>
                </div>
            </div>

            {/* Toggle Buttons */}
            <div className="chart-toggle">
                {["temp", "humidity", "wind", "aqi"].map(key => (
                    <button
                        key={key}
                        className={visible[key] ? "active-toggle" : ""}
                        onClick={() =>
                            setVisible({ ...visible, [key]: !visible[key] })
                        }
                    >
                        {key.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="chart-wrapper">
                <Line data={data} options={options} />
            </div>

        </div>
    );
}

export default TemperatureChart;