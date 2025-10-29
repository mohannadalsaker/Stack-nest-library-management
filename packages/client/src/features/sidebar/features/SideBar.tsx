import * as images from "@/config/imports/images";
import { UserInfo } from "@/features/navbar/components";
import { ChevronLeft } from "lucide-react";
import { SideBarItem } from "../components";
import { useSideBar } from "../hooks/useSideBar";
import { useAuthStore } from "@/stores";

const SideBar = ({
  isOpen,
  toggleOpen,
}: {
  isOpen: boolean;
  toggleOpen: () => void;
}) => {
  const { role } = useAuthStore();
  const { sideBarItems } = useSideBar();
  return (
    <aside className={`flex flex-col gap-3 h-full sm:static fixed z-20`}>
      <div
        className={`bg-secondary-bg h-full flex flex-col gap-2 ${
          isOpen ? "w-[250px]" : "w-0"
        }  transition-all duration-300 overflow-hidden`}
      >
        <header className="flex gap-1 justify-between border-b border-b-secondary-text items-center p-3">
          <div className="flex gap-3 items-center">
            <img
              src={images.LogoFilled}
              alt="logo"
              className={`rounded-lg ${
                isOpen ? "w-8 h-8" : "w-0 h-0"
              } transition-all duration-300`}
            />
            <div className="flex flex-col">
              <h4 className="text-white font-semibold">StackNest</h4>
              <p className="text-secondary-text text-sm">{role}</p>
            </div>
          </div>
          <ChevronLeft
            size={20}
            cursor={"pointer"}
            className="text-secondary-text"
            onClick={() => toggleOpen()}
          />
        </header>
        <div className="flex flex-col grow gap-2 p-3">
          {sideBarItems.map((item) => (
            <SideBarItem key={item.path} {...item} />
          ))}
          <div className="mt-auto md:hidden">
            <UserInfo />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
