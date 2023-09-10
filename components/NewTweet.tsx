import { auth, db } from "@/config/firebase";
import { doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { MdClose, MdOutlineImage } from "react-icons/md";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { postNewTweet } from "@/services/tweetServices";
import useSelectedImage from "@/hooks/useSelectedImage";
import ProfilePicture from "./ProfilePicture";

import Image from "next/image";

const NewTweet = () => {
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  // const [newTweetText, setNewTweetText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [newTweetLoading, setNewTweetLoading] = useState(false);
  // const handleTweetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNewTweetText(e.target.value);
  // };

  // image picker
  const { selectedImage, handleImageChange, deleteSelectedImage } =
    useSelectedImage();

  const handleNewTweetSumbit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log(inputRef?.current?.value);
    const newTweetText = inputRef?.current?.value;

    if (newTweetText) {
      try {
        setNewTweetLoading(true);
        postNewTweet(newTweetText, authUserId);
        toast.success("Posted!");

        // setNewTweetText("");
        inputRef.current.value = "";

        deleteSelectedImage();
        setNewTweetLoading(false);
      } catch (err) {
        toast.success("Try again!");
        inputRef.current.value = newTweetText;
        console.log(err);
      }
    } else {
      toast.error("That's empty");
    }
  };

  return (
    <div className=" mb-[2.317rem] rounded-[12px]  bg-white py-[1.091rem] px-[1.39rem] shadow-[0_2px_2px_rgba(0,0,0,0.05)]  ">
      <p className="border-b-[1px] border-[#f2f2f2] pb-[.74rem] text-[1.2rem] font-semibold leading-[1.8rem] tracking-[-3.5%] text-[#4F4F4F] md:text-[1.4rem]">
        Tweet something
      </p>
      <form
        onSubmit={handleNewTweetSumbit}
        className="mt-[.74rem] flex items-center"
      >
        {authUserInfo && (
          <div className="flex h-[4rem] w-[4rem] items-center">
            <ProfilePicture userId={authUserId} width={40} height={40} />
          </div>
        )}
        <input
          className="w-full overflow-hidden pl-[1.2rem] text-[1.6rem] font-medium leading-[2.179rem] tracking-[-3.5%]  outline-none placeholder:text-[#bdbdbd]"
          type="text"
          placeholder="What's happening?"
          // value={newTweetText}
          // onChange={handleTweetChange}
          ref={inputRef}
        />
        {newTweetLoading && (
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blueish" />
        )}
      </form>

      {selectedImage && (
        <div className="relative flex justify-end">
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            width={200}
            height={200}
            className="mt-[1rem] h-auto max-h-[50rem] w-auto max-w-full rounded-[8px] object-cover "
          />
          <div
            onClick={deleteSelectedImage}
            className="absolute top-[2rem] right-[1rem] flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full bg-black bg-opacity-50 opacity-80"
          >
            <MdClose className="text-4xl text-white" />
          </div>
        </div>
      )}

      <div className="mt-[3rem] flex justify-between text-blueish">
        <div className=" flex items-center gap-[.71rem]  md:ml-[7.2rem] ">
          <div>
            <label htmlFor="tweet-img-picker">
              <MdOutlineImage className="mr-[.673] h-[1.5rem] w-[1.5rem] " />
            </label>
            <input
              type="file"
              id="tweet-img-picker"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <BiWorld className="h-[1.6rem] w-[1.6rem]" />
          <p className="text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] md:text-[1.4rem]">
            Everyone can reply
          </p>
        </div>
        <input
          className="rounded-[4px] bg-blueish px-[2.4rem] py-[.8rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white md:text-[1.4rem]"
          type="submit"
          value="Tweet"
          onClick={handleNewTweetSumbit}
        />
      </div>
    </div>
  );
};

export default NewTweet;
