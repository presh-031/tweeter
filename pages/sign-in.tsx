import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";

import { FaFacebookSquare } from "react-icons/fa";
import { IconContext } from "react-icons";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { auth } from "../config/firebase";
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
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="p-8">
        {/* <header className="mb-8">
          <Image src={logo} alt="tweeter" />
        </header> */}
        <p className="mb-12 text-4xl">
          Join thousands of users around the world
        </p>
        <p className="mb-12 text-xl">
          Welcome to Tweeter, the social network where every tweet counts! Join
          millions of users worldwide and share your thoughts, opinions, and
          experiences with the world. From breaking news to hilarious memes,
          Tweeter has it all. Sign in now and let your voice be heard!
        </p>

        <form className="flex flex-col gap-3">
          <div className="flex items-center gap-4 overflow-hidden rounded-xl border-[1px] border-gray-800 pl-4">
            <MdEmail />
            <input
              type="text"
              placeholder="Email"
              className="w-full  py-3 text-2xl outline-none"
            />
          </div>
          <div className="flex items-center gap-4 overflow-hidden rounded-xl border-[1px] border-gray-800 pl-4">
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
            className="mt-2 w-full rounded-xl border py-3 text-2xl"
          />
          {loading ? <p>Loading...</p> : <p>{error?.message}</p>}
        </form>

        <p className="mt-16 text-center">
          or continue with these social profile
        </p>

        <div className="mt-8 flex  justify-center gap-8">
          <div
            onClick={() => {
              signInWithGoogle();
            }}
            className="grid items-center rounded-full border-[1px] border-gray-800 p-4"
          >
            <AiOutlineGoogle />
          </div>
          <div className="grid items-center rounded-full border-[1px] border-gray-800 p-4">
            <FaFacebookSquare />
          </div>
          <div className="grid items-center rounded-full border-[1px] border-gray-800 p-4">
            <AiOutlineTwitter />
          </div>
          <div className="grid items-center rounded-full border-[1px] border-gray-800 p-4">
            <AiFillGithub />
          </div>
        </div>
        <p className="mt-16 text-center">Already a member? Login</p>
      </div>
    </IconContext.Provider>
  );
};

export default signIn;
