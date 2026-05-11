import Navbar from "../components/Navbar";

import { PROBLEMS } from "../data/problems";
import type { Problem } from "../types/problems.types";
import ProblemsFooter from "../components/ProblemsFooter";
import ProblemComponent from "../components/ProblemComponent";

const ProblemsPage = () => {
  const problems: Problem[] = Object.values(PROBLEMS);

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>

          <p className="text-base-content/70">
            Sharpen your coding skills with these curated problems
          </p>
        </header>

        <div className="space-y-4">
          {problems.map((problem) => (
            <ProblemComponent problem={problem} key={problem.id} />
          ))}
        </div>

        <ProblemsFooter problems={problems} />
      </div>
    </div>
  );
};

export default ProblemsPage;
