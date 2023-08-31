import { IconContext } from "react-icons";
import Image from "next/image";
import logo from "../assets/tweeter.svg";
import { GoogleBtn, SignUpForm, SignUpLoader } from "../index";
import { FaUser } from "react-icons/fa";
import GuestBtn from "@/components/ui/GuestBtn";
import Link from "next/link";

const SignUp = () => {
  return (
    <IconContext.Provider value={{ className: "react-icons sign-in-icons" }}>
      <div className=" min-h-full bg-white py-24 px-20">
        <Image src={logo} alt="logo" />
        <p className="mb-12 mt-8 text-2xl">
          <span className="font-semibold">Sign up</span> to join thousands of
          users around the world.
        </p>

        <SignUpForm />
        <p className="my-6 text-center text-xl">or</p>
        <GoogleBtn />

        {/* add functionality to guest btn */}
        <GuestBtn />

        <p className="mt-12 text-center text-xl">
          Already a member?{" "}
          <Link href="/log-in" className="text-blueish">
            Login
          </Link>
        </p>
      </div>
    </IconContext.Provider>
  );
};

export default SignUp;