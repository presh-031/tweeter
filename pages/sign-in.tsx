import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";

import { FaFacebookSquare } from "react-icons/fa";
import Image from "next/image";
import logo from "../assets/tweeter.svg";

const signIn = () => {
  return (
    <div className="p-4">
      <header className="mb-8">
        <Image src={logo} alt="tweeter" />
      </header>
      <p className="text-3xl mb-6">Join thousands of users around the world</p>
      <p className="text-xl mb-12">
        Welcome to Tweeter, the social network where every tweet counts! Join
        millions of users worldwide and share your thoughts, opinions, and
        experiences with the world. From breaking news to hilarious memes,
        Tweeter has it all. Sign in now and let your voice be heard!
      </p>

      <form className="flex flex-col gap-3">
        <input type="text" className="w-full border border-red-800" />
        <input type="text" className="w-full border border-red-800" />
        <input
          type="submit"
          value="Start tweeting now"
          className="w-full border border-red-800"
        />
      </form>
      <p className="text-center mt-16">or continue with these social profile</p>
      <div>
        <div>
          <AiOutlineGoogle />
        </div>
        <div>
          <FaFacebookSquare />
        </div>
        <div>
          <AiOutlineTwitter />
        </div>
        <div>
          <AiFillGithub />
        </div>
      </div>
      <p>Already a member? Login</p>
    </div>
  );
};

export default signIn;
