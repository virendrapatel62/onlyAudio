import { Socket } from "socket.io";
import { SocketEvents } from "../utils/socket-events";
import { addOffer, getSocketIdOfCreator, logActiveStream } from "../data";
import { create } from "domain";

export function registerIceEvents(socket: Socket) {
  socket.on(SocketEvents.onIceCandidate, (data) => {
    console.log(SocketEvents.onIceCandidate, data);

    const { creator, viewer, icecandidate } = data;

    if (creator) {
      const socketId = getSocketIdOfCreator(creator);
      console.log({ creatorSocketId: socketId });

      socketId &&
        socket.to(socketId).emit(SocketEvents.onIceCandidate, {
          icecandidate,
          viewer: socket.id,
        });
      return;
    }

    if (viewer) {
      socket.to(viewer).emit(SocketEvents.onIceCandidate, {
        icecandidate,
      });
    }

    logActiveStream();
  });
}
