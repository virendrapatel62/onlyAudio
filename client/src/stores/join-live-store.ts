import { getUser } from "@/api/user";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TJoinLiveStore = {
  streamer: any;
  username: string;
  peerConnection: RTCPeerConnection | null;
  offer: RTCSessionDescriptionInit | null;
  remoteStream: MediaStream | null;
  setRemoteStream: (stream: MediaStream) => void;
  setPeerConnection(peerConnection: RTCPeerConnection): void;
  setOffer(offer: RTCSessionDescriptionInit): void;
  fetchStreamerInfo: (username: string) => void;
};

export const useJoinLiveStore = create<TJoinLiveStore>()(
  immer((set) => {
    return {
      username: "virendra",
      creator: "",
      streamer: null,
      peerConnection: null,
      remoteStream: new MediaStream(),
      offer: null,
      setRemoteStream(stream) {
        return set((state) => {
          state.remoteStream = stream;
        });
      },

      async fetchStreamerInfo(username) {
        const response = await getUser({
          username,
        });

        set((s) => {
          s.streamer = response.user;
        });
      },

      setPeerConnection(peerConnection) {
        set((s) => {
          s.peerConnection = peerConnection;
        });
      },
      setOffer(offer) {
        set((s) => {
          s.offer = offer;
        });
      },
    };
  })
);
