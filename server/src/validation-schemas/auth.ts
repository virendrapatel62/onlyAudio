import * as yup from "yup";

export const authLoginBodySchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

export const authSignupBodySchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  username: yup.string().min(4).required(),
});
