import { LuPlus } from "react-icons/lu";
import useDrawerStore from "../hooks/useDrawerStore";
import ProjectTable from "../components/core/project/ProjectTable";
import Button from "../components/shared/ui/Button";
import { useGetProject } from "../service/api/project";
import { useMemo } from "react";

export default function AllProcurement() {
  const { openDrawer } = useDrawerStore();

  //   const [selectedStatus, setSelectedStatus] = useState("approved");

  const {
    data: get_projects,
    isError,
    isPending: isLoadingProject,
  } = useGetProject(1);

  const projects = useMemo(() => get_projects || [], [get_projects]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto px-9 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-800">
              All Project
            </h2>
            <div className="flex items-center space-x-3">
              {/* <Button
                radius="sm"
                color="primary"
                onPress={() =>
                  openDrawer({
                    viewName: "create-project",
                    drawerSize: "950",
                  })
                }
              >
                <LuPlus className="w-4 h-4 mr-1" />
                Create project
              </Button> */}
            </div>
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
