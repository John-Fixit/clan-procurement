import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";

export const useCreateProject = (procurementId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload) => {
      if (procurementId) {
        return await API.put(`procurement/update/${procurementId}`, payload);
      }
      return await API.post(`procurement/create`, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_projects_1`],
      });
      queryClient.invalidateQueries({
        queryKey: [
          `get_staff_projects_0`,
          `get_staff_projects_1`,
          `get_staff_projects_-1`,
        ],
      });
    },
  });
};

export const useGetProject = (status, order_type) => {
  return useQuery({
    queryKey: [`get_projects_${status}_${order_type}`],
    queryFn: async () => {
      const res = await API.get(`procurement/get-procurements`, {
        params: {
          status,
          order_type,
        },
      });
      return res.data?.data?.data;
    },
  });
};
export const useGetStaffProject = (status, staffId) => {
  return useQuery({
    queryKey: [`get_staff_projects`, staffId, status],
    queryFn: async () => {
      const res = await API.get(
        `procurement/staff-procurements/${staffId}/${status}`
      );
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
export const useGetProjectRequest = (staffId, status) => {
  return useQuery({
    queryKey: [`get_projects_request_${status}`],
    queryFn: async () => {
      const res = await API.get(
        `procurement/pending-approvals/${staffId}/${status}`
      );
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
      const { status, ...json } = payload;
      const res = await API.post(
        status === "reject" ? `procurement/reject` : `procurement/approve`,
        { ...json }
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_projects_request_0`],
      });
    },
  });
};
