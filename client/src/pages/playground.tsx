import React, { useEffect, useRef, useState } from "react";
import Peer from "simple-peer";
import ReactAudioPlayer from "react-audio-player";

let peerConfiguration = {
  iceServers: [
    {
      urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"],
    },
  ],
};
export default function Playground() {
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection>();

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [offer, setOffer] = useState<any>();
  const [answer, setAnswer] = useState<any>();
  const player = useRef<HTMLVideoElement>(null);
  const remoteAudio = useRef<HTMLVideoElement>(null);

  const [localIceCandiates, setLocalIcecandiates] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const localPeerConnection = new RTCPeerConnection(peerConfiguration);

      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true,
      });

      localPeerConnection.addEventListener("icecandidate", (e) => {
        console.log("ICE CANDIDATE FOUND.....");
        console.log("Send ice candidate to signaling server");
        if (e.candidate) {
          setLocalIcecandiates((ice) => [...ice, e.candidate]);
        }
      });

      localPeerConnection.addEventListener("track", (e) => {
        setRemoteStream(e.streams[0]);
      });

      setLocalStream(localStream);
      setPeerConnection(localPeerConnection);
    })();
  }, []);

  useEffect(() => {
    if (player.current) {
      player.current.srcObject = localStream;
    }
    if (remoteAudio.current) {
      remoteAudio.current.srcObject = remoteStream;
    }
  }, [localStream, remoteStream]);
  const handleCall = async () => {
    if (!localStream) return;

    const tracks = localStream?.getTracks();
    tracks.forEach((track) => {
      peerConnection?.addTrack(track, localStream);
    });

    const offer = await peerConnection?.createOffer({});

    peerConnection?.setLocalDescription(offer);

    setOffer(offer);
  };
  console.log({ offer });

  const handleOfferChange = async (e) => {
    const offer = JSON.parse(e.target.value?.trim());

    const userMedia = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(userMedia);
    userMedia.getAudioTracks().forEach((track) => {
      peerConnection?.addTrack(track, userMedia);
    });

    peerConnection?.setRemoteDescription(offer);

    const answer = await peerConnection?.createAnswer();

    peerConnection?.setLocalDescription(answer);

    answer && setAnswer(answer);
  };

  const handleAnswer = (e) => {
    const answer = JSON.parse(e.target.value);
    peerConnection?.setRemoteDescription(answer);
    console.log(peerConnection?.currentRemoteDescription);
  };

  return (
    <div>
      {/* <ReactAudioPlayer ref={player} autoPlay controls /> */}
      <h1>Welcome to the playground</h1>
      <button onClick={handleCall}>Call</button>

      {localStream && (
        <div>
          <video controls muted ref={player} autoPlay></video>
        </div>
      )}
      {remoteAudio && (
        <div>
          <video controls ref={remoteAudio} autoPlay></video>
        </div>
      )}

      <div>
        <p>Copy The Offer Paste in Answer Another Paste Offer Text Area</p>
        <textarea value={JSON.stringify(offer, null, 2)} rows={10}></textarea>
      </div>
      <div>
        <p>Paste the offer here</p>
        <textarea onChange={handleOfferChange} rows={10}></textarea>
      </div>
      <div>
        <p>Copy the answer</p>
        <textarea value={JSON.stringify(answer, null, 2)} rows={10}></textarea>
      </div>
      <div>
        <p>Paste the answer</p>
        <textarea onChange={handleAnswer} rows={10}></textarea>
      </div>
      <div>
        <p>LOCAL ICE</p>
        <textarea
          value={JSON.stringify(localIceCandiates, null, 2)}
          rows={10}
        ></textarea>
      </div>
      <div>
        <p>PASTE REMOTE ICE</p>
        <textarea
          rows={10}
          onChange={(e) => {
            const value: any[] = JSON.parse(e.target.value);
            value.forEach((v) => {
              peerConnection?.addIceCandidate(v);
            });
          }}
        ></textarea>
      </div>
    </div>
  );
}
