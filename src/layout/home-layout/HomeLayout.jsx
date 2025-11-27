// src/layout/home-layout/HomeLayout.jsx
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import Sidebar from "../../components/shared/sidebar/Sidebar";

const HomeLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { removeCurrentUser } = useCurrentUser();

  const handleLogout = () => {
    removeCurrentUser();
    navigate("/login");
  };

  // Main navigation items
  const navItems = [
    { path: "/home", label: "Home", icon: "🏠" },
    { path: "/okrs", label: "OKRs", icon: "🎯" },
    { path: "/meetings", label: "Meetings", icon: "👥" },
    { path: "/tasks", label: "Tasks", icon: "☑️" },
    { path: "/reviews", label: "Reviews", icon: "📝" },
    { path: "/surveys", label: "Surveys", icon: "📊" },
    { path: "/feedback", label: "Feedback", icon: "💬" },
    { path: "/recognitions", label: "Recognitions", icon: "🏆" },
    { path: "/notes", label: "Notes", icon: "📋" },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {navItems.find((item) => item.path === location.pathname)
                ?.label || ""}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Upgrade now
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-xl">🔔</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-xl">❓</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-xl">👤</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-orange-600 transition-colors"
            >
              SO
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
