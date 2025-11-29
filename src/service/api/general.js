import { useQuery } from "@tanstack/react-query";
import { API_GET } from "../axiosInstance";

export const useGetDepartment = ({ company_id = "" }) => {
  return useQuery({
    queryKey: [`get_department_${company_id}`],
    queryFn: async () => {
      const res = await API_GET.post("pms/get_recipient", {
        company_id,
        recipient_type: "department",
      });
      return res?.data?.data;
    },
  });
};

export const useGetAllStaff = (company_id) => {
  return useQuery({
    queryFn: async () => {
      const res = await API_GET.get(`package/getAllStaff/${company_id}`);
      return res?.data?.data;
    },
    queryKey: ["staff"],
  });
};
