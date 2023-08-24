import { IconContext } from "react-icons";
import Image from "next/image";
import logo from "../assets/tweeter.svg";
import { GoogleBtn, SignInForm, SignInLoader } from "../index";
import { FaUser } from "react-icons/fa";
import GuestBtn from "@/components/ui/GuestBtn";

const SignIn = () => {
  return (
    <IconContext.Provider value={{ className: "react-icons sign-in-icons" }}>
      <div className=" bg-white py-24 px-20">
        <Image src={logo} alt="logo" />
        <p className="mb-12 mt-8 text-2xl">
          <span className="font-semibold">Sign in</span> to join thousands of
          users around the world.
        </p>

        <SignInForm />
        <p className="my-6 text-center text-xl">or</p>
        <GoogleBtn />
        <GuestBtn />

        <p className="mt-12 text-center text-xl">
          Already a member? <span className="text-blueish">Login</span>
        </p>
      </div>
    </IconContext.Provider>
  );
};

export default SignIn;
