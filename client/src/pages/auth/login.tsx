import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/ui/error-alert";
import InputGroup from "@/components/ui/input-group";
import { useAuthStore, useIsAuthenticated } from "@/stores/auth-store";
import {
  HOME_PAGE_URL,
  REGISTRATION_PAGE_URL,
  RESET_PASSWORD_PAGE_URL,
} from "@/utils/constants";
import { FormEventHandler } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

export default function LoginPage() {
  const { login, error, isLoading } = useAuthStore();

  const isAuthenticated = useIsAuthenticated();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("return_to") || HOME_PAGE_URL;

  const onFormSubmit: FormEventHandler = (event) => {
    const form = event.target as HTMLFormElement;
    const formValues = Object.fromEntries(new FormData(form).entries());
    const { email, password } = formValues as any;

    login(email, password);
    event.preventDefault();
  };

  if (isAuthenticated) {
    return <Navigate to={returnTo} />;
  }

  return (
    <div>
      <div className="text-center flex flex-col gap-5">
        <h1 className="text-4xl">Sign in</h1>
        <p className="text-gray-400">
          Welcome back to your favorite audio collaboration app!
        </p>
      </div>

      <div className="mt-4 m-4">
        <form onSubmit={onFormSubmit}>
          <InputGroup
            containerClassName="mt-8"
            label="Email"
            name="email"
            placeholder="Enter your email"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>
          <InputGroup
            label="Password"
            placeholder="Enter your password"
            name="password"
            containerClassName="mt-8"
            type="password"
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>

          <ErrorAlert message={error} />

          <Button
            variant={"primary"}
            type="submit"
            disabled={isLoading}
            className="uppercase text-lg mt-12 w-full rounded-full h-14 font-semibold"
          >
            {!isLoading ? "Sign In" : "Hold on!"}
          </Button>

          <div>
            <div className="text-center mt-8 text-gray-400">
              <Link
                to={RESET_PASSWORD_PAGE_URL}
                className="border-b pb-1 border-gray-600 w-fit"
              >
                Forgot your password?
              </Link>
            </div>

            <div className="text-center mt-8 text-gray-400">
              <Link
                to={REGISTRATION_PAGE_URL}
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
