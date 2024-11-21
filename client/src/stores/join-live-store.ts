import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type TJoinLiveStore = {
  creator: string;
  username: string;
  peerConnection: RTCPeerConnection | null;
  offer: RTCSessionDescriptionInit | null;
  remoteStream: MediaStream | null;
  setRemoteStream: (stream: MediaStream) => void;
  setCreatorName(username: string): void;
  setPeerConnection(peerConnection: RTCPeerConnection): void;
  setOffer(offer: RTCSessionDescriptionInit): void;
};

export const useJoinLiveStore = create<TJoinLiveStore>()(
  immer((set) => {
    return {
      username: "virendra",
      creator: "",
      peerConnection: null,
      remoteStream: new MediaStream(),
      offer: null,
      setRemoteStream(stream) {
        return set((state) => {
          state.remoteStream = stream;
        });
      },
      setCreatorName(username) {
        set((s) => {
          s.creator = username;
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
