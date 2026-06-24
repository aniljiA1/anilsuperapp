import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || "";
const BASE_URL = "https://newsapi.org/v2";

export const fetchTopHeadlines = async (category = "general") => {
  if (!NEWS_API_KEY) {
    throw new Error("Missing News API key. Add VITE_NEWS_API_KEY to your .env file.");
  }
  const response = await axios.get(`${BASE_URL}/top-headlines`, {
    params: { category, language: "en", country: "us", apiKey: NEWS_API_KEY },
  });
  return (response.data.articles || []).filter((a) => a.title && a.title !== "[Removed]");
};
