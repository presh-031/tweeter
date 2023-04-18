import * as yup from "yup";

import { auth, db } from "@/config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";

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

  const onSubmit = async (data: FormData) => {
    // update user doc in db
    const userDocRef = doc(db, "users", currentUserId);

    try {
      await updateDoc(userDocRef, {
        userName: data.userName,
        email: data.email,
        displayName: data.displayName,
        profilePictureUrl: data.profilePictureUrl,
        headerImageUrl: data.headerImageUrl,
        bio: data.bio,
      });
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
      <div className="p-8 text-2xl outline">
        <p className="mb-16 text-4xl">Edit Profile</p>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div></div>

          <label className="mb-4" htmlFor="name">
            Name *
          </label>
          <input
            {...register("userName")}
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="userName"
          />
          <p style={{ color: "red" }}>{errors.userName?.message}</p>

          <label className="mb-4" htmlFor="email">
            Email *
          </label>
          <input
            {...register("email")}
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="email"
          />
          <p style={{ color: "red" }}>{errors.email?.message}</p>

          <label className="mb-4" htmlFor="displayName">
            Display Name *
          </label>
          <input
            {...register("displayName")}
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="displayName"
          />
          <p style={{ color: "red" }}>{errors.displayName?.message}</p>

          <label className="mb-4" htmlFor="profilePictureUrl">
            Profile-PicUrl *
          </label>
          <input
            {...register("profilePictureUrl")}
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="profilePictureUrl"
          />
          <p style={{ color: "red" }}>{errors.profilePictureUrl?.message}</p>

          <label className="mb-4" htmlFor="headerImageUrl">
            Header ImageUrl *
          </label>
          <input
            {...register("headerImageUrl")}
            className="mb-8 block w-full border border-red-800"
            type="text"
            id="headerImageUrl"
          />
          <p style={{ color: "red" }}>{errors.headerImageUrl?.message}</p>

          <label className="mb-4" htmlFor="bio">
            Bio
          </label>
          <textarea
            {...register("bio")}
            className="mb-8 block w-full border border-red-800"
            name="bio"
            id="bio"
            cols={30}
            rows={10}
          ></textarea>
          <p style={{ color: "red" }}>{errors.bio?.message}</p>

          {/* <label htmlFor="name">Name *</label>
      <input type="text" id="name" /> */}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default edit;
