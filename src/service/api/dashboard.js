import { useQuery } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useGetProcOverview = () => {
  return useQuery({
    queryKey: ["get_proc_overview"],
    queryFn: async () => {
      const res = await API.get(`report/get-data-lastmonth`);
      return res.data?.data?.data;
    },
  });
};
