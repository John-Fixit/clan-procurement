import axios from "axios";

export const API = axios.create(
  // { baseURL: `https://lamp3.ncaa.gov.ng/` } //for store
  { baseURL: `https://procurement-vh3z.onrender.com/` } //for store
);

API.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem("procurement-auth-session"))
    ?.state?.userData?.token;

  req.headers["token"] = token || "";
  req.headers["Content-type"] = "application/json";
  req.headers["Accept"] = "application/json";
  return req;
});

export const API_GET = axios.create({
  baseURL: `https://hr.ncaa.gov.ng/old_hr/apis/`,
});
API_GET.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem("procurement-auth-session"))
    ?.state?.userData?.token;

  req.headers["token"] = token || "";
  req.headers["Content-type"] = "application/json";
  req.headers["Accept"] = "application/json";
  return req;
});

export const AUTH_API = axios.create({
  baseURL: `https://lamp3.ncaa.gov.ng/`,
});

AUTH_API.interceptors.request.use((req) => {
  req.headers["Content-type"] = "application/json";
  req.headers["Accept"] = "application/json";
  return req;
});
