import { ChevronDown, ChevronUp, User } from "lucide-react";
import { useNavbar } from "../hooks";
import { Loader } from "@/shared/ui";

const UserInfo = () => {
  const { isOpen, menuRef, toggleMenu, logout, profile, isLoading } =
    useNavbar();

  return (
    <div className="flex gap-4 relative items-center" ref={menuRef}>
      <span className="p-2 bg-primary-gradient rounded-full">
        <User size={20} color="white" />
      </span>
      <div className="flex flex-col">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h4 className="text-primary-text font-semibold">
              {profile?.username}
            </h4>
            <h6 className="text-sm text-secondary-text">{profile?.email}</h6>
          </>
        )}
      </div>
      <ChevronDown
        size={20}
        className="cursor-pointer md:block hidden"
        onClick={toggleMenu}
      />
      <ChevronUp
        size={20}
        className="cursor-pointer block md:hidden text-white"
        onClick={toggleMenu}
      />
      <ul
        className={`bg-white p-2 rounded-lg absolute z-10 md:top-full bottom-full right-0 md:mt-2 h-fit shadow-md ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <li className="hover-primary-gradient rounded-md transition-colors duration-200">
          <button
            className="w-full text-left px-3 py-2 font-semibold outline-none border-none cursor-pointer text-base hover:text-white"
            onClick={logout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UserInfo;
