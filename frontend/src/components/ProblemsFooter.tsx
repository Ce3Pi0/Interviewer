import type { TProblem } from "../types/problems.types";

interface Props {
  problems: TProblem[];
}

const ProblemsFooter = ({ problems }: Props) => {
  return (
    <footer className="mt-12 card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="stats stats-vertical lg:stats-horizontal">
          <div className="stat">
            <div className="stat-title">Total Problems</div>
            <div className="stat-value text-primary">{problems.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Easy Problems</div>
            <div className="stat-value text-success">
              {
                problems.filter(
                  (problem) => problem.difficulty.toLowerCase() === "easy",
                ).length
              }
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Medium Problems</div>
            <div className="stat-value text-warning">
              {
                problems.filter(
                  (problem) => problem.difficulty.toLowerCase() === "medium",
                ).length
              }
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Hard Problems</div>
            <div className="stat-value text-error">
              {
                problems.filter(
                  (problem) => problem.difficulty.toLowerCase() === "hard",
                ).length
              }
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProblemsFooter;
