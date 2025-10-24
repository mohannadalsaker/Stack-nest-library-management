import { useState } from "react";
import type { SideBarItem } from "../types";
import { Box, House, User } from "lucide-react";

export const useSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSideBar = () => {
    setIsOpen((prev) => !prev);
  };

  const sideBarItems: SideBarItem[] = [
    {
      title: "Dashboard",
      path: "/",
      icon: House,
    },
    {
      title: "Categories",
      path: "/categories",
      icon: Box,
    },
    {
      title: "Sub Categories",
      path: "/subCategories",
      icon: Box,
    },
    {
      title: "Users",
      path: "/users",
      icon: User,
    },
  ];

  return { isOpen, sideBarItems, toggleSideBar };
};
