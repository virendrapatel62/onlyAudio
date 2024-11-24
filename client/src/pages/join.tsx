import { Button } from "@/components/ui/button";
import { io } from "@/socket";
import { useUser } from "@/stores/auth-store";
import { useJoinLiveStore } from "@/stores/join-live-store";
import { peerConnectionConfig } from "@/utils/peer-connection-config";
import { SocketEvents } from "@/utils/socket-events";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export default function JoinStream() {
  const store = useJoinLiveStore();

  const user = useUser();
  const params = useParams();
  const streamerUsername = params.username;
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const [haveTracks, setHaveTracks] = useState(false);

  useEffect(() => {
    if (remoteVideo.current) {
      remoteVideo.current.srcObject = store.remoteStream;
      remoteVideo.current.play();
    }
  }, [remoteVideo.current, haveTracks]);

  console.log({ haveTracks });

  async function setup(remoteUser: string) {
    const connection = new RTCPeerConnection(peerConnectionConfig);

    io.emit(SocketEvents.onAskForOffer, {
      remoteUser,
    });

    connection.addEventListener("icecandidate", (e) => {
      console.log("Listener is not sending ice..");
    });

    connection.addEventListener("track", (e) => {
      console.log(e.streams);
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

    io.on(SocketEvents.onOffer, async (data: any) => {
      const { offer } = data;
      connection.setRemoteDescription(offer);
      const answer = await connection.createAnswer();
      connection.setLocalDescription(answer);

      io.emit(SocketEvents.onAnswer, {
        remoteUser,
        answer,
      });
    });
    io.on(SocketEvents.onIceCandidate, (data: any) => {
      const icecandidate = data.icecandidate;
      if (icecandidate) {
        connection.addIceCandidate(icecandidate);
      }
    });
  }

  function onJoinStream() {
    store.streamer?.id && setup(store.streamer?.id || "");
  }

  useEffect(() => {}, [store.streamer]);

  useEffect(() => {
    params.username && store.fetchStreamerInfo(params.username);
  }, [params.username]);

  return (
    <div>
      <h1 className="text-xl text-center shadow shadow-gray-600 p-4 rounded">
        You Are Joing the live of{" "}
        <strong className="text-2xl">{streamerUsername}</strong>
        <hr />
        <strong className="text-2xl">{user?.id}</strong>
      </h1>

      <div className="p-4 h-96 flex justify-center items-center">
        {haveTracks ? (
          <video
            className="w-full aspect-vertical-video"
            ref={remoteVideo}
            autoPlay
          ></video>
        ) : (
          <Button onClick={onJoinStream} className="rounded-full">
            Join The Audio
          </Button>
        )}
      </div>
    </div>
  );
}
