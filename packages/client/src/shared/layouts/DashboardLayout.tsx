import NavBar from "@/features/navbar/features/NavBar";
import { SideBar } from "@/features/sidebar/features";
import { useSideBar } from "@/features/sidebar/hooks/useSideBar";
import { type ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isOpen, toggleSideBar } = useSideBar();

  return (
    <div className="flex items-center h-screen">
      <SideBar isOpen={isOpen} toggleOpen={toggleSideBar} />
      <div className="flex flex-col h-full flex-1 bg-slate-100 overflow-hidden">
        <NavBar toggleSideBarOpen={toggleSideBar} />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
