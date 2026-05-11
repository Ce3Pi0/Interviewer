import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
import ProblemsPage from "../pages/ProblemsPage";
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
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/problems",
    element: <ProblemsPage />,
  },
];
