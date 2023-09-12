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
import Nav from "./Nav";

const NavBar = () => {
  const router = useRouter();
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  // local state for nav
  const [showUserNav, setShowUserNav] = useState(false);
  const toggleShowUserNav = () => {
    setShowUserNav((prevShowUserNav) => !prevShowUserNav);
  };

  return (
    <div className="flex items-center justify-between  bg-white px-[1.7rem] py-[2rem] shadow-[0px_2px_2px_rgba(0,0,0,0.05)]">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="cursor-pointer"
      >
        <Image src={logo} alt="tweeter" />
      </div>
      <div className="hidden  md:block">
        <Nav />
      </div>
      <div
        onClick={toggleShowUserNav}
        className="flex cursor-pointer items-center gap-2"
      >
        <div className="flex h-[4rem] w-[4rem] items-center overflow-hidden rounded-[8px]">
          {authUserId && (
            <ProfilePicture userId={authUserId} width={40} height={40} />
          )}
        </div>
        {authUserId && <DisplayName authUserId={authUserId} />}
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

export default NavBar;
