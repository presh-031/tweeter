import { unFollow } from "@/services/userServices";
import React from "react";
import { SlUserUnfollow } from "react-icons/sl";

const UnFollow = () => {
  return (
    <button
      onClick={() => {
        unFollow(routeId, currentUserId, userInfo, authUserInfo);
      }}
      className="mx-auto flex items-center gap-[.4rem] rounded-[4px] bg-[#2F80ED] py-[.80rem]  px-[2.4rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white outline"
    >
      <SlUserUnfollow />
      <span>UnFollow</span>
    </button>
  );
};

export default UnFollow;
