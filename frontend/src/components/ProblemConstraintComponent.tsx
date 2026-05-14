interface Props {
  constraint: string;
}

const ProblemConstraintComponent = ({ constraint }: Props) => {
  return (
    <li className="flex gap-2 items-center">
      <span className="text-primary">•</span>
      <code className="text-sm">{constraint}</code>
    </li>
  );
};

export default ProblemConstraintComponent;
