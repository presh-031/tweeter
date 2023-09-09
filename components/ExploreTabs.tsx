import { ExploreTabsProps } from "@/typings";
import React from "react";

const ExploreTabs = ({ activeTab, handleTabClick }: ExploreTabsProps) => {
  return (
    <ul className="space-y-[1.2rem] rounded-[.8rem] bg-white py-[2rem] text-[1.4rem] font-semibold leading-normal tracking-[0.049rem] text-[#828282] shadow-sm  md:text-[1.6rem] lg:h-fit lg:min-w-[30.4rem]">
      <li
        onClick={() => handleTabClick("top")}
        className={` ${
          activeTab === "top" ? "text-blueish" : ""
        } flex items-center  gap-[1.7rem] `}
      >
        <div
          className={`${
            activeTab === "top" ? "bg-blueish" : "bg-transparent"
          } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 md:h-[3.8rem] `}
        ></div>{" "}
        Top
      </li>
      <li
        onClick={() => handleTabClick("latest")}
        className={` ${
          activeTab === "latest" ? "text-blueish" : ""
        } flex items-center  gap-[1.7rem] `}
      >
        <div
          className={`${
            activeTab === "latest" ? "bg-blueish" : "bg-transparent"
          } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 md:h-[3.8rem] `}
        ></div>
        Latest
      </li>
      <li
        onClick={() => handleTabClick("people")}
        className={` ${
          activeTab === "people" ? "text-blueish" : ""
        } flex items-center  gap-[1.7rem] `}
      >
        <div
          className={`${
            activeTab === "people" ? "bg-blueish" : "bg-transparent"
          } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 md:h-[3.8rem] `}
        ></div>{" "}
        People
      </li>
      <li
        onClick={() => handleTabClick("media")}
        className={` ${
          activeTab === "media" ? "text-blueish" : ""
        } flex items-center  gap-[1.7rem] `}
      >
        <div
          className={`${
            activeTab === "media" ? "bg-blueish" : "bg-transparent"
          } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 md:h-[3.8rem] `}
        ></div>{" "}
        Media
      </li>
    </ul>
  );
};

export default ExploreTabs;
