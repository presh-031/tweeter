import { handleRetweet } from "@/helpers/tweetHelpers";
import React from "react";
import { FaRetweet } from "react-icons/fa";

const RetweetBtn = ({ retweetedTweet, tweetId, currentUserId }) => {
  return (
    <button
      onClick={() => handleRetweet(tweetId, currentUserId, retweetedTweet)}
      className={` tweet-icons-btn ${
        retweetedTweet?.docs.length ? "text-[#27AE60] " : ""
      }`}
    >
      <FaRetweet
        className="tweet-icons"
        style={retweetedTweet?.docs.length ? { color: "#27AE60" } : {}}
      />
      <span className="hidden md:block">Retweet</span>
    </button>
  );
};

export default RetweetBtn;
