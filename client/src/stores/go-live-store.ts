import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TGoLiveStore = {
  localStream: MediaStream | null;
  setLocalStream: (stream: MediaStream) => void;
  connections: Record<string, RTCPeerConnection>; // viewer user : Connection
  addNewConnection(params: {
    remoteUser: string;
    connection: RTCPeerConnection;
  }): void;
  reset(): void;
};

const initialState: Partial<TGoLiveStore> = {
  connections: {},
  localStream: null,
};

export const useGoLiveStore = create<TGoLiveStore>()(
  immer((set) => {
    return {
      ...initialState,
      localStream: null,
      setLocalStream(stream) {
        set((state) => {
          state.localStream = stream;
        });
      },
      addNewConnection(params) {
        set((s) => {
          console.log(params.connection.connectionState);
          s.connections[params.remoteUser] = params.connection;
        });
      },
      connections: {},
      reset() {
        set(initialState);
      },
    };
  })
);
