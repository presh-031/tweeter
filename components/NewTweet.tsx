import { auth, db } from "@/config/firebase";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";

import { userInfoType } from "@/typings";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { MdOutlineImage } from "react-icons/md";

const NewTweet = () => {
  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  const [newTweetText, setNewTweetText] = useState("");
  const [newTweetLoading, setNewTweetLoading] = useState(false);

  const handleTweetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTweetText(e.target.value);
  };

  const handleNewTweet = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (newTweetText) {
      try {
        setNewTweetLoading(true);
        await addDoc(collection(db, "tweets"), {
          text: newTweetText,
          userId: currentUserId,
          timestamp: Timestamp.now(),
          likes: [],
          retweets: [],
          media: [],
          comments: [],
        });
        setNewTweetLoading(false);
        toast.success("Posted!");
        setNewTweetText("");
      } catch (err) {
        toast.success("Try again!");
        alert(err);
      }
    } else {
      // "success"?
      toast.success("Posted!");
    }
  };

  // Logic to get current user info for navbar
  const [userInfo, setUserInfo] = useState<userInfoType>({
    bio: "",
    createdAt: "",
    displayName: "",
    email: "",
    followers: [],
    following: [],
    headerImageUrl: "",
    profilePictureUrl: "",
    userName: "",
  });

  useEffect(() => {
    if (currentUserId) {
      const getUser = async () => {
        // loading
        const userRef = doc(db, "users", currentUserId);

        try {
          const userSnap = await getDoc(userRef);
          const userDoc = userSnap.data();

          if (userDoc) {
            const userInfoData: userInfoType = {
              bio: userDoc.bio,
              createdAt: userDoc.createdAt,
              displayName: userDoc.displayName,
              email: userDoc.email,
              followers: userDoc.followers,
              following: userDoc.following,
              headerImageUrl: userDoc.headerImageUrl,
              profilePictureUrl: userDoc.profilePictureUrl,
              userName: userDoc.userName,
            };

            setUserInfo(userInfoData);
          }
        } catch (err) {
          console.error(err);
        }
      };

      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);
  return (
    <div className="mt-[1.469rem] rounded-[12px] bg-white py-[1.091rem] px-[1.39rem] shadow-[0_2px_2px_rgba(0,0,0,0.05)] ">
      <p className="border-b-[1px] border-[#f2f2f2] pb-[.74rem] text-[1.2rem] font-semibold leading-[1.8rem] tracking-[-3.5%] text-[#4F4F4F]">
        Tweet something
      </p>
      <form onSubmit={handleNewTweet} className="flex items-center">
        <Image
          src={
            userInfo.profilePictureUrl
              ? userInfo.profilePictureUrl
              : // Default image shown should be a placeholder, actually
                "https://picsum.photos/id/1/40/40"
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
