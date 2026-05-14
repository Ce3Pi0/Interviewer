import { ArrowLeftIcon, Plus } from "lucide-react";
import { Link } from "react-router";
import { USER_TYPE } from "../types/user.types";

interface Props {
  headerType: "create" | "view";
  userType: "interviewer" | "interviewee" | undefined;
  title: string;
  description: string;
  to: string;
  btnText: string;
}

const ProblemsHeader = ({
  headerType,
  userType,
  title,
  description,
  to,
  btnText,
}: Props) => {
  const shouldShowButton = () =>
    (userType === USER_TYPE.INTERVIEWER && headerType === "view") ||
    headerType === "create";

  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>

          <p className="text-base-content/70">{description}</p>
        </div>
        {shouldShowButton() && (
          <Link to={to}>
            <div className="btn btn-secondary text-xl">
              {headerType === "create" && (
                <ArrowLeftIcon size={20} className="mt-1" />
              )}
              {btnText}
              {headerType === "view" && <Plus size={20} className="mt-1" />}
            </div>
          </Link>
        )}
      </div>
    </header>
  );
};

export default ProblemsHeader;
