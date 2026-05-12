import DashboardPage from "../pages/DashboardPage";
import HomePage from "../pages/HomePage";
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
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/problems",
    element: <ProblemsPage />,
  },
];

export const betweenRoutesPath: TRoute[] = [
  {
    path: "/select-type",
    element: <SelectTypePage />,
  },
];
