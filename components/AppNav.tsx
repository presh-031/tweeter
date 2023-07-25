import { AiFillHome } from "react-icons/ai";
import { IconContext } from "react-icons";
import { IoMdBookmark } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { useState } from "react";

const AppNav = () => {
  const [activeTab, setActiveTab] = useState("tweets");

  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };
  return (
    // Checkout little blue styling for active link
    <IconContext.Provider value={{ className: "app-nav-icons" }}>
      <nav className="fixed bottom-0 flex w-full items-center justify-between bg-white pt-[2rem]  shadow-md">
        <div>
          <div
            onClick={() => handleTabClick("tweets")}
            className="mb-[1.6rem] rounded-[8px]  py-[1.091rem]  px-[5.0rem] hover:bg-[#f2f2f2] "
          >
            <AiFillHome
              className={`${
                activeTab === "tweets" ? "text-[#2F80ED]" : "text-[#828282]"
              }`}
            />
          </div>

          <div
            className={`${
              activeTab === "tweets" ? "bg-[#2F80ED]" : "bg-transparent"
            } mx-auto h-[.3rem] w-[8rem] rounded-t-[8px] bg-[#2F80ED]`}
          ></div>
        </div>
        <div>
          <div
            onClick={() => handleTabClick("explore")}
            className="mb-[1.6rem] rounded-[8px]  py-[1.091rem]  px-[5.0rem] hover:bg-[#f2f2f2] "
          >
            <MdExplore
              className={`${
                activeTab === "explore" ? "text-[#2F80ED]" : "text-[#828282]"
              }`}
            />
          </div>
          <div
            className={`${
              activeTab === "explore" ? "bg-[#2F80ED]" : "bg-transparent"
            } mx-auto h-[.3rem] w-[8rem] rounded-t-[8px] bg-[#2F80ED]`}
          ></div>
        </div>
        <div>
          <div
            onClick={() => handleTabClick("bookmarks")}
            className="mb-[1.6rem] rounded-[8px]  py-[1.091rem]  px-[5.0rem] hover:bg-[#f2f2f2] "
          >
            <IoMdBookmark
              className={`${
                activeTab === "bookmarks" ? "text-[#2F80ED]" : "text-[#828282]"
              }`}
            />
          </div>
          <div
            className={`  ${
              activeTab === "bookmarks" ? "bg-[#2F80ED]" : "bg-transparent"
            } mx-auto h-[.3rem] w-[8rem] rounded-t-[8px] bg-[#2F80ED]`}
          ></div>
        </div>{" "}
      </nav>
    </IconContext.Provider>
  );
};

export default AppNav;
