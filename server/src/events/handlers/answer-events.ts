import { ActiveSocket } from "@/models/active-socket";
import { AppSocket } from "@/types/socket";
import { SocketEvents } from "@/utils/socket-events";

export default function (socket: AppSocket) {
  socket.on(SocketEvents.onAnswer, async (data = {}) => {
    const remoteUser = data.remoteUser; // user id of the one to whome.
    const answer = data.answer; // user id of the one to whome.
    const requester = socket.user?.id;

    console.log(SocketEvents.onAnswer, data);

    const remoteUserSocket = await ActiveSocket.getSocketIdByUser(remoteUser);

    socket.to(remoteUserSocket).emit(SocketEvents.onAnswer, {
      remoteUser: requester,
      answer,
    });
  });
}
