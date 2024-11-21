const getEnv = (key: string) => process.env[key];

const DB_PASSWORD = getEnv("DB_PASSWORD");
const DB_USERNAME = getEnv("DB_USERNAME");
const DB_NAME = getEnv("DB_NAME");

export const DB_CONFIG = {
  DB_PASSWORD,
  DB_USERNAME,
  DB_NAME,
} as const;

export const APP_PORT = getEnv("APP_PORT");

export const APP_ENV = getEnv("APP_ENV");
export const APP_DOMAIN = getEnv("APP_DOMAIN");
export const JWT_SECRET = getEnv("JWT_SECRET") || "";
