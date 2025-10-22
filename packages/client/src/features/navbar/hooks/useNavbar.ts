import { useAuthStore } from "@/stores";
import { removeLsValue } from "@/utils";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProfile } from "../api/useGetProfile";

export const useNavbar = () => {
  const { unauthenticate } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  const {
    query: { data, isLoading },
  } = useGetProfile();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const logout = () => {
    unauthenticate();
    removeLsValue("token");
    navigate("/auth/login");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return {
    isOpen,
    menuRef,
    toggleMenu,
    logout,
    isLoading,
    profile: data,
  };
};
