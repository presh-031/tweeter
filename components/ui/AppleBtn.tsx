import React from "react";
import { AiOutlineApple } from "react-icons/ai";
import SignInLoader from "../Loaders/SignInLoader";
import { useSignInWithApple } from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "next/router";
import { createNewUserInDb } from "@/helpers/authHelpers";

const AppleBtn = () => {
  const router = useRouter();

  const [signInWithApple, user, loading, error] = useSignInWithApple(auth);

  if (user) {
    createNewUserInDb(user);
    router.push("/");
  }

  return (
    <button
      onClick={() => {
        signInWithApple();
      }}
      className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl border-[1px] border-gray-800 p-4 text-center text-xl"
    >
      <AiOutlineApple />
      <span>continue with Apple</span>
      {loading && <SignInLoader />}
    </button>
  );
};

export default AppleBtn;
