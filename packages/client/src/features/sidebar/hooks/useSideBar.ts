import { useState } from "react";
import type { SideBarItem } from "../types";
import { Book, Box, House, User } from "lucide-react";

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
      title: "Books",
      path: "/books",
      icon: Book,
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
