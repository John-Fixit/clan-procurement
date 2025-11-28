import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useAddDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { docId, ...json } = payload;
      if (docId) {
        return await API.put(`/document/update/${docId}`, json);
      }
      return await API.post(`/document/create`, json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_setting_document"],
      });
    },
  });
};
export const useAddTax = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const { taxId, ...json } = payload;
      if (taxId) {
        return await API.put(`/tax/update/${taxId}`, json);
      }
      return await API.post(`/tax/create`, json);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_setting_tax"],
      });
    },
  });
};
export const useDeleteTax = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.delete(`/tax/delete/${payload?.taxId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_setting_tax"],
      });
    },
  });
};
export const useDeleteDocument = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.delete(`/document/delete/${payload?.docId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_setting_document"],
      });
    },
  });
};

export const useGetTax = () => {
  return useQuery({
    queryKey: ["get_setting_tax"],
    queryFn: async () => {
      const res = await API.get(`/tax/get-taxes`);
      return res.data?.data?.data;
    },
  });
};
export const useGetDocument = () => {
  return useQuery({
    queryKey: ["get_setting_document"],
    queryFn: async () => {
      const res = await API.get(`/document/get-documents`);
      return res.data?.data?.data;
    },
  });
};
