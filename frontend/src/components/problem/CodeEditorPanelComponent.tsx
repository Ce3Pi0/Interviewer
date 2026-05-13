import Editor from "@monaco-editor/react";
import { PlayIcon } from "lucide-react";
import type { Language } from "../../types/problems.types";
import { LANGUAGE_CONFIG } from "../../lib/utils";
import { Spinner } from "../Spinner";

interface Props {
  selectedLanguage: Language;
  code?: string;
  isRunning: boolean;
  onLanguageChange: (
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => void;
  onCodeChange: (code: string | undefined) => void;
  onRunCode: () => void;
}

function CodeEditorPanelComponent({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}: Props) {
  return (
    <div className="h-full bg-base-300 flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
        <div className="flex items-center gap-3">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-6"
          />
          <select
            className="select select-sm"
            value={selectedLanguage}
            onChange={onLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <button
          className="btn btn-primary btn-sm gap-2"
          disabled={isRunning}
          onClick={onRunCode}
        >
          {isRunning ? (
            <>
              <Spinner /> Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-4" /> Run Code
            </>
          )}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height={"100%"}
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 16,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanelComponent;
