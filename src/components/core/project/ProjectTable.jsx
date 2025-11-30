import { LuChevronDown } from "react-icons/lu";
import ActionIcons from "../../shared/ActionIcons";
import ProjectTableHeader from "./ProjectTableHeader";
import { useGetProject } from "../../../service/api/project";
import { useMemo } from "react";
import StarLoader from "../loaders/StarLoader";
import { Result } from "antd";

const ProjectTable = () => {
  const {
    data: get_projects,
    isError,
    isPending: isLoadingProject,
  } = useGetProject();

  const projects = useMemo(() => get_projects || [], [get_projects]);
  return (
    <>
      <ProjectTableHeader />
      <div className="w-full">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">Order Type</div>
                      <button className="text-gray-400 hover:text-gray-600">
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
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </button>
                      {/* <button className="text-gray-400 hover:text-gray-600">
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
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </button> */}
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
                      Vendor <LuChevronDown className="ml-1 w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      Recipient <LuChevronDown className="ml-1 w-3 h-3" />
                    </div>
                  </th>

                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects?.length === 0 ? (
                  <tr>
                    <td colSpan={6}>
                      <div className="flex items-center justify-center h-44">
                        <div className="w-full h-full flex flex-col items-center justify-center">
                          {isLoadingProject ? (
                            <div className="flex justify-center items-center">
                              <StarLoader />
                            </div>
                          ) : isError ? (
                            <Result
                              status={"error"}
                              title="An unexpected error occurred"
                              classNames={{
                                title: "text-gray-500! text-base!",
                              }}
                            />
                          ) : (
                            // Empty State
                            <div className="flex flex-col items-center justify-center w-full h-full">
                              <div className="text-gray-500 text-sm font-medium">
                                No projects found
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  projects?.map((project, index) => (
                    <tr
                      key={index + "___project"}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center space-x-2 font-primary">
                          <span>{project?.ORDER_TYPE}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <h3 className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                          {project?.ORDER_NO}
                        </h3>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-outfit text-gray-500 text-sm">
                          {project?.DATE_AWARDED}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-outfit text-gray-500 text-sm">
                          {project?.VENDOR?.FULLNAME}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-outfit text-gray-500 text-sm">
                          {project?.DEPARTMENT_SUPPLIED}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center justify-between space-x-2">
                          <ActionIcons variant={"VIEW"} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectTable;
