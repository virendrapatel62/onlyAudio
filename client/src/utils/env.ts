const getEnv = (key: string) => import.meta.env[key];

export const SOCKET_SERVER_URL = getEnv("VITE_SOCKET_SERVER_URL");
