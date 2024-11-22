const getEnv = (key: string) => import.meta.env[key];

export const SOCKET_SERVER_URL = getEnv("VITE_SOCKET_SERVER_URL");
export const API_BASE_URL = getEnv("VITE_API_BASE_URL");
