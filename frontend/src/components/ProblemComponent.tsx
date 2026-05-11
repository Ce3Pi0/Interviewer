import { Link } from "react-router";
import type { Problem } from "../types/problems.types";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

interface Props {
  problem: Problem;
}

const ProblemComponent = ({ problem }: Props) => {
  return (
    <Link
      to={`/problem/${problem.id}`}
      className="card bg-base-100 hover:scale-[1.01] transition-transform"
    >
      <div className="card-body">
        <div className="flex items-center justify-between gap-4">
          {/* Left */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code2Icon className="size-6" />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold">{problem.title}</h2>
                  <span
                    className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}
                  >
                    {problem.difficulty}
                  </span>
                </div>

                <p className="text-sm text-base-content/60">
                  {problem.category}
                </p>
              </div>
            </div>
            <p className="text-base-content/80 mb-3">
              {problem.description.text}
            </p>
          </div>
          {/* Right */}

          <div className="flex items-center gap-2 text-primary">
            <span className="font-medium"> Solve</span>
            <ChevronRightIcon className="size-5" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProblemComponent;
