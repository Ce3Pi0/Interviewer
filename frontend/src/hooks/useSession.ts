import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionApi } from "../api/session";

export const useCreateSession = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createSession"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
      toast.success("Session created successfully");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
    },
    onError: (err) => toast.error(err.message || "Failed to create session"),
  });
};
export const useActiveSessions = () => {
  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
  });
};
export const useMyRecentSessions = () => {
  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
  });
};
export const useSessionById = (id: string) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
    refetchInterval: 5000,
  });
};

export const useJoinSession = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["joinSession"],
    mutationFn: () => sessionApi.joinSession(id),
    onSuccess: () => {
      toast.success("Joined session successfully");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
    },
    onError: (err) => toast.error(err.message || "Failed to join session"),
  });
};

export const useEndSession = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["endSession"],
    mutationFn: () => sessionApi.endSession(id),
    onSuccess: () => {
      toast.success("Ended session successfully");
      queryClient.invalidateQueries({ queryKey: ["activeSessions"] });
      queryClient.invalidateQueries({ queryKey: ["myRecentSessions"] });
    },
    onError: (err) => toast.error(err.message || "Failed to end session"),
  });
};
