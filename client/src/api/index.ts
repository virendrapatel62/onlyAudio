import { API_BASE_URL } from "@/utils/env";
import axios, { AxiosError, AxiosResponse } from "axios";

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

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const apiError = new ApiError(error);

    throw apiError;
  }
);

export default api;
