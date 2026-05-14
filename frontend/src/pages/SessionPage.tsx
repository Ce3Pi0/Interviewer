import { useUser } from "@clerk/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSession";
import { problemsStore } from "../hooks/useProblems";
import type { Language } from "../types/problems.types";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Spinner } from "../components/Spinner";
import {
  capitalize,
  getDifficultyBadgeClass,
  handleLanguageChange,
  handleRunCode,
} from "../lib/utils";
import { LogOutIcon, PhoneOffIcon } from "lucide-react";
import ProblemExampleComponent from "../components/ProblemExampleComponent";
import ProblemConstraintComponent from "../components/ProblemConstraintComponent";
import CodeEditorPanelComponent from "../components/problem/CodeEditorPanelComponent";
import type { TExecuteCode } from "../types/executeCode.types";
import OutputPanelComponent from "../components/problem/OutputPanelComponent";
import useStreamClient from "../hooks/useStreamClient";
import VideoCallUIComponent from "../components/VideoCallUIComponent";

const SessionPage = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      navigate("/dashboard");
    }
  }, [id, navigate]);

  const { user } = useUser();

  const { problems, fetchProblems, problemsLoading } = problemsStore();

  const [output, setOutput] = useState<TExecuteCode | null | undefined>(null);
  const [isRunning, setIsRunning] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id || "");

  const joinSessionMutation = useJoinSession(id || "");
  const endSessionMutation = useEndSession(id || "");

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const problemData = session?.problem
    ? problems?.find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] =
    useState<Language>("javascript");
  const [code, setCode] = useState(problemData?.starterCode.javascript);

  const { streamClient, call, chatClient, channel, isInitializingCall } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  //   Auto-join session
  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isParticipant || isHost) return;

    joinSessionMutation.mutate(undefined, {
      onSuccess: () => refetch(),
    });
  }, [user, session, loadingSession, isParticipant, isHost]);

  useEffect(() => {
    if (!problems) fetchProblems();
  }, [problems, fetchProblems]);

  //   Redirect participant on session end
  useEffect(() => {
    if (!session || loadingSession) return;

    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  // Update code when problem loads or changes
  useEffect(() => {
    if (problemData?.starterCode[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleEndSession = () => {
    if (
      confirm(
        "Are you sure you want to end this session? All participants will be notified",
      )
    ) {
      endSessionMutation.mutate(undefined, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen w-full bg-base-100 flex flex-col">
      <Navbar />
      <div className="flex-1">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-base-200">
                  <header className="p-6 bg-base-100 border-b border-base-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-3xl font-bold text-base-content">
                          {session?.problem || <Spinner />}
                        </h1>
                        {problemData?.category && (
                          <p className="text-base-content/60 mt-1">
                            {problemData.category}
                          </p>
                        )}
                        <p className="text-base-content/60 mt-2">
                          Host: {session?.host.name || <Spinner />} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={`badge badge-lg ${getDifficultyBadgeClass(session?.difficulty || "")}`}
                        >
                          {capitalize(session?.difficulty || "")}
                        </span>
                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="btn btn-error btn-sm gap-2"
                          >
                            {endSessionMutation.isPending ? (
                              <Spinner />
                            ) : (
                              <LogOutIcon className="w-4 h-4" />
                            )}
                            End Session
                          </button>
                        )}

                        {session?.status === "completed" && (
                          <span className="badge badge-ghost badge-lg">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </header>

                  <div className="p-6 space-y-6">
                    {problemData?.description && (
                      <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                        <h2 className="text-xl font-bold mb-4 text-base-content">
                          Description
                        </h2>
                        <div className="space-y-3 text-base leading-relaxed">
                          <p className="text-base-content/90">
                            {problemData.description.text}
                          </p>
                          {problemData.description.notes.map((note, index) => (
                            <p key={index} className="text-base-content/90">
                              {note}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {problemData?.examples &&
                      problemData.examples.length > 0 && (
                        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                          <h2 className="text-xl font-bold mb-4 text-base-content">
                            Examples
                          </h2>

                          <div className="space-y-4">
                            {problemData.examples.map((example, index) => (
                              <ProblemExampleComponent
                                key={index}
                                example={example}
                                index={index}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    {problemData?.constraints &&
                      problemData.constraints.length > 0 && (
                        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
                          <h2 className="text-xl font-bold mb-4 text-base-content">
                            Constraints
                          </h2>
                          <ul className="space-y-2 text-base-content/90">
                            {problemData.constraints.map(
                              (constraint, index) => (
                                <ProblemConstraintComponent
                                  key={index}
                                  constraint={constraint}
                                />
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              </Panel>
              <PanelResizeHandle className="h-2 bg-secondary/20 hover:bg-primary/40 transition-colors cursor-row-resize" />
              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanelComponent
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={(e) =>
                        handleLanguageChange(
                          e,
                          problemData,
                          setSelectedLanguage,
                          setCode,
                          setOutput,
                        )
                      }
                      onCodeChange={setCode}
                      onRunCode={() =>
                        handleRunCode(
                          setIsRunning,
                          setOutput,
                          selectedLanguage,
                          code,
                          problemData || undefined,
                        )
                      }
                    />
                  </Panel>
                  <PanelResizeHandle className="h-2 bg-secondary/20 hover:bg-primary/40 transition-colors cursor-row-resize" />
                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanelComponent output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>
            </PanelGroup>
          </Panel>
          <PanelResizeHandle className="w-2 bg-secondary/20 hover:bg-primary/40 transition-colors cursor-col-resize" />
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-base-200 p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="flex flex-col items-center text-center">
                    <Spinner className="size-12" />
                    <p className="text-lg">Connecting to video call...</p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="card bg-base-100 shadow-xl max-w-md">
                    <div className="card-body items-center text-center">
                      <div className="w-24 h-24 bg-error/10 rounded-full flex items-center justify-center mb-4">
                        <PhoneOffIcon className="w-12 h-12 text-error" />
                      </div>
                      <h2 className="card-title text-2xl">Connection Failed</h2>
                      <p className="text-base-content/70">
                        Unable to connect to the video call
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUIComponent
                        chatClient={chatClient}
                        channel={channel}
                      />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};

export default SessionPage;
