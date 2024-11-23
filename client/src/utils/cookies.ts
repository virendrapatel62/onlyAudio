import Cookies from "js-cookie";

const TOKEN_COOKIE_KEY = "authorization";

export function setAuthenticationTokenCookie(token: string) {
  Cookies.set(TOKEN_COOKIE_KEY, token, {
    secure: true,
  });
}

export function getAuthenticationTokenCookie() {
  return Cookies.get(TOKEN_COOKIE_KEY);
}
