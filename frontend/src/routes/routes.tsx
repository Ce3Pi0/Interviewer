import CreateNewProblemPage from "../pages/CreateNewProblemPage";
import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import ProblemPage from "../pages/ProblemPage";
import ProblemsPage from "../pages/ProblemsPage";
import SelectTypePage from "../pages/SelectTypePage";
import type { TRoute } from "../types/routes.types";

export const authRoutesPath: TRoute[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
];
export const protectedRoutesPath: TRoute[] = [
  {
    path: "/select-type",
    element: <SelectTypePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/problems",
    element: <ProblemsPage />,
  },
  {
    path: "/problems/new",
    element: <CreateNewProblemPage />,
  },
  {
    path: "/problem/:id",
    element: <ProblemPage />,
  },
];
