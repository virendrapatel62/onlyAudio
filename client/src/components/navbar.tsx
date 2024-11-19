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
    <div>
      <ul className="flex flex-wrap gap-4">
        {pages.map((page) => (
          <li className="hover:bg-slate-200 p-2 rounded" key={page.link}>
            <Link to={page.link}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
