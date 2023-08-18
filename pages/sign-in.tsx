import { AiOutlineGoogle } from "react-icons/ai";
import { auth } from "../config/firebase";
import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { IconContext } from "react-icons";
import Image from "next/image";
import logo from "../assets/tweeter.svg";
import { SignInForm, SignInLoader } from "../index";
import { FaUser } from "react-icons/fa";
import { createNewUserInDb } from "@/helpers/authHelpers";

const SignIn = () => {
  const router = useRouter();
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (user) {
    createNewUserInDb(user);
    router.push("/");
  }

  const disabled = true;

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
          disabled={disabled}
          className={` ${
            disabled ? "opacity-20" : ""
          } flex w-full items-center justify-center gap-2 rounded-xl border-[1px] border-gray-800 p-4 text-center text-xl`}
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
