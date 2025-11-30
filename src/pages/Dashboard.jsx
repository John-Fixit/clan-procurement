import React from "react";
import {
  LuAward,
  LuClipboardList,
  LuMessageSquare,
  LuTrendingUp,
} from "react-icons/lu";
import { FiCheckSquare } from "react-icons/fi";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Dashboard() {
  const { userData } = useCurrentUser();
  const profileData = userData?.data;
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-6">
      {/* <NewObjectiveModal /> */}
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
          Hello, {profileData?.FIRST_NAME?.toLowerCase()}{" "}
          {profileData?.LAST_NAME?.toLowerCase()} 👋
        </h1>
        <div className="flex gap-4 border-b border-gray-200">
          <button className="px-4 py-2 text-blue-600 border-b-2 border-blue-600 font-medium">
            Me
          </button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
            My Team
          </button>
          <button className="px-4 py-2 text-gray-500 hover:text-gray-700">
            My Organization
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Spans 2 columns */}
        <div className="lg:col-span-2 space-y-6 h-full">
          {/* Top Banner Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-8 h-48">
            <div className="space-y-3">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>

          {/* Objectives and Tasks Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* My Active Objectives */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <LuTrendingUp className="w-5 h-5 text-pink-500" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    My active objectives (1)
                  </h2>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                  + New objective
                </button>
              </div>

              <div className="mb-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-yellow-100 rounded flex items-center justify-center text-xs">
                    🎯
                  </div>
                  <span className="text-sm text-gray-700">
                    Increase Developer Success By 50%
                  </span>
                  <span className="ml-auto flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      55.7%
                    </span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center py-6">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#E5E7EB"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#3B82F6"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${56 * 2 * Math.PI * 0.56} ${
                        56 * 2 * Math.PI
                      }`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-800">
                      56%
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-3">Overall progress</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                    <span className="text-gray-600 text-xs">No status</span>
                  </div>
                  <span className="text-gray-500 text-xs">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-gray-600 text-xs">On track</span>
                  </div>
                  <span className="text-gray-500 text-xs">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <span className="text-gray-600 text-xs">At risk</span>
                  </div>
                  <span className="text-gray-500 text-xs">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    <span className="text-gray-600 text-xs">Off track</span>
                  </div>
                  <span className="text-gray-500 text-xs">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                    <span className="text-gray-600 text-xs">Closed</span>
                  </div>
                  <span className="text-gray-500 text-xs">0</span>
                </div>
              </div>

              <button className="text-blue-600 text-sm font-medium mt-4 hover:text-blue-700">
                View all →
              </button>
            </div>

            {/* My Tasks */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <FiCheckSquare className="w-5 h-5 text-pink-500" />
                  <h2 className="text-lg font-semibold text-gray-800">
                    My tasks (0)
                  </h2>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700">
                  + New task
                </button>
              </div>

              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiCheckSquare className="w-8 h-8 text-gray-300" />
                </div>
                <p className="text-gray-500 text-sm mb-6">
                  No incomplete tasks assigned to you.
                </p>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 flex items-center gap-2">
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
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  See how it works
                </button>
              </div>

              <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                View all →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Recognition */}
        <div className="lg:col-span-1 h-full">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <LuAward className="w-5 h-5 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                My latest recognition
              </h2>
            </div>

            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <LuAward className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm text-center mb-6">
                No recent recognition received.
              </p>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 flex items-center gap-2">
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
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                See how it works
              </button>
            </div>

            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              View all →
            </button>
          </div>
        </div>
      </div>
      {/* Bottom Row - Reviews, Surveys, Feedback */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* My Latest Review */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <LuClipboardList className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              My latest review
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LuClipboardList className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm text-center mb-6">
              No recent reviews received.
            </p>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 flex items-center gap-2">
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              See how it works
            </button>
          </div>

          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View all →
          </button>
        </div>

        {/* My Latest Survey */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <LuTrendingUp className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              My latest survey
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LuTrendingUp className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm text-center mb-6">
              No recent surveys assigned to you.
            </p>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 flex items-center gap-2">
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              See how it works
            </button>
          </div>

          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View all →
          </button>
        </div>

        {/* My Latest Feedback */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-6">
            <LuMessageSquare className="w-5 h-5 text-pink-500" />
            <h2 className="text-lg font-semibold text-gray-800">
              My latest feedback
            </h2>
          </div>

          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <LuMessageSquare className="w-8 h-8 text-gray-300" />
            </div>
            <p className="text-gray-500 text-sm text-center mb-6">
              No recent feedback received.
            </p>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 flex items-center gap-2">
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              See how it works
            </button>
          </div>

          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View all →
          </button>
        </div>
      </div>
    </div>
  );
}
