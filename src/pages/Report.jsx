import { useMemo, useState } from "react";
import JobOrderReportTable from "../components/core/report/JobOrderReportTable";
import LocalPurchase from "../components/core/report/LocalPurchase";
import { DatePicker, Input, Result, Select } from "antd";
import { LuDownload } from "react-icons/lu";
import { useGetReport } from "../service/api/report";
import { format } from "date-fns";
import dayjs from "dayjs";
import clsx from "clsx";
import { formatNumberWithComma } from "../utils/formatCurrencyNumber";
import StarLoader from "../components/core/loaders/StarLoader";
import { Pagination } from "@heroui/react";

const { RangePicker } = DatePicker;

const orderTypeOptions = [
  { label: "Purchase Request", value: "PR_SUMMARY" },
  { label: "Vendor Performance", value: "VENDOR_PERFORMANCE" },
  { label: "Purchase Order Status", value: "PO_STATUS" },
  { label: "Deparment Spend Analysis", value: "SPEND_ANALYSIS" },
  { label: "Inventory & Stock Reorder", value: "INVENTORY_REORDER" },
];

const tableHeaders = {
  PR_SUMMARY: [
    {
      title: "Order Type",
      dataIndex: "ORDER_TYPE",
      key: "ORDER_TYPE",
    },
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
      dataIndex: "DATE_AWARDED",
      key: "DATE_AWARDED",
    },
    {
      title: "Date Supplied",
      dataIndex: "DATE_SUPPLIED",
      key: "DATE_SUPPLIED",
    },
    {
      title: "Total Amount",
      dataIndex: "JOB_AMOUNT",
      key: "JOB_AMOUNT",
      isMoney: true,
    },
    // {
    //   title: "Status",
    //   dataIndex: "IS_APPROVED",
    //   key: "IS_APPROVED",
    // },
  ],
  VENDOR_PERFORMANCE: [
    {
      title: "Vendor Name",
      key: "VENDOR_NAME",
    },
    {
      title: "Business",
      key: "BUSINESS",
    },
    {
      title: "Vendor Frequency",
      key: "vendor_frequency",
      align: "text-center",
    },
    {
      title: "Total Procurements",
      key: "total_procurements",
      align: "text-center",
    },
    {
      title: "Performance Score",
      key: "performance_percentage",
      percentage: true,
    },
  ],
  PO_STATUS: [
    {
      title: "Order Number",
      key: "ORDER_NO",
    },
    {
      title: "Vendor Name",
      key: "VENDOR_NAME",
    },
    {
      title: "Date Awarded",
      key: "DATE_AWARDED",
    },
    {
      title: "Date Supplied",
      key: "DATE_SUPPLIED",
    },
    {
      title: "Tax",
      key: "TAX_VALUE",
      percentage: true,
    },
    {
      title: "Total Amount",
      key: "JOB_AMOUNT",
      align: "text-center",
      isMoney: true,
    },
  ],
  SPEND_ANALYSIS: [
    {
      title: "Department",
      key: "department",
    },
    {
      title: "Total Amount",
      key: "total_spend",
      isMoney: true,
    },
    {
      title: "Percentage of total",
      key: "percentage",
      percentage: true,
    },
  ],
  INVENTORY_REORDER: [
    {
      title: "Product",
      key: "PRODUCT",
    },
    {
      title: "Quantity",
      key: "QUANTITY",
      align: "text-center",
    },
    {
      title: "Unit Price",
      key: "UNIT_PRICE",
      isMoney: true,
    },
    {
      title: "Tax Value",
      key: "TAX_VALUE",
      align: "text-center",
      percentage: true,
    },
    {
      title: "Total Amount",
      key: "JOB_AMOUNT",
      isMoney: true,
    },
    {
      title: "Description",
      key: "DESCRIPTION",
    },
  ],
};

