import { db } from "@/config/firebase";
import { handleBookmark } from "@/helpers/tweetHelpers";
import { StatBtnProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import React, { memo } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { HiOutlineBookmark } from "react-icons/hi";

const BookmarkBtn = ({ tweetId, currentUserId }: StatBtnProps) => {
  // check if tweet has been bookmarked by authUser
  const bookmarksRef = collection(db, "bookmarks");
  const bookmarksQuery = query(
    bookmarksRef,
    where("userId", "==", currentUserId),
    where("tweetId", "==", tweetId)
  );
  const [bookmarkedTweet, bookmarkedLoading, bookmarkedError] = useCollection(
    bookmarksQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

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

export default memo(BookmarkBtn);
