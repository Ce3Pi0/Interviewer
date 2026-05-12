import { useAuth } from "@clerk/react";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { setupAuthInterceptor } from "./lib/axios";
function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    setupAuthInterceptor(getToken);
  }, [getToken]);

  return (
    <>
      <AppRoutes />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
