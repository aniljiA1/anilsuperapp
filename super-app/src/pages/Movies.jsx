import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import { searchMoviesByGenre } from "../services/movieApi";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";

const Movies = () => {
  const navigate = useNavigate();
  const categories = useStore((s) => s.categories);
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    Promise.all(
      categories.map(async (genre) => {
        try {
          const movies = await searchMoviesByGenre(genre);
          return [genre, movies];
        } catch (err) {
          throw err;
        }
      })
    )
      .then((entries) => {
        if (!cancelled) setMoviesByCategory(Object.fromEntries(entries));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [categories]);

  return (
    <div className="min-h-screen bg-black px-4 md:px-12 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-[#7ee787] text-3xl font-bold mb-1" style={{ fontFamily: "cursive" }}>
            Super app
          </h1>
          <h2 className="text-2xl font-bold">Entertainment according to your choice</h2>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="text-sm font-semibold px-5 py-2 rounded-full bg-[#2e2e2e] hover:bg-[#3a3a3a]"
        >
          ← Dashboard
        </button>
      </div>

      {loading && <p className="text-gray-400">Loading movies…</p>}
      {!loading && error && <p className="text-amber-400">{error}</p>}

      {!loading &&
        !error &&
        categories.map((genre) => (
          <div key={genre} className="mb-8">
            <h3 className="text-gray-300 text-lg font-semibold mb-3">{genre}</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {(moviesByCategory[genre] || []).length === 0 && (
                <p className="text-gray-500 text-sm">No movies found for this genre.</p>
              )}
              {(moviesByCategory[genre] || []).map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie} onSelect={setSelectedId} />
              ))}
            </div>
          </div>
        ))}

      {selectedId && <MovieModal imdbID={selectedId} onClose={() => setSelectedId(null)} />}
    </div>
  );
};

export default Movies;
