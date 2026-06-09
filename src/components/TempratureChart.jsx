import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useState, useMemo } from "react";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Filler,
    Tooltip,
    Legend
);

/* ── dataset definitions ── */
const METRICS = [
    {
        key: "temp",
        label: "Temperature",
        unit: "°C",
        icon: "fa-temperature-half",
        color: "#ffc107",
        fill: true,
    },
    {
        key: "humidity",
        label: "Humidity",
        unit: "%",
        icon: "fa-droplet",
        color: "#22d3ee",
        fill: false,
    },
    {
        key: "wind",
        label: "Wind Speed",
        unit: "km/h",
        icon: "fa-wind",
        color: "#f87171",
        fill: false,
    },
    {
        key: "pop",
        label: "Precipitation",
        unit: "%",
        icon: "fa-cloud-rain",
        color: "#818cf8",
        fill: false,
    },
    {
        key: "pressure",
        label: "Pressure",
        unit: "hPa",
        icon: "fa-gauge",
        color: "#34d399",
        fill: false,
    },
];

function TemperatureChart({ forecast, aqiForecast }) {

    const [visible, setVisible] = useState({
        temp: true,
        humidity: true,
        wind: false,
        pop: false,
        pressure: false,
    });

    if (!forecast || forecast.length === 0) return null;

    /* ── raw data ── */
    const labels = forecast.map(d =>
        new Date(d.dt_txt).toLocaleDateString("en-US", { weekday: "short" })
    );

    const series = {
        temp: forecast.map(d => Math.round(d.main.temp)),
        humidity: forecast.map(d => d.main.humidity),
        wind: forecast.map(d => Math.round(d.wind.speed)),
        pop: forecast.map(d => Math.round((d.pop ?? 0) * 100)),
        pressure: forecast.map(d => d.main.pressure),
    };

    /* ── chart.js datasets ── */
    const datasets = METRICS
        .filter(m => visible[m.key])
        .map(m => ({
            label: `${m.label} (${m.unit})`,
            data: series[m.key],
            borderColor: m.color,
            backgroundColor: m.fill ? `${m.color}28` : "transparent",
            pointBackgroundColor: m.color,
            pointBorderColor: "rgba(0,0,0,0.3)",
            pointRadius: 5,
            pointHoverRadius: 7,
            tension: 0.42,
            fill: m.fill,
            borderWidth: 2.5,
        }));

    const chartData = { labels, datasets };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        animation: { duration: 900, easing: "easeInOutQuart" },
        plugins: {
            legend: {
                display: false,   /* we render our own legend pills */
            },
            tooltip: {
                backgroundColor: "rgba(4,12,32,0.96)",
                titleColor: "rgba(220,235,255,0.75)",
                bodyColor: "#ffffff",
                borderColor: "rgba(255,255,255,0.12)",
                borderWidth: 1,
                padding: 12,
                cornerRadius: 10,
                titleFont: { family: "'Outfit', sans-serif", weight: "700", size: 12 },
                bodyFont: { family: "'DM Sans', sans-serif", size: 13 },
                callbacks: {
                    title: (items) => items[0]?.label ?? "",
                    label: (item) => ` ${item.dataset.label}: ${item.formattedValue}`,
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "rgba(200,220,255,0.55)", font: { size: 12 } },
                grid: { color: "rgba(255,255,255,0.05)" },
                border: { dash: [4, 4] },
            },
            y: {
                ticks: { color: "rgba(200,220,255,0.55)", font: { size: 11 } },
                grid: { color: "rgba(255,255,255,0.05)" },
                border: { dash: [4, 4] },
            },
        },
    };

    /* ── summary stats for active primary metric (temp) ── */
    const temps = series.temp;
    const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
    const maxTemp = Math.max(...temps);
    const minTemp = Math.min(...temps);
    const tempSpan = maxTemp - minTemp;

    /* max AQI from aqiForecast if available */
    const maxAQI = aqiForecast?.length
        ? Math.max(...aqiForecast.map(d => {
            const pm25 = d?.components?.pm2_5 ?? 0;
            return Math.round((50 / 12) * Math.min(pm25, 12));
        }))
        : null;

    const toggle = (key) =>
        setVisible(prev => ({ ...prev, [key]: !prev[key] }));

    return (
        <div className="chart-container">

            {/* ── Header ── */}
            <div className="chart-header">
                <div className="chart-header-left">
                    <span className="chart-accent-bar"></span>
                    <h4 className="chart-title">
                        <i className="fas fa-chart-line"></i>
                        Weather Trends
                    </h4>
                </div>
                <p className="chart-subtitle">
                    {forecast.length}-day comparison · Click metrics to toggle
                </p>
            </div>

            {/* ── Summary Stats ── */}
            <div className="chart-summary">
                <div className="cs-item">
                    <h5>Avg Temp</h5>
                    <p>{avgTemp}°C</p>
                </div>
                <div className="cs-sep"></div>
                <div className="cs-item">
                    <h5>Max Temp</h5>
                    <p style={{ color: "#f87171" }}>{maxTemp}°C</p>
                </div>
                <div className="cs-sep"></div>
                <div className="cs-item">
                    <h5>Min Temp</h5>
                    <p style={{ color: "#7dd3fc" }}>{minTemp}°C</p>
                </div>
                <div className="cs-sep"></div>
                <div className="cs-item">
                    <h5>Temp Range</h5>
                    <p>{tempSpan}°C</p>
                </div>
                {maxAQI !== null && (
                    <>
                        <div className="cs-sep"></div>
                        <div className="cs-item">
                            <h5>Max AQI</h5>
                            <p>{maxAQI}</p>
                        </div>
                    </>
                )}
            </div>

            {/* ── Metric Toggle Pills ── */}
            <div className="chart-toggle">
                {METRICS.map(m => (
                    <button
                        key={m.key}
                        className={`chart-metric-btn ${visible[m.key] ? "chart-metric-btn--active" : ""}`}
                        style={visible[m.key]
                            ? { borderColor: m.color, background: `${m.color}1a`, color: m.color }
                            : {}}
                        onClick={() => toggle(m.key)}
                    >
                        <i className={`fas ${m.icon}`}></i>
                        {m.label}
                    </button>
                ))}
            </div>

            {/* ── Chart ── */}
            <div className="chart-wrapper">
                {datasets.length > 0 ? (
                    <Line data={chartData} options={options} />
                ) : (
                    <div className="chart-empty">
                        <i className="fas fa-chart-line"></i>
                        <p>Select at least one metric above</p>
                    </div>
                )}
            </div>

            {/* ── Inline legend ── */}
            {datasets.length > 0 && (
                <div className="chart-legend">
                    {METRICS.filter(m => visible[m.key]).map(m => (
                        <span key={m.key} className="chart-legend-item">
                            <span className="chart-legend-dot" style={{ background: m.color }}></span>
                            {m.label}
                            <span className="chart-legend-unit">{m.unit}</span>
                        </span>
                    ))}
                </div>
            )}

        </div>
    );
}

export default TemperatureChart;