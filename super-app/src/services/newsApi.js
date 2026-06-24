import axios from "axios";

// Currents API supports direct browser requests in production (CORS-permissive),
// unlike NewsAPI.org's free tier which only works on localhost.
// Get a free key at https://currentsapi.services/en
const CURRENTS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
const BASE_URL = "https://api.currentsapi.services/v1";

export const fetchTopHeadlines = async () => {
  if (!CURRENTS_API_KEY) {
    throw new Error("Missing News API key. Add VITE_NEWS_API_KEY to your .env file.");
  }
  const response = await axios.get(`${BASE_URL}/latest-news`, {
    params: { language: "en", apiKey: CURRENTS_API_KEY },
  });
  const news = response.data.news || [];
  // Normalize to the shape the rest of the app expects (same field names as before)
  return news
    .filter((a) => a.title)
    .map((a) => ({
      title: a.title,
      description: a.description,
      urlToImage: a.image && a.image !== "None" ? a.image : null,
      url: a.url,
      publishedAt: a.published,
      source: { name: (a.author && a.author !== "None" ? a.author : null) || "Currents" },
    }));
};
