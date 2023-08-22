import React from "react";
import * as yup from "yup";

import { useRouter } from "next/router";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, updateDoc } from "firebase/firestore";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { auth, db } from "@/config/firebase";
import { MdOutlineBrokenImage } from "react-icons/md";
import userPlaceholder from "../assets/user-placeholder.png";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import Image from "next/image";

const schema = yup.object().shape({
  userName: yup.string().required("You must add a name"),
  email: yup.string().required("You must add an email"),
  displayName: yup.string().required("You must add a displayName"),
  profilePictureUrl: yup.string().required("You must add a profile picture"),
  headerImageUrl: yup.string().required("You must add a header image"),
  bio: yup.string(),
});
type FormData = yup.InferType<typeof schema>;

const EditProfileForm = () => {
  const router = useRouter();

  // const [currentUser] = useAuthState(auth);
  // const currentUserId = currentUser ? currentUser.uid : "";
  // const [loading, setLoading] = useState<boolean>(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FormData>({
  //   resolver: yupResolver(schema),
  // });

  // const onSubmit = async (data: FormData) => {
  //   setLoading(true);
  //   const userDocRef = doc(db, "users", currentUserId);
  //   try {
  //     await updateDoc(userDocRef, {
  //       userName: data.userName,
  //       email: data.email,
  //       displayName: data.displayName,
  //       profilePictureUrl: data.profilePictureUrl,
  //       headerImageUrl: data.headerImageUrl,
  //       bio: data.bio,
  //     });
  //     setLoading(false);
  //     toast.success("Successfully edited.");
  //     router.push("/");
  //   } catch (err) {
  //     toast.error("Try again.");
  //     router.push("/");
  //     alert(err);
  //   }
  // };
  return (
    <>
      <div>
        <div className="relative h-[8rem] w-full rounded-[.8rem] bg-[#777777] bg-opacity-80">
          <div className="absolute top-[1rem] left-[1rem] w-fit rounded-full bg-black bg-opacity-50 p-2">
            <MdOutlineBrokenImage className=" text-3xl text-white" />
          </div>
        </div>
        <div className="relative mt-8 h-[5rem] w-[5rem] overflow-hidden rounded-[.8rem] bg-black bg-opacity-20">
          <Image
            src={userPlaceholder}
            alt="select-profile-pic"
            width={50}
            height={50}
            className="opacity-30 "
          />
          <div className="absolute top-1/2 left-1/2 w-fit -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black bg-opacity-60 p-2">
            <MdOutlineBrokenImage className=" text-3xl text-white" />
          </div>
        </div>
      </div>
      <form
        className="  mt-10 text-2xl"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <label className="mb-4 text-[#333333] " htmlFor="name">
          User Name
        </label>
        <input
          // {...register("userName")}
          className="mb-8 block w-full rounded-xl border-[1px] border-[#333333] bg-transparent p-4 outline-none"
          type="text"
          id="userName"
        />
        {/* <p style={{ color: "red" }}>{errors.userName?.message}</p> */}

        <label className="mb-4  text-[#333333]" htmlFor="displayName">
          Display Name
        </label>
        <input
          // {...register("displayName")}
          className="mb-8 block w-full rounded-xl border-[1px] border-[#333333] bg-transparent p-4 outline-none"
          type="text"
          id="displayName"
        />
        {/* <p style={{ color: "red" }}>{errors.displayName?.message}</p> */}

        <label className="mb-4  text-[#333333]" htmlFor="bio">
          Bio
        </label>
        <textarea
          // {...register("bio")}
          className="mb-8 block w-full rounded-xl border-[1px] border-[#333333] bg-transparent p-4 outline-none"
          name="bio"
          id="bio"
          cols={20}
          rows={5}
        ></textarea>
        {/* <p style={{ color: "red" }}>{errors.bio?.message}</p>  */}

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
