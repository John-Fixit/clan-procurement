import { useState } from "react";
import { CiLogout, CiSettings } from "react-icons/ci";
import { FaRegUser, FaUserAlt } from "react-icons/fa";
import {
  IoFolderOpenOutline,
  IoFolderOpenSharp,
  IoChevronDown,
} from "react-icons/io5";
import {
  MdAnalytics,
  MdOutlineAnalytics,
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
  MdStore,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [currentPath, setCurrentPath] = useState("/dashboard");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navigate = useNavigate();
  const routeNavigate = (path) => {
    setCurrentPath(path);
    navigate(path);
  };

  // Main navigation items
  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: MdOutlineSpaceDashboard,
      activeIcon: MdSpaceDashboard,
    },
    {
      path: "/okrs",
      label: "User Management",
      icon: FaRegUser,
      activeIcon: FaUserAlt,
    },
    { path: "/vendor", label: "Vendors", icon: MdStore, activeIcon: MdStore },
    {
      path: "/project",
      label: "Projects",
      icon: IoFolderOpenOutline,
      activeIcon: IoFolderOpenSharp,
    },
    {
      path: "/report",
      label: "Report",
      icon: MdOutlineAnalytics,
      activeIcon: MdAnalytics,
    },
  ];

  const settingsSubmenu = [
    { path: "/setting/tax", label: "Tax" },
    { path: "/setting/document", label: "Document" },
  ];

  const isSettingsActive = currentPath.startsWith("/setting");

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded"></div>
          <h1 className="text-xl font-bold text-gray-800">Get started</h1>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            const Icon = isActive ? item?.activeIcon || item.icon : item.icon;
            return (
              <li key={item.path}>
                <button
                  onClick={() => routeNavigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
        {/* Settings Dropdown */}
        <div>
          <button
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all ${
              isSettingsActive
                ? "bg-indigo-50 text-indigo-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <CiSettings className="text-lg" />
              <span className="text-sm">Settings</span>
            </div>
            <IoChevronDown
              className={`text-sm transition-transform duration-300 ${
                isSettingsOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu with Animation */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isSettingsOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <ul className="mt-1 space-y-1 pl-4">
              {settingsSubmenu.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <li key={item.path}>
                    <button
                      onClick={() => routeNavigate(item.path)}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-left transition-all text-sm ${
                        isActive
                          ? "bg-indigo-50 text-indigo-600 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {item.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button className="w-full bg-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
          Use In Teams
        </button>

        <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-all">
          <CiLogout className="text-lg" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
