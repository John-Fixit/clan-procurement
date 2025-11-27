import { addToast } from "@heroui/react";

export const notificationToast = ({ message, title, type }) => {
  addToast({
    title: title,
    description: message,
    color: type,
  });
};

export const errorToast = (message) => {
  notificationToast({
    message,
    title: "Error",
    type: "danger",
  });
};
export const successToast = (message) => {
  notificationToast({
    message,
    type: "success",
  });
};
