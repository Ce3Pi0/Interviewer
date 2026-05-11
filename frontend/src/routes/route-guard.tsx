import { useAuth } from "@clerk/react";
import { Navigate, Outlet } from "react-router";

interface Props {
  requiredAuth: boolean;
}

const RouteGuard = ({ requiredAuth }: Props) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (requiredAuth && !isSignedIn) return <Navigate to="/" />;
  if (!requiredAuth && isSignedIn) return <Navigate to="/dashboard" />;

  return <Outlet />;
};
export default RouteGuard;
