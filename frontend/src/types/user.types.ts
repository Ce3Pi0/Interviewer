export type TUserTypes = "interviewer" | "interviewee" | undefined;

export type TUser = {
  name: string;
  email: string;
  profileImage: string;
  clerkId: string;
  type: TUserTypes;
};

export const USER_TYPE = {
  INTERVIEWER: "interviewer",
  INTERVIEWEE: "interviewee",
} as const;
