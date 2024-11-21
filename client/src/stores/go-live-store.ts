import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TGoLiveStore = {
  username: string;
  localStream: MediaStream | null;
  setLocalStream: (stream: MediaStream) => void;
  connections: Record<string, RTCPeerConnection>; // viewer user : Connection
  addNewConnection(params: {
    viewer: string;
    connection: RTCPeerConnection;
  }): void;
};

export const useGoLiveStore = create<TGoLiveStore>()(
  immer((set) => {
    return {
      username: "pranv-nachaniya",
      localStream: null,

      setLocalStream(stream) {
        set((state) => {
          state.localStream = stream;
        });
      },
      addNewConnection(params) {
        set((s) => {
          s.connections[params.viewer] = params.connection;
        });
      },
      connections: {},
    };
  })
);
