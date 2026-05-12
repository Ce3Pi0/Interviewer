import StatComponent from "./StatComponent";

const StatsComponent = () => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
      <StatComponent stat="users" title="Total Users" />
      <StatComponent stat="sessions" title="Total Sessions" />
      <StatComponent stat="problems" title="Total Problems" />
    </div>
  );
};

export default StatsComponent;
