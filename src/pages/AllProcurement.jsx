import { useLocation } from "react-router-dom";
import ProjectTable from "../components/core/project/ProjectTable";
import Button from "../components/shared/ui/Button";
import { useGetProject } from "../service/api/project";
import { useMemo } from "react";
import { findProjectType } from "../utils/findProjectType";

export default function AllProcurement() {
  const location = useLocation()?.pathname;
  const lastPathText = location.split("/").at(-1);

  const pageName = lastPathText?.replaceAll("-", " ");

  const projectType = findProjectType(pageName).label;

  const {
    data: get_projects,
    isError,
    isPending: isLoadingProject,
  } = useGetProject(1, projectType);

  const projects = useMemo(() => get_projects || [], [get_projects]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-9 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 capitalize">
              {pageName || "All Project"}
            </h2>
            <div className="flex items-center space-x-3"></div>
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
          visible_status={["approved"]}
        />
      </div>
    </div>
  );
}
