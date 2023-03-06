import { useAuthState, useSignOut } from "react-firebase-hooks/auth";

import { IconContext } from "react-icons";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import { auth } from "@/config/firebase";
import dev from "../assets/devchallenges.png";
import logoSmall from "../assets/tweeter-small.svg";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
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
      <div className="flex items-center gap-4">
        <Image src={dev} alt="dev" className="h-[3.2rem] w-[3.2rem]" />
        <p className="hidden">Xanthe Neal</p>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <IoMdArrowDropdown />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Navbar;
