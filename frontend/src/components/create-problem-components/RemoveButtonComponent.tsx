import { XIcon } from "lucide-react";

interface Props {
  index: number;
  removeFunction: (index: number) => void;
}

const RemoveButtonComponent = ({ index, removeFunction }: Props) => {
  return (
    <button
      type="button"
      className="btn btn-ghost btn-square text-error"
      onClick={() => removeFunction(index)}
    >
      <XIcon className="size-5" />
    </button>
  );
};

export default RemoveButtonComponent;
