import { LuSearch, LuPlus, LuSettings } from "react-icons/lu";
import ProjectTable from "../components/core/project/ProjectTable";
import ProjectTableHeader from "../components/core/project/ProjectTableHeader";
import { Tab, Tabs } from "@heroui/react";
import { Select } from "antd";

export default function Approval() {
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
              <Tab key="pending" title="Pending" />
              <Tab key="approves" title="Approved" />
              <Tab key="declined" title="Declined" />
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6">
        {/* Filters and Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div>
              <Select
                placeholder="active object"
                options={[{ label: "Active object", value: "" }]}
              />
            </div>
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
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by owner or title"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-80"
            />
          </div>
        </div>

        {/* <ProjectTableHeader /> */}

        <ProjectTable />
      </div>
    </div>
  );
}
