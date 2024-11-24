import { AppSocket } from "@/types/socket";
import { verifyToken } from "@/utils/jwt";
import {
  handleDisconnect,
  handleNewConnection,
} from "./handlers/new-connections";

import path from "path";
import fs from "fs";
import { SocketEventHandler } from "./types";
import { logger } from "@/utils/logger";

export function socketAuthMiddleware(
  socket: AppSocket,
  next: (err?: any) => void
) {
  const token = socket.handshake.auth.authorization;
  const payload = verifyToken(token);

  if (!payload) {
    return next(new Error("unauthorized"));
  }

  socket.user = {
    id: payload.userId,
  };

  next();
}

export default async function onNewConnection(socket: AppSocket) {
  const handlersPath = path.join(__dirname, "./handlers");
  const handlers = fs.readdirSync(handlersPath);

  handlers.forEach((file) => {
    const filePath = path.join(handlersPath, file);
    const handlerFunctions = Object.values(
      require(filePath)
    ) as SocketEventHandler[];

    handlerFunctions.forEach((handler) => {
      handler(socket);
    });
  });
}
