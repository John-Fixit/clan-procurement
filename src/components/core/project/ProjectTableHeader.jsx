import React from "react";
import {
  LuLayoutGrid,
  LuList,
  LuSearch,
  LuShare2,
  LuUsers,
} from "react-icons/lu";

const ProjectTableHeader = () => {
  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2 shrink-0"></span>
              <span className="hidden sm:inline">0 No status</span>
              <span className="sm:hidden">0 None</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2 shrink-0"></span>
              <span className="hidden sm:inline">0 Off track</span>
              <span className="sm:hidden">0 Off</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 shrink-0"></span>
              <span className="hidden sm:inline">0 At risk</span>
              <span className="sm:hidden">0 Risk</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shrink-0"></span>
              <span className="hidden sm:inline">1 On track</span>
              <span className="sm:hidden">1 On</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center whitespace-nowrap">
              <span className="w-2 h-2 bg-gray-900 rounded-full mr-2 shrink-0"></span>
              <span className="hidden sm:inline">0 Closed</span>
              <span className="sm:hidden">0 Close</span>
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
        </div>
      </div>
    </>
  );
};

export default ProjectTableHeader;
