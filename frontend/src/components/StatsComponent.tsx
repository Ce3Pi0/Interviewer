import StatComponent from "./StatComponent";

const StatsComponent = () => {
  return (
    <div className="stats stats-vertical lg:stats-horizontal bg-base-100 shadow-lg">
      <StatComponent stat="10K+" title="Active Users" />
      <StatComponent stat="50K+" title="Sessions" />
      <StatComponent stat="99.9%" title="Uptime" />
    </div>
  );
};

export default StatsComponent;
