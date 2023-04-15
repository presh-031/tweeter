import { auth, db } from "@/config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";

type AddCommentProps = {
  tweetId: string;
};
const AddComment = ({ tweetId }: AddCommentProps) => {
  // Logic to get info of auth user, for Id and profilePic
  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  const userRef = doc(db, "users", currentUserId);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());

      // return userSnap.data();
    };

    getUser();
  }, [currentUserId]);

  // Logic to handle comment creation
  const inputRef = useRef(null);

  const handleKeyDown = async (e) => {
    if (e.key == "Enter") {
      const comment = e.target.value;

      // Comment will be used to create a new comment object to the comments part of the tweet
      const tweetDocRef = doc(db, "tweets", tweetId);

      try {
        await updateDoc(tweetDocRef, {
          comments: [
            ...comments,
            {
              user: currentUserId,
              comment,
            },
          ],
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="flex gap-[1.622rem] pt-[.9rem] pb-[2rem]">
      {/* Image here is that of the currently auth user */}
      <div className=" h-[4rem] w-[4rem]">
        {user.profilePictureUrl && (
          <Image
            src={user.profilePictureUrl}
            alt="profile-pic"
            width={40}
            height={40}
            loading="eager"
            className="h-[4rem] w-[4rem] rounded-[8px]"
          />
        )}
      </div>

      <input
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="h-[4rem] flex-1 border-[1px] border-[#f2f2f2] bg-[#fafafa] px-[1.2rem] text-[1.4rem] font-medium leading-[1.9rem] tracking-[-3.5%] text-[#bdbdbd]"
        placeholder="Tweet your reply"
      />
    </div>
  );
};

export default AddComment;
