import axios from "axios";

const WEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || "";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const fetchCurrentWeatherByCity = async (city) => {
  if (!WEATHER_API_KEY) {
    throw new Error("Missing OpenWeatherMap API key. Add VITE_OPENWEATHER_API_KEY to your .env file.");
  }
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { q: city, units: "metric", appid: WEATHER_API_KEY },
  });
  return normalizeWeather(response.data);
};

export const fetchCurrentWeatherByCoords = async (lat, lon) => {
  if (!WEATHER_API_KEY) {
    throw new Error("Missing OpenWeatherMap API key. Add VITE_OPENWEATHER_API_KEY to your .env file.");
  }
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: { lat, lon, units: "metric", appid: WEATHER_API_KEY },
  });
  return normalizeWeather(response.data);
};

const normalizeWeather = (data) => ({
  city: data.name,
  temperature: Math.round(data.main.temp),
  pressure: data.main.pressure,
  humidity: data.main.humidity,
  windSpeed: data.wind.speed,
  condition: data.weather?.[0]?.main || "Clear",
  description: data.weather?.[0]?.description || "",
  icon: data.weather?.[0]?.icon || "01d",
});
