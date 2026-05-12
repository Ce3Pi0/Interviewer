import StatComponent from "./StatComponent";

//TODO: Fetch real data and change uptime to problem count

const StatsComponent = () => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
      <StatComponent stat="10K+" title="Active Users" />
      <StatComponent stat="50K+" title="Sessions" />
      <StatComponent stat="5" title="Problems" />
    </div>
  );
};

export default StatsComponent;
