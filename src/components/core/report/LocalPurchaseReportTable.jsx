import { LuChevronDown, LuChevronRight } from "react-icons/lu";
import React, { useState, useMemo } from "react";
import { Avatar, Pagination } from "@heroui/react";
import { Result } from "antd";
import StarLoader from "../loaders/StarLoader";
import { preProfileLink } from "../../../utils/pre-profile-link";

const LocalPurchaseReportTable = ({ projects, isLoading, isError }) => {
  const [expandedRows, setExpandedRows] = useState({ 0: true });
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const totalPage = Math.ceil(projects?.length / pageSize);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const tableData = useMemo(() => {
    return projects?.slice((page - 1) * pageSize, page * pageSize);
  }, [projects, page, pageSize]);

  const calculateTotal = (items) => {
    return items?.reduce((sum, item) => {
      const price = parseFloat(item.unit_price) || 0;
      const qty = parseInt(item.quantity) || 0;
      return sum + price * qty;
    }, 0);
  };

  console.log(expandedRows);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-200">
              <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3 text-left w-10"></th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    Vendor <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    Order Type <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    Order Number <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    Date Awarded <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    Department <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-right">
                  <div className="flex items-center justify-end">Amount</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex items-center justify-center h-44">
                      <StarLoader />
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex items-center justify-center h-44">
                      <Result
                        status="error"
                        title="An unexpected error occurred"
                        classNames={{
                          title: "text-gray-500! text-base!",
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ) : projects?.length === 0 || tableData?.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <div className="flex items-center justify-center h-44">
                      <div className="text-gray-500 text-sm font-medium">
                        No reports found
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                tableData?.map((project, index) => (
                  <React.Fragment key={project.ID + index}>
                    <tr
                      key={project.ID}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer bg-blue-100"
                      onClick={() => toggleRow(index)}
                    >
                      <td className="px-6 py-1">
                        <button className="text-gray-400 hover:text-gray-600">
                          {expandedRows[index] ? (
                            <LuChevronDown className="w-4 h-4" />
                          ) : (
                            <LuChevronRight className="w-4 h-4" />
                          )}
                        </button>
                      </td>
                      <td className="px-6 py-1">
                        <div className="flex items-center gap-2">
                          <Avatar
                            src={preProfileLink(project?.VENDOR_NAME)}
                            size="sm"
                          />
                          <div className="font-outfit text-gray-700 font-medium text-sm">
                            {project?.VENDOR_NAME}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-1">
                        <span className="font-outfit text-gray-500 text-sm">
                          {project?.ORDER_TYPE}
                        </span>
                      </td>
                      <td className="px-6 py-1">
                        <h3 className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                          {project?.ORDER_NO}
                        </h3>
                      </td>
                      <td className="px-6 py-1">
                        <span className="font-outfit text-gray-500 text-sm">
                          {project?.DATE_AWARDED}
                        </span>
                      </td>
                      <td className="px-6 py-1">
                        <span className="font-outfit text-gray-500 text-sm">
                          {project?.DEPARTMENT_SUPPLIED}
                        </span>
                      </td>
                      <td className="px-6 py-1 text-right">
                        <span className="font-outfit text-gray-700 font-semibold text-sm">
                          ₦{calculateTotal(project?.items)?.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                    {expandedRows[index] && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-6 py-4">
                          <div className="ml-8">
                            <h4 className="text-sm font-semibold text-gray-700 mb-3">
                              Order Items
                            </h4>
                            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                              <table className="w-full">
                                <thead className="bg-orange-100 border-b border-gray-200">
                                  <tr className="text-xs font-medium text-gray-500 uppercase">
                                    <th className="px-4 py-2 text-left">
                                      Description
                                    </th>
                                    <th className="px-4 py-2 text-left">
                                      Product Name
                                    </th>
                                    <th className="px-4 py-2 text-center">
                                      Quantity
                                    </th>
                                    <th className="px-4 py-2 text-right">
                                      Unit Price
                                    </th>
                                    <th className="px-4 py-2 text-right">
                                      Total
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {project?.items?.map((item, idx) => (
                                    <tr
                                      key={idx}
                                      className="border-b border-gray-100 last:border-0"
                                    >
                                      <td className="px-4 py-3 text-sm text-gray-600">
                                        {item?.description || "N/A"}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-gray-600">
                                        {item?.product_name || "N/A"}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-gray-600 text-center">
                                        {item?.quantity || 0}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-gray-600 text-right">
                                        ₦
                                        {parseFloat(
                                          item?.unit_price || 0
                                        ).toLocaleString()}
                                      </td>
                                      <td className="px-4 py-3 text-sm text-gray-700 font-semibold text-right">
                                        ₦
                                        {(
                                          (parseFloat(item?.unit_price) || 0) *
                                          (parseInt(item?.quantity) || 0)
                                        ).toLocaleString()}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-3 flex justify-between text-sm">
                              <div className="text-gray-600">
                                <span className="font-medium">
                                  Received By:
                                </span>{" "}
                                {project?.RECEIVED_BY || "N/A"}
                              </div>
                              <div className="text-gray-600">
                                <span className="font-medium">Note No:</span>{" "}
                                {project?.RECEIVED_NOTE_NO || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
          {tableData?.length > 0 && (
            <div className="my-4 flex justify-end mx-6">
              <Pagination
                showControls
                initialPage={page}
                page={page}
                total={totalPage}
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocalPurchaseReportTable;
