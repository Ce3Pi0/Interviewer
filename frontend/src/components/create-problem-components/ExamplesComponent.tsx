import type { TCreateProblem } from "../../types/problems.types";
import RemoveButtonComponent from "./RemoveButtonComponent";

interface Props {
  formData: TCreateProblem;
  setFormData: React.Dispatch<React.SetStateAction<TCreateProblem>>;
}

const ExamplesComponent = ({ formData, setFormData }: Props) => {
  const addExample = () => {
    if (formData.examples.length >= 5) return;
    setFormData((prev) => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }],
    }));
  };

  const updateExample = (index: number, field: string, value: string) =>
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.map((ex, i) =>
        i === index ? { ...ex, [field]: value } : ex,
      ),
    }));

  const removeExample = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index),
    }));

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Examples</h2>

        {formData.examples.length === 0 && (
          <p className="text-base-content/50 text-sm">No examples added yet</p>
        )}

        {formData.examples.map((example, i) => (
          <div
            key={i}
            className="border border-base-300 rounded-box p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm">Example {i + 1}</span>
              <RemoveButtonComponent index={i} removeFunction={removeExample} />
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Input"
              value={example.input}
              onChange={(e) => updateExample(i, "input", e.target.value)}
            />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Output"
              value={example.output}
              onChange={(e) => updateExample(i, "output", e.target.value)}
            />
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Explanation (optional)"
              value={example.explanation || ""}
              onChange={(e) => updateExample(i, "explanation", e.target.value)}
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline btn-sm w-fit"
          onClick={addExample}
          disabled={formData.examples.length >= 5}
        >
          + Add Example
        </button>
      </div>
    </div>
  );
};

export default ExamplesComponent;
