import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";

import { FaFacebookSquare } from "react-icons/fa";
import { IconContext } from "react-icons";
import Image from "next/image";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { auth } from "../config/firebase";
import logo from "../assets/tweeter.svg";
import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";

const signIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const router = useRouter();

  if (user) {
    router.push("/");
    // console.log(user);
  }

  return (
    <IconContext.Provider value={{ className: "react-icons-signin" }}>
      <div className="p-4">
        <header className="mb-8">
          <Image src={logo} alt="tweeter" />
        </header>
        <p className="text-3xl mb-6">
          Join thousands of users around the world
        </p>
        <p className="text-xl mb-12">
          Welcome to Tweeter, the social network where every tweet counts! Join
          millions of users worldwide and share your thoughts, opinions, and
          experiences with the world. From breaking news to hilarious memes,
          Tweeter has it all. Sign in now and let your voice be heard!
        </p>

        <form className="flex flex-col gap-3">
          <div className="flex items-center border-[1px] pl-4 overflow-hidden border-gray-800 rounded-xl gap-4">
            <MdEmail />
            <input
              type="text"
              placeholder="Email"
              className="w-full  py-3 text-2xl outline-none"
            />
          </div>
          <div className="flex items-center border-[1px] pl-4 overflow-hidden border-gray-800 rounded-xl gap-4">
            <IoMdLock />
            <input
              placeholder="Password"
              type="text"
              className="w-full  py-3 text-2xl outline-none"
            />
          </div>
          <input
            type="submit"
            value="Start tweeting now"
            className="w-full py-3 rounded-xl text-2xl mt-2 border"
          />
          {loading ? <p>Loading...</p> : <p>{error?.message}</p>}
        </form>

        <p className="text-center mt-16">
          or continue with these social profile
        </p>

        <div className="flex gap-8  justify-center mt-8">
          <div
            onClick={() => {
              signInWithGoogle();
            }}
            className="p-4 border-gray-800 grid items-center border-[1px] rounded-full"
          >
            <AiOutlineGoogle />
          </div>
          <div className="p-4 border-gray-800 grid items-center border-[1px] rounded-full">
            <FaFacebookSquare />
          </div>
          <div className="p-4 border-gray-800 grid items-center border-[1px] rounded-full">
            <AiOutlineTwitter />
          </div>
          <div className="p-4 border-gray-800 grid items-center border-[1px] rounded-full">
            <AiFillGithub />
          </div>
        </div>
        <p className="text-center mt-16">Already a member? Login</p>
      </div>
    </IconContext.Provider>
  );
};

export default signIn;
