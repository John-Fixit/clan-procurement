import React from "react";
import {
  LuAward,
  LuClipboardList,
  LuMessageSquare,
  LuTrendingUp,
} from "react-icons/lu";
import { FiCheckSquare } from "react-icons/fi";
import useCurrentUser from "../hooks/useCurrentUser";
import ProcurementBarChart from "../components/core/dashboard/ProcurementBarChart";
import { Avatar } from "@heroui/react";
import { preProfileLink } from "../utils/pre-profile-link";
import { formatNumberWithComma } from "../utils/formatCurrencyNumber";
import ProcurementPiechart from "../components/core/dashboard/ProcurementPiechart";
import { useGetReport } from "../service/api/report";
import dayjs from "dayjs";
import StarLoader from "../components/core/loaders/StarLoader";
import DepartmentChart from "../components/core/dashboard/DepartmentChart";
import VendorChart from "../components/core/dashboard/VendorChart";

export default function Dashboard() {
  const { userData } = useCurrentUser();
  const profileData = userData?.data;

  const { data: get_report_data, isPending: isLoaingVendor } = useGetReport({
    report_type: "VENDOR_PERFORMANCE",
    start_date: dayjs().startOf("month").format("YYYY-MM-DD"),
    end_date: dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 capitalize">
          Hello, {profileData?.FIRST_NAME?.toLowerCase()}{" "}
          {profileData?.LAST_NAME?.toLowerCase()} 👋
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6 h-full">
          <div className="bg-white rounded-lg border border-gray-200 p-8 h48">
            <ProcurementBarChart />
          </div>

          {/* Objectives and Tasks Row */}
        </div>
        {/* Right Column - Recognition */}
        <div className="lg:col-span-1 h-full">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-pink-50 rounded-lg">
                <LuAward className="w-5 h-5 text-pink-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">
                Top 5 Vendors
              </h2>
            </div>
            <div className="space-y-3">
              {isLoaingVendor ? (
                <div className="h-32 flex items-center justify-center">
                  <StarLoader />
                </div>
              ) : get_report_data?.length === 0 ? (
                <div className="h-32 flex items-center justify-center text-gray-500">
                  <p>No Data Found</p>
                </div>
              ) : (
                get_report_data?.map((vendor, index) => (
                  <div
                    className="group border rounded-xl border-gray-200 bg-linear-to-br from-gray-50 to-white hover:shadow-md hover:border-pink-200 transition-all duration-200"
                    key={index}
                  >
                    <div className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <Avatar src={preProfileLink(vendor.VENDOR_NAME)} />
                        </div>
                        <div className="text-gray-700 text-sm font-medium font-primary">
                          {vendor.VENDOR_NAME}
                          <p>
                            <span className="text-gray-400 ">
                              {vendor?.vendor_frequency} projects
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-500 text-sm">
                        <p className="font-medium text-gray-700">Amount</p>
                        <p>
                          {formatNumberWithComma(
                            Number(vendor.performance_percentage) * 13000
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <LuAward className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 text-sm text-center mb-6">
                No Vendors
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProcurementPiechart />

        {/* My Tasks */}
        <div className="col-span2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiCheckSquare className="w-5 h-5 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Department Performance
              </h2>
            </div>
          </div>

          <DepartmentChart />
        </div>
        <div className="col-span2 bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FiCheckSquare className="w-5 h-5 text-pink-500" />
              <h2 className="text-lg font-semibold text-gray-800">
                Vendors Performance
              </h2>
            </div>
          </div>

          <VendorChart />
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
