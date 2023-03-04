import { IconContext } from "react-icons";
import Image from "next/image";
import { IoMdArrowDropdown } from "react-icons/io";
import dev from "../assets/devchallenges.png";
import logoSmall from "../assets/tweeter-small.svg";

const Navbar = () => {
  return (
    <div className="flex drop-shadow-[0_2px_2px_rgba(0,0,0,0.05)]  justify-between bg-white px-[1.7rem] py-[2rem]">
      <div>
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
        <Image src={dev} alt="tweeter" className="w-[3.2rem] h-[3.2rem]" />
        <p className="hidden">Xanthe Neal</p>
        <IconContext.Provider value={{ className: "react-icons" }}>
          <IoMdArrowDropdown />
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Navbar;