import cors from "cors";
import express from "express";
import fs from "fs";
import { createServer } from "https";
import morgan from "morgan";
import path from "path";
import { Server, Socket } from "socket.io";
import { getActiveCreatorUserNames } from "./data";
import { authRouter } from "./handlers/auth-handlers";
import { expressErrorHandler } from "./handlers/error-handlers";
import { pingRouter } from "./handlers/ping";
import { registerCreatorEvents } from "./socket/creator-events";
import { registerIceEvents } from "./socket/ice-events";
import { registerViewerEvents } from "./socket/viewer-events";
import { APP_DOMAIN, APP_PORT } from "./utils/env";
import { logger } from "./utils/logger";
import { SocketEvents } from "./utils/socket-events";
import { exploreRouter } from "./handlers/search-handler";
const app = express();

const server = createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "../create-cert-key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "../create-cert.pem")),
  },
  app
);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use(pingRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth", authRouter);
app.use("/api/explore", exploreRouter);

app.use(expressErrorHandler); // register at last

server.listen(APP_PORT, () => {
  logger.info(`APP is running on port ${APP_PORT}`);
  logger.info(`Access the app at ${APP_DOMAIN}:${APP_PORT}`);
  logger.info(`Ping the app at ${APP_DOMAIN}:${APP_PORT}/ping`);
});

io.on(SocketEvents.connect, (socket: Socket) => {
  logger.info("New Socket connection..");
  registerCreatorEvents(socket);
  registerViewerEvents(socket);
  registerIceEvents(socket);
  socket.emit(SocketEvents.onActiveCrators, getActiveCreatorUserNames());
});

export { app, io };
