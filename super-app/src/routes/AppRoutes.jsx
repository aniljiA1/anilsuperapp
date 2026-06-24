import { Routes, Route, Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";

const RequireRegistration = ({ children }) => {
  const registered = useStore((s) => s.registered);
  if (!registered) return <Navigate to="/" replace />;
  return children;
};

const RequireCategories = ({ children }) => {
  const registered = useStore((s) => s.registered);
  const categories = useStore((s) => s.categories);
  if (!registered) return <Navigate to="/" replace />;
  if (categories.length < 3) return <Navigate to="/categories" replace />;
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route
        path="/categories"
        element={
          <RequireRegistration>
            <Categories />
          </RequireRegistration>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireCategories>
            <Dashboard />
          </RequireCategories>
        }
      />
      <Route
        path="/movies"
        element={
          <RequireCategories>
            <Movies />
          </RequireCategories>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
