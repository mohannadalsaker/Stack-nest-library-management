import { useState } from "react";
import type { SideBarItem } from "../types";
import { Book, Box, House, User } from "lucide-react";
import { useAuthStore } from "@/stores";
import { UserRoles } from "@/shared/types";

export const useSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { role } = useAuthStore();

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
    ...(role === UserRoles.admin
      ? [
          {
            title: "Users",
            path: "/users",
            icon: User,
          },
        ]
      : []),
  ];

  return { isOpen, sideBarItems, toggleSideBar };
};
