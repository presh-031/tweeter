import { AiOutlineGoogle } from "react-icons/ai";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { IconContext } from "react-icons";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import logo from "../assets/tweeter.svg";
import { SignInLoader } from "../index";
import { FaUser } from "react-icons/fa";
import { createNewUserInDb } from "@/helpers/authHelpers";

const SignIn = () => {
  const router = useRouter();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (user) {
    createNewUserInDb(user);
    router.push("/");
  }

  return (
    <IconContext.Provider value={{ className: "react-icons sign-in-icons" }}>
      <div className="bg-white py-24 px-20">
        <Image src={logo} alt="logo" />
        <p className="mb-12 mt-8 text-2xl">
          <span className="font-semibold">Sign in</span> to join thousands of
          users around the world.
        </p>

        <form className="flex flex-col gap-6">
          <div className="flex items-center gap-4 overflow-hidden rounded-xl bg-gray-100  pl-4">
            <MdEmail />
            <input
              type="text"
              placeholder="Email"
              className="w-full bg-transparent py-4 text-2xl outline-none"
            />
          </div>
          <div className="flex items-center gap-4 overflow-hidden rounded-xl  bg-gray-100 pl-4">
            <IoMdLock />
            <input
              placeholder="Password"
              type="password"
              className="w-full bg-transparent py-4 text-2xl outline-none"
            />
          </div>
          <input
            type="submit"
            disabled
            value="Start tweeting now"
            className="mt-2 w-full rounded-xl border bg-blueish py-4 text-2xl font-medium text-white"
          />
        </form>

        <p className="my-6 text-center text-xl">or</p>
        <button
          onClick={() => {
            signInWithGoogle();
          }}
          className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl border-[1px] border-gray-800 p-4 text-center text-xl"
        >
          <AiOutlineGoogle />
          <span>continue with Google</span>
          {loading && <SignInLoader />}
        </button>

        <button
          disabled
          className="flex w-full items-center justify-center gap-2 rounded-xl border-[1px] border-gray-800 p-4 text-center text-xl"
        >
          <FaUser />
          <span> continue as guest</span>
        </button>

        <p className="mt-12 text-center text-xl">
          Already a member? <span className="text-blueish">Login</span>
        </p>
      </div>
    </IconContext.Provider>
  );
};

export default SignIn;
