import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
});

export const setupAuthInterceptor = (
  getToken: () => Promise<string | null>,
) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
};
