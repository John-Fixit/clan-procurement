// src/layout/home-layout/HomeLayout.jsx
import { Outlet } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import Sidebar from "../../components/shared/sidebar/Sidebar";
import { Avatar, Button } from "@heroui/react";
import { FaBars, FaBell } from "react-icons/fa";
import useSidebarStore from "../../hooks/use-sidebar-store";
import { preProfileLink } from "../../utils/pre-profile-link";

const HomeLayout = () => {
  const { userData } = useCurrentUser();

  const profileData = userData?.data;

  const { toggleSidebar } = useSidebarStore();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* <h2 className="text-2xl font-semibold text-gray-800">
              {navItems.find((item) => item.path === location.pathname)
                ?.label || ""}
            </h2> */}
            <div className="cursor-pointer lg:hidden" onClick={toggleSidebar}>
              <FaBars size={23} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity">
              Upgrade now
            </button> */}
            <Button isIconOnly size="sm" variant="light">
              <FaBell size={20} />
            </Button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span>❓</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span>👤</span>
            </button>

            <Avatar
              className="w-10 h-10 cursor-pointer"
              src={preProfileLink(
                `${profileData?.FIRST_NAME} ${profileData?.LAST_NAME}`
              )}
            />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomeLayout;
