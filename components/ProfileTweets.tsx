import React from "react";
import Tweet from "./Tweet";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { profileTweetsProps } from "@/typings";

const ProfileTweets = ({ profileOwnerId }: profileTweetsProps) => {
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsRef, where("userId", "==", profileOwnerId));
  const [tweetsListSnapshot, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const profileOwnerTweets = tweetsListSnapshot?.docs;
  return (
    <div>
      {profileOwnerTweets?.length ? (
        profileOwnerTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetId={tweet.id}
            likes={tweet.data().likes}
            retweets={tweet.data().retweets}
            media={tweet.data().media}
            text={tweet.data().text}
            timestamp={tweet.data().timestamp}
            userId={tweet.data().userId}
            bookmarkedBy={tweet.data().bookmarkedBy}
          />
        ))
      ) : (
        <p>No tweets yet</p>
      )}
    </div>
  );
};

export default ProfileTweets;
