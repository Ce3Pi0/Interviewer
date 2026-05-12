import {
  LANG_LABELS,
  LANGUAGES,
  type Language,
  type TCreateProblem,
} from "../../types/problems.types";

interface Props {
  formData: TCreateProblem;
  setFormData: React.Dispatch<React.SetStateAction<TCreateProblem>>;
  outputTab: Language;
  setOutputTab: React.Dispatch<React.SetStateAction<Language>>;
}

const ExpectedOutputComponent = ({
  formData,
  setFormData,
  outputTab,
  setOutputTab,
}: Props) => {
  const updateOutput = (lang: Language, value: string) =>
    setFormData((prev) => ({
      ...prev,
      expectedOutput: { ...prev.expectedOutput, [lang]: value },
    }));
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Expected Output</h2>

        <div role="tablist" className="tabs tabs-bordered">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              role="tab"
              type="button"
              className={`tab ${outputTab === lang ? "tab-active" : ""}`}
              onClick={() => setOutputTab(lang)}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
        <textarea
          className="textarea rounded-2xl w-full font-mono h-32"
          placeholder={`${LANG_LABELS[outputTab]} expected output...`}
          value={formData.expectedOutput[outputTab]}
          onChange={(e) => updateOutput(outputTab, e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default ExpectedOutputComponent;
