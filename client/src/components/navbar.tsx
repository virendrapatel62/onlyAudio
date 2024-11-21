import { Link } from "react-router-dom";

export default function Navbar() {
  const pages = [
    {
      link: "/go-live",
      title: "👉 Go Live",
    },
    {
      link: "/playground",
      title: "👉 Playground",
    },
    {
      link: "/my-creators",
      title: "👉 My Creators",
    },
  ];

  return (
    <header className="px-4 py-2 shadow shadow-gray-700">
      <ul className="flex flex-wrap gap-4">
        {pages.map((page) => (
          <li
            className="hover:bg-slate-200 hover:text-slate-700 p-2 rounded cursor-pointer"
            key={page.link}
          >
            <Link to={page.link}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
