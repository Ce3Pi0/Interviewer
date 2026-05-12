import logoSvg from "../assets/logo.svg";
import { Link } from "react-router";

interface LogoProps {
  url?: string;
  showText?: boolean;
  imgClass?: string;
  textClass?: string;
}

const Logo = ({
  url = "/",
  showText = true,
  imgClass = "size-[30px]",
  textClass,
}: LogoProps) => (
  <Link to={url} className="flex items-center gap-2 w-fit">
    <img src={logoSvg} alt="Interviewer" className={imgClass} />
    {showText && (
      <span className={`font-semibold text-lg leading-tight ${textClass}`}>
        Interviewer
      </span>
    )}
  </Link>
);

export default Logo;
