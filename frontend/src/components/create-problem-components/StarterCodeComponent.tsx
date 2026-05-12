import React from "react";
import {
  LANG_LABELS,
  LANGUAGES,
  type Language,
  type TCreateProblem,
} from "../../types/problems.types";

interface Props {
  formData: TCreateProblem;
  setFormData: React.Dispatch<React.SetStateAction<TCreateProblem>>;
  codeTab: Language;
  setCodeTab: React.Dispatch<React.SetStateAction<Language>>;
}

const StarterCodeComponent = ({
  formData,
  setFormData,
  codeTab,
  setCodeTab,
}: Props) => {
  const updateCode = (lang: Language, value: string) =>
    setFormData((prev) => ({
      ...prev,
      starterCode: { ...prev.starterCode, [lang]: value },
    }));

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Starter Code</h2>

        <div role="tablist" className="tabs tabs-bordered">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              role="tab"
              type="button"
              className={`tab ${codeTab === lang ? "tab-active" : ""}`}
              onClick={() => setCodeTab(lang)}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
        <textarea
          className="textarea rounded-2xl w-full font-mono h-64"
          placeholder={`${LANG_LABELS[codeTab]} starter code...`}
          value={formData.starterCode[codeTab]}
          onChange={(e) => updateCode(codeTab, e.target.value)}
          required
        />
      </div>
    </div>
  );
};

export default StarterCodeComponent;
