import { useEffect, useRef } from "react";
import { getUserMedia } from "../utils/web-rtc";
import { useGoLiveStore } from "@/stores/go-live-store";
import { Button } from "@/components/ui/button";
import { emitGoLive, io } from "@/socket";
import { SocketEvents } from "@/utils/socket-events";
import { peerConnectionConfig } from "@/utils/peer-connection-config";
import { off } from "process";

export default function CreatorGoLivePage() {
  const { username, setLocalStream, localStream, addNewConnection } =
    useGoLiveStore();
  const store = useGoLiveStore();
  const isLive = !!localStream;
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const remoteStream = useRef<MediaStream>(new MediaStream());

  async function setupEvents() {
    io.emit(SocketEvents.onGoLive, {
      creator: username,
    });

    io.on(SocketEvents.onAskForOffer, async (data) => {
      console.log("Viewer Askign for offer");
      const viewer = data.viewer;
      const { localStream } = useGoLiveStore.getState();
      const connection = new RTCPeerConnection(peerConnectionConfig);

      connection.addEventListener("icecandidate", (e) => {
        console.log("SEINDIGN ICE");
        io.emit(SocketEvents.onIceCandidate, {
          icecandidate: e.candidate,
          viewer,
        });
      });

      connection.addEventListener("track", (e) => {
        console.log("TRACKS", e.streams);
        e.streams[0].getTracks().forEach((t) => {
          remoteStream.current.addTrack(t);
        });
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream.current;
        }
      });

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          console.log("Adding tracks to peer");
          connection.addTrack(track, localStream);
        });
      }

      const offer = await connection.createOffer();
      connection.setLocalDescription(offer);

      console.log("Sending the offer");
      io.emit(SocketEvents.onOffer, {
        offer,
        viewer,
      });

      addNewConnection({
        viewer,
        connection,
      });
    });

    io.on(SocketEvents.onAnswer, async (data) => {
      const { connections } = useGoLiveStore.getState();
      const { viewer, answer } = data;
      const connection = connections[viewer];
      connection.setRemoteDescription(answer);
    });
    io.on(SocketEvents.onIceCandidate, async (data) => {
      const { connections } = useGoLiveStore.getState();
      const { viewer, icecandidate } = data;

      console.log("GOT THE ICE");
      connections[viewer].addIceCandidate(icecandidate);
    });
  }

  useEffect(() => {
    (async () => {
      const stream = await getUserMedia({
        audio: true,
        video: true,
      });

      setLocalStream(stream);
    })();

    setupEvents();
  }, []);

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }
  }, [localVideoRef.current, localStream]);

  return (
    <div>
      <h1>Going Live as {username}</h1>

      <video
        ref={remoteVideoRef}
        className="h-full w-full"
        autoPlay
        controls
        muted
        src=""
      ></video>

      {isLive && (
        <div className="mt-8">
          <div className="m-auto h-[70vh] rounded aspect-vertical-video shadow shadow-slate-500">
            <video
              ref={localVideoRef}
              className="h-full w-full"
              autoPlay
              controls
              muted
              src=""
            ></video>
          </div>
        </div>
      )}
      {!isLive && (
        <div className="mt-8 flex justify-center h-[70vh] items-center">
          <Button onClick={() => {}}>Go Live</Button>
        </div>
      )}
    </div>
  );
}
