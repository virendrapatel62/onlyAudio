import { connect } from "socket.io-client";
import { SOCKET_SERVER_URL } from "../utils/env";

const io = connect(SOCKET_SERVER_URL);

export { io };
