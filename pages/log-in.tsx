import LoginForm from "@/components/LoginForm";
import { GoogleBtn } from "..";
import logo from "../assets/tweeter.svg";
import Image from "next/image";
import { IconContext } from "react-icons";
import GuestBtn from "@/components/ui/GuestBtn";
import Link from "next/link";

const login = () => {
  return (
    <IconContext.Provider value={{ className: "react-icons sign-in-icons" }}>
      <div className=" min-h-full bg-white py-24 px-20">
        <Image src={logo} alt="logo" />
        <p className="mb-12 mt-8 text-2xl ">
          <span className="font-semibold">Log in</span> to continue tweeting
        </p>

        <LoginForm />
        <p className="my-6 text-center text-xl">or</p>
        <GoogleBtn />

        {/* add functionality to guest btn */}
        <GuestBtn />

        <p className="mt-12 text-center text-xl">
          Not a member?{" "}
          <Link href="/sign-in" className="text-blueish">
            Sign up
          </Link>
        </p>
      </div>
    </IconContext.Provider>
  );
};

export default login;
