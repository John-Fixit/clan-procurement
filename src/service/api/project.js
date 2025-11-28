import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      return await API.post(`/project/create`, payload);
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
      const res = await API.get(`/projects/get-documents`);
      return res.data?.data?.data;
    },
  });
};
