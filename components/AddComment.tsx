import { auth, db } from "@/config/firebase";
import { addDoc, collection, doc, getDoc, Timestamp } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { AddCommentProps } from "@/typings";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProfilePicture from "./ProfilePicture";

const AddComment = ({ tweetId, setShowAddComment }: AddCommentProps) => {
  // For user Id and profilePic
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  const userRef = doc(db, "users", authUserId);
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const getUser = async () => {
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
    };

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Logic to handle comment creation
  const inputRef = useRef<HTMLInputElement>(null);
  const [newCommentLoading, setNewCommentLoading] = useState(false);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      const comment = inputRef.current?.value;

      if (comment) {
        try {
          setNewCommentLoading(true);
          await addDoc(collection(db, "comments"), {
            // id will be automatically generated for each new comment in the firestore
            comment,
            tweetId,
            userId: authUserId,
            timestamp: Timestamp.now(),
          });

          setNewCommentLoading(false);
          toast.success("Commented");
          inputRef.current.value = "";
          setShowAddComment(false);
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  return (
    <div
      onClick={(e) => [e.stopPropagation()]}
      className="flex items-center gap-[1.622rem] pt-[.9rem] pb-[2rem]"
    >
      <div className=" flex h-[4rem] w-[4rem] items-center">
        <ProfilePicture userId={authUserId} width={40} height={40} />
      </div>

      <input
        type="text"
        ref={inputRef}
        onKeyDown={handleKeyDown}
        className="h-[4rem] flex-1 border-[1px] border-[#f2f2f2] bg-[#fafafa] px-[1.2rem] text-[1.4rem] font-medium leading-[1.9rem] tracking-[-3.5%] placeholder:text-[#bdbdbd]"
        placeholder="Tweet your reply"
      />

      {newCommentLoading && (
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blueish" />
      )}
    </div>
  );
};

export default AddComment;
