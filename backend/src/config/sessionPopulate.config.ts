export const ACTIVE_SESSION_POPULATE = [
  { path: "host", select: "name email profileImage" },
  { path: "participant", select: "name email profileImage" },
];
