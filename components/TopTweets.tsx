import { db } from "@/config/firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import Tweet from "./Tweet";
import { GeneralLoader } from "..";

const TopTweets = () => {
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(
    tweetsRef,
    // orderBy("likesCount", "desc"),
    limit(10) //top 10 tweets based on likes
  );
  const [tweets, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  console.log("top tweets");

  if (error) {
    return (
      <p className="text-center text-2xl font-semibold text-[#828282] ">
        Error loading top tweets. Please try again.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="my-[10rem] flex justify-center">
        <GeneralLoader />
      </div>
    );
  }

  return (
    <div>
      {tweets?.docs.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          text={tweet.data().text}
          timestamp={tweet.data().timestamp}
          userId={tweet.data().userId}
        />
      ))}
    </div>
  );
};

export default TopTweets;