const findReportTypeLabel = (type) => {
  const reportType = orderTypeOptions.find((option) => option.value === type);
  return reportType?.label;
};
export default function ProcurementReport() {
  const [dateRange, setDateRange] = useState([
    dayjs().startOf("month"), // 1st day of current month
    dayjs().endOf("month"), // last day of current month
  ]);
  const [orderType, setOrderType] = useState("PR_SUMMARY");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: get_report_data, isPending: isLoaingReport } = useGetReport({
    report_type: orderType,
    start_date: dateRange?.[0]
      ? format(dateRange?.[0], "yyyy-MM-dd")
      : dayjs().startOf("month").format("YYYY-MM-DD"),
    end_date: dateRange?.[1]
      ? format(dateRange?.[1], "yyyy-MM-dd")
      : dayjs().endOf("month").format("YYYY-MM-DD"),
  });

  const tableHeader = tableHeaders[orderType];

  const hasSearchFilter = Boolean(searchQuery?.trim());

  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const filteredReports = useMemo(() => {
    let prevData = get_report_data?.length ? [...get_report_data] : [];

    if (hasSearchFilter) {
      const value = searchQuery?.trim()?.toLowerCase();

      const updatedData = get_report_data?.filter((item) => {
        const matches = [
          item?.ORDER_TYPE?.toLowerCase(),
          item?.ORDER_NO?.toLowerCase(),
          item?.VENDOR_NAME?.toLowerCase(),
          item?.DEPARTMENT_SUPPLIED?.toLowerCase(),
          item?.JOB_AMOUNT?.toLowerCase(),
          item?.BUSINESS?.toLowerCase(),
          item?.department?.toLowerCase(),
        ].some((field) => field?.includes(value));

        return matches; //|| fullNameMatches;
      });

      prevData = updatedData.length ? updatedData : [];
    }

    return prevData;
  }, [hasSearchFilter, get_report_data, searchQuery]);
  const totalPage = Math.ceil(filteredReports?.length / pageSize);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const tableData = useMemo(() => {
    return filteredReports?.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredReports, page, pageSize]);

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
                <Input
                  type="text"
                  size={"large"}
                  value={searchQuery}
                  allowClear
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by vendor, order no..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            {/* <button
              // onClick={handleExport}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <LuDownload className="w-4 h-4" />
              Export Report
            </button> */}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-primary text-white">
            <div className="px-5 py-1">
              <h2 className="font-medium text-lg">
                {findReportTypeLabel(orderType)} Report
              </h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-200">
                <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {tableHeader?.map((header) => (
                    <th
                      key={header.key}
                      className={clsx(
                        "px-6 py-2 text-sm",
                        header.align ??
                          (header.isMoney ? "text-right" : "text-left")
                      )}
                    >
                      <div className="fle items-center">{header.title}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(!tableData || tableData?.length === 0) && (
                  <tr>
                    <td colSpan={tableHeader?.length}>
                      <div className="flex items-center justify-center h-44">
                        {isLoaingReport ? (
                          <StarLoader />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <div className="text-gray-500 text-sm font-medium">
                              No records found
                            </div>
                            <p className="text-gray-400 text-xs mt-1">
                              Try adjusting your filters
                            </p>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}

                {tableData?.map((row, index) => (
                  <tr
                    key={row.ID + index + "__report" + crypto.randomUUID()}
                    className={clsx(
                      "border-b border-gray-200",
                      index % 2 && "bg-gray-100"
                    )}
                  >
                    {tableHeader?.map((header) => (
                      <td
                        key={header.key}
                        className={clsx(
                          "px-6 py-2 text-sm",
                          header.align || "text-left"
                        )}
                      >
                        {header.isMoney ? (
                          <div className={"text-right"}>
                            {formatNumberWithComma(row[header.key])}
                          </div>
                        ) : header?.percentage ? (
                          Number(row[header.key])
                        ) : (
                          row[header.key]
                        )}
                        {header.percentage && "%"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="my-4 flex justify-end mx-6">
              <Pagination
                showControls
                initialPage={page}
                page={page}
                total={totalPage}
                onChange={handlePageChange}
              />
            </div>
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
