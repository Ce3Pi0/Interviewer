export const ACTIVE_SESSION_POPULATE = [
  { path: "host", select: "name clerkId email profileImage" },
  { path: "participant", select: "name clerkId email profileImage" },
];
