import { SparklesIcon } from "lucide-react";
import { Link } from "react-router";
import AuthBtnComponent from "./AuthBtnComponent";
import NavbarLeftComponent from "./NavbarLeftComponent";

const HomeNavComponent = () => {
  return (
    <nav className="bg-base-100/80 backdrop-blur-md border-b border-primary/0 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <Link
          to={"/"}
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-10 rounded-xl bg-linear-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg">
            <SparklesIcon className="size-6 text-white" />
          </div>

          <NavbarLeftComponent />
        </Link>

        <AuthBtnComponent />
      </div>
    </nav>
  );
};

export default HomeNavComponent;
