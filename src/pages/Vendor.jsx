import {
  LuSearch,
  LuPlus,
  LuSettings,
  LuChevronDown,
  LuList,
  LuLayoutGrid,
  LuShare2,
  LuUsers,
} from "react-icons/lu";
import { FiMoreHorizontal } from "react-icons/fi";
import useDrawerStore from "../hooks/useDrawerStore";
import Button from "../components/shared/ui/Button";

export default function Vendor() {
  const { openDrawer } = useDrawerStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-9 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Vendor</h2>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <LuSettings className="w-5 h-5" />
              </button>

              <Button
                radius="sm"
                color="primary"
                onPress={() =>
                  openDrawer({
                    viewName: "create-vendor",
                    drawerSize: "950",
                  })
                }
              >
                <LuPlus className="w-4 h-4 mr-1" />
                Create Vendor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6">
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button className="flex items-center px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <span className="truncate max-w-[120px] sm:max-w-none">
                Active obje...
              </span>
              <LuChevronDown className="ml-2 w-4 h-4 shrink-0" />
            </button>
            <button className="flex items-center px-3 sm:px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg
                className="w-4 h-4 mr-2 shrink-0"
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
              <span className="hidden xs:inline">Show filters</span>
              <span className="xs:hidden">Filters</span>
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

        {/* Progress Overview */}
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

        {/* Objectives Table */}
        <div className="w-full">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">Name</div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>

                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">
                        Email <LuChevronDown className="ml-1 w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">
                        Business <LuChevronDown className="ml-1 w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">
                        Contact <LuChevronDown className="ml-1 w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">
                        Tax <LuChevronDown className="ml-1 w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">
                        Date Added <LuChevronDown className="ml-1 w-3 h-3" />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center shrink-0">
                          <LuUsers className="w-4 h-4 text-yellow-700" />
                        </div>
                        <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0">
                          SO
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <h3 className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                        abc@gmail.com
                      </h3>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-outfit text-gray-500 text-sm">
                        Fintech
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-outfit text-gray-500 text-sm">
                        090928xxxxxxxx
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-outfit text-gray-500 text-sm"></span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-between space-x-2">
                        <span className="text-sm text-gray-600 whitespace-nowrap">
                          Dec 31, 2026
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 shrink-0">
                          <FiMoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
