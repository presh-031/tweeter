import { unFollow } from "@/services/userServices";
import { userServicesProps } from "@/typings";
import { SlUserUnfollow } from "react-icons/sl";

const UnFollow = ({
  profileOwnerInfo,
  profileOwnerId,
  authUserId,
  authUserInfo,
}: userServicesProps) => {
  return (
    <button
      onClick={() => {
        unFollow(profileOwnerId, authUserId, profileOwnerInfo, authUserInfo);
      }}
      className="mx-auto flex w-[10rem] items-center justify-center gap-[.4rem] rounded-[4px]  bg-[#2F80ED] py-[.80rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white outline"
    >
      <SlUserUnfollow />
      <span>UnFollow</span>
    </button>
  );
};

export default UnFollow;
