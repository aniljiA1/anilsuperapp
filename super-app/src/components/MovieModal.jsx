import { useEffect, useState } from "react";
import { fetchMovieDetails } from "../services/movieApi";

const PLACEHOLDER = "https://placehold.co/300x445/1c1c1c/7ee787?text=No+Poster";

const MovieModal = ({ imdbID, onClose }) => {
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");
    fetchMovieDetails(imdbID)
      .then((data) => {
        if (!cancelled) setDetails(data);
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
  }, [imdbID]);

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1c] rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        {loading && <p className="text-gray-400 py-10 text-center">Loading details…</p>}
        {!loading && error && <p className="text-amber-400 py-10 text-center">{error}</p>}

        {!loading && !error && details && (
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={details.Poster && details.Poster !== "N/A" ? details.Poster : PLACEHOLDER}
              alt={details.Title}
              className="w-full md:w-48 h-auto rounded-xl object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">{details.Title}</h2>
              <p className="text-gray-400 mb-3">
                {details.Year} • {details.Runtime} • {details.Genre}
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="chip">⭐ {details.imdbRating}</span>
                <span className="chip">{details.Rated}</span>
              </div>
              <p className="text-sm text-gray-300 mb-3 leading-relaxed">{details.Plot}</p>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-gray-200">Cast: </span>
                {details.Actors}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-gray-200">Director: </span>
                {details.Director}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
