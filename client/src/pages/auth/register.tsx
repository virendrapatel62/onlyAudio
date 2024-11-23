import { Button } from "@/components/ui/button";
import InputGroup from "@/components/ui/input-group";
import { useAuthStore, useIsAuthenticated } from "@/stores/auth-store";
import { useUserRegistrationStore } from "@/stores/registration-store";
import { toSimpleObject } from "@/utils/yup";
import { FormEventHandler, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { IRegisterParams } from "@/api/auth";
import ErrorAlert from "@/components/ui/error-alert";
import { LOGIN_PAGE_URL } from "@/utils/constants";

const formDataValidationSchema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
  username: yup.string().min(4).required().label("Username"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters long.")
    .required()
    .label("Password"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required()
    .label("Confirm password"),
});

export default function RegisterPage() {
  const isAuthenticated = useIsAuthenticated();
  const store = useUserRegistrationStore();
  const { login } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
    validationSchema: formDataValidationSchema,
    onSubmit(values, formikHelpers) {
      const _values: any = {
        ...values,
      };
      delete _values.confirmPassword;
      store.register(_values);
    },
  });

  useEffect(() => {
    store.formValues &&
      login(store.formValues.email, store.formValues.password); // login & move to home page
  }, [store.registered]);

  const getError = (name: keyof typeof formik.initialValues) => {
    if (formik.touched[name]) return formik.errors[name];
  };

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
        <form onSubmit={formik.handleSubmit}>
          <ErrorAlert message={store.error}></ErrorAlert>

          <InputGroup
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            containerClassName="mt-4"
            label="Username"
            type="text"
            name="username"
            placeholder="Enter Username"
            className="border outline-gray-700 outline outline-1"
            error={getError("username")}
          ></InputGroup>
          <InputGroup
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            containerClassName="mt-4"
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email"
            error={getError("email")}
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>
          <InputGroup
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Password"
            placeholder="Enter password"
            containerClassName="mt-4"
            type="password"
            name="password"
            error={getError("password")}
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>
          <InputGroup
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            label="Confirm Password"
            placeholder="Enter password again"
            containerClassName="mt-4"
            type="password"
            name="confirmPassword"
            error={getError("confirmPassword")}
            className="border outline-gray-700 outline outline-1"
          ></InputGroup>

          <Button
            variant={"primary"}
            className="uppercase text-lg mt-12 w-full rounded-full h-14 font-semibold"
            disabled={!formik.isValid}
          >
            Create account
          </Button>

          <div className="text-center mt-4 text-gray-400">
            <Link
              to={LOGIN_PAGE_URL}
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
