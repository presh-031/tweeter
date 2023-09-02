import { auth } from "@/config/firebase";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import logo from "../assets/tweeter.svg";
import { AppNav, UserNav } from "../index";
import ProfilePicture from "./ProfilePicture";
import DisplayName from "./DisplayName";

const Nav = () => {
  const router = useRouter();
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  // local state for nav
  const [showUserNav, setShowUserNav] = useState(false);
  const toggleShowUserNav = () => {
    setShowUserNav((prevShowUserNav) => !prevShowUserNav);
  };

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

      <div onClick={toggleShowUserNav} className="flex items-center">
        <div className="flex h-[3.2rem] w-[3.2rem] items-center">
          <ProfilePicture userId={authUserId} width={32} height={32} />
        </div>
        <DisplayName authUserId={authUserId} />
        {showUserNav ? (
          <RiArrowUpSFill className="text-3xl" />
        ) : (
          <RiArrowDownSFill className="text-3xl" />
        )}
      </div>
      {showUserNav && (
        <UserNav
          authUserId={authUserId}
          toggleShowUserNav={toggleShowUserNav}
        />
      )}
    </div>
  );
};

export default Nav;
