interface Props {
  stat: string;
  title: string;
}

const StatComponent = ({ stat, title }: Props) => {
  return (
    <div className="stat">
      <div className="stat-value text-primary">{stat}</div>
      <div className="stat-title">{title}</div>
    </div>
  );
};

export default StatComponent;
