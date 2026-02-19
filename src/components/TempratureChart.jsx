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

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

function TemperatureChart({ forecast, aqiForecast }) {
    if (!forecast || forecast.length === 0) return null;

    const labels = forecast.map((day) =>
        new Date(day.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
        })
    );

    const temperatures = forecast.map((day) =>
        Math.round(day.main.temp)
    );

    const humidity = forecast.map((day) =>
        day.main.humidity
    );

    const windSpeed = forecast.map((day) =>
        Math.round(day.wind.speed)
    );

    const aqiData = forecast.map(() =>
        Math.floor(Math.random() * 150) + 50
    );


    const data = {
        labels,
        datasets: [
            {
                label: "Temperature (°C)",
                data: temperatures,
                borderColor: "#ffc107",
                backgroundColor: "rgba(255,193,7,0.2)",
                tension: 0.4,
                fill: true,
                pointRadius: 5,
            },
            {
                label: "Humidity (%)",
                data: humidity,
                borderColor: "#00c3ff",
                backgroundColor: "rgba(0,195,255,0.15)",
                tension: 0.4,
                fill: false,
                pointRadius: 4,
            },
            {
                label: "Wind Speed (km/h)",
                data: windSpeed,
                borderColor: "#ff4d6d",
                backgroundColor: "rgba(255,77,109,0.15)",
                tension: 0.4,
                fill: false,
                pointRadius: 4,
            },
            {
                label: "AQI",
                data: aqiData,
                borderColor: "#ff3b3b",
                backgroundColor: "rgba(255,59,59,0.2)",
                tension: 0.4,
                fill: false,
                pointRadius: 4,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "white",
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
                ticks: { color: "white" },
                grid: { color: "rgba(255,255,255,0.1)" },
            },
        },
    };

    return (
        <div className="chart-container">
            <h4 className="text-white mb-3">
                Weather Trend (Temp • Humidity • Wind • AQI)
            </h4>
            <Line data={data} options={options} />
        </div>
    );
}

export default TemperatureChart;
