import { handleLike } from "@/helpers/tweetHelpers";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";

const LikeBtn = ({ likedTweet, tweetId, currentUserId }) => {
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
