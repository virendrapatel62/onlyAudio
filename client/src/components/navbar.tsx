import { useAuthStore, useIsAuthenticated } from "@/stores/auth-store";
import {
  AudioWaveform,
  DicesIcon,
  LogOutIcon,
  PodcastIcon,
  RadioIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { logout } = useAuthStore();
  const isAuthenticated = useIsAuthenticated();

  const pages = [
    {
      link: "/",
      title: (
        <AudioWaveform size={48} className="text-orange-400 hover:scale-120" />
      ),
      hoverTitle: "Home",
    },
    {
      link: "/go-live",
      title: <RadioIcon />,
      hoverTitle: "Go Live",
    },
    {
      link: "/playground",
      title: <DicesIcon />,
      hoverTitle: "Playground",
    },
    {
      link: "/my-creators",
      title: <PodcastIcon />,
      hoverTitle: "My Creators",
    },

    ...(isAuthenticated
      ? [
          {
            title: <LogOutIcon onClick={logout} />,
            hoverTitle: "My Creators",
          },
        ]
      : []),
  ];

  return (
    <header className="p-8">
      <ul className="flex flex-wrap gap-4 items-center">
        {pages.map((page) => (
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
