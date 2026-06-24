import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import CategoryCard from "../components/CategoryCard";

const GENRES = ["Action", "Comedy", "Drama", "Music", "Sports", "Thriller", "Fantasy", "Romance"];
const MIN_SELECTION = 3;

const Categories = () => {
  const navigate = useNavigate();
  const categories = useStore((s) => s.categories);
  const toggleCategory = useStore((s) => s.toggleCategory);

  const canContinue = categories.length >= MIN_SELECTION;

  return (
    <div className="min-h-screen bg-black px-6 md:px-16 py-12">
      <h1 className="text-[#7ee787] text-3xl font-bold mb-2" style={{ fontFamily: "cursive" }}>
        Super app
      </h1>
      <h2 className="text-white text-3xl md:text-5xl font-bold max-w-xl mb-8">
        Choose your entertainment category
      </h2>

      <div className="flex flex-wrap gap-2 mb-6 min-h-[40px]">
        {categories.map((c) => (
          <span key={c} className="chip">
            {c}
            <button
              type="button"
              onClick={() => toggleCategory(c)}
              className="text-[#7ee787] hover:text-white"
              aria-label={`Remove ${c}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {!canContinue && (
        <p className="text-red-400 mb-6 flex items-center gap-2">
          ⚠ Minimum 3 categories required
        </p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mb-10">
        {GENRES.map((genre) => (
          <CategoryCard
            key={genre}
            name={genre}
            selected={categories.includes(genre)}
            onToggle={toggleCategory}
          />
        ))}
      </div>

      <button
        type="button"
        disabled={!canContinue}
        onClick={() => navigate("/dashboard")}
        className="btn-primary max-w-xs"
      >
        Next Page
      </button>
    </div>
  );
};

export default Categories;
