import { DashboardLayout } from "@/shared/layouts";
import { getLsValue } from "@/utils";
import { Navigate, Outlet } from "react-router-dom";

function RootLayout() {
  const token = getLsValue("token");
  return token ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <Navigate to="/auth/login" />
  );
}

export default RootLayout;
