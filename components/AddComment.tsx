import { auth, db } from "@/config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";
import { AddCommentProps } from "@/typings";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ProfilePicture from "./ProfilePicture";

const AddComment = ({ tweetId, setShowAddComment }: AddCommentProps) => {
  const [authUser] = useAuthState(auth);
  const authUserId = authUser ? authUser.uid : "";

  // Logic to handle comment creation
  const inputRef = useRef<HTMLInputElement>(null);
  const [newCommentLoading, setNewCommentLoading] = useState(false);

  const handleCommentSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const comment = inputRef.current?.value;

    if (comment) {
      try {
        setNewCommentLoading(true);
        await addDoc(collection(db, "comments"), {
          comment,
          tweetId,
          userId: authUserId,
          timestamp: serverTimestamp(),
        });

        toast.success("Commented");
        inputRef.current.value = "";
      } catch (err) {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setNewCommentLoading(false);
        setShowAddComment(false);
      }
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center gap-[1.622rem] pt-[.9rem] pb-[2rem]"
    >
      <div className=" flex h-[4rem] w-[4rem] items-center overflow-hidden rounded-[8px]">
        <ProfilePicture userId={authUserId} width={40} height={40} />
      </div>

      <form onSubmit={handleCommentSubmit} className=" flex-1">
        <input
          type="text"
          ref={inputRef}
          className="h-[4rem] w-full border-[1px] border-[#f2f2f2] bg-[#fafafa] px-[1.2rem] text-[1.4rem] font-medium leading-[1.9rem] tracking-[-3.5%] placeholder:text-[#bdbdbd]"
          placeholder="Tweet your reply"
        />
      </form>

      {newCommentLoading && (
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blueish" />
      )}
    </div>
  );
};

export default AddComment;
