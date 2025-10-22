import { getLsValue } from "@/utils";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = getLsValue("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // const status = error.response?.status;

    // if (status === 401 || status === 403) {
    //   removeLsValue("token");
    //   window.location.assign("/auth");
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
