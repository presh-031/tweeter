import { handleBookmark } from "@/helpers/tweetHelpers";
import React from "react";
import { HiOutlineBookmark } from "react-icons/hi";

const BookmarkBtn = ({ bookmarkedTweet, tweetId, currentUserId }) => {
  return (
    <button
      onClick={() => {
        handleBookmark(tweetId, currentUserId, bookmarkedTweet);
      }}
      className={` tweet-icons-btn ${
        bookmarkedTweet?.docs.length ? "text-[#2D9CDB] " : ""
      }`}
    >
      <HiOutlineBookmark
        className="tweet-icons"
        style={bookmarkedTweet?.docs.length ? { color: "#2D9CDB" } : {}}
      />
      <span className="hidden md:block">Save</span>
    </button>
  );
};

export default BookmarkBtn;
