type TemplateStringsFunction = (
  strings: TemplateStringsArray,
  ...values: string[]
) => string;

export const LOGIN_PAGE_URL = "/auth/login";
export const REGISTRATION_PAGE_URL = "/auth/register";
export const RESET_PASSWORD_PAGE_URL = "/auth/reset-password";

/**
 *  @example
 *   PROFILE_PAGE`username`
 *   PROFILE_PAGE`${user.username}`
 */
export const PROFILE_PAGE: TemplateStringsFunction = (
  stringUserName,
  ...username
) => {
  return `/profile/${stringUserName[0]?.trim() || username[0]}`;
};
export const JOIN_STREAM: TemplateStringsFunction = (
  stringUserName,
  ...username
) => {
  return `/join/${stringUserName[0]?.trim() || username[0]}`;
};

export const HOME_PAGE_URL = "/";
export const SEARCH_PAGE_URL = "/search";
