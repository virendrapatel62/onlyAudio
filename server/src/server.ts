import express from "express";
import { APP_DOMAIN, APP_PORT } from "./utils/env";
import { logger } from "./utils/logger";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

server.listen(APP_PORT, () => {
  logger.info(`APP is running on port ${APP_PORT}`);
  logger.info(`Access the app at ${APP_DOMAIN}:${APP_PORT}`);
  logger.info(`Ping the app at ${APP_DOMAIN}:${APP_PORT}/ping`);
});

app.all("/ping", (request, response) => {
  response.json("pong");
});

io.on("connect", () => {
  logger.info("New Socket connection..");
});

export { app, io };
