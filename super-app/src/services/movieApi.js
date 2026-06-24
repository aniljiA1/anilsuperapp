import axios from "axios";

const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY || "";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMoviesByGenre = async (genre) => {
  if (!OMDB_API_KEY) {
    throw new Error("Missing OMDB API key. Add VITE_OMDB_API_KEY to your .env file.");
  }
  const response = await axios.get(BASE_URL, {
    params: { s: genre, type: "movie", apikey: OMDB_API_KEY },
  });
  return response.data.Search || [];
};

export const fetchMovieDetails = async (imdbID) => {
  if (!OMDB_API_KEY) {
    throw new Error("Missing OMDB API key. Add VITE_OMDB_API_KEY to your .env file.");
  }
  const response = await axios.get(BASE_URL, {
    params: { i: imdbID, plot: "full", apikey: OMDB_API_KEY },
  });
  return response.data;
};
