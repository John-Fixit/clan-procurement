import { useQuery } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useGetReport = ({ report_type, start_date, end_date }) => {
  return useQuery({
    queryKey: [`get_report_${report_type}_${start_date}_${end_date}`],
    queryFn: async () => {
      const res = await API.get(`report/request`, {
        params: {
          report_type,
          start_date,
          end_date,
        },
      });
      return res.data?.data?.data || res?.data?.data || [];
    },
  });
};
