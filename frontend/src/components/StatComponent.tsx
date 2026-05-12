import { useEffect } from "react";
import { statsStore } from "../hooks/fetchStats";
import { getCorrectStatData, getCorrectStatLoading } from "../lib/utils";
import { Spinner } from "./Spinner";

interface Props {
  stat: "users" | "sessions" | "problems";
  title: string;
}

const StatComponent = ({ stat, title }: Props) => {
  const {
    fetchProblemsCount,
    fetchSessionsCount,
    fetchUsersCount,
    usersCount,
    sessionsCount,
    problemsCount,
    usersCountLoading,
    sessionsCountLoading,
    problemsCountLoading,
  } = statsStore();

  useEffect(() => {
    if (stat === "users") {
      fetchUsersCount();
    } else if (stat === "problems") {
      fetchProblemsCount();
    } else if (stat === "sessions") {
      fetchSessionsCount();
    }
  }, [fetchUsersCount, fetchProblemsCount, fetchSessionsCount, stat]);

  const count = getCorrectStatData(
    stat,
    usersCount,
    sessionsCount,
    problemsCount,
  );

  const loading = getCorrectStatLoading(
    stat,
    usersCountLoading,
    sessionsCountLoading,
    problemsCountLoading,
  );

  return (
    <div className="stat">
      <div className="stat-value text-primary">
        {!count && loading && <Spinner />}
        {count}
      </div>
      <div className="stat-title">{title}</div>
    </div>
  );
};

export default StatComponent;
