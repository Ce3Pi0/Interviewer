// TODO: Modularize

import {
  getDifficultyBadgeClass,
  getDifficultyTextColor,
} from "../../lib/utils";
import type { TProblem } from "../../types/problems.types";
import ProblemConstraintComponent from "../ProblemConstraintComponent";
import ProblemExampleComponent from "../ProblemExampleComponent";

interface Props {
  problem: TProblem | undefined;
  currentProblemId: string;
  onProblemChange: (e: string) => void;
  problems: TProblem[] | null;
}

const ProblemDescriptionComponent = ({
  problem,
  problems,
  currentProblemId,
  onProblemChange,
}: Props) => {
  return (
    <div className="h-full overflow-y-auto bg-base-200">
      <div className="p-6 bg-base-100 border-b border-base-300">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl font-bold text-base-content">
            {problem?.title}
          </h1>
          <span
            className={`badge ${getDifficultyBadgeClass(problem?.difficulty || "")}`}
          >
            {problem?.difficulty}
          </span>
        </div>
        <p className="text-base-content/60">{problem?.category}</p>
        <div className="mt-4">
          <select
            className="select select-sm w-full"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {problems?.map((p) => (
              <option
                key={p._id}
                value={p._id}
                className={getDifficultyTextColor(p.difficulty)}
              >
                {p.title} - {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold text-base-content">Description</h2>
          <div className="space-y-3 text-base leading-relaxed">
            <p className="text-base-content/90">{problem?.description.text}</p>
            {problem?.description.notes.map((note, index) => (
              <p key={index}>{note}</p>
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
          <div className="space-y-4">
            {problem?.examples.map((example, index) => (
              <ProblemExampleComponent
                key={index}
                example={example}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">
            Constraints
          </h2>
          <ul className="space-y-2 text-base-content/90">
            {problem?.constraints.map((constraint, index) => (
              <ProblemConstraintComponent key={index} constraint={constraint} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemDescriptionComponent;
