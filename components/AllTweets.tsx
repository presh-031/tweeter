import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";

import TestTweet from "./TestTweet";
import Tweet from "./Tweet";
import { db } from "@/config/firebase";

const AllTweets = () => {
  const [tweetsList, setTweetsList] = useState<any[]>([]);

  const postsRef = collection(db, "tweets");

  useEffect(() => {
    const q = query(postsRef);
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tweetsArray: any = [];
      querySnapshot.forEach((doc) => {
        tweetsArray.push({ ...doc.data(), id: doc.id });
      });
      setTweetsList(tweetsArray);
    });
    return () => unsub();
  }, []);

  console.log(tweetsList);

  return (
    <div>
      <TestTweet />
      <TestTweet />
      <div>
        {tweetsList?.map((tweet) => {
          return (
            <Tweet
              key={tweet.id}
              comments={tweet.comments}
              likes={tweet.likes}
              retweets={tweet.retweets}
              media={tweet.media}
              text={tweet.text}
              timestamp={tweet.timestamp}
              userId={tweet.userId}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AllTweets;
