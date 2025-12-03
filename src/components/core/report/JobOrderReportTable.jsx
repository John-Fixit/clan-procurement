import { useState, useMemo } from "react";
import { DatePicker } from "antd";
import { LuChevronDown } from "react-icons/lu";
import { Avatar, Pagination } from "@heroui/react";
import dayjs from "dayjs";
import { preProfileLink } from "../../../utils/pre-profile-link";
import clsx from "clsx";

const { RangePicker } = DatePicker;

// Dummy data for demonstration
const dummyProjects = [
  {
    ID: 1,
    VENDOR_NAME: "ABC Construction Ltd",
    ORDER_TYPE: "Job Order",
    ORDER_NO: "JO-2024-001",
    DATE_AWARDED: "2024-01-15",
    DEPARTMENT_SUPPLIED: "Engineering",
    AMOUNT: "5,500,000",
  },
  {
    ID: 2,
    VENDOR_NAME: "XYZ Supplies Inc",
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "LPO-2024-002",
    DATE_AWARDED: "2024-02-20",
    DEPARTMENT_SUPPLIED: "Procurement",
    AMOUNT: "2,300,000",
  },
  {
    ID: 3,
    VENDOR_NAME: "Global Tech Solutions",
    ORDER_TYPE: "Job Order",
    ORDER_NO: "JO-2024-003",
    DATE_AWARDED: "2024-03-10",
    DEPARTMENT_SUPPLIED: "IT Department",
    AMOUNT: "8,750,000",
  },
  {
    ID: 4,
    VENDOR_NAME: "Premier Equipment Co",
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "LPO-2024-004",
    DATE_AWARDED: "2024-03-25",
    DEPARTMENT_SUPPLIED: "Operations",
    AMOUNT: "4,200,000",
  },
  {
    ID: 5,
    VENDOR_NAME: "Delta Manufacturing",
    ORDER_TYPE: "Job Order",
    ORDER_NO: "JO-2024-005",
    DATE_AWARDED: "2024-04-05",
    DEPARTMENT_SUPPLIED: "Production",
    AMOUNT: "6,100,000",
  },
  {
    ID: 6,
    VENDOR_NAME: "Omega Traders",
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "LPO-2024-006",
    DATE_AWARDED: "2024-05-12",
    DEPARTMENT_SUPPLIED: "Admin",
    AMOUNT: "1,850,000",
  },
  {
    ID: 7,
    VENDOR_NAME: "Sigma Engineering Works",
    ORDER_TYPE: "Job Order",
    ORDER_NO: "JO-2024-007",
    DATE_AWARDED: "2024-06-18",
    DEPARTMENT_SUPPLIED: "Engineering",
    AMOUNT: "9,400,000",
  },
  {
    ID: 8,
    VENDOR_NAME: "Beta Office Supplies",
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "LPO-2024-008",
    DATE_AWARDED: "2024-07-22",
    DEPARTMENT_SUPPLIED: "HR",
    AMOUNT: "950,000",
  },
  {
    ID: 9,
    VENDOR_NAME: "Alpha Construction Group",
    ORDER_TYPE: "Job Order",
    ORDER_NO: "JO-2024-009",
    DATE_AWARDED: "2024-08-30",
    DEPARTMENT_SUPPLIED: "Facilities",
    AMOUNT: "12,300,000",
  },
  {
    ID: 10,
    VENDOR_NAME: "Zeta Materials Ltd",
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "LPO-2024-010",
    DATE_AWARDED: "2024-09-14",
    DEPARTMENT_SUPPLIED: "Procurement",
    AMOUNT: "3,600,000",
  },
  {
    ID: 11,
    VENDOR_NAME: "Gamma Services",
    ORDER_TYPE: "Job Order",
    ORDER_NO: "JO-2024-011",
    DATE_AWARDED: "2024-10-05",
    DEPARTMENT_SUPPLIED: "Maintenance",
    AMOUNT: "7,200,000",
  },
  {
    ID: 12,
    VENDOR_NAME: "Theta Logistics",
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "LPO-2024-012",
    DATE_AWARDED: "2024-11-20",
    DEPARTMENT_SUPPLIED: "Logistics",
    AMOUNT: "2,750,000",
  },
];

const JobOrderReportTable = ({ dateRange, orderType, searchQuery }) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Filter projects based on date range, order type, and search
  const filteredProjects = useMemo(() => {
    let filtered = [...dummyProjects];

    // Filter by order type
    if (orderType !== "all") {
      filtered = filtered.filter((project) => project.ORDER_TYPE === orderType);
    }

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].startOf("day");
      const endDate = dateRange[1].endOf("day");

      filtered = filtered.filter((project) => {
        const projectDate = dayjs(project.DATE_AWARDED);
        return projectDate.isAfter(startDate) && projectDate.isBefore(endDate);
      });
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.VENDOR_NAME?.toLowerCase().includes(query) ||
          project.ORDER_NO?.toLowerCase().includes(query) ||
          project.DEPARTMENT_SUPPLIED?.toLowerCase().includes(query) ||
          project.ORDER_TYPE?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [dateRange, orderType, searchQuery]);

  const totalPage = Math.ceil(filteredProjects.length / pageSize);

  const tableData = useMemo(() => {
    return filteredProjects.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredProjects, page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const gradeTotalAmount = tableData.reduce((acc, curr) => {
    return acc + Number(curr.AMOUNT);
  }, 0);

  return (
    <div className="w-full">
      {/* Table Section */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-200">
              <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
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
                    Date Issued <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    Department <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-3 text-left">
                  <div className="flex items-center">
                    Amount <LuChevronDown className="ml-1 w-3 h-3" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={6}>
                    <div className="flex items-center justify-center h-44">
                      <div className="text-center">
                        <div className="text-gray-500 text-sm font-medium">
                          No records found
                        </div>
                        <p className="text-gray-400 text-xs mt-1">
                          Try adjusting your filters
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                tableData.map((project, index) => (
                  <tr
                    key={project.ID}
                    className={clsx(
                      "border-b border-gray-200 hover:bg-gray-50 transition-colors",
                      index % 2 && "bg-gray-100"
                    )}
                  >
                    <td className="px-6 py-3 flex items-center gap-2">
                      <Avatar
                        src={preProfileLink(project.VENDOR_NAME)}
                        size="sm"
                      />
                      <div className="font-outfit text-gray-700 font-medium text-sm">
                        {project.VENDOR_NAME}
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          project.ORDER_TYPE === "Job Order"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {project.ORDER_TYPE}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <h3 className="text-sm font-outfit text-gray-700 font-medium whitespace-nowrap">
                        {project.ORDER_NO}
                      </h3>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-outfit text-gray-500 text-sm">
                        {project.DATE_AWARDED}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-outfit text-gray-500 text-sm">
                        {project.DEPARTMENT_SUPPLIED}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-outfit text-gray-700 font-semibold text-sm">
                        {project.AMOUNT}
                      </span>
                    </td>
                  </tr>
                ))
              )}
              <tr className="bg-blue-100 py-2 px-6">
                <td colSpan={5} className="py-2 px-6">
                  GRAND TOTAL
                </td>
                <td className="bg-blue-100 py-2 px-6">{gradeTotalAmount}</td>
              </tr>
            </tbody>
          </table>

          {/* Pagination */}
          {tableData.length > 0 && (
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

export default JobOrderReportTable;
