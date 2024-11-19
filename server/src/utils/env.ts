const getEnv = (key: string) => process.env[key];

export const APP_PORT = getEnv("APP_PORT");
export const DB_PASSWORD = getEnv("DB_PASSWORD");
export const DB_USERNAME = getEnv("DB_USERNAME");
export const APP_ENV = getEnv("APP_ENV");
export const APP_DOMAIN = getEnv("APP_DOMAIN");
