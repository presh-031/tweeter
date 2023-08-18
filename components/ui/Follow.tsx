import { db } from "@/config/firebase";
import { follow } from "@/services/userServices";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { SlUserFollow } from "react-icons/sl";

const Follow = ({ userInfo, routeId, currentUserId, authUserInfo }) => {
  return (
    <button
      onClick={() => {
        follow(routeId, currentUserId, userInfo, authUserInfo);
      }}
      className="mx-auto flex items-center gap-[.4rem] rounded-[4px] bg-[#2F80ED] py-[.80rem]  px-[2.4rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white outline"
    >
      <SlUserFollow />
      <span>Follow</span>
    </button>
  );
};

export default Follow;
