import { auth, db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { userInfoType } from "@/typings";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import logo from "../assets/tweeter.svg";
import userPlaceholder from "../assets/user-placeholder.png";
import { AppNav, UserNav } from "../index";
import { useDocumentData } from "react-firebase-hooks/firestore";

const Navbar = () => {
  const router = useRouter();

  const [showUserNav, setShowUserNav] = useState(false);
  const toggleShowUserNav = () => {
    setShowUserNav((prevShowUserNav) => !prevShowUserNav);
  };

  // Logic to get current user info for navbar
  // const [currentUser] = useAuthState(auth);
  // const currentUserId = currentUser ? currentUser.uid : "";
  // const [userInfo, userInfoLoading, userInfoError] = useDocumentData(
  //   doc(db, "users", currentUserId),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );
  // console.log(userInfo);

  return (
    <div className="flex justify-between  bg-white px-[1.7rem] py-[2rem] shadow-[0px_2px_2px_rgba(0,0,0,0.05)]">
      <div
        onClick={() => {
          router.push("/");
        }}
      >
        <Image src={logo} alt="tweeter" />
      </div>

      <div className="hidden">
        <AppNav />
      </div>

      <div onClick={toggleShowUserNav} className="flex items-center gap-4 ">
        {/* <Image
          src={
            userInfo?.profilePictureUrl
              ? userInfo.profilePictureUrl
              : userPlaceholder
          }
          alt="profile-pic"
          width={32}
          height={32}
          className="h-[3.2rem] w-[3.2rem] rounded-[8px] outline"
        />

        <p className="text-lg">
          {userInfo?.displayName
            ? `@${userInfo.displayName}`
            : userInfo?.userName}
        </p> */}

        {showUserNav ? (
          <RiArrowUpSFill className="text-3xl" />
        ) : (
          <RiArrowDownSFill className="text-3xl" />
        )}
      </div>
      {showUserNav && <UserNav toggleShowUserNav={toggleShowUserNav} />}
    </div>
  );
};

export default Navbar;
