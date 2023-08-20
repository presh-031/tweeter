import { auth } from "@/config/firebase";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { AiOutlineGoogle } from "react-icons/ai";
import SignInLoader from "../Loaders/SignInLoader";
import { useRouter } from "next/router";
import { createNewUserInDb } from "@/helpers/authHelpers";

const GoogleBtn = () => {
  const router = useRouter();

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  if (user) {
    createNewUserInDb(user);
    router.push("/");
  }

  return (
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
  );
};

export default GoogleBtn;