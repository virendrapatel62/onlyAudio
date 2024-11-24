import { AppSocket } from "@/types/socket";

export type SocketEventHandler = (socket: AppSocket, data?: any) => void;
export type SocketEventsRegister = (socket: AppSocket) => void;
