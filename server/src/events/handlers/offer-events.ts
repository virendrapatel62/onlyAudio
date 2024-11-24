import { ActiveSocket } from "@/models/active-socket";
import { AppSocket } from "@/types/socket";
import { SocketEvents } from "@/utils/socket-events";

export default function (socket: AppSocket) {
  socket.on(SocketEvents.onAskForOffer, async (data = {}) => {
    const remoteUser = data.remoteUser; // user id of the one to whome.
    const requester = socket.user?.id;

    const remoteUserSocket = await ActiveSocket.getSocketIdByUser(remoteUser);

    socket.to(remoteUserSocket).emit(SocketEvents.onAskForOffer, {
      remoteUser: requester,
    });
  });

  socket.on(SocketEvents.onOffer, async (data) => {
    console.log(SocketEvents.onOffer, data);
    const remoteUser = data.remoteUser;
    const offer = data.offer;

    const remoteUserSocket = await ActiveSocket.getSocketIdByUser(remoteUser);
    socket.to(remoteUserSocket).emit(SocketEvents.onOffer, {
      offer,
    });
  });
}
