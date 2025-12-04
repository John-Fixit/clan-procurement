import { useState } from "react";
import JobOrderReportTable from "../components/core/report/JobOrderReportTable";
import LocalPurchase from "../components/core/report/LocalPurchase";
import { DatePicker, Select } from "antd";
import { LuDownload } from "react-icons/lu";

const { RangePicker } = DatePicker;

const orderTypeOptions = [
  { label: "Purchase Request", value: "Job Order" },
  { label: "Vendor Performance", value: "Local Purchase Order" },
  { label: "Purchase Order Status", value: "Local Purchase Order" },
  { label: "Spend Analysis", value: "Local Purchase Order" },
  { label: "Inventory & Stock Reorder", value: "Local Purchase Order" },
];

const tableHeaders = {
  "Purchase Request": [
    {
      title: "Order No",
      dataIndex: "ORDER_NO",
      key: "ORDER_NO",
    },
    {
      title: "Department",
      dataIndex: "DEPARTMENT_SUPPLIED",
      key: "DEPARTMENT_SUPPLIED",
    },
    {
      title: "VENDOR",
      dataIndex: "VENDOR_NAME",
      key: "VENDOR_NAME",
    },
    {
      title: "Date Awarded",
      dataIndex: "DATE_AWARDER",
      key: "DATE_AWARDER",
    },
    {
      title: "Date Supplied",
      dataIndex: "DATE_SUPPLIED",
      key: "DATE_SUPPLIED",
    },
    {
      title: "Total Amount",
      dataIndex: "JOB_AMOUNT",
      key: "DATE_SUPPLIED",
      isMoney: true,
    },
    {
      title: "Status",
      dataIndex: "IS_APPROVED",
      key: "IS_APPROVED",
    },
  ],
};
export default function ProcurementReport() {
  const [dateRange, setDateRange] = useState(null);
  const [orderType, setOrderType] = useState("Job Order");
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-6 md:px-9 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                Procurement Report
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View and analyze procurement orders by date range and type
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6 space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <RangePicker
                  value={dateRange}
                  onChange={setDateRange}
                  format="YYYY-MM-DD"
                  className="w-full"
                  size="large"
                  placeholder={["Start Date", "End Date"]}
                  allowClear
                />
              </div>

              {/* Order Type Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Type
                </label>
                <Select
                  value={orderType}
                  onChange={setOrderType}
                  className="w-full"
                  options={orderTypeOptions}
                  size="large"
                />
              </div>

              {/* Search Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search
                </label>
                <input
                  type="text"
                  size={"large"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by vendor, order no..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <button
              // onClick={handleExport}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <LuDownload className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {orderType === "Job Order" && (
          <JobOrderReportTable
            dateRange={dateRange}
            orderType={orderType}
            setDateRange={setDateRange}
            setOrderType={setOrderType}
            searchQuery={searchQuery}
          />
        )}

        {orderType === "Local Purchase Order" && (
          <LocalPurchase
            dateRange={dateRange}
            orderType={orderType}
            setDateRange={setDateRange}
            setOrderType={setOrderType}
            searchQuery={searchQuery}
          />
        )}
      </div>
    </div>
  );
}
