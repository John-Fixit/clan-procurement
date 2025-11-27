import React, { useState } from "react";
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

export default function Projects() {
  const [activeTab, setActiveTab] = useState("my-objectives");

  const { openDrawer } = useDrawerStore();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-9 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("my-objectives")}
                className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "my-objectives"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                My objectives
              </button>
              <button
                onClick={() => setActiveTab("groups")}
                className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "groups"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Groups
              </button>
              <button className="flex items-center pb-3 px-1 font-medium text-sm text-gray-500 hover:text-gray-700">
                Department <LuChevronDown className="ml-1 w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab("company")}
                className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "company"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Company
              </button>
              <button
                onClick={() => setActiveTab("all-objectives")}
                className={`pb-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "all-objectives"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                All objectives
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <LuSettings className="w-5 h-5" />
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 flex items-center"
                onClick={() =>
                  openDrawer({
                    viewName: "create-project",
                    drawerSize: "1000px",
                  })
                }
              >
                <LuPlus className="w-4 h-4 mr-1" />
                Create Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6">
        {/* Filters and Search Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Active obje... <LuChevronDown className="ml-2 w-4 h-4" />
            </button>
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

        {/* Progress Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
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
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                0 At risk
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                1 On track
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
        </div>

        {/* Objectives Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1 flex items-center space-x-2">
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
              <div className="col-span-4 flex items-center">
                Title <LuChevronDown className="ml-1 w-3 h-3" />
              </div>
              <div className="col-span-2 flex items-center">
                Labels <LuChevronDown className="ml-1 w-3 h-3" />
              </div>
              <div className="col-span-2 flex items-center">
                Progress <LuChevronDown className="ml-1 w-3 h-3" />
              </div>
              <div className="col-span-2 flex items-center">
                Status <LuChevronDown className="ml-1 w-3 h-3" />
              </div>
              <div className="col-span-1 flex items-center">
                End date <LuChevronDown className="ml-1 w-3 h-3" />
              </div>
            </div>
          </div>

          {/* Table Row */}
          <div className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
            <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
              <div className="col-span-1 flex items-center space-x-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                  <LuUsers className="w-4 h-4 text-yellow-700" />
                </div>
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  SO
                </div>
              </div>
              <div className="col-span-4">
                <h3 className="text-sm font-medium text-gray-900">
                  Increase Developer Success By 50%
                </h3>
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                  High priority
                </span>
              </div>
              <div className="col-span-2">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "55.7%" }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    55.7%
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-300">
                  On track
                </span>
              </div>
              <div className="col-span-1 flex items-center justify-between">
                <span className="text-sm text-gray-600">Dec 31, 2026</span>
                <button className="text-gray-400 hover:text-gray-600">
                  <FiMoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback Banner */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
          <svg
            className="w-5 h-5 text-blue-600 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="text-sm text-blue-900">
            Want to share your feedback about our OKRs module?
          </span>
        </div>
      </div>
    </div>
  );
}
