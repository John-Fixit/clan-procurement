import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useCreateVendor = (vendorId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (vendorId) {
        return await API.put(`/vendor/update/${vendorId}`, payload);
      }
      return await API.post(`/vendor/create`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_vendors"],
      });
    },
  });
};

export const useGetVendor = () => {
  return useQuery({
    queryKey: ["get_vendors"],
    queryFn: async () => {
      const res = await API.get(`vendor/get-vendors`);
      return res.data?.data?.data;
    },
  });
};

export const useGetVendorDetail = () => {
  return useQuery({
    queryKey: ["get_vendor_detail"],
    queryFn: async (vendorId) => {
      const res = await API.get(`vendor/get-by-id/${vendorId}`);
      return res.data?.data?.data;
    },
  });
};

export const useGetVendorByMutation = () => {
  return useMutation({
    mutationFn: async (vendorId) => {
      const res = await API.get(`vendor/get-by-id/${vendorId}`);
      return res?.data?.data?.data;
    },
  });
};
