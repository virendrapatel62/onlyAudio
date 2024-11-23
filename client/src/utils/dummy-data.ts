import withQueryString from "./withQueryString";

export function getAvatar(name?: string) {
  if (name) {
    return withQueryString(`https://ui-avatars.com/api/`, {
      name: name,
      rounded: "true",
      length: "1",
    });
  }

  return `https://avatar.iran.liara.run/public?q=${Math.random()}`;
}
