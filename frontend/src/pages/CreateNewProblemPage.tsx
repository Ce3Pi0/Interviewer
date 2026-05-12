import { useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { userStore } from "../hooks/fetchUsers";
import { Navigate } from "react-router";
import type { Language, TCreateProblem } from "../types/problems.types";

import ProblemsHeader from "../components/ProblemsHeader";
import BasicInfoComponent from "../components/create-problem-components/BasicInfoComponent";
import DescriptionComponent from "../components/create-problem-components/DescriptionComponent";
import ExamplesComponent from "../components/create-problem-components/ExamplesComponent";
import ConstraintsComponent from "../components/create-problem-components/ConstraintsComponent";
import StarterCodeComponent from "../components/create-problem-components/StarterCodeComponent";
import ExpectedOutputComponent from "../components/create-problem-components/ExpectedOutputComponent";
import { initialFormData } from "../lib/utils";
import { problemsStore } from "../hooks/fetchProblems";
import { Spinner } from "../components/Spinner";
import toast from "react-hot-toast";

const CreateNewProblemPage = () => {
  const { user } = userStore();
  const { createProblemLoading, createProblem } = problemsStore();

  if (user?.type !== "interviewer") return <Navigate to="/problems"></Navigate>;

  const topRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState<TCreateProblem>(initialFormData);
  const [codeTab, setCodeTab] = useState<Language>("javascript");
  const [outputTab, setOutputTab] = useState<Language>("javascript");

  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth" });

  const isValidStarerCodeField = () =>
    formData.starterCode.java.trim() !== "" &&
    formData.starterCode.javascript.trim() !== "" &&
    formData.starterCode.python.trim() !== "";
  const isValidExpectedOutputField = () =>
    formData.expectedOutput.java.trim() !== "" &&
    formData.expectedOutput.javascript.trim() !== "" &&
    formData.expectedOutput.python.trim() !== "";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    scrollToTop();

    if (!isValidStarerCodeField()) {
      toast.error("Starter code field cannot be empty");
      return;
    }

    if (!isValidExpectedOutputField()) {
      toast.error("Expected output field cannot be empty");
      return;
    }

    const created = await createProblem(formData);

    if (created) {
      setFormData(initialFormData);
      setCodeTab("javascript");
      setOutputTab("javascript");
    }
  };

  return (
    <div className="min-h-screen bg-base-200" ref={topRef}>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <ProblemsHeader
          userType={user.type}
          headerType="create"
          title="Create New Problem"
          description="Fill in the details below to create a new coding problem"
          to="/problems"
          btnText="Back to Problems"
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <BasicInfoComponent formData={formData} setFormData={setFormData} />
          <DescriptionComponent formData={formData} setFormData={setFormData} />
          <ExamplesComponent formData={formData} setFormData={setFormData} />
          <ConstraintsComponent formData={formData} setFormData={setFormData} />
          <StarterCodeComponent
            formData={formData}
            setFormData={setFormData}
            codeTab={codeTab}
            setCodeTab={setCodeTab}
          />

          <ExpectedOutputComponent
            formData={formData}
            setFormData={setFormData}
            outputTab={outputTab}
            setOutputTab={setOutputTab}
          />

          <div className="flex justify-end gap-4">
            <button type="button" className="btn btn-ghost">
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={createProblemLoading}
            >
              {createProblemLoading && <Spinner />}
              Create Problem
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNewProblemPage;
