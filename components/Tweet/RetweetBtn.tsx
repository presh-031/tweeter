import { db } from "@/config/firebase";
import { handleRetweet } from "@/helpers/tweetHelpers";
import { StatBtnProps } from "@/typings";
import { collection, query, where } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { FaRetweet } from "react-icons/fa";

const RetweetBtn = ({ tweetId, currentUserId }: StatBtnProps) => {
  // check if tweet has been retweeted by authUser
  const retweetsRef = collection(db, "retweets");
  const retweetsQuery = query(
    retweetsRef,
    where("userId", "==", currentUserId),
    where("tweetId", "==", tweetId)
  );
  const [retweetedTweet, retweetedLoading, retweetedError] = useCollection(
    retweetsQuery,
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
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
