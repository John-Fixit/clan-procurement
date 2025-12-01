import { useState } from "react";
import { CiLogout } from "react-icons/ci";
import {
  IoFolderOpenOutline,
  IoFolderOpenSharp,
  IoChevronDown,
  IoSettings,
  IoSettingsOutline,
  IoDocumentText,
  IoDocumentTextOutline,
  IoShieldOutline,
  IoShieldSharp,
} from "react-icons/io5";
import {
  MdAnalytics,
  MdApproval,
  MdOutlineAnalytics,
  MdOutlineRequestQuote,
  MdOutlineSpaceDashboard,
  MdRequestQuote,
  MdSpaceDashboard,
  MdStore,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import useSidebarStore from "../../../hooks/use-sidebar-store";
import clsx from "clsx";
import { RiSettings5Line } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@heroui/react";
import { useScreenSize } from "react-haiku";
import Button from "../ui/Button";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { HiOutlineShoppingBag, HiShoppingBag } from "react-icons/hi2";
import { AiFillMoneyCollect, AiOutlineMoneyCollect } from "react-icons/ai";

const Sidebar = () => {
  const currentPath = useLocation().pathname;

  const [dropDownTargetState, setDropdownTargetState] = useState(null);

  const screenSize = useScreenSize();

  const navigate = useNavigate();
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();

  const sidebarOpen = screenSize.gte("lg") ? true : isSidebarOpen;

  const routeNavigate = (path) => {
    navigate(path);
    // Close sidebar on mobile/tablet after navigation
    screenSize.lte("md") && toggleSidebar();
  };

  // Main navigation items
  const navItems = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: MdOutlineSpaceDashboard,
      activeIcon: MdSpaceDashboard,
    },
    // {
    //   path: "/okrs",
    //   label: "User Management",
    //   icon: FaRegUser,
    //   activeIcon: FaUserAlt,
    // },
    { path: "/vendor", label: "Vendors", icon: MdStore, activeIcon: MdStore },
    {
      path: "/project",
      label: "Projects",
      icon: IoFolderOpenOutline,
      activeIcon: IoFolderOpenSharp,
      relativePath: "/project",
      sub_menu: [
        {
          path: "/project/procurement",
          label: "Procurement",
          icon: HiOutlineShoppingBag,
          activeIcon: HiShoppingBag,
        },
        {
          path: "/project/request",
          label: "Request",
          icon: MdOutlineRequestQuote,
          activeIcon: MdRequestQuote,
        },
      ],
    },
    {
      path: "/report",
      label: "Report",
      icon: MdOutlineAnalytics,
      activeIcon: MdAnalytics,
    },
    {
      path: "/approval",
      label: "Approval",
      icon: MdApproval,
      activeIcon: MdApproval,
    },
    {
      path: "/setting",
      label: "Setting",
      icon: IoSettingsOutline,
      activeIcon: IoSettings,
      relativePath: "/setting",
      sub_menu: [
        {
          path: "/setting/tax",
          label: "Tax",
          icon: AiOutlineMoneyCollect,
          activeIcon: AiFillMoneyCollect,
        },
        {
          path: "/setting/document",
          label: "Document",
          icon: IoDocumentTextOutline,
          activeIcon: IoDocumentText,
        },
        {
          path: "/setting/permission",
          label: "Role & Permission",
          icon: IoShieldOutline,
          activeIcon: IoShieldSharp,
        },
      ],
    },
  ];

  return (
    <>
      {/* Overlay for mobile/tablet when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "bg-white border-r border-gray-200 flex flex-col h-screen transition-all duration-300 ease-in-out",
          // Mobile and Tablet (< 1024px): Fixed positioning, slides over content
          "fixed lg:relative inset-y-0 left-0 z-50",
          // Responsive width and visibility
          sidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full lg:translate-x-0 lg:w-16",
          // Shadow on mobile/tablet when open
          "lg:shadow-none",
          sidebarOpen && "shadow-2xl lg:shadow-none"
        )}
      >
        {/* Logo/Header */}
        <div
          className={clsx(
            "border-b border-gray-200 transition-all duration-300",
            sidebarOpen ? "p-6" : "lg:px-2 lg:py-5 p-6"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-pink-500 rounded shrink-0"></div>
            <h1
              className={clsx(
                "text-xl font-bold text-gray-800 transition-opacity duration-300",
                !sidebarOpen && "lg:hidden"
              )}
            >
              Get started
            </h1>
          </div>
        </div>

        {/* Navigation Items */}
        <nav
          className={clsx(
            "flex-1 overflow-y-auto transition-all duration-300",
            sidebarOpen ? "p-6" : "lg:px-2 lg:py-5 p-6"
          )}
        >
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              const Icon = isActive ? item?.activeIcon || item.icon : item.icon;
              const isDropActive = currentPath.startsWith(item.relativePath);

              console.log(isDropActive);

              const isMenuOpen =
                dropDownTargetState?.state &&
                dropDownTargetState?.menu?.path === item.path;
              return (
                <li key={item.path}>
                  <Tooltip
                    content={item.label}
                    placement="right"
                    isDisabled={sidebarOpen}
                    className="lg:block hidden"
                  >
                    {item?.sub_menu?.length ? (
                      <>
                        <button
                          onClick={() =>
                            setDropdownTargetState({
                              state: !dropDownTargetState?.state,
                              menu: item,
                            })
                          }
                          className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-left transition-all  cursor-pointer ${
                            isDropActive
                              ? " text-indigo-600 font-medium"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon size={20} className="shrink-0" />
                            <span
                              className={clsx(
                                "text-sm transition-opacity duration-300",
                                !sidebarOpen && "lg:hidden"
                              )}
                            >
                              {item.label}
                            </span>
                          </div>
                          <IoChevronDown
                            className={`text-sm transition-transform duration-300 ${
                              isMenuOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            isMenuOpen
                              ? "max-h-40 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <ul className="mt-1 space-y-1 pl-4">
                            {item?.sub_menu.map((item) => {
                              const isActive = currentPath === item.path;
                              const Icon = isActive
                                ? item?.activeIcon || item.icon
                                : item.icon;
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
                                    <Icon size={20} className="shrink-0" />
                                    {item.label}
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => routeNavigate(item.path)}
                        className={clsx(
                          "w-full flex items-center gap-3 py-2.5 rounded-lg text-left transition-all cursor-pointer",
                          isActive
                            ? "bg-indigo-50 text-indigo-600 font-medium"
                            : "text-gray-700 hover:bg-gray-50",
                          sidebarOpen
                            ? "px-4"
                            : "lg:px-3 lg:justify-center px-4"
                        )}
                      >
                        <Icon size={20} className="shrink-0" />
                        <span
                          className={clsx(
                            "text-sm transition-opacity duration-300",
                            !sidebarOpen && "lg:hidden"
                          )}
                        >
                          {item.label}
                        </span>
                      </button>
                    )}
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Actions */}
        <div
          className={clsx(
            "border-t border-gray-200 space-y-2 transition-all duration-300",
            sidebarOpen ? "px-4 py-4" : "lg:px-2 lg:py-4 px-4 py-4"
          )}
        >
          <Tooltip
            content="Logout"
            placement="right"
            isDisabled={sidebarOpen}
            className="lg:block hidden"
          >
            <LogoutPopover>
              <button
                className={clsx(
                  "w-full flex items-center gap-3 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-50 transition-all cursor-pointer",
                  sidebarOpen ? "px-4" : "lg:px-3 lg:justify-center px-4"
                )}
              >
                <CiLogout className="text-lg shrink-0" />
                <span
                  className={clsx(
                    "text-sm transition-opacity duration-300",
                    !sidebarOpen && "lg:hidden"
                  )}
                >
                  Logout
                </span>
              </button>
            </LogoutPopover>
          </Tooltip>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

const LogoutPopover = ({ children }) => {
  const { removeCurrentUser } = useCurrentUser();
  const navigate = useNavigate();
  const handleLogout = () => {
    removeCurrentUser();
    navigate("/login");
  };
  return (
    <Popover
      showArrow
      backdrop="opaque"
      classNames={{
        base: [
          // arrow color
          "before:bg-default-200",
        ],
        content: [
          "py-3 px-4 border border-default-200",
          "bg-linear-to-br from-white to-default-300",
          "dark:from-default-100 dark:to-default-50",
        ],
      }}
      placement="right"
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent>
        {(titleProps) => (
          <div className="px-1 py-2">
            <h3 className="text-small font-bold" {...titleProps}>
              Logout
            </h3>
            <div className="text-sm">Are you sure you want to logout?</div>
            <div className="mt-3 flex justify-end">
              <Button
                color={"primary"}
                variant={"solid"}
                onPress={handleLogout}
                size={"sm"}
                // isLoading={isLoggingout}
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};
