import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div>
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-4xl">Sign in</h1>
        <p className="text-gray-400">
          Welcome back to your favorite audio collaboration app!
        </p>
      </div>
      <div className="m-4"></div>

      <div className="mt-4 m-4">
        <form>
          <InputGroup
            containerClassName="mt-8"
            label="Email"
            placeholder="Enter your email"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>
          <InputGroup
            label="Password"
            placeholder="Enter your password"
            containerClassName="mt-8"
            type="password"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>

          <Button
            variant={"primary"}
            className="uppercase text-lg mt-12 w-full rounded-full h-14 font-semibold"
          >
            Sign In
          </Button>

          <div>
            <div className="text-center mt-8 text-gray-400">
              <Link
                to={"/auth/reset-password"}
                className="border-b pb-1 border-gray-600 w-fit"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center mt-8 text-gray-400">
              <Link
                to={"/auth/register"}
                className="border-b pb-1 border-gray-600 w-fit"
              >
                Do not have an acoount? Create now!
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
