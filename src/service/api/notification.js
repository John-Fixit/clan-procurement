import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "../axiosInstance";
import { notification } from "antd";

export const useGetNotification = (staffId) => {
  return useQuery({
    queryKey: [`get_notifications`],
    queryFn: async () => {
      const res = await API.get(
        `notification/get-notification?staff_id=${staffId}`
      );
      return res.data?.data?.data;
    },
  });
};

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notificationId) => {
      const res = await API.put(
        `notification/udpate-notification?notificationId=${notificationId}`
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`get_notifications`],
      });
    },
  });
};
