import React from "react";
import type { TCreateProblem } from "../../types/problems.types";
import RemoveButtonComponent from "./RemoveButtonComponent";

interface Props {
  formData: TCreateProblem;
  setFormData: React.Dispatch<React.SetStateAction<TCreateProblem>>;
}

const ConstraintsComponent = ({ formData, setFormData }: Props) => {
  const addConstraint = () => {
    if (formData.constraints.length >= 5) return;
    setFormData((prev) => ({
      ...prev,
      constraints: [...prev.constraints, ""],
    }));
  };

  const updateConstraint = (index: number, value: string) =>
    setFormData((prev) => ({
      ...prev,
      constraints: prev.constraints.map((c, i) => (i === index ? value : c)),
    }));

  const removeConstraint = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      constraints: prev.constraints.filter((_, i) => i !== index),
    }));

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Constraints</h2>

        {formData.constraints.map((constraint, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="text"
              className="input input-bordered flex-1"
              placeholder={`Constraint ${i + 1}`}
              value={constraint}
              onChange={(e) => updateConstraint(i, e.target.value)}
            />
            <RemoveButtonComponent
              index={i}
              removeFunction={removeConstraint}
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-outline btn-sm w-fit"
          onClick={addConstraint}
          disabled={formData.constraints.length >= 5}
        >
          + Add Constraint
        </button>
      </div>
    </div>
  );
};

export default ConstraintsComponent;
