import type { TExecuteCode } from "../../types/executeCode.types";

interface Props {
  output?: TExecuteCode | null;
}

const OutputPanelComponent = ({ output }: Props) => {
  return (
    <div className="h-full bg-base-100 flex flex-col">
      <div className="px-4 py-2 bg-base-border-200 border-b border-base-300 font-semibold text-sm">
        Output
      </div>
      <div className="flex-1 overflow-auto p-4">
        {output === null ? (
          <p>Click "Run Code" to see the output here...</p>
        ) : output?.success ? (
          <pre className="text-sm font-mono text-success whitespace-pre-wrap">
            {output.output}
          </pre>
        ) : (
          <div>
            {output?.output && (
              <>
                <pre className="text-sm font-mono text-base-content whitespace-pre-wrap mb-2">
                  {output.output}
                </pre>
                <pre className="text-sm font-mono text-error whitespace-pre-wrap">
                  {output?.error}
                </pre>
              </>
            )}
            {!output?.output && !output?.error && (
              <p className="text-error">
                An error occurred but no details were provided.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutputPanelComponent;
