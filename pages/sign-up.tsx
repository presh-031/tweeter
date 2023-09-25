import Image from "next/image";
import logo from "../assets/tweeter.svg";
import { GoogleBtn, SignUpForm } from "../index";
import GuestBtn from "@/components/ui/GuestBtn";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="bg-white py-24 px-20 sm:bg-[#F2F2F2] sm:px-28">
      <div className="min-[500px]:mx-auto min-[500px]:max-w-[500px] min-[500px]:rounded-[.8rem] min-[500px]:p-24 sm:bg-white">
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
    </div>
  );
};

export default SignUp;
