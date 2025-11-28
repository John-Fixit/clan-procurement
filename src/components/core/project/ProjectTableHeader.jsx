import React from "react";
import { LuLayoutGrid, LuList, LuShare2, LuUsers } from "react-icons/lu";

const ProjectTableHeader = () => {
  return (
    <>
      {/* <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#E5E7EB"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#4F46E5"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40 * 0.56} ${
                      2 * Math.PI * 40
                    }`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-indigo-600">
                    56%
                  </span>
                </div>
              </div>
              <div className="mt-3 text-center">
                <p className="text-sm font-medium text-gray-900">
                  Overall progress
                </p>
                <p className="text-xs text-gray-500">
                  Set/edit objective weights
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
              <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>0
              No status
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
              <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>0
              Off track
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
              <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>0
              At risk
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>1
              On track
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
              <span className="w-2 h-2 bg-gray-900 rounded-full mr-2"></span>0
              Closed
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Expand all
            </button>
            <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Collapse all
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
              <LuList className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
              <LuLayoutGrid className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
              <LuShare2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
              <LuUsers className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div> */}
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

          {/* Action Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-300">
            <div className="flex items-center gap-2">
              <button className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium whitespace-nowrap">
                Expand all
              </button>
              <button className="text-xs sm:text-sm text-indigo-600 hover:text-indigo-700 font-medium whitespace-nowrap">
                Collapse all
              </button>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                aria-label="List view"
              >
                <LuList className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                aria-label="Grid view"
              >
                <LuLayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                aria-label="Share"
              >
                <LuShare2 className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
                aria-label="Users"
              >
                <LuUsers className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTableHeader;
