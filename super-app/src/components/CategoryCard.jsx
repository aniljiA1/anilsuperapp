const CATEGORY_STYLES = {
  Action: { bg: "#e6541f", emoji: "💥" },
  Comedy: { bg: "#f0a500", emoji: "😂" },
  Drama: { bg: "#9b7bd6", emoji: "🎭" },
  Music: { bg: "#d61f3a", emoji: "🎵" },
  Sports: { bg: "#1f7ad6", emoji: "⚽" },
  Thriller: { bg: "#2f8fd6", emoji: "🔪" },
  Fantasy: { bg: "#d61fa0", emoji: "🐉" },
  Romance: { bg: "#2fa64f", emoji: "❤️" },
};

const CategoryCard = ({ name, selected, onToggle }) => {
  const style = CATEGORY_STYLES[name] || { bg: "#444", emoji: "🎬" };

  return (
    <button
      type="button"
      onClick={() => onToggle(name)}
      className="card-hover relative rounded-2xl overflow-hidden text-left h-36 w-full flex flex-col justify-between p-4 focus:outline-none"
      style={{
        backgroundColor: style.bg,
        border: selected ? "3px solid #7ee787" : "3px solid transparent",
      }}
    >
      <div className="flex items-start justify-between">
        <span className="text-white font-bold text-xl drop-shadow">{name}</span>
        {selected && (
          <span className="bg-[#7ee787] text-black w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">
            ✓
          </span>
        )}
      </div>
      <span className="text-4xl self-end opacity-90">{style.emoji}</span>
    </button>
  );
};

export default CategoryCard;
