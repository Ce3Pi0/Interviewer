import type { TCreateProblem } from "../../types/problems.types";
import RemoveButtonComponent from "./RemoveButtonComponent";

interface Props {
  formData: TCreateProblem;
  setFormData: React.Dispatch<React.SetStateAction<TCreateProblem>>;
}

const DescriptionComponent = ({ formData, setFormData }: Props) => {
  const addNote = () => {
    if (formData.description.notes.length >= 5) return;
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        notes: [...prev.description.notes, ""],
      },
    }));
  };
  const updateNote = (index: number, value: string) =>
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        notes: prev.description.notes.map((n, i) => (i === index ? value : n)),
      },
    }));

  const removeNote = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      description: {
        ...prev.description,
        notes: prev.description.notes.filter((_, i) => i !== index),
      },
    }));

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Description</h2>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Problem text</span>
          </div>
          <textarea
            className="textarea rounded-2xl w-full h-28"
            placeholder="Describe the problem..."
            value={formData.description.text}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: {
                  ...prev.description,
                  text: e.target.value,
                },
              }))
            }
            required
          />
        </label>

        <div className="divider">Notes</div>

        {formData.description.notes.map((note, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              placeholder={`Note ${i + 1}`}
              value={note}
              onChange={(e) => updateNote(i, e.target.value)}
            />
            <RemoveButtonComponent index={i} removeFunction={removeNote} />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline btn-sm w-fit"
          onClick={addNote}
          disabled={formData.description.notes.length >= 5}
        >
          + Add Note
        </button>
      </div>
    </div>
  );
};

export default DescriptionComponent;
