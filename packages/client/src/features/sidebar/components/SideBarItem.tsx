import type { IconType } from "@/shared/types";
import { NavLink } from "react-router-dom";

interface SideBarItemProps {
  title: string;
  icon: IconType;
  path: string;
}

const SideBarItem = ({ title, icon: Icon, path }: SideBarItemProps) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `flex items-center gap-2 p-2 rounded-lg text-secondary-text ${
          isActive ? "text-white bg-primary-gradient" : ""
        }`
      }
    >
      <Icon size={20} />
      <h4>{title}</h4>
    </NavLink>
  );
};

export default SideBarItem;
