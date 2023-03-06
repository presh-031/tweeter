import AppNav from "./AppNav";
import { IconContext } from "react-icons";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import UserNav from "./UserNav";
import { auth } from "@/config/firebase";
import dev from "../assets/devchallenges.png";
import logoSmall from "../assets/tweeter-small.svg";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const [userNav, setUserNav] = useState(false);

  const toggleUserNav = () => {
    setUserNav((prevUserNav) => !prevUserNav);
  };
  return (
    <div className="flex justify-between  bg-white px-[1.7rem] py-[2rem] shadow-[0px_2px_2px_rgba(0,0,0,0.05)]">
      <div>
        <Image src={logoSmall} alt="tweeter" />
      </div>

      <div className="hidden">
        <AppNav />
      </div>

      <div onClick={toggleUserNav} className="flex items-center gap-4">
        <Image src={dev} alt="dev" className="h-[3.2rem] w-[3.2rem]" />
        <p className="hidden">Xanthe Neal</p>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <IoMdArrowDropdown />
        </IconContext.Provider>
      </div>

      {userNav && <UserNav />}
    </div>
  );
};

export default Navbar;
