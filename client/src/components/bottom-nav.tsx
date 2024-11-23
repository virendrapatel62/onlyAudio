import { useAuthStore, useIsAuthenticated, useUser } from "@/stores/auth-store";
import { PROFILE_PAGE, SEARCH_PAGE_URL } from "@/utils/constants";
import { HomeIcon, MicIcon, SearchIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export default function BottomNavbar() {
  const { logout } = useAuthStore();
  const isAuthenticated = useIsAuthenticated();
  const user = useUser();
  const tabs = [
    {
      link: "/",
      title: <HomeIcon />,
      hoverTitle: "Talk to followers",
    },
    {
      link: "/speak",
      title: <MicIcon />,
      hoverTitle: "Talk to followers",
    },
    {
      link: SEARCH_PAGE_URL,
      title: <SearchIcon />,
      hoverTitle: "Search",
    },
  ];

  if (user) {
    tabs.push({
      link: PROFILE_PAGE`${user?.username}`,
      title: <UserIcon />,
      hoverTitle: "My Profile",
    });
  }

  if (!isAuthenticated) return <Fragment></Fragment>;

  return (
    <nav className="p-3 absolute bottom-0 left-0 right-0 bg-gray-950 shadow-sm">
      <ul className="flex flex-wrap gap-4 items-center justify-evenly">
        {tabs.map((page) => (
          <li
            className="hover:text-slate-100 flex-grow text-center flex items-center justify-center  p-2 rounded cursor-pointer transition-all duration-300"
            key={page.link}
            title={page.hoverTitle}
          >
            <Link className="hover:scale-125" to={page.link ? page.link : "#"}>
              {page.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
