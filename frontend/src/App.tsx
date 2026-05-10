import AppRoutes from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster position="bottom-right" />
    </>
  );
}

export default App;
