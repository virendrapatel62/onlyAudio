import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { useIsAuthenticated } from "@/stores/auth-store";
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage() {
  const isAuthenticated = useIsAuthenticated();

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-4xl">Create an account</h1>
        <p className="text-gray-400">
          Welcome back to your favorite audio collaboration app!
        </p>
      </div>
      <div className="m-4"></div>

      <div className="mt-4 m-4">
        <form>
          <InputGroup
            containerClassName="mt-4"
            label="Username"
            type="text"
            placeholder="Enter Username"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>
          <InputGroup
            containerClassName="mt-4"
            label="Email"
            type="email"
            placeholder="Enter email"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>
          <InputGroup
            label="Password"
            placeholder="Enter password"
            containerClassName="mt-4"
            type="password"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>
          <InputGroup
            label="Confirm Password"
            placeholder="Enter password again"
            containerClassName="mt-4"
            type="password"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>

          <Button
            variant={"primary"}
            className="uppercase text-lg mt-12 w-full rounded-full h-14 font-semibold"
          >
            Create account
          </Button>

          <div className="text-center mt-4 text-gray-400">
            <Link
              to={"/auth/login"}
              className="border-b pb-1 border-gray-600 w-fit"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
