import { db } from "@/config/firebase";
import { collection, limit, orderBy, query } from "firebase/firestore";
import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Tweet } from "../index";

const LatestTweets = () => {
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(
    tweetsRef,
    orderBy("timestamp", "desc"),
    limit(10) // This orders all tweets by timestamp in descending order
  );
  const [latestTweets, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {latestTweets?.docs.map((tweet) => (
        <Tweet
          key={tweet.id}
          tweetId={tweet.id}
          likes={tweet.data().likes}
          retweets={tweet.data().retweets}
          media={tweet.data().media}
          text={tweet.data().text}
          timestamp={tweet.data().timestamp}
          userId={tweet.data().userId}
        />
      ))}
    </div>
  );
};

export default LatestTweets;
