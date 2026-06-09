// src/components/Skeleton.jsx
// ─────────────────────────────────────────────────────────────────────────────
//  Liquid Glass Skeleton Loading System
//  Provides shimmer-animated placeholders for every section of the dashboard.
//
//  Exported components:
//    <WeatherCardSkeleton />      → replaces <WeatherCard>
//    <HourlyForecastSkeleton />   → replaces <HourlyForecast>
//    <ForecastGridSkeleton />     → replaces the 5-day forecast grid
//    <TempChartSkeleton />        → replaces <TemperatureChart>
//    <QuickStatsSkeleton />       → replaces the quick-stats strip
//    <DashboardSkeleton />        → full page skeleton (all of the above)
// ─────────────────────────────────────────────────────────────────────────────
import "../assets/Skeleton.css";

/* ─── Primitive bone ─────────────────────────────────────────────────────── */
function Bone({ className = "", style = {} }) {
  return <div className={`sk-bone ${className}`} style={style} />;
}

/* ─── Pulse wrapper (adds breathing glow on top of shimmer) ──────────────── */
function PulseWrap({ children, className = "" }) {
  return <div className={`sk-pulse-wrap ${className}`}>{children}</div>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   WEATHER CARD SKELETON
   ═══════════════════════════════════════════════════════════════════════════ */
export function WeatherCardSkeleton() {
  return (
    <div className="sk-weather-card">
      {/* Header row: location block + icon circle */}
      <div className="sk-wc-header">
        <div className="sk-wc-location">
          <Bone className="sk-icon-sm sk-circle" />
          <div className="sk-wc-location-text">
            <Bone className="sk-text-lg sk-w-48" />
            <Bone className="sk-text-sm sk-w-32 sk-mt-6" />
          </div>
        </div>
        <Bone className="sk-circle sk-icon-xl" />
      </div>

      {/* Temperature */}
      <div className="sk-wc-temp-row">
        <Bone className="sk-temp-num" />
        <div className="sk-wc-temp-meta">
          <Bone className="sk-text-sm sk-w-24" />
          <Bone className="sk-text-sm sk-w-32 sk-mt-6" />
          <Bone className="sk-text-sm sk-w-20 sk-mt-6" />
        </div>
      </div>

      {/* Stats row */}
      <div className="sk-wc-stats">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="sk-stat-col">
            <Bone className="sk-icon-sm sk-circle" />
            <Bone className="sk-text-md sk-w-14 sk-mt-5" />
            <Bone className="sk-text-xs sk-w-10 sk-mt-4" />
          </div>
        ))}
      </div>

      {/* Sun times */}
      <div className="sk-sun-row">
        <div className="sk-sun-col">
          <Bone className="sk-icon-sm sk-circle" />
          <Bone className="sk-text-sm sk-w-16 sk-mt-5" />
          <Bone className="sk-text-xs sk-w-12 sk-mt-4" />
        </div>
        <Bone className="sk-sun-arc" />
        <div className="sk-sun-col">
          <Bone className="sk-icon-sm sk-circle" />
          <Bone className="sk-text-sm sk-w-16 sk-mt-5" />
          <Bone className="sk-text-xs sk-w-12 sk-mt-4" />
        </div>
      </div>

      {/* AQI bar */}
      <div className="sk-aqi-row">
        <Bone className="sk-icon-sm sk-circle" />
        <Bone className="sk-text-xl sk-w-14" />
        <div className="sk-aqi-right">
          <Bone className="sk-text-sm sk-w-24" />
          <Bone className="sk-bar sk-mt-6" />
        </div>
      </div>

      {/* Extra grid */}
      <div className="sk-extra-grid">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="sk-extra-cell">
            <Bone className="sk-icon-sm sk-circle" />
            <Bone className="sk-text-sm sk-w-14 sk-mt-5" />
            <Bone className="sk-text-xs sk-w-10 sk-mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOURLY FORECAST SKELETON
   ═══════════════════════════════════════════════════════════════════════════ */
export function HourlyForecastSkeleton({ count = 7 }) {
  return (
    <div className="sk-hourly-container">
      {/* Header */}
      <div className="sk-hourly-header">
        <div className="sk-row sk-gap-10">
          <Bone className="sk-accent-bar" />
          <Bone className="sk-text-md sk-w-36" />
        </div>
        <Bone className="sk-pill sk-w-28" />
      </div>

      {/* Scroll strip */}
      <div className="sk-hourly-strip">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="sk-hour-card">
            <Bone className="sk-text-xs sk-w-12 sk-mx-auto" />
            <Bone className="sk-icon-md sk-circle sk-mx-auto sk-mt-8" />
            <Bone className="sk-text-md sk-w-14 sk-mx-auto sk-mt-8" />
            <Bone className="sk-text-xs sk-w-16 sk-mx-auto sk-mt-5" />
            <Bone className="sk-text-xs sk-w-10 sk-mx-auto sk-mt-4" />
            <Bone className="sk-text-xs sk-w-12 sk-mx-auto sk-mt-4" />
          </div>
        ))}
      </div>

      {/* Summary bar */}
      <div className="sk-hourly-summary">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="sk-hs-item">
            <Bone className="sk-icon-sm sk-circle sk-mx-auto" />
            <Bone className="sk-text-md sk-w-16 sk-mx-auto sk-mt-5" />
            <Bone className="sk-text-xs sk-w-10 sk-mx-auto sk-mt-4" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   QUICK STATS SKELETON
   ═══════════════════════════════════════════════════════════════════════════ */
