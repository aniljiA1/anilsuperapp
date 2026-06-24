import { useStore } from "../store/useStore";

const UserProfileWidget = () => {
  const user = useStore((s) => s.user);
  const categories = useStore((s) => s.categories);

  return (
    <div className="bg-gradient-to-br from-[#6c5ce7] to-[#5b4bd6] rounded-2xl p-6 h-full flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
          {user.name?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <h3 className="text-xl font-bold">{user.name || "Guest"}</h3>
          <p className="text-sm text-white/80">{user.email}</p>
          <p className="text-sm font-semibold">{user.username}</p>
        </div>
      </div>
      <p className="text-sm text-white/70">Mobile: {user.mobile}</p>
      <div className="flex flex-wrap gap-2 mt-1">
        {categories.map((c) => (
          <span key={c} className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
            {c}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserProfileWidget;
