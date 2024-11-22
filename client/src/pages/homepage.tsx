import SpeakingHightlights from "@/components/home/speaking-highlights";
import { useIsAuthenticated, useUser } from "@/stores/auth-store";
import { Hand } from "lucide-react";
import { Link } from "react-router-dom";

function Button(props: { text: string; to: string }) {
  return (
    <Link
      to={props.to}
      className="font-semibold border-gray-900 border bg-gray-300 text-gray-900 rounded-full p-4 w-32 text-center hover:text-gray-900 hover:bg-gray-300 transition-all duration-300"
    >
      {props.text}
    </Link>
  );
}

export default function HomePage() {
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();

  return (
    <div>
      <SpeakingHightlights />
      <div className="h-[70vh] flex flex-col gap-12 items-center justify-center p-4">
        <h1 className="text-4xl text-center tracking-wider font-bold leading-tight">
          friends over followers
        </h1>

        {isAuthenticated && (
          <div className="flex gap-4 text-2xl items-center capitalize">
            <Hand className="-rotate-12"></Hand>Hello {user?.username}
          </div>
        )}

        {!isAuthenticated && (
          <div className="flex gap-8 justify-center items-center">
            <Button to="/auth/login" text="Login"></Button>
            <Button to="/auth/register" text="Register"></Button>
          </div>
        )}
      </div>
    </div>
  );
}
