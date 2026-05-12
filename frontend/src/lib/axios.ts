import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

let isInterceptorRegistered = false;

export const setupAuthInterceptor = (
  getToken: () => Promise<string | null>,
) => {
  if (isInterceptorRegistered) return;
  isInterceptorRegistered = true;

  axiosInstance.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to get auth token:", error);
    }
    return config;
  });
};
