import React from "react";
import * as yup from "yup";

import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { auth, db } from "@/config/firebase";
import { MdOutlineBrokenImage } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";
import { useDocumentData } from "react-firebase-hooks/firestore";

const schema = yup.object().shape({
  userName: yup.string().required(""),
  displayName: yup.string().required(""),
  bio: yup.string().required(""),
});
type FormData = yup.InferType<typeof schema>;

const EditProfileForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  // const [authUser] = useAuthState(auth);
  // const authUserId = authUser ? authUser.uid : "";
  // const [authUserInfo, authUserInfoLoading, authUserInfoError] =
  //   useDocumentData(doc(db, "users", authUserId), {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   });

  // console.log(authUserInfo);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    //get whichever input field has a value and update that. Thats what the user wants to change.
    // setLoading(true);
    // const userDocRef = doc(db, "users", authUserId);
    // try {
    //   await updateDoc(userDocRef, {
    //     userName: data.userName,
    //     displayName: data.displayName,
    //     bio: data.bio,
    //   });
    //   setLoading(false);
    //   toast.success("Successfully edited.");
    //   router.push("/");
    // } catch (err) {
    //   toast.error("Try again.");
    //   console.log(err);
    // }
  };

  return (
    <>
      <form className="  mt-10 text-2xl" onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-4 text-[#333333] " htmlFor="name">
          User Name
        </label>
        <input
          {
            ...register("userName")
            // { defaultValue: authUserInfo?.userName }
          }
          className="mb-8 block w-full rounded-xl border-[1px] border-[#333333] bg-transparent p-4 outline-none"
          type="text"
          id="userName"
        />

        <label className="mb-4  text-[#333333]" htmlFor="displayName">
          Display Name
        </label>
        <input
          {
            ...register("displayName")
            // { defaultValue: authUserInfo?.displayName }
          }
          className="mb-8 block w-full rounded-xl border-[1px] border-[#333333] bg-transparent p-4 outline-none"
          type="text"
          id="displayName"
        />

        <label className="mb-4  text-[#333333]" htmlFor="bio">
          Bio
        </label>
        <textarea
          {
            ...register("bio")
            // { defaultValue: authUserInfo?.bio }
          }
          className="mb-8 block w-full rounded-xl border-[1px] border-[#333333] bg-transparent p-4 outline-none"
          name="bio"
          id="bio"
          cols={20}
          rows={5}
        ></textarea>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => {
              router.back();
            }}
            className="flex items-center gap-3 py-4 text-blueish"
          >
            <BiArrowBack />
            Back
          </button>
          <input
            className="rounded-xl bg-blueish py-4 px-6 text-white"
            type="submit"
            value="save"
          />
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;

// userName, displayName, bio, header & profile pic.
