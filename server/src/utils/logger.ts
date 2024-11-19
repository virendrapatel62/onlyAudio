import winston from "winston";
import { APP_ENV } from "./env";

export const logger = winston.createLogger({
  format: winston.format.simple(),
  transports: [
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/info.log", level: "info" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

if (APP_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
