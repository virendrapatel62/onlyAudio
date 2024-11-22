import api from ".";

export interface ILoginParams {
  email: string;
  password: string;
}
export interface IRegisterParams {
  email: string;
  password: string;
  username: string;
}

export function login(credentials: ILoginParams) {
  return api
    .post("/api/auth/login", credentials)
    .then((response) => response.data);
}

export function register(payload: IRegisterParams) {
  return api
    .post("/api/auth/signup", payload)
    .then((response) => response.data);
}
