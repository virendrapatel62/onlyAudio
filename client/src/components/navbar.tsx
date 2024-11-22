import { useAuthStore, useIsAuthenticated } from "@/stores/auth-store";
import { AudioWaveform, DicesIcon, LogOutIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuthStore();
  const isAuthenticated = useIsAuthenticated();

  const left = [
    {
      link: "/",
      title: <AudioWaveform className="text-orange-400 scale-125" />,
      hoverTitle: "OnlyAudio",
    },
    {
      link: "/playground",
      title: <DicesIcon />,
      hoverTitle: "Playground",
    },
  ];
  const right = [
    ...(isAuthenticated
      ? [
          {
            title: <LogOutIcon onClick={logout} />,
            hoverTitle: "My Creators",
            link: "#",
          },
        ]
      : []),
  ];

  return (
    <header className="p-4 flex justify-between bg-gray-950">
      <ul className="flex flex-wrap gap-4 items-center">
        {left.map((page) => (
          <li
            className="hover:text-slate-100 hover:scale-125 p-2 rounded cursor-pointer transition-all duration-300"
            key={page.link}
            title={page.hoverTitle}
          >
            <Link to={page.link ? page.link : "#"}>{page.title}</Link>
          </li>
        ))}
      </ul>
      <ul className="flex flex-wrap gap-4 items-center">
        {right.map((page) => (
          <li
            className="hover:text-slate-100 hover:scale-125 p-2 rounded cursor-pointer transition-all duration-300"
            key={page.link}
            title={page.hoverTitle}
          >
            <Link to={page.link ? page.link : "#"}>{page.title}</Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
