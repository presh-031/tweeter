import { IoMdArrowDropdown, IoMdSettings } from "react-icons/io";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import AppNav from "./AppNav";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import Image from "next/image";
import { TbLogout } from "react-icons/tb";
import { auth } from "@/config/firebase";
import dev from "../assets/devchallenges.png";
import logoSmall from "../assets/tweeter-small.svg";
import { useState } from "react";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const [userMenu, setUsermenu] = useState(false);

  const toggleUserMenu = () => {
    setUsermenu((prevUserMenu) => !prevUserMenu);
  };
  return (
    <div className="flex justify-between  bg-white px-[1.7rem] py-[2rem] shadow-[0px_2px_2px_rgba(0,0,0,0.05)]">
      <div>
        <Image src={logoSmall} alt="tweeter" />
      </div>

      <div className="hidden">
        <AppNav />
      </div>

      <div onClick={toggleUserMenu} className="flex items-center gap-4">
        <Image src={dev} alt="dev" className="h-[3.2rem] w-[3.2rem]" />
        <p className="hidden">Xanthe Neal</p>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <IoMdArrowDropdown />
        </IconContext.Provider>
      </div>

      {userMenu && (
        <ul className="absolute right-[1.7rem] top-[5.2rem] flex flex-col gap-[.4rem] rounded-[12px] bg-white px-[1.392rem] py-[1.527rem] text-[1.2rem] leading-[1.634rem]  tracking-[-3.5%] text-[#4F4F4F] shadow-lg">
          <li className="flex items-center gap-[1.167rem] rounded-[8px] py-[1.1rem] pr-12 pl-[1.4rem] hover:bg-[#f2f2f2]">
            <CgProfile />
            Profile
          </li>
          <li className="flex items-center gap-[1.167rem] rounded-[8px] py-[1.1rem] pr-12 pl-[1.4rem] hover:bg-[#f2f2f2]">
            <IoMdSettings />
            My account
          </li>
          <li className="my-[.71rem] border-t-[1px] border-[#e0e0e0]"></li>
          <li
            onClick={async () => {
              const success = await signOut();
              if (success) {
                alert("You are sign out");
              }
            }}
            className="flex items-center gap-[1.167rem] rounded-[8px] py-[1.1rem] pr-12 pl-[1.4rem] text-[#EB5757] hover:bg-[#f2f2f2]"
          >
            <TbLogout />
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