export function QuickStatsSkeleton() {
  return (
    <div className="sk-quick-stats">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="sk-qs-item">
          <Bone className="sk-icon-sm sk-circle sk-mx-auto" />
          <Bone className="sk-text-md sk-w-16 sk-mx-auto sk-mt-6" />
          <Bone className="sk-text-xs sk-w-12 sk-mx-auto sk-mt-4" />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FORECAST GRID SKELETON
   ═══════════════════════════════════════════════════════════════════════════ */
export function ForecastGridSkeleton({ count = 5 }) {
  return (
    <div className="sk-forecast-section">
      {/* Section header */}
      <div className="sk-section-header">
        <div className="sk-row sk-gap-10">
          <Bone className="sk-accent-bar" />
          <Bone className="sk-text-md sk-w-40" />
        </div>
        <Bone className="sk-pill sk-w-20" />
      </div>

      {/* Cards */}
      <div className="sk-forecast-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="sk-forecast-card"
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            {/* Day + date */}
            <Bone className="sk-text-sm sk-w-10 sk-mx-auto" />
            <Bone className="sk-text-xs sk-w-14 sk-mx-auto sk-mt-4" />

            {/* Icon */}
            <Bone className="sk-icon-lg sk-circle sk-mx-auto sk-mt-10" />

            {/* Temp */}
            <Bone className="sk-temp-sm sk-mx-auto sk-mt-10" />

            {/* Condition */}
            <Bone className="sk-text-xs sk-w-18 sk-mx-auto sk-mt-5" />

            {/* Mini bar */}
            <Bone className="sk-bar sk-mt-8" />

            {/* Hi / Lo */}
            <div className="sk-range-row">
              <Bone className="sk-text-sm sk-w-10" />
              <Bone className="sk-text-sm sk-w-10" />
            </div>

            {/* Rain */}
            <Bone className="sk-text-sm sk-w-12 sk-mx-auto" />

            {/* Detail row */}
            <Bone className="sk-bar sk-mt-5" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEMPERATURE CHART SKELETON
   ═══════════════════════════════════════════════════════════════════════════ */
export function TempChartSkeleton() {
  return (
    <div className="sk-chart-container">
      {/* Header */}
      <div className="sk-chart-header">
        <div className="sk-row sk-gap-10">
          <Bone className="sk-accent-bar" />
          <Bone className="sk-text-lg sk-w-44" />
        </div>
        <Bone className="sk-text-sm sk-w-48" />
      </div>

      {/* Summary stats */}
      <div className="sk-chart-summary">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="sk-cs-item">
            <Bone className="sk-text-xs sk-w-16 sk-mx-auto" />
            <Bone className="sk-text-xl sk-w-14 sk-mx-auto sk-mt-6" />
          </div>
        ))}
      </div>

      {/* Metric pills */}
      <div className="sk-chart-pills">
        {[28, 32, 24, 36, 28].map((w, i) => (
          <Bone key={i} className={`sk-pill sk-w-${w}`} />
        ))}
      </div>

      {/* Chart body */}
      <div className="sk-chart-body">
        {/* Y-axis */}
        <div className="sk-chart-yaxis">
          {[1, 2, 3, 4, 5].map(i => (
            <Bone key={i} className="sk-text-xs sk-w-8" />
          ))}
        </div>
        {/* Graph area */}
        <div className="sk-chart-area">
          {/* Fake grid lines */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="sk-grid-line" />
          ))}
          {/* Fake SVG wave */}
          <svg
            viewBox="0 0 400 160"
            className="sk-chart-wave"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="skWaveGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,193,7,0.18)" />
                <stop offset="100%" stopColor="rgba(255,193,7,0)" />
              </linearGradient>
            </defs>
            {/* Fill area */}
            <path
              d="M0,100 C40,80 80,50 120,70 C160,90 200,40 240,55 C280,70 320,45 360,60 L400,65 L400,160 L0,160 Z"
              fill="url(#skWaveGrad)"
            />
            {/* Line */}
            <path
              d="M0,100 C40,80 80,50 120,70 C160,90 200,40 240,55 C280,70 320,45 360,60 L400,65"
              fill="none"
              stroke="rgba(255,193,7,0.25)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Data point dots */}
            {[[0, 100], [80, 50], [160, 90], [240, 55], [320, 45], [400, 65]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="4" fill="rgba(255,193,7,0.30)" />
            ))}
          </svg>
        </div>
      </div>

      {/* X-axis labels */}
      <div className="sk-chart-xaxis">
        {[1, 2, 3, 4, 5].map(i => (
          <Bone key={i} className="sk-text-xs sk-w-8 sk-mx-auto" />
        ))}
      </div>

      {/* Legend row */}
      <div className="sk-chart-legend">
        {[1, 2].map(i => (
          <div key={i} className="sk-legend-item">
            <Bone className="sk-icon-xs sk-circle" />
            <Bone className="sk-text-xs sk-w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FULL DASHBOARD SKELETON  (drop-in replacement for the whole right col)
   ═══════════════════════════════════════════════════════════════════════════ */
export function DashboardSkeleton() {
  return (
    <div className="sk-dashboard">
      <WeatherCardSkeleton />
      <HourlyForecastSkeleton />
    </div>
  );
}

/* Default export: single entry-point for convenience */
const Skeleton = {
  WeatherCard: WeatherCardSkeleton,
  HourlyForecast: HourlyForecastSkeleton,
  ForecastGrid: ForecastGridSkeleton,
  TempChart: TempChartSkeleton,
  QuickStats: QuickStatsSkeleton,
  Dashboard: DashboardSkeleton,
};

export default Skeleton;