import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { api } from "@/services/api";

export function useAxiosInterceptor() {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        console.log("[Axios Request Interceptor]", config.url);
        return config;
      },
      (error) => {
        console.error("[Axios Request Error]", error);
        return Promise.reject(error);
      }
    );

    const responseInterceptor = api.interceptors.response.use(
      (response) => {
        console.log("[Axios Response Interceptor]", response.config.url, response.status);
        return response;
      },
      (error) => {
        console.error("[Axios Response Error]", error.response ?? error);
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [getToken]);
}
