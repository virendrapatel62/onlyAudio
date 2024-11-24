import { ActiveSocket } from "@/models/active-socket";
import { AppSocket } from "@/types/socket";
import { SocketEvents } from "@/utils/socket-events";

export default function (socket: AppSocket) {
  socket.on(SocketEvents.onIceCandidate, async (data = {}) => {
    const remoteUser = data.remoteUser;
    const icecandidate = data.icecandidate;
    const requester = socket.user?.id;

    const remoteUserSocket = await ActiveSocket.getSocketIdByUser(remoteUser);

    socket.to(remoteUserSocket).emit(SocketEvents.onIceCandidate, {
      remoteUser: requester,
      icecandidate,
    });
  });
}
