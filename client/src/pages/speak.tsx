import { Button } from "@/components/ui/button";
import { io } from "@/socket";
import { useUser } from "@/stores/auth-store";
import { useGoLiveStore } from "@/stores/go-live-store";
import { peerConnectionConfig } from "@/utils/peer-connection-config";
import { SocketEvents } from "@/utils/socket-events";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { linearPath } from "waveform-path";
import { getUserMedia } from "../utils/web-rtc";

const getUserMediaConfig = {
  audio: true,
  video: true,
};

export default function SpeakPage() {
  const { setLocalStream, localStream, addNewConnection } = useGoLiveStore();
  const store = useGoLiveStore();
  const user = useUser();
  const localAudioRef = useRef<HTMLVideoElement>(null);
  const remoteStream = useRef<MediaStream>(new MediaStream());

  function cleanUp() {
    Object.values(useGoLiveStore.getState().connections).forEach(
      (connection) => {
        console.log("closing the connection");
        connection.close();
        connection.onicecandidate = null;
        connection.ontrack = null;
      }
    );

    io.off(SocketEvents.onAskForOffer);
    io.off(SocketEvents.onOffer);
    io.off(SocketEvents.onAnswer);
    io.off(SocketEvents.onIceCandidate);
  }

  useEffect(() => {
    store.reset();
    return cleanUp;
  }, []);

  async function setupSocketEventListeners() {
    io.on(SocketEvents.onAskForOffer, async (data: any) => {
      const remoteUser = data.remoteUser;

      const { localStream } = useGoLiveStore.getState();
      const connection = new RTCPeerConnection(peerConnectionConfig);

      connection.onicecandidate = (e) => {
        console.log("On Ice Candidate");
        io.emit(SocketEvents.onIceCandidate, {
          icecandidate: e.candidate,
          remoteUser,
        });
      };

      connection.ontrack = (e) => {
        console.log("On Track");
        e.streams[0].getTracks().forEach((t) => {
          remoteStream.current.addTrack(t);
        });
      };

      if (localStream) {
        localStream.getTracks().forEach((track) => {
          connection.addTrack(track, localStream);
        });
      }
      const offer = await connection.createOffer();
      connection.setLocalDescription(offer);

      io.emit(SocketEvents.onOffer, {
        offer,
        remoteUser: remoteUser,
      });

      addNewConnection({
        remoteUser,
        connection,
      });
    });

    io.on(SocketEvents.onAnswer, async (data: any) => {
      const { connections } = useGoLiveStore.getState();
      console.log(useGoLiveStore.getState());
      const { remoteUser, answer } = data;
      const connection = connections[remoteUser];
      console.log(connection);
      connection.setRemoteDescription(answer);
    });

    io.on(SocketEvents.onIceCandidate, async (data: any) => {
      const { connections } = useGoLiveStore.getState();
      const { viewer, icecandidate } = data;
      console.log("GOT THE ICE");
      connections[viewer].addIceCandidate(icecandidate);
    });
  }

  async function onGoLive() {
    const stream = await getUserMedia(getUserMediaConfig);
    setLocalStream(stream);
    setupSocketEventListeners();

    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const processor = context.createScriptProcessor(2048, 1, 1);
    source.connect(processor);
    processor.connect(context.destination);

    const optionsMic1 = {
      samples: 100,
      type: "bars",
      top: 0,
      left: 0,
      height: 200,
      animation: false,
      normalize: false,
      animationframes: 10,
      paths: [{ d: "V", sy: 0, x: 100, ey: 100 }],
    };

    processor.addEventListener("audioprocess", (e) => {
      const pathMic2 = linearPath(e.inputBuffer, optionsMic1);
      document
        ?.querySelector("#audio-visualizer path")
        ?.setAttribute("d", pathMic2);
    });
  }

  useEffect(() => {
    if (localAudioRef.current) {
      console.log(localStream, localAudioRef.current);
      localAudioRef.current.srcObject = localStream;
    }
  }, [localAudioRef.current, localStream]);

  const speaking = !!localStream;

  return (
    <div>
      <div className="text-center">
        <div className="text-xl"> Username : {user?.username}</div>
        <div className="text-xl"> Username : {user?.id}</div>
      </div>

      <div className="aspect-vertical-video w-full flex justify-center items-center p-3 box-border h-[70vh] rounded border">
        <video
          autoPlay
          ref={localAudioRef}
          muted
          className="w-full h-full rounded"
        ></video>
      </div>

      <div className="flex justify-center items-center  aspect-square w-full">
        <Button
          className={clsx(
            "rounded-full h-32 aspect-square",
            speaking ? "animate-pulse" : ""
          )}
          onClick={onGoLive}
        >
          {speaking ? "Speaking" : "Start Speaking"}
        </Button>
      </div>
    </div>
  );
}
