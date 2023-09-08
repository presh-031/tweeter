import { db } from "@/config/firebase";
import { handleLike } from "@/helpers/tweetHelpers";
import { StatBtnProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { AiOutlineHeart } from "react-icons/ai";

const LikeBtn = ({ tweetId, currentUserId }: StatBtnProps) => {
  // check if tweet has been liked by authUser
  const likesRef = collection(db, "likes");
  const likesQuery = query(
    likesRef,
    where("userId", "==", currentUserId),
    where("tweetId", "==", tweetId)
  );
  const [likedTweet, likedLoading, likedError] = useCollection(likesQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  return (
    <button
      onClick={() => {
        handleLike(tweetId, currentUserId, likedTweet);
      }}
      className={` tweet-icons-btn ${
        likedTweet?.docs.length ? "text-[#EB5757] " : ""
      }`}
    >
      <AiOutlineHeart
        className="tweet-icons"
        style={likedTweet?.docs.length ? { color: "#EB5757" } : {}}
      />
      <span className="hidden md:block">Like</span>
    </button>
  );
};

export default LikeBtn;
