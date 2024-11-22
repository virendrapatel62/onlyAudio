import api from ".";

interface ILoginParams {
  email: string;
  password: string;
}

export function login(credentials: ILoginParams) {
  return api
    .post("/api/auth/login", credentials)
    .then((response) => response.data);
}
