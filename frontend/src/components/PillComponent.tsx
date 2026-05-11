import { CheckIcon } from "lucide-react";

interface Props {
  text: string;
}

const PillComponent = ({ text }: Props) => {
  return (
    <div className="badge badge-lg badge-outline">
      <CheckIcon className="size-4 text-success" />
      {text}
    </div>
  );
};

export default PillComponent;
