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

  if (loading) {
    return <p>Loading tweets</p>;
  }

  if (error) {
    return <p>Error loading tweets. Please try again.</p>;
  }

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
        <p className="mt-16 text-center text-2xl font-bold">No tweets yet.</p>
      )}
    </div>
  );
};

export default ProfileTweets;
