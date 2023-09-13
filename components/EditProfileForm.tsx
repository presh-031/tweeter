import React, { useRef } from "react";
import * as yup from "yup";
import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { db } from "@/config/firebase";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { EditProfileFormProps } from "@/typings";
// import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  userName: yup.string(),
  displayName: yup.string(),
  bio: yup.string(),
});
type FormData = yup.InferType<typeof schema>;

const resolver = async (data: FormData) => {
  const cleanedData = {
    userName: data.userName || "",
    displayName: data.displayName || "",
    bio: data.bio || "",
  };

  try {
    await schema.validate(cleanedData, { abortEarly: false });
    return { values: cleanedData, errors: {} };
  } catch (errors) {
    const formErrors: { [key: string]: string } = (
      errors as yup.ValidationError
    ).inner.reduce(
      (acc: { [key: string]: string }, currentError: yup.ValidationError) => {
        if (currentError.path) {
          acc[currentError.path] = currentError.message;
        }
        return acc;
      },
      {}
    );

    return { values: cleanedData, errors: formErrors };
  }
};

const EditProfileForm = ({
  authUserId,
  triggerFunction,
}: EditProfileFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    // Logic to handle images
    triggerFunction();

    // Logic to handle form
    //get whichever input field has a value and update that. Thats what the user wants to change.
    const updatedData: FormData = {};

    if (data.userName) {
      updatedData.userName = data.userName;
    }

    if (data.displayName) {
      updatedData.displayName = data.displayName;
    }

    if (data.bio) {
      updatedData.bio = data.bio;
    }

    if (Object.keys(updatedData).length === 0) {
      // No changes to update in form. Changes may be in the images.
      toast.error("No changes made to bio-info.");
      return;
    }

    // console.log(updatedData);

    setLoading(true);
    const userDocRef = doc(db, "users", authUserId);
    try {
      await updateDoc(userDocRef, updatedData);
      toast.success("Successfully edited.");
    } catch (error) {
      toast.error("Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
      router.push("/");
    }
  };

  return (
    <>
      <form className="  mt-10 text-2xl" onSubmit={handleSubmit(onSubmit)}>
        <label className="mb-4 text-[#333333] " htmlFor="name">
          User Name
        </label>
        <input
          {...register("userName")}
          // { defaultValue: authUserInfo?.userName }
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
            className="cursor-pointer rounded-xl bg-blueish py-4 px-6 text-white"
            type="submit"
            value="save"
          />
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;
