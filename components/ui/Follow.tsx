import { follow } from "@/services/userServices";
import { userServicesProps } from "@/typings";
import { memo } from "react";
import { SlUserFollow } from "react-icons/sl";

const Follow = ({
  profileOwnerInfo,
  profileOwnerId,
  authUserId,
  authUserInfo,
}: userServicesProps) => {
  return (
    <button
      onClick={() => {
        follow(profileOwnerId, authUserId, profileOwnerInfo, authUserInfo);
      }}
      className="mx-auto flex w-[10rem] items-center justify-center gap-[.4rem] rounded-[4px] bg-[#2F80ED]  py-[.80rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white outline"
    >
      <SlUserFollow />
      <span>Follow</span>
    </button>
  );
};

export default memo(Follow);
