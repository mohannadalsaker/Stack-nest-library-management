import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuthStore } from "./stores";
import { useEffect } from "react";
import { getLsValue } from "./utils";

const AppRoutes = () => useRoutes(routes);

function App() {
  const { authenticate, unauthenticate } = useAuthStore();
  useEffect(() => {
    const token = getLsValue("token");
    if (token) authenticate();
    else unauthenticate();
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnHover
        theme="light"
      />
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
