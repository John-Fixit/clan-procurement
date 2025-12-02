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
            <h2 className="text-2xl font-semibold text-gray-800">Approval</h2>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6">
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
