import { Socket } from "socket.io";
import { SocketEvents } from "../utils/socket-events";
import {
  activeStreams,
  addAnswer,
  addStream,
  getSocketIdOfCreator,
  getStreamByCrearor,
  logActiveStream,
  removeFromActiveStream,
} from "../data";

export function registerCreatorEvents(socket: Socket) {
  socket.on(SocketEvents.disconnect, () => {
    console.log("Socket discount");
    removeFromActiveStream(socket.id);
  });

  socket.on(SocketEvents.onGoLive, (data) => {
    console.log(SocketEvents.onGoLive);
    addStream(data.creator, socket.id);
  });

  socket.on(SocketEvents.onOffer, (data) => {
    console.log(SocketEvents.onAnswer, data);
    const { offer, viewer } = data;
    socket.to(viewer).emit(SocketEvents.onOffer, {
      offer,
    });
  });
}
