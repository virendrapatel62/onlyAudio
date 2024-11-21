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
  return (
    <div>
      <div className="h-[70vh] flex flex-col gap-12 items-center justify-center p-4">
        <h1 className="text-4xl text-center tracking-wider font-bold leading-tight">
          friends over followers
        </h1>

        <div className="flex gap-8 justify-center items-center">
          <Button to="/auth/login" text="Login"></Button>
          <Button to="/auth/register" text="Register"></Button>
        </div>
      </div>
    </div>
  );
}
