import { LuSearch, LuPlus, LuSettings } from "react-icons/lu";
import useDrawerStore from "../hooks/useDrawerStore";
import ProjectTable from "../components/core/project/ProjectTable";
import ProjectTableHeader from "../components/core/project/ProjectTableHeader";
import { Tab, Tabs } from "@heroui/react";
import { Select } from "antd";
import Button from "../components/shared/ui/Button";

export default function Projects() {
  const { openDrawer } = useDrawerStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-9 py-4">
          <div className="flex items-center justify-between">
            <Tabs
              aria-label="Tabs variants"
              variant={"underlined"}
              color="primary"
            >
              <Tab key="photos" title="Pending" />
              <Tab key="music" title="Approved" />
              <Tab key="videos" title="Decline" />
            </Tabs>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <LuSettings className="w-5 h-5" />
              </button>

              <Button
                radius="sm"
                color="primary"
                onPress={() =>
                  openDrawer({
                    viewName: "create-project",
                    drawerSize: "950",
                  })
                }
              >
                <LuPlus className="w-4 h-4 mr-1" />
                Create project
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6">
        {/* <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <Select
              placeholder="active object"
              size="large"
              options={[{ label: "Active object", value: "" }]}
            />
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Show filters
            </button>
          </div>
          <div className="relative w-full sm:w-auto">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by owner or title"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64 md:w-80"
            />
          </div>
        </div> */}

        {/* Objectives Table */}
        <ProjectTable />
      </div>
    </div>
  );
}
