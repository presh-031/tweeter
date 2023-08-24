import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { auth } from "@/config/firebase";
import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { createNewUserInDb } from "@/helpers/authHelpers";
import { useRouter } from "next/router";
import SignInLoader from "./Loaders/SignInLoader";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  fullName: yup.string().required("Full name is required"),
});
type FormData = yup.InferType<typeof schema>;

const SignInForm = () => {
  const router = useRouter();
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [fullName, setFullName] = useState("");
  const onSubmit = (data: FormData) => {
    createUserWithEmailAndPassword(data.email, data.password);
    setFullName(data.fullName);
  };

  if (user?.user) {
    createNewUserInDb(user, fullName);
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div>
        <div className="flex items-center gap-4 overflow-hidden rounded-xl  bg-gray-100  pl-4">
          {/* <MdEmail /> */}
          <input
            type="text"
            {...register("fullName")}
            placeholder="Full name"
            className="w-full bg-transparent py-4 text-2xl outline-none"
          />
        </div>
        <p className="text-red-600">{errors.fullName?.message}</p>
        {/* {error && <p className="text-red-600">Email already being used</p>} */}
      </div>

      <div>
        <div className="flex items-center gap-4 overflow-hidden rounded-xl  bg-gray-100  pl-4">
          <MdEmail />
          <input
            type="text"
            {...register("email")}
            placeholder="Email"
            className="w-full bg-transparent py-4 text-2xl outline-none"
          />
        </div>
        <p className="text-red-600">{errors.email?.message}</p>
        {error && <p className="text-red-600">Email already being used</p>}
      </div>

      <div>
        <div className="flex items-center gap-4 overflow-hidden rounded-xl  bg-gray-100 pl-4">
          <IoMdLock />
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full bg-transparent py-4 text-2xl outline-none"
          />
        </div>
        <p className="text-red-600">{errors.password?.message}</p>
      </div>

      <div className="relative flex items-center">
        <input
          type="submit"
          disabled={loading}
          value="Start tweeting now"
          className={`${
            loading ? "bg-opacity-30" : ""
          } mt-2 w-full rounded-xl border bg-blueish py-4 text-2xl font-medium text-white`}
        />

        {loading && (
          <div className="absolute right-10">
            <SignInLoader />
          </div>
        )}
      </div>
    </form>
  );
};

export default SignInForm;
