import { useEffect, useState } from "react";
import { fetchTopHeadlines } from "../services/newsApi";

const ROTATE_INTERVAL_MS = 2000;

const NewsWidget = () => {
  const [articles, setArticles] = useState([]);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchTopHeadlines("general")
      .then((data) => {
        if (!cancelled) setArticles(data);
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
  }, []);

  useEffect(() => {
    if (articles.length === 0) return undefined;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % articles.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [articles]);

  const current = articles[index];

  return (
    <div className="bg-[#1c1c1c] rounded-2xl p-6 h-full flex flex-col overflow-hidden">
      <h3 className="text-lg font-semibold mb-4">Top News</h3>
      {loading && <p className="text-gray-400">Loading headlines…</p>}
      {!loading && error && <p className="text-amber-400 text-sm leading-relaxed">{error}</p>}
      {!loading && !error && current && (
        <div className="flex-1 flex flex-col">
          {current.urlToImage && (
            <img
              src={current.urlToImage}
              alt={current.title}
              className="w-full h-32 object-cover rounded-lg mb-3"
              onError={(e) => (e.target.style.display = "none")}
            />
          )}
          <p className="text-xs text-gray-500 mb-1">
            {current.source?.name} •{" "}
            {current.publishedAt && new Date(current.publishedAt).toLocaleDateString()}
          </p>
          <h4 className="font-semibold mb-1 line-clamp-2">{current.title}</h4>
          <p className="text-sm text-gray-400 line-clamp-3">{current.description}</p>
          <div className="flex gap-1 mt-3">
            {articles.map((_, i) => (
              <span
                key={i}
                className={`h-1 flex-1 rounded-full ${
                  i === index ? "bg-[#7ee787]" : "bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      )}
      {!loading && !error && !current && (
        <p className="text-gray-400">No headlines available right now.</p>
      )}
    </div>
  );
};

export default NewsWidget;
