import { SparklesIcon } from "lucide-react";
import { Link } from "react-router";
import NavbarLeftComponent from "./NavbarLeftComponent";
import NavLinkComponent from "./NavLinkComponent";
import { UserButton } from "@clerk/react";

const Navbar = () => {
  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <Link
          to="/"
          className="group flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-10 rounded-xl bg-linear-to-r from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
            <SparklesIcon className="size-6 text-white" />
          </div>

          <NavbarLeftComponent />
        </Link>

        <div className="flex items-center gap-1">
          <NavLinkComponent title="Problems" path="/problems" />
          <NavLinkComponent title="Dashboard" path="/dashboard" />
          <div className="ml-4 mt-2">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
