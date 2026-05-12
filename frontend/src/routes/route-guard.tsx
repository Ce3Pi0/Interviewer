import { useAuth } from "@clerk/react";
import { Navigate, Outlet, useLocation } from "react-router";
import Logo from "../components/Logo";
import { Spinner } from "../components/Spinner";
import { userStore } from "../hooks/fetchUsers";
import { useEffect } from "react";

interface Props {
  requiredAuth: boolean;
}

const RouteGuard = ({ requiredAuth }: Props) => {
  const location = useLocation();

  const { isSignedIn, isLoaded } = useAuth();
  const { user, loading, fetchUser } = userStore();

  useEffect(() => {
    if (!isLoaded) return;

    if (user || !isSignedIn) return;
    fetchUser();
  }, [fetchUser, isLoaded]);

  if ((loading && !user) || !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <Logo imgClass="size-8" showText={false} />{" "}
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (requiredAuth && !isSignedIn) return <Navigate to="/" />;
  if (!requiredAuth && isSignedIn) return <Navigate to="/dashboard" />;
  if (
    requiredAuth &&
    isSignedIn &&
    !user &&
    location.pathname !== "/select-type"
  )
    return <Navigate to="/select-type" />;
  if (
    requiredAuth &&
    isSignedIn &&
    user &&
    location.pathname === "/select-type"
  )
    return <Navigate to="/dashboard" />;

  return <Outlet />;
};
export default RouteGuard;
