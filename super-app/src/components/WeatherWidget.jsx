import { useEffect, useState } from "react";
import { fetchCurrentWeatherByCity, fetchCurrentWeatherByCoords } from "../services/weatherApi";

const FALLBACK_CITY = "Delhi";

const ICONS = {
  Clear: "☀️",
  Clouds: "☁️",
  Rain: "🌧️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️",
  Haze: "🌫️",
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError("");
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (pos) => {
              try {
                const data = await fetchCurrentWeatherByCoords(
                  pos.coords.latitude,
                  pos.coords.longitude
                );
                if (!cancelled) setWeather(data);
              } catch (err) {
                if (!cancelled) setError(err.message);
              } finally {
                if (!cancelled) setLoading(false);
              }
            },
            async () => {
              try {
                const data = await fetchCurrentWeatherByCity(FALLBACK_CITY);
                if (!cancelled) setWeather(data);
              } catch (err) {
                if (!cancelled) setError(err.message);
              } finally {
                if (!cancelled) setLoading(false);
              }
            },
            { timeout: 5000 }
          );
        } else {
          const data = await fetchCurrentWeatherByCity(FALLBACK_CITY);
          if (!cancelled) setWeather(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-[#1c1c1c] rounded-2xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold mb-4">Weather</h3>
      {loading && <p className="text-gray-400">Fetching weather…</p>}
      {!loading && error && (
        <p className="text-amber-400 text-sm leading-relaxed">{error}</p>
      )}
      {!loading && !error && weather && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{weather.temperature}°C</p>
              <p className="text-gray-400 text-sm">{weather.city}</p>
            </div>
            <div className="text-4xl">{ICONS[weather.condition] || "🌡️"}</div>
          </div>
          <p className="text-gray-400 capitalize text-sm">{weather.description}</p>
          <div className="grid grid-cols-3 gap-2 text-sm mt-2">
            <div className="bg-black/30 rounded-lg p-2 text-center">
              <p className="text-gray-400">Wind</p>
              <p className="font-semibold">{weather.windSpeed} km/h</p>
            </div>
            <div className="bg-black/30 rounded-lg p-2 text-center">
              <p className="text-gray-400">Pressure</p>
              <p className="font-semibold">{weather.pressure} mbar</p>
            </div>
            <div className="bg-black/30 rounded-lg p-2 text-center">
              <p className="text-gray-400">Humidity</p>
              <p className="font-semibold">{weather.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherWidget;
