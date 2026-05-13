import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useUser } from "@clerk/react";
import { useState } from "react";
import type { TSendSession, TSession } from "../types/session.type";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSession";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import toast from "react-hot-toast";
import StatsCardComponent from "../components/dashboard/StatsCardComponent";
import ActiveSessionsComponent from "../components/dashboard/ActiveSessionsComponent";
import RecentSessionsComponent from "../components/dashboard/RecentSessionsComponent";
import CreateSessionModal from "../components/dashboard/CreateSessionModal";

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState<TSendSession>();

  const createSessionMutation = useCreateSession();
  const {
    data: activeSessionsData,
    isLoading: loadingActiveSessions,
    error: activeSessionsError,
  } = useActiveSessions();
  const {
    data: recentSessionsData,
    isLoading: loadingRecentSessions,
    error: recentSessionsError,
  } = useMyRecentSessions();

  const handleCreateRoom = () => {
    if (!roomConfig) {
      toast.error("Session details not provided");
      return;
    }

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty,
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          navigate(`/session/${data?.session._id}`);
        },
      },
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session: TSession) => {
    if (!user?.id) return false;

    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };
  return (
    <>
      <div className="min-h-screen bg-base-300">
        <Navbar />
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />
        <div className="container mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsCardComponent
              activeSessionsCount={activeSessions.length}
              recentSessionsCount={recentSessions.length}
            />
            <ActiveSessionsComponent
              sessions={activeSessions}
              isLoading={loadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>

          <RecentSessionsComponent
            sessions={recentSessions}
            isLoading={loadingRecentSessions}
          />
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
};

export default DashboardPage;
