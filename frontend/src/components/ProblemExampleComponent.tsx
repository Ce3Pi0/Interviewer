import type { Example } from "../types/problems.types";

interface Props {
  index: number;
  example: Example;
}

const ProblemExampleComponent = ({ index, example }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-sm">{index + 1}</span>
        <p className="font-semibold text-base-content">Example {index + 1}</p>
      </div>
      <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
        <div className="flex gap-2">
          <span className="text-primary font-bold min-w-17.5">Input:</span>
          <span>{example.input}</span>
        </div>

        <div className="flex gap-2">
          <span className="text-secondary font-bold min-w-17.5">Output:</span>
          <span>{example.output}</span>
        </div>
        {example.explanation && (
          <div className="pt-2 border-t border-base-300 mt-2">
            <span className="text-base-content/60 font-sans text-xs">
              <span className="font-semibold">Explanation</span>{" "}
              {example.explanation}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemExampleComponent;
