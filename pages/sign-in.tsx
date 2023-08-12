/* eslint-disable react-hooks/rules-of-hooks */
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import {
  AiFillGithub,
  AiOutlineGoogle,
  AiOutlineTwitter,
} from "react-icons/ai";
import { auth, db } from "../config/firebase";

import { useRouter } from "next/router";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { IconContext } from "react-icons";
import { FaFacebookSquare } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import Image from "next/image";
import logo from "../assets/tweeter.svg";

const SignIn = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const router = useRouter();

  const usersRef = collection(db, "users");

  const createNewUser = async () => {
    console.log(user);
    const newId = user ? user.user.uid : "";

    // Logic to check if user already exists in our users collection.
    const userRef = doc(db, "users", newId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // User exists, so we simply log them in, and start getting their already existing data.
      console.log("User data:", userSnap.data());
    } else {
      // No such user
      // doc.data() will be undefined in this case
      // Here's where we'll create a fresh user document for the actually new user.
      console.log("No such user!");

      try {
        // setDoc will force the new user doc to use a custom Id, which is set to newId, which is the new Id generated by firebase auth, hence synced.
        await setDoc(doc(db, "users", newId), {
          bio: "",
          createdAt: "",
          displayName: "",
          email: user?.user.email,
          followers: [],
          following: [],
          headerImageUrl: "",
          profilePictureUrl: "",
          userName: user?.user.displayName,
        });
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (user) {
    createNewUser();
    router.push("/");
  }

  return (
    <IconContext.Provider value={{ className: "react-icons" }}>
      <div className="bg-white py-24 px-20">
        <Image src={logo} alt="logo" />
        <p className="mb-12 mt-8 text-2xl">
          Join thousands of users around the world.
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
            value="Start tweeting now"
            className="mt-2 w-full rounded-xl border bg-blueish py-4 text-2xl font-medium text-white"
          />
          {/* {loading ? <p>Loading...</p> : <p>{error?.message}</p>} */}
        </form>

        <p className="my-6 text-center text-xl">or</p>
        <button
          onClick={() => {
            signInWithGoogle();
          }}
          className="mb-6 flex w-full items-center justify-center gap-6 rounded-xl border-[1px] border-gray-800 p-4 text-center text-lg"
        >
          <AiOutlineGoogle /> <span>continue with Google</span>
          {/* loader */}
        </button>
        <button className="w-full rounded-xl border-[1px] border-gray-800 p-4 text-center text-lg">
          continue as guest
          {/* loader */}
        </button>
        <p className="mt-12 text-center text-lg">
          Already a member? <span className="text-blueish">Login</span>
        </p>
      </div>
    </IconContext.Provider>
  );
};

export default SignIn;
