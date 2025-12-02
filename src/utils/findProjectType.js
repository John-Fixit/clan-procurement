import { projectTypeList } from "./static-data";

export const findProjectType = (projectType) => {
  return projectTypeList.find(
    (item) =>
      item?.value === String(projectType) ||
      item?.label?.toLowerCase() === projectType?.toLowerCase()
  );
};
