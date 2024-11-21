import { Socket } from "socket.io";
import { SocketEvents } from "../utils/socket-events";
import { addOffer, getSocketIdOfCreator, logActiveStream } from "../data";

export function registerViewerEvents(socket: Socket) {
  socket.on(SocketEvents.onAnswer, (data) => {
    console.log(SocketEvents.onAnswer, data);

    const { creator, answer } = data;
    const viewer = socket.id;

    const socketId = getSocketIdOfCreator(creator);

    socketId &&
      socket.to(socketId).emit(SocketEvents.onAnswer, {
        viewer,
        answer,
      });
  });

  socket.on(SocketEvents.onAskForOffer, (data) => {
    console.log(SocketEvents.onAskForOffer, data);
    const { creator } = data;
    const socketId = getSocketIdOfCreator(creator);

    console.log({ creatorSocketId: socketId });

    socketId &&
      socket.to(socketId).emit(SocketEvents.onAskForOffer, {
        viewer: socket.id,
      });
  });
}
