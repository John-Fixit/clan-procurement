import {
  LuSearch,
  LuPlus,
  LuSettings,
  LuChevronDown,
  LuUsers,
} from "react-icons/lu";
import useDrawerStore from "../hooks/useDrawerStore";
import Button from "../components/shared/ui/Button";
import ActionIcons from "../components/shared/ActionIcons";
import { useGetVendor, useGetVendorByMutation } from "../service/api/vendor";
import { Avatar } from "@heroui/react";
import { preProfileLink } from "../utils/pre-profile-link";
import { useMemo, useState } from "react";
import { useGetDocument } from "../service/api/setting";
import StarLoader from "../components/core/loaders/StarLoader";
import { Pagination } from "@heroui/react";
import clsx from "clsx";

export default function Vendor() {
  const { openDrawer } = useDrawerStore();

  const [searchQuery, setSearQuery] = useState("");

  const {
    data: get_vendors,
    isPending: isLoadingVendor,
    isError,
  } = useGetVendor();

  const [selectedStatus, setSelectedStatus] = useState("all");

  const vendorsList = useMemo(() => {
    if (selectedStatus === "no_document") {
      return (
        get_vendors?.filter((vendor) => vendor?.STATUS === "no_document") || []
      );
    } else if (selectedStatus === "not_completed") {
      return (
        get_vendors?.filter((vendor) => vendor?.STATUS === "not_completed") ||
        []
      );
    } else if (selectedStatus === "completed") {
      return (
        get_vendors?.filter((vendor) => vendor?.STATUS === "completed") || []
      );
    }
    return get_vendors || [];
  }, [get_vendors, selectedStatus]);

  const [selectedVendor, setSelectedVendor] = useState(null);

  const { mutateAsync: mutateGetVendorDetail, isPending: isPendingDetail } =
    useGetVendorByMutation();

  const { data: get_documents } = useGetDocument();

  function mapDocuments(requiredDocs, vendorDocs) {
    return requiredDocs.map((doc) => {
      const uploaded = vendorDocs.find((v) => v.DOCUMENT_ID === doc.ID);

      return {
        id: doc.ID,
        name: doc.DOCUMNET_NAME,
        description: "",
        requiresRenewal: doc.IS_YEARLY_RENEWABLE,
        uploaded: !!uploaded,
        file: uploaded
          ? {
              name: uploaded.DOCUMENT_URL,
            }
          : null,
        status: uploaded ? "uploaded" : "pending",
        startDate: uploaded?.START_DATE,
        endDate: uploaded?.END_DATE,
      };
    });
  }

  const statistics = useMemo(() => {
    const noDoc = get_vendors?.filter(
      (vendor) => vendor?.STATUS === "no_document"
    );
    const notCompleteDoc = get_vendors?.filter(
      (vendor) => vendor?.STATUS === "not_completed"
    );
    const completedDoc = get_vendors?.filter(
      (vendor) => vendor?.STATUS === "completed"
    );
    return {
      no_document: noDoc?.length,
      not_completed: notCompleteDoc?.length,
      completed: completedDoc?.length,
    };
  }, [get_vendors]);

  const handleGetVendorDetail = async (vendor, action) => {
    setSelectedVendor({ id: vendor?.VENDOR_ID, action });

    const vendorDetail = await mutateGetVendorDetail(vendor?.VENDOR_ID);

    const support_documents = mapDocuments(
      get_documents,
      vendorDetail?.VENDOR_DOCUMENTS
    );

    if (action === "EDIT") {
      openDrawer({
        viewName: "create-vendor",
        vendorDetail: {
          ...vendorDetail,
          support_documents,
        },
        drawerSize: "950",
      });
    } else {
      openDrawer({
        viewName: "vendor-detail",
        vendorDetail: {
          ...vendorDetail,
          VENDOR_DOCUMENTS: vendorDetail?.VENDOR_DOCUMENTS?.map((doc) => ({
            ...doc,
          })),
        },
      });
    }
  };

  const hasSearchFilter = Boolean(searchQuery?.trim());

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const filteredProjects = useMemo(() => {
    let prevData = vendorsList?.length ? [...vendorsList] : [];

    if (hasSearchFilter) {
      const value = searchQuery?.trim()?.toLowerCase();

      const updatedData = vendorsList?.filter((item) => {
        const matches = [
          item?.FULLNAME?.toLowerCase(),
          item?.EMAIL?.toLowerCase(),
          item?.BUSINESS?.toLowerCase(),
          item?.PHONE?.toLowerCase(),
          item?.ADDRESS?.toLowerCase(),
        ].some((field) => field?.includes(value));

        // const fullNameMatches = searchTerms.every((term) =>
        //   fullName.includes(term)
        // );

        return matches; //|| fullNameMatches;
      });

      prevData = updatedData.length ? updatedData : [];
    }

    return prevData;
  }, [hasSearchFilter, searchQuery, vendorsList]);

  const totalPage = Math.ceil(filteredProjects?.length / pageSize);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const tableData = useMemo(() => {
    return filteredProjects?.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredProjects, page, pageSize]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-6 md:px-9 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">Vendor</h2>
            <div className="flex items-center space-x-3">
              <Button
                radius="sm"
                color="primary"
                onPress={() =>
                  openDrawer({
                    viewName: "create-vendor",
                    drawerSize: "950",
                  })
                }
              >
                <LuPlus className="w-4 h-4 mr-1" />
                Create Vendor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-6 md:px-9 py-6">
        {/* Progress Overview */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                className={clsx(
                  "px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 flex items-center whitespace-nowrap cursor-pointer",
                  selectedStatus === "all" && "bg-blue-100"
                )}
                onClick={() => setSelectedStatus("all")}
              >
                <span className="inline">All</span>
              </button>
              <button
                className={clsx(
                  "px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 flex items-center whitespace-nowrap cursor-pointer",
                  selectedStatus === "no_document" && "bg-blue-100"
                )}
                onClick={() => setSelectedStatus("no_document")}
              >
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2 shrink-0"></span>
                <span className="inline">
                  {statistics?.no_document} No document
                </span>
              </button>
              <button
                className={clsx(
                  "px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 flex items-center whitespace-nowrap cursor-pointer",
                  selectedStatus === "not_completed" && "bg-blue-100"
                )}
                onClick={() => setSelectedStatus("not_completed")}
              >
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2 shrink-0"></span>
                <span className="inline">
                  {statistics?.not_completed} Incomplete document
                </span>
              </button>
              <button
                className={clsx(
                  "px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700 flex items-center whitespace-nowrap cursor-pointer",
                  selectedStatus === "completed" && "bg-blue-100"
                )}
                onClick={() => setSelectedStatus("completed")}
              >
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 shrink-0"></span>
                <span className="inline">
                  {statistics?.completed} Complete document
                </span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between sm:justify-end gap-2 border-t lg:border-t-0 pt-4 lg:pt-0 border-gray-300">
              <div className="relative w-full sm:w-auto">
                <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search vendor name, email..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full sm:w-64 md:w-80"
                  value={searchQuery}
                  onChange={(e) => setSearQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Objectives Table */}
        <div className="w-full">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">Name</div>
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
                              d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                            />
                          </svg>
                        </button>
                      </div>
                    </th>

                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">Email</div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">Business</div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">Contact</div>
                    </th>

                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">Address</div>
                    </th>
                    <th className="px-6 py-3 text-left">
                      <div className="flex items-center">Action</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vendorsList?.length === 0 || tableData?.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="flex items-center justify-center h-44">
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            {isLoadingVendor ? (
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
                    tableData?.map((vendor, index) => (
                      <tr
                        key={index + "___vendor" + vendor?.ID}
                        className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Avatar
                              className="w-10 h-10 cursor-pointer"
                              src={preProfileLink(vendor?.FULLNAME)}
                            />
                            <p className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                              {vendor?.FULLNAME}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <h3 className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                            {vendor?.EMAIL}
                          </h3>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-outfit text-gray-500 text-sm">
                            {vendor?.BUSINESS}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-outfit text-gray-500 text-sm">
                            {vendor?.PHONE}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-outfit text-gray-500 text-sm">
                            {vendor?.ADDRESS}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-1">
                            {isPendingDetail &&
                            selectedVendor?.id === vendor?.ID &&
                            selectedVendor?.action === "EDIT" ? (
                              <StarLoader size={18} />
                            ) : (
                              <ActionIcons
                                variant={"EDIT"}
                                action={() =>
                                  handleGetVendorDetail(vendor, "EDIT")
                                }
                              />
                            )}
                            {isPendingDetail &&
                            selectedVendor?.id === vendor?.ID &&
                            selectedVendor?.action === "VIEW" ? (
                              <StarLoader size={18} />
                            ) : (
                              <ActionIcons
                                variant={"VIEW"}
                                action={() =>
                                  handleGetVendorDetail(vendor, "VIEW")
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
            </div>
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
    </div>
  );
}
