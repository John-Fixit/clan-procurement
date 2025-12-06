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
export const useGetAnnualProcurement = () => {
  return useQuery({
    queryKey: ["get_annual_procurement"],
    queryFn: async () => {
      const res = await API.get(`report/dashboard/get-annual-procurement`);
      return res.data?.data?.data;
    },
  });
};
export const useGetAnnualDepartment = () => {
  return useQuery({
    queryKey: ["get_annual_department"],
    queryFn: async () => {
      const res = await API.get(`report/dashboard/get-annual-department`);
      return res.data?.data?.data;
    },
  });
};

export const useGetAnnualVendor = () => {
  return useQuery({
    queryKey: ["get_annual_vendor"],
    queryFn: async () => {
      const res = await API.get(`report/dashboard/get-annual-vendor`);
      return res.data?.data?.data;
    },
  });
};
