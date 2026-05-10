import { useAuth } from "@clerk/react";
import { Navigate, Outlet } from "react-router";

interface Props {
  requiredAuth: boolean;
}

const RouteGuard = ({ requiredAuth }: Props) => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  if (requiredAuth && !isSignedIn) return <Navigate to="/" />;

  return <Outlet />;
};
export default RouteGuard;
