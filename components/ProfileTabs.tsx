import { ExploreTabsProps, ProfileTabsProps } from "@/typings";
import React from "react";

const ProfileTabs = ({
  activeProfileTab,
  handleTabClick,
}: ProfileTabsProps) => {
  return (
    <ul className="mb-[2.5rem] space-y-[1.2rem] rounded-[.8rem] bg-white py-[2rem] text-[1.4rem] font-semibold leading-normal tracking-[0.049rem] text-[#828282] shadow-sm md:text-[1.6rem]  lg:h-fit lg:min-w-[30.4rem]">
      <li
        onClick={() => handleTabClick("tweets")}
        className={` ${
          activeProfileTab === "tweets" ? "text-blueish" : ""
        } flex items-center  gap-[1.7rem] `}
      >
        <div
          className={`${
            activeProfileTab === "tweets" ? "bg-blueish" : "bg-transparent"
          } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 md:h-[3.8rem] `}
        ></div>{" "}
        Tweets
      </li>
      <li
        onClick={() => handleTabClick("media")}
        className={` ${
          activeProfileTab === "media" ? "text-blueish" : ""
        } flex items-center  gap-[1.7rem] `}
      >
        <div
          className={`${
            activeProfileTab === "media" ? "bg-blueish" : "bg-transparent"
          } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 md:h-[3.8rem] `}
        ></div>{" "}
        Media
      </li>
      <li
        onClick={() => handleTabClick("likes")}
        className={` ${
          activeProfileTab === "likes" ? "text-blueish" : ""
        } flex items-center  gap-[1.7rem] `}
      >
        <div
          className={`${
            activeProfileTab === "likes" ? "bg-blueish" : "bg-transparent"
          } h-[3.2rem] w-[0.3rem] rounded-r-[.4rem] transition-all duration-200 md:h-[3.8rem] `}
        ></div>{" "}
        Likes
      </li>
    </ul>
  );
};

export default ProfileTabs;
