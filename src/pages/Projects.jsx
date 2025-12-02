import { LuPlus } from "react-icons/lu";
import useDrawerStore from "../hooks/useDrawerStore";
import ProjectTable from "../components/core/project/ProjectTable";
import Button from "../components/shared/ui/Button";
import { useGetStaffProject } from "../service/api/project";
import { useMemo, useState } from "react";
import useCurrentUser from "../hooks/useCurrentUser";
import { useLocation } from "react-router-dom";
import { findProjectType } from "../utils/findProjectType";

export default function Projects() {
  const { openDrawer } = useDrawerStore();

  const [selectedStatus, setSelectedStatus] = useState("pending");

  const { userData } = useCurrentUser();

  const location = useLocation().pathname;

  const lastPathText = location.split("/").at(-1);

  const pageName = lastPathText?.replaceAll("-", " ");

  const projectType = findProjectType(pageName).label;

  const isRequest = location.includes("/request");

  const {
    data: get_projects,
    isError,
    isPending: isLoadingProject,
  } = useGetStaffProject(
    selectedStatus === "pending"
      ? 0
      : selectedStatus === "approved"
      ? 1
      : selectedStatus === "declined"
      ? -1
      : null,
    userData?.data?.STAFF_ID,
    projectType
  );

  const projects = useMemo(() => get_projects || [], [get_projects]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-6 md:px-9 py-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {pageName || "Project"}
            </h2>
            {isRequest && (
              <div className="flex items-center space-x-3">
                <Button
                  radius="sm"
                  color="primary"
                  onPress={() =>
                    openDrawer({
                      viewName: "create-project",
                      defaultProjectType: pageName,
                      drawerSize: "950",
                    })
                  }
                >
                  <LuPlus className="w-4 h-4 mr-1" />
                  Create project
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-9 py-6">
        {/* Objectives Table */}
        <ProjectTable
          projects={projects}
          isError={isError}
          isLoadingProject={isLoadingProject}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          canEdit={isRequest && selectedStatus === "pending"}
        />
      </div>
    </div>
  );
}
