import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import { IoMdBookmark } from "react-icons/io";
import { MdExplore } from "react-icons/md";

const AppNav = () => {
  return (
    // Checkout little blue styling for active link
    <IconContext.Provider value={{ className: "app-nav-icons" }}>
      <nav className="fixed bottom-0 flex w-full items-center justify-between bg-white py-[1.390rem] pt-[1.324rem] shadow-md">
        <div className="rounded-[8px] py-[1.091rem] px-[5.0rem]  hover:bg-[#f2f2f2]">
          <AiFillHome />
        </div>
        <div className=" rounded-[8px] py-[1.091rem] px-[5.0rem]  hover:bg-[#f2f2f2]">
          <MdExplore />
        </div>
        <div className="rounded-[8px] py-[1.091rem] px-[5.0rem]  hover:bg-[#f2f2f2]">
          <IoMdBookmark />
        </div>
      </nav>
    </IconContext.Provider>
  );
};

export default AppNav;
