import React, { useState } from "react";
import {
  MdClose,
  MdCalendarToday,
  MdLabel,
  MdGroup,
  MdInfo,
  MdAutoAwesome,
} from "react-icons/md";
import { IoChevronDown } from "react-icons/io5";

export default function ObjectiveForm() {
  const [objectiveType, setObjectiveType] = useState("Individual");
  const [visibility, setVisibility] = useState("Public");
  const [metric, setMetric] = useState("Percent");
  const [initialValue, setInitialValue] = useState("0");
  const [targetValue, setTargetValue] = useState("100");

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-800">
            New objective
          </h1>
          <button className="text-gray-400 hover:text-gray-600">
            <MdClose size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Objective Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objective title
              </label>
              <input
                type="text"
                placeholder="Enter your objective title, e.g., 'Increase Sales by 10% in Q4'"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="flex items-center gap-2 text-blue-600 text-sm mt-2 hover:text-blue-700">
                <MdAutoAwesome size={16} />
                Generate description with AI
              </button>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                placeholder="Detail your objective, e.g., 'Boost quarterly sales by 12% by expanding into the European market and launching a targeted ad campaign in Q4.'"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Objective Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Objective type{" "}
                <a href="#" className="text-blue-600 text-xs">
                  (Customize objective types)
                </a>
              </label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { name: "Individual", icon: "👤", color: "purple" },
                  { name: "Self-development", icon: "🌱", color: "green" },
                  { name: "Department", icon: "👥", color: "pink" },
                  { name: "Company", icon: "🏢", color: "blue" },
                ].map((type) => (
                  <button
                    key={type.name}
                    onClick={() => setObjectiveType(type.name)}
                    className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                      objectiveType === type.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        type.color === "purple"
                          ? "bg-purple-100"
                          : type.color === "green"
                          ? "bg-green-100"
                          : type.color === "pink"
                          ? "bg-pink-100"
                          : "bg-blue-100"
                      }`}
                    >
                      <span className="text-2xl">{type.icon}</span>
                    </div>
                    <span className="text-xs text-gray-700 text-center">
                      {type.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Owner */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Owner(s)
              </label>
              <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white font-semibold text-sm">
                    SO
                  </div>
                  <span className="text-sm text-gray-700">Soji Okunuga</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MdClose size={16} />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
            </div>

            {/* Measurement */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How do you want to measure this objective?
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>🎯 Reach</option>
                </select>
                <IoChevronDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Metric */}
            <div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Metric
                  </label>
                  <div className="relative">
                    <select
                      value={metric}
                      onChange={(e) => setMetric(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option>Percent</option>
                      <option>Number</option>
                      <option>Currency</option>
                    </select>
                    <IoChevronDown
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initial
                  </label>
                  <input
                    type="number"
                    value={initialValue}
                    onChange={(e) => setInitialValue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target
                  </label>
                  <input
                    type="number"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Start/End Date */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MdCalendarToday size={16} />
                Start/End date
              </label>
              <div className="px-4 py-3 border border-gray-300 rounded-lg bg-white">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MdCalendarToday size={16} />
                  <span>Custom dates (Nov 24, 2025 - Dec 11, 2025)</span>
                </div>
              </div>
            </div>

            {/* Parent Objective */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Target size={16} />
                Parent objective
              </label>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50">
                <span className="text-gray-400 text-sm">+ Add</span>
              </button>
            </div>

            {/* Labels */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MdLabel size={16} />
                Labels
              </label>
              <button className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-left flex items-center justify-between hover:bg-gray-50">
                <span className="text-gray-400 text-sm">+ Add</span>
              </button>
            </div>

            {/* Related Groups */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <MdGroup size={16} />
                Related groups
                <MdInfo size={14} className="text-gray-400" />
              </label>
              <div className="relative">
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-400">
                  <option>Select group</option>
                </select>
                <IoChevronDown
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>

            {/* Visibility */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                👁️ Visibility
              </label>
              <div className="flex gap-3">
                <button
                  onClick={() => setVisibility("Private")}
                  className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    visibility === "Private"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  🔒 Private
                </button>
                <button
                  onClick={() => setVisibility("Public")}
                  className={`flex-1 px-6 py-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    visibility === "Public"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  🌐 Public {visibility === "Public" && "✓"}
                </button>
              </div>
              <label className="flex items-start gap-2 mt-3">
                <input type="checkbox" className="mt-1" />
                <div>
                  <div className="text-sm text-gray-700">
                    Make comments private
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    ℹ️ Public objectives are visible to everyone in the
                    organization
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Create Button */}
        <div className="flex justify-end mt-8">
          <button className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

function Target({ size }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
