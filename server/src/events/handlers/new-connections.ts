import { ActiveSocket } from "@/models/active-socket";
import { SocketEvents } from "@/utils/socket-events";
import { SocketEventHandler } from "../types";

const handleNewConnection: SocketEventHandler = async (socket) => {
  const userid = socket.user?.id;
  const activeSocket = new ActiveSocket({
    socketId: socket.id,
    userId: userid,
  });
  await Promise.all([activeSocket.createOrUpdate()]);
};

const handleDisconnect: SocketEventHandler = (socket) => {
  socket.on(SocketEvents.disconnect, async () => {
    console.log(SocketEvents.disconnect);
    if (!socket.user) return;
    const userid = socket.user.id;
    ActiveSocket.deleteByUser(userid);
  });
};

export { handleDisconnect, handleNewConnection };
