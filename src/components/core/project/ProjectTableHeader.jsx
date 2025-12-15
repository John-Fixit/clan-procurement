import { LuSearch } from "react-icons/lu";
import StarLoader from "../loaders/StarLoader";
import clsx from "clsx";
import { useGetStatus } from "../../../service/api/setting";

const ProjectTableHeader = ({
  searchQuery,
  setSearQuery,
  loading,
  statusCount,
  selectedStatus,
  setSelectedStatus,
}) => {
  const generateStatusColor = (index) => {
    const colors = [
      "bg-yellow-500",
      "bg-green-500",
      "bg-red-500",
      "bg-blue-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-fuchsia-500",
      "bg-gray-500",
      "bg-cyan-500",
      "bg-teal-500",
      "bg-lime-500",
      "bg-orange-500",
      "bg-sky-500",
    ];
    return colors[index % colors.length];
  };

  const { data: get_status, isPending: isGettingStatus } = useGetStatus();

  const statusOption =
    get_status?.map((status, index) => ({
      label:
        status?.NAME?.toLowerCase().charAt(0).toUpperCase() +
        status?.NAME?.toLowerCase().slice(1),
      value: status?.STATUS_ID,
      statusColor: generateStatusColor(index),
      activeColor: "bg-blue-100",
    })) || [];

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {
            <div className="flex flex-wrap items-center gap-2">
              {[
                {
                  label: "Draft",
                  value: 0,
                  statusColor: "bg-blue-500",
                  activeColor: "bg-blue-100",
                },
                ...statusOption,
              ]?.map((status) => (
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
                      <StarLoader size={14} />
                    ) : (
                      statusCount?.[status?.value]
                    )}{" "}
                    {status?.label}
                  </span>
                </button>
              ))}
              {isGettingStatus && <StarLoader size={18} />}
            </div>
          }

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
