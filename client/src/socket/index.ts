import { SocketEvents } from "@/utils/socket-events";
import { connect } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../utils/env";

const io = connect(SOCKET_SERVER_URL);

export function emitGoLive(username: string) {
  io.emit(SocketEvents.onGoLive, {
    creator: username,
  });
}

export function emitOffer(
  creatorUsername: string,
  fromUserName: string,
  offer: any
) {
  io.emit(SocketEvents.onOffer, {
    offeredTo: creatorUsername,
    offerer: fromUserName,
    offer: offer,
  });
}

export { io };
