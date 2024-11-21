import { io } from "@/socket";
import { SocketEvents } from "@/utils/socket-events";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyCreators() {
  const [creators, setCreators] = useState<string[]>([]);
  useEffect(() => {
    io.on(SocketEvents.onActiveCrators, (creators: string[]) => {
      setCreators(creators);
    });
  }, []);

  return (
    <div>
      <div className="flex items-center justify-center">
        <h1 className="text-4xl text-center">
          My All Creators, I am following
        </h1>
      </div>

      <div className="mt-4">
        <ul>
          {creators.map((c) => (
            <li key={c}>
              <Link to={`/join-live/${c}`}>{c} is Live now</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
