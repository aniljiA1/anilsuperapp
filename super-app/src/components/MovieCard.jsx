const PLACEHOLDER = "https://placehold.co/300x445/1c1c1c/7ee787?text=No+Poster";

const MovieCard = ({ movie, onSelect }) => {
  const poster = movie.Poster && movie.Poster !== "N/A" ? movie.Poster : PLACEHOLDER;

  return (
    <button
      type="button"
      onClick={() => onSelect(movie.imdbID)}
      className="card-hover flex-shrink-0 w-40 text-left rounded-xl overflow-hidden bg-[#1c1c1c]"
    >
      <img src={poster} alt={movie.Title} className="w-full h-56 object-cover" loading="lazy" />
      <div className="p-2">
        <p className="text-sm font-semibold line-clamp-2">{movie.Title}</p>
        <p className="text-xs text-gray-400">{movie.Year}</p>
      </div>
    </button>
  );
};

export default MovieCard;
