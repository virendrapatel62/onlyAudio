import mongoose from "mongoose";
import { logger } from "../utils/logger";
import { DB_CONFIG } from "../utils/env";

const CONNECTION_URL = `mongodb+srv://${DB_CONFIG.DB_USERNAME}:${DB_CONFIG.DB_PASSWORD}@cluster0.ndt52.mongodb.net/${DB_CONFIG.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(CONNECTION_URL)
  .then(() => {
    logger.info(`MONGO DB Connected ✅`);
  })
  .catch((error) => {
    logger.error(error.message, error);
  });
