import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import { IoMdBookmark } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { useState } from "react";
import { useRouter } from "next/router";

const AppNav = () => {
  const router = useRouter();
  const page = router.pathname;
  const [activeTab, setActiveTab] = useState(page);

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
    router.push(tabName);
  };
  return (
    <IconContext.Provider value={{ className: "app-nav-icons" }}>
      <nav className="fixed bottom-0 flex w-full items-center justify-between bg-white pt-[2rem] shadow-md">
        <div className="relative ">
          <div
            onClick={() => handleTabClick("/")}
            className="mb-[1.6rem] rounded-[8px]  py-[1.091rem]  px-[5.0rem]  "
          >
            <AiFillHome
              className={`${
                activeTab === "/" ? "text-[#2F80ED]" : "text-[#828282]"
              }`}
            />
          </div>

          <div
            className={`${
              activeTab === "/" ? "scale-x-100" : "scale-x-0"
            } absolute  left-1/2 bottom-0 h-[.3rem] w-[8rem]  -translate-x-1/2 transform rounded-t-[8px] bg-[#2F80ED]  transition-transform duration-200`}
          ></div>
        </div>
        <div className="relative ">
          <div
            onClick={() => handleTabClick("/explore")}
            className="mb-[1.6rem] rounded-[8px]  py-[1.091rem]  px-[5.0rem]  "
          >
            <MdExplore
              className={`${
                activeTab === "/explore" ? "text-[#2F80ED]" : "text-[#828282]"
              }`}
            />
          </div>
          <div
            className={`${
              activeTab === "/explore" ? "scale-x-100" : "scale-x-0"
            } absolute  left-1/2 bottom-0 h-[.3rem] w-[8rem]  -translate-x-1/2 transform rounded-t-[8px] bg-[#2F80ED]  transition-transform duration-200`}
          ></div>
        </div>
        <div className="relative ">
          <div
            onClick={() => handleTabClick("/bookmarks")}
            className="mb-[1.6rem] rounded-[8px]  py-[1.091rem]  px-[5.0rem]  "
          >
            <IoMdBookmark
              className={`${
                activeTab === "/bookmarks" ? "text-[#2F80ED]" : "text-[#828282]"
              }`}
            />
          </div>
          <div
            className={`  ${
              activeTab === "/bookmarks" ? "scale-x-100" : "scale-x-0"
            } absolute  left-1/2 bottom-0 h-[.3rem] w-[8rem]  -translate-x-1/2 transform rounded-t-[8px] bg-[#2F80ED]  transition-transform duration-200`}
          ></div>
        </div>{" "}
      </nav>
    </IconContext.Provider>
  );
};

export default AppNav;
