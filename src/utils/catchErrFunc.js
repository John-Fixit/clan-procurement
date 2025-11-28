import { errorToast } from "./toastPopUps";

export const catchErrFunc = (err) => {
  const error = err;
  const errMsg = error?.response?.data?.message || error?.message;
  errorToast(errMsg);
};
