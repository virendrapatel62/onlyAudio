import { emitOffer, io } from "@/socket";
import { useJoinLiveStore } from "@/stores/join-live-store";
import { peerConnectionConfig } from "@/utils/peer-connection-config";
import { SocketEvents } from "@/utils/socket-events";
import { getUserMedia } from "@/utils/web-rtc";
import { ConeIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function JoinTheLive() {
  const store = useJoinLiveStore();
  const params = useParams();
  const creator = params.creator;
  const remoteVideo = useRef<HTMLVideoElement>(null);

  const [haveTracks, setHaveTracks] = useState(false);

  useEffect(() => {
    console.log(remoteVideo.current, store.remoteStream);
    if (remoteVideo.current) {
      remoteVideo.current.srcObject = store.remoteStream;
      remoteVideo.current.play();
    }
  }, [remoteVideo.current, haveTracks]);

  console.log({ haveTracks });

  async function setup(creator: string) {
    const connection = new RTCPeerConnection(peerConnectionConfig);

    io.emit(SocketEvents.onAskForOffer, {
      creator,
    });

    connection.addEventListener("icecandidate", (e) => {
      console.log("SEINDIGN ICE");

      io.emit(SocketEvents.onIceCandidate, {
        creator: creator,
        icecandidate: e.candidate,
      });
    });

    connection.addEventListener("track", (e) => {
      const m = new MediaStream();
      e.streams[0].getTracks().forEach((t) => {
        m?.addTrack(t);
      });
      store.setRemoteStream(m);
      setHaveTracks(true);
    });
    connection.addEventListener("connectionstatechange", (e) => {
      console.log("COnnection state  : ", connection.connectionState);
    });

    io.on(SocketEvents.onOffer, async (data) => {
      console.log("Got the offer");
      const { offer } = data;
      connection.setRemoteDescription(offer);
      console.log("Creating Answer");
      const answer = await connection.createAnswer();

      connection.setLocalDescription(answer);

      io.emit(SocketEvents.onAnswer, {
        creator,
        answer,
      });
    });
    io.on(SocketEvents.onIceCandidate, (data) => {
      const icecandidate = data.icecandidate;

      console.log("GOT THE ICE");

      if (icecandidate) {
        connection.addIceCandidate(icecandidate);
      }
    });
  }

  useEffect(() => {
    store.setCreatorName(creator as string);
    (async () => {
      setup(creator || "");
    })();
  }, [creator]);

  return (
    <div>
      <h1 className="text-xl text-center shadow shadow-gray-600 p-4 rounded">
        You Are Joing the live of{" "}
        <strong className="text-2xl">{store.creator}</strong>
      </h1>

      <div>
        <video
          className="h-full w-full aspect-vertical-video"
          ref={remoteVideo}
          autoPlay
          controls
        ></video>
      </div>
    </div>
  );
}
