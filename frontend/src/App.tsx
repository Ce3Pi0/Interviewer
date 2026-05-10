import { useUser } from "@clerk/react";
import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <AppRoutes />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
