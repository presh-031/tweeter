import { auth } from "@/config/firebase";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IconContext } from "react-icons";
import { IoMdArrowDropdown } from "react-icons/io";
import dev from "../assets/devchallenges.png";
import logoSmall from "../assets/tweeter-small.svg";
import AppNav from "./AppNav";
import UserNav from "./UserNav";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);

  const [userNav, setUserNav] = useState(false);

  const toggleUserNav = () => {
    setUserNav((prevUserNav) => !prevUserNav);
  };
  const router = useRouter();

  return (
    <div className="flex justify-between  bg-white px-[1.7rem] py-[2rem] shadow-[0px_2px_2px_rgba(0,0,0,0.05)]">
      <div
        onClick={() => {
          router.push("/");
        }}
      >
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

      {userNav && <UserNav toggleUserNav={toggleUserNav} />}
    </div>
  );
};

export default Navbar;
