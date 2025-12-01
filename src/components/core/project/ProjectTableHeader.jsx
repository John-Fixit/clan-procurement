import { LuSearch } from "react-icons/lu";
import StarLoader from "../loaders/StarLoader";
import clsx from "clsx";

const ProjectTableHeader = ({
  searchQuery,
  setSearQuery,
  loading,
  statusCount,
  selectedStatus,
  setSelectedStatus,
}) => {
  const statusOption = [
    {
      label: "Pending",
      value: "pending",
      statusColor: "bg-yellow-500",
      activeColor: "bg-blue-100",
    },
    {
      label: "Approved",
      value: "approved",
      statusColor: "bg-green-500",
      activeColor: "bg-blue-100",
    },
    {
      label: "Declined",
      value: "declined",
      statusColor: "bg-red-500",
      activeColor: "bg-blue-100",
    },
  ];

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {statusOption?.map((status) => (
              <button
                className={clsx(
                  "px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700  flex items-center whitespace-nowrap cursor-pointer",
                  status?.value === selectedStatus ? status.activeColor : ""
                )}
                onClick={() => setSelectedStatus(status?.value)}
              >
                <span
                  className={clsx(
                    "w-2 h-2 rounded-full mr-2 shrink-0",
                    status?.statusColor
                  )}
                ></span>
                <span className="inline">
                  {loading?.[status?.value] ? (
                    <StarLoader size={18} />
                  ) : (
                    statusCount?.[status?.value]
                  )}{" "}
                  {status?.label}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-auto">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by owner or title"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64 md:w-80"
              value={searchQuery}
              onChange={(e) => setSearQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTableHeader;
