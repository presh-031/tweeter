import React from "react";
import Tweet from "./Tweet";
import { collection, query, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { profileTweetsProps } from "@/typings";
import { GeneralLoader } from "..";

const ProfileTweets = ({ profileOwnerId }: profileTweetsProps) => {
  const tweetsRef = collection(db, "tweets");
  const tweetsQuery = query(tweetsRef, where("userId", "==", profileOwnerId));
  const [tweetsListSnapshot, loading, error] = useCollection(tweetsQuery, {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const profileOwnerTweets = tweetsListSnapshot?.docs;

  if (error) {
    return (
      <p className="text-center text-2xl font-semibold text-[#828282] ">
        Error loading tweets. Please try again.
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
      {profileOwnerTweets?.length ? (
        profileOwnerTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            tweetId={tweet.id}
            text={tweet.data().text}
            timestamp={tweet.data().timestamp}
            userId={tweet.data().userId}
          />
        ))
      ) : (
        <p className="mt-16 text-center text-2xl font-semibold text-[#828282]">
          No tweets yet.
        </p>
      )}
    </div>
  );
};

export default ProfileTweets;
