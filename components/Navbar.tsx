import { IoMdArrowDropdown, IoMdSettings } from "react-icons/io";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

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
      <div
        onClick={async () => {
          const success = await signOut();
          if (success) {
            alert("You are sign out");
          }
        }}
      >
        <Image src={logoSmall} alt="tweeter" />
      </div>
      <nav className="hidden">
        <ul>
          <li>Home</li>
          <li>Explore</li>
          <li>Bookmarks</li>
        </ul>
      </nav>
      <div onClick={toggleUserMenu} className="flex items-center gap-4 outline">
        <Image src={dev} alt="dev" className="h-[3.2rem] w-[3.2rem]" />
        <p className="hidden">Xanthe Neal</p>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <IoMdArrowDropdown />
        </IconContext.Provider>
      </div>

      {userMenu && (
        <ul className="absolute right-[1.7rem] top-[5.2rem] bg-white text-[1.46em] shadow-lg">
          <li className="flex items-center gap-3 py-4 pr-12 pl-4">
            <CgProfile />
            Profile
          </li>
          <li className="flex items-center gap-3 py-4 pr-12 pl-4">
            {" "}
            <IoMdSettings />
            My account
          </li>
          <li className="flex items-center gap-3 py-4 pr-12 pl-4">
            <TbLogout />
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
