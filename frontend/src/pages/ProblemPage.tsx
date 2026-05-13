import confetti from "canvas-confetti";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { Language } from "../types/problems.types";
import { problemsStore } from "../hooks/useProblems";
import Navbar from "../components/Navbar";
import ProblemDescriptionComponent from "../components/problem/ProblemDescriptionComponent";
import CodeEditorPanelComponent from "../components/problem/CodeEditorPanelComponent";
import OutputPanelComponent from "../components/problem/OutputPanelComponent";
import { executeCode } from "../lib/executeCode";
import toast from "react-hot-toast";
import type { TExecuteCode } from "../types/executeCode.types";
import { normalizeOutput } from "../lib/utils";

const ProblemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { problems, fetchProblems } = problemsStore();

  const [currentProblemId, setCurrentProblemId] = useState<string>(id || "");
  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("javascript");
  const [code, setCode] = useState<string | undefined>(undefined);
  const [output, setOutput] = useState<TExecuteCode | undefined | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  const currentProblem = problems?.find((problem) => problem._id === id);

  useEffect(() => {
    setCode(currentProblem?.starterCode.javascript);
  }, [currentProblem]);

  useEffect(() => {
    if (id && currentProblem) {
      setCurrentProblemId(id);
      setCode(currentProblem.starterCode[selectedLanguage]);
      setOutput(null);
    }
  }, [id, selectedLanguage, currentProblem]);

  if (!id) return null;

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang: Language = e.target.value as Language;
    setSelectedLanguage(newLang);
    setCode(currentProblem?.starterCode[newLang]);
    setOutput(null);
  };
  const handleProblemChange = (newProblemId: string) =>
    navigate(`/problem/${newProblemId}`);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.2, y: 0.6 },
    });
    confetti({
      particleCount: 80,
      spread: 250,
      origin: { x: 0.8, y: 0.6 },
    });
  };

  const checkIfTestsPassed = (
    actualOutput?: string,
    expectedOutput?: string,
  ) => {
    const normalizedActual = normalizeOutput(actualOutput);
    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual === normalizedExpected;
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);

    const result = await executeCode(selectedLanguage, code || "");

    setOutput(result);
    setIsRunning(false);

    if (result.success) {
      const expectedOutput = currentProblem?.expectedOutput[selectedLanguage];

      const testsPassed = checkIfTestsPassed(result.output, expectedOutput);

      if (testsPassed) {
        triggerConfetti();
        toast.success("All tests passed!");
      } else toast.error("Tests failed; check your output!");
    } else {
      toast.error("Code execution failed!");
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={40} minSize={30}>
            <ProblemDescriptionComponent
              problem={currentProblem}
              currentProblemId={currentProblemId}
              onProblemChange={handleProblemChange}
              problems={problems}
            />
          </Panel>

          <PanelResizeHandle className="w-2 bg-secondary/20 hover:bg-primary/40 transition-colors cursor-col-resize" />

          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={70} minSize={30}>
                <CodeEditorPanelComponent
                  selectedLanguage={selectedLanguage}
                  code={code}
                  isRunning={isRunning}
                  onLanguageChange={handleLanguageChange}
                  onCodeChange={setCode}
                  onRunCode={handleRunCode}
                />
              </Panel>

              <PanelResizeHandle className="h-2 bg-secondary/20 hover:bg-primary/40 transition-colors cursor-row-resize" />

              <Panel defaultSize={30} minSize={30}>
                <OutputPanelComponent output={output} />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default ProblemPage;
