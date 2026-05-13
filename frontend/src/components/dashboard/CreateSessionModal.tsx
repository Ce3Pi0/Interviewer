import { useEffect } from "react";
import { problemsStore } from "../../hooks/useProblems";
import type { TSendSession } from "../../types/session.type";
import { Spinner } from "../Spinner";
import { capitalize, getDifficultyTextColor } from "../../lib/utils";
import { Code2Icon, PlusIcon } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  roomConfig: TSendSession | undefined;
  setRoomConfig: React.Dispatch<React.SetStateAction<TSendSession | undefined>>;
  onCreateRoom: () => void;
  isCreating: boolean;
}

const CreateSessionModal = ({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}: Props) => {
  const { fetchProblems, problems, problemsLoading } = problemsStore();

  useEffect(() => {
    if (!problems) fetchProblems();
  }, [problems, fetchProblems]);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <h3 className="font-bold text-2xl mb-6">Create a New Session</h3>
        <div className="space-y-8">
          <div className="space-y-2">
            <label className="label">
              <span className="label-text font-semibold">Select a Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full"
              value={roomConfig?.problem}
              onChange={(e) => {
                const selectedProblem = problems?.find(
                  (p) => p.title === e.target.value,
                );

                if (!selectedProblem) return;

                setRoomConfig({
                  problem: selectedProblem?.title,
                  difficulty: selectedProblem?.difficulty,
                });
              }}
              defaultValue={""}
            >
              <option value="" disabled>
                {problemsLoading
                  ? "Loading problems..."
                  : "Choose a coding problem..."}
              </option>

              {problems?.map((problem) => (
                <option
                  key={problem._id}
                  value={problem.title}
                  className={getDifficultyTextColor(problem.difficulty)}
                >
                  {problem.title} ({capitalize(problem.difficulty)})
                </option>
              ))}
            </select>
          </div>

          {roomConfig?.problem && (
            <div className="alert alert-success">
              <Code2Icon className="size-5" />
              <div>
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem:{" "}
                  <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants:{" "}
                  <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig?.problem}
          >
            {isCreating ? <Spinner /> : <PlusIcon className="size-5" />}
            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
};

export default CreateSessionModal;
