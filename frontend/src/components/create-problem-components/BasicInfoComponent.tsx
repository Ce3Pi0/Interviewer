import { getDifficultyTextColor, updateField } from "../../lib/utils";
import type { TCreateProblem, TDifficulty } from "../../types/problems.types";

interface Props {
  formData: TCreateProblem;
  setFormData: React.Dispatch<React.SetStateAction<TCreateProblem>>;
}

const BasicInfoComponent = ({ formData, setFormData }: Props) => {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Basic Info</h2>

        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="e.g. Two Sum"
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value, setFormData)}
            required
          />
        </label>

        <div className="flex gap-4">
          <label className="form-control flex-1">
            <div className="label">
              <span className="label-text">Difficulty</span>
            </div>
            <select
              className={`select select-bordered w-full ${getDifficultyTextColor(formData.difficulty)}`}
              value={formData.difficulty}
              onChange={(e) =>
                updateField(
                  "difficulty",
                  e.target.value as TDifficulty,
                  setFormData,
                )
              }
            >
              <option
                className={`${getDifficultyTextColor("easy")} mb-2`}
                value="easy"
              >
                Easy
              </option>
              <option
                className={`${getDifficultyTextColor("medium")} mb-2`}
                value="medium"
              >
                Medium
              </option>
              <option
                className={`${getDifficultyTextColor("hard")} mb-2`}
                value="hard"
              >
                Hard
              </option>
            </select>
          </label>

          <label className="form-control flex-1">
            <div className="label">
              <span className="label-text">Category</span>
            </div>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="e.g. Array • Hash Table"
              value={formData.category}
              onChange={(e) =>
                updateField("category", e.target.value, setFormData)
              }
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default BasicInfoComponent;
