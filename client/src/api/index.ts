import { getAuthenticationTokenCookie } from "@/utils/cookies";
import { API_BASE_URL } from "@/utils/env";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export class ApiError extends Error {
  response?: any;
  statusCode?: number;

  constructor(error: AxiosError) {
    super(error.message);

    this.stack = error.stack;
    this.statusCode = error.status;

    if (error.response) {
      const data = error.response.data as any;
      const message = data.message;
      this.message = message;
      this.response = data;
    }
  }
}

function errorResponseManipulator(error: AxiosError) {
  const apiError = new ApiError(error);
  throw apiError;
}

const authTokenInjector = (config: InternalAxiosRequestConfig) => {
  const token = getAuthenticationTokenCookie();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
};

api.interceptors.request.use(authTokenInjector);
api.interceptors.response.use((response) => response, errorResponseManipulator);

export default api;
