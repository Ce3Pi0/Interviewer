import {
  BookOpenIcon,
  LayoutDashboardIcon,
  LucideUserSearch,
} from "lucide-react";
import { Link, useLocation } from "react-router";

interface Props {
  path: "/problems" | "/dashboard" | "/select-type";
  title: string;
}

const NavLinkComponent = ({ path, title }: Props) => {
  const location = useLocation();

  const isActive = (path: string): boolean =>
    location.pathname.startsWith(path) ||
    (location.pathname.startsWith("/problem") && path === "/problems");

  return (
    <Link
      to={path}
      className={`px-4 py-2.5 rounded-lg transition-all duration-200 ${isActive(path) ? "bg-primary text-primary-content" : "hover:bg-base-200 text-base-content/70 hover:text-base-content"}`}
    >
      <div className="flex items-center gap-x-2.5">
        {path === "/problems" && <BookOpenIcon className="size-4" />}{" "}
        {path === "/dashboard" && <LayoutDashboardIcon className="size-4" />}{" "}
        {path === "/select-type" && <LucideUserSearch className="size-4" />}{" "}
        <span className="font-medium hidden sm:inline">{title}</span>
      </div>
    </Link>
  );
};

export default NavLinkComponent;
