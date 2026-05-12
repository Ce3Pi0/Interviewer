export const getDifficultyBadgeClass = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "badge-success";
    case "medium":
      return "badge-warning";
    case "hard":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

export const getUserTypeBadgeClass = (type: string) => {
  switch (type.toLowerCase()) {
    case "interviewer":
      return "from-info";
    case "interviewee":
      return "from-warning";
    default:
      return "from-primary";
  }
};
