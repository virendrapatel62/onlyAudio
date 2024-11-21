import { create } from "domain";
import { logger } from "./utils/logger";

export const activeStreams: {
  creator: string;
  socketId: string;
  connections: {
    offerer: string; // sockertid
    offer: any;
    answer: any;
    iceCandidates: [];
  }[];
}[] = [];

function getConnection(creator: string, offerer: string) {
  const stream = getStreamByCrearor(creator);
  if (stream) {
    return stream.connections.find(
      (connection) => connection.offerer == offerer
    );
  }
}

export function addOffer(creator: string, offerer: string, offer: any) {
  const stream = getStreamByCrearor(creator);
  if (stream) {
    const connection = getConnection(creator, offerer);
    if (connection) {
      connection.offer = offer;
    } else {
      stream.connections.push({
        answer: null,
        iceCandidates: [],
        offer: offer,
        offerer: offerer,
      });
    }
  }
}
export function addAnswer(creator: string, offerer: string, answer: any) {
  const stream = getStreamByCrearor(creator);
  if (stream) {
    const connection = getConnection(creator, offerer);
    connection && (connection.answer = answer);
  }
}

export function removeFromActiveStream(socketId: string) {
  const index = activeStreams.findIndex(
    (stream) => stream.socketId == socketId
  );
  if (index > -1) {
    activeStreams.splice(index, 1);
  }
}

export function addStream(creator: string, socketId: string) {
  const stream = getStreamByCrearor(creator);

  if (stream) {
    stream.socketId = socketId;
    return;
  }

  activeStreams.push({
    creator,
    socketId,
    connections: [],
  });
}

export function getSocketIdOfCreator(creatorUsername: string) {
  const stream = getStreamByCrearor(creatorUsername);
  return stream?.socketId;
}

export function logActiveStream() {
  logger.info(JSON.stringify(activeStreams));
}

export function getActiveCreatorUserNames() {
  return activeStreams.map((stream) => stream.creator);
}
export function getStreamByCrearor(username: string) {
  const index = activeStreams.findIndex((stream) => stream.creator == username);

  if (index > -1) {
    return activeStreams[index];
  }

  return null;
}
