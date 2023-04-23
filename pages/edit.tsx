import * as yup from "yup";

import { auth, db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";

import withAuthUser from "@/components/WithAuthUser";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const editProfileSchema = yup.object({
  userName: yup.string().required("You must add a name"),
  email: yup.string().required("You must add an email"),
  displayName: yup.string().required("You must add a displayName"),
  profilePictureUrl: yup.string().required("You must add a profile picture"),
  headerImageUrl: yup.string().required("You must add a header image"),
  bio: yup.string(),
});

type FormData = yup.InferType<typeof editProfileSchema>;

const edit = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editProfileSchema),
  });

  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    // update user doc in db
    const userDocRef = doc(db, "users", currentUserId);

    setLoading(true);
    try {
      await updateDoc(userDocRef, {
        userName: data.userName,
        email: data.email,
        displayName: data.displayName,
        profilePictureUrl: data.profilePictureUrl,
        headerImageUrl: data.headerImageUrl,
        bio: data.bio,
      });
      setLoading(false);
      toast.success("Successfully edited.");
      router.push("/");
    } catch (err) {
      toast.error("Try again.");
      router.push("/");
      alert(err);
    }
  };

  return (
    <div className="rounded-2xl px-[1.90rem] pb-[9.615rem]">
      <div className="py-8 ">
        <p className="mb-16 text-4xl text-blueish">Edit Profile</p>
        <form className=" text-2xl " onSubmit={handleSubmit(onSubmit)}>
          <label className="mb-4 text-[#333333] " htmlFor="name">
            <span>Name </span>
            <span>*</span>
          </label>
          <input
            {...register("userName")}
            className="mb-8 block w-full rounded-xl border-[1px] p-4 outline-none"
            type="text"
            id="userName"
          />
          <p style={{ color: "red" }}>{errors.userName?.message}</p>

          <label className="mb-4  text-[#333333]" htmlFor="email">
            Email *
          </label>
          <input
            {...register("email")}
            className="mb-8 block w-full rounded-xl border-[1px] p-4 outline-none"
            type="text"
            id="email"
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>

          <label className="mb-4  text-[#333333]" htmlFor="displayName">
            Display Name *
          </label>
          <input
            {...register("displayName")}
            className="mb-8 block w-full rounded-xl border-[1px] p-4 outline-none"
            type="text"
            id="displayName"
          />
          <p style={{ color: "red" }}>{errors.displayName?.message}</p>

          <label className="mb-4  text-[#333333]" htmlFor="profilePictureUrl">
            Profile-PicUrl *
          </label>
          <input
            {...register("profilePictureUrl")}
            className="mb-8 block w-full rounded-xl border-[1px] p-4 outline-none"
            type="text"
            id="profilePictureUrl"
          />
          <p style={{ color: "red" }}>{errors.profilePictureUrl?.message}</p>

          <label className="mb-4  text-[#333333]" htmlFor="headerImageUrl">
            Header ImageUrl *
          </label>
          <input
            {...register("headerImageUrl")}
            className="mb-8 block w-full rounded-xl border-[1px] p-4 outline-none"
            type="text"
            id="headerImageUrl"
          />
          <p style={{ color: "red" }}>{errors.headerImageUrl?.message}</p>

          <label className="mb-4  text-[#333333]" htmlFor="bio">
            Bio
          </label>
          <textarea
            {...register("bio")}
            className="mb-8 block w-full rounded-xl border-[1px] p-4 outline-none"
            name="bio"
            id="bio"
            cols={30}
            rows={10}
          ></textarea>
          <p style={{ color: "red" }}>{errors.bio?.message}</p>

          <div className="flex items-center gap-4">
            <input
              className="rounded-xl bg-blueish py-4 px-6 text-white"
              type="submit"
            />
            {loading && (
              <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blueish" />
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withAuthUser(edit);
