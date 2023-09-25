import LoginForm from "@/components/LoginForm";
import { GoogleBtn } from "..";
import logo from "../assets/tweeter.svg";
import Image from "next/image";
import GuestBtn from "@/components/ui/GuestBtn";
import Link from "next/link";

const login = () => {
  return (
    <div className=" bg-white py-24 px-20 sm:bg-[#F2F2F2] sm:px-28">
      <div className="min-[500px]:mx-auto min-[500px]:max-w-[500px] min-[500px]:rounded-[.8rem] min-[500px]:p-24 sm:bg-white">
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
          <Link href="/sign-up" className="text-blueish">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default login;
