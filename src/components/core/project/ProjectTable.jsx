import { LuChevronDown } from "react-icons/lu";
import ActionIcons from "../../shared/ActionIcons";
import ProjectTableHeader from "./ProjectTableHeader";
import { useGetProjectByMutation } from "../../../service/api/project";
import { useMemo, useState } from "react";
import StarLoader from "../loaders/StarLoader";
import { Result } from "antd";
import useDrawerStore from "../../../hooks/useDrawerStore";
import { Avatar, Pagination } from "@heroui/react";
import { catchErrFunc } from "../../../utils/catchErrFunc";
import { preProfileLink } from "../../../utils/pre-profile-link";
import { formatNumberWithComma } from "../../../utils/formatCurrencyNumber";

const ProjectTable = ({
  projects,
  isError,
  isLoadingProject,
  is_approval,
  setSelectedStatus,
  selectedStatus,
  visible_status,
  canEdit,
}) => {
  const { openDrawer } = useDrawerStore();

  const [selectedProject, setSelectedProject] = useState({
    id: null,
    action: null,
  });
  const [searchQuery, setSearQuery] = useState("");

  const { mutateAsync: mutateGetProjectDetail, isPending: isPendingDetail } =
    useGetProjectByMutation();

  const handleGetVendorDetail = async (project, action) => {
    setSelectedProject({ id: project?.ID || project?.PROCUREMENT_ID, action });
    try {
      const projectDetail = await mutateGetProjectDetail(
        project?.ID || project?.PROCUREMENT_ID
      );

      const support_documents = projectDetail?.support_documents;

      const details = {
        ...projectDetail,
        ...project,
        data: {
          ...projectDetail,
        },
        procurement_items: projectDetail?.procurement_items,
        approvers: projectDetail?.approval_request,
        notes: [],
        support_documents,
      };

      if (action === "EDIT") {
        openDrawer({
          viewName: "create-project",
          projectDetail: details,
          drawerSize: "950",
        });
      } else {
        openDrawer({
          viewName: "project-detail",
          drawerSize:
            details?.RODER_TYPE === "Local Purchase Order" ? "1200" : null,
          projectDetail: details,
          is_approval,
        });
      }
    } catch (err) {
      catchErrFunc(err);
    }
  };

  const hasSearchFilter = Boolean(searchQuery?.trim());

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const filteredProjects = useMemo(() => {
    let prevData = projects?.length ? [...projects] : [];

    if (hasSearchFilter) {
      const value = searchQuery?.trim()?.toLowerCase();

      const updatedData = projects?.filter((item) => {
        const matches = [
          item?.ORDER_TYPE?.toLowerCase(),
          item?.ORDER_NO?.toLowerCase(),
          item?.VENDOR_NAME?.toLowerCase(),
          item?.DEPARTMENT_SUPPLIED?.toLowerCase(),
        ].some((field) => field?.includes(value));

        // const fullNameMatches = searchTerms.every((term) =>
        //   fullName.includes(term)
        // );

        return matches; //|| fullNameMatches;
      });

      prevData = updatedData.length ? updatedData : [];
    }

    return prevData;
  }, [hasSearchFilter, projects, searchQuery]);

  const totalPage = Math.ceil(filteredProjects?.length / pageSize);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const tableData = useMemo(() => {
    return filteredProjects?.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredProjects, page, pageSize]);

  return (
    <>
      <ProjectTableHeader
        setSearQuery={setSearQuery}
        searchQuery={searchQuery}
        loading={{
          [selectedStatus]: isLoadingProject,
        }}
        statusCount={{
          [selectedStatus]: projects?.length,
        }}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        visible_status={visible_status}
      />
      <div className="w-full">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      Vendor <LuChevronDown className="ml-1 w-3 h-3" />
                    </div>
                  </th>
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
                      Recipient <LuChevronDown className="ml-1 w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">Job Amount</div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">Tax Amount</div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">Total Amount</div>
                  </th>

                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects?.length === 0 || tableData?.length === 0 ? (
                  <tr>
                    <td colSpan={9}>
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
                  tableData?.map((project, index) => (
                    <tr
                      key={index + "___project"}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3 flex items-center gap-1">
                        <div>
                          <Avatar
                            src={preProfileLink(project?.VENDOR_NAME)}
                            size="sm"
                          />
                        </div>
                        <div className="font-outfit text-gray-700 font-medium text-sm">
                          {project?.VENDOR_NAME}
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <div className="font-outfit text-gray-500 text-sm">
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
                        <div className="bg-gray-200 rounded-full px-3 py-1 w-fit">
                          <span className="font-outfit text-gray-500 text-xs capitalize leading-0.5">
                            {project?.DEPARTMENT_SUPPLIED?.toLowerCase()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-outfit text-gray-500 text-sm">
                          {formatNumberWithComma(Number(project?.JOB_AMOUNT))}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-outfit text-gray-500 text-sm">
                          {formatNumberWithComma(
                            Number(project?.TAX_AMOUNT || 0)
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="font-outfit text-gray-500 text-sm">
                          {formatNumberWithComma(
                            Number(project?.TOTAL_AMOUNT || 0)
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex space-x-1 items-center">
                          {isPendingDetail &&
                          selectedProject?.id ===
                            (project?.ID || project?.PROCUREMENT_ID) &&
                          selectedProject?.action === "EDIT" ? (
                            <StarLoader size={18} />
                          ) : (
                            canEdit && (
                              <ActionIcons
                                variant={"EDIT"}
                                action={() =>
                                  handleGetVendorDetail(project, "EDIT")
                                }
                              />
                            )
                          )}
                          {isPendingDetail &&
                          selectedProject?.id ===
                            (project?.ID || project?.PROCUREMENT_ID) &&
                          selectedProject?.action === "VIEW" ? (
                            <StarLoader size={18} />
                          ) : (
                            <ActionIcons
                              variant={"VIEW"}
                              action={() =>
                                handleGetVendorDetail(project, "VIEW")
                              }
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
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
      </div>
    </>
  );
};

export default ProjectTable;
