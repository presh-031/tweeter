import { follow } from "@/services/userServices";
import { userServicesProps } from "@/typings";
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
      className="mx-auto flex items-center gap-[.4rem] rounded-[4px] bg-[#2F80ED] py-[.80rem]  px-[2.4rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white outline"
    >
      <SlUserFollow />
      <span>Follow</span>
    </button>
  );
};

export default Follow;
