import { LuSearch, LuPlus, LuSettings } from "react-icons/lu";
import ProjectTable from "../components/core/project/ProjectTable";
import ProjectTableHeader from "../components/core/project/ProjectTableHeader";
import { Tab, Tabs } from "@heroui/react";
import { Select } from "antd";
import { useMemo, useState } from "react";
import { useGetProjectRequest } from "../service/api/project";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Approval() {
  const { userData } = useCurrentUser();

  const [selectedStatus, setSelectedStatus] = useState("pending");

  const {
    data: get_projects,
    isError,
    isPending: isLoadingProject,
  } = useGetProjectRequest(
    userData?.data?.STAFF_ID,
    selectedStatus === "pending"
      ? 0
      : selectedStatus === "approved"
      ? 1
      : selectedStatus === "declined"
      ? -1
      : null
  );

  const projects = useMemo(() => get_projects || [], [get_projects]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-9 py-4">
          <div className="flex items-center justify-between">
            <Tabs
              aria-label="Tabs variants"
              variant={"underlined"}
              color="primary"
            >
              <Tab key="pending" title="Pending" />
              <Tab key="approves" title="Approved" />
              <Tab key="declined" title="Declined" />
            </Tabs>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6">
        {/* <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div>
              <Select
                placeholder="active object"
                options={[{ label: "Active object", value: "" }]}
              />
            </div>
          </div>
          <div className="relative">
            <LuSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by owner or title"
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-80"
            />
          </div>
        </div> */}

        {/* <ProjectTableHeader /> */}

        <ProjectTable
          projects={projects}
          isError={isError}
          isLoadingProject={isLoadingProject}
          is_approval={true}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
        />
      </div>
    </div>
  );
}
