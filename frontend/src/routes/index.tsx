import { Route, Routes } from "react-router";
import RouteGuard from "./route-guard";
import { authRoutesPath, protectedRoutesPath } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<RouteGuard requiredAuth={false} />}>
        {authRoutesPath?.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      <Route path="/" element={<RouteGuard requiredAuth={true} />}>
        {protectedRoutesPath?.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
