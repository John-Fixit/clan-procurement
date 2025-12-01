import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`procurement/create`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_projects"],
      });
    },
  });
};

export const useGetProject = () => {
  return useQuery({
    queryKey: ["get_projects"],
    queryFn: async () => {
      const res = await API.get(`procurement/get-procurements`);
      return res.data?.data?.data;
    },
  });
};
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.post(`procurement/create-product`, payload);
      return res?.data?.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_product"],
      });
    },
  });
};
export const useGetProduct = () => {
  return useQuery({
    queryKey: ["get_product"],
    queryFn: async () => {
      const res = await API.get(`procurement/get-products`);
      return res.data?.data?.data;
    },
  });
};
export const useGetProjectRequest = (staffId) => {
  return useQuery({
    queryKey: [`get_projects_request`, staffId],
    queryFn: async () => {
      const res = await API.get(`procurement/pending-approvals/${staffId}`);
      return res.data?.data?.data;
    },
  });
};

export const useGetProjectByMutation = () => {
  return useMutation({
    mutationFn: async (projectId) => {
      const res = await API.get(`procurement/get-procurement/${projectId}`);
      return res?.data?.data?.data;
    },
  });
};
export const useApproveProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      const res = await API.post(`procurement/approve`, payload);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_projects_request`],
      });
    },
  });
};
