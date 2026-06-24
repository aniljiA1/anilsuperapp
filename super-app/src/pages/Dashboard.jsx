import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import UserProfileWidget from "../components/UserProfileWidget";
import WeatherWidget from "../components/WeatherWidget";
import NewsWidget from "../components/NewsWidget";
import TimerWidget from "../components/TimerWidget";
import NotesWidget from "../components/NotesWidget";

const Dashboard = () => {
  const navigate = useNavigate();
  const resetStore = useStore((s) => s.resetStore);

  const handleLogout = () => {
    resetStore();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black px-4 md:px-12 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[#7ee787] text-3xl font-bold" style={{ fontFamily: "cursive" }}>
          Super app
        </h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/movies")}
            className="text-sm font-semibold px-5 py-2 rounded-full bg-[#7ee787] text-black hover:opacity-90"
          >
            Entertainment →
          </button>
          <button
            onClick={handleLogout}
            className="text-sm font-semibold px-5 py-2 rounded-full bg-[#2e2e2e] hover:bg-[#3a3a3a]"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <UserProfileWidget />
        </div>
        <div className="md:col-span-1">
          <WeatherWidget />
        </div>
        <div className="md:col-span-1">
          <TimerWidget />
        </div>
        <div className="md:col-span-2">
          <NewsWidget />
        </div>
        <div className="md:col-span-1">
          <NotesWidget />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
