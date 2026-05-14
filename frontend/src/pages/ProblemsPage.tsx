import Navbar from "../components/Navbar";

import ProblemsFooter from "../components/ProblemsFooter";
import ProblemComponent from "../components/ProblemComponent";
import { problemsStore } from "../hooks/useProblems";
import { useEffect, useState } from "react";
import { userStore } from "../hooks/useUsers";
import ProblemsHeader from "../components/ProblemsHeader";
import { Spinner } from "../components/Spinner";
import type { TDifficulty } from "../types/problems.types";
import { getDifficultyTextColor } from "../lib/utils";

const ProblemsPage = () => {
  const { user } = userStore();
  const { fetchProblems, problems, problemsLoading } = problemsStore();

  const [filter, setFilter] = useState<TDifficulty | "">("");

  useEffect(() => {
    if (!problems) fetchProblems();
  }, [problems, fetchProblems]);

  const filteredProblems = problems?.filter((problem) => {
    if (!filter) {
      return true;
    }
    return problem.difficulty === filter;
  });

  return (
    <div className="min-h-screen bg-base-200">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <ProblemsHeader
          headerType="view"
          userType={user?.type}
          title="Practice Problems"
          description="Sharpen your coding skills with these curated problems"
          to="/problems/new"
          btnText="Create a New Problem"
        />
        <select
          className={`select select-bordered mb-6 ${getDifficultyTextColor(filter)}`}
          onChange={(e) => setFilter(e.target.value as TDifficulty | "")}
        >
          <option className="text-white" value="">
            All
          </option>
          <option className={`${getDifficultyTextColor("easy")}`} value="easy">
            Easy
          </option>
          <option
            className={`${getDifficultyTextColor("medium")}`}
            value="medium"
          >
            Medium
          </option>
          <option className={`${getDifficultyTextColor("hard")}`} value="hard">
            Hard
          </option>
        </select>

        {problemsLoading && !problems && <Spinner />}
        {filteredProblems && (
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <ProblemComponent problem={problem} key={problem._id} />
            ))}
          </div>
        )}

        {problems && <ProblemsFooter problems={problems} />}
      </div>
    </div>
  );
};

export default ProblemsPage;
