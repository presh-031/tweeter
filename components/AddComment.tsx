import { auth, db } from "@/config/firebase";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type AddCommentProps = {
  tweetId: string;
  comments: {}[];
  setShowAddComment: (newState: boolean) => {};
};
const AddComment = ({
  tweetId,
  // comments,
  setShowAddComment,
}: AddCommentProps) => {
  // Logic to get info of auth user, for Id and profilePic
  const [currentUser] = useAuthState(auth);
  const currentUserId = currentUser?.uid;

  const userRef = doc(db, "users", currentUserId);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
    };

    getUser();
  }, [currentUserId]);

  // Logic to handle comment creation
  const inputRef = useRef(null);
  const [newCommentLoading, setNewCommentLoading] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key == "Enter") {
      const comment = e.target.value;

      try {
        setNewCommentLoading(true);
        await addDoc(collection(db, "comments"), {
          // id will be automatically generated for each new comment in the firebase
          comment,
          tweetId,
          userId: currentUserId,
          timestamp: Timestamp.now(),
        });

        inputRef.current.value = "";

        setNewCommentLoading(false);
        setShowAddComment(false);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <div className="flex items-center gap-[1.622rem] pt-[.9rem] pb-[2rem]">
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

      {newCommentLoading && (
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blueish" />
      )}
    </div>
  );
};

export default AddComment;
