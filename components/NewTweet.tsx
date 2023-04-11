import { auth, db } from "@/config/firebase";
import { addDoc, collection, Timestamp } from "firebase/firestore";

import Image from "next/image";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiWorld } from "react-icons/bi";
import { MdOutlineImage } from "react-icons/md";
import dev from "../assets/devchallenges.png";

const NewTweet = () => {
  // const [user, loading, error] = useAuthState(auth);

  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  const [newTweetText, setNewTweetText] = useState("");

  const handleNewTweet = async () => {
    console.log(newTweetText);

    try {
      await addDoc(collection(db, "tweets"), {
        text: newTweetText,
        userId: currentUserId,
        timestamp: Timestamp.now(),
        likes: [],
        retweets: [],
        media: [],
        // comments
      });
      setNewTweetText("");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="mt-[1.469rem] bg-white py-[1.091rem] px-[1.39rem] shadow-[0_2px_2px_rgba(0,0,0,0.05)] ">
      <p className="border-b-[1px] border-[#f2f2f2] pb-[.74rem] text-[1.2rem] font-semibold leading-[1.8rem] tracking-[-3.5%] text-[#4F4F4F]">
        Tweet something
      </p>
      <div className="flex">
        <Image src={dev} alt="dev" className="h-[4rem] w-[4rem] " />
        <input
          className="w-full pl-[1.2rem] text-[1.6rem] font-medium leading-[2.179rem] tracking-[-3.5%] outline-none placeholder:text-[#bdbdbd]"
          type="text"
          placeholder="What's happening?"
          value={newTweetText}
          onChange={(e) => {
            setNewTweetText(e.target.value);
          }}
        />
      </div>
      <div className="mt-[3rem] flex justify-between text-blueish">
        <div className=" flex items-center gap-[.71rem] ">
          <MdOutlineImage className="mr-[.673] h-[1.5rem] w-[1.5rem] " />
          <BiWorld className="h-[1.6rem] w-[1.6rem]" />
          <p className="text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%]">
            Everyone can reply
          </p>
        </div>
        <input
          className="rounded-[4px] bg-blueish px-[2.4rem] py-[.8rem] text-[1.2rem] font-medium leading-[1.6rem] tracking-[-3.5%] text-white"
          type="submit"
          value="Tweet"
          onClick={handleNewTweet}
        />
      </div>
    </div>
  );
};

export default NewTweet;
