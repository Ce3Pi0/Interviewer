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
    if (user || !isSignedIn) {
      userStore.setState({ loading: false });
      return;
    }
    fetchUser();
  }, [fetchUser, isLoaded, isSignedIn, user]);
  if (loading || !isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-2">
        <Logo imgClass="size-8" showText={false} />{" "}
        <Spinner className="w-8 h-8 text-primary" />
      </div>
    );
  }

  if (requiredAuth && !isSignedIn) return <Navigate to="/" />;
  if (!requiredAuth && isSignedIn && user?.type)
    return <Navigate to="/dashboard" />;

  // Redirect if user with a type tries to access select-type
  if (
    requiredAuth &&
    isSignedIn &&
    user?.type &&
    location.pathname === "/select-type"
  )
    return <Navigate to="/dashboard" />;
  // Redirect if logged in user without a type tries to access any page other than select-type
  if (isSignedIn && !user?.type && user && location.pathname !== "/select-type")
    return <Navigate to="/select-type" />;

  return <Outlet />;
};
export default RouteGuard;
