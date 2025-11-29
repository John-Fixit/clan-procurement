import axios from "axios";
import { errorToast } from "./toastPopUps";

export const baseURL = "https://hr.ncaa.gov.ng/old_hr/apis/";

export const uploadFileData = async (file, userToken) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await uploadFile(formData, userToken);
  if (res) {
    return res;
  }
};

export const uploadFile = async (formData, token) => {
  try {
    const res = await axios({
      method: "post",
      url: baseURL + "attachment/addChatFile",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: token,
      },
    });

    if (res) {
      return res.data;
    }
  } catch (err) {
    errorToast(
      err?.response?.data?.message || "There was an error uploading your file"
    );
  }
};
