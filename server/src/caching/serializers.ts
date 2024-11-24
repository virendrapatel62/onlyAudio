import { IActiveSocket } from "@/models/active-socket";

export function serializeActiveSocket(activeSocket: IActiveSocket) {
  return {
    userId: activeSocket.userId.toString(),
    socketId: activeSocket.socketId.toString(),
    id: activeSocket.id.toString(),
  };
}
