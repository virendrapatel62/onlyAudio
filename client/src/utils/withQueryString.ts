export default function (url: string, query: Record<string, string>) {
  return `${url}?${new URLSearchParams(query).toString()}`;
}
