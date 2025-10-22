import { UserInfo } from "../components";
import { List } from "lucide-react";

const NavBar = ({ toggleSideBarOpen }: { toggleSideBarOpen: () => void }) => {
  return (
    <nav className="flex justify-between p-2 items-center shadow-lg">
      <div className="flex gap-2 items-center">
        <List size={25} cursor={"pointer"} onClick={toggleSideBarOpen} />
        {/* <div className="flex gap-3 items-center">
          <img src={images.Logo} alt="" className="w-10 h-10" />
          <h3 className="text-primary-text font-semibold">Admin Dashboard</h3>
        </div> */}
      </div>
      <div className="md:block hidden">
        <UserInfo />
      </div>
    </nav>
  );
};

export default NavBar;
