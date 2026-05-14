import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
} from "lucide-react";
import type { TSession } from "../../types/session.type";
import { Spinner } from "../Spinner";
import { capitalize, getDifficultyBadgeClass } from "../../lib/utils";
import { Link } from "react-router";
import { userStore } from "../../hooks/useUsers";
import { USER_TYPE } from "../../types/user.types";

interface Props {
  sessions: TSession[];
  isLoading: boolean;
  error: Error | null;
  isUserInSession: (session: TSession) => boolean;
}

const ActiveSessionsComponent = ({
  sessions,
  isLoading,
  error,
  isUserInSession,
}: Props) => {
  const { user } = userStore();

  return (
    <div className="lg:col-span-2 card bg-base-100 border-2 border-primary/20 hover:border-primary/30 h-full">
      <div className="card-body">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-linear-to-br from-primary to-secondary rounded-xl">
              <ZapIcon className="size-5" />
            </div>
            <h2 className="text-2xl font-black">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="size-2 bg-success rounded-full" />
            <span className="text-sm font-medium text-success">
              {sessions.length} active{" "}
            </span>
          </div>
        </header>

        <div className="space-y-3 max-h-100 overflow-y-auto pr-2">
          {isLoading ? (
            <Spinner className="size-10" />
          ) : error !== null ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-error/20 rounded-3xl flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-error/50" />
              </div>
              <p className="text-lg font-semibold opacity-70 mb-1">
                Error Fetching Active Sessions
              </p>
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((s) => (
              <div
                key={s._id}
                className="card bg-base-200 border-2 border-base-300 hover:border-primary/50"
              >
                <div className="flex items-center justify-between gap-4 p-5">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="relative size-14 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
                      <Code2Icon className="size-7 text-white" />
                      <div className="absolute -top-1 -right-1 size-4 bg-success rounded-full border-2 border-base-100" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg truncate">
                          {s.problem}
                        </h3>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(s.difficulty)}`}
                        >
                          {capitalize(s.difficulty)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm opacity-80">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-4" />
                          <span className="font-medium">{s.host.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-4" />
                          <span className="text-xs">
                            {s.participant ? "2/2" : "1/2"}
                          </span>
                        </div>
                        {s.participant && !isUserInSession(s) ? (
                          <span className="badge badge-error badge-sm">
                            FULL
                          </span>
                        ) : (
                          <span className="badge badge-success badge-sm">
                            OPEN
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {user?.type === USER_TYPE.INTERVIEWER ? (
                    isUserInSession(s) ? (
                      <Link
                        to={`/sessions/${s._id}`}
                        className="btn btn-primary btn-sm gap-2"
                      >
                        Rejoin
                        <ArrowRightIcon className="size-4" />
                      </Link>
                    ) : null
                  ) : s.participant && !isUserInSession(s) ? (
                    <button className="btn btn-disabled btn-sm" disabled>
                      Full
                    </button>
                  ) : (
                    <Link
                      to={`/sessions/${s._id}`}
                      className="btn btn-primary btn-sm gap-2"
                    >
                      {isUserInSession(s) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-primary/20 to-secondary/20 rounded-3xl flex items-center justify-center">
                <SparklesIcon className="w-10 h-10 text-primary/50" />
              </div>
              <p className="text-lg font-semibold opacity-70 mb-1">
                No active sessions
              </p>
              {user?.type === USER_TYPE.INTERVIEWER ? (
                <p className="text-sm opacity-50">
                  Be the first to create one!
                </p>
              ) : (
                <p className="text-sm opacity-50">
                  Wait for your interviewer to create a session!
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveSessionsComponent;
