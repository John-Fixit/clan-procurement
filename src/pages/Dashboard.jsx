import React from "react";
import { LuAward } from "react-icons/lu";
import { FiCheckSquare } from "react-icons/fi";
import useCurrentUser from "../hooks/useCurrentUser";
import ProcurementBarChart from "../components/core/dashboard/ProcurementBarChart";
import { Avatar } from "@heroui/react";
import { preProfileLink } from "../utils/pre-profile-link";
import { formatNumberWithComma } from "../utils/formatCurrencyNumber";
import ProcurementPiechart from "../components/core/dashboard/ProcurementPiechart";
import StarLoader from "../components/core/loaders/StarLoader";
import DepartmentChart from "../components/core/dashboard/DepartmentChart";
import VendorChart from "../components/core/dashboard/VendorChart";
import { useGetAnnualVendor } from "../service/api/dashboard";

export default function Dashboard() {
  const { userData } = useCurrentUser();
  const profileData = userData?.data;

  const { data: get_report_data, isPending: isLoadingVendor } =
    useGetAnnualVendor();

  const top5Vendors = get_report_data
    ?.sort((a, b) => Number(b.total_amount) - Number(a.total_amount))
    ?.map((vendor) => ({
      ...vendor,
      total_amount: Number(vendor?.total_amount),
    }))
    .slice(0, 5);

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
              {isLoadingVendor ? (
                <div className="h-32 flex items-center justify-center">
                  <StarLoader />
                </div>
              ) : top5Vendors?.length === 0 ? (
                <div className="h-32 flex items-center justify-center text-gray-500">
                  <p>No Data Found</p>
                </div>
              ) : (
                top5Vendors?.map((vendor, index) => (
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
                              {vendor?.frequency} projects
                            </span>
                          </p>
                        </div>
                      </div>
                      <div className="text-gray-500 text-sm">
                        <p className="font-medium text-gray-700">Amount</p>
                        <p>
                          {formatNumberWithComma(Number(vendor.total_amount))}
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
    </div>
  );
}
