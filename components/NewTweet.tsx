import { auth, db } from "@/config/firebase";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState, ChangeEvent } from "react";
import { userInfoType } from "@/typings";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { MdClose, MdOutlineImage } from "react-icons/md";
import { GeneralLoader } from "..";
import userPlaceholder from "../assets/user-placeholder.png";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { newTweet } from "@/services/tweetServices";
import { GrClose, GrFormClose } from "react-icons/gr";

const NewTweet = () => {
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";
  const [authUserInfo, authUserInfoLoading, authUserInfoError] =
    useDocumentData(doc(db, "users", authUserId), {
      snapshotListenOptions: { includeMetadataChanges: true },
    });

  const [newTweetText, setNewTweetText] = useState("");
  const [newTweetLoading, setNewTweetLoading] = useState(false);
  const handleTweetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTweetText(e.target.value);
  };

  const handleNewTweetSumbit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newTweetText) {
      try {
        setNewTweetLoading(true);
        newTweet(newTweetText, authUserId);
        toast.success("Posted!");
        setNewTweetText("");
        setSelectedImage(null);
        setNewTweetLoading(false);
      } catch (err) {
        toast.success("Try again!");
        console.log(err);
      }
    } else {
      toast.error("That's empty");
    }
  };

  // image picker
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="mt-[1.469rem] rounded-[12px] bg-white py-[1.091rem] px-[1.39rem] shadow-[0_2px_2px_rgba(0,0,0,0.05)] ">
      <p className="border-b-[1px] border-[#f2f2f2] pb-[.74rem] text-[1.2rem] font-semibold leading-[1.8rem] tracking-[-3.5%] text-[#4F4F4F]">
        Tweet something
      </p>
      <form onSubmit={handleNewTweetSumbit} className="flex items-center">
        <Image
          src={
            authUserInfo?.profilePictureUrl
              ? authUserInfo.profilePictureUrl
              : userPlaceholder
          }
          width={40}
          height={40}
          alt="profile-pic"
          className="h-[4rem] w-[4rem] outline "
        />
        <input
          className="w-full overflow-hidden pl-[1.2rem] text-[1.6rem] font-medium leading-[2.179rem] tracking-[-3.5%]  outline-none placeholder:text-[#bdbdbd]"
          type="text"
          placeholder="What's happening?"
          value={newTweetText}
          onChange={handleTweetChange}
        />
        {newTweetLoading && (
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blueish" />
        )}
      </form>

      {selectedImage && (
        <div className="relative">
          <Image
            src={selectedImage}
            alt="Selected"
            width={100}
            height={100}
            className="mt-[1rem] h-auto max-h-[50rem] w-auto max-w-full rounded-[8px]"
          />
          <div
            onClick={() => {
              setSelectedImage(null);
            }}
            className="absolute top-[1rem] right-[1rem] flex h-[2.2rem] w-[2.2rem] items-center justify-center rounded-full bg-black bg-opacity-50 opacity-80"
          >
            <MdClose className="text-4xl text-white" />
          </div>
        </div>
      )}

      <div className="mt-[3rem] flex justify-between text-blueish">
        <div className=" flex items-center gap-[.71rem] ">
          <div>
            <label htmlFor="picker">
              <MdOutlineImage className="mr-[.673] h-[1.5rem] w-[1.5rem] " />
            </label>
            <input
              type="file"
              id="picker"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
          <BiWorld className="h-[1.6rem] w-[1.6rem]" />
          <p className="text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%]">
            Everyone can reply
          </p>
        </div>
        <input
          className="rounded-[4px] bg-blueish px-[2.4rem] py-[.8rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white"
          type="submit"
          value="Tweet"
          onClick={handleNewTweetSumbit}
        />
      </div>
    </div>
  );
};

export default NewTweet;
